import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './assets/styles/reset.scss'
import './assets/styles/global.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
