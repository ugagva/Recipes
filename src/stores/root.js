import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {URL_INGREDIENTS} from "@/constants/index.js";
import * as CommonService from "@/services/CommonServise/index.js";


export const useRootStore = defineStore('root',()=>  {
    const areas=ref(null)
    const categories=ref(null)
    const ingredients=ref(null)


    async function getAreas() {
        const data = await CommonService.getAreas();
        areas.value = data;
    }
        async function getIngredients() {
            const data = await CommonService.getIngredients();
            ingredients.value = data;
        }
        async function getCategories() {
            const data = await CommonService.getCategories();
            categories.value = data;
        }
            return {areas, categories, ingredients, getAreas, getIngredients, getCategories};
}
)