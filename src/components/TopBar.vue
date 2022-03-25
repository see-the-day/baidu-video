<template>
  <div class="flex h-56 items-center w-full border-b divide-primary">
    <div
      class="flex items-center h-16 divide-primary pl-24 pr-20"
      :class="{'border-r': !isLogin}"
    >
      <img src="@/assets/index/index.png" class="w-66 h-24">
    </div>
    <div v-if="!isLogin" class="flex items-center ml-20">
      <svg class="icon mr-12" aria-hidden="true">
        <use :xlink:href="`#${icon}`" />
      </svg>
      <span>{{ title }}</span>
    </div>
    <div v-if="!isLogin" class="flex items-center flex-1 justify-end mr-16">
      <n-popover
        placement="bottom-end"
        trigger="click"
        :show-arrow="false"
        display-directive="show"
        @update:show="popoverShow"
      >
        <template #trigger>
          <div
            class="flex items-center pl-8 pr-8 hover:bg-boxBack rounded-4 cursor-pointer"
            :class="isShow ? 'bg-boxBack' : 'bg-bgGray'"
          >
            <span class="mr-12">{{ userInfo.name }}</span>
            <span class="iconfont icon-xiangxia" />
          </div>
        </template>
        <div class="bg-bgExit rounded-4 w-224 flex">
          <div class="flex flex-col flex-1 pt-15 pb-15 pl-20">
            <span class="text-textWhite text-16 font-medium">{{ userInfo.name }}</span>
            <span class="mt-4 text-textWhite text-12">到期时间：{{ userInfo.validity_time }}</span>
          </div>
          <img src="@/assets/exit/background.png" class="w-40 h-64 mt-8">
        </div>
        <div class="w-full border-b h-1 mt-8 mb-6" />
        <exitLoginVue />
      </n-popover>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { watchEffect, ref, Ref, nextTick } from 'vue'
import { NPopover } from 'naive-ui'
import MENUCONST from './LeftBar/MenuConst'
import exitLoginVue from './exitLogin.vue'
import { getUserInfo } from '@/util'

const route = useRoute()

const icon: Ref = ref('')
const title: Ref = ref('')
const isLogin = ref(false)
const userInfo: Ref = ref({ name: '', validity_time: '' })
watchEffect(() => {
  title.value = route.name
  const key = route.path.split('-')[0].split('/')[1] || 'market'
  icon.value = MENUCONST(`${key}-default`)

  userInfo.value = getUserInfo()

  isLogin.value = ['/login'].includes(route.path)
})

const isShow = ref(false)
const popoverShow = (show: boolean) => nextTick(() => (isShow.value = show))
</script>
