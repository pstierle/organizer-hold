import { ref } from "vue";
import PopUps from "./interfaces/PopUps";

const darkMode = ref<boolean>(false);
const studentID = ref<number>(0);
const selectedSheetNumber = ref<number>(0);
const username = ref<string>("");
const openPopUp = ref<PopUps | null>(null);

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
    openPopUp,
    selectedSheetNumber,
  };
}
