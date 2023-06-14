<template>
    <v-card>
    <v-list lines="two">
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
</template>

<script>
    export default {
      name: 'DatabaseCard',
      props: {
          cardData: Object
      },
      methods: {
          submitCard() {
          // Submit card data to the backend
          },
      },
      computed: {
        hasDriveTimes() {
          return this.cardData.driveTimes.length > 0 ;
        }
      }
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