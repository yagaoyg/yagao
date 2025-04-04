<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { getMd } from '@/apis/mdAPI'

const mdData = ref({})

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (err) { console.log(err) }
    }

    return '' // use external default escaping
  }
})
const route = useRoute()

const mdStr = ref('')

const renderMd = async (id) => {
  mdData.value = await getMd(id)
  // console.log(tempStr)
  mdStr.value = md.render(mdData.value.content)
}

onMounted(() => {
  renderMd(route.params.id)
})

</script>

<template>
  <div class="mkd-layout">
    <el-row class="my-row">
      <el-col :xs="23" :sm="20" :md="16" :lg="16" :xl="16">
        <div class="back-content">
          <router-link to="/md" class="back-link">回到笔记列表</router-link>
        </div>
      </el-col>
    </el-row>
    <el-row class="my-row">
      <el-col :xs="23" :sm="20" :md="16" :lg="16" :xl="16">
        <div class="mkd-content">
          <div class="title">
            <h2>{{ mdData.title }}</h2>
            <div class="info">
              <i class="iconfont icon-time"></i>
              <div class="time">{{ mdData.time }}</div>
            </div>
          </div>
          <div class="text-content markdown-body" v-html="mdStr">
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.mkd-layout {
  padding-top: 60px;
  padding-bottom: 60px;
  width: 100%;
  // height: 1200px;
  min-height: 1000px;

  background-image: url(@back);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  .my-row {
    justify-content: center;

    .back-content {
      margin-bottom: 20px;
      padding: 5px;
      width: 100%;

      text-align: center;

      border: 1px solid #eee;
      border-radius: 10px;

      background-color: rgba(40, 40, 40, 0.8);
      backdrop-filter: blur(10px);

      .back-link {
        display: block;
        width: 100%;
        height: 100%;

        color: @wtext;
        font-size: 25px;
        text-decoration: none;
      }
    }

    .mkd-content {
      padding: 20px;
      width: 100%;
      // height: 100px;

      border: 1px solid #eee;
      border-radius: 10px;

      background-color: rgba(40, 40, 40, 0.8);
      backdrop-filter: blur(10px);

      color: @wtext;

      .title {
        margin-bottom: 20px;
        border-bottom: 1px solid @wtext;

        .info {
          display: flex;
          margin-bottom: 8px;
          height: 20px;

          .iconfont {
            font-size: 20px;

            &::before {
              padding-bottom: 5px;
            }
          }
        }

        .time {
          margin-right: 20px;
        }

        .author {
          line-height: 20px;
        }
      }

      .markdown-body {
        padding: 30px;
      }
    }
  }
}
</style>