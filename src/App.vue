<template>
  <!-- 定义路由出口 -->
  <!-- router-view 将显示与 url 对应的组件，可以把它放在任何地方以适应布局 -->
  <router-view v-slot="{ Component }">
    <!-- transition 是基于路由的动态过渡动效 -->
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
// 动态路由
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { manageRoute } from '@/router/routes'; // 拆分出来的动态路由

const router = useRouter();
const route = useRoute();

watch(route, async (newVal) => {
  // Login/index.vue 中存储的用户等级
  const role = localStorage.getItem('role');
  // 如果localStorage.getItem('role')的值不为admin，直接访问/home/manage，会返回404页面
  if (role && role === 'admin') {
    router.addRoute('Home', manageRoute);
    /* 防止页面刷新，路由丢失 */
    if (newVal.fullPath === '/home/manage') {
      await router.replace('/home/manage');
    }
  }
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
