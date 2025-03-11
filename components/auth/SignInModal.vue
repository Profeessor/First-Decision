<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click="closeModal">
    <div class="flex min-h-screen items-center justify-center px-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <!-- Modal -->
      <div
        class="relative transform overflow-hidden rounded-lg bg-white dark:bg-dark-800 px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6"
        @click.stop
      >
        <!-- Close button -->
        <div class="absolute right-0 top-0 pr-4 pt-4">
          <button
            @click="closeModal"
            class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span class="sr-only">Close</span>
            <Icon name="heroicons:x-mark" class="h-6 w-6" />
          </button>
        </div>

        <!-- Modal content -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Sign in to your account
          </h2>

          <!-- Email sign in form -->
          <form @submit.prevent="handleEmailSignIn" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {{ loading ? 'Signing in...' : 'Sign in with Email' }}
            </button>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300 dark:border-dark-600" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white dark:bg-dark-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <button
                @click="handleGoogleSignIn"
                :disabled="loading"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-dark-600 rounded-md shadow-sm bg-white dark:bg-dark-900 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700"
              >
                <Icon name="logos:google-icon" class="h-5 w-5" />
                <span class="sr-only">Sign in with Google</span>
              </button>

              <button
                @click="handleGithubSignIn"
                :disabled="loading"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-dark-600 rounded-md shadow-sm bg-white dark:bg-dark-900 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700"
              >
                <Icon name="logos:github-icon" class="h-5 w-5" />
                <span class="sr-only">Sign in with GitHub</span>
              </button>
            </div>
          </div>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-500">
              Don't have an account?
              <button
                @click="toggleSignUp"
                class="font-medium text-primary-500 hover:text-primary-400"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'toggleSignUp'): void
}>()

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)

const closeModal = () => {
  emit('close')
}

const toggleSignUp = () => {
  emit('toggleSignUp')
}

const handleEmailSignIn = async () => {
  if (!email.value || !password.value) return

  loading.value = true
  try {
    await auth.signInWithEmail(email.value, password.value)
    closeModal()
  } catch (error) {
    console.error('Email sign in error:', error)
    // Handle error (show error message to user)
  } finally {
    loading.value = false
  }
}

const handleGoogleSignIn = async () => {
  loading.value = true
  try {
    await auth.signInWithGoogle()
    closeModal()
  } catch (error) {
    console.error('Google sign in error:', error)
    // Handle error (show error message to user)
  } finally {
    loading.value = false
  }
}

const handleGithubSignIn = async () => {
  loading.value = true
  try {
    await auth.signInWithGithub()
    closeModal()
  } catch (error) {
    console.error('GitHub sign in error:', error)
    // Handle error (show error message to user)
  } finally {
    loading.value = false
  }
}
</script> 