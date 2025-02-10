<script setup>
import Game2048 from '@/components/Game2048.vue'
</script>

<template>
  <div class="game-content">
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- 2048 -->
        <div class="2048-content game">
          <Game2048 />>
        </div>
      </el-col>
      <el-col :span="12">
        <!-- 扫雷 -->
        <div class="saolei game">扫雷</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- 反应力测试 -->
        <div class="fanying game">反应力测试</div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.game-content {
  margin-top: 30px;

  .game {
    margin: 10px 0;
    height: 700px;
    background-color: rgba(255, 255, 255, 0.8);
    overflow: hidden;
    border-radius: 10px;

    color: @btext;
    font-size: 20px;
  }
}
</style>