<template>
  <div class="">
    <div
      class="mt-2 flex justify-between items-center border-b-2 border-red pb-2"
    >
      <p>DarkMode</p>
      <input type="checkbox" v-model="darkMode" @click="toogleDarkMode" />
    </div>
    <Input class="mt-6" label="Studentennummer" v-model:value="studentID" />
  </div>
</template>

<script lang="ts" setup>
import Input from "@/components/Input.vue";
import { useSettings } from "@/store/useSettings";

const { studentID, darkMode, toogleDarkMode } = useSettings();
</script>

<style scoped></style>
