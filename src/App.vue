<script setup>
import ScanPlate from '@/components/ScanPlate.vue'
import KeyIn from '@/components/KeyIn.vue'
</script>

<template>
  <v-container class="px-0">
    <v-toolbar color="surface">
      <div class="mx-auto text-h6 font-weight-bold">車牌探索者</div>

      <template v-slot:extension>
        <v-tabs v-model="tab" color="primary" grow>
          <v-tab v-for="x in tabs" :key="x.value" :value="x.value"> {{ x.text }} </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="x in tabs" :key="x.value" :value="x.value">
        <component v-if="tab === x.value" :is="x.component"></component>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { text: '掃描車牌', value: 1, component: ScanPlate },
        { text: '手動輸入', value: 2, component: KeyIn }
      ],
      tab: 1
    }
  }
}
</script>

<style scoped></style>
