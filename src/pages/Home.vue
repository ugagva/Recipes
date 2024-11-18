<script setup>
import AppLayout from "@/layout/AppLayout.vue";

import AppButton from "@/components/AppButton.vue";
import {onMounted, ref} from "vue";

import {RecipeService} from "@/services";
import {ROUTES_PATHS} from "@/constants/index.js";
import AppLoader from "@/components/AppLoader.vue";


const recipes = ref();
const isLoading = ref(false);

const fetchRecipes = async () => {
  try {
    isLoading.value = true;
    recipes.value = await RecipeService.getRecipesByLetter();
    isLoading.value = false;
  } catch {
  }
}
const getRecipePath = (id) => {
  return `${ROUTES_PATHS.RECIPE.split(':')[0]}${id}`;
}
onMounted(fetchRecipes)


</script>

<template>

  <AppLayout >
    <template #title> Рецепты</template>
    <template #controls>
      <router-link :to="getRecipePath('new')">
        <AppButton text="Добавить рецепт"></AppButton>
      </router-link>

    </template>
    <template #inner>
      <AppLoader v-if="isLoading"/>
      <div v-else class="wrapper">
        <el-table :data="recipes" style="width: 100%">
          <el-table-column prop="idMeal" label="Id" width="180"/>
          <el-table-column  label="Image" width="180">
            <template #default="scope">
              <router-link :to="getRecipePath(scope.row.idMeal)">
                <img :src="scope.row.strMealThumb" class="image"/>
              </router-link>

            </template>
          </el-table-column>
          <el-table-column prop="strArea" label="Area" width="180"/>
          <el-table-column prop="strCategory" label="Category" width="180"/>
          <el-table-column label="Tags" width="180">
            <template #default="scope">
              <template v-if="scope?.row?.strTags">
                <el-tag
                    v-for="(tag, key) in scope.row.strTags.split(',')"
                    :key="key"
                    type="primary"
                    class="tag">
                  {{ tag }}
                </el-tag>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </AppLayout>
</template>



<style scoped lang="sass">
@import '@/assets/styles/index'

.tag
  margin: 4px 3px
  //color: rgba(87, 8, 71, 0.7)
  font-weight: bold
.image
  width: 70px
  height: 70px


</style>