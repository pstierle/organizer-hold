import { ref } from "vue";
import Notification from "./interfaces/Notification";

const notifications = ref<Notification[]>([]);

export const useNotifications = () => {
  const sendNotification = (text: string, reason?: string) => {
    notifications.value.push({ text: text, reason });
    setTimeout(() => {
      notifications.value.shift();
    }, 3000);
  };

  return {
    notifications,
    sendNotification,
  };
};
