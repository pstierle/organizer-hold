<template>
  <div
    class="subject-container p-3 bg-lightMode-primary dark:bg-darkMode-primary"
    v-if="subject != null"
  >
    <div class="header flex items-center justify-between text-center">
      <p class="bg-lightMode-light dark:bg-darkMode-light p-2 rounded mt-2">
        {{ subject.name }}
      </p>
      <div class="flex justify-between w-40">
        <Button
          text="Bearbeiten"
          @click="openPopUp('Bearbeiten')"
          icon="Edit"
        ></Button>
        <Button
          type="alert"
          icon="Bin"
          text="Löschen"
          @click="openPopUp('Löschen')"
        ></Button>
      </div>
    </div>
    <div class="main pt-3 pb-3">
      <p v-if="subject.professor != ''">Proffessor: {{subject.professor}}</p>
      <div class="flex items-center w-1/3 justify-between mt-4">
        <p
          :class="{
            'border-b-2 border-lightMode-accent dark:border-darkMode-accent':
              openTab === 'Übungsblätter',
          }"
          class="text-xl"
          @click="openTab = 'Übungsblätter'"
        >
          Übungsblätter
        </p>
        <p
          :class="{
            'border-b-2 border-lightMode-accent dark:border-darkMode-accent':
              openTab === 'Termine',
          }"
          class="text-xl"
          @click="openTab = 'Termine'"
        >
          Termine
        </p>
      </div>
      <div v-if="openTab === 'Übungsblätter'">
        <div>
          <Button
            text="Hinzufügen"
            icon="Plus"
            class="w-24 mt-4"
            @click="openPopUp('Übungsblatt hinzufügen')"
          />
          <ul class="
              overflow-y-auto 
              scrollbar-thin 
              scrollbar-thumb-darkMode-light 
              scrollbar-thumb-rounded 
              scrollbar-track-rounded">
            <li
                v-for="(sheet, index) in subject.exerciseSheets"
                :key="index" 
                class="border-b-2 border-lightMode-light dark:border-darkMode-light flex items-center justify-evenly mt-2 pb-2"
              >
                <p>Nr.{{sheet.number}}</p>
                  <div class="flex items-center justify-evenly w-32">
                    <div>
                      <p>Abgabe</p>
                      <p v-if="getSubmissionCount('Abgabe', sheet.number) <= 0" class="text-xs text-lightMode-textDark dark:text-darkMode-textDark">Keine Abgabe</p>
                      <p v-else class="text-xs text-textHighlight">Anzahl: {{getSubmissionCount('Abgabe', sheet.number)}}</p>
                    </div>
                    <img
                      src="../assets/img/magnifying-glass.svg"
                      alt="settings"
                      :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
                      class="w-4 icon"
                      @click="openPopUp('Abgabe', sheet.number)"
                    />
                  </div>            
                  <div class="flex items-center justify-evenly w-32">
                    <div>
                      <p>Korrektur</p>
                      <p v-if="getSubmissionCount('Korrektur', sheet.number) <= 0" class="text-xs text-lightMode-textDark dark:text-darkMode-textDark">Keine Abgabe</p>
                      <p v-else class="text-xs text-textHighlight">Anzahl: {{getSubmissionCount('Korrektur', sheet.number)}}</p>
                    </div>
                    <img
                      src="../assets/img/magnifying-glass.svg"
                      alt="settings"
                      :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
                      class="w-4 icon"
                      @click="openPopUp('Korrektur', sheet.number)"
                    />
                  </div>
                  <div class="flex items-center justify-evenly w-32">
                    <div>
                      <p>Lösungen</p>
                      <p v-if="getSubmissionCount('Lösungen', sheet.number) <= 0" class="text-xs text-lightMode-textDark dark:text-darkMode-textDark">Keine Abgabe</p>
                      <p v-else class="text-xs text-textHighlight">Anzahl: {{getSubmissionCount('Lösungen', sheet.number)}}</p>
                    </div>
                    <img
                      src="../assets/img/magnifying-glass.svg"
                      alt="settings"
                      :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
                      class="w-4 icon"
                      @click="openPopUp('Lösungen', sheet.number)"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <div>                 
                      <p class="text-xs py-0.5 px-1 rounded w-3/4 text-lightMode-textDark dark:text-darkMode-textDark">{{sheet.dueDate}}</p>     
                      <p v-if="sheet.done" class="text-textHighlight">
                        Erledigt
                      </p>
                      <p v-else class="text-alert">
                        Offen
                      </p>            
                    </div>
                    <Button
                        @click="toogleDone(sheet.number)"
                        icon="Ticked"
                        v-if="sheet.done"
                      />
                      <Button
                        @click="toogleDone(sheet.number)"
                        icon="Unticked"
                        v-else
                      />
                    </div>                
              </li>
          </ul>
        </div>
      </div>

      <div v-if="openTab === 'Termine'"></div>
    </div>
    <Notifications />
  </div>
</template>

<script lang="ts">
import { subjectStore } from "@/store/subjectStore";
import Subject from "@/store/interfaces/Subject";
import { PropType, ref, watchEffect } from "vue";
import Button from "@/components/Button.vue";
import { userStore } from "@/store/userStore";
import PopUps from "@/store/interfaces/PopUps";
import SubmissionType from '@/store/interfaces/submissions/SubmissionType';
import { notificationStore } from '@/store/notificationStore';
import Notifications from "@/views/Notifications.vue"

export default {
  components: {
    Button,
    Notifications
  },
  props: {
    subject: {
      require: true,
      type: Object as PropType<Subject | undefined>,
    },
  },
  setup() {
    const openTab = ref<String>("Übungsblätter");
    const darkMode = ref<Boolean>(userStore.darkMode());

    watchEffect(() => {
      darkMode.value = userStore.darkMode();
    })

    function openPopUp(
      popUp: PopUps,
      sheetNumber: Number = 0
    ) {
      userStore.setSelectedSheetNumber(sheetNumber);
      userStore.setOpenPopUp(popUp);
    }

    function toogleDone(sheetNumber: Number): void {
      subjectStore.toogleDone(sheetNumber);
    }

    function getSubmissionCount(submissionType : SubmissionType, sheetNumber: number) : number {
      let count : number = 0;
      subjectStore.getState().submissions.forEach(submission => {
        if(submission.type === submissionType && submission.subjectID === subjectStore.getSelectedSubjectID() && submission.exerciseSheetNumber === sheetNumber){
          count++;
        }
      });
      return count;
    }

    return {
      openTab,
      darkMode,
      openPopUp,
      toogleDone,
      getSubmissionCount
    };
  },
};
</script>

<style scoped>
.subject-container {
  border-top-left-radius: 15px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr;
  grid-template-areas: "header" "main";
}

.header {
  grid-template: header;
}

.main {
  grid-template: main;
}
</style>
