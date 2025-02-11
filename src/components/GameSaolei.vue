<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { get } from '@vueuse/core'
import { onMounted, ref } from 'vue'

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
// 地雷数量
let bombNum = 10

const printMatrix = () => {
  for (let i = 0; i < row; i++) {
    console.log(`${i} | ${matrix.value[i].join(' ')}`)
  }
}

// 矩阵重置
const resetMatrix = () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      matrix.value[i][j] = -2
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
    if (bombList.find(item => item == [row, col])) continue
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

// 去除某一格的 hide 样式
const removeHide = (i, j) => {
  document.querySelector(`.cell-${i}-${j}`).classList.remove('hide')
}

// 对这一格 从周围格列表中得到被隐藏的格子
const getHideList = (i, j) => {
  const list = []
  const aroundList = getAroundList(i, j)

  // console.log(document.querySelector(`.cell-${i}-${j}`).classList)
  // console.log(document.querySelector(`.cell-${i}-${j}`).classList.contains('hide'))
  // console.log(aroundList)

  aroundList.forEach(item => {
    // 检查此格上有没有 hide 类名
    // console.log(document.querySelector(`.cell-${item[0]}-${item[1]}`).classList.contains('hide'))
    if (document.querySelector(`.cell-${item[0]}-${item[1]}`).classList.contains('hide')) {
      list.push(item)
    }
  })
  // console.log(list)
  return list
}

// 打开某一格
const open = (i, j) => {
  // 点到炸弹 游戏结束
  if (matrix.value[i][j] === -1) {
    // 处理逻辑
    alert('游戏结束')
    return
  }
  // 点到非零格 去除此格的 hide 类名
  else if (matrix.value[i][j] !== 0) {
    removeHide(i, j)
  }
  // 点到零格 打开此格 并打开周围的格子
  else if (matrix.value[i][j] === 0) {
    removeHide(i, j)
    const hideList = getHideList(i, j)
    hideList.forEach(([i, j]) => {
      open(i, j)
    })
  }
}

// 重置矩阵
const reset = () => {
  // 1. 清零
  resetMatrix()
  // 2. 生成地雷
  genBomb()
  // 3. 计算每个格子的值
  cal()
}



onMounted(() => {
  reset()
  // printMatrix()

})

</script>

<template>
  <div class="content" @keydown.prevent="pressToMove" tabindex="-1">
    <div class="head">
      <div class="back"><i class="iconfont icon-home" @click="toReady()"></i></div>
      <div class="title">扫雷</div>
      <div class="reset"><i class="iconfont icon-zhongzhi" @click="reset()"></i></div>
    </div>
    <div class="main">
      <div class="big">
        <!-- 得分 -->
        <div class="score">
          <div class="point">LEFT : <span class="now">{{ bombNum }}</span></div>
          <div class="point">TIME : <span class="top">999</span></div>
        </div>
        <!-- 游戏区域 -->
        <div class="playing">
          <div class="my-row" v-for="(item, rowIndex) in matrix" :key="rowIndex">
            <div class="cell hide" v-for="(i, colIndex) in item" :key="`${rowIndex}+${colIndex}`"
              :class="`cell-${i} cell-${rowIndex}-${colIndex}`" @click="open(rowIndex, colIndex)">
              {{ i !== 0 ? i : '' }}</div>
          </div>
        </div>
        <!-- <div class="mask" v-show="gameState === 'ready'">
          <div class="start my-btn" @click="reset()">
            开始游戏
          </div>
        </div>
        <div class="mask" v-show="gameState === 'gameover'">
          <div class="msg">游戏结束</div>
          <div class="restart my-btn" @click="reset()">
            重新开始游戏
          </div>
        </div> -->
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

            transition: all 0.2s ease;
          }

          .hide {
            border: blueviolet 2px solid;
          }

          .cell-0 {
            color: #fff;
          }

          .cell--1 {
            background-color: #eee4da;
            color: #776E65;
          }

          .cell--2 {
            background-color: #CDC1B4;
            color: #CDC1B4;
          }

          .cell--3 {
            background-color: #f2b179;
          }

          .cell-1 {
            background-color: #f59563;
          }

          .cell-2 {
            background-color: #f67c5f;
          }

          .cell-3 {
            background-color: #f65e3b;
          }

          .cell-4 {
            background-color: #edcf72;
          }

          .cell-5 {
            background-color: #edcc61;
          }

          .cell-6 {
            background-color: #edc850;
          }

          .cell-7 {
            background-color: #edc53f;
          }

          .cell-8 {
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