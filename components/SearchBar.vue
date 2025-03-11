<template>
  <div class="relative">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      class="w-full px-4 py-2 bg-dark-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
    />
    <button
      @click="handleSearch"
      class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors duration-200"
    >
      <Icon name="ph:magnifying-glass" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const handleSearch = () => {
  // Implement search functionality here
  console.log('Searching for:', searchQuery.value)
}
</script> 