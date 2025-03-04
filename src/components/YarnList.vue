<script setup lang="ts">
import { type Yarn } from "../scripts/types.ts";
defineProps<{
  yarns: Yarn[];
}>();

defineEmits<{
  (e: 'modify-button-clicked', yarnId: number): void,
  (e: 'duplicate-button-clicked', yarnId: number): void,
  (e: 'delete-button-clicked', yarnId: number): void
  (e: 'display-yarn-details', yarnId: number): void
}>();

</script>

<template>
  <table class="table table-striped ">
    <thead>
      <tr>
        <th>Liste des laines</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="yarn of yarns">
        <td @click="$emit('display-yarn-details', yarn.id)">
          <span v-if="yarn.stock == 0" class="badge bg-danger "> {{ yarn.stock }}</span>
          <span v-if="yarn.stock > 0 && yarn.stock <= 10" class="badge bg-warning  "> {{ yarn.stock }} </span>
          <span v-if="yarn.stock > 10" class="badge bg-success "> {{ yarn.stock }}</span>
          {{ yarn.name }}
        </td>
        <td>
          <button @click="$emit('modify-button-clicked', yarn.id)" class="btn btn-primary p-2 m-2">Modifier</button>
          <button @click="$emit('duplicate-button-clicked', yarn.id)" class="btn btn-primary p-2 m-2">Dupliquer</button>
          <button @click="$emit('delete-button-clicked', yarn.id)" class="btn btn-primary p-2 m-2" type="button"
            data-bs-toggle="modal" data-bs-target="#deleteModal">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
