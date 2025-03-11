<template>
  <main class="min-h-screen bg-dark-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
      <div class="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
        <!-- Navigation Sidebar -->
        <aside class="hidden lg:block">
          <nav class="sticky top-8 space-y-2" aria-label="Article sections">
            <p class="text-sm font-medium text-gray-400 mb-4">Table of Contents</p>
            <ul class="space-y-3 text-sm">
              <li v-for="section in sections" :key="section.id">
                <a 
                  :href="'#' + section.id"
                  :class="[
                    'block text-gray-400 hover:text-primary-500 transition-colors duration-200',
                    activeSection === section.id ? 'text-primary-500 font-medium' : ''
                  ]"
                >
                  {{ section.title }}
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- Main Content -->
        <article>
          <!-- Article Header -->
          <header class="pb-12">
            <!-- Category Badge -->
            <div class="mb-8">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500/10 text-primary-500">
                {{ getCategoryName(post.category) }}
              </span>
            </div>
            
            <!-- Title -->
            <h1 class="text-4xl sm:text-5xl font-bold text-white mb-6">
              {{ post.title }}
            </h1>
            
            <!-- Meta Info -->
            <div class="flex items-center space-x-4 text-gray-400">
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              <span class="text-gray-500">•</span>
              <span>{{ post.readingTime }} min read</span>
            </div>
          </header>

          <!-- Featured Image -->
          <div class="relative h-[60vh] max-h-[600px] w-full overflow-hidden mb-12">
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-full object-cover rounded-lg"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent rounded-lg" />
          </div>

          <!-- Summary -->
          <div class="mb-12 text-xl text-gray-300 leading-relaxed border-l-4 border-primary-500 pl-6">
            {{ post.summary }}
          </div>

          <!-- Content -->
          <div class="prose prose-lg prose-invert prose-primary max-w-none">
            <div v-html="post.content" />
          </div>

          <!-- Interaction Section -->
          <div class="mt-12 pt-6 border-t border-dark-700">
            <!-- Rating -->
            <div class="flex items-center space-x-2 mb-8">
              <span class="text-gray-400">Rate this article:</span>
              <div class="flex items-center">
                <button
                  v-for="star in 5"
                  :key="star"
                  @click="rateArticle(star)"
                  :class="[
                    'p-1 focus:outline-none transition-colors duration-200',
                    rating >= star ? 'text-primary-500' : 'text-gray-600'
                  ]"
                >
                  <Icon name="heroicons:star-20-solid" class="w-6 h-6" />
                </button>
              </div>
              <span class="text-gray-400 ml-2">({{ post.ratings.average.toFixed(1) }} / 5 - {{ post.ratings.count }} ratings)</span>
            </div>

            <!-- Share and Save Section -->
            <div class="flex flex-col space-y-4 mb-8">
              <!-- Share Label -->
              <div class="flex items-center space-x-2">
                <Icon name="ph:share" class="w-5 h-5 text-primary-500" />
                <span class="text-gray-400 font-medium">Share this article:</span>
                <button
                  @click="copyLink"
                  class="flex items-center space-x-2 text-sm text-gray-400 hover:text-primary-500 transition-colors duration-200"
                >
                  <Icon name="ph:link" class="w-5 h-5" />
                  <span>{{ linkCopied ? 'Link copied!' : 'Copy link' }}</span>
                </button>
              </div>
              
              <!-- Social Sharing Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <button
                  v-for="social in socialSharing"
                  :key="social.name"
                  @click="shareArticle(social.type)"
                  class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors duration-200 group"
                >
                  <Icon 
                    :name="social.icon" 
                    class="w-5 h-5"
                    :class="social.iconClass" 
                  />
                  <span class="text-gray-300 group-hover:text-white text-sm">
                    {{ social.name }}
                    <span class="text-gray-500 text-xs" v-if="social.shareCount">({{ formatNumber(social.shareCount) }})</span>
                  </span>
                </button>
              </div>

              <!-- Save Button -->
              <div class="flex items-center mt-2">
                <button
                  @click="toggleBookmark"
                  :class="[
                    'flex items-center space-x-2 text-sm transition-colors duration-200',
                    isBookmarked ? 'text-primary-500' : 'text-gray-400 hover:text-primary-500'
                  ]"
                >
                  <Icon :name="isBookmarked ? 'ph:bookmark-fill' : 'ph:bookmark'" class="w-5 h-5" />
                  <span v-if="isBookmarked" class="flex items-center space-x-1">
                    <span>Saved</span>
                    <Icon name="ph:check" class="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div class="mt-8 pt-6 border-t border-dark-700">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-3 py-1 rounded-full text-sm bg-dark-800 text-gray-300 cursor-pointer hover:bg-dark-700 transition-colors duration-200"
                @click="navigateToTag(tag)"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Author Info -->
          <div class="mt-8 pt-6 border-t border-dark-700">
            <div class="flex items-center space-x-4">
              <img
                :src="post.author.avatar"
                :alt="post.author.name"
                class="h-12 w-12 rounded-full"
              />
              <div>
                <h3 class="text-lg font-semibold text-white">{{ post.author.name }}</h3>
                <p class="text-gray-400">{{ post.author.bio }}</p>
              </div>
            </div>
          </div>

          <!-- Comments Section -->
          <div class="mt-12 pt-6 border-t border-dark-700">
            <h3 class="text-xl font-semibold text-white mb-8">Discussion</h3>
            
            <!-- New Comment Form -->
            <form @submit.prevent="submitComment" class="mb-12">
              <div class="mb-4">
                <textarea
                  v-model="newComment"
                  rows="4"
                  class="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors duration-200"
                  placeholder="Share your thoughts..."
                ></textarea>
              </div>
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                >
                  Post Comment
                </button>
              </div>
            </form>

            <!-- Comments List -->
            <div class="space-y-8">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="bg-dark-800 rounded-lg p-6"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <img
                      :src="comment.author.avatar"
                      :alt="comment.author.name"
                      class="h-8 w-8 rounded-full"
                    />
                    <span class="font-medium text-white">{{ comment.author.name }}</span>
                  </div>
                  <time class="text-sm text-gray-400">{{ formatDate(comment.date) }}</time>
                </div>
                <p class="text-gray-300">{{ comment.content }}</p>
                <div class="mt-4 flex items-center space-x-4">
                  <button
                    @click="likeComment(comment.id)"
                    :class="[
                      'flex items-center space-x-1 text-sm transition-colors duration-200',
                      comment.isLiked ? 'text-primary-500' : 'text-gray-400 hover:text-primary-500'
                    ]"
                  >
                    <Icon name="heroicons:hand-thumb-up-solid" class="w-4 h-4" />
                    <span>{{ comment.likes }} likes</span>
                  </button>
                  <button
                    @click="replyToComment(comment.id)"
                    class="text-sm text-gray-400 hover:text-primary-500 transition-colors duration-200"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Related Articles -->
    <section class="bg-dark-800 mt-24 py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-12">Related Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard
            v-for="article in relatedArticles"
            :key="article.id"
            :post="article"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Get the route params
