<script setup lang="ts">
import { ref } from 'vue'

import { GTable } from '@/components'
import { useAppAlert } from '@/hooks/useAppAlert'

const rowLimit = ref('10')
const lastUpdated = ref('08/07/2024, 09.00 AM')
const { showAlert } = useAppAlert()

const columns = [
  { key: 'no', label: 'No' },
  { key: 'transactionName', label: 'Transaction Name' },
  { key: 'action', label: 'Action' },
]

type TransactionHistoryRow = {
  id: number
  no: string
  transactionName: string
  action: string
}

const rows: TransactionHistoryRow[] = [
  {
    id: 1,
    no: '1',
    transactionName: 'Token Swap',
    action: 'Swap Token',
  },
  {
    id: 2,
    no: '2',
    transactionName: 'Token Redemption',
    action: 'Request Redemption',
  },
  {
    id: 3,
    no: '3',
    transactionName: 'Profile Update',
    action: 'Update Profile',
  },
]

const paginationSummary = `Menampilkan 1 sampai ${rows.length} dari ${rows.length} baris`

const refreshData = () => {
  lastUpdated.value = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date())
  showAlert({
    label: 'Transaction history berhasil diperbarui.',
    variant: 'info',
  })
}
</script>

<template>
  <section class="history-card" aria-labelledby="transaction-history-title">
    <header class="history-card-header">
      <h1 id="transaction-history-title">Transaction History</h1>
      <p>
        Last updated on {{ lastUpdated }}
        <button
          class="refresh-button"
          type="button"
          aria-label="Refresh transaction history data"
          @click="refreshData"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 11a8 8 0 0 0-14.6-4.5M4 4v5h5M4 13a8 8 0 0 0 14.6 4.5M20 20v-5h-5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </p>
    </header>

    <div class="history-toolbar" aria-label="Rows per page">
      <span>Lihat</span>
      <label class="row-limit">
        <select v-model="rowLimit" aria-label="Jumlah baris">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </label>
      <span>baris</span>
    </div>

    <div class="history-table-wrap">
      <GTable
        class="history-table"
        :columns="columns"
        :data="rows"
        nodata-message="Belum ada data yang ditampilkan."
      />
    </div>

    <footer class="history-table-footer">{{ paginationSummary }}</footer>
  </section>
</template>

<style scoped>
.history-card {
  width: 100%;
  min-height: 434px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.history-card-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

h1,
p {
  margin: 0;
}

h1 {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.history-card-header p {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.refresh-button {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--g-kit-black-50);
  cursor: pointer;
}

.refresh-button svg {
  width: 16px;
  height: 16px;
}

.history-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.row-limit {
  width: 80px;
  height: 40px;
  position: relative;
  display: inline-flex;
  align-items: center;
}

.row-limit select {
  width: 100%;
  height: 100%;
  appearance: none;
  padding: 8px 34px 8px 12px;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 6px;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  font: inherit;
  cursor: pointer;
}

.row-limit svg {
  position: absolute;
  right: 10px;
  width: 18px;
  height: 18px;
  color: var(--g-kit-black-60);
  pointer-events: none;
}

.history-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.history-table-wrap :deep(.history-table) {
  width: 100%;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 8px;
  border-spacing: 0;
}

.history-table-wrap :deep(.history-table th) {
  height: 48px;
  padding: 12px 16px;
  border: 0;
  background: var(--g-kit-lime-50);
  color: var(--g-kit-white);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
  text-align: left;
}

.history-table-wrap :deep(.history-table th:first-child) {
  width: 96px;
}

.history-table-wrap :deep(.history-table th:last-child) {
  width: 180px;
}

.history-table-wrap :deep(.history-table td) {
  padding: 16px;
  border-top: 1px solid var(--g-kit-black-20);
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.history-table-wrap :deep(.history-table tbody td[colspan]) {
  color: var(--g-kit-black-50);
  text-align: center;
  vertical-align: middle;
}

.history-table-footer {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

@media (max-width: 760px) {
  .history-card {
    padding: 20px 16px;
  }

  .history-card-header p {
    align-items: flex-start;
  }
}
</style>
