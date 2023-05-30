<template>
  <v-app theme="dark">
    <navigation-drawer></navigation-drawer>
    <default-bar />
    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import NavigationDrawer from './NavigationDrawer.vue'
  import DefaultView from './View.vue'
</script>