const route = useRoute()

// Theme state
const isDark = ref(true)
const toggleTheme = () => {
  isDark.value = !isDark.value
  // Here you would typically update the theme in your color mode system
}

// Navigation state
const activeSection = ref('')
const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'cognitive-load', title: 'The Role of Cognitive Load' },
  { id: 'computational-models', title: 'Computational Models' },
  { id: 'practical-applications', title: 'Practical Applications' }
]

// Update active section based on scroll position
const updateActiveSection = () => {
  const sectionElements = sections.map(section => ({
    id: section.id,
    element: document.getElementById(section.id)
  }))

  const currentSection = sectionElements.find(section => {
    if (!section.element) return false
    const rect = section.element.getBoundingClientRect()
    return rect.top <= 100 && rect.bottom > 100
  })

  activeSection.value = currentSection?.id || sections[0].id
}

// Set up scroll listener
onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})

// Example articles data
const articles = ref([
  {
    id: 2,
    title: 'Neural Networks and Consciousness',
    summary: 'Recent advances in neural network architectures provide new insights into the nature of consciousness.',
    category: 'consciousness',
    date: '2024-03-08',
    image: '/images/blog/neural-networks.jpg',
    tags: ['neural-networks', 'consciousness', 'ai', 'cognitive-science'],
    ratings: { average: 4.2, count: 95 },
  },
  {
    id: 3,
    title: 'Computational Models in Business Strategy',
    summary: 'How modern businesses are leveraging computational models to optimize decision-making.',
    category: 'business',
    date: '2024-03-05',
    image: '/images/blog/business-strategy.jpg',
    tags: ['business', 'decision-making', 'computational-modeling', 'strategy'],
    ratings: { average: 4.7, count: 156 },
  },
  {
    id: 4,
    title: 'The Future of Neuroscience Research',
    summary: 'Examining emerging trends and technologies shaping the future of neuroscience research.',
    category: 'neuroscience',
    date: '2024-03-03',
    image: '/images/blog/neuroscience.jpg',
    tags: ['neuroscience', 'research', 'technology', 'brain-science'],
    ratings: { average: 4.4, count: 112 },
  },
  {
    id: 5,
    title: 'Advanced Decision Theory Applications',
    summary: 'Exploring practical applications of decision theory in modern problem-solving scenarios.',
    category: 'decision',
    date: '2024-03-01',
    image: '/images/blog/decision-theory.jpg',
    tags: ['decision-making', 'theory', 'problem-solving', 'cognitive-science'],
    ratings: { average: 4.3, count: 89 },
  },
])

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

