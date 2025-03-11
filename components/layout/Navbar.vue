<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-dark-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-xl font-bold text-primary-500">
            Your Logo
          </NuxtLink>
        </div>

        <div class="hidden sm:flex sm:items-center sm:space-x-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Search Modal -->
          <SearchModal />

          <!-- Theme Toggle -->
          <button
            @click="toggleColorMode"
            class="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <span class="sr-only">Toggle color mode</span>
            <div v-if="colorMode.value === 'dark'" class="w-5 h-5">🌙</div>
            <div v-else class="w-5 h-5">☀️</div>
          </button>

          <!-- Sign In Button -->
          <SignInButton />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchModal from '~/components/search/SearchModal.vue'
import SignInButton from '~/components/auth/SignInButton.vue'

const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navigation = [
  { name: 'Blog', href: '/blog' },
  { name: 'Computational Models', href: '/models' },
  { name: 'About', href: '/about' },
]
</script>

<style scoped>
/* Add any additional styles here */
</style>
