export default interface Notification extends Object {
  text: string;
  type?: "alert" | "info" | "warning";
}
