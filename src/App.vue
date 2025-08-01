<script setup>
  import Button from "./components/Button.vue";
  import Statistic from "./components/Statistic.vue";

</script>

<template>
  <main class="main">
    <Statistic label="Влажность" stat="90%"/>
    <Statistic label="Осадки" stat="0%"/>
    <Statistic stat="90%"/>
    <Button>Сохранить</Button>
  </main>
</template>

<style scoped>
  .main {
    background: var(--color-bg-main);
    padding: 60px 50px;
    border-radius: 25px;
  }
</style>
