<template>
  <div class="">
    <Button class="w-32" text="Datei auswählen" icon="Plus" @click="add" />
  </div>
</template>

<script lang="ts">
import Button from "@/components/Button.vue";
import { calenderStore } from "@/store/calenderStore";
import { notificationStore } from "@/store/notificationStore";

export default {
  components: {
    Button,
  },
  setup() {
    const options = {
      title: "Kalender Importieren",
      properties: ["openFile"],
      buttonLabel: "Festlegen",
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

    return {
      add,
    };
  },
};
</script>

<style scoped>
</style>

