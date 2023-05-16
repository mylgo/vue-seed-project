<template>
  <div>
    <!-- 1. 声明式导航（在模板中进行路由跳转） -->
    <router-link to="/home"> 跳转home </router-link>;
    <!-- router-link 组件默认为a标签，
      在vue router 3.x中，可通过tag属性更改标签名，event属性更改事件名
      在vue router 4.x中，这两个属性已被删除，通过作用域插槽（子组件给父组件传值的插槽）实现自定义导航标签
      示例：将导航标签改为div，且需双击触发 -->
    <router-link v-slot="{ href, navigate, isExactActive }" to="/home/user" custom>
      <div :class="{ active: isExactActive }" :href="href" @dblclick="navigate">跳转user</div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
// 2. 编程式导航（组合式API）
import { useRouter } from 'vue-router';
const router = useRouter();

const handleManage = () => {
  // router.push('/manage');
  // query 页面传参
  router.push({
    path: '/home/manage',
    query: {
      plan: '123',
    },
  });
};
console.log('handleManage(): ', handleManage());
</script>

<script setup lang="ts">
// 页面接参：命名路由params传参（已被废弃）
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.query.plan); // query 接参
</script>

<script setup lang="ts">
// 组件内守卫->使用情景：预防用户在还未保存修改前突然离开。该导航可以通过返回 false 来取消
import { onBeforeRouteLeave } from 'vue-router';

// 与 beforeRouteLeave 相同，无法访问 `this`
onBeforeRouteLeave((to, from, next) => {
  const answer = window.confirm('确定离开吗');
  // 可以使用 next(false) 来取消导航 或者 返回 false 取消导航：待测试
  // 取消导航并停留在同一页面上
  if (!answer) return false;
});
</script>
