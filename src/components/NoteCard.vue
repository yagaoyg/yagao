<script setup>
defineProps({
  noteData: Object
})

const defaultAbstract = '这里是摘要这里是摘要这里是摘要这里是摘要这里是摘要这里是摘要这里是摘要这里是摘要这里是摘要这里是摘要这里是摘要'

</script>

<template>
  <el-row>
    <el-col :span="24">
      <div class="note-content">
        <div class="left">
          <div class="title">
            <RouterLink :to="`/md/${noteData.id || 404}`" class="link">
              {{ noteData.title || '这里是文章标题' }}
            </RouterLink>
          </div>
          <div class="info">
            <el-icon size="22px">
              <Clock />
            </el-icon>
            <div class="time">{{ noteData.time || '这里是时间' }}</div>
          </div>
          <div class="abstract-content">
            <el-text class="abstract" truncated>
              {{ noteData.abstract || defaultAbstract }}
            </el-text>
          </div>
        </div>
        <div class="right">
          <div class="img">
            <img :src="noteData.imgUrl || '@/assets/images/note_default.png'" alt="">
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
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
</style>