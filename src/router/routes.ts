// 路由独享守卫->场景：部分页面不需要登录，部分页面需要登录才能访问
const auth = () => {
  if (!localStorage.getItem('token')) {
    // 未登陆,重定向到登录页面
    return '/login';
  }
};

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/home',
    name: 'Home', // 动态路由：增加 name，动态路由通过 name 挂载到该子路由下（App.vue）
    component: () => import('@/views/home.vue'),
    // 场景：在App.vue中定义的router-view，这是顶层的出口，渲染最高级路由匹配到的组件，如果要实现登录之后左侧菜单栏不变，右侧随路由的切换变化显示的内容，需使用嵌套路由
    redirect: '/home/user', // 重定向：在嵌套路由中，当访问/home时想重定向到/home/user
    // 嵌套路由
    children: [
      {
        path: '/home/user',
        component: () => import('@/views/user.vue'),
        beforeEnter: auth, // 路由独享守卫：在路由配置中直接定义守卫
      },
      {
        path: '/home/manage',
        component: () => import('@/views/manage.vue'),
        // 路由元信息->将自定义信息附加到路由上，例如页面标题，是否需要权限，是否开启页面缓存等->使用情景：使用路由元信息+全局前置守卫实现部分页面不需要登录，部分页面需要登录才能访问
        meta: {
          title: '管理页', // 页面标题
          auth: true, //需要登录权限
        },
      },
    ],
  },
  // 404 页面（放在最后）
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue'),
  },
];

// 动态路由：将 /home/manage 拆出来
export const manageRoute = {
  path: '/home/manage',
  component: () => import('@/views/manage.vue'),
};
export default routes;
