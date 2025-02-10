<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue'

const gameState = ref('ready')
const matrix = ref([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
])
const row = matrix.value.length
const col = matrix.value[0].length
const score = ref(0)
let topScore = ref(0)

// const printMatrix = () => {
//   for (let i = 0; i < row; i++) {
//     console.log(`${i} | ${matrix.value[i].join(' ')}`)
//   }
// }

const cal = (i, j, direction) => {
  const next = getNextNonZero(i, j, direction)
  if (!next) return
  const [iNextNZ, jNextNZ, valueNext] = next
  // 当前位置是0 交换两格
  if (matrix.value[i][j] === 0) {
    matrix.value[i][j] = valueNext
    matrix.value[iNextNZ][jNextNZ] = 0
  }
  // 当前位置不是0 下个位置的值与当前位置的值相同 合并 把下个位置的值设置为0
  // 要在这个阶段计算得分
  else if (matrix.value[i][j] === valueNext) {
    matrix.value[i][j] = valueNext * 2
    matrix.value[iNextNZ][jNextNZ] = 0

    // 计算这步的得分 本步得分 = log2(valueNext) * 10
    score.value += Math.log2(valueNext) * 10

    const [iNext, jNext] = getNext(i, j, direction)
    cal(iNext, jNext, direction)
    return
  }
  // 当前位置不是0 下个位置的值与当前位置的值不相同 不合并 直接进入下一个位置进行计算（不管是不是非零
  else if (matrix.value[i][j] !== valueNext) {
    const [iNext, jNext] = getNext(i, j, direction)
    cal(iNext, jNext, direction)
    return
  } else {
    return
  }
  cal(i, j, direction)
}

const isInRange = (i, j) => {
  return i >= 0 && i < row && j >= 0 && j < col
}

// 得到下一个位置
const getNext = (i, j, direction) => {
  if (direction === 'up') {
    return [i + 1, j]
  } else if (direction === 'down') {
    return [i - 1, j]
  } else if (direction === 'left') {
    return [i, j + 1]
  } else if (direction === 'right') {
    return [i, j - 1]
  }
}

// 得到下一个非零位置 [iNext, jNext,val]
const getNextNonZero = (i, j, direction) => {
  let [iNext, jNext] = getNext(i, j, direction)
  if (!isInRange(i, j)) return
  while (isInRange(iNext, jNext)) {
    const value = matrix.value[iNext][jNext]
    if (value !== 0) {
      return [iNext, jNext, value]
    }
    else {
      [iNext, jNext] = getNext(iNext, jNext, direction)
    }
  }
  return null
}

const move = (direction) => {
  if (gameState.value === 'gameover') return
  if (gameState.value === 'ready') return
  if (direction === 'up') {
    for (let i = 0; i < col; i++) {
      cal(0, i, 'up')
    }
  } else if (direction === 'down') {
    for (let i = 0; i < col; i++) {
      cal(row - 1, i, 'down')
    }
  } else if (direction === 'left') {
    for (let i = 0; i < row; i++) {
      cal(i, 0, 'left')
    }
  } else if (direction === 'right') {
    for (let i = 0; i < row; i++) {
      cal(i, col - 1, 'right')
    }
  } else {
    alert('方向无效')
    return
  }
  genNum()
}

// 得到没有数字的位置
const getEmptyList = () => {
  const emptyList = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix.value[i][j] === 0) {
        emptyList.push([i, j])
      }
    }
  }
  return emptyList
}

// 判断游戏是否结束
const isGameOver = () => {
  const emptyList = getEmptyList()
  if (emptyList.length === 0) {
    for (let i = 0; i < row - 1; i++) {
      for (let j = 0; j < col; j++) {
        if (matrix.value[i][j] === matrix.value[i + 1][j]) {
          return false
        }
      }
    }
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col - 1; j++) {
        if (matrix.value[i][j] === matrix.value[i][j + 1]) {
          return false
        }
      }
    }
    gameState.value = 'gameover'
    return true
  } else return false
}

// 生成数字
const genNum = (num = 0) => {
  const emptyList = getEmptyList()
  if (emptyList.length !== 0) {
    const randomIndex = Math.floor(Math.random() * emptyList.length)
    const [row, col] = emptyList[randomIndex]
    if (num === 0) matrix.value[row][col] = Math.random() > 0.4 ? 2 : 4
    else matrix.value[row][col] = num
  }
  gameOverHandler()
}

// 矩阵清零
const resetMatrix = () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      matrix.value[i][j] = 0
    }
  }
}

// 重置棋盘
const reset = () => {
  topScoreUpdate()
  gameState.value = 'playing'
  score.value = 0
  resetMatrix()
  genNum(2)
  genNum(2)
}

const pressToMove = (e) => {
  // console.log(e.code)
  if (e.code === 'ArrowUp') move('up')
  else if (e.code === 'ArrowDown') move('down')
  else if (e.code === 'ArrowLeft') move('left')
  else if (e.code === 'ArrowRight') move('right')
}

