import { computed, ref } from "vue";
import { helperFunction } from "./helperFunction";
import WeekDays from "./interfaces/WeekDays";
import { useSubjects } from "@/store/useSubjects";

const { subjects } = useSubjects();

const selectedDay = ref<string>("");

const currentDay = computed(() => {
  return WeekDays[new Date().getDay()];
});

const subjectsToday = computed(() => {
  return subjects.value.filter(
    (subject) => subject.weekDay == selectedDay.value
  );
});

const nextSubjectToday = computed(() => {
  return subjects.value
    .filter(
      (subject) => subject.weekDay == helperFunction.formatDate(new Date())
    )
    .sort((a, b) => Number(a.start) - Number(b.start))[0];
});

const exerciseSheetsToday = computed(() => {
  return subjects.value
    .flatMap((s) => s.exerciseSheets)
    .filter((e) => e.dueDate === new Date());
});

export function useCalender() {
  const importCalender = async (filePath: string) => {
    const data = await window.fs.readFileSync(filePath);

    var parser = new DOMParser();
    var doc = parser.parseFromString(data, "text/xml");

    doc.firstChild?.childNodes.forEach((node) => {
      if (node.childNodes.length > 0) {
        let weekDay = node.childNodes[1].textContent || "";
        const start = node.childNodes[5].textContent || "";
        const end = node.childNodes[7].textContent || "";
        const length = node.childNodes[9].textContent || "";
        const name = node.childNodes[13].textContent || "";
        const location = node.childNodes[19].textContent || "";
        const professor = node.childNodes[25].textContent || "";

        weekDay = helperFunction.formatWeekDay(weekDay);

        //addSubject(name, weekDay, start, end, location, professor);
      }
    });
  };

  const getDayIndex = (day: string) => {
    return WeekDays.indexOf(day);
  };

  return {
    importCalender,
    currentDay,
    exerciseSheetsToday,
    subjectsToday,
    nextSubjectToday,
    getDayIndex,
    selectedDay,
  };
}
