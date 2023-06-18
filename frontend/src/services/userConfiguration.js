import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    theme: localStorage.getItem('theme') || 'dark'
  }),
  actions: {
    setUserId(userId) {
      this.userId = userId
    },

    changeTheme(newTheme) {
      localStorage.setItem('theme', newTheme);
    }
  }
})