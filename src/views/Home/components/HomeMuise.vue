<script setup>
import { computed, onMounted, ref } from 'vue'

const audio = ref(null)
// const audioSrc = ref()
const playIcon = ref(null)
const bar = ref(null)
const songs = ref([
  'Reach Me - Track in Time',
  'ALisa - Lauv-I Like Me Closer (Remix)',
  'so far away',
  '4'
])

const currSong = ref(0)
const currTime = ref(0)
const currMin = ref(0)
const currSec = ref(0)
const songTime = ref(0)
const songMin = ref(0)
const songSec = ref(0)

// 补0函数
const padZero = (num, n = 2) => {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

// 获取音乐时长
const getSongLen = () => {
  songTime.value = audio.value.duration
  // console.dir(audio.value)
  // console.dir(document.querySelector('.muise'))
  // console.log(songTime.value)
  songMin.value = computed(() => padZero(parseInt(songTime.value / 60) % 60))
  songSec.value = computed(() => padZero(parseInt(songTime.value % 60)))
  reserBar()
}

// 获取当前播放时间
const getCurrTime = () => {
  currTime.value = audio.value.currentTime
  currMin.value = padZero(parseInt(currTime.value / 60) % 60)
  currSec.value = padZero(parseInt(currTime.value % 60))
  // console.log(currTime.value)
}

// 重置进度条
const reserBar = () => {
  bar.value.value = 0
  bar.value.max = songTime.value
}

// 音量控制
const changeVolume = (vol = 0.5) => {
  audio.value.volume = vol
}

// 切换音乐
const changeSong = (index = 0) => {
  audio.value.src = `src/assets/audio/${songs.value[index]}.mp3`
  console.log(`现在播放${songs.value[index]}`)
}

// 播放音乐
const play = () => {
  audio.value.play()
  console.log(audio.value.paused)
  // console.log(`play ${audioSrc.value.src}`)
  playIcon.value.innerHTML = '<i class="iconfont icon-pause" style="font-size:30px"></i>'
}

// 暂停音乐
const pause = () => {
  audio.value.pause()
  console.log(audio.value.paused)
  playIcon.value.innerHTML = '<i class="iconfont icon-caret-right" style="font-size:30px"></i>'
}

// 播放暂停处理 
const playHanndler = () => {
  if (audio.value.paused) {
    play()
  } else {
    pause()
  }
}

// 上一首音乐
const prevSong = async () => {
  if (currSong.value === 0) {
    currSong.value = songs.value.length - 1
  } else {
    currSong.value--
  }
  await changeSong(currSong.value)
  play()
}

// 下一首音乐
const nextSong = async () => {
  if (currSong.value === songs.value.length - 1) {
    currSong.value = 0
  } else {
    currSong.value++
  }
  await changeSong(currSong.value)
  play()
}

// 播放结束
const songEnd = () => {
  playIcon.value.innerHTML = '<i class="iconfont icon-caret-right" style="font-size:30px"></i>'
}

// 监听进度条
const barChange = () => {
  // 用audio不行 不知道为什么
  document.querySelector('.muise').currentTime = bar.value.value
}


onMounted(() => {
  // 初始音量0.5
  changeVolume()
  // 默认播放
  changeSong(currSong.value)

})

</script>

<template>
  <div class="muise-content">
    <div class="muise-img">
      <img src="@/assets/images/default.png" alt="">
    </div>
    <div class="muise-info">
      <div class="title">Track in Time</div>
      <div class="singer">Reach Me</div>
    </div>
    <div class="muise-control">
      <!-- 喜欢 -->
      <!-- <div class="like">
        <i class="iconfont icon-heart"></i>
      </div> -->
      <!-- 音量 -->
      <div class="volume">
        <i class="iconfont icon-yinliang"></i>
        <div class="volume-bar">
          <i class="iconfont icon-minus"></i>
          <input type="range" value="0" step="1" min="0" max="100">
          <i class="iconfont icon-add"></i>
        </div>
      </div>

      <!-- 播放控件 -->
      <div class="play-control">
        <div class="prev" @click=prevSong(currSong)>
          <i class="iconfont icon-step-backward"></i>
        </div>
        <div class="play" @click="playHanndler" ref="playIcon">
          <i class="iconfont icon-caret-right"></i>
        </div>
        <div class="next" @click="nextSong(currSong)">
          <i class="iconfont icon-step-forward"></i>
        </div>
      </div>
    </div>
    <div class="muise-bar">
      <span class="currtime">{{ currMin }}:{{ currSec }}</span>
      <input type="range" class="bar" :value="currTime" step="1" min="0" max="100" ref="bar" @input="barChange()">
      <audio class="muise" ref="audio" src="@/assets/audio/Reach Me - Track in Time.mp3" @canplay="getSongLen()"
        @timeupdate="getCurrTime()" @ended="songEnd()">
        <!-- <source src="@/assets/audio/Reach Me - Track in Time.mp3" ref="audioSrc"> -->
      </audio>
      <span class="duration">{{ songMin }}:{{ songSec }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.muise-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  border-radius: 10px;
  color: @btext;
  background-color: rgba(255, 255, 255, 0.8);

  .muise-img {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .muise-info {
    margin-left: 40px;
    margin-right: 40px;
    text-align: center;
    // background-color: pink;

    .title {
      font-size: 22px;
    }

    .singer {
      font-size: 16px;
    }
  }

  .muise-control {
    display: flex;
    width: 250px;
    justify-content: space-between;
    align-items: center;

    .play-control {
      display: flex;

      .play {
        width: 30px;
        height: 30px;
        // background-color: #fff;

        .iconfont {
          // margin-left: 5px;
          // margin-right: 5px;
          font-size: 30px;
        }
      }

      .iconfont {
        margin-left: 5px;
        margin-right: 5px;
        font-size: 30px;
      }
    }

    .volume {
      position: relative;

      .volume-bar {
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: -100%;
        left: -80px;
        width: 180px;
        height: 30px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.2);
        visibility: hidden;
        // backdrop-filter: blur(10px);

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 5px;

          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            margin-top: 2px;
            height: 8px;
            width: 8px;
            border-radius: 4px;
            background-color: #d84040;
          }

          // &::-webkit-slider-runnable-track {
          //   height: 5px;
          //   background: #eee;
          //   /* 轨道背景色 */
          //   border-radius: 5px;
          //   /* 圆角 */
          // }
        }
      }

      .iconfont {
        font-size: 20px;
      }
    }
  }

  .muise-bar {
    margin-left: 45px;

    .currtime {
      margin-right: 15px;
    }

    .duration {
      margin-left: 15px;
    }

    input[type=range] {
      position: relative;
      bottom: 3px;
      -webkit-appearance: none;
      margin: 0;
      padding: 0;
      width: 600px;
      height: 6px;
      outline: none;
      overflow: hidden;
      border-radius: 3px;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 6px;
        height: 6px;
        background-color: rgb(32, 164, 204);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: -100vw 0 0 100vw rgb(61, 91, 100);
      }

      &::-moz-range-thumb {
        -webkit-appearance: none;
        width: 8px;
        height: 8px;
        background-color: rgb(32, 164, 204);
      }

      &::-ms-thumb {
        -webkit-appearance: none;
        width: 8px;
        height: 8px;
        background-color: rgb(32, 164, 204);
        border-radius: 100%;
      }
    }
  }
}
</style>