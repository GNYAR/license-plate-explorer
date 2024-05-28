<script setup>
import store from '@/store'
</script>

<template>
  <div class="text-center">
    <div class="text-h4 font-weight-bold mt-4">{{ store.result.id }}</div>

    <div>{{ store.result.type }}</div>

    <div class="text-h5 font-weight-bold">
      <span v-if="store.result.isStolen" class="text-error"> 車輛失竊 </span>
      <span v-else class="text-success mt-6"> 查無資料 </span>
    </div>
    <div class="text-grey">{{ new Date().toLocaleString() }}</div>
  </div>
</template>

<style scoped></style>
