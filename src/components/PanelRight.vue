<script setup>
    import { computed } from 'vue';
    import DayCard from './DayCard.vue';
    import Error from './Error.vue';
    import SelectCity from './SelectCity.vue';
    import Statistic from './Statistic.vue';
    import { errorMap } from '../myConst.js';
    
    const { error, statistic, activeIndex } = defineProps({
        error: Object, 
        statistic: Object,
        activeIndex: Number,
    });

    

    const errorModified = computed(() => { // по коду ошибки определяет (как ключ), какое сообщение об ошибке будет отображено
        return errorMap.get(error.error?.code);
    });

    const statData = computed(() => {
        if(!statistic){
            return [];
        }
    return [
            {
            label: "Влажность",
            stat: statistic.current.humidity + ' %', //вычисляемая часть
            },
            {
            label: "Облачность",
            stat: statistic.current.cloud + ' %',
            },
            {
            label: "Ветер",
            stat: (Math.round(parseInt(statistic.current.wind_kph) * (1000 / 3600) * 10) / 10) + ' м/с',
            }
        ]
    });

    const emit = defineEmits(['select-index', 'select-city']);



</script>

<template>
    <Error v-if="error" :error="errorModified"/>

    <div v-if="statistic" class="stat-data">
        <!-- Мультиплексирование информации о погоде, данные которой динамичкси (передаём как html-аргкмент) могут пересчитываться и всавляться в шаблон -->
        <div class="stat-list">
            <Statistic 
                v-for="item in statData" 
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
                @click="() => emit('select-index', index)"
            />
        </div>
    </div>

    <div class="select-style">
        <SelectCity  />
    </div>
</template>

<style scoped>
    .card-list{
        display: flex;
        gap: 10px;
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