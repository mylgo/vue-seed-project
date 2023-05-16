// 1. 完整的 ts 支持
// 2. 三大核心：state（存储的值），getters（计算属性），actions也可支持同步（改变值的方法，支持同步和异步）
// 3. 与vuex相比，去除了mutations（actions也可支持同步）和modules（只有store之间的互相引用）
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// 创建 pinia 实例
const store = createPinia();

// 使用持久化插件，在对应的插件中新增 persist
// 修改key与存储位置：配置 `persist: true` 或者`persist: { key: 'storeKey', storage: window.sessionStorage }`
// 自定义要持久化的字段 persist: { paths: ['userInfo.name'], // 默认全部持久化或paths点符号存储userInfo的name }
store.use(piniaPluginPersistedstate);

export default store;
