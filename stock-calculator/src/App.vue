<script setup>
import Header from './components/header.vue';
import TopBox from './components/TopBox.vue';
import Content from './components/content/Content.vue';
</script>

<template>
  <Header></Header>
  <div class="wrapper">
    <TopBox></TopBox>
    <Content></Content>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
