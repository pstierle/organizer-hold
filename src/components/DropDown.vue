<template>
  <div class="dropdown">
    <Button @click="openDropDown" :text="getSelectedElement()" />
    <ul
      v-if="open"
      class="absolute bg-lightMode-primary dark:bg-darkMode-primary rounded"
    >
      <li
        class="p-2 text-xs rounded"
        v-for="(element, index) in elements"
        :key="index"
        @click="selectElement(index)"
        @mouseover="hoveredElement = index"
        @mouseleave="hoveredElement = null"
        :class="{
          'bg-lightMode-accent dark:bg-darkMode-accent':
            hoveredElement === index || selectedIndex === index,
        }"
      >
        {{ element }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted, PropType } from "vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    elements: { type: Array as PropType<Array<string>>, required: true },
    selected: Number,
  },

  setup(props: any, context: any) {
    const selectedIndex = ref<number>(0);
    const open = ref<Boolean>(false);
    const hoveredElement = ref<number | null>(null);

    onMounted(() => {
      if (props.selected) selectedIndex.value = props.selected;
    });

    function selectElement(index: number): void {
      selectedIndex.value = index;
      context.emit("selectedIndex", selectedIndex.value);
    }

    function getSelectedElement(): string | undefined {
      if (!props.elements) return undefined;
      return props.elements[selectedIndex.value];
    }

    function openDropDown() {
      document.body.addEventListener("click", checkClick);
      open.value = true;
      firstClick = false;
    }

    let firstClick = false;

    function checkClick(event: MouseEvent) {
      console.log("checking click");

      if (firstClick) {
        open.value = false;
        document.body.removeEventListener("click", checkClick);
        firstClick = false;
      }

      firstClick = true;
    }

    return {
      selectedIndex,
      open,
      hoveredElement,
      selectElement,
      getSelectedElement,
      openDropDown,
    };
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
}
</style>
