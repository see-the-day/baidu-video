<template>
  <div
    class="pl-13 pr-13 flex h-39 cursor-pointer items-center pl-12 hover:bg-bgGray"
    @click="showModal = true"
  >
    <img src="@/assets/exit/exit.png" class="mr-9 h-16 w-16" />
    <span>退出登录</span>
  </div>
  <n-modal v-model:show="showModal" display-directive="show">
    <div class="bg-white">
      <div class="flex w-280 items-center justify-between p-16">
        <span>
          <span class="iconfont icon-jingshi mr-7 text-gray-200" />
          <span>是否确认退出？</span>
        </span>
        <span
          class="iconfont icon-guanbi cursor-pointer text-gray-200 hover:text-selectColor"
          @click="showModal = false"
        />
      </div>
      <div class="flex p-16">
        <n-button class="flex-1" @click="showModal = false"> 取消 </n-button>
        <n-button type="primary" class="ml-10 flex-1" @click="exit">
          确认
        </n-button>
      </div>
    </div>
  </n-modal>
</template>
<script lang="ts" setup>
import { NModal, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from '@/request'

const showModal = ref(false)

const router = useRouter()
const exit = () => {
  axios.get('/api/v1/logout').then((res: any) => {
    if (!res.error_code) {
      localStorage.removeItem('DATAZHI-TOKEN')
      localStorage.removeItem('USER_INFO')
      localStorage.removeItem('searchData')
      router.push('/login')
      window.$message.success('退出成功')
    }
  })
}
</script>
