<template>
  <component
    :is="(heroIcons as any)[icon]"
    class="cursor-pointer fill-current"
  />
</template>

<script setup lang="ts">
import * as heroIcons from "@heroicons/vue/solid";
defineProps<{
  icon: string;
}>();
</script>
