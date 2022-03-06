<template>
  <ul class="absolute z-50">
    <li
      class="bg-alert px-2 py-1 mt-2 rounded"
      v-for="(notification, index) in notifications"
      :key="index"
    >
      <p>{{ notification.text }}</p>
      <p>{{ notification?.reason }}</p>
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
