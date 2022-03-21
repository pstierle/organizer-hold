import TimeStamp from "./TimeStamp";

export default interface ExcerciseSheet extends TimeStamp {
  number: number;
  subjectID: number;
  subjectName: string;
  done: boolean;
  dueDate: Date;
}
