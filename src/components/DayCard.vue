<script setup>
    import iconSun from '../icons/weather/iconSun.vue';
    import iconCloud from '../icons/weather/iconCloud.vue';
    import iconRain from '../icons/weather/iconRain.vue';

    const { weatherCode, temperature, day } = defineProps({
        weatherCode: Number,
        temperature: Number, 
        day: Date,
    });
</script>

<template>
    <button class="card">
        <iconSun v-show="weatherCode == 1000" />
        <iconCloud v-show="weatherCode == 1003" />
        <iconRain v-show="weatherCode == 1063" />

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
    }

    .card:hover{
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
</style>