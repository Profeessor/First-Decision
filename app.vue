<template>
  <div class="min-h-screen bg-dark-900 text-gray-900 dark:text-gray-100">
    <LayoutNavbar />
    <NuxtPage />
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
// Enable dark mode by default
useHead({
  htmlAttrs: {
    class: 'dark',
  },
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  @apply antialiased;
}
</style> 