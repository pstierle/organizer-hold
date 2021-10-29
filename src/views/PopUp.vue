<template>
  <div class="pop-up z-10" v-if="openPopUp != undefined">
    <div class="content bg-lightMode-primary dark:bg-darkMode-primary rounded">
      <div
        class="
          header
          flex
          justify-between
          bg-lightMode-secondary
          dark:bg-darkMode-secondary
          p-1
          rounded-t
        "
      >
        <p class="text-xl">{{ openPopUp }}</p>
        <Icon
          icon="close"
          class="w-6"
          @click="close"
          @mouseover="closeHover = true"
          @mouseout="closeHover = false"
          :class="{ 'close-hover': closeHover }"
        />
      </div>
      <div class="main p-2">
        <div v-if="openPopUp === 'Einstellungen'">
          <Settings />
        </div>
        <div v-if="openPopUp === 'Fach hinzufügen'">
          <AddSubject />
        </div>
        <div v-if="openPopUp === 'Bearbeiten'">
          <EditSubject />
        </div>
        <div v-if="openPopUp === 'Löschen'">
          <DeleteSubject />
        </div>
        <div v-if="openPopUp === 'Übungsblatt hinzufügen'">
          <AddExcerciseSheet />
        </div>
        <div v-if="openPopUp === 'Kalender Importieren'">
          <ImportCalender />
        </div>
        <div
          v-if="
            openPopUp === 'Abgabe' ||
            openPopUp === 'Lösungen' ||
            openPopUp === 'Korrektur'
          "
        >
          <Submission :submissionType="openPopUp" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { userStore } from "@/store/userStore";
import { ref, watchEffect } from "vue";
import PopUps from "@/store/interfaces/PopUps";
import Settings from "@/views/popUps/Settings.vue";
import AddSubject from "@/views/popUps/AddSubject.vue";
import DeleteSubject from "@/views/popUps/DeleteSubject.vue";
import AddExcerciseSheet from "@/views/popUps/AddExcerciseSheet.vue";
import ImportCalender from "@/views/popUps/ImportCalender.vue";
import Submission from "@/views/popUps/Submission.vue";
import EditSubject from "./popUps/EditSubject.vue";
import Icon from "@/components/Icon.vue";

export default {
  components: {
    Settings,
    AddSubject,
    DeleteSubject,
    AddExcerciseSheet,
    Submission,
    ImportCalender,
    EditSubject,
    Icon,
  },
  setup() {
    const openPopUp = ref<PopUps | undefined>(userStore.getOpenPopUp());
    const closeHover = ref<boolean>(false);

    watchEffect(() => {
      openPopUp.value = userStore.getOpenPopUp();
    });

    function close() {
      closeHover.value = false;
      userStore.setOpenPopUp(null);
    }

    return {
      openPopUp,
      closeHover,
      close,
    };
  },
};
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

.close-hover {
  filter: invert(32%) sepia(35%) saturate(3969%) hue-rotate(340deg)
    brightness(100%) contrast(87%);
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

