import { helperFunction } from "./helperFunction";
import CalenderTypes from "./interfaces/CalenderTypes";
import ExcerciseSheet from "./interfaces/ExcerciseSheet";
import { Store } from "./interfaces/Store";
import Subject from "./interfaces/Subject";
import WeekDays from "./interfaces/WeekDays";
import { subjectStore } from "./subjectStore";

const fs = (window as any).fs;

export default interface CalenderStore extends Object {
  fileType: CalenderTypes;
  selectedDay: string;
}

class CalenderState extends Store<CalenderStore> {
  protected data(): CalenderStore {
    return {
      fileType: null,
      selectedDay: "",
    };
  }

  checkCase(c: string) {
    var u = c.toUpperCase();
    return c.toLowerCase() === u ? -1 : c === u ? 1 : 0;
  }

  async saveCalender(filePath: String) {
    const data = await fs.readFileSync(filePath);

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
  }

  preload() {
    this.state.selectedDay = WeekDays[this.getCurrentDayIndex()];
  }

  getCurrentDayIndex(): number {
    return new Date().getDay();
  }

  getDayIndex(day: string): number {
    return WeekDays.indexOf(day);
  }

  setSelectedDay(day: string): void {
    this.state.selectedDay = day;
  }

  getSelectedDay(): string {
    return this.state.selectedDay;
  }

  getCurrentDay(): string {
    return WeekDays[new Date().getDay()];
  }

  getExerciseSheetsToday(): Array<ExcerciseSheet> {
    let sheets: Array<ExcerciseSheet> = [];
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
  }

  getEventsToday(): Array<Subject> {
    let filteredSubjects: Array<Subject> = [];

    subjectStore.getState().subjects.forEach((subject) => {
      if (subject.weekDay == this.state.selectedDay)
        filteredSubjects.push(subject);
    });

    return filteredSubjects;
  }

  getNextEvent(): Subject | null {
    let currentTime: string = `${new Date().getHours()}.${new Date().getMinutes()}`;
    let found: Subject | null = null;

    this.getEventsToday().forEach((subject) => {
      if (!subject.start) return;
      if (currentTime < subject.start) {
        found = subject;
      }
    });

    return found;
  }
}

export const calenderStore: CalenderState = new CalenderState();
