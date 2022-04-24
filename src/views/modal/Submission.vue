<template>

</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import ISubmission from "@/store/interfaces/submissions/ISubmission";
import ISubmissionType from "@/store/interfaces/submissions/ISubmissionType";
import { useSettings } from "@/store/useSettings";
import { useNotifications } from "@/store/useNotifications";
import { useSubjects } from "@/store/useSubjects";

const { submissions, selectedSubject, addSubmission, deleteSubmission } =
  useSubjects();

const props = defineProps<{
  submissionType: ISubmissionType;
}>();

const selectedSubmissions = ref<Array<ISubmission>>([]);
const subjectSubmissions = ref<Array<ISubmission>>([]);
const onlyContainsImages = ref<boolean>(true);
const { selectedSheetNumber } = useSettings();

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




</script>

<style scoped></style>
