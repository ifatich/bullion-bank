<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const navItems = [
  {
    label: 'Dashboard',
    icon: 'home',
    active: true,
  },
  {
    label: 'User',
    icon: 'user',
    active: false,
  },
  {
    label: 'Transaction History',
    icon: 'document',
    active: false,
  },
  {
    label: 'Admin List',
    icon: 'admin',
    active: false,
  },
  {
    label: 'Profile',
    icon: 'profile',
    active: false,
  },
]

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="admin-shell">
    <header class="admin-header">
      <button
        class="menu-trigger"
        type="button"
        aria-label="Toggle menu"
        :aria-expanded="isMobileMenuOpen"
        @click="toggleMenu"
      >
        <span />
        <span />
        <span />
      </button>

      <div class="brand-mark" aria-label="Dashboard admin">
        <img src="@/assets/images/bullion-bank-logo.svg" alt="" />

        <div class="header-actions">
          <button class="history-link" type="button">Transaction History</button>
          <span class="header-divider" />
          <button class="profile-trigger" type="button">
            <span>
              <strong>THORIQ SADAD</strong>
              <small>Exportir Umum</small>
            </span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m7 9 5 5 5-5" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <div v-if="isMobileMenuOpen" class="mobile-overlay" @click="closeMenu" />

    <aside class="admin-sidebar" :class="{ 'is-open': isMobileMenuOpen }">
      <nav class="side-nav" aria-label="Admin navigation">
        <button
          v-for="item in navItems"
          :key="item.label"
          class="side-nav-item"
          :class="{ 'is-active': item.active }"
          type="button"
          @click="closeMenu"
        >
          <span class="nav-icon" :class="`is-${item.icon}`" aria-hidden="true">
            <svg v-if="item.icon === 'home'" viewBox="0 0 24 24">
              <path d="M3 10.8 12 3.5l9 7.3" />
              <path d="M5 10v9.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V10" />
              <path d="M9 21v-6h6v6" />
            </svg>
            <svg v-else-if="item.icon === 'user'" viewBox="0 0 24 24">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
              <path d="M5 21a7 7 0 0 1 14 0" />
            </svg>
            <svg v-else-if="item.icon === 'document'" viewBox="0 0 24 24">
              <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
              <path d="M14 3v5h4" />
              <path d="M9 12h6M9 16h6" />
            </svg>
            <svg v-else-if="item.icon === 'admin'" viewBox="0 0 24 24">
              <path d="M9.5 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
              <path d="M3.5 20a6 6 0 0 1 10.2-4.3" />
              <path d="M18 14v6M15 17h6" />
            </svg>
            <svg v-else-if="item.icon === 'profile'" viewBox="0 0 24 24">
              <path d="M4 8h12a3 3 0 0 1 0 6H8" />
              <path d="M8 4 4 8l4 4" />
              <path d="M20 16H8a3 3 0 0 0 0 6h8" />
            </svg>
          </span>
          <span class="nav-label">{{ item.label }}</span>
        </button>
      </nav>
    </aside>

    <main class="admin-main">
      <slot />
    </main>

    <footer class="admin-footer">Copyright © 2026 PT. Pegadaian. All Rights Reserved.</footer>
  </div>
</template>

<style scoped>
.admin-shell {
  min-height: 100svh;
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
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
}

.admin-header {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  align-items: center;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
  z-index: 20;
}

.menu-trigger {
  width: 80px;
  height: 72px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 0;
  background: var(--g-kit-broccoli-50);
  cursor: pointer;
}

.menu-trigger span {
  width: 18px;
  height: 2px;
  border-radius: 8px;
  background: var(--g-kit-white);
}

.brand-mark {
  width: stretch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-self: start;
  margin-left: 24px;
}

.brand-mark img {
  width: 40px;
  height: 100%;
  display: block;
  object-fit: contain;
}

.header-actions {
  grid-column: 2;
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 32px;
  margin-right: 24px;
}

.history-link {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
  white-space: nowrap;
  cursor: default;
}

.header-divider {
  width: 1px;
  height: 40px;
  background: var(--g-kit-black-20);
}

.profile-trigger {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  border: 0;
  background: transparent;
  color: var(--g-kit-black-80);
  cursor: pointer;
}

.profile-trigger span {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.profile-trigger strong,
.profile-trigger small {
  font-weight: var(--g-kit-font-weight-bold);
}

.profile-trigger strong {
  font-size: var(--g-kit-font-size-sigma);
  line-height: var(--g-kit-line-height-sigma);
}

.profile-trigger small {
  font-size: var(--g-kit-font-size-omega);
  line-height: var(--g-kit-line-height-omega);
}

.profile-trigger svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.admin-sidebar {
  grid-row: 2 / 4;
  background: var(--g-kit-broccoli-50);
  z-index: 15;
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.side-nav-item {
  min-height: 78px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px 4px;
  border: 0;
  background: transparent;
  color: var(--g-kit-white);
  font: inherit;
  text-align: center;
  cursor: default;
}

.side-nav-item.is-active {
  position: relative;
  margin-left: 4px;
  border-radius: 8px 0 0 8px;
  background: var(--g-kit-black-10);
  color: var(--g-kit-broccoli-50);
}

.nav-icon,
.nav-icon svg {
  width: 24px;
  height: 24px;
}

.nav-icon svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.nav-label {
  max-width: 72px;
  color: currentColor;
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omega);
}

.admin-main {
  grid-column: 2;
  min-width: 0;
  padding: 24px;
}

.admin-footer {
  grid-column: 2;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--g-kit-black-20);
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
  text-align: center;
}

.mobile-overlay {
  display: none;
}

@media (max-width: 900px) {
  .admin-shell {
    grid-template-columns: 1fr;
    grid-template-rows: 64px minmax(0, 1fr) auto;
  }

  .admin-header {
    grid-template-columns: 64px minmax(0, 1fr);
    position: sticky;
    top: 0;
  }

  .menu-trigger {
    width: 64px;
    height: 64px;
    background: white;

    span {
      background: var(--g-kit-broccoli-50);
    }
  }

  .brand-mark {
    margin-left: 16px;

    img {
      content-visibility: hidden;
      visibility: hidden;
    }
  }

  .header-actions {
    gap: 16px;
    margin-right: 16px;
  }

  .history-link,
  .header-divider {
    display: none;
  }

  .admin-sidebar {
    width: 240px;
    position: fixed;
    inset: 64px auto 0 0;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }

  .admin-sidebar.is-open {
    transform: translateX(0);
  }

  .side-nav-item {
    min-height: 56px;
    flex-direction: row;
    justify-content: flex-start;
    gap: 12px;
    padding: 12px 20px;
    text-align: left;
  }

  .side-nav-item.is-active {
    width: stretch;
    margin: 8px;
    border-radius: 8px;
  }

  .nav-label {
    max-width: none;
    font-size: var(--g-kit-font-size-sigma);
    line-height: var(--g-kit-line-height-sigma);
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

  .admin-footer {
    grid-column: 1;
    padding: 12px 16px;
    font-size: var(--g-kit-font-size-sigma);
    line-height: var(--g-kit-line-height-sigma);
  }
}

@media (max-width: 520px) {
  .profile-trigger {
    gap: 8px;
  }

  .profile-trigger strong {
    max-width: 112px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
