<template>
  <div class="header flex items-center justify-between">
    <p
      class="pl-2 dragabble flex items-center w-24"
      :class="{ 'w-full': !nextSubject }"
    >
      Organizer <span class="text-xs pl-2">version(0.0.1)</span>
    </p>
    <p
      class="text-alert text-xs dragabble w-full text-center"
      v-if="nextSubject"
    >
      Nächster Termin: {{ nextSubject.start }} - Fach: {{ nextSubject.name }}
    </p>
    <div class="flex items-center justify-evenly w-24">
      <button
        class="
          w-1/3
          text-xl text-center
          hover:bg-lightMode-light
          dark:hover:bg-darkMode-light
        "
        @click="minimize"
      >
        -
      </button>
      <button
        class="
          w-1/3
          text-xl text-center
          hover:bg-lightMode-light
          dark:hover:bg-darkMode-light
        "
        @click="maximize"
      >
        □
      </button>
      <button class="w-1/3 text-xl text-center hover:bg-alert" @click="close">
        x
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from "@vue/runtime-core";
import Subject from "@/store/interfaces/Subject";
import { calenderStore } from "@/store/calenderStore";

const version = ref<String>();
const nextSubject = ref<Subject | null>(calenderStore.getNextEvent());

watchEffect(() => {
  nextSubject.value = calenderStore.getNextEvent();
});

function close() {
  (window as any).WIN.close();
}
function minimize() {
  (window as any).WIN.minimize();
}
function maximize() {
  (window as any).WIN.maximize();
}

onMounted(() => {
  version.value = (window as any).app.getVersion();
});
</script>

<style scoped>
.dragabble {
  -webkit-app-region: drag;
}
</style>
