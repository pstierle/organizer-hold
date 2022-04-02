<template>
  <div>
    <button
      @click="open = !open"
      class="flex justify-between items-center bg-gray-400 dark:bg-zinc-900 w-full rounded-t py-1 px-2 font-bold"
    >
      <span>{{ title }}</span>
      <button
        class="hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-full h-5 w-5 flex items-center justify-center"
      >
        <ChevronDownIcon
          class="transition transform w-4 h-4"
          :class="{ ' rotate-90': !open }"
        />
      </button>
    </button>
    <div v-if="open" class="bg-gray-300 dark:bg-zinc-800 w-full rounded-b p-2">
      <slot class="transition-all" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

defineProps<{
  title: string;
}>();

const open = ref<boolean>(true);
</script>
