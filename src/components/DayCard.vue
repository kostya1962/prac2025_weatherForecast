<script setup>
    import iconSun from '../icons/weather/iconSun.vue';
    import iconCloud from '../icons/weather/iconCloud.vue';
    import iconRain from '../icons/weather/iconRain.vue';
    import { computed } from 'vue';

    const { weatherCode, temperature, day, isActive } = defineProps({
        weatherCode: Number,
        temperature: Number, 
        day: Date,
        isActive: Boolean,
    });

    const iconColor = computed(() => { // функция для реактивного определения цевта иконки карточки
        return isActive ? "var(--color-primary)" : "var(--color-primary-inverted)";
    });
</script>

<template>
    <!-- Реализация динамического класса, который активируется в случае, когда выражение после двоеточия истинно -->
    <button class="card" :class="{ active: isActive} "> 
        <iconSun v-show="weatherCode <= 1003" :color="iconColor" />
        <iconCloud v-show="weatherCode >= 1006 && weatherCode < 1189" :color="iconColor" />
        <iconRain v-show="weatherCode >= 1189" :color="iconColor" />

        <div class="week-day">
            <!-- получение дня недели из русской локали в сокращённом виде  -->
            {{ day.toLocaleDateString('ru-RU', { weekday: "short" }) }}
        </div>

        <div class="temp">
            {{ temperature }}°C
        </div>
    </button>
</template>

<style scoped>
    .card{
        border-radius: 10px;
        box-shadow: 1px 2px 4px 0px var(--color-shadow);
        padding: 20px 24px;
        background-color: var(--color-bg-card);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;
        color: var(--color-primary-inverted);
        border: none;
        cursor: pointer;
        width: 100%;
    }

    .card:not(.active):hover{
        background-color: #FFB33A;
    }

    .week-day{
        font-size: 20px;
        font-weight: 400;
    }

    .temp{
        font-size: 20px;
        font-weight: 700;
    }

    .active{
        background-color: var(--color-primary-inverted);
        color: var(--color-primary);
    }
</style>