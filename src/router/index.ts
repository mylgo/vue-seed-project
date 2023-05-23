import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
// import { useUserStore } from '@/store/user';

const router = createRouter({
  history: createWebHistory(), // 可传参数，配置 base 路径，例如 '/app'
  routes,
});
// 导航守卫：全局导航守卫->场景->做登录判断，未登陆用户跳转到登录页
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     //在登录页做清除操作，如清除token等
//   }
//   if (!localStorage.getItem('token') && to.path !== '/login') {
//     // 未登陆且访问的不是登录页，重定向到登录页面
//     return '/login';
//   }
//   // 利用路由元信息+全局前置守卫实现部分页面不需要登录，部分页面需要登录才能访问
//   if (!localStorage.getItem('token') && to.meta.auth) {
//     // 此路由需要授权，请检查是否已登录
//     // 如果没有，则重定向到登录页面
//     return {
//       path: '/login',
//       // 保存我们所在的位置，以便以后再来
//       query: { redirect: to.fullPath },
//     };
//   }
//   // 路由钩子中使用store：✅ 这样做是可行的，因为路由器是在其被安装之后开始导航的，而此时 Pinia 也已经被安装。
//   const store = useUserStore();
//   if (!store.token) {
//     next({
//       path: '/login',
//     });
//   } else {
//     next();
//   }
//   console.log(to, from, next());
// });

export default router;
