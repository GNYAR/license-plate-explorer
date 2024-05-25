<script setup>
import HomePage from '@/components/HomePage.vue'
import ReportPage from '@/components/ReportPage.vue'
</script>

<template>
  <v-container class="d-flex flex-column px-0 pb-0 main">
    <ReportPage v-if="isReport"></ReportPage>
    <HomePage v-else></HomePage>

    <v-spacer></v-spacer>

    <div>
      <v-btn
        :color="isReport ? 'primary' : 'error'"
        :text="isReport ? '完成' : '立即通報'"
        block
        class="w-100 text-h4 action"
        tile
        @click="isReport = !isReport"
      ></v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isReport: false
    }
  }
}
</script>

<style scoped>
.main {
  height: 100vh;
}
.action {
  height: 80px;
}
</style>
