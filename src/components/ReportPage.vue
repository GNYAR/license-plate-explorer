<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

import QueryResult from '@/components/QueryResult.vue'

import { ref, watch } from 'vue'
import { assign, first, map, path, pick, pipe, prop, sortBy, zipWith } from 'lodash/fp'

const GOOGLE_API_KEY = import.meta.env?.VITE_GOOGLE_API_KEY

const mapRef = ref(null)
const center = ref({ lat: 25.0346444, lng: 121.5622628 }) // default: Taipei 101
const address = ref(null)
const polices = ref(null)

const setCurrentPos = new Promise((resolve) => {
  navigator.geolocation.getCurrentPosition(async (x) => {
    const getPos = (key) => pipe([prop('coords'), prop(key)])(x)
    center.value = { lat: getPos('latitude'), lng: getPos('longitude') }
    resolve()
  })
})

const searchPolice = async (latlng, radius) => {
  const { Place } = await mapRef.value.api.importLibrary('places')
  const params = {
    fields: ['displayName', 'location', 'formattedAddress', 'nationalPhoneNumber'],
    locationRestriction: {
      center: latlng,
      radius
    },
    includedPrimaryTypes: ['police'],
    maxResultCount: 10
  }
  const { places } = await Place.searchNearby(params)
  polices.value = map(pick([...params.fields, 'id']))(places)

  const Distance = new mapRef.value.api.DistanceMatrixService()
  Distance.getDistanceMatrix(
    {
      origins: [latlng],
      destinations: map(prop('location'), places),
      travelMode: 'DRIVING'
    },
    (res, status) => {
      if (status !== 'OK') return

      const distances = pipe([prop('rows'), first, prop('elements'), map(pick('distance'))])(res)
      const policesWithDistance = zipWith(assign, polices.value, distances)
      polices.value = sortBy(path(['distance', 'value']), policesWithDistance)
    }
  )
}

const updateAddress = async () => {
  const geocoder = new mapRef.value.api.Geocoder()
  const getAddress = pipe([prop('results'), first, prop('formatted_address')])
  address.value = await geocoder.geocode({ location: center.value }).then(getAddress)
}

watch(
  () => mapRef.value?.ready,
  async (ready) => {
    if (!ready) return ''

    await setCurrentPos
    searchPolice(center.value, 5000)
    updateAddress()
  }
)
</script>

<template>
  <div class="mx-4">
    <v-btn class="float-right mt-4" color="primary" text="查看照片" rounded></v-btn>

    <QueryResult class="text-start mb-4"></QueryResult>

    <v-text-field
      v-model="address"
      density="compact"
      label="在哪裡發現?"
      variant="underlined"
      hide-details
    ></v-text-field>
    <v-sheet class="my-2" width="100%" height="250px">
      <GoogleMap
        :api-key="GOOGLE_API_KEY"
        :center="center"
        class="w-100 fill-height"
        ref="mapRef"
        :zoom="15"
      >
        <Marker :options="{ position: center }" />
      </GoogleMap>
    </v-sheet>
  </div>

  <div class="px-4 mt-2">附近警察機關</div>
  <v-list>
    <v-list-item v-for="x in polices" :key="x.id">
      <v-list-item-title>
        <div class="d-flex">
          <v-icon class="my-auto mr-2" color="warning" size="small">mdi-police-badge</v-icon>
          <div class="font-weight-bold">{{ x.displayName }}</div>
          <div class="ml-auto text-grey text-caption">{{ x.distance?.text }}</div>
        </div>
      </v-list-item-title>
      地址：<a :href="getDirectionURI(x.formattedAddress)">{{ x.formattedAddress }}</a>
      <br />
      電話：<a :href="'tel:' + x.nationalPhoneNumber">{{ x.nationalPhoneNumber }}</a>
      <v-divider class="my-2"></v-divider>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  methods: {
    getDirectionURI(destination) {
      return encodeURI(`https://www.google.com/maps/dir/?api=1&destination=${destination}`)
    }
  }
}
</script>

<style scoped></style>
