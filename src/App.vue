<script setup>
  import Button from "./components/Button.vue";
  import Statistic from "./components/Statistic.vue";
  import iconLocation from "./icons/iconLocation.vue";

  const statistic = {
    label: "Влажность",
    stat: "90%"
  };
</script>

<template>
  <main class="main">
    <Statistic v-bind="statistic"/>
    <Statistic label="Осадки" stat="0%"/>
    <Statistic stat="90%"/>
    <Button>
      <iconLocation />
      Сохранить
    </Button>
  </main>
</template>

<style scoped>
  .main {
    background: var(--color-bg-main);
    padding: 60px 50px;
    border-radius: 25px;
  }
</style>
