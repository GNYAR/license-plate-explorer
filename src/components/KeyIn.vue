<script setup>
import QueryResult from '@/components/QueryResult.vue'
</script>

<template>
  <div class="my-10">
    <v-text-field
      :loading="loading"
      append-inner-icon="mdi-magnify"
      class="mx-auto"
      clearable
      density="compact"
      label="車牌"
      variant="outlined"
      hide-details
      width="300"
      @click:append-inner="onClick"
      @keydown.enter.prevent="onClick"
      autofocus
    ></v-text-field>
  </div>

  <QueryResult v-if="loaded" v-bind="result"></QueryResult>

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
      },
      loaded: false,
      loading: false
    }
  },

  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    }
  }
}
</script>

<style scoped></style>
