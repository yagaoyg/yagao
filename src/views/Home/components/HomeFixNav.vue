<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useScroll } from '@vueuse/core'

const nav = ref(null)
const { y } = useScroll(window)

watch(y, () => {
  if (y.value >= 40) {
    nav.value.style.top = '0'
  }
  else {
    nav.value.style.top = '-100%'
  }
})

</script>

<template>
  <div class="fix-content" ref="nav">
    <div class="mask">
      <div class="container">
        <ul>
          <li>
            <RouterLink to="/"><i class="iconfont icon-home"></i>首页</RouterLink>
          </li>
          <li>
            <RouterLink to="/"><i class="iconfont icon-error"></i>施工中</RouterLink>
          </li>
          <li>
            <RouterLink to="/"><i class="iconfont icon-error"></i>施工中</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.fix-content {
  position: fixed;
  top: -100%;
  // top: -20px;
  z-index: 1000;

  width: 100%;
  height: 40px;
  // background-color: #333;
  // background-image: url(@back);
  // background-size: cover;
  // background-repeat: no-repeat;
  // background-attachment: fixed;

  line-height: 1;

  @fz: 18px;
  font-size: @fz;

  transition: all 0.5s;

  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);

    .container {

      ul {
        display: flex;
        justify-content: right;
        align-content: center;
        margin: 0;
        padding: ((40px - @fz)/2) 0;
        // padding: 10px 0;
        height: 40px;
        list-style-type: none;
        color: @wtext;

        li {
          padding: 0 30px;
          border-right: 1px solid @wtext;

          a {
            width: 100%;
            color: @wtext;
            text-decoration: none;
          }

          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
}
</style>