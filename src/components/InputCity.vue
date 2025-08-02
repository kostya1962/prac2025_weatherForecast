<script setup>
    const data = defineModel({ type: String, required: true, }); // создадим 2-ух сторонную привязку для передачи названия города между Input и SelectCity
</script>

<template>
    <!-- обмен даннми без emit и prop -->
    <input v-model="data" class="input" type="text" />
</template>

<style scoped>
    .input {
        border-radius: 10px;
        border: none;
        padding: 15px 20px;
        font-size: 18px;
        background: var(--color-primary-inverted);
        box-shadow: 1px 2px 4px 0px #222831;
        color: var(--color-primary);
        width: 260px;
        height: 53px;
    }

    .input::placeholder {
        color: var(--color-text-placeholder);
    }
</style>