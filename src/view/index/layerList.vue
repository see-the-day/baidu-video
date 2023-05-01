<template>
  <div ref="videoBox">
    <div
      v-for="(li, index) of list"
      v-show="
        (currentTime >= Number(li?.startTime) &&
          currentTime <= Number(li?.endTime)) ||
        li.type === 'subtitle'
      "
      :key="index"
      class="absolute p-4"
      :class="{
        'border border-primary': !props.unEdit && isBorder(li.type, li.index)
      }"
      :style="{
        left: `${li.left}%`,
        top: `${li.top}%`,
        transform: 'translateX(-50%) translateY(-100%)'
      }"
      @mouseup="mouseover"
      @mousedown="handleMouseDown($event, li.type)"
      @mouseleave="mouseover"
      @mousemove="mousemove($event, li.index, li.type)"
      @click="currentEditElement(li.index, li.type)"
    >
      <span
        v-if="li.type === 'text'"
        :class="{ stroke: li.stroke }"
        :data-content="li.text"
        :style="getTextStyle(li.color, li.fontSize, li.stroke, li.strokeColor)"
      >
        {{ li.text }}
      </span>
      <template v-if="li.type === 'subtitle'">
        <div
          v-for="({ startTime, endTime, text }, i) of li.data"
          v-show="
            state.getCurrentTime >= startTime && state.getCurrentTime <= endTime
          "
          :key="i"
          :class="{ stroke: li.stroke }"
          :data-content="text"
          :style="
            getTextStyle(li.color, li.fontSize, li.stroke, li.strokeColor)
          "
        >
          {{ text }}
        </div>
      </template>
      <img
        v-if="li.type === 'img'"
        :style="`transform: rotate(${li.rotation}deg) scale(${li.scale})`"
        class="h-36 w-36"
        :src="li.img"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, withDefaults } from 'vue'
import { useState } from '@/store/videoState'
import { DATA_TEXT, DATA_IMG } from '@/type/index'

const props = withDefaults(defineProps<{ unEdit?: boolean }>(), {
  unEdit: false
})

const getTextStyle = (
  color: string,
  fontSize: number,
  stroke: number,
  strokeColor: string
) => {
  return `color: ${color};-webkit-text-stroke: ${stroke}px ${strokeColor};text-stroke: ${stroke}px ${strokeColor}; font-size: ${fontSize}px`
}

const state = useState()

const currentTime = computed(() => state.getCurrentTime - state.getStartTime)

const isBorder = computed(
  () => (type: 'text' | 'img' | 'subtitle', index: number) => {
    if (
      (state.boxIndex === 4 && type === 'img' && state.imgIndex === index) ||
      (state.boxIndex === 2 && type === 'text' && state.textIndex === index) ||
      (state.boxIndex === 3 &&
        type === 'subtitle' &&
        state.subtitleIndex === index)
    ) {
      return true
    }
    return false
  }
)

const currentEditElement = (
  index: number,
  type: 'text' | 'img' | 'subtitle'
) => {
  const map: Record<
    'text' | 'img' | 'subtitle',
    'SET_TEXT_INDEX' | 'SET_IMG_INDEX' | 'SET_SUBTITLE_INDEX'
  > = {
    text: 'SET_TEXT_INDEX',
    img: 'SET_IMG_INDEX',
    subtitle: 'SET_SUBTITLE_INDEX'
  }
  state[map[type]](index)
}
const list = computed(() => {
  const listMap: Record<string, any>[] = []
  state.getLayerText.forEach((obj: DATA_TEXT, index: number) => {
    listMap.push({ ...obj, type: 'text', index })
  })
  state.getLayerImg.forEach((obj: DATA_IMG, index: number) => {
    listMap.push({ ...obj, type: 'img', index })
  })
  state.getLayerSubtitle.forEach((obj: DATA_TEXT, index: number) => {
    listMap.push({ ...obj, type: 'subtitle', index })
  })
  return listMap
})

const isMove = ref(false)
const mouseover = () => {
  isMove.value = false
}
const pauseEvent = (e: any) => {
  // 已做兼容性处理
  if (e.stopPropagation) e.stopPropagation()
  if (e.preventDefault) e.preventDefault()
  e.cancelBubble = true
  e.returnValue = false
  return false
}
let client = { clientX: 0, clientY: 0 }
const handleMouseDown = (
  e: { clientX: number; clientY: number },
  type: 'text' | 'subtitle' | 'img'
) => {
  const typeMap = {
    text: 2,
    subtitle: 3,
    img: 4
  }
  if (!props.unEdit && typeMap[type] === state.boxIndex) {
    client = { clientX: e.clientX, clientY: e.clientY }
    pauseEvent(e)
    isMove.value = true
  }
}

const videoBox = ref({ clientHeight: 0 })
const mousemove = (
  e: { clientX: number; clientY: number },
  index: number,
  type: 'text' | 'subtitle' | 'img'
) => {
  const x = ((e.clientX - client.clientX) * 100) / 460
  const y = ((e.clientY - client.clientY) * 100) / videoBox.value.clientHeight
  client = { clientX: e.clientX, clientY: e.clientY }

  if (isMove.value) {
    const typeMap: Record<
      'text' | 'subtitle' | 'img',
      'SET_TEXT' | 'SET_SUBTITLE' | 'SET_IMG'
    > = {
      text: 'SET_TEXT',
      subtitle: 'SET_SUBTITLE',
      img: 'SET_IMG'
    }
    const left =
      x + ((state.data[state.currentIndex][type][index]?.left || 0) as number)
    const top =
      y + ((state.data[state.currentIndex][type][index]?.top || 0) as number)
    state[typeMap[type]](index, {
      left: left > 0 ? Number(left.toFixed(2)) : 0,
      top: top > 0 ? Number(top.toFixed(2)) : 0
    })
  }
}
</script>
<style lang="scss" scoped>
.stroke {
  font-family: Heavy;
  font-size: 30px;
  font-weight: 900;
}
/* 通过属性选择器结合伪元素before 实现文字外描边效果 */
[data-content]::before {
  /* attr()是用来获取被选中元素的某属性值,并且在样式文件中使用 */
  content: attr(data-content);
  position: absolute;
  /* 实现元素外描边的关键 */
  -webkit-text-stroke: 0;
  /* 文本颜色 */
}
</style>
