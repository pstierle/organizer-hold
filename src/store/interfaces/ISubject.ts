import IExcerciseSheet from "./IExcerciseSheet";

export default interface Subject extends Object {
  id: number;
  name: string;
  exerciseSheets: IExcerciseSheet[];
  folderPath: string;
  weekDay: string;
  start: string;
  end: string;
  length: string;
  location: string;
  professor: string;
}
