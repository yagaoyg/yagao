<script setup>

</script>

<template>
  <div class="footer-content">
    <div class="container">
      <div class="yg">Copyright © 2024 YAGAO 版权所有</div>
      <div class="ba"><a href="https://beian.miit.gov.cn" target="_blank">
          <!-- <img src="@/assets/images/备案.png" alt=""> -->
          陕ICP备2023021393号-2</a></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.footer-content {
  height: 100px;
  // background-image: url(@/assets/images/大图背景.jpg);
  // background-attachment: fixed;
  // background-color: rgba(255, 255, 255, 0.2);
  // backdrop-filter: blur(10px);
  background-color: #333;
  color: @wtext;
  text-align: center;
  line-height: 50px;
  font-size: 18px;

  .yg {
    height: 50px;
  }

  .ba {
    height: 50px;
    background-color: #333;

    a {
      text-decoration: none;
      color: @wtext;
    }

    img {
      width: 22px;
      height: 22px;
    }
  }
}
</style>