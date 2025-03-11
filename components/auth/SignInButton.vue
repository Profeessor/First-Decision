<template>
  <div>
    <!-- Sign In Button -->
    <button
      v-if="!isLoggedIn"
      @click="openModal"
      class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
    >
      Sign in
    </button>

    <!-- User Menu (when logged in) -->
    <div v-else class="relative">
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="flex items-center space-x-2 px-4 py-2 bg-dark-800 text-white rounded-lg hover:bg-dark-700 transition-colors duration-200"
      >
        <img
          v-if="userProfile?.avatar"
          :src="userProfile.avatar"
          :alt="userProfile?.name"
          class="w-6 h-6 rounded-full"
        />
        <span v-else class="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
          {{ userProfile?.name?.[0] || 'U' }}
        </span>
        <span class="text-sm">{{ userProfile?.name || 'User' }}</span>
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="isMenuOpen"
        class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-dark-800 ring-1 ring-black ring-opacity-5"
      >
        <div class="py-1" role="menu">
          <a
            href="/profile"
            class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
            role="menuitem"
          >
            Your Profile
          </a>
          <a
            href="/settings"
            class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
            role="menuitem"
          >
            Settings
          </a>
          <button
            @click="handleSignOut"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>

    <!-- Sign In Modal -->
    <SignInModal
      :is-open="isModalOpen"
      @close="closeModal"
      @toggle-sign-up="handleToggleSignUp"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import SignInModal from './SignInModal.vue'

const auth = useAuthStore()
const isModalOpen = ref(false)
const isMenuOpen = ref(false)

const isLoggedIn = computed(() => auth.isLoggedIn)
const userProfile = computed(() => auth.userProfile)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleToggleSignUp = () => {
  // Implement sign up logic or navigation
  console.log('Toggle sign up')
}

const handleSignOut = async () => {
  try {
    await auth.signOut()
    isMenuOpen.value = false
  } catch (error) {
    console.error('Sign out error:', error)
  }
}

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 