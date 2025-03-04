<script setup lang="ts">
import YarnForm from "./YarnForm.vue";
import { type Yarn } from "../scripts/types.ts";
defineProps<{
    yarnToModify: Yarn;
}>();


const emit = defineEmits<{
    (e: 'modify-yarn', yarn: Yarn): void
}>()

</script>

<template>
    <YarnForm :button-name="'Modifier'" :yarn="yarnToModify"
        @confirm-form-submission="(yarn) => emit('modify-yarn', yarn)" />
</template>

<style scoped></style>