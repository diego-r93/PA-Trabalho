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
      <v-card-title>
        Add a new board
      </v-card-title>
      <v-form class="p-6" v-model="form">
        <v-text-field v-model="pumperCode" label="Pumper Code" :rules="[required]"></v-text-field>
        <v-text-field v-model="pumperName" label="Pumper Name" :rules="[required]"></v-text-field>
        <v-text-field type="number" v-model="pulseDuration" label="Pulse Duration" :rules="[required]"></v-text-field>
        
        <v-virtual-scroll :height="300" :items="this.driveTimes">
        <template v-slot:default="{ item }">
          <v-container>
              <v-divider></v-divider>
            </v-container>
              <v-text-field v-model="item.time" label="Time"></v-text-field>
              <v-checkbox v-model="item.state" label="State = true"></v-checkbox>
        </template>
        </v-virtual-scroll>

        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" sm="6" md="4">
            <v-btn  class="add-drive-time-btn" @click="addDriveTime">Add <br> Drive Time</v-btn>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-btn class="add-drive-time-btn" @click="removeDriveTime">Remove <br>Drive Time</v-btn>
          </v-col>
        </v-row>

        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" sm="6" md="4">
            <v-btn block rounded="0" size="x-large" @click="addBoardFormIsVisible = false">Cancel</v-btn>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-btn :loading="loading" block rounded="xs" size="x-large" @click="addNewBoard" :disabled="this.pumperCode.length === 0 || this.pumperName.length === 0 || this.pulseDuration.length === 0">Submit</v-btn>
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

.add-board-card {
  padding: 20px;
  width: 80vh;
}

.add-drive-time-btn {
  margin-bottom: 10px
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
        driveTimes: [],
        form: false,
        loading:false
    }),
    methods: {
      addNewBoard() {
        this.loading=true
        mongoDataService.createBoard({
          pumperCode: this.pumperCode,
          pumperName: this.pumperName,
          pulseDuration: this.pulseDuration,
          driveTimes: this.driveTimes,
        }, localStorage.accessToken).then(response => {
        alert("Nova placa adicionada com sucesso!")
        this.loading=false
        window.location.reload()
        })
      },
      addDriveTime() {
        this.driveTimes.push({
          time: "",
          state: false,
        });
        console.log(this.driveTimes)
      },
      removeDriveTime() {
        this.driveTimes.pop()
      },
      required(v) {
        return !!v || 'Field is required'
      }
    },
    created() {
      try {
        mongoDataService.getAllBoards(localStorage.accessToken).then((response) => {
          this.devices = response.data
        })
      } catch (error) {
        alert(error)
      }
    }
}
</script>