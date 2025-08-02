<script setup>
import { ref } from 'vue';
import Button from "./Button.vue";
import iconLocation from "../icons/iconLocation.vue";
import InputCity from './InputCity.vue';

let isEdited = ref(false); //реактивное состояние кнопки изменения города
let city = ref("Chebocksary"); // реактивное имя города (изначально не определено)

const emit = defineEmits({
    selectCity(payload) {
        return payload ? true : false;
    },
});

function select() {
    isEdited.value = false;
    emit("selectCity", "Paris");
}

function edit() {
    isEdited.value = true;
}

</script>

<template>
    {{ city }}
    <div class="city-select">
        <div v-if="isEdited" class="city-input"> <!-- скритие поля ввода города для состояние без редактирования -->
            <InputCity  v-model="city" placeholder="Введите город" />
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