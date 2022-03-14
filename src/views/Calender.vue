<template>
  <div class="px-1 calender border-l-2 border-gray-300 dark:border-gray-800">
    <div class="main">
      <div class="flex items-center justify-evenly py-2">
        <DropDown
          :selected="new Date().getDay()"
          :elements="weekDays"
          @selectedIndex="handleIndexChange"
        ></DropDown>
        <p class="text-xl text-center">Veranstaltungen</p>
      </div>
      <ul class="bg-gray-200 dark:bg-gray-700 rounded p-2 mt-4">
        <li
          class="text-xs text-center py-2"
          v-for="(event, index) in eventsToday"
          :key="index"
        >
          <p>{{ event.start }}-{{ event.end }}</p>
          <p>{{ event.location }}</p>
          <p>{{ event.name }}</p>
        </li>
      </ul>
      <p class="text-xl text-center mt-6 py-2">Abgaben</p>
      <ul class="bg-gray-200 dark:bg-gray-700 rounded p-2 mt-4">
        <li
          class="text-xs text-center py-2"
          v-for="(sheet, index) in exerciseSheetsToday"
          :key="index"
        >
          <p>{{ sheet.subjectName }}</p>
        </li>
      </ul>
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

const weekDays = ref<Array<string>>(WeekDays);
const { openModal } = useSettings();

const { selectedDay, eventsToday, exerciseSheetsToday } = useCalender();

function handleIndexChange(index: any) {
  selectedDay.value = WeekDays[index];
}
</script>

<style scoped>
.calender {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px;
  gap: 0px 0px;
  grid-template-areas: "main" "import-subject";
}

.main {
  grid-area: main;
}

.import-subject {
  grid-area: import-subject;
}
</style>
