import ISubmissionType from "./ISubmissionType";

export default interface Submission extends Object {
  submissionID: number;
  subjectID: number;
  exerciseSheetNumber: number;
  path: String;
  format: String;
  type: ISubmissionType;
  fileName: String;
  size: String;
}
