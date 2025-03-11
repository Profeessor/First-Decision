<template>
  <footer class="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
            Community
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="item in community" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="text-base text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-span-1">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
            Products
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="item in products" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="text-base text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-span-1">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
            About
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="item in about" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="text-base text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-span-1">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
            Follow Us
          </h3>
          <div class="mt-4 flex space-x-6">
            <a
              v-for="item in social"
              :key="item.name"
              :href="item.href"
              class="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">{{ item.name }}</span>
              <Icon :name="item.icon" class="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div class="mt-12 border-t border-gray-200 dark:border-dark-700 pt-8">
        <p class="text-base text-gray-500 dark:text-gray-400 text-center">
          &copy; {{ new Date().getFullYear() }} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const community = [
  { name: 'Forum', href: '/forum' },
  { name: 'Discord', href: '/discord' },
  { name: 'Events', href: '/events' },
]

const products = [
  { name: 'Models', href: '/models' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Resources', href: '/resources' },
]

const about = [
  { name: 'Company', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const social = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: 'simple-icons:github',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: 'simple-icons:twitter',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: 'simple-icons:linkedin',
  },
]
</script>
