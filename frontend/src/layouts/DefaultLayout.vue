<template>
  <v-app theme="dark" >
    <navigation-drawer></navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import NavigationDrawer from '@/components/navigation/NavigationDrawer.vue'
</script>