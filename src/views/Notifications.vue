<template>
    <ul class="absolute z-50">
      <li class="bg-alert px-2 py-1 mt-2 rounded" v-for="(notification, index) in notifications" :key="index">
            <p>{{notification.text}}</p>
            <p>{{notification.reason}}</p>
      </li>
    </ul>
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue';
import Notification from "@/store/interfaces/Notification"
import { notificationStore } from "@/store/notificationStore"

export default {
  setup() {

    const notifications = ref<Notification[]>([]);

    watchEffect(() => {
      notifications.value = notificationStore.getNotifications();
    })

    return {
      notifications
    };
  },
};
</script>

<style scoped>
.container{
  z-index: -1;
}
</style>
