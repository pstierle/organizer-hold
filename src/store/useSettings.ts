import { ref } from "vue";
import Modal from "./interfaces/Modal";

const darkMode = ref<boolean>(false);
const studentID = ref<number>(0);
const selectedSheetNumber = ref<number>(0);
const username = ref<string>("");
const openModal = ref<Modal | null>(null);

export function useSettings() {
  const toogleDarkMode = () => {
    darkMode.value = !darkMode.value;
    let appMode = document.querySelector("html")?.classList;
    if (darkMode.value) appMode?.add("dark");
    else appMode?.remove("dark");
  };

  return {
    toogleDarkMode,
    darkMode,
    studentID,
    username,
    openModal,
    selectedSheetNumber,
  };
}
