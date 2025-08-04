<script setup>
    import { computed } from 'vue';

    const { day } = defineProps({
        day: Object,
    });

    const dayDate = computed(() => {
        return [
            
        ]
    });
</script>

<template>
    <div class="panelLeft">
        <div>
            <div class="weekday">
                {{ new Date(day.date).toLocaleDateString("ru-RU", {weekday: 'long'} ) }}
            </div>
            <div>
                {{ 
                    new Date(day.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",

                    }) 
                }}
            </div>
        </div>
        <div></div>
    </div>
</template>

<style scoped>
.panelLeft{
    display: flex;
    flex-direction: column;
    padding: 48px 23px;
    

}

.weekday{
    font-size: 37px;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 16px;
}
</style>