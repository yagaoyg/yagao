<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'

const debug = ref(false)
const gameState = ref('ready')
// -1表示地雷 -2表示未翻开 -3表示插旗 0表示翻开但无数字 1-8表示数字
const matrix = ref([
  [-2, -2, -2, -2, -2, -2, -2, -2],
  [-2, -2, -2, -2, -2, -2, -2, -2],
  [-2, -2, -2, -2, -2, -2, -2, -2],
  [-2, -2, -2, -2, -2, -2, -2, -2],
  [-2, -2, -2, -2, -2, -2, -2, -2],
  [-2, -2, -2, -2, -2, -2, -2, -2],
  [-2, -2, -2, -2, -2, -2, -2, -2],
  [-2, -2, -2, -2, -2, -2, -2, -2]
])
const row = matrix.value.length
const col = matrix.value[0].length

// 炸弹数量
const bombNum = 10

// 显示的炸弹数量
const showBombNum = ref(bombNum)

// 计时器标记
let timer = null

// 显示的用时
const showTime = ref(0)

// const printMatrix = () => {
//   for (let i = 0; i < row; i++) {
//     console.log(`${i} | ${matrix.value[i].join(' ')}`)
//   }
// }

// 矩阵重置
const resetMatrix = () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      matrix.value[i][j] = -2
      document.querySelector(`.cell-${i}-${j}`).classList.add('hide')
      document.querySelector(`.cell-${i}-${j}`).classList.remove('flag')
      if (!debug.value) document.querySelector(`.cell-${i}-${j}`).classList.add('no-debug')
    }
  }
}

// 得到空位列表
const getEmptyList = () => {
  const emptyList = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix.value[i][j] === -2) {
        emptyList.push([i, j])
      }
    }
  }
  return emptyList
}

// 生成炸弹
const genBomb = () => {
  // 1. 得到空位列表
  const emptyList = getEmptyList()
  if (emptyList.length === 0) return
  // 2. 不重复地随机选取 n 个点对 加入炸弹列表
  const bombList = []
  while (bombList.length < bombNum) {
    const index = Math.floor(Math.random() * emptyList.length)
    const [row, col] = emptyList[index]
    if (bombList.find(item => item.join() == [row, col].join())) continue
    else {
      bombList.push([row, col])
      matrix.value[row][col] = -1
    }
  }
}

// 判断下标是否在矩阵内
const isInRange = (i, j) => {
  return i >= 0 && i < row && j >= 0 && j < col
}

// 得到单个格子周围格子的坐标列表
const getAroundList = (i, j) => {
  const list = []
  for (let x = i - 1; x <= i + 1; x++) {
    for (let y = j - 1; y <= j + 1; y++) {
      if (x == i && y == j) continue
      if (isInRange(x, y)) list.push([x, y])
    }
  }
  return list
}

// 计算矩阵中单个格的值 
const calOne = (i, j) => {
  if (matrix.value[i][j] === -1) return -1
  let count = 0

  // 得到周围格子列表
  const aroundList = getAroundList(i, j)
  aroundList.forEach(item => {
    // 根据周围格子中的雷数给本格赋值
    if (matrix.value[item[0]][item[1]] === -1) count++
  })

  return count
}

// 计算矩阵中每个格的值
const cal = () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      matrix.value[i][j] = calOne(i, j)
    }
  }
}

// 去除某一格的 hide 类
const removeHide = (i, j) => {
  document.querySelector(`.cell-${i}-${j}`).classList.remove('hide')
}

// 去除某一格的 no-debug 类
const removeNoDebug = (i, j) => {
  document.querySelector(`.cell-${i}-${j}`).classList.remove('no-debug')
}
// 对这一格 从周围格列表中得到被隐藏的格子
const getHideList = (i, j) => {
  const list = []
  const aroundList = getAroundList(i, j)

  aroundList.forEach(item => {
    // 检查此格上有没有 hide 类名
    if (document.querySelector(`.cell-${item[0]}-${item[1]}`).classList.contains('hide')) {
      list.push(item)
    }
  })
  return list
}

// 去除类名处理
const removeClass = (i, j) => {
  removeHide(i, j)
  if (!debug.value) removeNoDebug(i, j)
}

// 打开某一格
const open = (i, j) => {
  // 点到炸弹 游戏结束
  if (matrix.value[i][j] === -1) {
    // 处理逻辑
    removeClass(i, j)
    gameFail()
    return
  }
  // 点到非零格 去除此格的 hide 类名
  else if (matrix.value[i][j] !== 0) {
    removeClass(i, j)
  }
  // 点到零格 打开此格 并打开周围的格子
  else if (matrix.value[i][j] === 0) {
    removeClass(i, j)
    const hideList = getHideList(i, j)
    hideList.forEach(([i, j]) => {
      open(i, j)
    })
  }
  // 判断是否胜利
  if (isWin()) {
    // 处理逻辑
    gameWin()
  }
}

// 回到小游戏首页
const toReady = () => {
  gameState.value = 'ready'
  resetMatrix()
  clearInterval(timer)
  showTime.value = 0
}

// 游戏失败处理
const gameFail = () => {
  clearInterval(timer)
  setTimeout(() => {
    gameState.value = 'gamefail'
  }, 150)
}

// 游戏胜利判定
const isWin = () => {
  // 胜利条件：打开了除了炸弹的所有格子
  // 思路：使用一个未隐藏格子列表 当此列表长度 = 所有格子数 - 炸弹数 时，游戏胜利
  let openNum = 0
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (!document.querySelector(`.cell-${i}-${j}`).classList.contains('hide')) openNum++
    }
  }
  if (openNum === row * col - bombNum) return true
  else return false
}

