<template>
  <div
    class="container bg-gray-200 dark:bg-gray-700 border-r-2 border-gray-300 dark:border-gray-800 px-1"
  >
    <div
      class="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded scrollbar-track-rounded"
    >
      <button
        v-for="(subject, index) in subjects"
        :key="index"
        @click="selectedSubject = subject"
        class="px-2 py-1 truncate mt-2 w-full bg-gray-300 dark:bg-gray-800 rounded"
      >
        {{ subject.name }}
      </button>
    </div>
    <div class="flex gap-2 p-2 settings-container">
      <Icon icon="CogIcon" class="w-6" @click="openModal = 'Einstellungen'" />
      <Icon
        icon="PlusCircleIcon"
        class="w-6"
        @click="openModal = 'Fach hinzufügen'"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "@/components/Icon.vue";
import { useSettings } from "@/store/useSettings";
import { useSubjects } from "@/store/useSubjects";

const { selectedSubject, subjects } = useSubjects();

const { openModal } = useSettings();
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px;
  gap: 0px 0px;
  grid-template-areas: "list" "settings-container";
}

.list {
  grid-area: "list";
  min-height: 300px;
}

.settings-container {
  grid-area: "settings-container";
}
</style>
