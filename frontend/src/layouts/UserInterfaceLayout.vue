<template>
  <v-main>
    <navigation-drawer></navigation-drawer>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import NavigationDrawer from '@/components/navigation/NavigationDrawer.vue'
</script>