<template>
  <div class="bg-gray-200 dark:bg-zinc-700 rounded flex flex-col min-h-screen">
    <Header />
    <div class="flex items-stretch flex-1 overflow-auto">
      <SideBar class="" />
      <Subject class="flex-1" v-if="selectedSubject" />
      <NoContent class="flex-1" v-else />
      <Calender />
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
import { useSubjects } from "./store/useSubjects";
import { usePath } from "./store/usePath";
import { useSettings } from "./store/useSettings";
import SideBar from "@/views/SideBar.vue";
import NoContent from "./views/NoContent.vue";

const { preload, subjects, submissions, loading, selectedSubject } =
  useSubjects();
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

<style>
body {
  overflow: hidden;
}
</style>
