<script setup lang="ts">
import YarnForm from "./YarnForm.vue";
import { type Yarn } from "../scripts/types.ts";
defineProps<{
    yarnToDuplicate: Yarn;
}>();


const emit = defineEmits<{
    (e: 'duplicate-yarn', yarn: Yarn): void
}>()

</script>

<template>
    <YarnForm :button-name="'Dupliquer'" :yarn="yarnToDuplicate"
        @confirm-form-submission="(yarn) => emit('duplicate-yarn', yarn)" />
</template>

<style scoped></style>