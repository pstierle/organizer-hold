<template>
  <div class="flex items-center">
    <button
      v-for="sheet in tabs"
      :key="sheet.number"
      @click="$emit('select', sheet.number)"
    >
      Blatt {{ sheet.number }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import IExcerciseSheet from "@/store/interfaces/IExcerciseSheet";

defineProps<{
  tabs: IExcerciseSheet[];
}>();

defineEmits<{
  (event: "select", sheetNumber: number): void;
}>();
</script>
