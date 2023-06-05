<template>
  <v-container fluid fill-height class="pa-16 gradient-container" style="height: 100vh;">
    <v-row class="d-flex align-center justify-center" style="height: 100%;">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto px-6 py-8 rounded-lg" max-width="400" elevation="12">
          <v-img src="@/assets/images/hydroponic.png" class="mx-auto" :width="100"></v-img>
          <v-card-title class="text-center py-12">
            <h2 class="text-h4">Welcome</h2>
          </v-card-title>
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
              label="Email"></v-text-field>
            <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
              placeholder="Enter your password"></v-text-field>
            <br>
            <v-btn :disabled="!form" :loading="loading" block color="indigo" size="large" type="submit"
              variant="elevated">
              Log in
            </v-btn>
            <div class="text-right mt-2">
              <v-btn class="transparent-btn text-indigo" elevation="0">
                <p class="text-capitalize">Forgot your password?</p>
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { isAuthenticated, login } from '@/scripts/auth.js'

export default {
  name: "SignIn",
  data() {
    return {
      form: false,
      email: "",
      password: "",
      loading: false,
    }
  },
  methods: {
    signin() {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.email, this.password).then((user) => {
        console.log(user)
        this.loading = false
        login()
        console.log(isAuthenticated)
        router.push('/')
      })
        .catch(error => {
          console.log(error.code)
          alert(error.message)
        }
        )
    },
    onSubmit() {
      if (!this.form) return

      this.loading = true

      this.signin()
    },
    required(v) {
      return !!v || 'Field is required'
    },
  }
}
</script>

<style>
.gradient-container {
  background: linear-gradient(to bottom, #004d40, #002b27);
}
</style>