<script setup>
import QueryResult from '@/components/QueryResult.vue'
</script>

<template>
  <div class="mx-4">
    <v-btn class="float-right" color="primary" text="查看照片" rounded></v-btn>

    <QueryResult class="text-start mb-10" v-bind="result"></QueryResult>

    <v-text-field density="compact" label="在哪裡發現?" variant="solo" hide-details></v-text-field>
  </div>
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
