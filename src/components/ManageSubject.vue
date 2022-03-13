<template>
  <div>
    <div>
      <Input
        class="mt-5"
        type="text"
        label="Name"
        v-model:value="subject.name"
      />
      <Input
        class="mt-5"
        type="time"
        label="Start"
        v-model:value="subject.start"
      />
      <Input
        class="mt-5"
        type="time"
        label="Ende"
        v-model:value="subject.end"
      />
      <Input
        class="mt-5"
        type="text"
        label="Ort"
        v-model:value="subject.location"
      />
      <Input
        class="mt-5"
        type="text"
        label="Professor"
        v-model:value="subject.professor"
      />
      <div class="flex items-center justify-evenly mt-3">
        <DropDown
          :elements="WeekDays"
          :selected="0"
          @selectedIndex="(i: number) => {
            subject.weekDay = WeekDays[i]
          }"
        ></DropDown>
      </div>
    </div>
    <Button
      class="mt-5"
      :text="header"
      type="success"
      @click="$emit('submit', subject)"
    />
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { ref } from "vue";
import WeekDays from "@/store/interfaces/WeekDays";
import Subject from "@/store/interfaces/Subject";
import DropDown from "./DropDown.vue";
import { useCalender } from "@/store/useCalender";

const { currentDay } = useCalender();

const props = defineProps<{
  header: string;
  clearInput: boolean;
  subjectModel: Subject;
}>();

defineEmits<{
  (event: "submit", subject: Subject): void;
}>();

const subject = ref<Subject>({ ...props.subjectModel });
</script>
