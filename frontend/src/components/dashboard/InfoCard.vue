<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" prepend-icon="mdi-home">
          <template v-slot:title>
            DashBoard
          </template>
          <v-card-text>
            content
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="mx-auto">
          <v-card-title>Photos</v-card-title>
          <v-container fluid>
            <v-row dense>
              <v-col v-for="card in secondCards" :key="card.title" :cols="card.flex">
                <v-card>
                  <v-img
                    :src="card.src"
                    class="align-begin"
                    gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    cover
                  >
                    <v-card-title class="text-white" v-text="card.title"></v-card-title>
                  </v-img>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

                    <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

                    <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="mx-auto">
          <v-card-item title="Historical Data">
            <template v-slot:subtitle>
              <v-icon
                icon="mdi-alert"
                size="18"
                color="error"
                class="me-1 pb-1"
              ></v-icon>

              Extreme Weather Alert
            </template>
          </v-card-item>

          <v-card-text class="py-0">
            <v-row align="center" no-gutters>
              <v-col
                class="text-h2"
                cols="6"
              >
                64&deg;F
              </v-col>

              <v-col cols="6" class="text-right">
                <v-icon
                  color="error"
                  icon="mdi-weather-hurricane"
                  size="88"
                ></v-icon>
              </v-col>
            </v-row>
          </v-card-text>

          <div class="d-flex py-3 justify-space-between">
            <v-list-item
              density="compact"
              prepend-icon="mdi-weather-windy"
            >
              <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
            </v-list-item>

            <v-list-item
              density="compact"
              prepend-icon="mdi-weather-pouring"
            >
              <v-list-item-subtitle>48%</v-list-item-subtitle>
            </v-list-item>
          </div>

          <v-expand-transition>
            <div v-if="expand">
              <div class="py-2">
                <v-slider
                  v-model="time"
                  :max="6"
                  :step="1"
                  :ticks="labels"
                  class="mx-4"
                  color="primary"
                  density="compact"
                  hide-details
                  show-ticks="always"
                  thumb-size="10"
                ></v-slider>
              </div>

              <v-list class="bg-transparent">
                <v-list-item
                  v-for="item in forecast"
                  :key="item.day"
                  :title="item.day"
                  :append-icon="item.icon"
                  :subtitle="item.temp"
                >
                </v-list-item>
              </v-list>
            </div>
          </v-expand-transition>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn @click="expand = !expand">
              {{ !expand ? 'Full Report' : 'Hide Report' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
      <v-col v-for="card in firstCards" :key="card" :cols="card.flex">
        <v-card>
          <v-list lines="two">
            <v-list-subheader>{{ card }}</v-list-subheader>
            <template v-for="n in 6" :key="n">
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="grey-darken-1"></v-avatar>
                </template>

                <v-list-item-title>Message {{ n }}</v-list-item-title>

                <v-list-item-subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                </v-list-item-subtitle>
              </v-list-item>

              <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>



<script>
export default {
  
  data: () => ({

    firstCards: [
      { title: 'Texto 1 exemplo', src: '   ', flex: 3 },
      { title: 'Texto 2 exemplo', src: 'IASNIAN', flex: 3 },
      { title: 'Texto 3 exemplo', src: 'SOIFNSDF', flex: 3 },
    ],

    secondCards: [
      { title: 'Image 1', src: 'src/assets/template/tomatoes.jpg', flex: 6 },
      { title: 'Image 2', src: 'src/assets/template/hydroponic.jpg', flex: 6 },
      { title: 'Image 3', src: 'src/assets/template/rosemary.jpg', flex: 6 },
      { title: 'Image 4', src: 'src/assets/template/hydroponic2.jpg', flex: 6 },
    ],

    thirdCards: [],

    labels: { 0: 'SU', 1: 'MO', 2: 'TU', 3: 'WED', 4: 'TH', 5: 'FR', 6: 'SA' },
    expand: false,
    time: 0,
    forecast: [
      { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
      { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
      { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
    ],
  }),
}
</script>