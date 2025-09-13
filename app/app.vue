<template>
  <div :class="{ 'dark': themeStore.isDarkMode }" class="app-container">
    <header class="header">
      <h1>Flesh & Blood Card Search</h1>
      <button @click="themeStore.toggleDarkMode" class="theme-toggle">
        {{ themeStore.isDarkMode ? '☀️' : '🌙' }}
      </button>
    </header>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useCardStore } from "~/stores/cardStore";
import { useThemeStore } from "~/stores/themeStore";

const cardStore = useCardStore()
const themeStore = useThemeStore()

// Initialize theme on app start
onMounted(() => {
  themeStore.initializeTheme()
})

await callOnce(cardStore.loadCardList)
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f8f9fa;
  color: #333;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dark body {
  background-color: #0d1117;
  color: #e6edf3;
}

.app-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  transition: background-color 0.3s ease;
}

.dark .app-container {
  background-color: #0d1117;
}

.dark .app-container * {
  background-color: inherit;
}

.dark .app-container div,
.dark .app-container section,
.dark .app-container main,
.dark .app-container article {
  background-color: #0d1117 !important;
}

.dark .app-container [style*="background-color: white"],
.dark .app-container [style*="background-color: #fff"],
.dark .app-container [style*="background-color: #ffffff"] {
  background-color: #0d1117 !important;
}

.dark html,
.dark body {
  background-color: #0d1117 !important;
}

.dark #__nuxt,
.dark #__layout {
  background-color: #0d1117 !important;
}

.dark {
  background-color: #0d1117 !important;
}

.dark * {
  background-color: inherit;
}

.dark html,
.dark body,
.dark #__nuxt,
.dark #__layout,
.dark #__nuxt > div {
  background-color: #0d1117 !important;
}

.dark [style*="background-color: white"],
.dark [style*="background-color: #fff"],
.dark [style*="background-color: #ffffff"],
.dark [style*="background-color: #f8f9fa"] {
  background-color: #0d1117 !important;
}

.dark div,
.dark section,
.dark main,
.dark article,
.dark aside,
.dark nav {
  background-color: #0d1117 !important;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.dark .header {
  background-color: #161b22;
  border-bottom-color: #30363d;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

.theme-toggle {
  background: none;
  border: 2px solid #ddd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  border-color: #007bff;
  transform: scale(1.05);
}

.dark .theme-toggle {
  border-color: #30363d;
  color: #e6edf3;
}

.dark .theme-toggle:hover {
  border-color: #4dabf7;
}
</style>
