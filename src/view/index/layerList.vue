<template>
  <div ref="videoBox" class="overflow-hidden">
    <div
      v-for="(li, index) of list"
      v-show="
        (currentTime >= Number(li?.startTime) &&
          currentTime <= Number(li?.endTime)) ||
        li.layerType === 'subtitle'
      "
      :key="index"
      class="absolute w-maxContent rounded-4 p-4"
      :class="{
        'border border-primary':
          !props.unEdit && isBorder(li.layerType, li.index)
      }"
      :style="{
        left: `${li.left}%`,
        top: `${li.top}%`,
        transform: 'translateX(-50%) translateY(-100%)'
      }"
      @mouseup="mouseover"
      @mousedown="handleMouseDown"
      @mouseleave="mouseover"
      @mousemove="mousemove($event, li.index, li.layerType)"
      @click="currentEditElement(li.index, li.layerType)"
    >
      <span
        v-if="li.layerType === 'text'"
        :class="[typeTextStyle(li.type), li.stroke ? 'stroke' : '']"
        :data-content="li.text"
        :style="getTextStyle(li.color, li.fontSize, li.stroke, li.strokeColor)"
      >
        {{ li.text }}
      </span>
      <template v-if="li.layerType === 'subtitle'">
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
        v-if="li.layerType === 'img'"
        :style="`width: ${36 * li.scale}px;transform: rotate(${
          li.rotation
        }deg)`"
        :src="li.img"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, withDefaults } from 'vue'
import { useState } from '@/store/videoState'
import { typeTextStyle } from '@/util'
import { DATA_TEXT, DATA_IMG, SUBTITLE } from '@/type/index'

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
  () => (layerType: 'text' | 'img' | 'subtitle', index: number) => {
    if (
      (state.boxIndex === 4 &&
        layerType === 'img' &&
        state.imgIndex === index) ||
      (state.boxIndex === 2 &&
        layerType === 'text' &&
        state.textIndex === index) ||
      (state.boxIndex === 3 &&
        layerType === 'subtitle' &&
        state.subtitleIndex === index)
    ) {
      return true
    }
    return false
  }
)

const currentEditElement = (
  index: number,
  layerType: 'text' | 'img' | 'subtitle'
) => {
  console.log(111)
  const indexMap: Record<'text' | 'subtitle' | 'img', 2 | 3 | 4> = {
    text: 2,
    subtitle: 3,
    img: 4
  }
  state.SET_CURRENT_BOX_INDEX(indexMap[layerType])

  const map: Record<
    'text' | 'img' | 'subtitle',
    'SET_TEXT_INDEX' | 'SET_IMG_INDEX' | 'SET_SUBTITLE_INDEX'
  > = {
    text: 'SET_TEXT_INDEX',
    img: 'SET_IMG_INDEX',
    subtitle: 'SET_SUBTITLE_INDEX'
  }
  state[map[layerType]](index)
}

const list = computed(() => {
  const listMap: Record<string, any>[] = []
  state.getLayerText.forEach((obj: DATA_TEXT, index: number) => {
    listMap.push({ ...obj, layerType: 'text', index })
  })
  state.getLayerImg.forEach((obj: DATA_IMG, index: number) => {
    listMap.push({ ...obj, layerType: 'img', index })
  })
  state.getLayerSubtitle.forEach((obj: SUBTITLE, index: number) => {
    listMap.push({ ...obj, layerType: 'subtitle', index })
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
const handleMouseDown = (e: { clientX: number; clientY: number }) => {
  if (!props.unEdit) {
    client = { clientX: e.clientX, clientY: e.clientY }
    pauseEvent(e)
    isMove.value = true
  }
}

const videoBox = ref({ clientHeight: 0 })
const mousemove = (
  e: { clientX: number; clientY: number },
  index: number,
  layerType: 'text' | 'subtitle' | 'img'
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
      x +
      ((state.data[state.currentIndex][layerType][index]?.left || 0) as number)
    const top =
      y +
      ((state.data[state.currentIndex][layerType][index]?.top || 0) as number)
    state[typeMap[layerType]](index, {
      left: Number(left.toFixed(2)),
      top: Number(top.toFixed(2))
    })
  }
}
</script>
<style lang="scss" scoped>
.stroke {
  // font-family: Ngaan;
  font-size: 30px;
  font-weight: 900;
}
[data-content]::before {
  content: attr(data-content);
  position: absolute;
  -webkit-text-stroke: 0;
}
</style>
