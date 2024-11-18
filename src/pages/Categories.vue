<script setup>


import {computed} from "vue";
import AppLayout from "@/layout/AppLayout.vue";

import {useRootStore} from "@/stores/root.js";


const rootStore = useRootStore();
const categories = computed(() => rootStore.categories);

</script>




<template>
<AppLayout>
  <template #title >Категории</template>
  <template #inner>
    <el-table :data="categories" style="width: 100%">
      <el-table-column prop="strCategory" label="Category" width="180"/>
    </el-table>
  </template>
</AppLayout>
</template>

<style scoped lang="sass">

</style>