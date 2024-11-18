<script setup>

</script>

<template>
  <transition appear>
    <div class="root">
      <div class="heading">
        Loading...
      </div>
    </div>
  </transition>
</template>

<style scoped lang="sass">
@import '@/assets/styles/index'


.root
  z-index: 3
  position: fixed
  display: flex
  align-items: center
  justify-content: center
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: rgba($white, 0.8)

  .heading
    font-size: 28px
    font-weight: 700



</style>