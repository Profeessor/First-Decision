import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  provider?: string
  age?: number
  gender?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    loading: false
  }),

  getters: {
    userProfile(state: AuthState): User | null {
      return state.user
    },
    isLoggedIn(state: AuthState): boolean {
      return state.isAuthenticated
    }
  },

  actions: {
    async signInWithEmail(email: string, password: string) {
      this.loading = true
      try {
        // Implement email/password authentication
        // This would typically involve your backend API
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
        const userData = await response.json()
        this.user = userData
        this.isAuthenticated = true
      } catch (error) {
        console.error('Sign in error:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async signInWithGoogle() {
      this.loading = true
      try {
        // Implement Google OAuth
        // This would typically use a library like @nuxtjs/auth-next
        const response = await fetch('/api/auth/google')
        const userData = await response.json()
        this.user = userData
        this.isAuthenticated = true
      } catch (error) {
        console.error('Google sign in error:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async signInWithGithub() {
      this.loading = true
      try {
        // Implement GitHub OAuth
        const response = await fetch('/api/auth/github')
        const userData = await response.json()
        this.user = userData
        this.isAuthenticated = true
      } catch (error) {
        console.error('GitHub sign in error:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async signOut() {
      this.loading = true
      try {
        // Implement sign out
        await fetch('/api/auth/logout', { method: 'POST' })
        this.user = null
        this.isAuthenticated = false
      } catch (error) {
        console.error('Sign out error:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 