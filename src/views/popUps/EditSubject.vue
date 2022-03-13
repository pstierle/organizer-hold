<template>
  <div class="flex justify-center">
    <ManageSubject
      @submit="updateSelectedSubject"
      v-if="selectedSubject"
      :subjectModel="selectedSubject"
      :clearInput="false"
      header="Bestätigen"
    />
  </div>
</template>

<script lang="ts" setup>
import ManageSubject from "@/components/ManageSubject.vue";
import { useSubjects } from "@/store/useSubjects";

const { updateSelectedSubject, selectedSubject } = useSubjects();
</script>

<style scoped></style>
