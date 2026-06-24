<script setup lang="ts">
import { ref } from 'vue'

import DashboardSummary from '@/components/modules/user/dashboard/DashboardSummary.vue'
import MenuSection from '@/components/modules/user/dashboard/MenuSection.vue'
import QRGenerateModal from '@/components/modules/user/dashboard/QRGenerateModal.vue'
import TaskCard from '@/components/modules/user/dashboard/TaskCard.vue'
import UserPageLayout from '@/components/shared/layouts/UserPageLayout.vue'
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
  <UserPageLayout background="var(--g-kit-black-10)">
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

    <QRGenerateModal v-model="isQRModalOpen" />
  </UserPageLayout>
</template>

<style scoped>
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
}
</style>
