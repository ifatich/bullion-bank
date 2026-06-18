<script setup lang="ts">
const navItems = ['Dashboard', 'Transaction History', 'Profile']
</script>

<template>
  <header class="dashboard-topbar">
    <div class="brand-mark">
      <img src="@/assets/images/bullion-bank-logo.svg" alt="Tokenized Gold Receipt" />
    </div>

    <nav class="dashboard-nav" aria-label="Dashboard navigation">
      <a v-for="item in navItems" :key="item" href="#" :class="{ active: item === 'Dashboard' }">
        {{ item }}
      </a>
    </nav>

    <button class="user-menu" type="button">
      <span>
        <strong>THORIQ SADAD</strong>
        <small>Exportir Umum</small>
      </span>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </header>
</template>

<style scoped>
.dashboard-topbar {
  width: min(1152px, calc(100vw - 48px));
  height: 76px;
  margin: 16px auto 0;
  display: grid;
  grid-template-columns: 160px 1fr 220px;
  align-items: center;
  padding: 0 32px;
  border-radius: 10px;
  background:
    linear-gradient(90deg, var(--g-kit-broccoli-50), var(--g-kit-turquoise-60)),
    url('@/assets/images/auth-bg.webp');
  background-size: cover;
  background-position: center;
  box-shadow: var(--bb-elevation-1);
}

.brand-mark {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
}

.brand-mark img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
}

.dashboard-nav {
  display: flex;
  justify-content: center;
  gap: 32px;
}

.dashboard-nav a {
  color: var(--g-kit-white);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
  text-decoration: none;
  opacity: 0.96;
}

.dashboard-nav a.active {
  font-weight: var(--g-kit-font-weight-bold);
}

.user-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--g-kit-white);
  text-align: left;
  cursor: pointer;
}

.user-menu strong,
.user-menu small {
  display: block;
}

.user-menu strong {
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
}

.user-menu small {
  margin-top: 2px;
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omega);
}

.user-menu svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 900px) {
  .dashboard-topbar {
    height: auto;
    grid-template-columns: auto 1fr;
    row-gap: 16px;
    padding: 18px 20px;
  }

  .dashboard-nav {
    grid-column: 1 / -1;
    grid-row: 2;
    justify-content: flex-start;
    overflow-x: auto;
  }

  .user-menu {
    justify-self: end;
  }
}
</style>
