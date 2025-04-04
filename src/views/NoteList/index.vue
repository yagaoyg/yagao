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
const mdList = ref([])

const getList = async () => {
  const temp = await getMdList()
  console.log(temp)
  mdList.value = temp
  console.log(mdList.value)
}

onMounted(() => {
  getList()
})

</script>

<template>
  <div class="note-list-content">
    <div class="container">
      <div class="upload">
        <router-link to="/md/upload" class="upload-link">上传md笔记</router-link>
      </div>
      <div class="note-list">
        <NoteCard v-for="i in mdList" :key="i.id" :note-data="i" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.note-list-content {
  padding-top: 60px;
  min-height: 1200px;

  background-image: url(@back);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.upload {
  width: 100%;
  height: 60px;

  overflow: hidden;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);

  color: @btext;
  text-align: center;

  .upload-link {
    font-weight: bold;
    text-decoration: none;

    font-size: 40px;
    line-height: 60px;

    // 设置渐变的方向从左到右 颜色从ff0000到ffff00
    background: linear-gradient(to bottom, #9c50db, #3b71dc);
    // 将设置的背景颜色限制在文字中
    background-clip: text;
    // 给文字设置成透明
    -webkit-text-fill-color: transparent;
  }
}

.note-list {
  padding-bottom: 100px;
}
</style>