import { ref } from "vue";
import Notification from "./interfaces/Notification";

const notifications = ref<Notification[]>([]);

export function useNotifications() {
  const sendNotification = (
    text: string,
    type?: "info" | "warning" | "alert"
  ) => {
    notifications.value.push({ text, type });
    setTimeout(() => {
      notifications.value.shift();
    }, 3000);
  };

  return {
    notifications,
    sendNotification,
  };
}
