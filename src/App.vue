<script setup>
import { RouterView } from 'vue-router'
import {onMounted} from "vue";
import {useRootStore} from "@/stores/root.js";
import {getAreas} from "@/services/CommonServise/index.js";

const rootStore = useRootStore()

onMounted(()=>  {
  rootStore.getAreas()
  rootStore.getCategories()
  rootStore.getIngredients()
});


</script>

<template>

  <RouterView />
</template>

<style lang="sass" scoped>
@import '@/assets/styles/index'
</style>
