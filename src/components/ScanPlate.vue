<script setup>
import QueryResult from '@/components/QueryResult.vue'
</script>

<template>
  <div class="position-relative">
    <div class="position-absolute w-100 h-100 d-flex justify-center align-end pb-4">
      <v-btn rounded text="上傳照片"></v-btn>
    </div>

    <v-sheet width="100%" height="440px" color="primary"> 鏡頭畫面 </v-sheet>
  </div>

  <QueryResult v-bind="result"></QueryResult>

  <v-btn
    v-if="result.isFound"
    block
    class="w-100 py-10 text-h4"
    color="error"
    position="fixed"
    style="bottom: 0"
    tile
    text="立即通報"
  ></v-btn>
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

<style scoped></style>
