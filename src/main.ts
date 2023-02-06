import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './route'
import './style/global.scss'
import './style/index.css'
import Img from './components/Img.vue'

createApp(App)
  .use(router)
  .use(createPinia())
  .component('Img', Img)
  .mount('#app')
