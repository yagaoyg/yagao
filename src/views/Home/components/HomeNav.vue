<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="nav-content">
    <div class="mask">
      <div class="container">
        <ul>
          <li>
            <RouterLink to="/"><i class="iconfont icon-home"></i>首页</RouterLink>
          </li>
          <li>
            <a href="http://shop.xduyg.top" target="_blank"><i class="iconfont icon-icon-test"></i>小兔鲜电商</a>
          </li>
          <li>
            <a href="https://github.com/yagaoyg/yagao" target="_blank"><i
                class="iconfont icon-GitHub"></i>本项目GitHub地址</a>
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
.nav-content {
  width: 100%;
  height: 40px;
  background-image: url(@back);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  line-height: 1;

  @fz: 18px;
  font-size: @fz;

  .mask {
    width: 100%;
    height: 100%;
    // background-color: rgba(255, 255, 255, 0.05);
    // backdrop-filter: blur(10px);

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