<script setup>
import ScanTab from '@/components/ScanTab.vue'
import InputTab from '@/components/InputTab.vue'
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
        { text: '掃描車牌', value: 1, component: ScanTab },
        { text: '手動輸入', value: 2, component: InputTab }
      ],
      tab: 1
    }
  }
}
</script>

<style scoped></style>
