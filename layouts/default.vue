<template>
  <div class="min-h-screen flex flex-col bg-dark-900">
    <Navigation />
    <!-- Main Content -->
    <div class="pt-16">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Theme state
const isDark = ref(true)
const toggleTheme = () => {
  isDark.value = !isDark.value
  // Here you would typically update the theme in your color mode system
}
</script> 