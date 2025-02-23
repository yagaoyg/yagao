import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import ElementPlus from 'element-plus'
import { ElCol, ElRow, ElAvatar, ElText } from 'element-plus'

// import '@/assets/styles/base.css'
import 'element-plus/dist/index.css'
import './assets/styles/var.less'
import './assets/styles/mybase.less'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github-dark.min.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElCol)
app.use(ElRow)
app.use(ElAvatar)
app.use(ElText)

app.mount('#app')
