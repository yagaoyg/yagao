<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import NoteCard from '@/components/NoteCard.vue'
import { getMdList } from '@/apis/mdAPI'
import { ref, onMounted } from 'vue'

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

const mdList = ref([])

const getList = async () => {
  const temp = await getMdList()
  console.log(temp)
  mdList.value = temp
  // console.log(mdList.value)
}

onMounted(() => {
  getList()
})

</script>

<template>
  <div class="note-list-content">
    <div class="container">
      <div class="note-list">
        <NoteCard v-for="i in mdList" :key="i.id" :note-data="i" />
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