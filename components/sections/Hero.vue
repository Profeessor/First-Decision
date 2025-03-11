<template>
  <section class="relative pt-32 pb-24 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
          <span class="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Discover the Future
          </span>
          <br />
          <span class="mt-2 block text-gray-900 dark:text-white animate-slide-up">
            of Computational Innovation
          </span>
        </h1>
        
        <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-delay">
          Explore cutting-edge computational models and insights that shape tomorrow's technology landscape.
        </p>
        
        <div class="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-delay-2">
          <NuxtLink
            to="/models"
            class="rounded-md bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-all duration-200"
          >
            Explore Models
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
          >
            Read Blog <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.5s both;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 1s ease-out 1s both;
}

.animate-slide-up {
  animation: slideUp 1s ease-out 0.3s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
