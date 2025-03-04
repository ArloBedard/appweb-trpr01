<script setup lang="ts">
import { Yarn } from "../scripts/types.ts";

defineProps<{ yarn: Yarn }>();
defineEmits<{
    (e: 'close-details-view'): void
}>()
</script>


<template>
    <div class="col">
        <h3 class="mb-3">Détails de l'item : {{ yarn.name }}</h3>

        <table class="table table-striped">
            <tbody>
                <tr>
                    <th scope="row">Nom</th>
                    <td>{{ yarn.name }}</td>
                </tr>
                <tr>
                    <th scope="row">Description</th>
                    <td>{{ yarn.description }}</td>
                </tr>
                <tr>
                    <th scope="row">Prix</th>
                    <td>{{ yarn.price }}$</td>
                </tr>
                <tr>
                    <th scope="row">Stock</th>
                    <td>{{ yarn.stock }}</td>
                </tr>
                <tr>
                    <th scope="row">Type de laine</th>
                    <td>{{ yarn.yarnType }}</td>
                </tr>
                <tr>
                    <th scope="row">Couleur</th>
                    <td>{{ yarn.color }}</td>
                </tr>
                <tr>
                    <th scope="row">Poids</th>
                    <td>{{ yarn.weight }} g</td>
                </tr>
            </tbody>
        </table>

        <button @click="$emit('close-details-view')" class="btn btn-primary p-2 m-2">Ok</button>
    </div>
</template>


<style scoped></style>