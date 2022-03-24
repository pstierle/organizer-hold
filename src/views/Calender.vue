<template>
  <div
    class="flex flex-col justify-between items-center px-1 border-l-2 border-gray-300 dark:border-zinc-800 w-52"
  >
    <div>
      <div class="flex items-center gap-2 p-2">
        <p>Tag:</p>
        <DropDown
          :selected="new Date().getDay()"
          :elements="weekDays"
          @selectedIndex="handleIndexChange"
        ></DropDown>
      </div>
      <ExpansionCard title="Vorlesungen" class="mt-2">
        <div
          class="text-xs text-left"
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
          class="text-xs text-left"
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
    <div class="import-calender flex items-center justify-between">
      <p>Kalender Importieren</p>
      <Icon
        icon="PlusCircleIcon"
        class="w-6"
        @click="openModal = 'Kalender Importieren'"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import DropDown from "@/components/DropDown.vue";
import WeekDays from "@/store/interfaces/WeekDays";
import Icon from "@/components/Icon.vue";
import { useSettings } from "@/store/useSettings";
import { useCalender } from "@/store/useCalender";
import ExpansionCard from "@/components/ExpansionCard.vue";

const weekDays = ref<Array<string>>(WeekDays);
const { openModal } = useSettings();

const { selectedDay, subjectsToday, exerciseSheetsToday } = useCalender();

function handleIndexChange(index: any) {
  selectedDay.value = WeekDays[index];
}
</script>