// 游戏胜利处理
const gameWin = () => {
  clearInterval(timer)
  setTimeout(() => {
    gameState.value = 'gamewin'
  }, 150)
}

// 插旗标记功能
const flag = (i, j) => {
  if (document.querySelector(`.cell-${i}-${j}`).classList.contains('hide')) {
    if (document.querySelector(`.cell-${i}-${j}`).classList.contains('flag')) {
      document.querySelector(`.cell-${i}-${j}`).classList.remove('flag')
      showBombNum.value++
    } else {
      document.querySelector(`.cell-${i}-${j}`).classList.add('flag')
      showBombNum.value--
    }
  }
}

const timerStart = () => {
  showTime.value = 0
  timer = setInterval(() => {
    showTime.value++
  }, 1000)
}
// 重置矩阵
const reset = () => {
  // 1. 清零
  resetMatrix()
  showBombNum.value = bombNum
  if (timer) clearInterval(timer)
  // 2. 生成地雷
  genBomb()
  // 3. 计算每个格子的值
  cal()
  // 4. 切换游戏状态
  gameState.value = 'playing'
  // 5. 打开计时器
  timerStart()
}

const switchDebug = () => {
  debug.value = !debug.value
}

</script>

<template>
  <div class="content" @keydown.prevent="pressToMove" tabindex="-1" @contextmenu.prevent="">
    <div class="head">
      <div class="back"><i class="iconfont icon-home" @click="toReady()"></i></div>
      <div class="title">扫雷</div>
      <div class="reset"><i class="iconfont icon-zhongzhi" @click="reset()"></i></div>
    </div>
    <div class="debug"><button @click="switchDebug()">调试模式</button>（调试模式下 点击所有数字以完成游戏）</div>
    <div class="main">
      <div class="big">
        <!-- 得分 -->
        <div class="score">
          <div class="point">BOMB : <span class="now">{{ showBombNum }}</span></div>
          <div class="point">TIME : <span class="top">{{ showTime }}s</span></div>
        </div>
        <!-- 游戏区域 -->
        <div class="playing">
          <div class="my-row" v-for="(item, rowIndex) in matrix" :key="rowIndex">
            <div class="cell" v-for="(i, colIndex) in item" :key="`${rowIndex}+${colIndex}`"
              :class="`cell-${i} cell-${rowIndex}-${colIndex} hide ${debug ? '' : 'no-debug'}`"
              @click="open(rowIndex, colIndex)" @contextmenu="flag(rowIndex, colIndex)">
              {{ i !== -1 ? i : '' }}</div>
          </div>
        </div>
        <div class="mask" v-show="gameState === 'ready'">
          <div class="start my-btn" @click="reset()">
            开始游戏
          </div>
        </div>
        <div class="mask" v-show="gameState === 'gamefail'">
          <div class="msg">游戏结束</div>
          <div class="restart my-btn" @click="reset()">
            重新开始游戏
          </div>
        </div>
        <div class="mask" v-show="gameState === 'gamewin'">
          <div class="msg">恭喜！</div>
          <div class="msg">用时：{{ showTime }}s</div>
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

  .debug {
    // height: 10px;
    text-align: center;
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
      // border-radius: 10px;
      background-color: #bbada0;

      .score {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;

        .point {
          width: 240px;
          height: 50px;

          // border-radius: 10px;
          background-color: #A78D74;

          color: @wtext;
          text-align: center;
          line-height: 50px;
        }
      }

      .playing {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        // padding-top: 10px;
        // padding-left: 10px;
        height: 500px;
        border-radius: 10px;
        overflow: hidden;

        .my-row {
          display: flex;
          justify-content: space-evenly;
          // margin-bottom: 10px;
          // width: 492px;
          height: 120px;
          background-color: #BBADA0;

          .cell {
            // margin-bottom: 10px;
            // margin-right: 10px;
            padding: 0;
            width: 58px;
            height: 58px;

            // border-radius: 10px;
            background-color: #CDC1B4;

            text-align: center;
            line-height: 58px;
            font-size: 40px;
            color: @wtext;

            // transition: all 0.2s ease;
          }

          .hide {
            background-color: #A78D74 !important;
            // background-color: #A78D74;
            // color: #A78D74 !important;
            border: blueviolet 2px solid;
          }

          .no-debug {
            color: #A78D74 !important;
          }

          .cell-0 {
            background-color: #CDC1B4;
            color: #CDC1B4;
          }

          .cell--1 {
            background-color: red;
            // color: red;
          }

          .cell--2 {
            background-color: #A78D74;
            color: #A78D74;
          }

          .cell-1 {
            background-color: #CDC1B4;
            color: #1D16E6;
          }

          .cell-2 {
            background-color: #CDC1B4;
            color: #1B780B;
          }

          .cell-3 {
            background-color: #CDC1B4;
            color: #D40007;
          }

          .cell-4 {
            background-color: #CDC1B4;
            color: #0E0678;
          }

          .cell-5 {
            background-color: #CDC1B4;
            color: #660515;
          }

          .cell-6 {
            background-color: #CDC1B4;
            color: #037765;
          }

          .cell-7 {
            background-color: #CDC1B4;
            color: #000000;
          }

          .cell-8 {
            background-color: #CDC1B4;
            color: #808080;
          }

          .flag {

            &::before {
              content: '📍';
              color: red;
            }
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
        height: 502px;
        background-color: rgba(186, 178, 171, 0.85);
        color: @wtext;
        transition: all 0.3s ease;

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