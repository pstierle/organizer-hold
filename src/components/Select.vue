<template>
  <div style="position: relative">
    <p
      class="text-xs absolute bg-gray-300 dark:bg-zinc-800 rounded px-1 font-bold"
      :class="{
        '-mt-4 ': selected !== undefined,
        'mt-0': selected === undefined,
        'ring ring-blue-200': selected !== undefined,
      }"
    >
      {{ label }}
    </p>
    <select v-model="selected" class="bg-gray-300 dark:bg-zinc-800">
      <option
        class="bg-gray-300 dark:bg-zinc-800"
        v-for="{ value, label: text } in options"
        :key="value"
        :value="value"
      >
        {{ text }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

type Selection = {
  label: string;
  value: any;
};

const emit = defineEmits<{
  (event: "update:selected", option: any): void;
}>();

const props = defineProps<{
  options: Selection[];
  selected?: any;
  label: string;
}>();

const selected = useVModel(props, "selected", emit);
</script>
