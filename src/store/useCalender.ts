import { computed, ref } from "vue";
import CalenderTypes from "./interfaces/CalenderTypes";
import { helperFunction } from "./helperFunction";
import { subjectStore } from "./subjectStore";
import Subject from "./interfaces/Subject";
import WeekDays from "./interfaces/WeekDays";
import ExcerciseSheet from "./interfaces/ExcerciseSheet";

const selectedDay = ref<string>("");
const fileType = ref<CalenderTypes>();
const currentDay = computed(() => {
  return WeekDays[new Date().getDay()];
});
const eventsToday = computed(() => {
  return subjectStore
    .getState()
    .subjects.filter((subject) => subject.weekDay == selectedDay.value);
});

const exerciseSheetsToday = computed(() => {
  let sheets: ExcerciseSheet[] = [];

  const currentDate = helperFunction.formatDate(new Date());

  subjectStore.getState().subjects.forEach((subject) => {
    if (!subject) return;
    subject.exerciseSheets.forEach((sheet) => {
      if (currentDate == sheet.dueDate) {
        sheets.push(sheet);
      }
    });
  });

  return sheets;
});
export const useCalender = () => {
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
        const shortName: string = name[0];

        weekDay = helperFunction.formatWeekDay(weekDay);

        const newSubject: Subject = {
          id: subjectStore.getSubjects().length + 1,
          name: name,
          shortName: shortName,
          exerciseSheets: [],
          folderPath: subjectStore.getSubjectPath(name),
          weekDay: weekDay,
          start: start,
          end: end,
          length: length,
          location: location,
          professor: professor,
        };

        subjectStore.addSubject(newSubject);
      }
    });
  };

  const getNextEvent = () => {
    return eventsToday.value.sort(
      (a, b) => Number(a.start) - Number(b.start)
    )[0];
  };

  const getDayIndex = (day: string) => {
    return WeekDays.indexOf(day);
  };

  return {
    importCalender,
    currentDay,
    exerciseSheetsToday,
    eventsToday,
    getNextEvent,
    getDayIndex,
    selectedDay,
  };
};
