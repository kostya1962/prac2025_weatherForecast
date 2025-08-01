<script setup>
  import Statistic from "./components/Statistic.vue";
  import SelectCity from "./components/SelectCity.vue";

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

    <SelectCity />
  </main>
</template>

<style scoped>
  .main {
    background: var(--color-bg-main);
    padding: 60px 50px;
    border-radius: 25px;
  }
</style>
