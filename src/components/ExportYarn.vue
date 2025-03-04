<script setup lang="ts">
import { type Yarn } from "../scripts/types.ts";

const props = defineProps<{ yarns: Yarn[] }>();


function exportToCsv(): void {
    if (props.yarns.length > 0) {
        const headers = ["Id", "Nom", "Description", "Prix", "Stock", "Type de laine", "Couleur", "Poids"];

        const rows = props.yarns.map(yarn => [
            yarn.id, yarn.name, yarn.description, yarn.price, yarn.stock, yarn.yarnType, yarn.color, yarn.weight
        ]);

        const csvContent = [headers, ...rows].join("\r\n");

        const blob = new Blob([csvContent]);
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "liste_produits.csv");
        document.body.appendChild(link);
        link.click();
    }
}

</script>


<template>
    <button @click="exportToCsv" class="btn btn-primary p-2 m-2">Exporter</button>
</template>

<style scoped></style>