<template>
  <div style="position: relative">
    <p
      class="text-xs absolute bg-gray-300 dark:bg-zinc-800 rounded px-1 font-bold"
      :class="{
        '-mt-4 ': focused == true || value != '' || value === 0,
        'mt-0': focused == false,
        'ring ring-blue-200': focused == true,
      }"
    >
      {{ label }}
    </p>
    <input
      class="bg-gray-300 dark:bg-zinc-800 rounded border-2 border-transparent focus:outline-none focus:border-4 focus:ring focus:ring-blue-200 placeholder-gray-700 dark:placeholder-gray-200 p-1"
      :type="type"
      :value="value"
      @input="updateInput"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineProps<{
  label: string;
  type?: string;
  value: any;
}>();

const emit = defineEmits(["update:value"]);

const focused = ref<boolean>(false);

function updateInput(event: any) {
  emit("update:value", event.target.value);
}
</script>

<style scoped>
p {
  transition-duration: 200ms;
}
</style>
