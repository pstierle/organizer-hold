<template>
	<div>
		<div class="flex justify-center">
			<Input
				class="mt-6"
				type="number"
				label="Blattnummer"
				v-model:value="sheetNumber"
			/>
		</div>

		<div class="flex justify-center">
			<Input
				class="mt-6"
				type="date"
				label="Abgabe"
				v-model:value="sheetDueDate"
			/>
		</div>
		<div class="flex justify-center">
			<Button
				class="w-24 mt-6 mb-6"
				text="Hinzufügen"
				icon="plus"
				@click="add"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { subjectStore } from "@/store/subjectStore";
import { helperFunction } from "@/store/helperFunction";
import { ref } from "vue";

const sheetNumber = ref<number>(0);
const sheetDueDate = ref<any>();

function add() {
	subjectStore.addNewExerciseSheet(
		Number(sheetNumber.value),
		helperFunction.formatDate(sheetDueDate.value)
	);
}
</script>

<style scoped></style>
