<template>
  <div class="dropdown">
    <Button @click="open = !open" :text="getSelectedElement()" />
    <ul v-if="open" class="absolute bg-lightMode-primary dark:bg-darkMode-primary rounded">
      <li 
        class="p-2 text-xs rounded" 
        v-for="(element, index) in elements" :key="index" 
        @click="selectElement(index)"
        @mouseover="hoveredElement = index"
        @mouseleave="hoveredElement = null"
        :class="{'bg-lightMode-accent dark:bg-darkMode-accent' : hoveredElement === index || selectedIndex === index}"
        >
        {{element}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { PropType } from 'vue';
import Button from "@/components/Button.vue";

export default {
  components:{
    Button
  },
  props: {
    elements: Array as PropType<Array<string>>
  },

  setup(props : any, context : any) {
    const selectedIndex = ref<number>(0);
    const open = ref<Boolean>(false);
    const hoveredElement = ref<number | null>(null);

    function selectElement(index : number) : void {
      open.value = false;
      selectedIndex.value = index;
      context.emit("selectedIndex", selectedIndex.value);
    }

    function getSelectedElement() : string | undefined{
      if(!props.elements) return undefined;
      return props.elements[selectedIndex.value];
    }

    return {
      selectedIndex,
      open,
      hoveredElement,
      selectElement,
      getSelectedElement
    };
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
}
</style>
