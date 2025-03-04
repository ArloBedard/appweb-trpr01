<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Yarn } from '../scripts/types.ts'
import { yarnTypes } from '../scripts/types.ts'

const props = defineProps<{
  buttonName: string,
  yarn: Yarn
}>();

const emit = defineEmits<{
  (e: 'confirm-form-submission', yarn: Yarn): void
}>()

let name = ref<string>(props.yarn.name);
let description = ref<string>(props.yarn.description);
let price = ref<number>(props.yarn.price);
let stock = ref<number>(props.yarn.stock);
let yarnType = ref<string>(props.yarn.yarnType);
let color = ref<string>(props.yarn.color);
let weight = ref<number>(props.yarn.weight);

watch(() => props.yarn, (newValue) => {
  name.value = newValue.name;
  description.value = newValue.description;
  price.value = newValue.price;
  stock.value = newValue.stock;
  yarnType.value = newValue.yarnType;
  color.value = newValue.color;
  weight.value = newValue.weight;
});

let isNameValid = computed<boolean>(() => {
  return (name.value.length > 0 && isNaN(Number(name.value)));
})
let isDescriptionValid = computed<boolean>(() => {
  return (description.value.length > 0 && isNaN(Number(description.value)));
})
let isPriceValid = computed<boolean>(() => {
  return (price.value > 0 && !isNaN(price.value));
})
let isStockValid = computed<boolean>(() => {
  return (stock.value >= 0 && !isNaN(stock.value));
})
let isYarnTypeValid = computed<boolean>(() => {
  return (yarnType.value.length > 0 && isNaN(Number(yarnType.value)));
})
let isColorValid = computed<boolean>(() => {
  return (color.value.length > 0 && isNaN(Number(color.value)));
})
let isWeightValid = computed<boolean>(() => {
  return (weight.value > 0 && !isNaN(weight.value));
})

let hasFormBeenValidated = ref<boolean>(false);

function handleSubmit(e: Event): void {
  e.preventDefault();
  hasFormBeenValidated.value = true;

  if (
    isNameValid.value &&
    isDescriptionValid.value &&
    isPriceValid.value &&
    isStockValid.value &&
    isYarnTypeValid.value &&
    isColorValid.value &&
    isWeightValid.value) {

    const newYarn = Yarn(name.value, description.value, price.value, stock.value, yarnType.value, color.value, weight.value)
    emit('confirm-form-submission', newYarn)

    const form: HTMLFormElement = document.getElementById("yarnForm") as HTMLFormElement;
    form.reset()
  }
}

</script>

<template>
  <form method="post" action="index.html" class="text-center" id="yarnForm">
    <div class="form-group">
      <label for="name">Nom</label>
      <input v-model="name" type="text" name="name" id="name" class="form-control" />
      <div v-if="!isNameValid && hasFormBeenValidated" class="fs-6 text-danger">Veuillez entrer un nom de laine valide
        (pas vide et
        pas
        seulement des chiffres).</div>
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea v-model="description" class="form-control" name="description" id="description" rows="3"></textarea>
      <div v-if="!isDescriptionValid && hasFormBeenValidated" class="fs-6 text-danger">Veuillez entrer une description
        de laine
        valide
        (pas vide et pas seulement des chiffres).</div>
    </div>

    <div class="row">
      <div class="form-group col">
        <label for="price">Prix</label>
        <div class="input-group mb-3">
          <input v-model="price" type="number" name="price" id="price" class="form-control" min="0"
            placeholder="0.00" />
          <span class="input-group-text">$</span>
        </div>
        <div v-if="!isPriceValid && hasFormBeenValidated" class="fs-6 text-danger">Le prix doit être un nombre plus
          grand que 0.
        </div>
      </div>

      <div class="form-group col">
        <label for="stock">Stock</label>
        <input v-model="stock" type="number" name="stock" id="stock" class="form-control" min="0" />
        <div v-if="!isStockValid && hasFormBeenValidated" class="fs-6 text-danger">Le stock ne peut pas être un nombre
          négatif.
        </div>
      </div>

      <div class="form-group col">
        <label for="weight">Poids (en grammes)</label>
        <div class="input-group mb-3">
          <input v-model="weight" type="number" name="weight" id="weight" class="form-control" min="0" />
          <span class="input-group-text">g</span>
        </div>
        <div v-if="!isWeightValid && hasFormBeenValidated" class="fs-6 text-danger">Le poids doit être un nombre plus
          grand que 0.
        </div>

      </div>
    </div>

    <div class="row">
      <div class="form-group col">
        <label for="yarnTypes">Type de laine</label>
        <select v-model="yarnType" name="yarnTypes" id="yarnTypes" class="form-control">
          <option v-for="yarnType of yarnTypes" :value="yarnType">
            {{ yarnType }}
          </option>
        </select>
        <div v-if="!isYarnTypeValid && hasFormBeenValidated" class="fs-6 text-danger">Veuillez choisir le type de laine.
        </div>
      </div>

      <div class="form-group col">
        <label for="color">Couleur</label>
        <input v-model="color" type="text" name="color" id="color" class="form-control" />
        <div v-if="!isColorValid && hasFormBeenValidated" class="fs-6 text-danger">Veuillez entrer la couleur de la
          laine.</div>
      </div>
    </div>

    <button @click="handleSubmit" type="submit" class="btn btn-primary mb-2 m-2">
      {{ buttonName }}
    </button>
  </form>
</template>

<style scoped></style>
