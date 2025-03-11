<template>
  <NuxtLink
    :to="'/blog/' + post.id"
    class="group relative bg-white dark:bg-dark-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
  >
    <!-- Hover Effect Border -->
    <div class="absolute inset-0 border-2 border-transparent group-hover:border-primary-500 rounded-lg transition-colors duration-300" />

    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <!-- Category Badge -->
      <div
        class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-primary-500 text-white"
      >
        {{ getCategoryName(post.category) }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-200">
        {{ post.title }}
      </h3>
      <p class="mt-3 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
        {{ post.summary }}
      </p>
      <div class="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Post {
  id: number
  title: string
  summary: string
  category: string
  date: string
  image: string
}

const props = defineProps<{
  post: Post
}>()

// Category mapping
const categories = {
  all: 'All',
  business: 'Business and Marketing',
  computational: 'Computational Models',
  consciousness: 'Consciousness',
  decision: 'Decision Science',
  neuroscience: 'Neuroscience',
}

// Get category display name
const getCategoryName = (categoryId: string) => {
  return categories[categoryId as keyof typeof categories] || categoryId
}

// Format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 