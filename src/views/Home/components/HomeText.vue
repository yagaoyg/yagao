<script setup>
import { onMounted, ref } from 'vue'

const text = ref(null)
let index = 0
let timer = 0

// 文本列表 每个句子最多76个字符 多了装不下
const textList = [
  'Welcome to my website!',
  'Life is simple.',
  'I love JavaScript!',
  'Click here to switch to next sentence.',
  'Are you lost?',
  'Thanks for your visit.',
  'This is YAGAO\'s personal website!',
  'XDU is xidian university.',
  'Tippppppppp'
]


const nextAnimation = (index) => {
  text.value.innerText = textList[index]
  const keyframes = [
    { width: 0 },
    { width: `${textList[index].length * 17}px` }
  ]
  const options = {
    duration: 4000,
    fill: 'both',
    easing: `steps(${textList[index].length}, end)`,
  }
  text.value.animate(keyframes, options)
}

const nextText = () => {
  clearInterval(timer)
  if (index < textList.length - 1) {
    index++
    nextAnimation(index)
  } else {
    index = 0
    nextAnimation(index)
  }
  autoNext()
}

const autoNext = () => {
  timer = setInterval(() => {
    nextText()
  }, 8000)
}

onMounted(() => {
  nextAnimation(index)
  autoNext()
})

</script>

<template>
  <div class="text-content">
    <div class="line animation" ref="text" @click="nextText()">
      Welcome to my website!
      <!-- Life is simple. -->
    </div>
  </div>
</template>

<style scoped lang="less">
.text-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  height: 60px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.8);

  .line {
    margin: auto 0;
    // width: 100%;
    height: 28px;
    overflow: hidden;

    // vertical-align: middle;
    line-height: 28px;
    color: @btext;
    font-size: 28px;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    white-space: nowrap;
    user-select: none;

    border-right: 2px solid @btext;
  }

  .animation {
    animation:
      // grow 4s steps(22) 1s normal both,
      blink 600ms steps(22) infinite normal;
  }
}

@keyframes grow {
  from {
    width: 0;
  }

  to {
    width: 371px;
  }
}

@keyframes blink {
  from {
    border-right-color: @btext;
  }

  to {
    border-right-color: rgba(255, 255, 255, 0.8);
  }
}
</style>