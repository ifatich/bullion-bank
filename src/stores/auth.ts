/**
 * @file auth.ts
 * @description Pinia store for authenticated user profile.
 * Fetches data from GET /auth/me on app mount and provides it
 * globally to all components (Navbar, Dashboard, Profile, etc.).
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import bullionBankService from '@/services/BullionBankService'
import type { UserProfile } from '@/types/user'

export const useAuthStore = defineStore('auth', () => {
  const profile = ref<UserProfile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // ── Getters ───────────────────────────────────────────────────────────────

  const userName = computed(() => profile.value?.name ?? '')
  const companyName = computed(() => profile.value?.companyName ?? '')
  const companyId = computed(() => profile.value?.companyId ?? '')
  const walletAddress = computed(() => profile.value?.walletAddress ?? '')
  const email = computed(() => profile.value?.email ?? '')
  const phone = computed(() => profile.value?.phone ?? '')
  const kybStatus = computed(() => profile.value?.kyb.status ?? 'UNSUBMITTED')
  const isLoggedIn = computed(() => profile.value !== null)

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Fetch the authenticated user's profile from the API.
   * Should be called once on app mount after a successful login.
   */
  async function fetchProfile() {
    isLoading.value = true
    error.value = null
    try {
      const response = await bullionBankService.getProfile()
      profile.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Gagal memuat profil pengguna.'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Clear stored profile on logout.
   */
  function clearProfile() {
    profile.value = null
    error.value = null
  }

  return {
    profile,
    isLoading,
    error,
    userName,
    companyName,
    companyId,
    walletAddress,
    email,
    phone,
    kybStatus,
    isLoggedIn,
    fetchProfile,
    clearProfile,
  }
})
