<template>
  <n-message-provider>
    <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
      :theme-overrides="themeOverrides"
      class="flex flex-col"
    >
      <router-view />
    </n-config-provider>
    <Message />
  </n-message-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN, NMessageProvider } from 'naive-ui'
import Message from './components/Message.vue'
import themeOverrides from './util/project-theme'
</script>
