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
          Functions: Monitoring, control, and management of greenhouse <br>
          Temperature adjustment, humidity and irrigation control. <br>
          Alert reception and remote access.<br>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-card class="left" variant="default">
          <div class="text-overline mb-1">Change Device Settings</div>
          <v-btn @click="navegateSettings" color="success" size="large" type="submit" variant="elevated" class="mb-5">
            Devices
          </v-btn>
          
          <div class="text-overline mb-1">Change User Preferences</div>
          <v-btn @click="navegateUser" color="success" size="large" type="submit" variant="elevated" class="mb-5">
            User
          </v-btn>
          
          <div class="text-overline mb-1">Change Database Configuration</div>
          <v-btn @click="navegateDatabase" color="success" size="large" type="submit" variant="elevated" class="mb-5">
            Database
          </v-btn>
        </v-card>
      </v-col>
 
      <v-col cols="6" >  
        <v-card class="left"  max-width="600" variant="outlined">
          <v-card-item>
            <div class="text-overline mb-1">GITHUB PAGE</div>
            <div class="text-h6 mb-1">    
              <a href="https://github.com/diego-r93/pa-trabalho1">{{ "github.com/diego-r93/pa-trabalho1" }}</a>  
            </div>
          </v-card-item>

          <v-card-item>
            <div class="text-overline mb-1">IMPORTANT LINKS</div>
            <div class="text-h6 mb-1">
              <a href="https://vuejs.org/">{{ "Vue.js" }}</a>
            </div>
          </v-card-item>
          
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">
                <a href="https://vuetifyjs.com/en/">{{ "Vuetify" }}</a>
              </div>
            </div>
          </v-card-item>
          
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">
                <a href="https://firebase.google.com/">{{ "Firebase" }}</a>
              </div>
            </div>
          </v-card-item>

          <v-card-item>
            <div>
              <div class="text-h6 mb-1">
                <a href="https://www.mongodb.com/">{{ "MongoDB" }}</a>
              </div>       
            </div>
          </v-card-item>
        </v-card>
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