<template>
  <div id="app">
    <transition name="fade">
      <router-view :key="$route.fullPath"/>
    </transition>
  </div>
</template>


<style>
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter  {
  opacity: 0;
}
</style>
