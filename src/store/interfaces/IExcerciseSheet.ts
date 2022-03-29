import ITimeStamp from "./ITimeStamp";

export default interface ExcerciseSheet extends ITimeStamp {
  number: number;
  subjectID: number;
  subjectName: string;
  done: boolean;
  dueDate: Date;
}
