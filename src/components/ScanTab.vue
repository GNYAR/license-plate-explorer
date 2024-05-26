<script setup>
import Camera from 'simple-vue-camera'
import QueryResult from '@/components/QueryResult.vue'
</script>

<template>
  <v-sheet class="camera-container" width="100%" height="350px" color="primary">
    <Camera>
      <div class="w-100 h-100 d-flex justify-center align-end pb-4">
        <v-btn rounded text="上傳照片"></v-btn>
      </div>
    </Camera>
  </v-sheet>

  <QueryResult v-bind="result"></QueryResult>
</template>

<script>
export default {
  data() {
    return {
      result: {
        license: '505-LRP',
        isFound: true,
        time: '113/05/05 01:36:03'
      }
    }
  }
}
</script>

<style scoped>
.camera-container >>> video {
  object-fit: cover !important;
}
</style>
