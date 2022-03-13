import { usePath } from "./usePath";
import { useNotifications } from "./useNotifications";
import { useSettings } from "./useSettings";
import Submission from "./interfaces/submissions/Submission";
import { ref } from "vue";
import Subject from "./interfaces/Subject";
import SubmissionType from "./interfaces/submissions/SubmissionType";

const { selectedSheetNumber, openPopUp } = useSettings();
const { sendNotification } = useNotifications();
const {
  folderPath,
  subjectPath,
  submissionPath,
  documentPath,
  createSubjectDir,
  getSubjectPath,
  deleteSubjectPath,
  updateFolderName,
} = usePath();

const submissions = ref<Submission[]>([]);
const subjects = ref<Subject[]>([]);
const loading = ref(false);
const selectedSubject = ref<Subject>();

export function useSubjects() {
  const preload = async () => {
    const subjectsSaved: boolean = window.fs.existsSync(subjectPath);
    const submissionsSaved: boolean = window.fs.existsSync(submissionPath);
    const folderExist: boolean = window.fs.existsSync(folderPath);
    const documentFolderExist: boolean = window.fs.existsSync(documentPath);

    if (!folderExist) {
      window.fs.mkdirSync(folderPath);
    }
    if (!documentFolderExist) {
      window.fs.mkdirSync(documentPath);
    }
    if (!subjectsSaved) {
      window.fs.writeFileSync(
        subjectPath,
        JSON.stringify(subjects.value, null, 4)
      );
    }
    if (!submissionsSaved) {
      window.fs.writeFileSync(
        submissionPath,
        JSON.stringify(submissions.value, null, 4)
      );
    }

    await loadSaved();
  };

  const loadSaved = async () => {
    const subjectsData = window.fs.readFileSync(subjectPath);
    const submissionsData = window.fs.readFileSync(submissionPath);
    submissions.value = JSON.parse(submissionsData);
    subjects.value = JSON.parse(subjectsData);
  };

  const addSubject = async (subject: Subject) => {
    let subjectToAdd = { ...subject };
    subjectToAdd.id = subjects.value.length + 1;
    subjectToAdd.folderPath = getSubjectPath(subject.name);
    subjectToAdd.length = String(
      parseFloat(subjectToAdd.end) - parseFloat(subjectToAdd.start)
    );

    if (duplicate(subjectToAdd)) {
      sendNotification("Dieser Name existiert bereits!");
      return;
    }
    subjects.value.push(subjectToAdd);
    await createSubjectDir(subjectToAdd);
    openPopUp.value = null;
  };

  const deleteSelectedSubject = () => {
    subjects.value = subjects.value.filter(
      (s) => s.id !== selectedSubject.value?.id
    );

    submissions.value = submissions.value.filter(
      (s) => s.subjectID !== selectedSubject.value?.id
    );

    deleteSubjectPath(selectedSubject.value);
    selectedSubject.value = undefined;
    openPopUp.value = null;
  };

  const duplicate = (checking: Subject) => {
    return subjects.value.find((s) => s.name === checking.name) !== undefined;
  };

  const updateSelectedSubject = (subject: Subject) => {
    console.log(subject.name);

    if (duplicate(subject)) {
      sendNotification("Dieser Name existiert bereits!");
      return;
    }
    subjects.value.forEach((s) => {
      if (s.id === subject.id) {
        updateFolderName(s.folderPath, subject.name);
        s = subject;
      }
    });
  };

  const deleteSubmission = (submissionID: number) => {
    for (let i = 0; i < submissions.value.length; i++) {
      if (submissionID === submissions.value[i].submissionID) {
        (window as any).fs.deleteFile(submissions.value[i].path);
        submissions.value.splice(i, 1);
        break;
      }
    }
  };

  const addSubmission = (
    type: SubmissionType,
    destinationPath: string,
    name: string,
    format: string,
    size: string
  ) => {
    const submission: Submission = {
      fileName: name,
      type,
      format: format,
      path: destinationPath,
      subjectID: selectedSubject.value?.id || 0,
      exerciseSheetNumber: selectedSheetNumber.value,
      submissionID: submissions.value.length + 1,
      size,
    };

    submissions.value.push(submission);
  };

  const toogleDone = (sheetNumber: number) => {
    subjects.value.forEach((subject) => {
      if (subject.id === selectedSubject.value?.id) {
        subject.exerciseSheets.forEach((sheet) => {
          if (sheet.number === sheetNumber) {
            sheet.done = !sheet.done;
          }
        });
      }
    });
  };

  const addNewExerciseSheet = (sheetNumber: number, sheetDueDate: String) => {
    const exists = selectedSubject.value?.exerciseSheets.find(
      (s) => s.number === sheetNumber
    );
    if (exists) {
      sendNotification("Diese Nummer existiert bereits!");
    } else {
      subjects.value.forEach((subject) => {
        if (selectedSubject.value?.id === subject.id) {
          subject.exerciseSheets.push({
            number: sheetNumber,
            subjectID: subject.id,
            done: false,
            dueDate: sheetDueDate,
            subjectName: subject.name,
          });

          subject.exerciseSheets.sort((a, b) => {
            return String(a.number).localeCompare(String(b.number));
          });
        }
      });
    }
  };

  return {
    subjects,
    submissions,
    loading,
    addSubject,
    deleteSelectedSubject,
    updateSelectedSubject,
    selectedSubject,
    preload,
    deleteSubmission,
    addSubmission,
    toogleDone,
    addNewExerciseSheet,
    loadSaved,
  };
}
