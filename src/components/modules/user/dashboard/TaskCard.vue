<script setup lang="ts">
import { onMounted } from 'vue'
import { GButton } from '@/components'
import { useTransactions } from '@/hooks/useTransactions'

const { rows, fetchTransactions } = useTransactions()

onMounted(async () => {
  await fetchTransactions()
})
</script>

<template>
  <section class="transaction-card" aria-labelledby="transaction-preview-title">
    <div class="transaction-header">
      <h2 id="transaction-preview-title">Transaction History</h2>
      <RouterLink class="see-all-link" to="/transaction-history">
        <GButton
          class="see-all"
          :icon="false"
          label="Lihat Semua"
          size="sm"
          type="outline-primary"
        />
      </RouterLink>
    </div>

    <div class="transaction-list" aria-label="5 transaksi terakhir">
      <div v-for="transaction in rows.slice(0, 5)" :key="transaction.id" class="transaction-row">
        <span class="transaction-name">{{ transaction.transactionType }}</span>
        <span class="transaction-amount">{{ transaction.amount }}</span>
        <strong class="transaction-status">{{ transaction.status }}</strong>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transaction-card {
  width: 368px;
  height: 238px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  padding: 12px 16px 24px;
  border-radius: 12px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.transaction-header {
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

h2 {
  overflow: hidden;
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-extrabold, 800);
  line-height: var(--g-kit-line-height-kappa);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.see-all-link {
  flex: 0 0 auto;
  text-decoration: none;
}

.see-all {
  width: auto;
}

.transaction-list {
  width: 100%;
  height: 156px;
  min-height: 156px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
}

.transaction-row {
  width: 100%;
  min-height: 52px;
  flex: 0 0 52px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 72px 72px;
  align-items: center;
  column-gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--g-kit-black-20);
  color: var(--g-kit-black-80);
  box-sizing: border-box;
}

.transaction-row:last-child {
  border-bottom: 0;
}

.transaction-name {
  min-width: 0;
  overflow: hidden;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-semibold, 600);
  line-height: var(--g-kit-line-height-sigma);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transaction-amount {
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  text-align: right;
  white-space: nowrap;
}

.transaction-status {
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-extrabold, 800);
  line-height: var(--g-kit-line-height-sigma);
  text-align: right;
}

@media (max-width: 1180px) {
  .transaction-card {
    width: 100%;
  }
}

@media (max-width: 420px) {
  .transaction-card {
    height: auto;
    min-height: 238px;
  }

  .transaction-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
