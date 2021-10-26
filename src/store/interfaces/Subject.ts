import ExcerciseSheet from "./ExcerciseSheet";

export default interface Subject extends Object {
    id: number,
    name: string,
    shortName: string;
    exerciseSheets: ExcerciseSheet[],
    folderPath: string,
    weekDay: string,
    start: string,
    end: string,
    length: string,
    location: string,
    professor: string
}