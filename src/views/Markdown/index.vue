<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import axios from 'axios'

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

const getMd = (id) => {
  axios({
    method: 'get',
    url: `http://xduyg.top:3000/api/md/${id}`
  }).then((result) => {
    // console.log(result.data)
    mdStr.value = md.render(result.data)
  }).catch((err) => {
    console.dir(err)
  })
}

onMounted(() => {
  getMd(route.params.id)
})

</script>

<template>
  <div class="mkd-layout">
    <el-row class="my-row">
      <el-col :xs="23" :sm="20" :md="16" :lg="16" :xl="16">
        <div class="mkd-content">
          <div class="title">
            <h2>这里是标题</h2>
            <div class="info">
              <el-icon size="20px">
                <Clock />
              </el-icon>
              <div class="time">2025-02-17</div>
              <div class="author">BY: yagao</div>
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
          margin-bottom: 5px;
          height: 20px;
        }

        .time {
          margin-right: 20px;
          line-height: 20px;
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