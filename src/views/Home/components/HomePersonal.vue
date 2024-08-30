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
          <li>
            <a href="https://space.bilibili.com/3094069?spm_id_from=333.1007.0.0" target="_blank">
              <el-avatar :size="180" class="avatar"> <i class="iconfont icon-icon_bilibili-circle"></i> </el-avatar>
              <div class="text">YAGAO 的BILI主页</div>
              <i class="iconfont icon-arrow-right"></i>
            </a>
          </li>
          <li>
            <a href="https://steamcommunity.com/id/949899039/" target="_blank">
              <el-avatar :size="180" class="avatar"> <i class="iconfont icon-steam"></i> </el-avatar>
              <div class="text">YAGAO 的STEAM主页</div>
              <i class="iconfont icon-arrow-right"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/yagaoyg" target="_blank">
              <el-avatar :size="180" class="avatar"> <i class="iconfont icon-GitHub"></i> </el-avatar>
              <div class="text">YAGAO 的GITHUB主页</div>
              <i class="iconfont icon-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.person-content {
  width: 100%;
  height: 800px;
  background-image: url(@/assets/images/大图背景.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);

    .container {
      position: relative;
      height: 100%;
      // background-color: pink;

      ul {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        justify-content: space-evenly;
        padding: 0;
        width: 100%;

        li {
          width: 250px;
          height: 400px;
          background-color: @wback;
          border-radius: 10px;
          list-style-type: none;
          text-align: center;

          a {
            display: block;
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: @maincolor;
            font-size: 22px;

            &:hover {
              cursor: default;
            }

            .avatar {
              margin: 60px ((250px - 180px)/2px) 40px;

              i {
                font-size: 200px;
              }
            }

            i {
              display: block;
              margin-top: 15px;
              font-size: 20px;
            }
          }
        }

        li:nth-child(1) {
          background-color: #00aeec;

          a {
            color: @wtext;

            .avatar {
              i {
                font-size: 250px;
              }
            }
          }
        }

        li:nth-child(2) {
          background-color: #1b2838;

          a {
            color: @wtext;
          }
        }

        li:nth-child(3) {
          background-color: #010409;

          a {
            color: @wtext;
          }
        }
      }
    }
  }
}
</style>