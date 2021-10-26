<template>
  <div
    class="
      rounded
      outline-none
      px-2
      py-2
      text-center text-xs
      flex
      items-center
      justify-evenly
    "
    :class="{
      'bg-alert': type === 'alert',      
      'bg-success': type === 'success',
      'bg-lightMode-button dark:bg-darkMode-button': type === undefined,
    }"
  >
    <img
      src="../assets/img/bin.svg"
      alt="bin"
      :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
      class="w-4 pr-1"
      v-if="icon === 'Bin'"
    />
    <img
      src="../assets/img/edit.svg"
      alt="bin"
      :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
      class="w-4 pr-1"
      v-if="icon === 'Edit'"
    />
    <img
      src="../assets/img/plus.svg"
      alt="plus"
      :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
      class="w-5 pr-1"
      v-if="icon === 'Plus'"
    />
    <img
      src="../assets/img/ticked.svg"
      alt="plus"
      :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
      class="w-5 pr-1"
      v-if="icon === 'Ticked'"
    />
    <img
      src="../assets/img/unticked.svg"
      alt="plus"
      :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
      class="w-5 pr-1"
      v-if="icon === 'Unticked'"
    />
    <p class="text-center select-none">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { userStore } from "@/store/userStore";
import { ref, watchEffect } from "vue";
export default {
  props: {
    text: String,
    type: String,
    icon: { type: String, default: undefined },
  },

  setup() {
    const darkMode = ref<Boolean>(userStore.darkMode());

    watchEffect(() => {
      darkMode.value = userStore.darkMode();
    });

    return {
      darkMode,
    };
  },
};
</script>

<style scoped>
div:hover {
  transform: scale(1.05);
  transition-duration: 200ms;
}
</style>
