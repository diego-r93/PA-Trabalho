<template>
  <v-app theme="dark">
    <navigation-drawer></navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <router-view />
</template>

<script setup>
import NavigationDrawer from './NavigationDrawer.vue'
</script>
