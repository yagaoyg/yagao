<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="note">
    <el-row>
      <el-col :span="24">
        <div class="note-content">
          <div class="left">
            <div class="title">
              <RouterLink to="/md/0" class="link">
                我是笔记标题
              </RouterLink>
            </div>
            <div class="info">
              <el-icon size="22px">
                <Clock />
              </el-icon>
              <p class="time">2025 - 02 - 17</p>
            </div>
            <div class="abstract-content">
              <el-text class="abstract" truncated>
                我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要我是笔记摘要
              </el-text>
            </div>
          </div>
          <div class="right">
            <div class="img">
              <img src="@/assets/images/note_default.png" alt="">
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.note {
  margin-top: 30px;

  .note-content {
    display: flex;
    justify-content: space-between;

    padding: 10px;
    width: 100%;
    height: 180px;

    overflow: hidden;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);

    color: @btext;

    .left {
      width: 70%;
      // background-color: pink;

      .title {
        font-size: 50px;

        .link {
          font-weight: bold;
          // color: @btext;
          text-decoration: none;

          background: linear-gradient(to bottom, #9c50db, #3b71dc);
          /*设置渐变的方向从左到右 颜色从ff0000到ffff00*/
          -webkit-background-clip: text;
          /*将设置的背景颜色限制在文字中*/
          -webkit-text-fill-color: transparent;
          /*给文字设置成透明*/
        }
      }

      .info {
        display: flex;
        height: 22px;

        font-size: 18px;
        color: #535353;

        .time {
          line-height: 22px;
        }
      }

      .abstract-content {

        .abstract {
          color: @btext;
          font-size: 20px;
        }
      }
    }

    .right {
      width: 240px;
      // background-color: skyblue;
      border-radius: 10px;
      overflow: hidden;

      .img {

        img {
          width: 100%;
          // height: 140px;
        }
      }


    }
  }
}
</style>