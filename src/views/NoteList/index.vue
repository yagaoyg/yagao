<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import NoteCard from '@/components/NoteCard.vue'

/* 
noteData = {
  id:文章id,
  title:文章标题,
  time:文章创建时间,
  abstract:文章摘要,
  imgUrl:文章图片链接
}
*/
const noteData = {
  id: null,
  title: '测试标题',
  time: '2025 - 04 - 29',
  abstract: '测试摘要测试摘要测试摘要测试摘要测试摘要测试摘要测试摘要测试摘要测试摘要测试摘要测试摘要',
  imgUrl: null
}

</script>

<template>
  <div class="note-list-content">
    <div class="container">
      <div class="note-list">
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
                  <i class="iconfont icon-time"></i>
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
                  <img src="/images/note_default.webp" alt="">
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
                  <i class="iconfont icon-time"></i>
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
                  <img src="/images/note_default.webp" alt="">
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <NoteCard :note-data="noteData" />
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.note-list-content {
  min-height: 1200px;

  background-image: url(@back);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.note-list {

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
        height: 70px;
        font-size: 50px;

        .link {
          font-weight: bold;
          // color: @btext;
          text-decoration: none;

          // 设置渐变的方向从左到右 颜色从ff0000到ffff00
          background: linear-gradient(to bottom, #9c50db, #3b71dc);
          // 将设置的背景颜色限制在文字中
          background-clip: text;
          // 给文字设置成透明
          -webkit-text-fill-color: transparent;
        }
      }

      .info {
        display: flex;
        height: 22px;

        font-size: 18px;
        color: #535353;

        .iconfont {
          font-size: 20px;
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