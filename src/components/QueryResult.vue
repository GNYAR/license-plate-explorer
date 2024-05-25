<script setup>
defineProps({
  license: {
    type: String,
    required: true
  },
  isFound: {
    type: Boolean,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="text-center">
    <div class="text-h4 font-weight-bold my-4">{{ license }}</div>
    <div :class="`text-h5 font-weight-bold text-${isFound ? 'error' : 'success'}`">
      {{ isFound ? '車輛失竊' : '查無資料' }}
    </div>
    <div>{{ time }}</div>
  </div>
</template>

<style scoped></style>
