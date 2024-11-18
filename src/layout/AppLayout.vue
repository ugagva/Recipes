<script setup>

import AppMenu from "@/components/AppMenu.vue";
</script>

<template>
  <div class="root">
    <div class="menuInner">
      <AppMenu></AppMenu>
      </div>
      <main class="main">
        <header class="header">
          <div class="title">
            <slot name="title"></slot>
          </div>
          <div class="controls">
            <slot name="controls"></slot>
          </div>
        </header>
        <div class="inner">
          <slot name="inner"></slot>
        </div>
      </main>
    </div>
</template>

<style scoped lang="sass">
@import '@/assets/styles/index'


.root
  display: flex
.header
  display: flex
  justify-content: space-between
  align-items: center

.menuInner
   width: 70px
.main
  flex: 1
  padding: 20px
.title
  font-size: 28px
  font-weight: 700
  color: $violet
.inner
  padding-top: 20px
</style>