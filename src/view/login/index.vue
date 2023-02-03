<template>
  <div
    class="bg-login relative flex flex-1 items-center justify-end overflow-y-auto"
  >
    <!-- <img src="@/assets/index/bg-img.jpg" alt=""> -->
    <div class="mr-100 w-460 bg-white p-48">
      <accountLoginVue v-if="type === 1" @changeType="changeType" />
      <backVue v-if="type === 2" @changeType="changeType" />
      <resetVue v-if="type === 3" @changeType="changeType" />
    </div>
  </div>
  <BottomBarVue />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import BottomBarVue from '@/components/BottomBar.vue'
import accountLoginVue from './accountLogin.vue'
import backVue from './back.vue'
import resetVue from './reset.vue'

const type = ref(1)

const changeType = (index: number) => {
  type.value = index
}
</script>
<style lang="scss">
.bg-login {
  background: #e0e5ee url('@/assets/index/index-bg.jpg') no-repeat left center;
  background-size: auto 100%;
  & > img {
    height: 70%;
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
