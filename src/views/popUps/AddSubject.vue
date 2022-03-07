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
import ManageSubject from "@/components/ManageSubject.vue";
import { useSubjects } from "@/store/useSubjects";

const { addSubject } = useSubjects();
</script>

<style scoped></style>
