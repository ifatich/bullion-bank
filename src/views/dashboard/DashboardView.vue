<script setup lang="ts">
import { ref } from 'vue'

import DashboardSummary from '@/components/modules/dashboard/DashboardSummary.vue'
import DashboardTopbar from '@/components/modules/dashboard/DashboardTopbar.vue'
import MenuSection from '@/components/modules/dashboard/MenuSection.vue'
import QRGenerateModal from '@/components/modules/dashboard/QRGenerateModal.vue'
import TaskCard from '@/components/modules/dashboard/TaskCard.vue'
import { useAppAlert } from '@/hooks/useAppAlert'

const tokenMenus = [
  { label: 'Swap', to: '/token/swap' },
  { label: 'Redemption', to: '/token/redemption' },
  { label: 'Transfer', to: '/token/transfer' },
]
const qrMenus = [{ label: 'Add QR' }]
const isQRModalOpen = ref(false)
const { showAlert } = useAppAlert()

const handleTokenMenuSelect = () => {
  showAlert({
    label: 'Fitur token transfer belum tersedia.',
    variant: 'warning',
  })
}

const openQRModal = () => {
  isQRModalOpen.value = true
}
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
          <MenuSection title="Token" :items="tokenMenus" @select="handleTokenMenuSelect" />
          <MenuSection title="QR Generate" :items="qrMenus" @select="openQRModal" />
        </div>
      </div>
    </main>

    <footer class="dashboard-footer">Copyright © 2024 PT. Pegadaian. All Rights Reserved.</footer>

    <QRGenerateModal v-model="isQRModalOpen" />
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
  padding-bottom: 48px;
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
    padding-bottom: 64px;
  }

  .dashboard-footer {
    padding: 12px 16px;
    text-align: center;
    font-size: var(--g-kit-font-size-sigma);
  }
}
</style>
