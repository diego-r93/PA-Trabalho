<template>
  <v-container class="py-16 px-16" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <form @submit.prevent="submit">
          <v-text-field v-model="userId" label="E-mail" variant="solo" disabled></v-text-field>

          <v-text-field v-model="firstName.value.value" :counter="10" :error-messages="firstName.errorMessage.value"
            label="Nome"></v-text-field>

          <v-text-field v-model="lastName.value.value" :counter="10" :error-messages="lastName.errorMessage.value"
            label="Sobrenome"></v-text-field>

          <v-text-field v-model="phone.value.value" :counter="7" :error-messages="phone.errorMessage.value"
            label="Telefone"></v-text-field>

          <v-select v-model="state.value.value" :items="items" :error-messages="state.errorMessage.value"
            label="State/Province/Region"></v-select>

          <v-btn class="me-4" type="submit" @click="submit">
            submit
          </v-btn>

          <v-btn @click="handleReset">
            clear
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

import UserService from '@/services/userService.js'

import { useAuthStore } from '@/services/userConfiguration'

import { getAuth, onAuthStateChanged } from "firebase/auth"

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    firstName(value) {
      if (value?.length >= 2) return true

      return 'First Name needs to be at least 2 characters.'
    },
    lastName(value) {
      if (value?.length >= 2) return true

      return 'Last Name needs to be at least 2 characters.'
    },
    phone(value) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true

      return 'Phone number needs to be at least 9 digits.'
    },
    // email(value) {
    //   if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

    //   return 'Must be a valid e-mail.'
    // },
    state(value) {
      if (value) return true

      return 'Select an item.'
    },
  },
})
const firstName = useField('firstName')
const lastName = useField('lastName')
const phone = useField('phone')
const state = useField('state')

const items = ref([
  'Acre (AC)',
  'Alagoas (AL)',
  'Amapá (AP)',
  'Amazonas (AM)',
  'Bahia (BA)',
  'Ceará (CE)',
  'Distrito Federal (DF)',
  'Espírito Santo (ES)',
  'Goiás (GO)',
  'Maranhão (MA)',
  'Mato Grosso (MT)',
  'Mato Grosso do Sul (MS)',
  'Minas Gerais (MG)',
  'Pará (PA)',
  'Paraíba (PB)',
  'Paraná (PR)',
  'Pernambuco (PE)',
  'Piauí (PI)',
  'Rio de Janeiro (RJ)',
  'Rio Grande do Norte (RN)',
  'Rio Grande do Sul (RS)',
  'Rondônia (RO)',
  'Roraima (RR)',
  'Santa Catarina (SC)',
  'São Paulo (SP)',
  'Sergipe (SE)',
  'Tocantins (TO)',
])

// Pinia Configuration
const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userIdFromFirebase = user.email
    const authStore = useAuthStore()
    authStore.setUserId(userIdFromFirebase)
  }
})

// const authStore = useAuthStore()
// const userId = authStore.userId

const userId = localStorage.getItem('userId')
const accessToken = localStorage.getItem('accessToken')

const submit = handleSubmit(values => {
  UserService.update(userId, values, accessToken)
  alert(JSON.stringify(values, null, 2))
})
</script>