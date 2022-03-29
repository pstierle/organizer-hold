<template>
  <div class="flex justify-center">
    <ManageSubject
      @submit="addSubject"
      :subjectModel="template"
      header="Hinzufügen"
    />
  </div>
</template>

<script lang="ts" setup>
import ManageSubject from "@/components/ManageSubject.vue";
import ISubject from "@/store/interfaces/ISubject";
import { useSubjects } from "@/store/useSubjects";

const template: ISubject = {
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
