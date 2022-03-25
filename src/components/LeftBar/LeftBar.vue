<template>
  <n-space vertical>
    <n-layout has-sider class="h-full">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        show-trigger
        :inverted="inverted"
        @collapse="setMenu(false)"
        @expand="setMenu(true)"
      >
        <n-menu
          accordion
          :inverted="inverted"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="options"
          :default-expanded-keys="defaultExpandedKeys"
          :default-value="defaultValue"
          :expand-icon="expandIcon"
        />
      </n-layout-sider>
      <n-layout class="bg-bgGray" :class="{'left-content': !exclude}">
        <slot />
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
import { h, ref, Ref, watchEffect } from 'vue'
import { NSpace, NLayout, NLayoutSider, NMenu } from 'naive-ui'
import { RouterLink, useRoute } from 'vue-router'
import MENUCONST from './MenuConst'
import { useMenu } from '@/store/menu'
import { getUserInfo } from '@/util'

const expandIcon = () => {
  return h('span', { class: ['iconfont', 'icon-xiangxia'] })
}

const menu = useMenu()
const setMenu = (isCollapsed: boolean) => {
  menu.setCollapsed(isCollapsed)
}

function renderIcon (name: string) {
  return () => h('svg', { class: ['icon'], 'aria-hidden': 'true' }, [
    h('use', { 'xlink:href': `#${name}` })
  ])
}

const routeLink = (path: string, label: string) => {
  return () => h(RouterLink,
    {
      to: { path }
    },
    { default: () => label }
  )
}
const menuOptions = (name?: string) => [
  {
    label: '市场洞悉',
    key: 'market',
    icon: renderIcon(name || MENUCONST('market-default')),
    children: [
      {
        key: 'market-distribution',
        label: routeLink('/market-distribution', '市场分布')
      },
    ]
  },
]
const options: Ref = ref([])
const defaultExpandedKeys: Ref = ref([])
const defaultValue = ref('')
const urlKey: string = window.location.href.split('/#/')[1].split('?')[0]
menuOptions().forEach(option => {
  if (option.children) {
    option.children.forEach((oc: {key: string}) => {
      if (oc.key === urlKey) {
        defaultValue.value = urlKey
        defaultExpandedKeys.value.push(option.key)
      }
    })
  } else {
    if (option.key === urlKey) {
      defaultValue.value = urlKey
    }
  }
})

const menuFormat = () => {
  const menuListPermission = getUserInfo('menu') || []
  const urlJoin = (key: string) => `/${key}`
  return menuOptions().filter(menu => {
    if (menu.children) {
      const children = menu.children.filter(mc => {
        return menuListPermission.includes(urlJoin(mc.key))
      })

      menu.children = children
      return !!children.length
    }

    return menuListPermission.includes(urlJoin(menu.key))
  })
}
const route = useRoute()
const exclude = ref(false)
const excludeKey = ['404']
watchEffect(() => {
  const leftBarKey = route.path.split('?')[0].split('/')[1].split('-')[0]
  exclude.value = excludeKey.includes(leftBarKey)
  options.value = menuFormat()
  options.value.forEach((value: {key: string, icon: () => {}}) => {
    if (value.key === leftBarKey) {
      value.icon = renderIcon(MENUCONST(leftBarKey))
    }
  })
})
const inverted = ref(false)
</script>
