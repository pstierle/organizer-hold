<template>
  <div class="flex flex-col gap-2 p-2 w-56 justify-start">
    <ExpansionCard title="Vorlesungen">
      <ul v-if="subjectsToday.length > 0">
        <li
          class="text-xs text-left my-1 hover:bg-gray-300 dark:hover:bg-zinc-700 p-1 rounded cursor-pointer"
          v-for="(subject, index) in subjectsToday"
          :key="index"
          @click="selectedSubjectId = subject.id"
        >
          <p>{{ subject.name }}</p>
          <p>{{ subject.start }}-{{ subject.end }}</p>
          <p>Ort: {{ subject.location }}</p>
        </li>
      </ul>
      <p class="text-xs" v-else>Keine Vorlesungen heute</p>
    </ExpansionCard>
    <ExpansionCard title="Abgaben heute">
      <ul v-if="exerciseSheetsToday.length > 0">
        <li
          class="text-xs text-left my-1 hover:bg-gray-300 dark:hover:bg-zinc-700 p-1 rounded cursor-pointer"
          v-for="(sheet, index) in exerciseSheetsToday"
          @click="
            () => {
              selectedSubjectId = Number(sheet.subjectID);
              selectedSheetNumber = Number(sheet.number);
            }
          "
          :key="index"
        >
          <div class="flex justify-between font-bold">
            <p>Blatt: {{ sheet.number }}</p>
            <p v-if="sheet.done" class="text-blue-400">Erledigt</p>
            <p v-else class="text-red-400">Offen</p>
          </div>
          <p>{{ sheet.subjectName }}</p>
        </li>
      </ul>
      <p class="text-xs" v-else>Keine Abgaben heute</p>
    </ExpansionCard>
    <div
      class="flex items-center justify-between bg-gray-300 dark:bg-zinc-800 rounded px-2 py-1 mt-auto"
    >
      <p class="text-sm">Kalender Importieren</p>
      <Icon
        icon="PlusCircleIcon"
        class="w-5"
        @click="openModal = 'Kalender Importieren'"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "@/components/Icon.vue";
import { useSettings } from "@/store/useSettings";
import { useCalender } from "@/store/useCalender";
import ExpansionCard from "@/components/ExpansionCard.vue";
import { useSubjects } from "@/store/useSubjects";

const { openModal, selectedSheetNumber } = useSettings();
const { selectedSubjectId } = useSubjects();
const { subjectsToday, exerciseSheetsToday, currentDay } = useCalender();
</script>
