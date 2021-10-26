import { calenderStore } from "./calenderStore";
import {Store} from "./interfaces/Store";
import Subject from "./interfaces/Subject"
import Submission from "./interfaces/submissions/Submission";
import SubmissionType from "./interfaces/submissions/SubmissionType";
import { notificationStore } from "./notificationStore";
import { userStore } from "./userStore";

const fs = (window as any).fs;
const appPath = (window as any).app.getPath();
const path = (window as any).path;

const folderPath = path.join(appPath, 'userdata');
const subjectPath = path.join(appPath, 'userdata', 'subjects.json');
const submissionPath = path.join(appPath, 'userdata', 'submissions.json');
const documentPath = path.join(appPath, 'userdata', 'documents');

export default interface SubjectStore extends Object {
    subjects: Array<Subject>,
    submissions: Array<Submission>,
    selectedSubjectID: Number | undefined
}

class SubjectState extends Store<SubjectStore> {
    protected data(): SubjectStore {
        return {
            subjects: [],
            submissions: [],
            selectedSubjectID: undefined
        };
    }

    addSubject(subject : Subject) {
        if(this.containsProperty(subject)){
            notificationStore.sendNotification("Dieser Name existiert bereits!")
        }else{
            this.state.subjects.push(subject);
            this.saveSubjects();
            this.createSubjectDir(subject);
            userStore.setOpenPopUp(null);
        }
    }

    createSubjectDir(subject : Subject) : void{
        const submissions : SubmissionType = "Abgabe";
        const solution : SubmissionType = "Lösungen";
        const correction : SubmissionType = "Korrektur";

        fs.mkdirSync(this.getSubjectPath(subject.name));
        fs.mkdirSync(path.join(this.getSubjectPath(subject.name), submissions));
        fs.mkdirSync(path.join(this.getSubjectPath(subject.name), solution));
        fs.mkdirSync(path.join(this.getSubjectPath(subject.name), correction));
    }

    // checks if given subject has same name / shortname as any in saved subjects
    containsProperty(checking : Subject) : Boolean{
        let containtsProperty : Boolean = false;

        this.state.subjects.forEach(subject => {
            if(subject.name === checking.name) containtsProperty = true;
        });

        return containtsProperty;
    }

    deleteSelectedSubject(): void{

        const foundSubject : Subject |  undefined = this.state.subjects.find(subject => subject.id === this.state.selectedSubjectID);

        for(let i = 0; i < this.state.subjects.length; i++){
            if(this.state.subjects[i].id === this.state.selectedSubjectID){
                this.state.subjects.splice(i, 1);
            }
        }

        for(let i = 0; i < this.state.submissions.length; i++){
            if(this.state.submissions[i].subjectID === this.state.selectedSubjectID){
                this.state.submissions.splice(i, 1);
            }
        }

        fs.rmdir(this.getSubjectPath(foundSubject?.name));        

        this.state.selectedSubjectID = undefined;
        userStore.closePopUp();
        this.saveSubjects();
    }

    updateSelectedSubject(name: string, weekDay: string, start: string, end: string, location: string, professor: string) : void{
        for(let i = 0; i < this.state.subjects.length; i++){
            if(this.state.subjects[i].id === this.state.selectedSubjectID){
                // change folder name if shortname change
                if(this.state.subjects[i].name != name){
                    this.updateFolderName(name);
                    this.state.subjects[i].folderPath = this.getSubjectPath(name);
                }
                this.state.subjects[i].name = name;
                this.state.subjects[i].weekDay = weekDay;
                this.state.subjects[i].start = start;
                this.state.subjects[i].end = end;
                this.state.subjects[i].location = location;
                this.state.subjects[i].professor = professor;
                userStore.setOpenPopUp(null)
            }
        }

        this.saveSubjects();
    }

    updateFolderName(newName : string) : void{
        const currentPath = this.getSelectedSubject()?.folderPath;

        fs.rename(currentPath, this.getSubjectPath(newName));
    }

