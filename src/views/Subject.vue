<template>
  <div
    class="subject-container p-2 bg-gray-200 dark:bg-gray-700"
    v-if="selectedSubject"
  >
    <div class="flex items-center gap-2">
      <p class="bg-gray-300 dark:bg-gray-800 p-2 rounded">
        {{ selectedSubject?.name }}
      </p>
      <Button
        text="Bearbeiten"
        @click="openModal = 'Bearbeiten'"
        icon="PencilAltIcon"
      ></Button>
      <Button
        type="alert"
        icon="TrashIcon"
        text="Löschen"
        @click="openModal = 'Löschen'"
      ></Button>
    </div>
    <p class="mt-2" v-if="selectedSubject?.professor != ''">
      Proffessor: {{ selectedSubject?.professor }}
    </p>
    <div class="mt-2 flex items-center gap-2">
      <p>Übungsblätter</p>
      <Button
        text="Hinzufügen"
        icon="PlusCircleIcon"
        @click="openModal = 'Übungsblatt hinzufügen'"
      />
    </div>
    <div
      class="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded scrollbar-track-rounded"
    >
      <div
        v-for="(sheet, index) in selectedSubject?.exerciseSheets"
        :key="index"
        class="flex items-center justify-evenly py-2 rounded bg-gray-300 dark:bg-gray-800 my-2"
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
              class="text-xs text-gray-900 dark:text-gray-400"
            >
              Keine Abgabe
            </p>
            <p v-else class="text-xs text-blue-400">
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
              {{ helperFunction.formatDate(sheet.dueDate) }}
            </p>
            <p v-if="sheet.done" class="text-blue-400">Erledigt</p>
            <p v-else class="text-red-400">Offen</p>
          </div>
          <Button
            @click="toogleDone(sheet.number)"
            icon="CheckCircleIcon"
            v-if="sheet.done"
          />
          <Button @click="toogleDone(sheet.number)" icon="XCircleIcon" v-else />
          <Button @click="deleteExerciseSheet(sheet)" icon="TrashIcon" />
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
import { helperFunction } from "@/store/helperFunction";
const { selectedSubject, toogleDone, submissions, deleteExerciseSheet } =
  useSubjects();

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
