<template>
  <div>
    <Button text="Datei Hinzufügen" icon="plus" @click="add" />
    <div
      v-for="(submission, index) in subjectSubmissions"
      :key="index"
      class="border-b-2 flex p-2 my-2 gap-2 items-center justify-between border-gray-300 dark:border-zinc-800"
    >
      <div class="flex gap-1 items-center">
        <span>{{ submission.fileName }}</span>
        <span>.{{ submission.format }}</span>
        <span>{{ submission.size }}</span>
      </div>
      <div class="flex gap-1">
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
import { onMounted, ref, watchEffect } from "vue";
import Button from "@/components/Button.vue";
import ISubmission from "@/store/interfaces/submissions/ISubmission";
import ISubmissionType from "@/store/interfaces/submissions/ISubmissionType";
import { useSettings } from "@/store/useSettings";
import { useNotifications } from "@/store/useNotifications";
import { useSubjects } from "@/store/useSubjects";

const { submissions, selectedSubject, addSubmission, deleteSubmission } =
  useSubjects();
const { sendNotification } = useNotifications();

const props = defineProps<{
  submissionType: ISubmissionType;
}>();

const selectedSubmissions = ref<Array<ISubmission>>([]);
const subjectSubmissions = ref<Array<ISubmission>>([]);
const onlyContainsImages = ref<boolean>(true);
const { selectedSheetNumber } = useSettings();

const options = {
  title: "Datei hinzufügen",
  properties: ["openFile"],
  buttonLabel: "Ablegen",
};

onMounted(() => {
  subjectSubmissions.value = submissions.value.filter(
    (submission) =>
      submission.type === props.submissionType &&
      submission.subjectID === selectedSubject.value?.id &&
      submission.exerciseSheetNumber === selectedSheetNumber.value
  );
});

watchEffect(() => {
  subjectSubmissions.value = submissions.value.filter(
    (submission) => submission.type === props.submissionType
  );
});

async function add() {
  const filePath: string = await window.dialog.getSelectedFilePath(options);

  if (filePath === "") {
    sendNotification("Keine Datei ausgewählt!", "alert");
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
    props.submissionType,
    `${fileName}.${fileType}`
  );

  addSubmission(
    props.submissionType,
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

function selected(submission: ISubmission): boolean {
  let contains: boolean = false;

  selectedSubmissions.value.forEach((entry) => {
    if (entry.path === submission.path) {
      contains = true;
    }
  });

  return contains;
}

function addToSelected(submission: ISubmission): void {
  let contains: boolean = false;
  let foundIndex: number = 0;

  selectedSubmissions.value.forEach((entry) => {
    if (entry.path === submission.path) {
      contains = true;
      foundIndex = selectedSubmissions.value.indexOf(entry);
    }
  });

  if (contains) {
    selectedSubmissions.value.splice(foundIndex, 1);
  } else {
    selectedSubmissions.value.push(submission);
  }

  onlyContainsImages.value = imageCheck();
}

function imageCheck(): boolean {
  const validFormats: string[] = ["png", "jpg", "jpeg"];

  for (let i = 0; i < selectedSubmissions.value.length; i++) {
    if (!validFormats.includes(String(selectedSubmissions.value[i].format))) {
      return false;
    }
  }

  return true;
}

// async function concatToPdf() {
//   const name = "test";
//   const type = "pdf";

//   let pathArray: any[] = [];

//   const destinationPath = window.path.join(
//     selectedSubject.value?.folderPath,
//     props.submissionType,
//     `${name}.${type}`
//   );

//   selectedSubmissions.value.forEach((entry) => {
//     pathArray.push(entry.path);
//   });

//   const result = await (window as any).pdf.create(pathArray, destinationPath);

//   if (!result) {
//     console.log("failed!");
//   } else {
//     addSubmission(
//       props.submissionType,
//       destinationPath,
//       name,
//       type,
//       (window as any).fs.getFileSize(destinationPath)
//     );
//   }
// }
</script>

<style scoped></style>
