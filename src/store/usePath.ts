import Subject from "./interfaces/Subject";
import SubmissionType from "./interfaces/submissions/SubmissionType";

const appPath = window.app.getPath();
const folderPath = window.path.join(appPath, "userdata");
const subjectPath = window.path.join(appPath, "userdata", "subjects.json");
const settingsPath = window.path.join(appPath, "userdata", "settings.json");
const submissionPath = window.path.join(
  appPath,
  "userdata",
  "submissions.json"
);

const documentPath = window.path.join(appPath, "userdata", "documents");

export function usePath() {
  const getSubjectPath = (name?: string) => {
    return window.path.join(documentPath, name);
  };

  const createSubjectDir = async (subject: Subject) => {
    const submissions: SubmissionType = "Abgabe";
    const solution: SubmissionType = "Lösungen";
    const correction: SubmissionType = "Korrektur";

    await window.fs.mkdirSync(getSubjectPath(subject.name));
    await window.fs.mkdirSync(
      window.path.join(getSubjectPath(subject.name), submissions)
    );
    await window.fs.mkdirSync(
      window.path.join(getSubjectPath(subject.name), solution)
    );
    await window.fs.mkdirSync(
      window.path.join(getSubjectPath(subject.name), correction)
    );
  };

  const deleteSubjectPath = (subject?: Subject) => {
    window.fs.rmdir(subject?.folderPath);
  };

  const updateFolderName = (oldPath: string, newName: string) => {
    window.fs.rename(oldPath, getSubjectPath(newName));
  };

  return {
    folderPath,
    subjectPath,
    submissionPath,
    documentPath,
    settingsPath,
    getSubjectPath,
    createSubjectDir,
    deleteSubjectPath,
    updateFolderName,
  };
}
