import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import { createPinia } from 'pinia'
import './style/global.scss'
import './style/index.css'

createApp(App).use(router).use(createPinia()).mount('#app')
