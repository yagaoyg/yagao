<script setup>

</script>


<template>
  <div class="content">
    <div class="start">
      <div class="title">在屏幕变绿后第一时间点击！看看您的反应时间</div>
      <div class="start-btn">点击此处开始</div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  color: @wtext;
  user-select: none;

  .start {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;

    background-color: #2B87D1;

    font-size: 30px;

    .title {
      font-size: 40px;
    }

    .start-btn {
      width: 300px;
      height: 80px;

      border-radius: 10px;
      border: 1px solid @wtext;

      line-height: 80px;
      text-align: center;
    }
  }
}
</style>