// 游戏结束处理 保存最高分等操作
const gameOverHandler = () => {
  if (isGameOver()) {
    topScoreUpdate()
  }
}

const topScoreUpdate = () => {
  // 本次得分与本地最高分比较
  if (score.value > topScore.value) {
    topScore.value = score.value
    localStorage.setItem('topScore', topScore.value)
  }
}

// 本地最高分初始化
const topScoreInit = () => {
  if (!localStorage.getItem('topScore')) {
    localStorage.setItem('topScore', 0)
  }
  topScore.value = localStorage.getItem('topScore')
  console.log(topScore.value)
}

// 回到小游戏首页
const toReady = () => {
  resetMatrix()
  score.value = 0
  gameState.value = 'ready'
}

onMounted(() => {
  // reset()
  // printMatrix()
  topScoreInit()
})
</script>

<template>
  <div class="content" @keydown.prevent="pressToMove" tabindex="-1">
    <div class="head">
      <div class="back"><i class="iconfont icon-home" @click="toReady()"></i></div>
      <div class="title">2048</div>
      <div class="reset"><i class="iconfont icon-zhongzhi" @click="reset()"></i></div>
    </div>
    <div class="main">
      <div class="big">
        <!-- 得分 -->
        <div class="score">
          <div class="point">NOW : <span class="now">{{ score }}</span></div>
          <div class="point">TOP : <span class="top">{{ topScore }}</span></div>
        </div>
        <!-- 游戏区域 -->
        <div class="playing">
          <div class="my-row" v-for="(item, rowIndex) in matrix" :key="rowIndex">
            <div class="cell" v-for="(i, colIndex) in item" :key="`${rowIndex}+${colIndex}`" :class="`cell-${i}`">{{ i
              !== 0 ? i : '' }}</div>
          </div>
        </div>
        <div class="mask" v-show="gameState === 'ready'">
          <div class="start my-btn" @click="reset()">
            开始游戏
          </div>
        </div>
        <div class="mask" v-show="gameState === 'gameover'">
          <div class="msg">游戏结束</div>
          <div class="game-score">您的得分是 : {{ score }}</div>
          <div class="new-top msg" v-show="score >= topScore">新纪录！</div>
          <div class="restart my-btn" @click="reset()">
            重新开始游戏
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #FAF8EF;
  color: @btext;
  user-select: none;

  .head {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 0 80px;
    // width: 100%;
    height: 50px;

    font-weight: bold;
    font-size: 40px;
    text-align: center;

    .iconfont {
      font-size: 40px;
      color: @btext;
      cursor: pointer;
    }
  }

  .main {
    flex: 1;
    position: relative;
    font-size: 24px;

    .big {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 555px;
      border-radius: 10px;
      background-color: #bbada0;

      .score {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;

        .point {
          width: 240px;
          height: 50px;

          border-radius: 10px;
          background-color: #A78D74;

          color: @wtext;
          text-align: center;
          line-height: 50px;
        }
      }

      .playing {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        padding-left: 10px;
        height: 500px;

        .my-row {
          display: flex;
          margin-bottom: 10px;
          // width: 492px;
          height: 120px;
          background-color: #BBADA0;

          .cell {
            // margin-bottom: 10px;
            margin-right: 10px;
            padding: 0;
            width: 112.5px;
            height: 112.5px;

            border-radius: 10px;
            background-color: #CDC1B4;

            text-align: center;
            line-height: 112.5px;
            font-size: 50px;
            color: @wtext;

            transition: all 0.2s ease;
          }

          .cell-0 {
            color: #CDC1B4;
          }

          .cell-2 {
            background-color: #eee4da;
            color: #776E65;
          }

          .cell-4 {
            background-color: #ede0c8;
            color: #776E65;
          }

          .cell-8 {
            background-color: #f2b179;
          }

          .cell-16 {
            background-color: #f59563;
          }

          .cell-32 {
            background-color: #f67c5f;
          }

          .cell-64 {
            background-color: #f65e3b;
          }

          .cell-128 {
            background-color: #edcf72;
          }

          .cell-256 {
            background-color: #edcc61;
          }

          .cell-512 {
            background-color: #edc850;
          }

          .cell-1024 {
            background-color: #edc53f;
          }

          .cell-2048 {
            background-color: #edc22e;
          }
        }
      }

      .mask {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 50px;
        width: 500px;
        height: 500px;
        background-color: rgba(186, 178, 171, 0.85);
        color: @wtext;

        .my-btn {
          width: 300px;
          height: 100px;

          border-radius: 10px;
          background-color: #A78D74;

          font-size: 50px;
          text-align: center;
          line-height: 100px;

          cursor: pointer;
        }

        .restart {
          font-size: 40px;
        }

        .game-score {
          font-size: 30px;
        }

        .msg {
          font-size: 50px;
        }
      }
    }


  }
}
</style>