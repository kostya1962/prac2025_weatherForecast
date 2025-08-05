<script setup>
    import { computed, inject } from 'vue';
    import { cityProvide } from '../myConst';
    import iconSun from '../icons/weather/iconSun.vue';
    import iconCloud from '../icons/weather/iconCloud.vue';
    import iconRain from '../icons/weather/iconRain.vue';
    import iconLocation from '../icons/iconLocation.vue'

    const { day } = defineProps({
        day: Object,
    });

    const city = inject(cityProvide);
    const weatherCode = computed(() => {
        return day.day.condition.code;
    });

    // Реактивные объекты, зависящие от даты 
    const weekDay = computed(() => {
        return new Date(day.date).toLocaleDateString("ru-RU", {
                        weekday: 'long'
                    })
    });

    const fullDay = computed(() => {
        return  new Date(day.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",

                    }) 
    });

    const tempValue = computed(() => {
        return day.day.avgtemp_c + "°C";
    });
</script>

<template>
    <div class="panelLeft">
        <div>
            <div class="week-day">
                {{ weekDay }}
            </div>
            <div class="full-day">
                {{ fullDay }}
            </div>
            <div class="city">
                <iconLocation :color="'var(--color-primary)'" />
                {{ city }}
            </div>
        </div>

        <div>
            <div class="icon">
                <iconSun v-show="weatherCode <= 1003" :color="'var(--color-primary)'" size="95" />
                <iconCloud v-show="weatherCode >= 1006 && weatherCode < 1189" :color="'var(--color-primary)'" size="95" />
                <iconRain v-show="weatherCode >= 1189" :color="'var(--color-primary)'" size="95" />
            </div>
            <div class="temp">
                {{ tempValue }}
            </div>
            <div class="condition">
                {{ day.day.condition.text }}
            </div>
        </div>
        
    </div>
</template>

<style scoped>
.panelLeft{
    display: flex;
    flex-direction: column;
    padding: 48px 23px;
    
    justify-content: space-between;
    height: 100%;
}

.week-day{
    font-size: 37px;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 16px;
}

.full-day{
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 10px;
}

.city{
    display: flex;
    gap: 8px;
    align-items: center;
}

.icon{
    margin: 25px;
}

.temp{
    font-size: 45px;
    font-weight: 700;
    margin-bottom: 9px;
}

.condition{
    font-size: 22px;
    font-weight: 700;

}
</style>