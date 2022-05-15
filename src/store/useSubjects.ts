import { usePath } from "./usePath";
import { useNotifications } from "./useNotifications";
import { useSettings } from "./useSettings";
import { ref, computed } from "vue";
import ISubmission from "./interfaces/submissions/ISubmission";
import ISubject from "./interfaces/ISubject";
import ISubmissionType from "./interfaces/submissions/ISubmissionType";
import IExcerciseSheet from "./interfaces/IExcerciseSheet";

const { selectedSheetNumber, openModal } = useSettings();
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

const submissions = ref<ISubmission[]>([]);
const subjects = ref<ISubject[]>([]);
const loading = ref(false);

const selectedSubjectId = ref<number>();
const selectedSubject = computed<any>(() => {
  return subjects.value.find((s) => s.id === selectedSubjectId.value);
});

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

  const addSubject = async (subject: ISubject) => {
    let subjectToAdd = { ...subject };
    subjectToAdd.id = subjects.value.length + 1;
    subjectToAdd.folderPath = getSubjectPath(subject.name);
    subjectToAdd.length = String(
      parseFloat(subjectToAdd.end) - parseFloat(subjectToAdd.start)
    );

    if (duplicate(subjectToAdd)) {
      sendNotification("Dieser Name existiert bereits!", "alert");
      return;
    }
    subjects.value.push(subjectToAdd);
    await createSubjectDir(subjectToAdd);
    openModal.value = null;
  };

  const deleteSelectedSubject = () => {
    deleteSubjectPath(selectedSubject.value);

    subjects.value = subjects.value.filter(
      (s) => s.id !== selectedSubjectId.value
    );

    submissions.value = submissions.value.filter(
      (s) => s.subjectID !== selectedSubjectId.value
    );

    selectedSubjectId.value = undefined;
    openModal.value = null;
  };

  const duplicate = (checking: ISubject) => {
    return (
      subjects.value
        .filter((s) => s.id != selectedSubjectId.value)
        .find((s) => s.name === checking.name) !== undefined
    );
  };

  const updateSelectedSubject = (subject: ISubject) => {
    if (duplicate(subject)) {
      sendNotification("Dieser Name existiert bereits!", "alert");
      return;
    }
    const old = subjects.value.find((s) => s.id === subject.id);

    if (old) {
      subject.folderPath = getSubjectPath(subject.name);
      const index = subjects.value.indexOf(old);
      subjects.value = subjects.value.filter((s) => s.id !== subject.id);
      subjects.value[index] = subject;
      if (old.name !== subject.name)
        updateFolderName(old.folderPath, subject.name);
    }

    openModal.value = null;
  };

  const addSubmission = (
    type: ISubmissionType,
    destinationPath: string,
    name: string,
    format: string,
    size: string
  ) => {
    const submission: ISubmission = {
      fileName: name,
      type,
      format: format,
      path: destinationPath,
      subjectID: selectedSubject.value?.id || 0,
      exerciseSheetNumber: selectedSheetNumber.value,
      submissionID: submissions.value.length + 1,
      size,
    };

    updateSheetTimeStamp();
    submissions.value.push(submission);
  };

  const deleteSubmission = (submission: ISubmission) => {
    updateSheetTimeStamp();
    submissions.value = submissions.value.filter(
      (s) => s.submissionID !== submission.submissionID
    );
    (window as any).fs.deleteFile(submission.path);
  };

  const updateSheetTimeStamp = () => {
    subjects.value.forEach((subject) => {
      if (subject.id === selectedSubject.value?.id) {
        subject.exerciseSheets.forEach((sheet) => {
          if (sheet.number === selectedSheetNumber.value) {
            sheet.updatedAt = new Date();
          }
        });
      }
    });
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

  const addNewExerciseSheet = (sheetNumber: number, sheetDueDate: Date) => {
    const exists = selectedSubject.value?.exerciseSheets.find(
      (s: any) => s.number === sheetNumber
    );
    if (exists) {
      sendNotification("Diese Nummer existiert bereits!", "alert");
    } else {
      subjects.value.forEach((subject) => {
        if (selectedSubject.value?.id === subject.id) {
          subject.exerciseSheets.push({
            number: sheetNumber,
            subjectID: subject.id,
            done: false,
            dueDate: sheetDueDate,
            subjectName: subject.name,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          subject.exerciseSheets.sort((a, b) => {
            return String(a.number).localeCompare(String(b.number));
          });
        }
      });
    }
  };

  const deleteExerciseSheet = (sheet: IExcerciseSheet) => {
    let toDelete: number[] = [];

    // delete all files
    submissions.value.forEach((submission) => {
      if (
        submission.subjectID === selectedSubject.value?.id &&
        submission.exerciseSheetNumber === sheet.number
      ) {
        (window as any).fs.deleteFile(submission.path);
        toDelete.push(submission.submissionID);
      }
    });

    toDelete.forEach((id) => {
      submissions.value = submissions.value.filter(
        (submission) => submission.submissionID !== id
      );
    });

    subjects.value.forEach((subject) => {
      if (subject.id === sheet.subjectID) {
        subject.exerciseSheets = subject.exerciseSheets.filter(
          (e) => e.number !== sheet.number
        );
      }
    });
  };

  return {
    subjects,
    deleteExerciseSheet,
    submissions,
    loading,
    addSubject,
    deleteSelectedSubject,
    updateSelectedSubject,
    selectedSubject,
    selectedSubjectId,
    preload,
    deleteSubmission,
    addSubmission,
    toogleDone,
    addNewExerciseSheet,
    loadSaved,
  };
}
