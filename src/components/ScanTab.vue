<script setup>
import Camera from 'simple-vue-camera'
import QueryResult from '@/components/QueryResult.vue'
</script>

<template>
  <v-sheet class="camera-container mb-10" width="100%" height="350px" color="primary">
    <Camera ref="camera">
      <div class="w-100 h-100 d-flex justify-center align-end pb-4">
        <v-btn rounded text="上傳照片"></v-btn>
      </div>
    </Camera>
  </v-sheet>

  <QueryResult v-if="result" v-bind="result"></QueryResult>
  <div v-else class="text-center">請掃描車牌，或上傳照片</div>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      snapshot: null
    }
  },

  mounted() {
    this.snapshot = setInterval(async () => {
      const blob = await this.$refs.camera?.snapshot()
      console.log(URL.createObjectURL(blob))
    }, 5000)
  },

  unmounted() {
    clearInterval(this.snapshot)
  }
}
</script>

<style scoped>
.camera-container >>> video {
  object-fit: cover !important;
}
</style>
