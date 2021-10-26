<template>
  <div>
    <div>
      <Input class="mt-5" type="text" label="Name" v-model:value="name" />
      <Input class="mt-5" type="time" label="Start" v-model:value="start" />
      <Input class="mt-5" type="time" label="Ende" v-model:value="end" />
      <Input class="mt-5" type="text" label="Ort" v-model:value="location" />
      <Input class="mt-5" type="text" label="Professor" v-model:value="professor" />
      <div class="flex items-center justify-evenly mt-3">
        <p>Tag</p>
        <DropDown :elements="weekDays" @selectedIndex="handleIndexChange"></DropDown>
      </div>      
    </div>
    <Button class="mt-5" :text="header" type="success" @click="submit" />
  </div>
</template>

<script lang="ts">
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import DropDown from "@/components/DropDown.vue";
import { onMounted, ref } from "vue";
import { subjectStore } from "@/store/subjectStore";
import ParsedWeekDays from '@/store/interfaces/ParsedWeekDays';
import WeekDays from '@/store/interfaces/WeekDays';

export default {
  components: {
    Input,
    Button,
    DropDown
  },
  props: {
    header: String,
    clearInput: Boolean,
  },
  emits: ["submit"],
  setup(props: any, context: any) {
    const name = ref<string | null>("");
    const weekDays = ref<Array<string>>(ParsedWeekDays);
    const weekDay = ref<string>("");
    const start = ref<string>("");
    const end = ref<string>("");
    const location = ref<string>("");
    const professor = ref<string>("");

    onMounted(() => {
      if (!props.clearInput) {
        const selectedSubject = subjectStore.getSelectedSubject();
        if (selectedSubject) {
          name.value = selectedSubject.name;
          weekDay.value = selectedSubject.weekDay;
          start.value = selectedSubject.start;
          end.value = selectedSubject.end;
          location.value = selectedSubject.location;
          professor.value = selectedSubject.professor;
        }
      }
    });

    function handleIndexChange(index : any){
      weekDay.value = WeekDays[index];
    }

    function submit() {
      if (name.value === "") {
        return;
      } else {
        context.emit("submit", 
          name.value, 
          weekDay.value, 
          start.value, 
          end.value, 
          location.value, 
          professor.value, 
        );
        name.value = "";
        weekDay.value = "";
        start.value = "";
        end.value = "";
        location.value = "";
        professor.value = "";
      }
    }

    return {
      name,
      weekDays,
      start,
      end,
      location,
      professor,
      submit,
      handleIndexChange
    };
  },
};
</script>

<style scoped>
</style>
