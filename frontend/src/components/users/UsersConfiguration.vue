<template>
  <v-container class="py-16 px-16" fluid>
    <v-row>
      <v-col v-for="user in users" :key="user.id" cols="4">
        <v-card>
          <v-list lines="two">
            <v-list-subheader>{{ user.username }}</v-list-subheader>

            <v-list-item>
              <template v-slot:prepend>
                <v-avatar color="grey-darken-1">{{ user.username[0] }}</v-avatar>
              </template>

              <v-list-item-title>{{ user.email }}</v-list-item-title>
              <v-divider></v-divider>
              <v-list-item-title>Created: {{ formatDate(user.created) }}</v-list-item-title>

              <v-list-item-subtitle>
                Preferred Languages: {{ user.preferredLanguages.join(', ') }}
              </v-list-item-subtitle>
            </v-list-item>

          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, username: 'john_doe', email: 'johndoe@example.com', created: '2022-01-15', preferredLanguages: ['JavaScript', 'Python'] },
        { id: 2, username: 'jane_smith', email: 'janesmith@example.com', created: '2022-03-28', preferredLanguages: ['Java', 'C++'] },
        { id: 3, username: 'bob_williams', email: 'bobwilliams@example.com', created: '2022-06-10', preferredLanguages: ['Ruby', 'Go'] },
      ],
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>