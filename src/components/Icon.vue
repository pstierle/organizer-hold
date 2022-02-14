<template>
	<img
		:src="require(`@/assets/img/${icon}.svg`)"
		:alt="icon"
		:class="{ 'light-icon': !darkMode, 'dark-icon': darkMode }"
	/>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { userStore } from "@/store/userStore";

defineProps<{
	icon: string;
}>();

const darkMode = ref<boolean>(userStore.darkMode());

watchEffect(() => {
	darkMode.value = userStore.darkMode();
});
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
