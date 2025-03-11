<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <TransitionGroup
      tag="div"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      name="blog-grid"
    >
      <BlogCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </TransitionGroup>
  </div>
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

defineProps<{
  posts: Post[]
  activeCategory: string
}>()
</script>

<style scoped>
.blog-grid-move {
  transition: all 0.5s ease;
}

.blog-grid-enter-active,
.blog-grid-leave-active {
  transition: all 0.5s ease;
}

.blog-grid-enter-from,
.blog-grid-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.blog-grid-leave-active {
  position: absolute;
}
</style> 