<script setup>
import Camera from 'simple-vue-camera'
import QueryResult from '@/components/QueryResult.vue'

import store from '@/store'
</script>

<template>
  <v-sheet class="camera-container mb-10" width="100%" height="350px" color="primary">
    <Camera ref="camera">
      <div class="w-100 h-100 d-flex justify-center align-end pb-4">
        <v-btn rounded text="上傳照片"></v-btn>
      </div>
    </Camera>
  </v-sheet>

  <QueryResult v-if="loaded"></QueryResult>
  <div v-else class="text-center">請掃描車牌，或上傳照片</div>
</template>

<script>
import { queryStolenAPI } from '@/utils'

const imgToTxt = (blob) => {
  const URL = 'http://140.121.17.140:8080/pyapi/car/image/res'
  const body = new FormData()
  body.append('file', blob)
  return fetch(URL, { method: 'post', body })
    .then((x) => x.json())
    .catch(() => null)
}

export default {
  data() {
    return {
      loaded: false,
      snapshot: null
    }
  },

  mounted() {
    this.snapshot = setInterval(async () => {
      const blob = await this.$refs.camera?.snapshot()
      const txt = await imgToTxt(blob)
      if (txt) {
        store.result = await queryStolenAPI(txt)
        this.loaded = true
      }
    }, 5000)
  },

  unmounted() {
    clearInterval(this.snapshot)
  }
}
</script>

<style scoped>
.camera-container :deep(video) {
  object-fit: cover !important;
}
</style>
