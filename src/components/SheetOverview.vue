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
import ExcerciseSheet from "@/store/interfaces/ExcerciseSheet";

defineProps<{
  tabs: ExcerciseSheet[];
}>();

defineEmits<{
  (event: "select", sheetNumber: number): void;
}>();
</script>
