<script setup lang="ts">
import logoSrc from '@/assets/images/bullion-bank-logo.svg'

withDefaults(
  defineProps<{
    navigationExpanded: boolean
    brandAlt?: string
    userName?: string
    userRole?: string
    historyLabel?: string
  }>(),
  {
    brandAlt: 'Dashboard admin',
    userName: 'THORIQ SADAD',
    userRole: 'Exportir Umum',
    historyLabel: 'Transaction History',
  },
)

const emit = defineEmits<{
  toggleNavigation: []
}>()
</script>

<template>
  <header class="admin-top-nav">
    <button
      class="menu-trigger"
      type="button"
      aria-label="Toggle menu"
      :aria-expanded="navigationExpanded"
      @click="emit('toggleNavigation')"
    >
      <span />
      <span />
      <span />
    </button>

    <div class="brand-mark" :aria-label="brandAlt">
      <slot name="brand">
        <img :src="logoSrc" alt="" />
      </slot>

      <div class="header-actions">
        <slot name="actions">
          <button class="history-link" type="button">{{ historyLabel }}</button>
          <span class="header-divider" />
          <button class="profile-trigger" type="button">
            <span>
              <strong>{{ userName }}</strong>
              <small>{{ userRole }}</small>
            </span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m7 9 5 5 5-5" />
            </svg>
          </button>
        </slot>
      </div>
    </div>
  </header>
</template>

<style scoped>
.admin-top-nav {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: var(--admin-sidebar-current-width, 80px) minmax(0, 1fr);
  align-items: center;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
  z-index: 20;
  transition: grid-template-columns 0.2s ease;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-self: start;
  padding-left: 24px;
}

.brand-mark img {
  width: 40px;
  height: 100%;
  display: block;
  object-fit: contain;
}

.header-actions {
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

@media (max-width: 900px) {
  .admin-top-nav {
    grid-template-columns: 64px minmax(0, 1fr);
    position: sticky;
    top: 0;
  }

  .menu-trigger {
    width: 64px;
    height: 64px;
    background: var(--g-kit-white);
  }

  .menu-trigger span {
    background: var(--g-kit-broccoli-50);
  }

  .brand-mark {
    padding-left: 16px;
  }

  .brand-mark img {
    content-visibility: hidden;
    visibility: hidden;
  }

  .header-actions {
    gap: 16px;
    margin-right: 16px;
  }

  .history-link,
  .header-divider {
    display: none;
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
