<script setup>
import QueryResult from '@/components/QueryResult.vue'
</script>

<template>
  <div class="my-10">
    <v-text-field
      v-model="input"
      :loading="loading"
      append-inner-icon="mdi-magnify"
      class="mx-auto"
      clearable
      density="compact"
      label="車牌"
      variant="outlined"
      hide-details
      width="300"
      @click:append-inner="checkVehicle(input)"
      @keydown.enter.prevent="checkVehicle(input)"
      autofocus
    ></v-text-field>
  </div>

  <QueryResult v-if="result" v-bind="result"></QueryResult>
  <div v-else class="text-center">請輸入車牌號碼</div>
</template>

<script>
import { entries, filter, first, isEmpty, join, map, pipe, prop, propEq } from 'lodash/fp'

export default {
  data() {
    return {
      result: null,
      input: null,
      loaded: false,
      loading: false
    }
  },

  methods: {
    async checkVehicle(id) {
      this.loading = true

      const params = {
        // CarType: A(汽車)、B(重機車)、C(輕機車)、G(動力機械車)
        ajaxAction: 'ClQuery',
        QS_CarType1: 'A',
        QS_CarId1: id,
        QS_CarType2: 'B',
        QS_CarId2: id,
        QS_CarType3: 'C',
        QS_CarId3: id,
        QS_CarType4: 'G',
        QS_CarId4: id,
        QS_CarType5: null,
        QS_CarId5: null,
        FUNC_NAME: 'CL'
      }
      const URL = 'https://eze8.npa.gov.tw/NpaE8ServerRWD/CaseQueryServlet'
      const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
      const toForm = pipe([entries, map(join('=')), join('&')])
      const body = toForm(params)

      const decode = pipe([
        prop('formData'),
        (html) => {
          const div = document.createElement('div')
          div.innerHTML = html
          return div.innerText
        },
        JSON.parse
      ])

      const res = await fetch(URL, { method: 'post', headers, body })
        .then((x) => x.json())
        .then(decode)
        .then(filter(propEq('E8_STATUS', '車輛失竊')))

      this.result = isEmpty(res)
        ? { id, isStolen: false }
        : { id, isStolen: true, type: pipe([first, prop('E8_CAR_TYPE_NM')])(res) }
      this.loading = false
    }
  }
}
</script>

<style scoped></style>
