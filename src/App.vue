<template>
  <div class="window bg-gray-200 dark:bg-gray-700 rounded">
    <Header class="header" />
    <div class="main">
      <SubjectList class="subject-list" />
      <Subject class="subject" />
      <Calender class="calender" />
    </div>
    <Modal />
    <Notifications />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";

import Header from "@/views/Header.vue";
import Subject from "@/views/Subject.vue";
import Modal from "@/views/Modal.vue";
import Calender from "@/views/Calender.vue";
import Notifications from "@/views/Notifications.vue";
import SubjectList from "@/views/SubjectList.vue";
import { useSubjects } from "./store/useSubjects";
import { usePath } from "./store/usePath";
import { useSettings } from "./store/useSettings";

const { preload, subjects, submissions, loading } = useSubjects();
const { subjectPath, submissionPath, settingsPath } = usePath();
const { darkMode, studentID, loadSettings } = useSettings();

onMounted(async () => {
  await preload();
  loadSettings();
  const elements = document.querySelectorAll("body *");
  elements.forEach((element) => {
    element.classList.add("text-gray-800");
    element.classList.add("dark:text-gray-200");
  });
});

watch(darkMode, () => {
  let appMode = document.querySelector("html")?.classList;
  if (darkMode.value) appMode?.add("dark");
  else appMode?.remove("dark");
});

watch(
  [submissions, subjects],
  async () => {
    loading.value = true;
    await window.fs.writeFileSync(
      subjectPath,
      JSON.stringify(subjects.value, null, 4)
    );
    await window.fs.writeFileSync(
      submissionPath,
      JSON.stringify(submissions.value, null, 4)
    );
    loading.value = false;
  },
  {
    deep: true,
  }
);

watch([darkMode, studentID], async () => {
  await window.fs.writeFileSync(
    settingsPath,
    JSON.stringify(
      {
        darkMode: darkMode.value,
        studentID: studentID.value,
      },
      null,
      4
    )
  );
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
}

.header {
  grid-template: header;
}

.main {
  grid-template: main;
  display: grid;
  grid-template-columns: 150px 1fr 250px;
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
