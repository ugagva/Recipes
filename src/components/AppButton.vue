<script setup>
const props = defineProps({
  text: {
    type:String,
    default: ''
  },
  circle:{
    type:Boolean,
    default: false
  },
  icon:{
    type:String,
    default:''
  }
})

</script>

<template>
  <el-button  v-if="!circle"  type="primary" class="btn">
    {{props.text}}
  </el-button>
  <el-button v-else type="primary" :icon="icon" circle class="circle" ></el-button>

</template>


<style scoped lang="sass">
@import '@/assets/styles/index'


.btn
   padding: 20px 24px
   background-color: $violet
   border-radius: 4px

.circle
  background-color: $violet
  font-size: 12px

</style>