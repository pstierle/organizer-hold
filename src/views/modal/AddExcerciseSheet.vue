<template>
  <div>
    <div class="flex justify-center">
      <Input
        class="mt-6"
        type="number"
        label="Blattnummer"
        v-model:value="sheetNumber"
      />
    </div>

    <div class="flex justify-center">
      <Input
        class="mt-6"
        type="date"
        label="Abgabe"
        v-model:value="sheetDueDate"
      />
    </div>
    <div class="flex justify-center">
      <Button
        class="w-24 mt-6 mb-6"
        text="Hinzufügen"
        icon="PlusCircleIcon"
        @click="add"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { ref } from "vue";
import { useSubjects } from "@/store/useSubjects";

const { addNewExerciseSheet } = useSubjects();

const sheetNumber = ref<number>(0);
const sheetDueDate = ref<string>();

function add() {
  if (sheetDueDate.value)
    addNewExerciseSheet(sheetNumber.value, new Date(sheetDueDate.value));
}
</script>

<style scoped></style>
