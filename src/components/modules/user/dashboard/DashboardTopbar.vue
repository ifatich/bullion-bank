<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { GBerandaHeader, GButton } from '@/components'
import { useAppAlert } from '@/hooks/useAppAlert'
import { useAuthStore } from '@/stores/auth'

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Transaction History', to: '/transaction-history' },
  { label: 'Profile', to: '/profile' },
]

const authStore = useAuthStore()
const router = useRouter()
const { showAlert } = useAppAlert()
const isProfileSheetOpen = ref(false)

const isMobileViewport = () => window.matchMedia('(max-width: 900px)').matches

const goTo = (path: string) => {
  isProfileSheetOpen.value = false
  router.push(path)
}

const logout = () => {
  isProfileSheetOpen.value = false
  showAlert({
    label: 'Logout berhasil.',
    variant: 'success',
  })
  router.push('/')
}

const syncProfileSheetState = () => {
  window.setTimeout(() => {
    isProfileSheetOpen.value = Boolean(
      document.querySelector(
        '.dashboard-topbar-shell .sprint-nav .dd-nav.last-child .dropdown-menu.show',
      ),
    )
  }, 0)
}

const handleTopbarClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (target.closest('.navbar-brand')) {
    event.preventDefault()
    goTo('/dashboard')
    return
  }

  if (!isMobileViewport()) return

  if (target.closest('.dd-nav.last-child .dropdown-toggle')) {
    syncProfileSheetState()
  }
}

const closeProfileSheet = () => {
  isProfileSheetOpen.value = false
}
</script>

<template>
  <div v-if="isProfileSheetOpen" class="profile-sheet-overlay" @click="closeProfileSheet" />

  <div
    class="dashboard-topbar-shell"
    :class="{ 'is-profile-sheet-open': isProfileSheetOpen }"
    @click.capture="handleTopbarClick"
  >
    <GBerandaHeader :user="authStore.userName" :jabatan="authStore.companyName">
      <template #search>
        <nav class="dashboard-nav" aria-label="Dashboard navigation">
          <RouterLink v-for="item in navItems" :key="item.label" :to="item.to">
            {{ item.label }}
          </RouterLink>
        </nav>
      </template>

      <template #riwayat>
        <GButton
          :icon="false"
          type="link"
          size="md"
          label="Transaction History"
          @click="goTo('/transaction-history')"
        />
      </template>

      <template #notifikasi>
        <p class="dropdown-copy">Belum ada notifikasi baru.</p>
      </template>

      <template #profil>
        <div class="profile-menu-list" role="menu" aria-label="Profile menu">
          <button class="profile-menu-item" type="button" role="menuitem" @click="goTo('/profile')">
            Profile
          </button>
          <button class="profile-menu-item is-danger" type="button" role="menuitem" @click="logout">
            Logout
          </button>
        </div>
      </template>
    </GBerandaHeader>
  </div>
</template>

<style scoped>
.dashboard-topbar-shell {
  width: min(1152px, calc(100vw - 48px));
  height: 78px;
  margin: 16px auto 0;
  position: relative;
}

.dashboard-nav {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.dashboard-nav a {
  color: var(--g-kit-white);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-semibold, 600);
  line-height: var(--g-kit-line-height-omicron);
  text-decoration: none;
  white-space: nowrap;
}

.dashboard-nav a.router-link-active {
  font-weight: var(--g-kit-font-weight-semibold, 600);
}

.dropdown-copy {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.profile-sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 1079;
  background: rgb(0 0 0 / 40%);
}

.dashboard-topbar-shell :deep(.sprint-nav nav.exa-header.desktop.container) {
  width: 100%;
  height: 78px;
  position: relative !important;
  inset: auto !important;
  display: flex;
  align-items: center;
  margin: 0 !important;
  padding: 0 32px !important;
  border-radius: 12px !important;
  overflow: visible;
  background-color: var(--g-kit-broccoli-50, #004d43) !important;
  background-size: cover;
  background-position: center;
  box-shadow:
    0 2px 6px rgb(0 0 0 / 14%),
    0 0 2px rgb(0 0 0 / 8%);
}

.dashboard-topbar-shell :deep(.sprint-nav nav.exa-header.mobile) {
  display: none !important;
}

.dashboard-topbar-shell :deep(.sprint-nav .navbar-brand) {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 18px;
  left: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.dashboard-topbar-shell :deep(.sprint-nav nav.exa-header .navbar-brand img) {
  display: none;
}

.dashboard-topbar-shell :deep(.sprint-nav .navbar-brand::before) {
  content: '';
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
  background: url('@/assets/images/bullion-bank-logo.svg') center / contain no-repeat;
}

.dashboard-topbar-shell :deep(.sprint-nav .navbar-toggler) {
  display: none;
}

.dashboard-topbar-shell :deep(.sprint-nav .navbar-collapse) {
  height: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  flex-basis: auto;
}

.dashboard-topbar-shell :deep(.sprint-nav .dd-nav:not(.last-child)) {
  display: none !important;
}

.dashboard-topbar-shell :deep(.sprint-nav nav.exa-header .navbar-nav) {
  width: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  flex: none;
  transform: translate(-50%, -50%);
}

.dashboard-topbar-shell :deep(.sprint-nav nav.exa-header form) {
  position: absolute;
  top: 19px;
  right: 32px;
  display: flex;
  align-items: center;
  gap: 0;
  margin: 0;
}

.dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child) {
  position: relative;
  border-left: 0 !important;
}

.dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-toggle) {
  position: relative;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: center !important;
  gap: 0;
  padding: none !important;
  border: 0 !important;
  background: transparent !important;
  color: var(--g-kit-white) !important;
  text-align: left;
  box-shadow: none !important;
}

.dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-toggle::after) {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  right: 0;
  margin: 0;
  border: 0;
  background: currentColor;
  transform: translateY(-50%);
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10L12 15L17 10' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    center / 24px 24px no-repeat;
}

.dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-toggle b) {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  color: var(--g-kit-white);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-extrabold, 800);
  line-height: var(--g-kit-line-height-sigma);
  letter-spacing: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-toggle) {
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-semibold, 600);
  line-height: var(--g-kit-line-height-omega);
  letter-spacing: 0;
  white-space: nowrap;
}

.dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-menu) {
  width: 212px !important;
  inset: 0 0 auto auto !important;
  right: 0 !important;
  left: auto !important;
  padding: 8px !important;
  border: 1px solid var(--g-kit-black-20) !important;
  border-radius: 8px !important;
  background: var(--g-kit-white) !important;
  box-shadow:
    0 8px 24px rgb(0 0 0 / 16%),
    0 2px 4px rgb(0 0 0 / 8%) !important;
  transform: translate(0, 28px) !important;
}

.dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-menu .card) {
  border: 0;
  background: transparent;
}

.dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-menu .card-body) {
  padding: 0;
}

.profile-menu-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-menu-item {
  width: 100%;
  min-height: 44px;
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-semibold, 600);
  line-height: var(--g-kit-line-height-omicron);
  text-align: left;
  cursor: pointer;
  border-radius: 0;
}

.profile-menu-item:hover,
.profile-menu-item:focus-visible {
  background: var(--g-kit-black-10);
  box-shadow: none;
}

.profile-menu-item.is-danger {
  color: var(--g-kit-red-50);
  border-top: 1px solid var(--g-kit-black-20);
}

@media (max-width: 900px) {
  .dashboard-topbar-shell {
    width: calc(100vw - 32px);
    height: auto;
    min-height: 96px;
    position: sticky;
    top: 8px;
    z-index: 100;
  }

  .dashboard-topbar-shell.is-profile-sheet-open {
    z-index: 1080;
  }

  .dashboard-nav {
    display: none;
  }

  .dashboard-topbar-shell :deep(.sprint-nav nav.exa-header.desktop.container) {
    width: 100%;
    height: auto;
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px !important;
  }

  .dashboard-topbar-shell :deep(.sprint-nav .navbar-brand) {
    position: static;
    flex: 0 0 auto;
  }

  .dashboard-topbar-shell :deep(.sprint-nav .navbar-collapse) {
    width: auto;
    height: auto;
    display: flex !important;
    flex: 0 1 auto;
    align-items: center;
    justify-content: flex-end;
  }

  .dashboard-topbar-shell :deep(.sprint-nav nav.exa-header .navbar-nav) {
    display: none !important;
  }

  .dashboard-topbar-shell :deep(.sprint-nav nav.exa-header form) {
    position: static;
    min-width: 0;
    max-width: 100%;
    margin: 0;
    transform: none;
  }

  .dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child) {
    min-width: 0;
    max-width: calc(100vw - 128px);
  }

  .dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-toggle) {
    max-width: 100%;
    min-height: 44px;
    align-items: flex-start !important;
    justify-content: center !important;
  }

  .dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-menu) {
    width: 100vw !important;
    max-width: 100vw !important;
    min-width: 100vw !important;
    position: fixed !important;
    inset: auto 0 0 0 !important;
    right: 0 !important;
    left: 0 !important;
    z-index: 1081 !important;
    padding: 12px 16px 20px !important;
    border: 0 !important;
    border-radius: 16px 16px 0 0 !important;
    transform: none !important;
  }

  .dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-menu::before) {
    content: '';
    width: 48px;
    height: 4px;
    display: block;
    margin: 0 auto 12px;
    border-radius: 999px;
    background: var(--g-kit-black-20);
  }
}

@media (max-width: 520px) {
  .dashboard-topbar-shell {
    width: calc(100vw - 16px);
    min-height: 96px;
    margin-top: 8px;
    top: 8px;
  }

  .dashboard-topbar-shell :deep(.sprint-nav nav.exa-header.desktop.container) {
    min-height: 96px;
    padding: 18px 24px !important;
  }

  .dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child) {
    max-width: calc(100vw - 120px);
  }

  .dashboard-topbar-shell :deep(.sprint-nav .dd-nav.last-child .dropdown-toggle b) {
    font-size: var(--g-kit-font-size-omicron);
    line-height: var(--g-kit-line-height-omicron);
  }
}
</style>
