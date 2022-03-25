<template>
  <n-message-provider>
    <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
      :theme-overrides="themeOverrides"
      class="flex flex-col"
    >
      <TopBar />
      <LeftBar v-if="excludeBar">
        <router-view />
      </LeftBar>
      <template v-else>
        <router-view />
      </template>
    </n-config-provider>
    <Message />
  </n-message-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN, NMessageProvider } from 'naive-ui'
import themeOverrides from './util/project-theme'
import Message from './components/Message.vue'
import TopBar from './components/TopBar.vue'
import LeftBar from './components/LeftBar/LeftBar.vue'
import { useRoute } from 'vue-router'
import { watchEffect, ref } from 'vue'
const route = useRoute()
const excludeBar = ref(false)
watchEffect(() => {
  excludeBar.value = !['/login'].includes(route.path)
})
</script>
