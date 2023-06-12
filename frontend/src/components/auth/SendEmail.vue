<template>
  <v-container fluid fill-height class="pa-16 gradient-container" style="height: 100%;">
    <v-row class="d-flex align-center justify-center" style="height: 100%;">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto px-6 py-8 rounded-lg" max-width="400" elevation="12">
          <v-img src="@/assets/images/hydroponic.png" class="mx-auto" :width="100" height="100" contain>
          </v-img>
          <v-card-title class="text-center py-12">
            <h2 class="text-h4">Reset Password</h2>
          </v-card-title>
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
              label="Email"></v-text-field>
            <br>
            <v-btn :disabled="!form" :loading="loading" block color="indigo" size="large" type="submit"
              variant="elevated">
              Send E-mail
            </v-btn>
            <div class="text-center mt-2">
              <v-btn to="/login" class="transparent-btn text-indigo" elevation="0">
                <p class="text-capitalize">Cancel</p>
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
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

export default {
  name: 'SignUp',
  data() {
    return {
      show: false,
      form: false,
      email: '',
      loading: false,
    }
  },
  methods: {
    onSubmit() {
      if (!this.form) return

      this.loading = true
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          alert('Password reset email sent!')
          router.push('/login');      
        })
        .catch((error) => {
          console.log(error.code)
          alert(error.message)
          this.loading = false
        })
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