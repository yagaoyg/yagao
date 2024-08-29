<script setup>
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const mask = ref(null)
const maskIsVisible = ref(false)

// eslint-disable-next-line no-unused-vars
const { stop } = useIntersectionObserver(
  mask,
  ([{ isIntersecting }]) => {
    maskIsVisible.value = isIntersecting
  },
)

watch(maskIsVisible, () => {
  if (maskIsVisible.value) {
    window.scrollTo({
      top: mask.value.offsetTop,
      behavior: 'smooth',
    })
  }
})

</script>

<template>
  <div class="person-content">
    <div class="mask" ref="mask">
      <div class="container">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.person-content {
  width: 100%;
  height: 760px;
  background-image: url(@/assets/images/大图背景.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  // border-top: 20px solid rgba(255, 255, 255, 0.1);

  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);

    .container {
      height: 100%;
      // background-color: pink;
    }
  }
}
</style>