    saveSubjects(){
        fs.writeFileSync(subjectPath, JSON.stringify(this.state.subjects, null, 4));
        fs.writeFileSync(submissionPath, JSON.stringify(this.state.submissions, null, 4));
        this.loadSubjects();
    }

    getSubjects() : Array<Subject>{
        return this.state.subjects;
    }

    // onstart create data related folders if not present
    preload() : void{
        const subjectsSaved : Boolean = fs.existsSync(subjectPath);
        const submissionsSaved : Boolean = fs.existsSync(submissionPath);
        const folderExist : Boolean = fs.existsSync(folderPath);
        const documentFolderExist : Boolean = fs.existsSync(documentPath);
        
        if(!folderExist){
            fs.mkdirSync(folderPath);
        }
        if(!documentFolderExist){
            fs.mkdirSync(documentPath);
        }
        if(!subjectsSaved){
            fs.writeFileSync(subjectPath, JSON.stringify(this.state.subjects, null, 4));
        }
        if(!submissionsSaved){
            fs.writeFileSync(submissionPath, JSON.stringify(this.state.subjects, null, 4));     
        }
    }

    async loadSubjects() {
        console.log("loading subjects")

        const subjects = await fs.readFileSync(subjectPath);
        this.state.subjects = JSON.parse(subjects);

        const submissions = await fs.readFileSync(submissionPath);  
        this.state.submissions = JSON.parse(submissions);
    }

    getSubjectPath(name : string | null | undefined) : string {
        return path.join(documentPath, name);
    }
    
    setSelectedSubjectID(id : Number) : void{
        this.state.selectedSubjectID = id;
    }

    getSubmissions() : Array<Submission>{
        return this.state.submissions;
    }

    deleteSumbission(submissionID : Number) : void{
        for(let i = 0; i < this.state.submissions.length; i++){
            if(submissionID === this.state.submissions[i].submissionID){
                this.state.submissions.splice(i, 1);
                break;
            }
        }

        this.saveSubjects();
    }

    addSubmission(type : SubmissionType, destinationPath : string, name : string, format: string, size: string) : void{        
        
        const subjectID: Number =
          this.getSelectedSubjectID() || 0;
        const submissionID: Number | undefined =
          this.getSubmissions().length + 1;
        
        const submission : Submission = {
            fileName: name, 
            type,
            format: format,
            path : destinationPath,
            subjectID, 
            exerciseSheetNumber: userStore.getSelectedSheetNumber(),
            submissionID,
            size
        }

        this.state.submissions.push(submission);
        
        this.saveSubjects();
    }

    getSelectedSubjectID() : Number | undefined{
        return this.state.selectedSubjectID;
    }

    getSelectedSubject() : Subject | undefined{
        return this.state.subjects.find(subject => subject.id === this.state.selectedSubjectID);
    }

    toogleDone(sheetNumber : Number) : void{
        this.state.subjects.forEach(subject => {
            if(subject.id === this.state.selectedSubjectID){
                subject.exerciseSheets.forEach(sheet => {
                    if(sheet.number === sheetNumber){
                        sheet.done = !sheet.done;
                    }
                });
            }
        });

        this.saveSubjects();
    }

    addNewExerciseSheet(sheetNumber: Number, sheetDueDate : String) : void{

        let sheetExists : Boolean = false;

        this.state.subjects.forEach((subject) => {
            if(this.state.selectedSubjectID === subject.id){
                subject.exerciseSheets.forEach(sheet => {
                    if(sheet.number === sheetNumber) sheetExists = true;
                })
            }                
        })

        if(sheetExists){
            notificationStore.sendNotification("Diese Nummer existiert bereits!")
        }else{
            this.state.subjects.forEach((subject) => {
                if(this.state.selectedSubjectID === subject.id){
                    subject.exerciseSheets.push({
                        number: sheetNumber,
                        subjectID: subject.id,
                        done: false,
                        dueDate: sheetDueDate,
                        subjectName: subject.name
                    })
                }
            })

            this.saveSubjects();
        }
    }
}

export const subjectStore: SubjectState = new SubjectState()