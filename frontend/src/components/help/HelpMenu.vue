<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="12">
        <v-btn @click="navegate" color="success" size="large" type="submit" variant="elevated">
          Devices
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'

export default {
  methods: {
    navegate() {
      router.push('/device')
    }
  }
}
</script>