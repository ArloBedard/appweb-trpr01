<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
    (e: 'research-button-clicked', keyword: string): void
}>()

let keyword = ref<string>('')

watch(keyword, (newValue) => {
    emit('research-button-clicked', newValue)
});

</script>


<template>
    <div class="input-group mb-3">
        <span class="input-group-text">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
            viewBox="0 0 16 16">
            <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg></span>
        <input v-model="keyword" class="form-control" type="text" name="searchBar" id="searchBar"
            placeholder="Rechercher">
    </div>
</template>

<style scoped></style>