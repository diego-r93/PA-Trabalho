<template>
  <v-navigation-drawer v-model="drawer" :rail="rail">
    <v-list-item prepend-avatar="@/assets/images/hydroponic.png" title="Home" value="home" href="/" nav></v-list-item>

    <v-list density="compact" nav>
      <v-list-item v-for="item in items" :key="item.value" :prepend-icon="item.icon" :title="item.title"
        :value="item.value" :to="item.path" @click="selectItem(item.value)"></v-list-item>
    </v-list>

    <v-list-item class="drawer-toggle-button">
      <template v-slot:append>
        <v-btn v-if="rail === true" variant="text" icon="mdi-chevron-right" @click.stop="rail = !rail"></v-btn>
        <v-btn v-else-if="rail !== true" variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <template v-slot:append>      
        <v-list-item prepend-icon="mdi-cog-outline" title="Configuration" value="configuration"
          to="/configuration"></v-list-item>
        <v-list-item prepend-icon="mdi-help-circle-outline" title="Help" value="help" to="/help"></v-list-item>
        <v-list-item prepend-icon="mdi mdi-logout" title="Logout" value="logout" @click.stop="logoutUser"></v-list-item>     
    </template>

  </v-navigation-drawer>
</template>

<script>
import router from '@/router'
import { logout } from '@/services/auth'

export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: 'DashBoards', icon: 'mdi-view-dashboard', value: "dashboards", path: '/dashboard' },
        { title: 'Device configuration', icon: 'mdi-chip', value: "device", path: '/device' },
        { title: 'Database configuration', icon: 'mdi-database', value: "database", path: '/database' },
        { title: 'My Account', icon: 'mdi-account', value: "account", path: '/account' },
      ],
      rail: true,
      selectedItem: 'dashboard',
    }
  },
  methods: {
    selectItem(itemValue) {
      this.selectedItem = itemValue
    },
    logoutUser() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('expiration')
      localStorage.removeItem('userId')
      logout()
      router.push('/login')
    },
  },
}
</script>

<style scoped>
.drawer-toggle-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -16px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>