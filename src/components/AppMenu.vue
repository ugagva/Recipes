<script setup>

import {Dish, Food} from "@element-plus/icons-vue";
import {useRouter, useRoute} from "vue-router";
import {ROUTES_PATHS} from "@/constants/index.js";
import {onMounted} from "vue";

const router=useRouter();
const route =useRoute();


const isPathActive = (path) => {
 return route.path === path;
}

onMounted(isPathActive)
</script>

<template>

<div class="menu">
  <div class="logo"></div>
  <el-menu  :router="true"   class=" nav el-menu-vertical-demo"      >

    <el-menu-item :index="ROUTES_PATHS.HOME" :class="['item',isPathActive(ROUTES_PATHS.HOME) && 'active']">
      <el-icon :size="24"><Food/></el-icon>
    </el-menu-item>
    <el-menu-item :index="ROUTES_PATHS.CATEGORIES" :class="['item',isPathActive(ROUTES_PATHS.CATEGORIES) && 'active']">
      <el-icon :size="24"><Dish/></el-icon>
    </el-menu-item>
  </el-menu>


</div>
</template>

<style scoped lang="sass">
@import '@/assets/styles/index'


.menu
  height: 100%
  min-height: 100hv
  padding: 20px 5px 0
  border-right: 1px solid $border

.nav
  border: none
.logo
  padding: 0 15px 15px
  border-bottom: 1px solid $border


.item
  color: $violet
  &.active
     color: $pink

</style>