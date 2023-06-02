<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
    <v-list-item prepend-avatar="@/assets/images/hydroponic.png" title="Home" to="/" nav>
      <template v-slot:append>
        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="DashBoards" value="dashboards" to="/dashboard"></v-list-item>
      <v-list-item prepend-icon="mdi-chip" title="Device configuration" value="device" to="/device"></v-list-item>
      <v-list-item prepend-icon="mdi-database" title="Database configuration" value="database" to="/database"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="My Account" value="account" to="/account"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users" to="/users"></v-list-item>
      <v-list-item prepend-icon="mdi-cog-outline" title="Configuration" value="configuration" to="/configuration"></v-list-item>
      <v-list-item prepend-icon="mdi-help-circle-outline" title="Help" value="help" to="/help"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main style="height: 250px"></v-main>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        // { title: 'Home', icon: 'mdi-home-city', path: '/' },
        { title: 'DashBoards', icon: 'mdi-view-dashboard', path: '/dashboard' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      rail: true,
    }
  },
}
</script>