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
                CSS实现简单的文字颜色渐变效果
              </RouterLink>
            </div>
            <div class="info">
              <el-icon size="22px">
                <Clock />
              </el-icon>
              <div class="time">2025 - 02 - 17</div>
            </div>
            <div class="abstract-content">
              <el-text class="abstract" truncated>
                实现文字颜色的渐变效果的思路是：将文字所在的元素背景设置为渐变色，且将背景颜色的绘制范围指定成文本，然后设置文字的背景色为透明。即可实现文字的颜色渐变效果。
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
    <el-row>
      <el-col :span="24">
        <div class="note-content">
          <div class="left">
            <div class="title">
              <RouterLink to="/md/1" class="link">
                2048小游戏制作
              </RouterLink>
            </div>
            <div class="info">
              <el-icon size="22px">
                <Clock />
              </el-icon>
              <div class="time">2025 - 02 - 17</div>
            </div>
            <div class="abstract-content">
              <el-text class="abstract" truncated>
                2048游戏是一个经典的益智游戏，玩家需要使用键盘上的方向键控制数字块移动并合并，目标是得到2048这个数字块，也可以一直进行游戏直到没有数字块可以合并。2048以其简单的规则、有趣的交互设计名扬天下，今天就让我们来用
                vue 复刻一下这款经典游戏。
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

  .note-content {
    display: flex;
    justify-content: space-between;

    margin-top: 30px;
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

          /*设置渐变的方向从左到右 颜色从ff0000到ffff00*/
          background: linear-gradient(to bottom, #9c50db, #3b71dc);
          background-clip: text;
          /*将设置的背景颜色限制在文字中*/
          // -webkit-background-clip: text;
          /*给文字设置成透明*/
          -webkit-text-fill-color: transparent;
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