<template>
  <v-container fluid fill-height class="pa-16 gradient-container" style="height: 100%;">
    <v-row class="d-flex align-center justify-center" style="height: 100%;">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto px-6 py-8 rounded-lg" max-width="400" elevation="12">
          <v-img src="@/assets/images/hydroponic.png" class="mx-auto" :width="100" height="100" contain>
          </v-img>
          <v-card-title class="text-center py-12">
            <h2 class="text-h4">Sign Up</h2>
          </v-card-title>
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
              label="Email"></v-text-field>
            <v-text-field v-model="firstName" :readonly="loading" :rules="[required]" class="mb-2" clearable
              label="Nome"></v-text-field>
            <v-text-field v-model="lastName" :readonly="loading" :rules="[required]" class="mb-2" clearable
              label="Sobrenome"></v-text-field>
            <v-text-field v-model="password" :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :readonly="loading"
              :rules="[required]" :type="show ? 'text' : 'password'" clearable label="Password"
              @click:append-inner="show = !show"></v-text-field>
            <br>
            <v-btn :disabled="!form" :loading="loading" block color="indigo" size="large" type="submit"
              variant="elevated">
              Sign Up
            </v-btn>
            <div class="text-center mt-2">
              <v-btn to="/login" class="transparent-btn text-indigo" elevation="0">
                <p class="text-capitalize">Aleady have an account? Login</p>
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { isAuthenticated, login, logout } from '@/services/auth'

import UserService from "@/services/userService.js"

export default {
  name: 'SignUp',
  data() {
    return {
      show: false,
      form: false,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      loading: false,
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    const expiration = localStorage.getItem('expiration')
    const user_id = localStorage.getItem('userId')

    if (token && expiration) {
      const currentTime = new Date().getTime()
      const authenticated = isAuthenticated()

      if (currentTime < parseInt(expiration)) {
        if (!authenticated) {
          login()
        }
        router.push('/')
      } else {
        logout()
        localStorage.removeItem('token')
        localStorage.removeItem('expiration')
        localStorage.removeItem('expiration')
      }
    }
  },
  methods: {
    signup() {
      const userData = { 
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
      }
      UserService.create(userData)
        .then((userCredential) => {
            console.log(userCredential);
            alert("Cadastro realizado com sucesso! Faça seu login.");
            router.push('/login');
          })
          .catch((error) => {
            alert(error.message);
            this.loading = false
          })
      // const auth = getAuth();

      // fireStoreDataService.create({ email: this.email })
      //   .then(() => {
      //     createUserWithEmailAndPassword(auth, this.email, this.password)
      //       .then((userCredential) => {
      //         const userId = this.email
      //         fireStoreDataService.update(userId, JSON.stringify({mongo: `user-${userId}`}))
      //         console.log(userCredential);
      //         alert("Cadastro realizado com sucesso! Faça seu login.");
      //         router.push('/login');
      //       })
      //       .catch((error) => {
      //         alert(error.message);
      //         this.loading = false
      //       })
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
    },
    onSubmit() {
      if (!this.form) return

      this.loading = true
      this.signup()
    },
    required(v) {
      return !!v || 'Field is required'
    }
  }
}
</script>

<style>
.gradient-container {
  background: linear-gradient(to bottom, #004d40, #002b27);
}
</style>