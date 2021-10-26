<template>
  <div class="window bg-lightMode-secondary dark:bg-darkMode-secondary">
    <Header class="header bg-lightMode-secondary dark:bg-darkMode-secondary" />
    <div class="main">
      <SubjectList class="subject-list bg-lightMode-secondary dark:bg-darkMode-secondary z-10" />
      <Subject class="subject" :subject="selectedSubject" />
      <Calender class="calender" />
    </div>
    <PopUp></PopUp>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import Header from "@/views/Header.vue";
import Subject from "@/views/Subject.vue";
import SubjectList from "@/views/SubjectList.vue";
import { subjectStore } from "@/store/subjectStore";
import { userStore } from "@/store/userStore";
import PopUp from "@/views/PopUp.vue";
import Calender from "@/views/Calender.vue"
import SubjectType from "@/store/interfaces/Subject";
import { calenderStore } from '@/store/calenderStore';

export default {
  components: {
    Header,
    Subject,
    SubjectList,
    PopUp,
    Calender
  },
  setup() {
    const selectedSubject = ref<SubjectType | undefined>(undefined);

    watchEffect(() => {
      selectedSubject.value = subjectStore.getSelectedSubject();
    });

    onMounted(() => {
      subjectStore.preload();
      userStore.preload();
      calenderStore.preload();
      subjectStore.loadSubjects();
      userStore.loadUser();
      setTextColor();
    });

    function setTextColor() {
      const elements = document.querySelectorAll("body *");
      elements.forEach((element) => {
        element.classList.add("text-lightMode-text");
        element.classList.add("dark:text-darkMode-text");
      });
    }

    return {
      selectedSubject,
    };
  },
};
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
