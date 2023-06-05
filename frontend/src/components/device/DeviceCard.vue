<template>
  <v-container class="py-16 px-16" fluid>
    <v-row>
      <v-col v-for="device in devices" :key="device" cols="4">
        <v-card>
          <v-list lines="two">
            <v-list-subheader>{{ card }}</v-list-subheader>
            
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="grey-darken-1"></v-avatar>
                </template>

                <v-list-item-title>mDNS: {{ device.mdns }}</v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-title>IP: {{ device.src }}</v-list-item-title>

                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
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
    devices: [
      { mdns: 'esp32-015010', src: 'http://192.168.1.2', flex: 4 },
      { mdns: 'esp32-C30B7C', src: 'http://192.168.1.3', flex: 4 },
    ],
  }),
}
</script>