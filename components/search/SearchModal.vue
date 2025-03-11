<template>
  <div class="relative">
    <button
      @click="isSearchOpen = true"
      class="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
    >
      <span class="sr-only">Search</span>
      <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
    </button>

    <!-- Search Modal -->
    <div
      v-if="isSearchOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="closeSearch"
    >
      <div class="flex min-h-screen items-center justify-center px-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div
          class="relative transform overflow-hidden rounded-lg bg-white dark:bg-dark-800 px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          @click.stop
        >
          <!-- Close button -->
          <div class="absolute right-0 top-0 pr-4 pt-4">
            <button
              @click="closeSearch"
              class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span class="sr-only">Close</span>
              <Icon name="heroicons:x-mark" class="h-6 w-6" />
            </button>
          </div>

          <!-- Search Input -->
          <div class="mt-3">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search..."
              class="block w-full rounded-md border-0 py-2 px-4 text-gray-900 dark:text-white bg-white dark:bg-dark-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-dark-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              @keyup.enter="handleSearch"
            />
          </div>

          <!-- Search Results -->
          <div v-if="searchResults.length > 0" class="mt-4 max-h-96 overflow-y-auto">
            <div
              v-for="result in searchResults"
              :key="result.id"
              class="py-2 border-b border-gray-200 dark:border-dark-700 last:border-0"
            >
              <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                {{ result.title }}
              </h4>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ result.description }}
              </p>
            </div>
          </div>

          <!-- No Results Message -->
          <div v-else-if="hasSearched" class="mt-4 text-center text-gray-500 dark:text-gray-400">
            No results found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchResults = ref<Array<{ id: number; title: string; description: string }>>([])
const hasSearched = ref(false)

// Example search data - replace with your actual data
const searchData = [
  {
    id: 1,
    title: 'Introduction to Computational Models',
    description: 'Learn about the basics of computational modeling and its applications.',
  },
  {
    id: 2,
    title: 'Advanced Machine Learning',
    description: 'Explore advanced concepts in machine learning and neural networks.',
  },
  {
    id: 3,
    title: 'Data Analysis Techniques',
    description: 'Discover various techniques for analyzing complex datasets.',
  },
]

const handleSearch = () => {
  const query = searchQuery.value.toLowerCase().trim()
  hasSearched.value = true

  if (!query) {
    searchResults.value = []
    return
  }

  searchResults.value = searchData.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.description.toLowerCase().includes(query)
  )
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
  searchResults.value = []
  hasSearched.value = false
}

// Handle escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isSearchOpen.value) {
      closeSearch()
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script> 