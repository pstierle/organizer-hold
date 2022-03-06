import { Store } from "./interfaces/Store";
import Notification from "./interfaces/Notification";

export default interface NotificationStore extends Object {
  notifications: Notification[];
}

class NotificationState extends Store<NotificationStore> {
  protected data(): NotificationStore {
    return {
      notifications: [],
    };
  }

  sendNotification(text: string, reason: string = ""): void {
    this.state.notifications.push({ text: text, reason: reason });
    setTimeout(() => {
      this.state.notifications.shift();
    }, 3000);
  }

  getNotifications(): Notification[] {
    return this.state.notifications;
  }
}

export const notificationStore: NotificationState = new NotificationState();
