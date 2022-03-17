<template>
  <div>
    <button
      @click="open = !open"
      class="flex justify-between items-center bg-gray-400 dark:bg-gray-900 w-full rounded-t py-1 px-2"
    >
      <span>{{ title }}</span>
      <ChevronDownIcon
        class="transition transform w-5 h-5"
        :class="{ ' rotate-90': !open }"
      />
    </button>
    <div v-if="open" class="bg-gray-300 dark:bg-gray-800 w-full rounded-b">
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
