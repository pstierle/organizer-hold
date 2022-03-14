<template>
  <div class="pop-up z-10" v-if="openModal != undefined">
    <div class="content bg-gray-200 dark:bg-gray-700 rounded">
      <div
        class="header flex justify-between bg-gray-300 dark:bg-gray-800 p-1 rounded-t"
      >
        <p class="text-xl">{{ openModal }}</p>
        <Icon
          icon="XCircleIcon"
          class="w-6 hover:text-red-500"
          @click="close"
        />
      </div>
      <div class="main p-2">
        <div v-if="openModal === 'Einstellungen'">
          <Settings />
        </div>
        <div v-if="openModal === 'Fach hinzufügen'">
          <AddSubject />
        </div>
        <div v-if="openModal === 'Bearbeiten'">
          <EditSubject />
        </div>
        <div v-if="openModal === 'Löschen'">
          <DeleteSubject />
        </div>
        <div v-if="openModal === 'Übungsblatt hinzufügen'">
          <AddExcerciseSheet />
        </div>
        <div v-if="openModal === 'Kalender Importieren'">
          <ImportCalender />
        </div>
        <div
          v-if="
            openModal === 'Abgabe' ||
            openModal === 'Lösungen' ||
            openModal === 'Korrektur'
          "
        >
          <Submission :submissionType="openModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Settings from "@/views/modal/Settings.vue";
import AddSubject from "@/views/modal/AddSubject.vue";
import DeleteSubject from "@/views/modal/DeleteSubject.vue";
import AddExcerciseSheet from "@/views/modal/AddExcerciseSheet.vue";
import ImportCalender from "@/views/modal/ImportCalender.vue";
import Submission from "@/views/modal/Submission.vue";
import EditSubject from "./modal/EditSubject.vue";
import Icon from "@/components/Icon.vue";
import { useSettings } from "@/store/useSettings";

const { openModal } = useSettings();

function close() {
  openModal.value = null;
}
</script>

<style scoped>
.pop-up {
  position: absolute !important;
  background-color: rgba(0, 0, 0, 0.548);
  backdrop-filter: blur(1px);
  width: 100%;
  height: 100%;
  animation: fadeIn 200ms forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 100;
  }
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 280px;
  animation: popIn 250ms forwards;
}

@keyframes popIn {
  from {
    margin-top: 100%;
  }
  to {
    margin-top: 0%;
  }
}
</style>
