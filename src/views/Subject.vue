<template>
  <div
    class="subject-container p-3 bg-lightMode-primary dark:bg-darkMode-primary"
    v-if="subject != null"
  >
    <div class="header flex items-center justify-between text-center w-full">
      <p
        class="
          bg-lightMode-light
          dark:bg-darkMode-light
          p-2
          rounded
          mt-2
          w-7/12
        "
      >
        {{ subject.name }}
      </p>
      <div class="lg:flex-row flex-col flex justify-evenly w-4/12 items-center">
        <Button
          class="lg:w-5/12 w-5/6"
          text="Bearbeiten"
          @click="openPopUp('Bearbeiten')"
          icon="edit"
        ></Button>
        <Button
          class="lg:w-5/12 w-5/6"
          type="alert"
          icon="bin"
          text="Löschen"
          @click="openPopUp('Löschen')"
        ></Button>
      </div>
    </div>
    <p class="mt-3" v-if="subject.professor != ''">
      Proffessor: {{ subject.professor }}
    </p>
    <div class="mt-1 main pt-3 pb-3">
      <p
        class="
          p-2
          border-b-2 border-lightMode-accent
          dark:border-darkMode-accent
        "
      >
        Übungsblätter
      </p>
      <div>
        <div>
          <Button
            text="Hinzufügen"
            icon="plus"
            class="w-24 mt-4"
            @click="openPopUp('Übungsblatt hinzufügen')"
          />
          <ul
            class="
              overflow-y-auto
              scrollbar-thin
              scrollbar-thumb-darkMode-light
              scrollbar-thumb-rounded
              scrollbar-track-rounded
            "
          >
            <li
              v-for="(sheet, index) in subject.exerciseSheets"
              :key="index"
              class="
                border-b-2 border-lightMode-light
                dark:border-darkMode-light
                flex
                items-center
                justify-evenly
                mt-2
                pb-2
              "
            >
              <p>Nr.{{ sheet.number }}</p>
              <div class="flex items-center justify-evenly w-32">
                <div>
                  <p>Abgabe</p>
                  <p
                    v-if="getSubmissionCount('Abgabe', sheet.number) <= 0"
                    class="
                      text-xs text-lightMode-textDark
                      dark:text-darkMode-textDark
                    "
                  >
                    Keine Abgabe
                  </p>
                  <p v-else class="text-xs text-textHighlight">
                    Anzahl: {{ getSubmissionCount("Abgabe", sheet.number) }}
                  </p>
                </div>
                <Icon
                  icon="magnifying-glass"
                  class="w-4"
                  @click="openPopUp('Abgabe', sheet.number)"
                />
              </div>
              <div class="flex items-center justify-evenly w-32">
                <div>
                  <p>Korrektur</p>
                  <p
                    v-if="getSubmissionCount('Korrektur', sheet.number) <= 0"
                    class="
                      text-xs text-lightMode-textDark
                      dark:text-darkMode-textDark
                    "
                  >
                    Keine Abgabe
                  </p>
                  <p v-else class="text-xs text-textHighlight">
                    Anzahl: {{ getSubmissionCount("Korrektur", sheet.number) }}
                  </p>
                </div>
                <Icon
                  icon="magnifying-glass"
                  class="w-4"
                  @click="openPopUp('Korrektur', sheet.number)"
                />
              </div>
              <div class="flex items-center justify-evenly w-32">
                <div>
                  <p>Lösungen</p>
                  <p
                    v-if="getSubmissionCount('Lösungen', sheet.number) <= 0"
                    class="
                      text-xs text-lightMode-textDark
                      dark:text-darkMode-textDark
                    "
                  >
                    Keine Abgabe
                  </p>
                  <p v-else class="text-xs text-textHighlight">
                    Anzahl: {{ getSubmissionCount("Lösungen", sheet.number) }}
                  </p>
                </div>
                <Icon
                  icon="magnifying-glass"
                  class="w-4"
                  @click="openPopUp('Lösungen', sheet.number)"
                />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="
                      text-xs
                      py-0.5
                      px-1
                      rounded
                      w-3/4
                      text-lightMode-textDark
                      dark:text-darkMode-textDark
                    "
                  >
                    {{ sheet.dueDate }}
                  </p>
                  <p v-if="sheet.done" class="text-textHighlight">Erledigt</p>
                  <p v-else class="text-alert">Offen</p>
                </div>
                <Button
                  @click="toogleDone(sheet.number)"
                  icon="ticked"
                  v-if="sheet.done"
                />
                <Button
                  @click="toogleDone(sheet.number)"
                  icon="unticked"
                  v-else
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { subjectStore } from "@/store/subjectStore";
import { ref, watchEffect } from "vue";
import Button from "@/components/Button.vue";
import { userStore } from "@/store/userStore";
import PopUps from "@/store/interfaces/PopUps";
import SubmissionType from "@/store/interfaces/submissions/SubmissionType";
import Subject from "@/store/interfaces/Subject";
import Icon from "@/components/Icon.vue";

export default {
  components: {
    Button,
    Icon,
  },
  props: {},
  setup() {
    const subject = ref<Subject>();

    watchEffect(() => {
      subject.value = subjectStore.getSelectedSubject();
    });

    function openPopUp(popUp: PopUps, sheetNumber: Number = 0) {
      userStore.setSelectedSheetNumber(sheetNumber);
      userStore.setOpenPopUp(popUp);
    }

    function toogleDone(sheetNumber: Number): void {
      subjectStore.toogleDone(sheetNumber);
    }

    function getSubmissionCount(
      submissionType: SubmissionType,
      sheetNumber: number
    ): number {
      let count: number = 0;
      subjectStore.getState().submissions.forEach((submission) => {
        if (
          submission.type === submissionType &&
          submission.subjectID === subjectStore.getSelectedSubjectID() &&
          submission.exerciseSheetNumber === sheetNumber
        ) {
          count++;
        }
      });
      return count;
    }

    return {
      subject,
      openPopUp,
      toogleDone,
      getSubmissionCount,
    };
  },
};
</script>

<style scoped>
.subject-container {
  min-width: 450px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
