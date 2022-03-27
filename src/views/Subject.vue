<template>
  <div class="p-2 w-full" v-if="selectedSubject">
    <div class="flex items-center justify-between">
      <p class="bg-gray-300 dark:bg-zinc-800 py-1 px-2 rounded">
        {{ selectedSubject?.name }}
      </p>
      <div class="flex items-center gap-2">
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
    </div>
    <div class="mt-2 w-full flex justify-between">
      <p v-if="selectedSubject?.professor != ''">
        Proffessor: {{ selectedSubject?.professor }}
      </p>
      <Button
        text="Blatt Hinzufügen"
        icon="PlusCircleIcon"
        @click="openModal = 'Übungsblatt hinzufügen'"
      />
    </div>
    <SheetOverview
      :tabs="selectedSubject?.exerciseSheets"
      @select="
        (number) => {
          selectedSheetNumber = number;
        }
      "
    />
    <ExcerciseSheet
      :sheet="
        selectedSubject.exerciseSheets.find(
          (e) => e.number === selectedSheetNumber
        )
      "
    />

    <!--
    <div
      class="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded scrollbar-track-rounded"
    >
      <div
        v-for="(sheet, index) in selectedSubject?.exerciseSheets"
        :key="index"
        class="flex items-center justify-evenly py-2 rounded bg-gray-300 dark:bg-zinc-800 my-2"
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
    </div> -->
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
import SheetOverview from "@/components/SheetOverview.vue";
import ExcerciseSheet from "@/components/ExcerciseSheet.vue";

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
