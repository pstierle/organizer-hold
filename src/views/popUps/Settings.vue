<template>
	<div class="">
		<div
			class="mt-2 flex justify-between items-center border-b-2 border-red pb-2"
		>
			<p>DarkMode</p>
			<input type="checkbox" v-model="userDarkModeSelection" />
		</div>
		<Input class="mt-6" label="Studentennummer" v-model:value="studentID" />
	</div>
</template>

<script lang="ts" setup>
import { userStore } from "@/store/userStore";
import { ref, watchEffect } from "vue";
import Input from "@/components/Input.vue";

const userDarkModeSelection = ref<boolean>(userStore.darkMode());
const studentID = ref<string | undefined>(userStore.getState().studentID);

watchEffect(() => {
	userStore.setDarkMode(userDarkModeSelection.value);
	userStore.setStudentID(String(studentID.value));
});
</script>

<style scoped></style>
