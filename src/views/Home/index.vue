<template>
  <child :msg1="msg1" :msg2="msg2" title="3333"></child>
</template>

<script setup lang="ts">
import child from './components/child.vue';
import { ref } from 'vue';
const msg1 = ref('1111');
const msg2 = ref('2222');
</script>

<style lang="scss" scoped></style>
