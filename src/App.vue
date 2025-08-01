<script setup>
  import { ref, computed } from 'vue';
  import Statistic from "./components/Statistic.vue";
  import SelectCity from "./components/SelectCity.vue";

  let savedCity = ref("Chebocksary");
  const statistic = ref({ //реактивный объект статистики
    humidity: 90,
    rain: 0,
    wind: 3,
  });

  const statModifed = computed(() => {
      return [
        {
          label: "Влажность",
          stat: statistic.value.humidity + '%', //вычисляемая часть
        },
        {
          label: "Осадки",
          stat: statistic.value.rain + '%',
        },
        {
          label: "Ветер",
          stat: statistic.value.wind + 'м/с',
        }
      ]
  });

  function getCity(city) {
    statistic.value.humidity = 20;
    savedCity.value = city; 
  }

</script>

<template>
  <main class="main">
    <div id="city">{{ savedCity }}</div>

    <!-- Мультиплексирование статистики, данные которой динамичкси (передаём как html-аргкмент) могут пересчитываться и всавляться в шаблон -->
    <Statistic v-for="item in statModifed" v-bind="item" :key="item.label"/>

    <SelectCity @selectCity="getCity" />
  </main>
</template>

<style scoped>
  .main {
    background: var(--color-bg-main);
    padding: 60px 50px;
    border-radius: 25px;
  }
</style>
