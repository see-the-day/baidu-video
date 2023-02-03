<template>
  <div class="flex h-56 w-full items-center divide-primary border-b">
    <div
      class="flex h-16 items-center divide-primary pl-24 pr-20"
      :class="{ 'border-r': !isLogin }"
    >
      <img src="@/assets/index/index.png" class="h-24 w-66" />
    </div>
    <div v-if="!isLogin" class="ml-20 flex items-center">
      <svg class="icon mr-12" aria-hidden="true">
        <use :xlink:href="`#${icon}`" />
      </svg>
      <span>{{ title }}</span>
    </div>
    <div v-if="!isLogin" class="mr-16 flex flex-1 items-center justify-end">
      <n-popover
        placement="bottom-end"
        trigger="click"
        :show-arrow="false"
        display-directive="show"
        @update:show="popoverShow"
      >
        <template #trigger>
          <div
            class="flex cursor-pointer items-center rounded-4 pl-8 pr-8 hover:bg-boxBack"
            :class="isShow ? 'bg-boxBack' : 'bg-bgGray'"
          >
            <span class="mr-12">{{ userInfo.name }}</span>
            <span class="iconfont icon-xiangxia" />
          </div>
        </template>
        <div class="flex w-224 rounded-4 bg-bgExit">
          <div class="flex flex-1 flex-col pt-15 pb-15 pl-20">
            <span class="text-16 font-medium text-textWhite">{{
              userInfo.name
            }}</span>
            <span class="mt-4 text-12 text-textWhite"
              >到期时间：{{ userInfo.validity_time }}</span
            >
          </div>
          <img src="@/assets/exit/background.png" class="mt-8 h-64 w-40" />
        </div>
        <div class="mt-8 mb-6 h-1 w-full border-b" />
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
