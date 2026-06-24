<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import AdminFooter from './AdminFooter.vue'
import AdminSideNav from './AdminSideNav.vue'
import AdminTopNav from './AdminTopNav.vue'
import type { AdminNavItem } from './types'

const router = useRouter()

const props = withDefaults(
  defineProps<{
    navItems: AdminNavItem[]
    sidebarExpanded?: boolean
    userName?: string
    userRole?: string
    historyLabel?: string
    footerText?: string
  }>(),
  {
    sidebarExpanded: false,
    userName: 'THORIQ SADAD',
    userRole: 'Exportir Umum',
    historyLabel: 'Transaction History',
    footerText: 'Copyright © 2026 PT. Pegadaian. All Rights Reserved.',
  },
)

const isSidebarExpanded = ref(props.sidebarExpanded)
const isMobileMenuOpen = ref(false)

const activeNavItem = computed(() => props.navItems.find((item) => item.active))

const isMobileViewport = () => window.matchMedia('(max-width: 900px)').matches

const toggleNavigation = () => {
  if (isMobileViewport()) {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    return
  }

  isSidebarExpanded.value = !isSidebarExpanded.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleNavigate = (item: AdminNavItem) => {
  closeMobileMenu()
  if (item.route) {
    router.push(item.route)
  }
}
</script>

<template>
  <div class="admin-shell" :class="{ 'is-sidebar-expanded': isSidebarExpanded }">
    <AdminTopNav
      :navigation-expanded="isMobileMenuOpen || isSidebarExpanded"
      :user-name="userName"
      :user-role="userRole"
      :history-label="historyLabel"
      @toggle-navigation="toggleNavigation"
    >
      <template v-if="$slots.brand" #brand>
        <slot name="brand" />
      </template>
      <template v-if="$slots['top-actions']" #actions>
        <slot name="top-actions" />
      </template>
    </AdminTopNav>

    <div v-if="isMobileMenuOpen" class="mobile-overlay" @click="closeMobileMenu" />

    <AdminSideNav
      :items="navItems"
      :expanded="isSidebarExpanded"
      :mobile-open="isMobileMenuOpen"
      @navigate="handleNavigate"
    >
      <template #panel>
        <slot name="side-panel" :active-item="activeNavItem">
          <span>{{ activeNavItem?.label }}</span>
        </slot>
      </template>
    </AdminSideNav>

    <main class="admin-main">
      <slot />
    </main>

    <AdminFooter v-if="$slots.footer" :text="footerText">
      <slot name="footer" />
    </AdminFooter>
    <AdminFooter v-else :text="footerText" />
  </div>
</template>

<style scoped>
.admin-shell {
  --admin-sidebar-current-width: 80px;
  min-height: 100svh;
  display: grid;
  grid-template-columns: var(--admin-sidebar-current-width) minmax(0, 1fr);
  grid-template-rows: 72px minmax(0, 1fr) 48px;
  background: var(--g-kit-black-10);
  color: var(--g-kit-black-80);
  font-family:
    'Nunito Sans',
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  transition: grid-template-columns 0.2s ease;
}

.admin-shell.is-sidebar-expanded {
  --admin-sidebar-current-width: 334px;
}

.admin-main {
  grid-column: 2;
  min-width: 0;
  padding: 24px;
}

.mobile-overlay {
  display: none;
}

@media (max-width: 900px) {
  .admin-shell,
  .admin-shell.is-sidebar-expanded {
    --admin-sidebar-current-width: 64px;
    grid-template-columns: 1fr;
    grid-template-rows: 64px minmax(0, 1fr) auto;
  }

  .mobile-overlay {
    display: block;
    position: fixed;
    inset: 64px 0 0;
    z-index: 12;
    background: rgb(0 0 0 / 35%);
  }

  .admin-main {
    grid-column: 1;
    padding: 16px;
  }
}
</style>
