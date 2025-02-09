<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue'

const matrix = ref([
  [0, 2, 2, 0],
  [0, 0, 2, 4],
  [2, 4, 4, 4],
  [2, 4, 4, 8]
])
const row = matrix.value.length
const col = matrix.value[0].length

// const printMatrix = () => {
//   for (let i = 0; i < row; i++) {
//     console.log(`${i} | ${matrix.value[i].join(' ')}`)
//   }
// }

const cal = (i, j, direction) => {
  const next = getNextNonZero(i, j, direction)
  if (!next) return
  const [iNextNZ, jNextNZ, valueNext] = next
  if (matrix.value[i][j] === 0) {
    matrix.value[i][j] = valueNext
    matrix.value[iNextNZ][jNextNZ] = 0
  } else if (matrix.value[i][j] === valueNext) {
    matrix.value[i][j] = valueNext * 2
    matrix.value[iNextNZ][jNextNZ] = 0
    const [iNext, jNext] = getNext(i, j, direction)
    cal(iNext, jNext, direction)
    return
  } else if (matrix.value[i][j] !== valueNext) {
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
  // console.log(iNext, jNext)
  if (!isInRange(i, j)) return
  while (isInRange(iNext, jNext)) {
    const value = matrix.value[iNext][jNext]
    // console.log(value)
    if (value !== 0) {
      // console.log(iNext, jNext, value)
      return [iNext, jNext, value]
    }
    else {
      [iNext, jNext] = getNext(iNext, jNext, direction)
      // console.log(iNext, jNext)
    }
  }
  return null
}

const move = (direction) => {
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
  }
}

const pressToMove = (e) => {
  // console.log(e.code)
  if (e.code === 'ArrowUp') move('up')
  else if (e.code === 'ArrowDown') move('down')
  else if (e.code === 'ArrowLeft') move('left')
  else if (e.code === 'ArrowRight') move('right')
}

onMounted(() => {
  // move('up')
  // printMatrix()
})

</script>

<template>
  <div class="content" @keydown.prevent="pressToMove" tabindex="-1">
    <div class="title" @click="move('up')">2048</div>
    <div class="main">
      <div class="big">
        <!-- 得分 -->
        <div class="score">
          <div class="point">NOW : <span class="now">0</span></div>
          <div class="point">TOP : <span class="top">9999</span></div>
        </div>
        <!-- 游戏区域 -->
        <div class="playing">
          <div class="my-row" v-for="(item, rowIndex) in matrix" :key="rowIndex">
            <div class="cell" v-for="(i, colIndex) in item" :key="`${rowIndex}+${colIndex}`" :class="`cell-${i}`">{{ i
              !== 0 ? i : '' }}</div>
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

  .title {
    margin: 10px 0;
    // width: 100%;
    height: 50px;

    font-weight: bold;
    font-size: 40px;
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
      border-radius: 10px;
      background-color: #BBADA0;

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
    }
  }
}
</style>