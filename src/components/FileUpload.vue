<template>
  <div class="flex mb-4 justify-between items-center flex-wrap">
    <label v-if="!file" for="file-upload">
      <p class="p-2 rounded hover:cursor-pointer bg-gray-100">{{ label }}</p>
      <span v-if="typeRestrictions" class="px-2 text-sm">
        Erlaubte formate: {{ typeRestrictions.join(", ") }}
      </span>
    </label>
    <div v-else>
      <span class="text-gray-700 text-sm">Ausgewählte Datei</span>
      <div class="p-2 bg-gray-100 rounded flex items-center justify-between">
        <Button type="alert" icon="XIcon" @click="removeFile"></Button>
        <p>{{ file.name }} ({{ fileSize }})</p>
      </div>
    </div>
    <ScaleTransition>
      <span v-if="error" class="text-maroon-flush text-sm px-2">
        {{ typeof error === "string" ? error : error[0] }}
      </span>
    </ScaleTransition>
    <input id="file-upload" type="file" @change="handleFileChange" />
  </div>
</template>

<script lang="ts" setup>
import ScaleTransition from "@/transitions/ScaleTransition.vue";
import { ref } from "vue";
import Button from "./Button.vue";

const props = defineProps<{
  label: string;
  file?: File;
  error?: string | string[];
  typeRestrictions?: string[];
}>();

const emit = defineEmits<{
  (event: "update:file", file: File | undefined): void;
  (event: "update:error", error: string): void;
}>();

const fileSize = ref("");

const updateFileSize = (selectedFile: File) => {
  let size = selectedFile.size;
  var fSExt = ["Bytes", "KB", "MB", "GB"],
    i = 0;
  while (size > 900) {
    size /= 1024;
    i++;
  }
  fileSize.value = Math.round(size * 100) / 100 + " " + fSExt[i];
};

const handleFileChange = (e: any) => {
  const selectedFile: File = e.target.files[0];
  if (props.typeRestrictions) {
    const fileType = selectedFile.type.replace(/(.*)\//g, "");
    if (!props.typeRestrictions.includes(fileType)) {
      emit("update:error", `${fileType} nicht erlaubt`);
      return;
    }
  }
  emit("update:file", selectedFile);
  emit("update:error", "");
  updateFileSize(selectedFile);
  e.target.value = "";
};

const removeFile = () => {
  emit("update:file", undefined);
  fileSize.value = "";
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>
