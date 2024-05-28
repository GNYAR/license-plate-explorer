<script setup>
defineProps({
  id: {
    type: String,
    required: false
  },
  isStolen: {
    type: Boolean,
    required: false
  },
  type: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="text-center">
    <div class="text-h4 font-weight-bold mt-4">{{ id }}</div>

    <div>{{ type }}</div>

    <div :class="`text-h5 font-weight-bold text-${isStolen ? 'error' : 'success mt-6'}`">
      {{ isStolen ? '車輛失竊' : '查無資料' }}
    </div>
    <div class="text-grey">{{ new Date().toLocaleString() }}</div>
  </div>
</template>

<style scoped></style>
