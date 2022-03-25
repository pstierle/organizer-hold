<template>
  <div
    class="flex flex-col justify-between items-center p-1 border-l-2 border-gray-300 dark:border-zinc-800 w-56"
  >
    <div class="w-full">
      <div
        class="flex items-center text-sm bg-gray-300 dark:bg-zinc-800 rounded px-2 py-1 w-full"
      >
        <p>Tag -</p>
        <p>{{ currentDay }}</p>
      </div>
      <ExpansionCard title="Vorlesungen" class="mt-2">
        <div
          class="text-xs text-left my-1 hover:bg-gray-300 dark:hover:bg-zinc-700 p-1 rounded cursor-pointer"
          v-for="(subject, index) in subjectsToday"
          :key="index"
          @click="selectedSubjectId = subject.id"
          v-if="subjectsToday.length > 0"
        >
          <p>{{ subject.name }}</p>
          <p>{{ subject.start }}-{{ subject.end }}</p>
          <p>Ort: {{ subject.location }}</p>
        </div>
        <p class="text-xs" v-else>Keine Vorlesungen heute</p>
      </ExpansionCard>
      <ExpansionCard title="Abgaben heute" class="mt-2">
        <div
          class="text-xs text-left my-1 hover:bg-gray-300 dark:hover:bg-zinc-700 p-1 rounded cursor-pointer"
          v-for="(sheet, index) in exerciseSheetsToday"
          @click="selectedSubjectId = sheet.subjectID"
          :key="index"
          v-if="exerciseSheetsToday.length > 0"
        >
          <p>Blatt: {{ sheet.number }}</p>
          <p>Fach: {{ sheet.subjectName }}</p>
          <p v-if="sheet.done" class="text-blue-400">Erledigt</p>
          <p v-else class="text-red-400">Offen</p>
        </div>
        <p class="text-xs" v-else>Keine Abgaben heute</p>
      </ExpansionCard>
    </div>
    <div
      class="flex items-center justify-between w-full bg-gray-300 dark:bg-zinc-800 rounded px-2 py-1"
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

const { openModal } = useSettings();
const { selectedSubjectId } = useSubjects();
const { subjectsToday, exerciseSheetsToday, currentDay } = useCalender();
</script>
