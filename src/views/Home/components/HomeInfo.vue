<script setup>
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const mydiv = ref(null)
const divIsVisible = ref(false)

// eslint-disable-next-line no-unused-vars
const { stop } = useIntersectionObserver(
  mydiv,
  ([{ isIntersecting }]) => {
    divIsVisible.value = isIntersecting
  },
)

watch(divIsVisible, () => {
  if (divIsVisible.value) {
    window.scrollTo({
      top: mydiv.value.offsetTop,
      behavior: 'smooth',
    })
    // stop()
  }
})

</script>

<template>
  <div class="info-content" ref="mydiv">
    <div class="container">
      <div class="muise">音乐控件</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.info-content {
  width: 100%;
  height: 800px;
  background-image: url(@back);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: @wtext;

  .container {
    padding: 80px 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>