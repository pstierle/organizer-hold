<template>
  <button
    class="rounded px-2 py-2 text-xs flex items-center justify-evenly gap-1 transition"
    :class="
      type === 'alert'
        ? 'bg-red-400 hover:bg-red-500'
        : type === 'success'
        ? 'bg-green-500 hover:bg-green-600'
        : 'bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-900'
    "
  >
    <Icon :icon="icon" class="w-4" v-if="icon" />
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script lang="ts" setup>
import Icon from "@/components/Icon.vue";

defineProps<{
  type?: string;
  text?: string;
  icon?: string;
}>();
</script>
