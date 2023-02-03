import { defineStore } from 'pinia'

export const useMenu = defineStore('menu', {
  state: () => ({
    collapsed: true
  }),
  actions: {
    setCollapsed(isCollapsed: boolean) {
      this.collapsed = isCollapsed
    }
  }
})
