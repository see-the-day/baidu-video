<template>
  <div class="flex bg-login relative justify-end items-center overflow-y-auto flex-1">
    <!-- <img src="@/assets/index/bg-img.jpg" alt=""> -->
    <div class="bg-white w-460 mr-100 p-48">
      <accountLoginVue v-if="type === 1" @changeType="changeType" />
      <backVue v-if="type === 2" @changeType="changeType" />
      <resetVue v-if="type === 3" @changeType="changeType" />
    </div>
  </div>
  <BottomBarVue />
</template>
<script lang="ts" setup>
import BottomBarVue from '@/components/BottomBar.vue'
import accountLoginVue from './accountLogin.vue'
import backVue from './back.vue'
import resetVue from './reset.vue'
import { ref } from 'vue'
const type = ref(1)

const changeType = (index: number) => {
  type.value = index
}
</script>
<style lang="scss">
  .bg-login {
    background: #E0E5EE url('@/assets/index/index-bg.jpg') no-repeat left center;
    background-size: auto 100%;
    &> img {
      height: 70%
    }
  }
  .form .n-input {
    .n-input__prefix {
      line-height: 49px;
    }
    input {
      height: 48px !important;
    }
  }
</style>
