<template>
  <div class="flex items-center gap-1">
    <button
      v-for="sheet in tabs"
      :key="sheet.number"
      @click="$emit('select', sheet.number)"
      class="rounded-t px-2 py-1 transition hover:bg-gray-400 dark:hover:bg-zinc-900 font-bold"
      :class="{
        'bg-gray-300 dark:bg-zinc-800':
          selectedSheetNumber === Number(sheet.number),
      }"
    >
      Blatt {{ sheet.number }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import IExcerciseSheet from "@/store/interfaces/IExcerciseSheet";

defineProps<{
  tabs: IExcerciseSheet[];
  selectedSheetNumber: number;
}>();

defineEmits<{
  (event: "select", sheetNumber: number): void;
}>();
</script>
