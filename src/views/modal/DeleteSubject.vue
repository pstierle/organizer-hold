<template>
  <div class="text-center items-center justify-center flex gap-2">
    <p v-if="selectedSubject" class="w-2/3">
      Das Fach
      <span class="border-b-2 border-gray-300 dark:zinc-gray-800">{{
        selectedSubject?.name
      }}</span>
      dauerhaft löschen?
    </p>
    <Button
      @click="deleteSelectedSubject"
      class="w-1/5"
      text="LÖSCHEN"
      icon="TrashIcon"
      type="alert"
    />
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import { useSubjects } from "@/store/useSubjects";

const { selectedSubject, deleteSelectedSubject } = useSubjects();
</script>

<style scoped></style>
