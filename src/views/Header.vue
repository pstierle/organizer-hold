<template>
  <div
    class="flex items-center justify-between bg-gray-400 dark:bg-zinc-900 rounded-t px-2 py-1"
  >
    <div class="dragabble w-full flex items-center">
      <div class="flex items-end gap-1">
        <p>Organizer</p>
        <p class="text-xs">version(0.0.1)</p>
      </div>
      <p class="text-red-400 text-xs ml-20" v-if="nextSubjectToday">
        Nächste Vorlesung: {{ nextSubjectToday.start }} - Fach:
        {{ nextSubjectToday.name }}
      </p>
    </div>

    <div class="flex items-center justify-evenly gap-2">
      <div
        v-if="env === 'development'"
        class="text-xs flex items-start gap-1 mr-2"
      >
        <button @click="openDevTools">devtools</button>
        <button @click="reload">reload</button>
      </div>
      <button
        @click="minimize"
        class="rounded-full bg-yellow-400 w-3 h-3 flex items-center justify-center border border-yellow-500"
      >
        <MinusSmIcon class="opacity-0 hover:opacity-100 transition" />
      </button>
      <button
        @click="maximize"
        class="rounded-full bg-green-400 w-3 h-3 flex items-center justify-center border border-green-500"
      >
        <ArrowsExpandIcon class="opacity-0 hover:opacity-100 transition" />
      </button>
      <button
        @click="close"
        class="rounded-full bg-red-400 w-3 h-3 flex items-center justify-center border border-red-500"
      >
        <XIcon class="opacity-0 hover:opacity-100 transition w-3/4" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCalender } from "@/store/useCalender";
import { ref, onMounted } from "@vue/runtime-core";
import { computed } from "vue";
import { XIcon, ArrowsExpandIcon, MinusSmIcon } from "@heroicons/vue/outline";

const version = ref<String>();

const { nextSubjectToday } = useCalender();

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
function openDevTools() {
  (window as any).WIN.openDevTools();
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
