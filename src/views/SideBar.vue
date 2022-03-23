<template>
  <div
    class="bg-gray-500 dark:bg-gray-900 flex flex-col items-center transition-all p-4 gap-2 justify-between"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    :class="hovered ? 'w-52' : ' w-24'"
  >
    <div class="flex flex-col gap-2 w-full justify-center">
      <p class="text-xs text-center">Fächer</p>
      <button
        v-for="(subject, index) in subjects"
        :key="index"
        @click="selectedSubject = subject"
        class="truncate rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-xs py-1 px-2"
      >
        {{ subject.name }}
      </button>
    </div>

    <div>
      <SidebarTile :hovered="hovered" @click="openModal = 'Fach hinzufügen'">
        <template #no-hover>
          <Icon icon="PlusCircleIcon" class="w-8"
        /></template>
        <template #hover>Hinzufügen</template>
      </SidebarTile>

      <SidebarTile :hovered="hovered">
        <template #no-hover>
          <Icon icon="UserCircleIcon" class="w-8"
        /></template>
        <template #hover>Account</template>
      </SidebarTile>

      <SidebarTile :hovered="hovered" @click="openModal = 'Einstellungen'">
        <template #no-hover> <Icon icon="CogIcon" class="w-8" /></template>
        <template #hover>Einstellungen</template>
      </SidebarTile>
    </div>

    <!-- <div
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
      <Icon
        icon=""
        class="w-6"
      />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import Icon from "@/components/Icon.vue";
import { useSettings } from "@/store/useSettings";
import { useSubjects } from "@/store/useSubjects";
import { ref } from "vue";
import SidebarTile from "@/components/SidebarTile.vue";

const { selectedSubject, subjects } = useSubjects();
const { openModal } = useSettings();

const hovered = ref(false);
</script>
