<template>
  <img
    :src="src"
    :alt="alt"
    :class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
    class="icon"
  />
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { userStore } from "@/store/userStore";
export default {
  props: {
    src: String,
    alt: String,
  },

  setup() {
    const darkMode = ref<Boolean>(userStore.darkMode());

    onMounted(() => {
      console.log(require("@/assets/img/right.svg"));
    });

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
.dark-icon {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg)
    brightness(102%) contrast(102%);
}

.light-icon {
  filter: invert(0%) sepia(99%) saturate(34%) hue-rotate(56deg) brightness(89%)
    contrast(76%);
}
</style>
