<template>
  <div class="sticky top-16 z-40 border-b border-gray-200 dark:border-dark-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex justify-center py-4" aria-label="Categories">
        <div class="flex overflow-x-auto no-scrollbar">
          <button
            v-for="(category, index) in categories"
            :key="category.id"
            @click="$emit('select-category', category.id)"
            :class="[
              'min-w-fit px-5 sm:px-6 py-2 text-sm font-medium transition-all duration-200',
              'border-primary-500',
              index === 0 ? 'rounded-l-lg border-l-2' : '',
              index === categories.length - 1 ? 'rounded-r-lg border-r-2' : '',
              'border-y-2',
              index !== 0 ? 'border-l-[1px]' : '',
              activeCategory === category.id
                ? 'bg-primary-500 text-white'
                : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
            ]"
          >
            <div class="flex items-center whitespace-nowrap">
              <div
                v-if="activeCategory === category.id"
                class="mr-2 h-1.5 w-1.5 rounded-full bg-white"
                aria-hidden="true"
              ></div>
              {{ category.name }}
            </div>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: string
  name: string
}

defineProps<{
  categories: Category[]
  activeCategory: string
}>()

defineEmits<{
  (e: 'select-category', category: string): void
}>()
</script>

<style scoped>
/* Hide scrollbar but keep functionality */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.no-scrollbar::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera */
}

/* Ensure buttons maintain consistent width */
button {
  flex: 0 0 auto;
}

/* Add smooth scrolling */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Add container shadow indicators for scroll */
.overflow-x-auto::before,
.overflow-x-auto::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  pointer-events: none;
  transition: opacity 0.3s;
}

.overflow-x-auto::before {
  left: 0;
  background: linear-gradient(to right, rgba(255,255,255,0.9), transparent);
}

.overflow-x-auto::after {
  right: 0;
  background: linear-gradient(to left, rgba(255,255,255,0.9), transparent);
}

:deep(.dark) .overflow-x-auto::before {
  background: linear-gradient(to right, rgba(15,23,42,0.9), transparent);
}

:deep(.dark) .overflow-x-auto::after {
  background: linear-gradient(to left, rgba(15,23,42,0.9), transparent);
}
</style> 