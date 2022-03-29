import { ref } from "vue";
import IModal from "./interfaces/IModal";
import { usePath } from "./usePath";

const darkMode = ref<boolean>(false);
const studentID = ref<number>(0);
const selectedSheetNumber = ref<number>(0);
const username = ref<string>("");
const openModal = ref<IModal | null>(null);
const { settingsPath } = usePath();

export function useSettings() {
  const toogleDarkMode = () => {
    darkMode.value = !darkMode.value;
  };

  const loadSettings = () => {
    const settingsData = window.fs.readFileSync(settingsPath);
    darkMode.value = JSON.parse(settingsData).darkMode;
    studentID.value = JSON.parse(settingsData).studentID;
  };

  return {
    toogleDarkMode,
    loadSettings,
    darkMode,
    studentID,
    username,
    openModal,
    selectedSheetNumber,
  };
}
