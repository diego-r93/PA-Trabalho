<template>
  <v-container class="py-16 px-16" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto" max-width="600">
          <v-toolbar color="indigo">
            <v-btn icon="mdi-menu"></v-btn>

            <v-toolbar-title>Settings</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon="mdi-magnify"></v-btn>
          </v-toolbar>

          <v-list lines="three">
            <v-list-subheader>User Controls</v-list-subheader>

            <v-list-item>
              <v-list-item-title>Content filtering</v-list-item-title>

              <v-list-item-subtitle>
                Set the content filtering level to restrict appts that can be downloaded
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Password</v-list-item-title>

              <v-list-item-subtitle>
                Require password for purchase or use password to restrict purchase
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list lines="three" select-strategy="classic">
            <v-list-subheader>General</v-list-subheader>

            <v-list-item value="theme">
              <v-btn prepend-icon="mdi-circle-half-full" variant="tonal"> 
                Alterar Tema
              </v-btn>            
            </v-list-item>

            <v-list-item value="timezone">
              <v-select :items="locations"  label="Timezone"></v-select>
            </v-list-item>
  
            <v-list-item value="notifications">
              <template v-slot:prepend="{ isActive }">

                <v-list-item-action start>
                  <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                </v-list-item-action>
              </template>

              <v-list-item-title>Notifications</v-list-item-title>

              <v-list-item-subtitle>
                Notify me about updates to apps or games that I downloaded
              </v-list-item-subtitle>
            </v-list-item>


            <v-list-item value="sound">
              <template v-slot:prepend="{ isActive }">
                <v-list-item-action start>
                  <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                </v-list-item-action>
              </template>

              <v-list-item-title>Sound</v-list-item-title>

              <v-list-item-subtitle>
                Auto-update apps at any time. Data charges may apply
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item value="widgets">
              <template v-slot:prepend="{ isActive }">
                <v-list-item-action start>
                  <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                </v-list-item-action>
              </template>

              <v-list-item-title>Auto-add widgets</v-list-item-title>

              <v-list-item-subtitle>
                Automatically add home screen widgets when downloads complete
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>

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
}

</script>