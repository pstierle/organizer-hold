<template>
  <div
    class="header flex items-center justify-between bg-gray-300 dark:bg-gray-800 rounded"
  >
    <p
      class="pl-2 dragabble flex items-center w-24"
      :class="!getNextEvent() ? 'w-full' : ''"
    >
      Organizer <span class="text-xs pl-2">version(0.0.1)</span>
    </p>
    <button @click="reload" v-if="env === 'development'" class="text-xs">
      reload
    </button>
    <p
      class="text-alert text-xs dragabble w-full text-center"
      v-if="getNextEvent()"
    >
      Nächster Termin: {{ getNextEvent().start }} - Fach:
      {{ getNextEvent().name }}
    </p>
    <div class="flex items-center justify-evenly w-24">
      <button
        class="
          w-1/3
          text-xl text-center
          hover:bg-gray-200
          dark:hover:bg-gray-800
        "
        @click="minimize"
      >
        -
      </button>
      <button
        class="
          w-1/3
          text-xl text-center
          hover:bg-gray-200
          dark:hover:bg-gray-800
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
import { useCalender } from "@/store/useCalender";
import { ref, onMounted } from "@vue/runtime-core";
import { computed } from "vue";

const version = ref<String>();

const { getNextEvent } = useCalender();

function close() {
  (window as any).WIN.close();
}
function minimize() {
  (window as any).WIN.minimize();
}
function maximize() {
  (window as any).WIN.maximize();
}
function reload() {
  (window as any).WIN.reload();
}

const env = computed(() => process.env.NODE_ENV);

onMounted(() => {
  version.value = (window as any).app.getVersion();
});
</script>

<style scoped>
.dragabble {
  -webkit-app-region: drag;
}
</style>
