<template>
  <div>{{ msg1 }}-{{ attrs.msg2 }}-{{ attrs.title }}</div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
// 3.2版本不需要引入 defineProps，直接用
const props = defineProps({
  msg1: String,
});
console.log(props); // { msg1: '1111'}

// 方法二 适用于 Vue3.2版本
const attrs = useAttrs();
console.log(attrs); // { msg2:"2222", title: "3333" }
</script>

<style scoped></style>
