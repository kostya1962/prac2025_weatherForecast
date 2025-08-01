<script setup>
import Button from "./Button.vue";
import iconLocation from "../icons/iconLocation.vue";

const emit = defineEmits({
    selectCity(payload) {
        console.log(`Validatig payload: ${payload}`);
        return payload ? true : false;
    },
});

function select() {
    emit("selectCity", "Paris");
}
</script>

<template>
    <Button @click="select()">
        <iconLocation />
        Изменить город
    </Button>
    <input />
    <Button> Сохранить </Button>
</template>
