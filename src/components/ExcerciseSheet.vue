<template>
  <div class="flex items-center">
    {{ sheet?.number }}
  </div>
</template>

<script lang="ts" setup>
import ExcerciseSheet from "@/store/interfaces/ExcerciseSheet";

defineProps<{
  sheet?: ExcerciseSheet;
}>();
</script>
