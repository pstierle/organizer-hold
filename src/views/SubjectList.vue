<template>
  <div class="container">
      <!-- :class="{ focus: focused == true, unfocus: focused == false }" -->
    <!-- <div class="flex justify-center h-10">
      <img
        src="../assets/img/right.svg"
        alt="menu"
        class="w-6 icon arrow"
        :class="{
          'light-icon': !darkMode,
          'dark-icon': darkMode,
          rotateLeft: focused == true && !darkMode,
          rotateLeftDark: focused == true && darkMode == true,
          rotateRight: focused == false,
        }"
      />
    </div> -->
    <div 
        class="
        text-center 
        overflow-y-scroll 
        scrollbar-thin 
        scrollbar-thumb-darkMode-light 
        scrollbar-thumb-rounded 
        scrollbar-track-rounded
        "
    >
      <ul
        @mouseenter="focused = true"
        @mouseleave="focused = false"
      >
        <li
          v-for="(subject, index) in subjects"
          :key="index"
          class="mt-5 items-center flex justify-center w-full"
          @click="selectSubject(subject)"
          @mouseenter="hoveredSubjectID = subject.id"
          @mouseleave="hoveredSubjectID = null"
        >
          <div 
            v-if="hoveredSubjectID === subject.id" 
            class="text-xs absolute ml-56 bg-lightMode-accent dark:bg-darkMode-accent rounded p-2 w-40" 
            :class="{ focusLabel: hoveredSubjectID === subject.id, unfocusLabel: hoveredSubjectID !== subject.id }"
          >
            <p>{{subject.name}}</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12 circle bg-lightMode-primary dark:bg-darkMode-primary" :class="{ 'border-b-2 border-lightMode-accent dark:border-darkMode-accent': selectedSubjectID == subject.id}">
            <p>{{subject.shortName}}</p>
          </div>
        </li>
      </ul>      
    </div>
    <div class="flex justify-around settings-container">
      <img
        src="../assets/img/settings.svg"
        alt="settings"
        :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
        class="w-6 icon"
        @click="openSettings()"
      />
      <img
        src="../assets/img/plus.svg"
        alt="settings"
        :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
        class="w-6 icon"
        @click="openAddSubject()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Subject from "@/store/interfaces/Subject";
import { onMounted, ref, watchEffect } from "@vue/runtime-core";
import { subjectStore } from "@/store/subjectStore";
import { userStore } from "@/store/userStore";

export default {
  setup() {
    const subjects = ref<Array<Subject>>();
    const selectedSubjectID = ref<Number>();
    const focused = ref<Boolean>(false);
    const darkMode = ref<Boolean>(false);
    const hoveredSubjectID = ref<number | null>(null);

    onMounted(() => {
      darkMode.value = userStore.darkMode();
      subjects.value = subjectStore.getSubjects();
      selectedSubjectID.value = subjectStore.getSelectedSubjectID();
    });

    watchEffect(() => {
      darkMode.value = userStore.darkMode();
      subjects.value = subjectStore.getSubjects();
      selectedSubjectID.value = subjectStore.getSelectedSubjectID();
    });

    function openSettings() {
      userStore.setOpenPopUp("Einstellungen");
    }

    function selectSubject(subject: Subject) {
      subjectStore.setSelectedSubjectID(subject.id);
    }

    function openAddSubject() {
      userStore.setOpenPopUp("Fach hinzufügen");
    }

    return {
      subjects,
      selectedSubjectID,
      focused,
      darkMode,
      hoveredSubjectID,
      openSettings,
      selectSubject,
      openAddSubject,
    };
  },
};
</script>

<style scoped>
.container{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px;
  gap: 0px 0px;
  grid-template-areas: "list" "settings-container"; 
}

li:hover{
  cursor: pointer;
}

.list{
  grid-area: "list";
  min-height: 300px;
}

.settings-container{
  grid-area: "settings-container";
}

.focus {
  animation: fadeIn 200ms forwards;
}

.unfocus {
  animation: fadeOut 200ms forwards;
}

.focusLabel {
  animation: fadeInLabel 400ms forwards;
}

.unfocusLabel {
  animation: fadeOutLabel 400ms forwards;
}

.rotateRight {
  animation: rotateRight 250ms forwards;
}

.rotateLeft {
  animation: rotateLeft 250ms forwards;
}

.rotateLeftDark {
  animation: rotateLeftDark 250ms forwards;
}

@keyframes rotateRight {
  from {
    transform: rotate(-180deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes rotateLeft {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-180deg);
    filter: invert(79%) sepia(81%) saturate(3254%) hue-rotate(341deg)
      brightness(109%) contrast(97%);
  }
}

@keyframes rotateLeftDark {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-180deg);
    filter: invert(36%) sepia(47%) saturate(2637%) hue-rotate(238deg)
      brightness(99%) contrast(95%);
  }
}

@keyframes fadeIn {
  from {
    width: 70px;
  }
  to {
    width: 90px;
  }
}

@keyframes fadeOut {
  from {
    width: 90px;
  }
  to {
    width: 70px;
  }
}

@keyframes fadeInLabel {
  from {
    opacity: 0;
  }
  to {
    opacity: 100;
  }
}

@keyframes fadeOutLabel {
from {
    opacity: 100;
  }
  to {
    opacity: 0;
  }
}

.circle{
  border-radius: 50%;
}
</style>
