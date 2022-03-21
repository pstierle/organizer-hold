<template>
  <div>
    <Button text="Datei Hinzufügen" icon="plus" @click="add" />
    <div
      v-for="(submission, index) in subjectSubmissions"
      :key="index"
      class="border-b-2 flex p-2 my-2 gap-2 items-center justify-between border-gray-300 dark:border-gray-800"
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
import Submission from "@/store/interfaces/submissions/Submission";
import SubmissionType from "@/store/interfaces/submissions/SubmissionType";
import { useSettings } from "@/store/useSettings";
import { useNotifications } from "@/store/useNotifications";
import { useSubjects } from "@/store/useSubjects";

const { submissions, selectedSubject, addSubmission, deleteSubmission } =
  useSubjects();
const { sendNotification } = useNotifications();

const props = defineProps<{
  submissionType: SubmissionType;
}>();

const selectedSubmissions = ref<Array<Submission>>([]);
const subjectSubmissions = ref<Array<Submission>>([]);
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
  const filePath: string = await (window as any).dialog.getSelectedFilePath(
    options
  );

  if (filePath === "") {
    sendNotification("Keine Datei ausgewählt!");
    return;
  }

  const fileName: string =
    filePath
      .replace(/^.*[\\\/]/, "")
      .split(".")
      .shift() || "";

  let fileType: string = filePath.split(".").pop() || "";

  const destinationPath = (window as any).path.join(
    selectedSubject.value?.folderPath,
    props.submissionType,
    `${fileName}.${fileType}`
  );

  addSubmission(
    props.submissionType,
    destinationPath,
    fileName,
    fileType,
    (window as any).fs.getFileSize(filePath)
  );

  (window as any).fs.copyFile(filePath, destinationPath);
}

function openFile(submission: Submission): void {
  (window as any).shell.openPath(submission.path);
}

function selected(submission: Submission): boolean {
  let contains: boolean = false;

  selectedSubmissions.value.forEach((entry) => {
    if (entry.path === submission.path) {
      contains = true;
    }
  });

  return contains;
}

function addToSelected(submission: Submission): void {
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

async function concatToPdf() {
  const name = "test";
  const type = "pdf";

  let pathArray: any[] = [];

  const destinationPath = (window as any).path.join(
    selectedSubject.value?.folderPath,
    props.submissionType,
    `${name}.${type}`
  );

  selectedSubmissions.value.forEach((entry) => {
    pathArray.push(entry.path);
  });

  const result = await (window as any).pdf.create(pathArray, destinationPath);

  if (!result) {
    console.log("failed!");
  } else {
    addSubmission(
      props.submissionType,
      destinationPath,
      name,
      type,
      (window as any).fs.getFileSize(destinationPath)
    );
  }
}
</script>

<style scoped></style>
