import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null
  }),
  actions: {
    setUserId(userId) {
      this.userId = userId
    }
  }
})