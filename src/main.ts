import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// vite 按需引入插件 unplugin-vue-components unplugin-auto-import 按需引入组件会自动挂载，此处仅引入element-plus样式与图标即可
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; //引入图标
import 'element-plus/dist/index.css'; //引入样式

import router from './router/index';
import store from './store';

const app = createApp(App);

app.use(router); // 注册路由
app.use(store); // 注册 pinia

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
