import ISubmissionType from "./ISubmissionType";

export default interface Submission extends Object {
  submissionID: number;
  subjectID: number;
  exerciseSheetNumber: number;
  path: string;
  format: string;
  type: ISubmissionType;
  fileName: string;
  size: string;
}
