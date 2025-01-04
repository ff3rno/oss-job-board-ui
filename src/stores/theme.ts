import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(false)

    // Initialize theme from localStorage or system preference
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            isDark.value = savedTheme === 'dark'
        } else {
            isDark.value = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
        }
        updateTheme()
    }

    // Update DOM and localStorage when theme changes
    const updateTheme = () => {
        if (isDark.value) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    // Toggle theme
    const toggleTheme = () => {
        isDark.value = !isDark.value
    }

    // Watch for changes and update theme
    watch(isDark, () => {
        updateTheme()
    })

    return {
        isDark,
        toggleTheme,
        initializeTheme,
    }
})
