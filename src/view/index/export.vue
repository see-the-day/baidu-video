<template>
  <div>
    <img
      class="h-16 w-16 cursor-pointer"
      src="@/assets/export.png"
      @click="exportText"
    />
    <n-modal v-model:show="showModal">
      <div class="w-560 bg-white p-20">
        {{ state.data }}
      </div>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
import { NModal } from 'naive-ui'
import { ref } from 'vue'
import { useState } from '@/store/videoState'

const state = useState()
const showModal = ref(false)
const exportText = () => {
  showModal.value = true
}
</script>
