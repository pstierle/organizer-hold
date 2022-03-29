<template>
  <div class="flex items-center">
    {{ sheet?.number }}
  </div>
</template>

<script lang="ts" setup>
import IExcerciseSheet from "@/store/interfaces/IExcerciseSheet";

defineProps<{
  sheet?: IExcerciseSheet;
}>();
</script>
