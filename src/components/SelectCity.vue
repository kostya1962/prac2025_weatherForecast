<script setup>
import { inject, ref } from 'vue';
import Button from "./Button.vue";
import iconLocation from "../icons/iconLocation.vue";
import InputCity from './InputCity.vue';

let isEdited = ref(false); //реактивное состояние кнопки изменения города


const city = inject("city"); // получаем реактивную переменную по идентификатору "city"
const inputValue = ref(city.value); // строка переданная от поля ввода InputCity при нажатии на кнопку "Сохранить"

function select() {
    isEdited.value = false;
    city.value = inputValue.value;
}

function edit() {
    isEdited.value = true;
}

</script>

<template>
    <div class="city-select">
        <div v-if="isEdited" class="city-input"> <!-- скритие поля ввода города для состояние без редактирования -->
            <InputCity  v-model="inputValue" v-focus placeholder="Введите город" @keyup.enter="select()" />
            <Button @click="select()"> Сохранить </Button>
        </div>
        <Button v-else @click="edit()">
            <iconLocation />
            Изменить город
        </Button>
    </div>
</template>

<style scoped>
    .city-input {
        display: flex;
        gap: 12px;
    }

    .city-select{
        width: 420px;
    }
</style>