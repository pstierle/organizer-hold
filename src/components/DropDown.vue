<template>
  <div class="relative" ref="dropDown">
    <Button @click="open = true" :text="getSelectedElement()" />
    <ul v-if="open" class="absolute bg-gray-300 dark:bg-gray-800 rounded">
      <li
        class="p-2 text-xs rounded"
        v-for="(element, index) in elements"
        :key="index"
        @click="selectElement(index)"
        @mouseover="hoveredElement = index"
        @mouseleave="hoveredElement = null"
        :class="
          hoveredElement === index || selectedIndex === index
            ? 'bg-gray-400 dark:bg-gray-900'
            : ''
        "
      >
        <button>{{ element }}</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import Button from "@/components/Button.vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps<{
  elements: string[];
  selected: number;
}>();

const emit = defineEmits(["selectedIndex"]);

const selectedIndex = ref<number>(0);
const open = ref<boolean>(false);
const hoveredElement = ref<number | null>(null);
const dropDown = ref<HTMLElement>();

onClickOutside(dropDown, () => {
  open.value = false;
});

onMounted(() => {
  if (props.selected) selectedIndex.value = props.selected;
});

function selectElement(index: number): void {
  selectedIndex.value = index;
  emit("selectedIndex", selectedIndex.value);
  open.value = false;
}

function getSelectedElement(): string | undefined {
  if (!props.elements) return undefined;
  return props.elements[selectedIndex.value];
}
</script>
