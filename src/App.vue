<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { computed, ref } from 'vue'
import { Yarn } from "./scripts/types.ts";
import { yellowCotton, greenChenille, whiteMerino } from "./scripts/types.ts";
import YarnList from "./components/YarnList.vue";
import AddYarn from "./components/AddYarn.vue";
import ModifyYarn from "./components/ModifyYarn.vue";
import DuplicateYarn from "./components/DuplicateYarn.vue";
import SearchYarn from "./components/SearchYarn.vue";
import YarnDetails from "./components/YarnDetails.vue";
import OutOfStockAlert from "./components/OutOfStockAlert.vue";
import ExportYarn from "./components/ExportYarn.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

let yarns = ref<Yarn[]>([yellowCotton, greenChenille, whiteMerino])

let outOfStockYarns = computed(() => {
  return yarns.value.filter(yarn => yarn.stock == 0)
});

let searchString = ref<string>('')
let displayedYarns = computed(() => {
  return yarns.value.filter(yarn => yarn.name.toLowerCase().includes(searchString.value.toLowerCase()))
});

let yarnToModifyId = ref<number>()
const yarnToModify = computed(() => {
  return yarns.value.find(yarn => yarn.id === yarnToModifyId.value) || null;
});

let yarnToDuplicateId = ref<number>()
const yarnToDuplicate = computed(() => {
  return yarns.value.find(yarn => yarn.id === yarnToDuplicateId.value) || null;
});

let yarnToDeleteId = ref<number>()
const yarnToDelete = computed(() => {
  return yarns.value.find(yarn => yarn.id === yarnToDeleteId.value) || null;
});

let selectedYarnDetailsId = ref<number>()
const selectedYarnDetails = computed(() => {
  return yarns.value.find(yarn => yarn.id === selectedYarnDetailsId.value) || null;
});

function addYarnToList(yarnToAdd: Yarn): void {
  yarns.value.push(yarnToAdd);
}

function modifyYarn(newYarn: Yarn): void {
  if (yarnToModify.value) {
    yarnToModify.value.name = newYarn.name
    yarnToModify.value.description = newYarn.description
    yarnToModify.value.yarnType = newYarn.yarnType
    yarnToModify.value.price = newYarn.price
    yarnToModify.value.stock = newYarn.stock
    yarnToModify.value.color = newYarn.color
    yarnToModify.value.weight = newYarn.weight
  }

  yarnToModifyId.value = undefined;
}

function duplicateYarn(yarnToDuplicate: Yarn): void {
  yarns.value.push(yarnToDuplicate);

  yarnToDuplicateId.value = undefined;
}

function deleteYarn(): void {
  yarns.value = yarns.value.filter(yarn => yarn.id !== yarnToDeleteId.value);
}

</script>

<template>
  <main class="fs-5 container">
    <Header />
    <div class="row">
      <div class="col rounded border p-2 m-3">
        <SearchYarn @research-button-clicked="(keyword) => searchString = keyword" />

        <YarnList :yarns="displayedYarns"
          @modify-button-clicked="(yarnId) => (yarnToModifyId = yarnId, yarnToDuplicateId = undefined)"
          @duplicate-button-clicked="(yarnId) => (yarnToDuplicateId = yarnId, yarnToModifyId = undefined)"
          @delete-button-clicked="(yarnId) => (yarnToDuplicateId = undefined, yarnToModifyId = undefined, yarnToDeleteId = yarnId)"
          @display-yarn-details="(yarnId) => (selectedYarnDetailsId = yarnId)" />

        <ExportYarn :yarns="yarns" />

        <OutOfStockAlert :outOfStockYarns="outOfStockYarns" />

      </div>

      <div class="col rounded border p-2 m-3">
        <ModifyYarn v-if="yarnToModify" :yarnToModify="(yarnToModify)" @modify-yarn="(yarn) => modifyYarn(yarn)" />

        <DuplicateYarn v-else-if="yarnToDuplicate" :yarnToDuplicate="yarnToDuplicate"
          @duplicate-yarn="(yarn) => duplicateYarn(yarn)" />

        <AddYarn v-else @add-yarn="(yarn) => addYarnToList(yarn)" />
      </div>

      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Confirmation de suppression</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div v-if="yarnToDelete" class="modal-body">
              Voulez-vous vraiment supprimer l'item : {{ yarnToDelete.name }}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-primary" @click="deleteYarn"
                data-bs-dismiss="modal">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-if="selectedYarnDetails" class="col rounded border p-2 m-3">
        <YarnDetails :yarn="selectedYarnDetails" @close-details-view="selectedYarnDetailsId = undefined" />
      </div>
    </div>

    <Footer />
  </main>
</template>

<style scoped></style>
