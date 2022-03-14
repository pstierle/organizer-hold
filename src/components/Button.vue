<template>
  <button
    class="container rounded outline-none px-2 py-2 text-xs flex items-center justify-evenly gap-1"
    :class="
      type === 'alert'
        ? 'bg-red-400'
        : type === 'success'
        ? 'bg-green-500'
        : 'bg-gray-300 dark:bg-gray-800'
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

<style scoped>
.container:hover {
  cursor: pointer;
}

div:hover {
  transform: scale(1.05);
  transition-duration: 200ms;
}
</style>
