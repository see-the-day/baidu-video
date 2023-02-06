/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

// eslint-disable-next-line no-unused-vars
declare interface Window {
  $message: any
  geetestObj: any
}
