<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import { uploadMd } from '@/apis/mdAPI'

// 表单数据响应式对象
const formData = ref({
  key: '',        // 上传密钥
  title: '',      // 文章标题
  abstract: '',   // 文章摘要
  mdFile: null    // markdown文件对象
})

// 拖拽状态标识
const dragActive = ref(false)

/**
 * 从markdown文件生成摘要
 * @param {File} file - markdown文件对象
 */
const generateAbstract = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target.result
    // 移除markdown特殊字符并截取前50个字符作为摘要
    const plainText = content.replace(/[#*`[\]]/g, '').trim()
    formData.value.abstract = plainText.substring(0, 50) + '...'
  }
  reader.readAsText(file)
}

/**
 * 处理文件选择事件
 * @param {Event} e - 文件选择事件对象
 */
const handleFileChange = (e) => {
  const file = e.target.files[0]
  formData.value.mdFile = file
  if (file) {
    generateAbstract(file)
  }
}

/**
 * 处理拖拽进入事件
 * @param {DragEvent} e - 拖拽事件对象
 */
const handleDragEnter = (e) => {
  e.preventDefault()
  dragActive.value = true
}

/**
 * 处理拖拽离开事件
 * @param {DragEvent} e - 拖拽事件对象
 */
const handleDragLeave = (e) => {
  e.preventDefault()
  dragActive.value = false
}

/**
 * 处理文件拖放事件
 * @param {DragEvent} e - 拖放事件对象
 */
const handleDrop = (e) => {
  e.preventDefault()
  dragActive.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.name.endsWith('.md')) {
    formData.value.mdFile = file
    generateAbstract(file)
  } else {
    alert('请上传.md文件')
  }
}

/**
 * 格式化日期为yyyy-MM-dd hh:mm格式
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期字符串
 */
const formatDate = (date) => {
  const pad = (n) => (n < 10 ? '0' + n : n)
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

/**
 * 处理表单提交
 * 自动生成当前时间，构建FormData并上传
 */
const handleSubmit = async () => {
  const data = new FormData()
  data.append('key', formData.value.key)
  data.append('title', formData.value.title)
  data.append('time', formatDate(new Date())) // 使用自定义格式化函数生成时间
  data.append('abstract', formData.value.abstract)
  data.append('file', formData.value.mdFile)

  // console.log(data)

  const result = await uploadMd(data)
  if (result.success) {
    alert('上传成功')
    formData.value = {
      title: '',
      abstract: '',
      mdFile: null
    }
  } else {
    alert(`上传失败: ${result.msg}`)
  }
}

/**
 * 清除已选择的文件和摘要
 */
const clearFile = () => {
  formData.value.mdFile = null
  formData.value.abstract = ''
}
</script>

<template>
  <!-- 上传页面主容器 -->
  <div class="upload-content">
    <div class="container">
      <!-- 返回笔记列表 -->
      <div class="back">
        <router-link to="/md" class="back-link">返回笔记列表</router-link>
      </div>
      <!-- 上传表单区域 -->
      <div class="upload-form">
        <h2>上传笔记</h2>
        <div class="form-item">
          <input type="text" v-model="formData.title" placeholder="笔记标题">
        </div>
        <div class="form-item">
          <input type="text" v-model="formData.key" placeholder="上传密钥">
        </div>
        <div class="form-item">
          <textarea v-model="formData.abstract" placeholder="自动生成摘要..." disabled></textarea>
        </div>
        <!-- 文件拖放区域 -->
        <div class="drop-zone" :class="{ active: dragActive }" @dragenter="handleDragEnter" @dragleave="handleDragLeave"
          @dragover.prevent @drop="handleDrop">
          <input type="file" accept=".md" @change="handleFileChange" class="file-input" name="file" />
          <div class="drop-zone-text">
            <i class="iconfont icon-upload"></i>
            <p>点击或拖拽上传MD文件</p>
            <div v-if="formData.mdFile" class="selected-file">
              <p>已选择: {{ formData.mdFile.name }}</p>
              <button class="clear-btn" @click.stop="clearFile">
                <i class="iconfont icon-close"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="form-item">
          <button @click="handleSubmit" :disabled="!formData.mdFile">上传</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
/* 上传页面样式 */
.upload-content {
  padding-top: 100px;
  min-height: 100vh;
  background-image: url(@back);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;

  .back {
    margin: 0 auto 30px;
    width: 600px;
    height: 60px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;

    .back-link {
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

  /* 上传表单样式 */
  .upload-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;

    h2 {
      text-align: center;
      margin-bottom: 20px;
      color: @btext;
    }

    /* 表单项样式 */
    .form-item {
      margin-bottom: 20px;

      input[type="text"],
      textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        outline: none;
      }

      textarea {
        height: 100px;
        resize: vertical;
      }

      textarea:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }

      button {
        width: 100%;
        padding: 12px;
        background: linear-gradient(to right, #9c50db, #3b71dc);
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 16px;
        cursor: pointer;

        &:hover {
          opacity: 0.9;
        }
      }
    }

    /* 拖放区域样式 */
    .drop-zone {
      position: relative;
      width: 100%;
      height: 200px;
      border: 2px dashed #9c50db;
      border-radius: 10px;
      margin-bottom: 20px;
      transition: all 0.3s;
      user-select: none;

      &.active {
        border-color: #9c50db;
        background-color: rgba(156, 80, 219, 0.1);
      }

      /* 文件选择输入框 */
      .file-input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }

      /* 拖放区域文本样式 */
      .drop-zone-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #666;

        .iconfont {
          font-size: 40px;
          color: #9c50db;
        }

        p {
          margin: 10px 0;
        }

        /* 已选择文件信息样式 */
        .selected-file {
          display: flex;
          align-items: center;
          gap: 10px;

          .clear-btn {
            padding: 4px 8px;
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              color: #9c50db;
            }

            .iconfont {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
