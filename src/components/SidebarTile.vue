<template>
  <div
    class="flex gap-1 items-center rounded-lg py-1 cursor-pointer px-2 transition-all hover:bg-gray-300 dark:hover:bg-zinc-700 w-full text-xs relative"
    :class="hovered ? 'justify-start' : ' justify-center'"
  >
    <slot name="no-hover" />
    <slot v-if="hovered" name="hover" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  hovered: boolean;
}>();
</script>
