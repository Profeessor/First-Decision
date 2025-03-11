<template>
  <main class="min-h-screen bg-white dark:bg-dark-900">
    <!-- Hero Section -->
    <section class="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white text-center">
          Explore Insights in Cognitive Science and Decision Making
        </h1>
        <p class="mt-6 text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
          Discover the latest research, insights, and breakthroughs in cognitive science, decision-making processes, and computational modeling.
        </p>
      </div>
    </section>

    <!-- Category Filter -->
    <div class="mt-8">
      <CategoryFilter
        :categories="categories"
        :active-category="activeCategory"
        @select-category="handleCategorySelect"
      />
    </div>

    <!-- Blog Grid -->
    <BlogGrid
      :posts="filteredPosts"
      :active-category="activeCategory"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CategoryFilter from '~/components/blog/CategoryFilter.vue'
import BlogGrid from '~/components/blog/BlogGrid.vue'

// Define categories
const categories = [
  { id: 'all', name: 'All' },
  { id: 'business', name: 'Business and Marketing' },
  { id: 'computational', name: 'Computational Models' },
  { id: 'consciousness', name: 'Consciousness' },
  { id: 'decision', name: 'Decision Science' },
  { id: 'neuroscience', name: 'Neuroscience' },
]

// Active category state
const activeCategory = ref('all')

// Example blog posts data
const posts = ref([
  {
    id: 1,
    title: 'Understanding Decision-Making Processes in Complex Environments',
    summary: 'Explore how individuals make decisions in complex, uncertain environments. This research combines insights from cognitive psychology and computational modeling.',
    category: 'decision',
    date: '2024-03-10',
    image: '/images/blog/decision-making.jpg'
  },
  {
    id: 2,
    title: 'Neural Networks and Consciousness: A New Perspective',
    summary: 'Recent advances in neural network architectures provide new insights into the nature of consciousness and cognitive processing.',
    category: 'consciousness',
    date: '2024-03-08',
    image: '/images/blog/neural-networks.jpg'
  },
  {
    id: 3,
    title: 'Computational Models in Business Strategy',
    summary: 'How modern businesses are leveraging computational models to optimize decision-making and strategic planning.',
    category: 'business',
    date: '2024-03-05',
    image: '/images/blog/business-strategy.jpg'
  },
  {
    id: 4,
    title: 'The Future of Neuroscience Research',
    summary: 'Examining emerging trends and technologies shaping the future of neuroscience research and brain-computer interfaces.',
    category: 'neuroscience',
    date: '2024-03-03',
    image: '/images/blog/neuroscience.jpg'
  },
  {
    id: 5,
    title: 'Advanced Computational Models in Cognitive Science',
    summary: 'Deep dive into the latest computational models being used to understand and simulate cognitive processes.',
    category: 'computational',
    date: '2024-03-01',
    image: '/images/blog/computational.jpg'
  },
])

// Computed filtered posts
const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') {
    return posts.value
  }
  return posts.value.filter(post => post.category === activeCategory.value)
})

// Handle category selection
const handleCategorySelect = (category: string) => {
  activeCategory.value = category
}

// Set page metadata
useHead({
  title: 'Blog - Cognitive Science and Decision Making',
  meta: [
    {
      name: 'description',
      content: 'Explore the latest insights in cognitive science, decision making, and computational modeling.'
    }
  ]
})
</script> 