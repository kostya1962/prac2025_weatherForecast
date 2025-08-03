<script setup>
import { onMounted, ref } from 'vue';
import Button from "./Button.vue";
import iconLocation from "../icons/iconLocation.vue";
import InputCity from './InputCity.vue';

let isEdited = ref(false); //реактивное состояние кнопки изменения города
let city = ref("Чебоксары"); // реактивное имя города (изначально не определено)

const emit = defineEmits({ // событие для передачи города в родительский компонент
    selectCity(payload) {
        return payload ? true : false;
    },
});

onMounted(() => { //необходимо, чтобы при загрузке компонента название активного города передавался родителю 
    emit('selectCity', city.value);
});  

function select() {
    isEdited.value = false;
    emit("selectCity", city.value); // город выбран
}

function edit() {
    isEdited.value = true;
}

</script>

<template>
    {{ city }}
    <div class="city-select">
        <div v-if="isEdited" class="city-input"> <!-- скритие поля ввода города для состояние без редактирования -->
            <InputCity  v-model="city" placeholder="Введите город" @keyup.enter="select()" />
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