// Interactive features state
const rating = ref(0)
const isBookmarked = ref(false)
const newComment = ref('')
const comments = ref([
  {
    id: 1,
    author: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content: 'This is a fascinating perspective on decision-making processes. The integration of computational models with cognitive psychology opens up new avenues for research.',
    date: '2024-03-15T10:30:00',
    likes: 12,
    isLiked: false,
  },
  // Add more example comments...
])

// Enhanced social sharing options
const socialSharing = [
  { 
    name: 'Twitter',
    icon: 'ph:twitter-logo',
    type: 'twitter',
    iconClass: 'text-[#1DA1F2] group-hover:text-[#1DA1F2]',
    shareCount: 1234
  },
  { 
    name: 'LinkedIn',
    icon: 'ph:linkedin-logo',
    type: 'linkedin',
    iconClass: 'text-[#0A66C2] group-hover:text-[#0A66C2]',
    shareCount: 856
  },
  { 
    name: 'Facebook',
    icon: 'ph:facebook-logo',
    type: 'facebook',
    iconClass: 'text-[#1877F2] group-hover:text-[#1877F2]',
    shareCount: 2341
  },
  { 
    name: 'Reddit',
    icon: 'ph:reddit-logo',
    type: 'reddit',
    iconClass: 'text-[#FF4500] group-hover:text-[#FF4500]',
    shareCount: 432
  },
  { 
    name: 'WhatsApp',
    icon: 'ph:whatsapp-logo',
    type: 'whatsapp',
    iconClass: 'text-[#25D366] group-hover:text-[#25D366]',
    shareCount: 156
  },
  { 
    name: 'Telegram',
    icon: 'ph:telegram-logo',
    type: 'telegram',
    iconClass: 'text-[#26A5E4] group-hover:text-[#26A5E4]',
    shareCount: 89
  },
  { 
    name: 'Email',
    icon: 'ph:envelope',
    type: 'email',
    iconClass: 'text-gray-400 group-hover:text-white',
    shareCount: null
  },
  { 
    name: 'Hacker News',
    icon: 'simple-icons:ycombinator',
    type: 'hackernews',
    iconClass: 'text-[#F0652F] group-hover:text-[#F0652F]',
    shareCount: 67
  },
]

// Link copy state
const linkCopied = ref(false)

