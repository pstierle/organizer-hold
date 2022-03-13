<template>
  <div
    class="
      container
      rounded
      outline-none
      px-2
      py-2
      text-xs
      flex
      items-center
      justify-between
    "
    :class="{
      'bg-red-400': type === 'alert',
      'bg-green-500': type === 'success',
      'bg-gray-300 dark:bg-gray-800': !type,
    }"
  >
    <Icon :icon="icon" class="w-4 pr-1" v-if="icon" />
    <p class="text-center select-none w-full" v-if="text">{{ text }}</p>
  </div>
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
