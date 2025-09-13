import { defineStore } from 'pinia'

export const useThemeStore = defineStore('themeStore', {
  state: () => ({
    isDarkMode: false
  }),

  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      // Save to localStorage for persistence
      if (process.client) {
        localStorage.setItem('darkMode', this.isDarkMode.toString())
      }
    },

    initializeTheme() {
      if (process.client) {
        // Check localStorage for saved preference
        const savedTheme = localStorage.getItem('darkMode')
        if (savedTheme !== null) {
          this.isDarkMode = savedTheme === 'true'
        } else {
          // Check system preference
          this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
      }
    }
  }
})
