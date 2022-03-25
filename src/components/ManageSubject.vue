<template>
  <div v-if="subject" class="flex flex-col gap-6">
    <Input class="mt-6" type="text" label="Name" v-model:value="subject.name" />
    <div class="flex items-center justify-between">
      <Input type="time" label="Start" v-model:value="subject.start" />
      <Input type="time" label="Ende" v-model:value="subject.end" />
    </div>
    <Input type="text" label="Ort" v-model:value="subject.location" />
    <Input type="text" label="Professor" v-model:value="subject.professor" />
    <div
      class="flex items-center justify-between gap-1 bg-gray-300 dark:bg-zinc-800 py-1 px-2 rounded"
    >
      <p>Tag</p>
      <DropDown
        :elements="WeekDays"
        :selected="0"
        @selectedIndex="(i: number) => {
            subject.weekDay = WeekDays[i]
          }"
      ></DropDown>
    </div>
    <Button :text="header" type="success" @click="$emit('submit', subject)" />
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { onMounted, ref } from "vue";
import WeekDays from "@/store/interfaces/WeekDays";
import Subject from "@/store/interfaces/Subject";
import DropDown from "./DropDown.vue";
import { useCalender } from "@/store/useCalender";

const { currentDay } = useCalender();

const props = defineProps<{
  header: string;
  subjectModel: Subject;
}>();

defineEmits<{
  (event: "submit", subject: Subject): void;
}>();

const subject = ref<any>();

onMounted(() => {
  subject.value = createCopy(props.subjectModel);
});

const createCopy = (s: Subject) => {
  let objCopy: any = {};
  let key;

  for (key in s) {
    objCopy[key] = (s as any)[key];
  }
  return objCopy;
};
</script>
