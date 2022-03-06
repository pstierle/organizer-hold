<template>
  <div class="flex justify-center">
    <ManageSubject
      @submit="addSubject"
      :clearInput="true"
      header="Hinzufügen"
    />
  </div>
</template>

<script lang="ts" setup>
import { subjectStore } from "@/store/subjectStore";
import Subject from "@/store/interfaces/Subject";
import ManageSubject from "@/components/ManageSubject.vue";
function addSubject(
  name: string,
  weekDay: string,
  start: string,
  end: string,
  location: string,
  professor: string
) {
  const newSubject: Subject = {
    id: subjectStore.getSubjects().length + 1,
    name: name,
    shortName: name[0],
    exerciseSheets: [],
    folderPath: subjectStore.getSubjectPath(name),
    weekDay: weekDay,
    start: start,
    end: end,
    length: String(parseFloat(end) - parseFloat(start)),
    location: location,
    professor: professor,
  };

  subjectStore.addSubject(newSubject);
}
</script>

<style scoped></style>
