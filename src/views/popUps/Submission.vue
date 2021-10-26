<template>
  <div>
    <Button class="w-32" text="Datei Hinzufügen" icon="Plus" @click="add" />
    <table class="table-fixed">
      <thead>
        <tr>
          <th class="w-1/4 p-2"></th>
          <th class="w-1/2 p-2">Name</th>
          <th class="w-1/4 p-2">Format</th>
          <th class="w-1/4 p-2">Größe</th>
          <th class="w-1/4 p-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(submission, index) in submissions"
          :key="index"
          class="border-b-2"
        >
          <td class="p-2 whitespace-nowrap">
            <Button
                v-if="selected(submission)" 
                @click="addToSelected(submission)"
                icon="Ticked"
                text="Auswählen"               
              />
              <Button
                v-if="!selected(submission)" 
                @click="addToSelected(submission)"
                icon="Unticked"
                text="Auswählen"
            />
          </td>
          <td class="p-2 whitespace-nowrap">{{ submission.fileName }}</td>
          <td class="p-2 whitespace-nowrap">.{{ submission.format }}</td>
          <td class="p-2 whitespace-nowrap">{{ submission.size }}</td>
          <td class="p-2 whitespace-nowrap">
            <Button text="Öffnen" @click="openFile(submission)" />
          </td>
        </tr>
      </tbody>
    </table>
    <div  v-if="selectedSubmissions.length" class="flex items-center justify-evenly">
      <Button v-if="onlyContainsImages" @click="concatToPdf" text="Zu PDF zusammen fügen" class="w-1/3 mt-2" />
      <Button @click="deleteSelectedSubjects" text="Löschen" class="w-1/3 mt-2" type="alert" />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, PropType, ref, watchEffect } from "vue";
import { subjectStore } from "@/store/subjectStore";
import { userStore } from "@/store/userStore";
import Button from "@/components/Button.vue";
import Submission from "@/store/interfaces/submissions/Submission";
import Input from "@/components/Input.vue";
import SubmissionType from "@/store/interfaces/submissions/SubmissionType";

export default {
  props: {
    submissionType: {
      require: true,
      type: String as PropType<SubmissionType>,
    },
  },
  components: {
    Button,
    Input,
  },
  setup(props: any) {
    const darkMode = ref<Boolean>(userStore.darkMode());
    const submissions = ref<Array<Submission>>([]);
    const selectedSubmissions = ref<Array<Submission>>([]);
    const onlyContainsImages = ref<boolean>(true);

    const options = {
      title: "Datei hinzufügen",
      properties: ["openFile"],
      buttonLabel: "Ablegen",
    };

    onMounted(() => {
      submissions.value = subjectStore
        .getSubmissions()
        .filter((submission) => submission.type === props.submissionType && submission.subjectID === subjectStore.getSelectedSubjectID() && submission.exerciseSheetNumber === userStore.getSelectedSheetNumber());
      darkMode.value = userStore.darkMode();
    });

    watchEffect(() => {
      darkMode.value = userStore.darkMode();
      submissions.value = subjectStore
        .getSubmissions()
        .filter((submission) => submission.type === props.submissionType);
    });

    async function add() {
        const filePath : string = await (window as any).dialog.getSelectedFilePath(options);
        
        if(filePath === ""){
          // TODO notification
          return;
        }

        const fileName: string = filePath
            .replace(/^.*[\\\/]/, "")
            .split(".")
            .shift() || "";

        let fileType: string = filePath.split(".").pop() || "";

        const destinationPath = (window as any).path.join(
            subjectStore.getSelectedSubject()?.folderPath,
            props.submissionType,
            `${fileName}.${fileType}`
        );

        subjectStore.addSubmission(props.submissionType, destinationPath, fileName, fileType, "null");

        (window as any).fs.copyFile(filePath, destinationPath);
    }


    function openFile(submission : Submission) : void{
      (window as any).shell.openPath(submission.path);
    }    

    function selected(submission : Submission) : Boolean{
      let contains : Boolean = false;

      selectedSubmissions.value.forEach(entry => {
        if(entry.path === submission.path){
           contains = true;
        }
      });

      return contains;
    }
    
    function addToSelected(submission : Submission) : void{
      let contains : Boolean = false;
      let foundIndex : number = 0;

      selectedSubmissions.value.forEach(entry => {
        if(entry.path === submission.path){
           contains = true;
           foundIndex = selectedSubmissions.value.indexOf(entry);
        }
      });


      if(contains){
        selectedSubmissions.value.splice(foundIndex, 1);
      }else{
        selectedSubmissions.value.push(submission);
      }

      let imageCheck : boolean = true;

      selectedSubmissions.value.forEach(entry => {   
        if(entry.format !== 'png' || entry.format !== 'jpg' || entry.format !== 'jpeg'){
          imageCheck = false;
        }else{
          imageCheck = true;
        }
      });

      onlyContainsImages.value = imageCheck;

    }

    async function concatToPdf(){
      const name = "test";
      const type = "pdf";

      let pathArray : any[] = [];

      const destinationPath = (window as any).path.join(
        subjectStore.getSelectedSubject()?.folderPath,
        props.submissionType,
        `${name}.${type}`
      );

      selectedSubmissions.value.forEach(entry => {
        pathArray.push(entry.path);
      });

    
      const result = await (window as any).pdf.create(pathArray, destinationPath);

      if(!result){
        console.log("failed!")
      }else{
        subjectStore.addSubmission(props.submissionType, destinationPath, name, type, "null");
      }
    }

    function deleteSelectedSubjects() : void{
      selectedSubmissions.value.forEach(entry => {
        subjectStore.deleteSumbission(entry.submissionID);
      });
    }

    return {
      add,
      openFile,
      addToSelected,
      selected,
      concatToPdf,
      deleteSelectedSubjects,
      submissions,
      darkMode,
      selectedSubmissions,
      onlyContainsImages
    };
  },
};
</script>

<style scoped>
</style>

