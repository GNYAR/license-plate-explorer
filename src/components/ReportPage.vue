<script setup>
import QueryResult from '@/components/QueryResult.vue'
</script>

<template>
  <div class="mx-4">
    <v-btn class="float-right mt-4" color="primary" text="查看照片" rounded></v-btn>

    <QueryResult class="text-start mb-4" v-bind="result"></QueryResult>

    <v-text-field
      density="compact"
      label="在哪裡發現?"
      variant="underlined"
      hide-details
    ></v-text-field>
    <v-sheet class="my-2" width="100%" height="250px" color="primary"> 地圖 </v-sheet>
  </div>

  <div class="px-4 mt-2">附近警察機關</div>
  <v-list>
    <v-list-item v-for="x in stations" :key="x.name">
      <v-list-item-title>
        <div class="d-flex">
          <v-icon class="my-auto mr-2" color="warning">mdi-police-badge</v-icon>
          <div class="text-h6 font-weight-bold">{{ x.name }}</div>
          <div class="ml-auto text-grey">{{ x.dist }} m</div>
        </div>
      </v-list-item-title>
      地址：<a href="">{{ x.address }}</a> <br />
      電話：<a :href="'tel:' + x.tel">{{ x.tel }}</a>
      <v-divider class="my-2"></v-divider>
    </v-list-item>
  </v-list>
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
      stations: [
        {
          name: '正濱派出所',
          address: '202經龍是中正區中正路786之1號',
          tel: '02 2462 1889',
          dist: 100
        },
        {
          name: '正濱派出所',
          address: '202經龍是中正區中正路786之1號',
          tel: '02 2462 1889',
          dist: 100
        },
        {
          name: '正濱派出所',
          address: '202經龍是中正區中正路786之1號',
          tel: '02 2462 1889',
          dist: 100
        },
        {
          name: '正濱派出所',
          address: '202經龍是中正區中正路786之1號',
          tel: '02 2462 1889',
          dist: 100
        }
      ]
    }
  }
}
</script>

<style scoped></style>
