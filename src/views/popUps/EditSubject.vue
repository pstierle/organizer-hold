<template>
  <div class="flex justify-center">
    <ManageSubject
      @submit="updateSubject"
      :clearInput="false"
      header="Bestätigen"
    />
  </div>
</template>

<script lang="ts" setup>
import ManageSubject from "@/components/ManageSubject.vue";
import { useSubjects } from "@/store/useSubjects";

const { updateSelectedSubject } = useSubjects();

function updateSubject(
  name: string,
  weekDay: string,
  start: string,
  end: string,
  location: string,
  professor: string
) {
  updateSelectedSubject(name, weekDay, start, end, location, professor);
}
</script>

<style scoped></style>
