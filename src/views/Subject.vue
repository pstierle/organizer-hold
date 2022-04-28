<template>
  <div class="p-2 flex flex-col gap-2" v-if="selectedSubject">
    <div class="flex items-center justify-between">
      <p class="bg-gray-300 dark:bg-zinc-800 py-1 px-2 rounded font-bold">
        {{ selectedSubject?.name }}
      </p>
      <div class="flex items-center gap-2">
        <Button
          text="Bearbeiten"
          @click="openModal = 'Bearbeiten'"
          icon="PencilAltIcon"
        ></Button>
        <Button
          type="alert"
          icon="TrashIcon"
          text="Löschen"
          @click="openModal = 'Löschen'"
        ></Button>
      </div>
    </div>
    <div class="mt-2 w-full flex justify-between">
      <p v-if="selectedSubject?.professor != ''">
        Proffessor: {{ selectedSubject?.professor }}
      </p>
      <Button
        text="Blatt Hinzufügen"
        icon="PlusCircleIcon"
        @click="openModal = 'Übungsblatt hinzufügen'"
      />
    </div>
    <div>
      <SheetOverview
        :tabs="selectedSubject?.exerciseSheets"
        :selectedSheetNumber="Number(selectedSheetNumber)"
        @select="
          (number) => {
            selectedSheetNumber = number;
          }
        "
      />
      <ExcerciseSheet
        :sheet="
          selectedSubject.exerciseSheets.find(
            (e) => e.number === selectedSheetNumber
          )
        "
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import { useSettings } from "@/store/useSettings";
import { useSubjects } from "@/store/useSubjects";
import SheetOverview from "@/components/SheetOverview.vue";
import ExcerciseSheet from "@/components/ExcerciseSheet.vue";

const { selectedSubject } = useSubjects();

const { openModal, selectedSheetNumber } = useSettings();
</script>
