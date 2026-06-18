<script setup lang="ts">
import DashboardSummary from '@/components/modules/dashboard/DashboardSummary.vue'
import DashboardTopbar from '@/components/modules/dashboard/DashboardTopbar.vue'
import MenuSection from '@/components/modules/dashboard/MenuSection.vue'
import TaskCard from '@/components/modules/dashboard/TaskCard.vue'

const tokenMenus = [{ label: 'Swap', to: '/token/swap' }, { label: 'Redemption' }, { label: 'Transfer' }]
const qrMenus = [{ label: 'Add QR' }]
</script>

<template>
  <div class="dashboard-page">
    <main class="dashboard-shell">
      <DashboardTopbar />

      <div class="dashboard-content">
        <div class="top-grid">
          <DashboardSummary />
          <TaskCard />
        </div>

        <div class="menu-row">
          <MenuSection title="Token" :items="tokenMenus" />
          <MenuSection title="QR Generate" :items="qrMenus" />
        </div>
      </div>
    </main>

    <footer class="dashboard-footer">Copyright © 2024 PT. Pegadaian. All Rights Reserved.</footer>
  </div>
</template>

<style scoped>
.dashboard-page {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
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

.dashboard-shell {
  flex: 1;
}

.dashboard-content {
  width: min(1152px, calc(100vw - 48px));
  margin: 24px auto 0;
}

.top-grid {
  display: grid;
  grid-template-columns: 760px 368px;
  gap: 24px;
  align-items: start;
}

.menu-row {
  display: grid;
  grid-template-columns: 368px 368px;
  gap: 24px;
  margin-top: 28px;
}

.dashboard-footer {
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

@media (max-width: 1180px) {
  .top-grid,
  .menu-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .dashboard-content {
    width: calc(100vw - 32px);
    margin-top: 16px;
  }

  .dashboard-footer {
    padding: 12px 16px;
    text-align: center;
    font-size: var(--g-kit-font-size-sigma);
  }
}
</style>
