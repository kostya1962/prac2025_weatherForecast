<!-- eslint-disable no-undef -->
<script setup>
  import { watch, onMounted, provide, ref } from 'vue';
  import PanelDawn from "./components/PanelDawn.vue";
  import PanelUp from "./components/PanelUp.vue";
  import { API_ENDPOINT, cityProvide } from './myConst.js';
  
  
  
  const statistic = ref(); //реактивный объект статистики
  const error = ref(); //реактивное состояние для случая, когда сапрос к WeatherAPI вернулся с ошибкой
  let activeIndex = ref(0); // метка активной карточки 
  let city = ref("Чебоксары"); // реактивное имя города (изначально не определено)

  provide(cityProvide, city); // прокидываем город в SelectCity через PanelRight
  
  // функция получения названия города из компонента SelectCity
  async function getCity(city) { 
    const params = new URLSearchParams({ //для корректного преобразования списка параметров запроса в URL 
      q: city,
      lang: "ru",
      key: "3faa8979683e41b1bc9222426252808", // небезопасный способ хранения ключа аутентификации
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

  onMounted(() => { // отправка запроса с начальным наименованием city 
    getCity(city.value);
  });

  watch(city, () => { // отправка запроса всегда, когда будет изменена реактивная переменная city
    getCity(city.value);
  });
  
  
</script>

<template>
  <main class="main">
    <div class="up">
      <PanelUp 
        v-if="statistic" 
        :day="statistic.forecast.forecastday[activeIndex]" 
        class="text
      "/>
    </div>

    <div class="dawn">
      <PanelDawn 
        :error
        :statistic
        :active-index="activeIndex" 
        @select-index="(index) => activeIndex = index" 
      />
    </div>
  </main>
</template>

<style scoped>
  .main{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .dawn {
    background: var(--color-bg-main);
    padding: 30px 20px;
    border-radius: 0 0 25px 25px;
  }

  .up{
    width: 1150px;
    height: 500px;
    border-radius: 30px;
    background-image: url(assets/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    position: relative; 
  }

  .up::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--gradient-img);
    border-radius: 30px;
}

.text{
  position: relative;
  /* z-index: 1; */
}
</style>
