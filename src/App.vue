<!-- eslint-disable no-undef -->
<script setup>
  import { ref } from 'vue';
  import PanelRight from "./components/PanelRight.vue";

  const API_ENDPOINT = "https://api.weatherapi.com/v1"; //домен источника информации о погоде
  
  
  const statistic = ref(); //реактивный объект статистики
  const error = ref(); //реактивное состояние для случая, когда сапрос к WeatherAPI вернулся с ошибкой
  let activeIndex = ref(0); // метка активной карточки  

  
  // функция получения названия города из компонента SelectCity
  async function getCity(city) { 
    console.log(city);
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
    console.log(statistic.value);
  } 
  
</script>

<template>
  <main class="main">
    <div class="left"></div>

    <div class="right">
      <PanelRight 
        :error
        :statistic
        :active-index="activeIndex" 
        @select-index="(index) => activeIndex = index" 
        @select-city="getCity"
      />
    </div>
  </main>
</template>

<style scoped>
  .main{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .right {
    background: var(--color-bg-main);
    padding: 30px 20px;
    border-radius: 0 25px 25px 0;
  }

  .left{
    width: 500px;
    height: 710px;
    border-radius: 30px;
    background-image: url(assets/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    position: relative; 
  }

  .left::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--gradient-img);
    border-radius: 30px;
}

</style>
