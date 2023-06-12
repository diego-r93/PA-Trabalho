<template>
  <v-app :theme="theme">
    <component :is="currentLayout" v-if="isRouterLoaded">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import AuthLayout from "@/layouts/AuthLayout.vue"
import UserInterfaceLayout from "@/layouts/UserInterfaceLayout.vue"

// Importado do Pinia
import { useAuthStore } from '@/services/userConfiguration'

// Importado do Pinia
const authStore = useAuthStore()
let theme = authStore.theme

const route = useRoute();


const isRouterLoaded = computed(() => {
  return route.name !== null ? true : false
})

const layouts = {
  default: DefaultLayout,
  auth: AuthLayout,
  ui: UserInterfaceLayout,
}

const currentLayout = computed(() => {
  const layoutName = route.meta.layout
  if (!layoutName) {
    return DefaultLayout
  }
  return layouts[layoutName]
})
</script>

