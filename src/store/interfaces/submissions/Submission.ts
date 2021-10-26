import SubmissionType from "./SubmissionType";

export default interface Submission extends Object{
    submissionID: Number,
    subjectID: Number,
    exerciseSheetNumber: Number,
    path: String,
    format: String,
    type: SubmissionType,
    fileName: String,
    size: String,
}