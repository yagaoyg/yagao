<script setup>

</script>

<template>
  <div class="img-content">
    <div class="text">
      <h2>WELCOME!</h2>
      <p>欢迎来到 YAGAO 的主页</p>
    </div>
  </div>
</template>

<style scoped lang="less">
.img-content {
  position: relative;
  width: 100%;
  height: 760px;
  background-image: url(@/assets/images/大图背景.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  line-height: 1.2;

  .my-img {
    width: 100%;
  }

  .text {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: auto;
    padding: 40px 0;

    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);

    text-align: center;
    // line-height: 1.2;
    // border: 1px solid #000;
    border-radius: 10px;

    animation: imgload 1.2s forwards;

    h2 {
      font-size: 120px;
      color: @wtext;
    }

    p {
      font-size: 20px;
      color: @wtext;
    }
  }

}

@keyframes imgload {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>