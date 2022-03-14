<template>
  <div
    class="subject-container p-3 bg-gray-200 dark:bg-gray-700"
    v-if="selectedSubject"
  >
    <div class="header flex items-center justify-between text-center w-full">
      <p class="bg-gray-300 dark:bg-gray-800 p-2 rounded mt-2 w-7/12">
        {{ selectedSubject?.name }}
      </p>
      <div class="lg:flex-row flex-col flex justify-evenly w-4/12 items-center">
        <Button
          class="lg:w-5/12 w-5/6"
          text="Bearbeiten"
          @click="openModal = 'Bearbeiten'"
          icon="PencilAltIcon"
        ></Button>
        <Button
          class="lg:w-5/12 w-5/6"
          type="alert"
          icon="TrashIcon"
          text="Löschen"
          @click="openModal = 'Löschen'"
        ></Button>
      </div>
    </div>
    <p class="mt-3" v-if="selectedSubject?.professor != ''">
      Proffessor: {{ selectedSubject?.professor }}
    </p>
    <div class="mt-1 main pt-3 pb-3">
      <p class="p-2 border-b-2 border-gray-300 dark:border-gray-800">
        Übungsblätter
      </p>
      <div>
        <div>
          <Button
            text="Hinzufügen"
            icon="PlusCircleIcon"
            @click="openModal = 'Übungsblatt hinzufügen'"
          />
          <ul
            class="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded scrollbar-track-rounded"
          >
            <li
              v-for="(sheet, index) in selectedSubject?.exerciseSheets"
              :key="index"
              class="border-b-2 border-gray-300 dark:border-gray-800 flex items-center justify-evenly mt-2 pb-2"
            >
              <p>Nr.{{ sheet.number }}</p>
              <div
                class="flex items-center justify-evenly w-32"
                v-for="(data, index) in sheetData"
                :key="index"
              >
                <div>
                  <p>{{ data.type }}</p>
                  <p
                    v-if="
                      getSubmissionCount(
                        data.type as SubmissionType,
                        sheet.number
                      ) <= 0
                    "
                    class="text-xs text-gray-800 dark:text-gray-200"
                  >
                    Keine Abgabe
                  </p>
                  <p v-else class="text-xs text-textHighlight">
                    Anzahl:
                    {{
                      getSubmissionCount(
                        data.type as SubmissionType,
                        sheet.number
                      )
                    }}
                  </p>
                </div>
                <Icon
                  icon="SearchIcon"
                  class="w-4"
                  @click="
                    () => {
                      openModal = data.type;
                      selectedSheetNumber = sheet.number;
                    }
                  "
                />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="text-xs py-0.5 px-1 rounded w-3/4 text-gray-800 dark:text-gray-200"
                  >
                    {{ sheet.dueDate }}
                  </p>
                  <p v-if="sheet.done" class="text-textHighlight">Erledigt</p>
                  <p v-else class="text-alert">Offen</p>
                </div>
                <Button
                  @click="toogleDone(sheet.number)"
                  icon="CheckCircleIcon"
                  v-if="sheet.done"
                />
                <Button
                  @click="toogleDone(sheet.number)"
                  icon="XCircleIcon"
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

<script lang="ts" setup>
import { ref } from "vue";
import Button from "@/components/Button.vue";
import Icon from "@/components/Icon.vue";
import { useSettings } from "@/store/useSettings";
import Modal from "@/store/interfaces/Modal";
import SubmissionType from "@/store/interfaces/submissions/SubmissionType";
import { useSubjects } from "@/store/useSubjects";

const { selectedSubject, toogleDone, submissions } = useSubjects();

const { openModal, selectedSheetNumber } = useSettings();

const sheetData = ref<{ type: Modal }[]>([
  {
    type: "Korrektur",
  },
  {
    type: "Lösungen",
  },
  {
    type: "Abgabe",
  },
]);

function getSubmissionCount(
  submissionType: SubmissionType,
  sheetNumber: number
): number {
  let count: number = 0;
  submissions.value.forEach((submission) => {
    if (
      submission.type === submissionType &&
      submission.subjectID === selectedSubject.value?.id &&
      submission.exerciseSheetNumber === sheetNumber
    ) {
      count++;
    }
  });
  return count;
}
</script>

<style scoped>
.subject-container {
  min-width: 450px;
}
</style>
