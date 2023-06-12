import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    theme: 'dark'
  }),
  actions: {
    setUserId(userId) {
      this.userId = userId
    }
  }
})