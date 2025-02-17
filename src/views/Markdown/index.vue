<!-- eslint-disable vue/multi-word-component-names -->
<script setup>


</script>

<template>
  <div class="mkd-layout">
    <el-row class="my-row">
      <el-col :xs="23" :sm="20" :md="16" :lg="16" :xl="16">
        <div class="mkd-content">
          <div class="title">这里是标题</div>
          <div class="text-content">
            这里是内容
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.mkd-layout {
  padding-top: 60px;
  width: 100%;
  height: 1200px;

  background-image: url(@back);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  .my-row {
    justify-content: center;

    .mkd-content {
      padding: 20px;
      width: 100%;
      height: 100px;

      border: 2px solid #eee;
      border-radius: 20px;

      background-color: rgba(30, 30, 30, 0.8);

      color: @wtext;
    }
  }
}
</style>