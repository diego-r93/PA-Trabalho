<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="12">
        <div class="text-h4 mb-0">Tomatoes</div>
        <div class="text-overline">version 1.0</div>
      </v-col>

      <v-col cols="12" >
        <div class="text-h7">
          Smart Greenhouse Control App. <br>
          Functions: Monitoring, control, and management of greenhouse. <br>
          Temperature adjustment, humidity and irrigation control. <br>
          Alert reception and remote access.<br>
        </div>
      </v-col>

      <v-col cols="12" >
        <div class="text-overline mb-1">
          Instructions about how to run and test the application can be found 
          <a href="https://github.com/diego-r93/pa-trabalho1" target="_blank">{{ "HERE" }}</a>.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'

export default {
  methods: {
    navegateSettings() {
      router.push('/device')
    },
    
    navegateUser() {
    router.push('/account')
    },

    navegateDatabase() {
    router.push('/database')
    },
  }
}
</script>