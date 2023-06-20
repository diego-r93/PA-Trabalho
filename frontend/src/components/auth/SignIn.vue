<template>
  <v-container fluid fill-height class="pa-16 gradient-container" style="height: 100%;">
    <v-row class="d-flex align-center justify-center" style="height: 100%;">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto px-6 py-8 rounded-lg" max-width="400" elevation="12">
          <v-img src="@/assets/images/hydroponic.png" class="mx-auto" :width="100" height="100" contain>
          </v-img>
          <v-card-title class="text-center py-12">
            <h2 class="text-h4">Welcome</h2>
          </v-card-title>
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
              label="Email"></v-text-field>
            <v-text-field v-model="password" :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :readonly="loading"
              :rules="[required]" :type="show ? 'text' : 'password'" clearable label="Password"
              @click:append-inner="show = !show"></v-text-field>
            <br>
            <v-btn :disabled="!form" :loading="loading" block color="indigo" size="large" type="submit"
              variant="elevated">
              Log in
            </v-btn>
            <div class="text-center mt-2">
              <v-btn to="/resetpassword" class="transparent-btn text-indigo" elevation="0">
                <p class="text-capitalize">Forgot your password?</p>
              </v-btn>
            </div>
            <div class="text-center mt-2">
              <v-btn to="/signup" class="transparent-btn text-indigo" elevation="0">
                <p class="text-capitalize">Don't have an account yet? Register</p>
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
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { isAuthenticated, login, logout } from '@/services/auth'
import UserService from '@/services/userService'
import { useAuthStore } from '@/services/userConfiguration'

export default {
  name: "SignIn",
  data() {
    return {
      show: false,
      form: false,
      email: "",
      password: "",
      loading: false,
    }
  },
  mounted() {
    const token = localStorage.getItem('accessToken')
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
        localStorage.removeItem('accessToken')
        localStorage.removeItem('expiration')
        localStorage.removeItem('userId')
        localStorage.removeItem('userData')
      }
    }

    // Pinia Configuration
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userIdFromFirebase = user.email
        const authStore = useAuthStore()
        authStore.setUserId(userIdFromFirebase)
      } 
    })
  },
  methods: {
    signin() {
      UserService.login({
        email: this.email,
        password: this.password,
      }).then(res => {
        this.loading = false;
        login();
        
        const user = res.data;

        // Pinia Configuration
        const userIdFromFirebase = user.email
        const authStore = useAuthStore()
        authStore.setUserId(userIdFromFirebase)


        const expiration = new Date().getTime() + 3600 * 1000;
        
        localStorage.setItem('accessToken', user.accessToken);
        localStorage.setItem('expiration', expiration);
        localStorage.setItem('userId', user._id);
        localStorage.setItem('userData', JSON.stringify({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          state: user.state,
        }));

        router.push('/');
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
        this.loading = false
      });
      // const auth = getAuth();
      // signInWithEmailAndPassword(auth, this.email, this.password)
      //   .then((userCredential) => {
      //     console.log(userCredential);
      //     this.loading = false;
      //     login();

      //     const user = userCredential.user;

      //     // Pinia Configuration
      //     const userIdFromFirebase = user.email
      //     const authStore = useAuthStore()
      //     authStore.setUserId(userIdFromFirebase)
          

      //     user.getIdToken()
      //       .then((token) => {
      //         const expiration = new Date().getTime() + 3600 * 1000;
      //         localStorage.setItem('token', token);
      //         localStorage.setItem('expiration', expiration);

      //         router.push('/');
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //         // Lida com erros ao obter o token
      //       });
      //   })
      //   .catch((error) => {
      //     console.log(error.code);
      //     alert(error.message);
      //     this.loading = false
      //   });
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