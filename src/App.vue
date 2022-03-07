<template>
  <div class="window bg-lightMode-secondary dark:bg-darkMode-secondary">
    <Header class="header" />
    <div class="main">
      <SubjectList class="subject-list" />
      <Subject class="subject" />
      <Calender class="calender" />
    </div>
    <PopUp />
    <Notifications />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

import Header from "@/views/Header.vue";
import Subject from "@/views/Subject.vue";
import PopUp from "@/views/PopUp.vue";
import Calender from "@/views/Calender.vue";
import Notifications from "@/views/Notifications.vue";
import SubjectList from "@/views/SubjectList.vue";

import { subjectStore } from "@/store/subjectStore";

onMounted(() => {
  subjectStore.preload();
  subjectStore.loadSubjects();
  const elements = document.querySelectorAll("body *");
  elements.forEach((element) => {
    element.classList.add("text-lightMode-text");
    element.classList.add("dark:text-darkMode-text");
  });
});
</script>

<style scoped>
.window {
  position: absolute;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 1fr;
  grid-template-areas: "header" "main";
  overflow-x: hidden;
  backdrop-filter: blur(5px);
  border-radius: 10px;
}

.header {
  grid-template: header;
}

.main {
  grid-template: main;
  display: grid;
  grid-template-columns: 70px 1fr 300px;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "subject-list subject calender";
  overflow-x: hidden;
}

.subject-list {
  grid-area: subject-list;
  height: 100%;
  overflow: scroll;
}

*::-webkit-scrollbar {
  display: none;
}

.subject {
  grid-area: subject;
}

.calender {
  grid-area: calender;
}
</style>
