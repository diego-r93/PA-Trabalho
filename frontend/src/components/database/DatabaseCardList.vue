<template>
  <v-container class="container">
    <v-row>
      <v-col v-for="(device, index) in devices" :key="index" cols="6">
        <DatabaseCard :cardData="device"/>
      </v-col>
    </v-row>
    <v-btn
      fab
      dark
      class="btn-float"
      icon="mdi-plus"
      size="large"
      @click="addBoardFormIsVisible = true"
    >
    </v-btn>
  </v-container>
  <v-overlay v-model="addBoardFormIsVisible" class="d-flex align-center justify-center">
    <v-card class="text-center add-board-card">
      <v-form class="p-6" v-model="form">
      <v-text-field v-model="pumperCode" label="Pumper Code"></v-text-field>
      <v-text-field v-model="pumperName" label="Pumper Name"></v-text-field>
      <v-text-field v-model="pulseDuration" label="Pulse Duration"></v-text-field>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-btn block rounded="0" size="x-large" @click="addBoardFormIsVisible = false">Cancel</v-btn>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-btn block rounded="xs" size="x-large" :disabled="form">Submit</v-btn>
        </v-col>
      </v-row>
     
    </v-form>
    </v-card>
  </v-overlay>
</template>

<style scoped>
.container {
  min-height: 100vh;
  position: relative;
}
.btn-float {
  position: absolute;
  bottom: 0;
  margin-bottom: 15px;
  right: 0;
}

.v-card {
  padding: 16px;
}
</style>

<script>
import DatabaseCard from './DatabaseCard.vue'
import mongoDataService from "@/services/mongoDataService"
  export default {
    name: "DatabaseCardList",
    components: {
      DatabaseCard
    },
    data: () => ({
        devices: [],
        addBoardFormIsVisible: false,
        pumperCode: "",
        pumperName:"",
        pulseDuration:"",
        timeDrives: [],
        form: false
    }),
    methods: {
      showAddBoardForm() {
       
      }
    },
    created() {
      try {
        console.log(this.form)
        mongoDataService.getAllBoards().then((response) => {
          this.devices = response.data
        })
      } catch (error) {
        alert(error)
      }
    }
}
</script>