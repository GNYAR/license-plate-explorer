<script setup>
import QueryResult from '@/components/QueryResult.vue'

import store from '@/store'
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
      @click:append-inner="queryStolen(input)"
      @keydown.enter.prevent="queryStolen(input)"
      autofocus
    ></v-text-field>
  </div>

  <QueryResult v-if="result" v-bind="result"></QueryResult>
  <div v-else class="text-center">請輸入車牌號碼</div>
</template>

<script>
import { queryStolenAPI } from '@/utils'

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
    async queryStolen(id) {
      this.loading = true
      const res = await queryStolenAPI(id)
      this.result = res
      store.btnShow = res.isStolen
      this.loading = false
    }
  }
}
</script>

<style scoped></style>
