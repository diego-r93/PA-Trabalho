<template>
    <v-card>
    <v-list lines="two">
        <v-list-item>
          <v-list-item-title>{{ cardData.pumperCode }} / {{ cardData.pumperName }} </v-list-item-title>
          <v-divider class="device-card-divider"></v-divider>

          <v-list-item-subtitle class="device-data device-property">
            <v-list-item-icon>
                <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Pulse Time: {{ cardData.pulseDuration }}
          </v-list-item-subtitle>

          <v-list-item-subtitle class="device-data device-property">
            <v-list-item-icon>
                <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Created At: {{ cardData.createdAt }}
          </v-list-item-subtitle>

          <v-list-item-subtitle class="device-data device-property">
            <v-list-item-icon>
                <v-icon>mdi-circle-small</v-icon>
            </v-list-item-icon>
            Updated At: {{ cardData.updatedAt }}
          </v-list-item-subtitle>   
        </v-list-item>          
      
    </v-list>
  </v-card>
</template>

<script>
    export default {
    name: 'DeviceCard',
    props: {
        cardData: Object
    },
    methods: {
        submitCard() {
        // Submit card data to the backend
        },
    },
    };
</script>

<style>
  .device-property {
    margin-bottom: 2px;
  }
  .device-card-divider {
    margin-bottom: 10px;
  }
</style>