<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import TopNav from '@/components/TopNav.vue'
import FixNav from '@/components/FixNav.vue'
import FooterRight from '@/components/FooterRight.vue'

</script>

<template>
  <TopNav />
  <FixNav />

  <RouterView />

  <FooterRight />
</template>

<style lang="less" scoped></style>