<template>
  <div class="flex justify-center">
    <ManageSubject
      @submit="updateSelectedSubject"
      v-if="selectedSubject"
      :subjectModel="selectedSubject"
      header="Bestätigen"
    />
  </div>
</template>

<script lang="ts" setup>
import ManageSubject from "@/components/ManageSubject.vue";
import { useSubjects } from "@/store/useSubjects";

const { updateSelectedSubject, selectedSubject } = useSubjects();
</script>
