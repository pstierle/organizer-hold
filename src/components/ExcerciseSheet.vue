<template>
  <div class="flex items-start gap-2">
    <div
      v-for="(submission, index) in submissions.filter(
        (s) =>
          s.exerciseSheetNumber === sheet?.number &&
          s.subjectID === sheet.subjectID
      )"
      :key="index"
      class="bg-gray-300 dark:bg-zinc-800 p-2 rounded mt-1"
    >
      <p class="text-sm border-b">{{ submission.type }}</p>
      <div class="flex gap-1 items-center pt-1">
        <button class="flex gap-1 items-center" @click="openFile(submission)">
          <span>{{ submission.fileName }}.{{ submission.format }}</span>
          <span>{{ submission.size }} {{ submission.type }}</span>
        </button>
        <div>
          <Icon
            icon="TrashIcon"
            class="w-5 text-red-500"
            @click="deleteSubmission(submission)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IExcerciseSheet from "@/store/interfaces/IExcerciseSheet";
import ISubmissionType from "@/store/interfaces/submissions/ISubmissionType";
import { useSubjects } from "@/store/useSubjects";
import { computed, ref } from "vue";
import Button from "@/components/Button.vue";
import ISubmission from "@/store/interfaces/submissions/ISubmission";
import Icon from "@/components/Icon.vue";

defineProps<{
  sheet?: IExcerciseSheet;
}>();

const { submissions, selectedSubject, addSubmission, deleteSubmission } =
  useSubjects();

const submissionTypes = ref<ISubmissionType[]>([
  "Korrektur",
  "Abgabe",
  "Lösungen",
]);

const options = {
  title: "Datei hinzufügen",
  properties: ["openFile"],
  buttonLabel: "Ablegen",
};

async function add(submissionType: ISubmissionType) {
  const filePath: string = await window.dialog.getSelectedFilePath(options);

  if (filePath === "") {
    return;
  }

  const fileName: string =
    filePath
      .replace(/^.*[\\\/]/, "")
      .split(".")
      .shift() || "";

  let fileType: string = filePath.split(".").pop() || "";

  const destinationPath = window.path.join(
    selectedSubject.value?.folderPath,
    submissionType,
    `${fileName}.${fileType}`
  );

  addSubmission(
    submissionType,
    destinationPath,
    fileName,
    fileType,
    window.fs.getFileSize(filePath)
  );

  window.fs.copyFile(filePath, destinationPath);
}

function openFile(submission: ISubmission): void {
  window.shell.openPath(submission.path);
}
</script>
