import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import {ROUTES_PATHS} from "@/constants/index.js";
import Categories from "@/pages/Categories.vue";
import Recipe from "@/pages/Recipe.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: 'home',
      component: Home
    },
    {
      path: ROUTES_PATHS.CATEGORIES,
      name: 'category',
      component: Categories
    },
    {
      path: ROUTES_PATHS.RECIPE,
      name: 'recipe',
      component: Recipe
    },

  ]
})

export default router
