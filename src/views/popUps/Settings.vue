<template>
  <div class="flex justify-between items-center">
    <p>DarkMode</p>
    <input type="checkbox" v-model="userDarkModeSelection" />
  </div>
</template>

<script lang="ts">
import { userStore } from "@/store/userStore";
import { ref, watchEffect } from "vue";

export default {
  setup() {
    const userDarkModeSelection = ref<Boolean>(userStore.darkMode());

    watchEffect(() => {
      userStore.setDarkMode(userDarkModeSelection.value);
    });

    return {
      userDarkModeSelection,
    };
  },
};
</script>

<style scoped>
</style>