// Format large numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Example post data with ratings
const post = ref({
  id: route.params.id,
  title: 'Understanding Decision-Making Processes in Complex Environments',
  summary: 'Explore how individuals make decisions in complex, uncertain environments. This research combines insights from cognitive psychology and computational modeling.',
  content: `
    <h2 id="introduction">Introduction</h2>
    <p>Decision-making in complex environments presents unique challenges that have fascinated researchers for decades. This article explores the intersection of cognitive psychology and computational modeling in understanding how humans navigate uncertainty.</p>

    <h2 id="cognitive-load">The Role of Cognitive Load</h2>
    <p>When faced with multiple variables and uncertain outcomes, our cognitive resources become strained. This section examines how cognitive load affects decision quality and what strategies people employ to manage it.</p>

    <h2 id="computational-models">Computational Models</h2>
    <p>Modern computational models have revolutionized our understanding of decision-making processes. We'll explore how these models simulate human decision-making and what insights they've provided.</p>

    <h2 id="practical-applications">Practical Applications</h2>
    <p>The insights gained from this research have practical applications in various fields, from artificial intelligence to organizational decision-making.</p>
  `,
  category: 'decision',
  date: '2024-03-10',
  readingTime: '8',
  image: '/images/blog/decision-making.jpg',
  tags: ['decision-making', 'cognitive-science', 'computational-modeling', 'psychology'],
  author: {
    name: 'Dr. Sarah Chen',
    bio: 'Lead Researcher in Cognitive Science',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  ratings: {
    average: 4.5,
    count: 128,
  },
})

// Compute related articles based on relevance
const relatedArticles = computed(() => {
  return articles.value
    .filter(article => article.id !== Number(route.params.id))
    .map(article => ({
      ...article,
      relevanceScore: calculateRelevanceScore(article),
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3)
})

// Calculate article relevance score
const calculateRelevanceScore = (article: any) => {
  let score = 0
  
  // Category match
  if (article.category === post.value.category) {
    score += 3
  }
  
  // Tag overlap
  const commonTags = article.tags.filter((tag: string) => 
    post.value.tags.includes(tag)
  )
  score += commonTags.length * 2
  
  // Recency factor (newer articles score higher)
  const daysSincePublished = (
    new Date().getTime() - new Date(article.date).getTime()
  ) / (1000 * 60 * 60 * 24)
  score += Math.max(0, 10 - daysSincePublished / 30) // Decay over time
  
  // Engagement factor
  score += (article.ratings.average * article.ratings.count) / 100
  
  return score
}

// Interactive features methods
const rateArticle = (value: number) => {
  rating.value = value
  // Here you would typically make an API call to save the rating
}

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  // Here you would typically make an API call to save the bookmark state
}

const shareArticle = (platform: string) => {
  const title = encodeURIComponent(post.value.title)
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`Check out this article: ${post.value.title}`)
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    reddit: `https://reddit.com/submit?url=${url}&title=${title}`,
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    email: `mailto:?subject=${title}&body=${text}%20${url}`,
    hackernews: `https://news.ycombinator.com/submitlink?u=${url}&t=${title}`,
  }
  
  window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

const submitComment = () => {
  if (!newComment.value.trim()) return
  
  // Here you would typically make an API call to save the comment
  comments.value.unshift({
    id: Date.now(),
    author: {
      name: 'Current User', // This would come from your auth system
      avatar: 'https://example.com/default-avatar.jpg',
    },
    content: newComment.value,
    date: new Date().toISOString(),
    likes: 0,
    isLiked: false,
  })
  
  newComment.value = ''
}

const likeComment = (commentId: number) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    comment.isLiked = !comment.isLiked
    comment.likes += comment.isLiked ? 1 : -1
    // Here you would typically make an API call to save the like state
  }
}

const replyToComment = (commentId: number) => {
  // Implement reply functionality
  // This could either open a reply form below the comment
  // or auto-fill the main comment form with @username
}

const navigateToTag = (tag: string) => {
  // Navigate to tag page or filter articles by tag
  // This would typically use your router
  // router.push({ path: '/blog', query: { tag } })
}

// Set page metadata
useHead({
  title: post.value.title,
  meta: [
    {
      name: 'description',
      content: post.value.summary,
    },
  ],
})
</script>

<style>
/* Custom prose styles for dark mode */
.prose-primary {
  --tw-prose-links: theme('colors.primary.500');
  --tw-prose-invert-links: theme('colors.primary.400');
}

.prose-invert {
  --tw-prose-body: theme('colors.gray.300');
  --tw-prose-headings: theme('colors.white');
  --tw-prose-lead: theme('colors.gray.300');
  --tw-prose-bold: theme('colors.white');
  --tw-prose-counters: theme('colors.gray.400');
  --tw-prose-bullets: theme('colors.gray.600');
  --tw-prose-hr: theme('colors.dark.700');
  --tw-prose-quotes: theme('colors.gray.300');
  --tw-prose-quote-borders: theme('colors.primary.500');
  --tw-prose-captions: theme('colors.gray.400');
  --tw-prose-code: theme('colors.white');
  --tw-prose-pre-code: theme('colors.gray.300');
  --tw-prose-pre-bg: theme('colors.dark.800');
  --tw-prose-th-borders: theme('colors.dark.700');
  --tw-prose-td-borders: theme('colors.dark.700');
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Add smooth transitions for interactive elements */
.comment-transition-enter-active,
.comment-transition-leave-active {
  transition: all 0.3s ease;
}

.comment-transition-enter-from,
.comment-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style> 