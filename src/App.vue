<!-- eslint-disable no-undef -->
<script setup>
  import { ref, computed } from 'vue';
  import Statistic from "./components/Statistic.vue";
  import SelectCity from "./components/SelectCity.vue";
  import Error from './components/Error.vue';
  import DayCard from './components/DayCard.vue';

  const API_ENDPOINT = "http://api.weatherapi.com/v1"; //домен источника информации о погоде
  
  //реактивный объект статистики
  const statistic = ref();
  //реактивное состояние для случая, когда сапрос к WeatherAPI вернулся с ошибкой
  const error = ref();
  let activeIndex = ref(0); // метка активной карточки 

  const errorMap = new Map([ [1006, "Не удалось найти город"] ]); // словарь возможных ошибок на русском
  
  const statModifed = computed(() => {
      return [
        {
          label: "Влажность",
          stat: statistic.value.current.humidity + ' %', //вычисляемая часть
        },
        {
          label: "Облачность",
          stat: statistic.value.current.cloud + ' %',
        },
        {
          label: "Ветер",
          stat: (Math.round(parseInt(statistic.value.current.wind_kph) * (1000 / 3600) * 10) / 10) + ' м/с',
        }
      ]
  });

  const errorModified = computed(() => { // по коду ошибки определяет (как ключ), какое сообщение об ошибке будет отображено
    return errorMap.get(error.value?.error?.code);
  });

  // функция получения названия города из компонента SelectCity
  async function getCity(city) { 
    const params = new URLSearchParams({ //для корректного преобразования списка параметров запроса в URL 
      q: city,
      lang: "ru",
      key: "7317922310d4482ba14192432250208", // небезопасный способ хранения ключа аутентификации
      days: 7,
    });
    const res = await fetch(`${API_ENDPOINT}/forecast.json?${params.toString()}`); //отправка запроса по указанному URL и получение ответа в виде JSON (await приобстанавливает функцию пока не придет ответ от сервера)
    if(res.status != 200){
      error.value = await res.json(); // в случае ошибки сохраняем полученную от сервера информацию
      statistic.value = null; // объект с информацией о погоде отсутсвует
      return;
    } 
    error.value = null;
    statistic.value = await res.json(); // преобразование строки в объект (так как строка JSON очень большая нужно дождаться завершения преобразования)
  }

  function onCard(index) { // функция смены индекса активной карты
    activeIndex.value = index;
  }

  
</script>

<template>
  <main class="main">
    <div class="up">

    </div>
    <div class="down">
      <Error :error="errorModified"/>

      <div v-if="statistic" class="stat-data">
        <!-- Мультиплексирование информации о погоде, данные которой динамичкси (передаём как html-аргкмент) могут пересчитываться и всавляться в шаблон -->
        <div class="stat-list">
          <Statistic 
            v-for="item in statModifed" 
            v-bind="item" 
            :key="item.label"
          />
        </div>
        <div class="card-list">
          <!-- Мультиплексирование карточек погоды -->
          <DayCard 
            v-for="( item, index ) in statistic.forecast.forecastday" 
            :key="item.date" 
            :weather-code="item.day.condition.code" 
            :temperature="item.day.avgtemp_c" 
            :day="new Date(item.date)" 
            :is-active="activeIndex == index"
            @click="onCard(index)"
          />
        </div>
      </div>

      <div class="select-style">
        <SelectCity @select-city="getCity" />
      </div>
    </div>
  </main>
</template>

<style scoped>
  .main{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .down {
    background: var(--color-bg-main);
    padding: 30px 20px;
    border-radius: 0 25px 25px 0;
  }

  .up{
    width: 500px;
    height: 710px;
    border-radius: 30px;
    background-image: url(assets/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  }

  .card-list{
    display: flex;
    gap: 1px;
  }

  .select-style{
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .stat-data{
    display: flex;
    flex-direction: column;
    gap: 80px;
    margin: 70px;
  }

  .stat-list{
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
