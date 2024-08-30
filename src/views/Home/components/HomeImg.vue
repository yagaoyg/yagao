<script setup>

</script>

<template>
  <div class="img-content">
    <div class="text">
      <h2>WELCOME!</h2>
      <p>欢迎来到 YAGAO 的主页</p>
    </div>
    <div class="down">
      <i class="iconfont icon-direction-down"></i>
    </div>
  </div>
</template>

<style scoped lang="less">
.img-content {
  position: relative;
  width: 100%;
  height: 760px;
  background-image: url(@back);
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

  .down {
    position: absolute;
    left: 50%;
    top: 85%;
    transform: translate(-50%, -50%);
    color: rgba(255, 255, 255, 0.8);
    animation: arrow 1.5s infinite alternate;

    i {
      font-size: 80px;
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

@keyframes arrow {
  from {
    transform: translate(-50%, -50%);
  }

  to {
    transform: translate(-50%, -80%);
  }
}
</style>