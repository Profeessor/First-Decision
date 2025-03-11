<template>
  <section class="py-24 bg-gray-50 dark:bg-dark-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Powerful Features
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Everything you need to build and deploy your computational models
        </p>
      </div>

      <div class="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.name"
          class="relative group"
        >
          <div
            class="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur"
          />
          <div class="relative p-6 bg-white dark:bg-dark-900 rounded-lg ring-1 ring-gray-200 dark:ring-dark-700 group-hover:ring-primary-500 transition-all duration-200">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-6">
              <Icon :name="feature.icon" class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
              {{ feature.name }}
            </h3>
            <p class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    name: 'Advanced Modeling',
    description: 'Build and train sophisticated computational models with our intuitive interface.',
    icon: 'heroicons:cpu-chip',
  },
  {
    name: 'Real-time Analytics',
    description: 'Monitor and analyze your models performance with comprehensive dashboards.',
    icon: 'heroicons:chart-bar',
  },
  {
    name: 'Cloud Deployment',
    description: 'Deploy your models to production with just a few clicks.',
    icon: 'heroicons:cloud',
  },
  {
    name: 'Collaboration Tools',
    description: 'Work together with your team in real-time with built-in version control.',
    icon: 'heroicons:user-group',
  },
  {
    name: 'API Integration',
    description: 'Connect your models to external services with our REST API.',
    icon: 'heroicons:code-bracket',
  },
  {
    name: 'Security & Compliance',
    description: 'Enterprise-grade security with role-based access control.',
    icon: 'heroicons:shield-check',
  },
]
</script>
