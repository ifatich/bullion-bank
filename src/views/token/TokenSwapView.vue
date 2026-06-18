<script setup lang="ts">
import { GButton, GBreadcrumb } from '@/components'
import DashboardTopbar from '@/components/modules/dashboard/DashboardTopbar.vue'
import TokenSwapForm from '@/components/modules/token-swap/TokenSwapForm.vue'
import NavBack from '@/components/shared/navBack/navBack.vue'

const breadcrumbItems = ['Dashboard', 'Token Swap']
</script>

<template>
  <div class="token-swap-page">
    <main class="token-swap-main">
      <DashboardTopbar />

      <nav class="breadcrumb-row" aria-label="Breadcrumb">
        <GBreadcrumb :items="breadcrumbItems" />
      </nav>

      <div class="header-line" aria-hidden="true" />

      <section class="swap-content" aria-labelledby="swap-page-title">
        <NavBack id="swap-page-title" label="Dashboard" to="/dashboard" />

        <aside class="info-banner">
          <p>Instantly exchange bullion-backed tokens with secure, fast and transparent transactions.</p>
          <span class="info-accent" aria-hidden="true" />
        </aside>

        <TokenSwapForm />
      </section>
    </main>

    <footer class="swap-footer">Copyright © 2024 PT. Pegadaian. All Rights Reserved.</footer>

    <div class="action-bar">
      <div class="action-inner">
        <GButton class="action-button" :icon="false" label="Abort" size="md" type="neutral" />
        <GButton class="action-button" :icon="false" label="Swap Token" size="md" type="primary" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.token-swap-page {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  font-family:
    'Nunito Sans',
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.token-swap-main {
  flex: 1;
}

.breadcrumb-row,
.header-line,
.swap-content,
.action-inner {
  width: min(1152px, calc(100vw - 48px));
  margin-right: auto;
  margin-left: auto;
}

.breadcrumb-row {
  margin-top: 12px;
}

.header-line {
  height: 1px;
  background: var(--g-kit-black-20);
}

.swap-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 39px;
}

.info-banner {
  min-height: 48px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 12px;
  border-radius: 6px;
  background: var(--g-kit-blue-10);
}

.info-banner p {
  position: relative;
  z-index: 1;
  min-width: 0;
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.info-accent {
  position: absolute;
  top: -48px;
  right: -65px;
  width: 129px;
  height: 111px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--g-kit-blue-40) 35%, transparent);
}

.info-accent::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--g-kit-blue-40) 18%, transparent);
}

.swap-footer {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--g-kit-black-20);
  background: var(--g-kit-white);
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.action-bar {
  min-height: 104px;
  display: flex;
  align-items: center;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.action-inner {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
}

.action-button {
  width: 200px;
}

@media (max-width: 760px) {
  .breadcrumb-row,
  .header-line,
  .swap-content,
  .action-inner {
    width: calc(100vw - 32px);
  }

  .swap-content {
    margin-top: 24px;
  }

  .swap-footer {
    padding: 12px 16px;
    text-align: center;
    font-size: var(--g-kit-font-size-sigma);
  }

  .action-inner {
    flex-direction: column-reverse;
    gap: 12px;
  }

  .action-button {
    width: 100%;
  }
}
</style>
