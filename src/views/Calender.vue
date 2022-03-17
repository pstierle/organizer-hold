<template>
  <div class="px-1 calender border-l-2 border-gray-300 dark:border-gray-800">
    <div class="main">
      <div class="flex items-center justify-evenly py-2">
        <p class="text-xl text-center">Tag:</p>
        <DropDown
          :selected="new Date().getDay()"
          :elements="weekDays"
          @selectedIndex="handleIndexChange"
        ></DropDown>
      </div>
      <ExpansionCard title="Vorlesungen">
        <div class="divide-y-2">
          <div
            class="text-xs text-left"
            v-for="(event, index) in subjectsToday"
            :key="index"
          >
            <p>{{ event.name }}</p>
            <p>{{ event.start }}-{{ event.end }}</p>
            <p>Ort: {{ event.location }}</p>
          </div>
        </div>
      </ExpansionCard>
      <ExpansionCard title="Abgaben" class="mt-2">
        <div class="divide-y-2">
          <div
            class="text-xs text-left"
            v-for="(sheet, index) in exerciseSheetsToday"
            :key="index"
          >

          
            <p>Nummer: {{ sheet.number }}</p>
            <p>Fach: {{ sheet.subjectName }}</p>
            <p>{{ sheet.done ? "Erledigt" : "Nicht erledigt" }}</p>
          </div>
        </div>
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
