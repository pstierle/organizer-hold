<template>
  <component
    :is="(heroIcons as any)[icon]"
    :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
    class="cursor-pointer"
  />
</template>

<script setup lang="ts">
import { useSettings } from "@/store/useSettings";
import * as heroIcons from "@heroicons/vue/solid";

const { darkMode } = useSettings();

defineProps<{
  icon: string;
}>();
</script>

<style scoped>
.dark-icon {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg)
    brightness(102%) contrast(102%);
}

.light-icon {
  filter: invert(0%) sepia(99%) saturate(34%) hue-rotate(56deg) brightness(89%)
    contrast(76%);
}
</style>
