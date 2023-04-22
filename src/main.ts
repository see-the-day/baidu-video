import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './route'
import './style/global.scss'
import './style/index.css'

createApp(App).use(router).use(createPinia()).mount('#app')
