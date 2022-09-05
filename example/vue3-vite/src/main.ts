import { createApp } from 'vue'
import App from './App.vue'
import { Button } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import DownUI from './../../../packages/ui/index'
console.log('=========', DownUI)

DownUI.register(Button)

const app = createApp(App)
app.use(DownUI)
app.mount('#app')
