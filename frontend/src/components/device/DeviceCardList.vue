<template>
  <v-container class="py-16 px-16" fluid>
    <v-row>
      <v-col v-for="device in devices" :key="device" cols="4">
         <DeviceCard :cardData="device"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeviceCard from './DeviceCard.vue'
import mongoDataService from "@/services/mongoDataService"
  export default {
    name: "DeviceCardList",
    data: () => ({
        devices: [],
    }),
    created() {
      try {
        mongoDataService.getAllBoards().then((response) => {
          this.devices = response.data.map(device => {
            device.driveTimes = [
              {"time": "00:00:00", "state": true},
              {"time": "00:01:00", "state": true},
              {"time": "00:02:00", "state": true}
            ]
            return device
          })
        })
      } catch (error) {
        alert(error)
      }
    },
    components: { DeviceCard }
}
</script>