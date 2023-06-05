<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" prepend-icon="mdi-home">
          <template v-slot:title>
            This is a title
          </template>
          <v-card-text>
            This is content
          </v-card-text>
        </v-card>
      </v-col>

      <v-col v-for="card in cards" :key="card" cols="12">
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
    cards: [
      { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
      { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
    ],
  }),
}
</script>