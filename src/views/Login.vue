<template>
  <div class="flex justify-center">
    <ManageUser label="Registrieren" @submit="register" />
  </div>
</template>

<script lang="ts" setup>
import { useUser } from "@/store/useUser";
import ManageUser from "@/components/ManageUser.vue";

const { register } = useUser();
</script>
