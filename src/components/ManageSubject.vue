<template>
  <div>
    <div>
      <Input class="mt-5" type="text" label="Name" v-model:value="name" />
      <Input class="mt-5" type="time" label="Start" v-model:value="start" />
      <Input class="mt-5" type="time" label="Ende" v-model:value="end" />
      <Input class="mt-5" type="text" label="Ort" v-model:value="location" />
      <Input
        class="mt-5"
        type="text"
        label="Professor"
        v-model:value="professor"
      />
      <div class="flex items-center justify-evenly mt-3">
        <p>Tag</p>
        <DropDown
          :selected="subjectWeekDayIndex"
          :elements="weekDays"
          @selectedIndex="handleIndexChange"
        ></DropDown>
      </div>
    </div>
    <Button class="mt-5" :text="header" type="success" @click="submit" />
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import DropDown from "@/components/DropDown.vue";
import { onMounted, ref } from "vue";
import WeekDays from "@/store/interfaces/WeekDays";
import { useCalender } from "@/store/useCalender";
import { useSubjects } from "@/store/useSubjects";

const { selectedSubject } = useSubjects();

const props = defineProps<{
  header: string;
  clearInput: boolean;
}>();

const emit = defineEmits(["submit"]);

const { getDayIndex } = useCalender();

const name = ref<string | null>("");
const weekDays = ref<Array<string>>(WeekDays);
const weekDay = ref<string>("");
const start = ref<string>("");
const end = ref<string>("");
const location = ref<string>("");
const professor = ref<string>("");
const subjectWeekDayIndex = ref<number>(0);

onMounted(() => {
  if (!props.clearInput) {
    const selected = selectedSubject.value;
    if (selected) {
      name.value = selected.name;
      weekDay.value = selected.weekDay;
      start.value = selected.start;
      end.value = selected.end;
      location.value = selected.location;
      professor.value = selected.professor;
      subjectWeekDayIndex.value = getDayIndex(selected.weekDay);
    }
  }
});

function handleIndexChange(index: any) {
  weekDay.value = WeekDays[index];
}

function submit() {
  if (name.value === "") {
    return;
  } else {
    emit(
      "submit",
      name.value,
      weekDay.value,
      start.value,
      end.value,
      location.value,
      professor.value
    );
    name.value = "";
    weekDay.value = "";
    start.value = "";
    end.value = "";
    location.value = "";
    professor.value = "";
  }
}
</script>

<style scoped></style>
