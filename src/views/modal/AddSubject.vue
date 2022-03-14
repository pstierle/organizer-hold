<template>
  <div class="flex justify-center">
    <ManageSubject
      @submit="addSubject"
      :subjectModel="subjectTemplate"
      :clearInput="true"
      header="Hinzufügen"
    />
  </div>
</template>

<script lang="ts" setup>
import ManageSubject from "@/components/ManageSubject.vue";
import Subject from "@/store/interfaces/Subject";
import { useSubjects } from "@/store/useSubjects";

const subjectTemplate: Subject = {
  name: "",
  weekDay: "",
  start: "",
  end: "",
  location: "",
  professor: "",
  exerciseSheets: [],
  id: 0,
  folderPath: "",
  length: "",
};

const { addSubject } = useSubjects();
</script>

<style scoped></style>
