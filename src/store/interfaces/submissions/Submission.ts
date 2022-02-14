import SubmissionType from "./SubmissionType";

export default interface Submission extends Object {
	submissionID: number;
	subjectID: number;
	exerciseSheetNumber: number;
	path: String;
	format: String;
	type: SubmissionType;
	fileName: String;
	size: String;
}
