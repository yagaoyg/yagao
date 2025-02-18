import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/assets/styles/base.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'element-plus/dist/index.css'
import './assets/styles/var.less'
import './assets/styles/mybase.less'
import 'github-markdown-css/github-markdown.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
