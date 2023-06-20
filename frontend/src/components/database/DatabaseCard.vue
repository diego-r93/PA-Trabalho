<template>
  <v-card>
    <v-container class="buttons-container">
      <v-btn class="delete-btn" @click="deleteOverlay = true">X</v-btn>
      <v-btn class="edit-btn" @click="editOverlay = true" icon="mdi-pencil" size="x-small"></v-btn>
    </v-container>

    <v-list>
      <v-list-item>
        <v-list-item-title>{{ cardData.pumperCode }} / {{ cardData.pumperName }} </v-list-item-title>
        <v-divider class="device-card-divider"></v-divider>

        <v-list-item-subtitle class="device-property">
          <v-icon>mdi-circle-small</v-icon>
          Pulse Time: {{ cardData.pulseDuration }}
        </v-list-item-subtitle>

        <v-list-item-subtitle class="device-property">
          <v-icon>mdi-circle-small</v-icon>
          Created At: {{ cardData.createdAt }}
        </v-list-item-subtitle>

        <v-list-item-subtitle class="device-property">
          <v-icon>mdi-circle-small</v-icon>
          Updated At: {{ cardData.updatedAt }}
        </v-list-item-subtitle>

        <v-expansion-panels variant="default">
          <v-expansion-panel title="Drive Times">
            <v-expansion-panel-text>
              <v-list v-if="hasDriveTimes">
                <v-list-item v-for="driveTime in cardData.driveTimes" :key="driveTime">
                  <v-list-item-subtitle>
                    <v-icon>mdi-square-small</v-icon>
                    Time: {{ driveTime.time }}/ State:{{ driveTime.state }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list-item>
    </v-list>
  </v-card>
  <v-overlay v-model="deleteOverlay" class="d-flex align-center justify-center">
    <v-card class="text-center delete-confirmation-card">
      <v-card-title>
        Are you sure you want to delete this board?
      </v-card-title>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="12" sm="6" md="4">
          <v-btn block rounded="0" size="x-large" @click="deleteOverlay = false" color="red">No</v-btn>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-btn block rounded="xs" size="x-large" @click="deleteBoard" color="green">Yes</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-overlay>
  <v-overlay v-model="editOverlay" class="d-flex align-center justify-center">
    <v-card class="text-center edit-board-card">
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
            <v-btn class="add-drive-time-btn" @click="addDriveTime">Add <br> Drive Time</v-btn>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-btn class="add-drive-time-btn" @click="removeDriveTime">Remove <br>Drive Time</v-btn>
          </v-col>
        </v-row>

        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" sm="6" md="4">
            <v-btn block rounded="0" size="x-large" @click="editOverlay = false">Cancel</v-btn>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-btn :loading="loading" block rounded="xs" size="x-large"
              :disabled="this.pumperCode.length === 0 || this.pumperName.length === 0 || this.pulseDuration.length === 0"
              @click="editBoard">Submit</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-overlay>
</template>

<script>
import mongoDataService from "@/services/mongoDataService"
export default {
  name: 'DatabaseCard',
  props: {
    cardData: Object
  },
  methods: {
    editBoard() {
      mongoDataService.updateBoard(this.cardData.id, {
        pumperCode: this.pumperCode,
        pumperName: this.pumperName,
        pulseDuration: this.pulseDuration,
        driveTimes: this.driveTimes
      }).then(() => {
        alert("Board successfuly updated!")
        window.location.reload()
      })
    },
    methods: {
        editBoard() {
          mongoDataService.updateBoard(this.cardData.id, {
            pumperCode: this.pumperCode,
            pumperName: this.pumperName,
            pulseDuration: this.pulseDuration,
            driveTimes: this.driveTimes
          }, localStorage.accessToken).then(() => {
            alert("Board successfuly updated!")
            window.location.reload()
          })
        },
        deleteBoard() {
          mongoDataService.deleteBoard(this.cardData.id, localStorage.accessToken).then(() => {
            alert("Board successfully deleted!")
            window.location.reload();
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
  data() {
    return {
      deleteOverlay: false,
      editOverlay: false,
      pumperCode: "",
      pumperName: "",
      pulseDuration: "",
      driveTimes: [],
      form: false,
      loading: false
    }
  },
  created() {
    this.pumperCode = this.cardData.pumperCode;
    this.pumperName = this.cardData.pumperName;
    this.pulseDuration = this.cardData.pulseDuration;
    this.driveTimes = this.cardData.driveTimes;
    console.log("dkgnosngosgo")
  },
  computed: {
    hasDriveTimes() {
      return this.cardData.driveTimes.length > 0;
    }
  }
};
</script>

<style scoped>
.device-property {
  margin-bottom: 2px;
}

.device-card-divider {
  margin-bottom: 10px;
}

.v-card {
  position: relative
}

.delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  box-shadow: none;
}

.edit-btn {
  position: absolute;
  top: 0;
  right: left;
  z-index: 1;
  box-shadow: none;
}

.delete-confirmation-card {
  padding: 50px;
  width: 80vh;
}

.edit-board-card {
  padding: 20px;
  width: 80vh;
}
</style>