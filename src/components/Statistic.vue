<script setup>
    const { label='Не задан' , stat } = defineProps({
        label: String,
        stat: String
    });
</script>

<template>
    <div class="stat">
        <div class="stat-name">{{ label }}</div>
        <div class="stat-value">{{ stat }}</div>
    </div>
</template>

<style scoped>
    .stat{
        font-size: 28px;
        display: flex;
        justify-content: space-between;
        gap: 20px;
    }

    .stat-name {
        font-weight: 600;
    }

    .stat-value {
        font-weight: 400;
    }
</style>