<script setup>
import { ref } from 'vue'

// 游戏状态 有五种状态 ready waiting fail target result
const gameState = ref('ready')
const feedBackStr = ref('')

let startTime = 0
let endTime = 0
let timer = 0

let interval = 0

const feedBackList = [
  '请勿预判',
  '不像人类',
  '您的反应速度比肩职业选手！',
  '您的反应速度超越常人！',
  '您的反应速度非常快！',
  '您的反应速度处于平均水平',
  '您的反应速度还可以，多加练习就能提升！',
  '慢慢来，保持专注很重要！',
  '您睡着了吗？',
]

const getFeedBack = (time) => {
  if (time < 80) return feedBackList[0]
  else if (time < 150) return feedBackList[1]
  else if (time < 200) return feedBackList[2]
  else if (time < 220) return feedBackList[3]
  else if (time < 280) return feedBackList[4]
  else if (time < 350) return feedBackList[5]
  else if (time < 500) return feedBackList[6]
  else if (time < 2000) return feedBackList[7]
  else return feedBackList[8]

}

const resetTime = () => {
  startTime = 0
  endTime = 0
}
const start = () => {
  resetTime()
  gameState.value = 'waiting'
  // 启动时间范围 2s - 6s
  const randomTime = Math.floor(Math.random() * 4000 + 2000)
  console.log(randomTime)
  timer = setTimeout(() => {
    gameState.value = 'target'
    // console.log('目标出现')
    startTime = Date.now()
  }, randomTime)
}

const endTimeCount = () => {
  endTime = Date.now()
  interval = endTime - startTime
  // console.log(`本次计时持续${interval}ms`)
  resetTime()
  feedBackStr.value = getFeedBack(interval)
  gameState.value = 'result'
}

const toFast = () => {
  clearTimeout(timer)
  gameState.value = 'fail'
  resetTime()
}

// const toReady = () => {
//   gameState.value = 'ready'
//   clearTimeout(timer)
//   resetTime()
// }


</script>


<template>
  <div class="content">
    <div class="start" @click="start()">
      <div class="title">在屏幕变绿后第一时间点击！看看您的反应时间</div>
      <div class="start-btn">点击此处开始</div>
    </div>
    <div class="waiting mask" v-show="gameState === 'waiting'" @mousedown="toFast()">
      <div class="title">等待</div>
      <div class="msg">屏幕变绿后第一时间点击</div>
    </div>
    <div class="target mask" v-show="gameState === 'target'" @mousedown="endTimeCount()">
      <div class="title">点击！</div>
    </div>
    <div class="fail mask" v-show="gameState === 'fail'" @click="start()">
      <div class="title">您点击得太早了 请在变绿之后再点击</div>
      <div class="msg">点击重新开始</div>
    </div>
    <div class="result mask" v-show="gameState === 'result'" @click="start()">
      <div class="title">您本次的成绩是：{{ interval }} ms</div>
      <div class="msg">{{ feedBackStr }}</div>
      <div class="msg">点击在测一次</div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  color: @wtext;
  user-select: none;
  // overflow: hidden;

  .mask {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    font-size: 35px;
    color: @wtext;

    .title {
      margin-bottom: 30px;
      font-size: 60px;
    }

    .msg {
      margin-bottom: 20px;
      color: rgba(238, 238, 238, 0.8);
    }
  }

  .start {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    height: 100%;

    background-color: #2B87D1;

    font-size: 30px;

    .title {
      font-size: 40px;
    }

    .start-btn {
      width: 300px;
      height: 80px;

      // border-radius: 10px;
      // border: 1px solid @wtext;

      line-height: 80px;
      text-align: center;
    }
  }

  .waiting {
    background-color: #4791cf;
    cursor: pointer;
  }

  .target {
    background-color: #09ae30;
    cursor: pointer;
  }

  .fail {
    background-color: #dd3851;
    cursor: pointer;
  }

  .result {
    background-color: #2B87D1;
  }
}
</style>