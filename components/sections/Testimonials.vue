<template>
  <section class="py-24 bg-white dark:bg-dark-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Trusted by Innovators
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
          See what our users have to say about their experience
        </p>
      </div>

      <div class="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.author"
          class="relative p-6 bg-gray-50 dark:bg-dark-800 rounded-2xl"
        >
          <div class="relative">
            <p class="text-lg leading-7 text-gray-600 dark:text-gray-300">
              "{{ testimonial.content }}"
            </p>
            <div class="mt-6 flex items-center gap-x-4">
              <img
                :src="testimonial.avatar"
                alt=""
                class="h-10 w-10 rounded-full bg-gray-100"
              />
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">
                  {{ testimonial.author }}
                </div>
                <div class="text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {{ testimonial.role }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    content: 'This platform has revolutionized how we develop and deploy our computational models. The interface is intuitive and the performance is outstanding.',
    author: 'Dr. Sarah Chen',
    role: 'Lead Data Scientist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    content: 'The collaboration features have made it possible for our distributed team to work together seamlessly. A game-changer for our research group.',
    author: 'Prof. Michael Thompson',
    role: 'Research Director',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    content: 'The real-time analytics and monitoring capabilities have given us unprecedented insights into our models performance in production.',
    author: 'Emma Rodriguez',
    role: 'ML Engineer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
</script>
