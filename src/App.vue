<script setup>
  import { ref, computed } from 'vue';
  import Statistic from "./components/Statistic.vue";
  import SelectCity from "./components/SelectCity.vue";

  let savedCity = ref("Chebocksary");
  const statistic = ref({
    humidity: 90,
  });

  const statModifed = computed(() => {
      return {
        label: "Влажность",
        stat: statistic.value.humidity + '%',
      };
  });

  function getCity(city) {
    statistic.value.humidity = 20;
    savedCity.value = city; 
  }

</script>

<template>
  <main class="main">
    {{ savedCity }}
    <Statistic v-bind="statModifed"/>
    <Statistic label="Осадки" stat="0%"/>
    <Statistic stat="90%"/>

    <SelectCity @select-city="getCity" />
  </main>
</template>

<style scoped>
  .main {
    background: var(--color-bg-main);
    padding: 60px 50px;
    border-radius: 25px;
  }
</style>
