<script setup lang="ts">
import { type Yarn } from "../scripts/types.ts";
defineProps<{
    outOfStockYarns: Yarn[];
}>();
</script>


<template>
    <div v-for="yarn in outOfStockYarns" :key="yarn.id"
        class="toast align-items-center text-bg-danger border-0 show m-2" role="alert" aria-live="assertive"
        aria-atomic="true" data-bs-autohide="true" data-bs-delay="3000">
        <div class="d-flex">
            <div class="toast-body">
                Le stock de l'item : {{ yarn.name }} est épuisé!
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
</template>

<style scoped></style>