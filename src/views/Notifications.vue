<template>
  <ul class="absolute z-50">
    <li
      class="bg-alert px-2 py-1 mt-2 rounded"
      v-for="(notification, index) in notifications"
      :key="index"
      :class="
        notification.type === 'alert'
          ? 'bg-red-500'
          : notification.type === 'warning'
          ? 'bg-yellow-500'
          : notification.type === 'info'
          ? 'bg-blue-500'
          : 'bg-gray-300 dark:bg-zinc-700'
      "
    >
      <p class="text-sm">{{ notification.text }}</p>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useNotifications } from "@/store/useNotifications";

const { notifications } = useNotifications();
</script>

<style scoped>
.container {
  z-index: -1;
}
</style>
