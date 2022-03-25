<template>
  <div class="h-112 flex pl-32 pr-32 pt-20 pb-20">
    <div class="flex-1 flex justify-center flex-col text-12 text-saleText">
      <p>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">京ICP备2021019398号-2</a>
        ｜
        <span class="cursor-pointer" @click="showModal = true">营业执照</span>
      </p>
      <span>copyright © 2021-2022 北京数值信息有限公司. All rights reserved. 版权所有 本站内容未经书面许可,禁止一切形式的转载。
      </span>
    </div>
    <div class="pl-32 border-l text-12 text-saleText flex flex-col justify-center">
      <div class="flex">
        <img src="@/assets/bottom/telephone.png" class="w-16 h-16 mr-4">
        联系方式
      </div>
      <div>电话：010-56640807 </div>
      <div>邮箱：zhishu@zhidemai.com</div>
    </div>
  </div>
  <n-modal
    v-model:show="showModal"
    :style="{width: '500px'}"
    preset="card"
    title="营业执照"
  >
    <img src="@/assets/business/business.jpg" alt="">
  </n-modal>
</template>
<script lang="ts" setup>
import { NModal } from 'naive-ui'
import { ref } from 'vue'

const showModal = ref(false)
</script>
