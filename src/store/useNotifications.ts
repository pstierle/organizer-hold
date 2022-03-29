import { ref } from "vue";
import INotification from "./interfaces/INotification";

const notifications = ref<INotification[]>([]);

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
