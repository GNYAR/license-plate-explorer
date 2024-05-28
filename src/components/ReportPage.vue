<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

import QueryResult from '@/components/QueryResult.vue'

import { ref, watch } from 'vue'
import { first, pipe, prop } from 'lodash/fp'

const map = ref(null)
const center = ref({ lat: 25.0346444, lng: 121.5622628 }) // default: Taipei 101
const address = ref(null)

const setCurrentPos = new Promise((resolve) => {
  navigator.geolocation.getCurrentPosition(async (x) => {
    const getPos = (key) => pipe([prop('coords'), prop(key)])(x)
    center.value = { lat: getPos('latitude'), lng: getPos('longitude') }
    resolve()
  })
})

const updateAddress = async () => {
  const geocoder = new map.value.api.Geocoder()
  const getAddress = pipe([prop('results'), first, prop('formatted_address')])
  address.value = await geocoder.geocode({ location: center.value }).then(getAddress)
}

watch(
  () => map.value?.ready,
  async (ready) => {
    if (!ready) return ''

    await setCurrentPos
    await updateAddress()
  }
)

const MAP_API_KEY = 'AIzaSyCbt9e_c9PTsZlh8Mj3f8WbhPvb2vDJSAk'
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
        :api-key="MAP_API_KEY"
        :center="center"
        class="w-100 fill-height"
        ref="map"
        :zoom="15"
      >
        <Marker :options="{ position: center }" />
      </GoogleMap>
    </v-sheet>
  </div>

  <div class="px-4 mt-2">附近警察機關</div>
  <v-list>
    <v-list-item v-for="x in stations" :key="x.name">
      <v-list-item-title>
        <div class="d-flex">
          <v-icon class="my-auto mr-2" color="warning">mdi-police-badge</v-icon>
          <div class="text-h6 font-weight-bold">{{ x.name }}</div>
          <div class="ml-auto text-grey">{{ x.dist }} m</div>
        </div>
      </v-list-item-title>
      地址：<a href="">{{ x.address }}</a> <br />
      電話：<a :href="'tel:' + x.tel">{{ x.tel }}</a>
      <v-divider class="my-2"></v-divider>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      stations: [
        {
          name: '正濱派出所',
          address: '202經龍是中正區中正路786之1號',
          tel: '02 2462 1889',
          dist: 100
        },
        {
          name: '正濱派出所',
          address: '202經龍是中正區中正路786之1號',
          tel: '02 2462 1889',
          dist: 100
        },
        {
          name: '正濱派出所',
          address: '202經龍是中正區中正路786之1號',
          tel: '02 2462 1889',
          dist: 100
        },
        {
          name: '正濱派出所',
          address: '202經龍是中正區中正路786之1號',
          tel: '02 2462 1889',
          dist: 100
        }
      ]
    }
  }
}
</script>

<style scoped></style>
