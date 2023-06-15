<template>
  <v-card prepend-icon="mdi-chip">
    <template v-slot:title>
      {{ cardData.host }}
    </template>
    <v-list lines="one" class="py-2 px-2">
     
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Hostname</v-list-item-title>
            <v-list-item-subtitle>{{ cardData.host }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>IP</v-list-item-title>
            <v-list-item-subtitle>{{ cardData.ip }}</v-list-item-subtitle>
          </v-list-item-content></v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>MAC Address</v-list-item-title>
            <v-list-item-subtitle>{{ cardData.mac }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>RSSI</v-list-item-title>
            <v-list-item-subtitle>{{ cardData.rssi }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
     

      <v-divider class="mt-4"></v-divider>
      <v-list class="py-4 px-6">
        <v-switch v-model="gpio.IO21" label="IO21" color="indigo" hide-details></v-switch>
        <v-switch v-model="gpio.IO19" label="IO19" color="indigo" hide-details></v-switch>
        <v-switch v-model="gpio.IO18" label="IO18" color="indigo" hide-details></v-switch>
        <v-switch v-model="gpio.IO05" label="IO05" color="indigo" hide-details></v-switch>
      </v-list>
    </v-list>
  </v-card>
</template>

<script>
import mqttDataService from '@/services/mqttDataService'

export default {
  name: 'DeviceCard',
  props: {
    cardData: Object
  },
  data() {
    return {
      gpio: {
        IO21: false,
        IO19: false,
        IO18: false,
        IO05: false
      },
      gpioMapping: {
        IO21: '21',
        IO19: '19',
        IO18: '18',
        IO05: '5'
      }
    }
  },
  watch: {
    gpio: {
      deep: true,
      handler(newValue) {
        this.updateGpio(newValue)
      }
    }
  },
  methods: {
    updateGpio(gpioData) {
      const payload = {}

      for (const key in gpioData) {
        const gpioValue = gpioData[key]
        const gpioNumber = this.gpioMapping[key]

        payload[gpioNumber] = gpioValue
      }

      // Chame o método updateGpio do mqttDataService
      mqttDataService.updateGpio(this.cardData.host, payload)
        .then(() => {
          // Lógica adicional após a atualização do GPIO, se necessário
        })
        .catch(error => {
          console.error('Erro ao atualizar o GPIO:', error)
        })
    }
  }
}
</script>