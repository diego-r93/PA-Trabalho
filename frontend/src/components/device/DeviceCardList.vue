<template>
  <v-container class="py-16 px-16" fluid>
    <v-row>
      <v-col v-if="loading">
        <div class="text-center pt-16">
          <v-progress-circular :size="80" color="primary" indeterminate margin="auto"></v-progress-circular>
        </div>
      </v-col>
      <v-col v-else-if="!loading" v-for="device in devices" :key="device" cols="3">
        <DeviceCard :cardData="device" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeviceCard from '@/components/device/DeviceCard.vue'
import mqttDataService from '@/services/mqttDataService'

export default {
  name: "DeviceCardList",
  data: () => ({
    loading: true,
    devices: [],
  }),  
  created() {
    try {
      mqttDataService.getAll().then((response) => {
        const { devicesInformation } = response.data;

        this.devices = devicesInformation.map(device => ({
          host: device.host,
          ip: device.ip,
          mac: device.mac,
          rssi: device.rssi
        }));
        this.loading = false
      });

    } catch (error) {
      alert(error);
    }
  },
  components: { DeviceCard }
}
</script>