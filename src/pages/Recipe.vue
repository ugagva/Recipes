<script setup>

import AppLayout from "@/layout/AppLayout.vue";
import AppButton from "@/components/AppButton.vue";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {RecipeService, CommonService} from "@/services";
import {useRootStore} from "@/stores/root.js";
import AppLoader from "@/components/AppLoader.vue";
import {notify} from "@/utils/index.js";


const recipeIngredients = ref([CommonService.getEmptyIngredient()])
const route = useRoute()
const rootStore = useRootStore();
const isLoading = ref(false);
const recipeId = route?.params.id;
const recipe = ref(RecipeService.getEmptyRecipe());
const recipeUpdated = ref(RecipeService.getEmptyRecipe());
const isCreatingMode = ref(true);
const areas = computed(() => rootStore.areas)
const categories = computed(() => rootStore.categories)


const fetchRecipe = async () => {
  try {
    isLoading.value = true;
    const data = await RecipeService.getRecipeById(recipeId);
    isLoading.value = false;
    recipe.value = {...data}
    isCreatingMode.value = false;
    recipeUpdated.value = {...data};


  } catch (error) {
    console.log(error)
  }
}


const normalizeRecipeIngredients = () => {
  const normalizedIngredients = []
  for (let i = 0; i <= 20; i++) {
    if (recipe.value[`strIngredient${i}`]) {
      const ingredients = {
        id:Math.random().toString(36).slice(2),
        title: recipe.value[`strIngredient${i}`],
        measure: recipe.value[`strMeasure${i}`]
      }
      normalizedIngredients.push(ingredients);
    }
  }
  recipeIngredients.value = normalizedIngredients;
}
const denormalizeRecipeIngredients = (recipe) => {
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeIngredients.value[i- 1];

    if ( ingredient?.title &&  ingredient?.measure) {

      recipe[`strIngredient${i}`] = ingredient.title;
      recipe[`strMeasure${i}`] = ingredient.measure;

    }else {
      recipe[`strIngredient${i}`] = '';
      recipe[`strMeasure${i}`] = '';
    }
  }
}



const addIngredient = () => {
  recipeIngredients.value.push(CommonService.getEmptyIngredient())
}

const createOrUpdateRecipe=()=>{
  isCreatingMode.value ? createRecipe() :updateRecipe()
  console.log('Что было?',isCreatingMode.value)
}

const createRecipe= async ()=> {
  try{
    const params= { ...recipeUpdated.value}

    denormalizeRecipeIngredients(params)
    isLoading.value = true;
     await RecipeService.createRecipe()

    setTimeout(()=>{
      isLoading.value = false;
      notify('Создано' , ` Новый рецепт ${params.strMeal} создан`, 'success')
    },)
  }catch (error) {
    console.log(error)}
}

const updateRecipe= async ()=>{
      try{
        const params= { ...recipeUpdated.value}
        isLoading.value = true;
        denormalizeRecipeIngredients(params)
        await RecipeService.updateRecipe()

        setTimeout(()=>{
        isLoading.value=false;
        notify('Обновлено' , `Рецепт ${params.strMeal} обновлен`, 'success')
        },500)

    console.log(params)
  }catch (error) {
    console.log(error)}
}

const removeIngredient = (index) => {
 recipeIngredients.value.splice(index, 1);
}
onMounted(async () => {
  if (parseInt(recipeId)) {
    await fetchRecipe()
    normalizeRecipeIngredients()
  }
})
</script>

<template>
  <AppLayout>
    <template #title> {{isCreatingMode ? 'Новый рецепт' : recipeUpdated.strMeal }}</template>
    <template #controls>
      <AppButton text="Сохранить рецепт" @click="createOrUpdateRecipe"></AppButton>
    </template>
    <template #inner>
      <AppLoader v-if="isLoading"/>
      <div v-else class="wrapper">
        <div class="row">
          <div class="col">
            <div class="label">Title</div>
            <el-input
                v-model="recipeUpdated.strMeal"
                placeholder="Please input new recipe name"/>
          </div>
          <div class="col">
            <div class="label"> Area</div>
            <el-select
                v-model="recipeUpdated.strArea"
                placeholder="Area"
            >
              <el-option
                  v-for="item in areas"
                  :key="item.strArea"
                  :label="item.strArea"
                  :value="item.strArea"
              />
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="label"> Category</div>
            <el-select
                v-model="recipeUpdated.strCategory"
                placeholder="Area"
            >
              <el-option
                  v-for="item in categories"
                  :key="item.strCategory"
                  :label="item.strCategory"
                  :value="item.strCategory"
              />
            </el-select>
          </div>
        </div>
        <div class="ingredients">
          <div class="subtitle">
            Ingredients
          </div>
          <div v-for="(ingredient, index) in recipeIngredients"
               :key="`${ingredient.id}-${index}`"
               class="row align-items-flex-end">
            <div class="col col-small mb-2">
              {{index+1}}
            </div>
            <div class="col">
              <div class="label">Title</div>
              <el-input
                  v-model="recipeIngredients[index].title"
                  placeholder="Title"/>
            </div>
            <div class="col">
              <div class="label">Measure</div>
              <el-input
                  v-model="recipeIngredients[index].measure"
                  placeholder="Measure"/>
            </div>
            <div class="col col-small mb-2">
              <AppButton
                  circle
                  icon="Delete"
                  @click="()=>removeIngredient(index)" />
            </div>
          </div>

          <AppButton
              text="Add Ingredient"
              @click="addIngredient"/>

        </div>

      </div>
        <div class="row">
          <div class="col">
            <div class="subtitle">Instructions</div>
            <el-input
                v-model="recipeUpdated.strInstructions"
                :autosize="{ minRows:4, maxRows: 5 }"
                type="textarea"
                placeholder="Instructions"
            />
          </div>
        </div>

    </template>
  </AppLayout >
</template>





<style scoped lang="sass">

.ingredients
  padding-bottom: 16px

.mb-2
  margin-bottom: 6px
</style>