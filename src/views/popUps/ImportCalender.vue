<template>
	<div class="">
		<Button class="w-32" text="Datei auswählen" icon="plus" @click="add" />
	</div>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import { calenderStore } from "@/store/calenderStore";
import { notificationStore } from "@/store/notificationStore";

const options = {
	title: "Kalender Importieren",
	properties: ["openFile"],
	buttonLabel: "Festlegen"
};

async function add() {
	const filePath: string = await (window as any).dialog.getSelectedFilePath(
		options
	);

	if (!filePath) {
		notificationStore.sendNotification("Keine Datei ausgewählt!");
		return;
	}

	calenderStore.saveCalender(filePath);
}
</script>

<style scoped></style>
