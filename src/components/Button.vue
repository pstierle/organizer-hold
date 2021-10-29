<template>
  <div
    class="
      container
      rounded
      outline-none
      px-2
      py-2
      text-xs
      flex
      items-center
      justify-between
    "
    :class="{
      'bg-alert': type === 'alert',
      'bg-success': type === 'success',
      'bg-lightMode-button dark:bg-darkMode-button': !type,
    }"
  >
    <Icon :icon="icon" class="w-4 pr-1" v-if="icon" />
    <p class="text-center select-none" v-if="text">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";

export default {
  components: {
    Icon,
  },
  props: {
    type: String,
    text: String,
    icon: String,
  },

  setup() {
    return {};
  },
};
</script>

<style scoped>
.container:hover {
  cursor: pointer;
}

div:hover {
  transform: scale(1.05);
  transition-duration: 200ms;
}
</style>
