<template>
  <div class="">
    <Button class="w-32" text="Datei auswählen" icon="Plus" @click="add" />
  </div>
</template>

<script lang="ts">
import Button from "@/components/Button.vue"
import { calenderStore } from "@/store/calenderStore";

export default {
  components:{
    Button
  },
  setup() {
    const options = {
        title: "Kalender Importieren",
        properties: ["openFile"],
        buttonLabel: "Festlegen",
      };

    async function add() {
      const filePath : string = await (window as any).dialog.getSelectedFilePath(options);
      calenderStore.saveCalender(filePath)
    }

    return {
        add
    };
  },
};
</script>

<style scoped>
</style>

