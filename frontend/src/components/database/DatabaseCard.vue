<template>
  <v-container class="py-16 px-16" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="text-center">
          <v-card-title>
            <v-icon class="mr-2" color="primary">mdi-database</v-icon>
            <span class="headline">Add data source</span>
          </v-card-title>
          <v-card-subtitle class="mb-4">Choose a data source type</v-card-subtitle>
          <v-card-text>
            <v-list>
              <v-list-item v-for="dataSource in dataSources" :key="dataSource.id">
                <v-list-item-icon>
                  <v-icon>{{ dataSource.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ dataSource.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ dataSource.description }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dataSources: [
        {
          id: 1,
          name: 'MySQL',
          description: 'Relational database management system',
          icon: 'mdi-database',
        },
        {
          id: 2,
          name: 'MongoDB',
          description: 'NoSQL document database',
          icon: 'mdi-database',
        },
        {
          id: 3,
          name: 'InfluxDB',
          description: 'Time series database',
          icon: 'mdi-database',
        },
      ],
    };
  },
};
</script>