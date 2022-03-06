<template>
  <div class="text-center items-center justify-center flex">
    <p v-if="selectedSubject" class="w-2/3">
      Das Fach
      <span
        class="border-b-2 border-lightMode-accent dark:border-darkMode-accent"
        >{{ selectedSubject.name }}</span
      >
      dauerhaft löschen?
    </p>
    <Button
      @click="deleteSubject"
      class="w-1/5"
      text="LÖSCHEN"
      icon="bin"
      type="alert"
    />
  </div>
</template>

<script lang="ts" setup>
import { subjectStore } from "@/store/subjectStore";
import { onMounted, ref } from "vue";
import Button from "@/components/Button.vue";
const selectedSubject = ref();

onMounted(() => {
  selectedSubject.value = subjectStore.getSelectedSubject();
});

function deleteSubject() {
  subjectStore.deleteSelectedSubject();
}
</script>

<style scoped></style>
