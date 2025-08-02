<!-- eslint-disable no-undef -->
<script setup>
  import { ref, computed } from 'vue';
  import Statistic from "./components/Statistic.vue";
  import SelectCity from "./components/SelectCity.vue";

  const API_ENDPOINT = "http://api.weatherapi.com/v1"; //домен источника информации о погоде

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

  //нужон обработчик
  async function getCity(city) { // функция получения названия города из компонента SelectCity
    const params = new URLSearchParams({ //для корректного преобразования списка параметров запроса в URL 
      q: city,
      lang: "ru",
      key: "7317922310d4482ba14192432250208", // небезопасный способ хранения ключа аутентификации
      days: 7,
    });
    const res = await fetch(`${API_ENDPOINT}/forecast.json?${params.toString()}`); //отправка запроса по указанному URL и получение ответа в виде JSON (await приобстанавливает функцию пока не придет ответ от сервера)
    const data = await res.json(); // преобразование строки в объект (так как строка JSON очень большая нужно дождаться завершения преобразования)
    console.log(data);
  }

</script>

<template>
  <main class="main">
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
