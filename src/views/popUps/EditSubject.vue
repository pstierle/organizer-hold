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
import { subjectStore } from "@/store/subjectStore";
import ManageSubject from "@/components/ManageSubject.vue";
function updateSubject(
  name: string,
  weekDay: string,
  start: string,
  end: string,
  location: string,
  professor: string
) {
  subjectStore.updateSelectedSubject(
    name,
    weekDay,
    start,
    end,
    location,
    professor
  );
}
</script>

<style scoped></style>
