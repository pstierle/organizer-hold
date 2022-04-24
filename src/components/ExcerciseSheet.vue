<template>
  <div
    class="flex items-center p-2 border-t border-gray-300 dark:border-zinc-800 bg-gray-300 dark:bg-zinc-800 rounded justify-evenly"
  >
    <div v-for="(submissionType, index) in submissionTypes" :key="index">
      <div class="flex gap-1 items-center">
        <p>
          {{ submissionType }}
          {{
            submissions.filter(
              (s) =>
                s.exerciseSheetNumber === sheet?.number &&
                s.subjectID === sheet.subjectID &&
                s.type === submissionType
            ).length
          }}
        </p>
        <Button
          text="Datei Hinzufügen"
          icon="plus"
          @click="add(submissionType)"
        />
      </div>
      <div
        v-for="(submission, index) in submissions.filter(
          (s) =>
            s.exerciseSheetNumber === sheet?.number &&
            s.subjectID === sheet.subjectID &&
            s.type === submissionType
        )"
        class=""
      >
        <div class="flex gap-1 items-center">
          <span>{{ submission.fileName }}</span>
          <span>.{{ submission.format }}</span>
          <span>{{ submission.size }}</span>
        </div>

        <Button text="Öffnen" @click="openFile(submission)" />
        <Button
          type="alert"
          icon="TrashIcon"
          text="Löschen"
          @click="deleteSubmission(submission)"
        ></Button>
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
