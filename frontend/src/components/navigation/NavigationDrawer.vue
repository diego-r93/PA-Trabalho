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

    <v-list nav>
      <template v-slot:append>
        
      </template>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: 'DashBoards', icon: 'mdi-view-dashboard', value: "dashboards", path: '/dashboard' },
        { title: 'Device configuration', icon: 'mdi-chip', value: "device", path: '/device' },
        { title: 'Database configuration', icon: 'mdi-database', value: "database", path: '/database' },
        { title: 'My Account', icon: 'mdi-account', value: "account", path: '/account' },
        { title: 'Users', icon: 'mdi-account-group-outline', value: "users", path: '/users' },
        { title: 'Configuration', icon: 'mdi-cog-outline', value: "configuration", path: '/configuration' },
        { title: 'Help', icon: 'mdi-help-circle-outline', value: "help", path: '/help' },
      ],
      rail: true,
      selectedItem: 'dashboard',
    }
  },
  methods: {
    selectItem(itemValue) {
      this.selectedItem = itemValue;
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
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
  cursor: pointer;
}
</style>