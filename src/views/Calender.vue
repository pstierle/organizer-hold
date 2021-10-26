<template>
    <div class="p-2 calender bg-lightMode-medium :dark:bg-darkMode-medium">
        <div class="main">
            <div class="flex items-center justify-evenly py-2">
              <DropDown :elements="weekDays" @selectedIndex="handleIndexChange"></DropDown>
              <p class="text-xl text-center">Veranstaltungen</p>
            </div>
            <ul class="bg-lightMode-primary dark:bg-darkMode-primary rounded p-2 mt-4">
              <li class="text-xs text-center py-2" v-for="(event, index) in eventsToday" :key="index">
                <p>{{event.start}}-{{event.end}}</p>
                <p>{{event.location}}</p>
                <p>{{event.name}}</p>
              </li>  
            </ul>
            <p class="text-xl text-center mt-6 py-2">Abgaben</p>
            <ul class="bg-lightMode-primary dark:bg-darkMode-primary rounded p-2 mt-4">
              <li class="text-xs text-center py-2" v-for="(sheet, index) in exerciseSheetsToday" :key="index">
                <p>{{sheet.subjectName}}</p>
              </li>  
            </ul>
        </div>
        <div class="import-calender flex items-center justify-between">
            <p>Kalender Importieren</p>
            <img
            src="../assets/img/plus.svg"
            alt="settings"
            :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
            class="w-6 icon"
            @click="openImportCalender"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { watchEffect } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { userStore } from '@/store/userStore';
import Subject from '@/store/interfaces/Subject';
import { calenderStore } from '@/store/calenderStore';
import ExcerciseSheet from '@/store/interfaces/ExcerciseSheet';
import DropDown from "@/components/DropDown.vue"
import ParsedWeekDays from '@/store/interfaces/ParsedWeekDays';
import WeekDays from '@/store/interfaces/WeekDays';

export default {
  components:{
    DropDown
  },
  setup() {
    const darkMode = ref<Boolean>(false);
    const eventsToday = ref<Array<Subject>>([]);
    const exerciseSheetsToday = ref<Array<ExcerciseSheet>>([]);
    const currentDay = ref<String>("");
    const weekDays = ref<Array<string>>(ParsedWeekDays);

    onMounted(() => {
      darkMode.value = userStore.darkMode();
      eventsToday.value = calenderStore.getEventsToday();
      currentDay.value = calenderStore.getCurrentDay();
      exerciseSheetsToday.value = calenderStore.getExerciseSheetsToday();
    });

    watchEffect(() => {
      darkMode.value = userStore.darkMode();
      eventsToday.value = calenderStore.getEventsToday();
      currentDay.value = calenderStore.getCurrentDay();
      exerciseSheetsToday.value = calenderStore.getExerciseSheetsToday();
    });

    function handleIndexChange(index : any){
      calenderStore.setSelectedDay(WeekDays[index]);
    }
    
    function openImportCalender(){
      userStore.setOpenPopUp("Kalender Importieren");
    }

    return {
        openImportCalender,
        handleIndexChange,
        darkMode,
        eventsToday,
        currentDay,
        exerciseSheetsToday,
        weekDays,
    };
  },
};
</script>

<style scoped>

.calender {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 20px;
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
