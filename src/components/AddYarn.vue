<script setup lang="ts">
import YarnForm from "./YarnForm.vue";
import { Yarn } from "../scripts/types.ts";

const emit = defineEmits<{
    (e: 'add-yarn', yarn: Yarn): void
}>()

</script>

<template>
    <YarnForm :button-name="'Ajouter'" :yarn="Yarn('', '', 0, 0, '', '', 0)"
        @confirm-form-submission="(yarn) => emit('add-yarn', yarn)" />
</template>

<style scoped></style>