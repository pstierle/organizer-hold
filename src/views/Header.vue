<template>
  <div class="header flex items-center justify-between">
    <div class="dragabble w-full">
      <p class="pl-2">Organizer <span class="text-xs">version(0.0.1)</span></p>
      <p class="text-alert text-xs" v-if="nextSubject">
        Nächster Termin: {{ nextSubject.start }} - Fach: {{ nextSubject.name }}
      </p>  
    </div>    
    <div class="flex items-center justify-evenly w-24">
      <button class="w-1/3 text-xl text-center hover:bg-lightMode-light dark:hover:bg-darkMode-light" @click="minimize">-</button>
      <button class="w-1/3 text-xl text-center hover:bg-lightMode-light dark:hover:bg-darkMode-light" @click="maximize">□</button>
      <button class="w-1/3 text-xl text-center hover:bg-alert" @click="close">x</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "@vue/runtime-core";
import Subject from "@/store/interfaces/Subject";
import { calenderStore } from '@/store/calenderStore';

export default {
  setup() {
    const version = ref<String>();
    const nextSubject = ref<Subject | null>(calenderStore.getNextEvent());

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

    return {
      version,
      nextSubject,
      close,
      minimize,
      maximize,
    };
  },
};
</script>

<style scoped>
.dragabble {
  -webkit-app-region: drag;
}
</style>
