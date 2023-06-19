<template>
  <v-container class="py-16 px-16" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto" max-width="600">
          <v-toolbar color="dark">
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list lines="three" select-strategy="classic">
            <v-list-subheader>General</v-list-subheader>

            <v-list-item value="theme">
              <p>Current theme: {{ theme }}</p>
              <v-btn prepend-icon="mdi-circle-half-full" variant="tonal" @click="changeTheme"> 
                Change Theme
              </v-btn>            
            </v-list-item>

            <v-list-item value="timezone">
              <v-select :items="locations"  label="Timezone"></v-select>
            </v-list-item>
  
            <v-list-item value="sidebar">
              <template v-slot:prepend="{ isActive }">

                <v-list-item-action start>
                  <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                </v-list-item-action>
              </template>

              <v-list-item-title>Hide sidebar</v-list-item-title>

              <v-list-item-subtitle>
                Hide or show items on sidebar menu 
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item value="sound">
              <template v-slot:prepend="{ isActive }">
                <v-list-item-action start>
                  <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                </v-list-item-action>
              </template>

              <v-list-item-title>Sound On</v-list-item-title>

              <v-list-item-subtitle>
                Turn on/off sound effects in application
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAuthStore } from '@/services/userConfiguration'

export default {
  data: () => ({
    locations: [
      'GMT-03:00',
      'GMT-02:00',
      'GMT-01:00',
      'GMT+00:00',
      'GMT+01:00',
      'GMT+02:00',
      'GMT+03:00',
    ]  
  }),
  computed: {
    theme() {
      return useAuthStore().theme;
    }
  },
  methods: {
    changeTheme() {
      const store = useAuthStore();
      store.theme = store.theme === 'dark' ? 'light' : 'dark';     
      localStorage.setItem('theme', store.theme);
    }
  },    
}
</script>