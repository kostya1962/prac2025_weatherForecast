<script setup>
import { ref } from 'vue';
import Button from "./Button.vue";
import iconLocation from "../icons/iconLocation.vue";

let isEdited = ref(false); //реактивное состояние кнопки изменения города

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
    {{ isEdited }}
    <Button @click="edit()">
        <iconLocation />
        Изменить город
    </Button>
    <div>
        <input />
        <Button @click="select()"> Сохранить </Button>
    </div>
</template>
