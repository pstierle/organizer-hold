<template>
  <div
    class="flex flex-col justify-between items-center p-1 border-l-2 border-gray-300 dark:border-zinc-800 w-56"
  >
    <div>
      <div
        class="flex items-center text-sm bg-gray-300 dark:bg-zinc-800 rounded px-2 py-1"
      >
        <p>Tag -</p>
        <p>{{ currentDay }}</p>
      </div>
      <ExpansionCard title="Vorlesungen" class="mt-2">
        <div
          class="text-xs text-left my-1"
          v-for="(event, index) in subjectsToday"
          :key="index"
          v-if="subjectsToday.length > 0"
        >
          <p>{{ event.name }}</p>
          <p>{{ event.start }}-{{ event.end }}</p>
          <p>Ort: {{ event.location }}</p>
        </div>
        <p class="text-xs" v-else>Keine Vorlesungen heute</p>
      </ExpansionCard>
      <ExpansionCard title="Abgaben heute" class="mt-2">
        <div
          class="text-xs text-left my-1"
          v-for="(sheet, index) in exerciseSheetsToday"
          :key="index"
          v-if="exerciseSheetsToday.length > 0"
        >
          <p>Blatt: {{ sheet.number }}</p>
          <p>Fach: {{ sheet.subjectName }}</p>
          <p>{{ sheet.done ? "Erledigt" : "Nicht erledigt" }}</p>
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

const { openModal } = useSettings();

const { subjectsToday, exerciseSheetsToday, currentDay } = useCalender();
</script>
