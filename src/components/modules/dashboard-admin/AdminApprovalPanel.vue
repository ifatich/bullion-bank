<script setup lang="ts">
import { GButton } from '@/components'
import { useAppAlert } from '@/hooks/useAppAlert'

type ApprovalItem = {
  walletAddress: string
  approvalProgress: string
}

defineProps<{
  items: ApprovalItem[]
}>()

const { showAlert } = useAppAlert()

const showDetail = (walletAddress: string) => {
  showAlert({
    label: `Detail approval ${walletAddress.slice(0, 12)}... dibuka.`,
    variant: 'success',
  })
}
</script>

<template>
  <section class="approval-card" aria-labelledby="approval-title">
    <header class="approval-header">
      <h2 id="approval-title">Need Approval</h2>
      <GButton
        class="see-all-button"
        :icon="false"
        label="Lihat Semua"
        size="sm"
        type="outline-primary"
      />
    </header>

    <div class="approval-list">
      <div
        v-for="item in items"
        :key="item.walletAddress + item.approvalProgress"
        class="approval-row"
      >
        <span class="wallet-address">{{ item.walletAddress }}</span>
        <span class="progress-badge">{{ item.approvalProgress }}</span>
        <GButton
          class="detail-button"
          :icon="false"
          label="Detail"
          size="sm"
          type="outline-primary"
          @click="showDetail(item.walletAddress)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.approval-card {
  width: 368px;
  min-height: 226px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 16px 0;
  overflow: hidden;
  border-radius: 12px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.approval-header {
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

h2 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.see-all-button,
.detail-button {
  width: auto;
  flex: 0 0 auto;
}

.approval-list {
  display: flex;
  flex-direction: column;
}

.approval-row {
  min-height: 56px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid var(--g-kit-black-20);
}

.approval-row:last-child {
  border-bottom: 0;
}

.wallet-address {
  min-width: 0;
  overflow: hidden;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress-badge {
  min-width: 39px;
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  border-radius: 4px;
  background: var(--g-kit-blue-10);
  color: var(--g-kit-blue-50);
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omega);
}

@media (max-width: 1180px) {
  .approval-card {
    width: 100%;
  }
}

@media (max-width: 420px) {
  .approval-card {
    padding-bottom: 12px;
  }

  .approval-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .approval-row {
    grid-template-columns: minmax(0, 1fr) auto;
    row-gap: 8px;
    padding: 12px 0;
  }

  .detail-button {
    grid-column: 1 / -1;
  }
}
</style>
