<script setup>
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import HomeMuise from './HomeMuise.vue'
import HomeText from './HomeText.vue'
import HomeGame from './HomeGame.vue'

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
    stop()
  }
})

</script>

<template>
  <div class="info-content" ref="mydiv">
    <div class="container">
      <!-- 打字机名言 -->
      <HomeText />
      <!-- 音乐组件 -->
      <HomeMuise />
      <!-- mini game -->
      <HomeGame />
    </div>
  </div>
</template>

<style scoped lang="less">
.info-content {
  width: 100%;
  // height: 1400px;
  background-image: url(@back);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: @wtext;
  // background-color: rgba(255, 255, 255, 0.3);

  .container {
    padding: 40px 0;
    height: 100%;
    // 布局临时用 布局完成后注释掉
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>