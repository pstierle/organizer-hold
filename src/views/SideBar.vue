<template>
  <div
    class="bg-gray-400 dark:bg-zinc-900 flex flex-col items-center transition-all p-4 gap-2 justify-between"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    :class="hovered ? 'w-52' : ' w-20'"
  >
    <div class="flex flex-col gap-2 w-full justify-center">
      <p class="text-xs text-center">Fächer</p>
      <button
        v-for="(subject, index) in subjects"
        :key="index"
        @click="selectedSubject = subject"
        class="truncate rounded hover:bg-gray-300 dark:hover:bg-zinc-700 text-xs py-1 px-2"
      >
        {{ subject.name }}
      </button>
    </div>

    <div>
      <SidebarTile :hovered="hovered" @click="openModal = 'Fach hinzufügen'">
        <template #no-hover>
          <Icon icon="PlusCircleIcon" class="w-7"
        /></template>
        <template #hover>Hinzufügen</template>
      </SidebarTile>

      <SidebarTile :hovered="hovered">
        <template #no-hover>
          <Icon icon="UserCircleIcon" class="w-7"
        /></template>
        <template #hover>Account</template>
      </SidebarTile>

      <SidebarTile :hovered="hovered" @click="openModal = 'Einstellungen'">
        <template #no-hover> <Icon icon="CogIcon" class="w-7" /></template>
        <template #hover>Einstellungen</template>
      </SidebarTile>
    </div>
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
