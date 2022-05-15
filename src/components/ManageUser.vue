<template>
  <form class="flex flex-col gap-6" @submit="$emit('submit', userData)">
    <Input type="text" label="Name" v-model:value="name" />
    <Input type="text" label="Email" v-model:value="email" />
    <Input type="text" label="Passwort" v-model:value="password" />
    <Input type="number" label="Studenten Nummber" v-model:value="studentId" />
    <Select
      v-if="universities"
      label="Universität"
      v-model:selected="univerityId"
      :options="
        universities.map((u) => {
          return { label: u.name, value: u.id };
        })
      "
    />
    <Button :text="label" type="success" />
  </form>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { onMounted, ref } from "vue";
import IUser from "@/store/interfaces/IUser";
import { IUniversity } from "@/store/IUniversity";
import Select from "@/components/Select.vue";
import { computed } from "@vue/reactivity";

defineProps<{
  label: string;
}>();

defineEmits<{
  (event: "submit", user: IUser): void;
}>();

const name = ref<string>("");
const email = ref<string>("");
const studentId = ref<number>(0);
const univerityId = ref<number>(0);
const password = ref<string>("");
const universities = ref<IUniversity[]>([]);

const userData = computed<IUser>(() => {
  return {
    name: name.value,
    email: email.value,
    studentId: studentId.value,
    univerityId: univerityId.value,
    password: password.value,
  };
});

onMounted(async () => {
  universities.value = await window.axios.get<IUniversity[]>("/universities");
});
</script>
