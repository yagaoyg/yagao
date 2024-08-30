<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import HomeImg from './components/HomeImg.vue'
import HomePersonal from './components/HomePersonal.vue'
import HomeInfo from './components/HomeInfo.vue'
import HomeNav from './components/HomeNav.vue'
import HomeFixNav from './components/HomeFixNav.vue'
import FooterRight from '@/components/FooterRight.vue'

</script>

<template>
  <HomeNav />
  <HomeFixNav />
  <HomeImg />
  <HomeInfo />
  <HomePersonal />

  <FooterRight />
</template>

<style scoped lang="less"></style>