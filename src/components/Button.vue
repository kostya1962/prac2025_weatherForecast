<script setup></script>

<template>
    <button class="button">Кнопка</button>
</template>

<style scoped>
    .button {
        border: none;
        border-radius: 10px;
        background: var(--gradient-btn);
        padding: 14px;
        font-family: var(--font);
        font-size: 20px;
        font-weight: 600;
        color: var(--color-primary-inverted);
        cursor: pointer;
    }

    .button:hover{
        background: var(--gradient-btn-invert);
    }
</style>