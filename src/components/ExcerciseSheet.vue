<template>
  <div
    class="flex items-center p-2 border-t border-gray-300 dark:border-zinc-800 bg-gray-300 dark:bg-zinc-800 rounded justify-evenly"
  >
    <div v-for="(submissionType, index) in submissionTypes" :key="index">
      {{ submissionType }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import IExcerciseSheet from "@/store/interfaces/IExcerciseSheet";
import IModal from "@/store/interfaces/IModal";
import ISubmissionType from "@/store/interfaces/submissions/ISubmissionType";
import { ref } from "vue";

defineProps<{
  sheet?: IExcerciseSheet;
}>();

const submissionTypes = ref<ISubmissionType[]>([
  "Korrektur",
  "Abgabe",
  "Lösungen",
]);
</script>
