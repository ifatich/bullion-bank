<script setup lang="ts">
import { ref } from 'vue'

import { useAppAlert } from '@/hooks/useAppAlert'

const rowLimit = ref('10')
const lastUpdated = ref('08/07/2024, 09.00 AM')
const { showAlert } = useAppAlert()

type TransactionHistoryRow = {
  id: number
  no: string
  transactionHash: string
  fromCompany: string
  fromWallet: string
  toCompany: string
  toWallet: string
  date: string
  amount: string
}

const rows: TransactionHistoryRow[] = [
  {
    id: 1,
    no: '1',
    transactionHash: 'CMP-BBP-2026-000421',
    fromCompany: 'PT Indonesia Blockchain Persada',
    fromWallet: 'BBP-WAL-2026-001245',
    toCompany: 'PT MY Blockchain Corp',
    toWallet: 'BBP-WAL-2026-234354',
    date: '01 Mar 2022',
    amount: '12 PGT',
  },
  {
    id: 2,
    no: '2',
    transactionHash: 'CMP-BBP-2026-000422',
    fromCompany: 'PT Indonesia Maju',
    fromWallet: 'BBP-WAL-2026-008210',
    toCompany: 'PT Indonesia Blockchain Persada',
    toWallet: 'BBP-WAL-2026-001245',
    date: '01 Mar 2022',
    amount: '1 PGT',
  },
  {
    id: 3,
    no: '3',
    transactionHash: 'CMP-BBP-2026-000423',
    fromCompany: 'PT Blockchain Persada',
    fromWallet: 'BBP-WAL-2026-001246',
    toCompany: 'PT Indonesia Maju',
    toWallet: 'BBP-WAL-2026-008210',
    date: '01 Mar 2022',
    amount: '122 PGT',
  },
  {
    id: 4,
    no: '4',
    transactionHash: 'CMP-BBP-2026-000424',
    fromCompany: 'PT MY Blockchain Corp',
    fromWallet: 'BBP-WAL-2026-234354',
    toCompany: 'PT Indonesia Blockchain Persada',
    toWallet: 'BBP-WAL-2026-001245',
    date: '01 Mar 2022',
    amount: '3 PGT',
  },
  {
    id: 5,
    no: '5',
    transactionHash: 'CMP-BBP-2026-000425',
    fromCompany: 'PT Pegadaian Digital Aset',
    fromWallet: 'BBP-WAL-2026-002819',
    toCompany: 'PT Nusantara Token Emas',
    toWallet: 'BBP-WAL-2026-009127',
    date: '02 Mar 2022',
    amount: '24 PGT',
  },
  {
    id: 6,
    no: '6',
    transactionHash: 'CMP-BBP-2026-000426',
    fromCompany: 'PT Sentra Bullion Indonesia',
    fromWallet: 'BBP-WAL-2026-110043',
    toCompany: 'PT Indonesia Maju',
    toWallet: 'BBP-WAL-2026-008210',
    date: '03 Mar 2022',
    amount: '8 PGT',
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

const editTransaction = (row: TransactionHistoryRow) => {
  showAlert({
    label: `Transaksi ${row.transactionHash} dipilih.`,
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
      <table class="history-table">
        <thead>
          <tr>
            <th class="col-no">No</th>
            <th class="col-hash">Transaction Hash</th>
            <th class="col-party">From</th>
            <th class="col-party">To</th>
            <th class="col-date">Date</th>
            <th class="col-amount">Amount</th>
            <th class="col-action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td class="col-no">{{ row.no }}</td>
            <td class="col-hash">{{ row.transactionHash }}</td>
            <td class="party-cell">
              <div class="party-cell-content">
                <strong>{{ row.fromCompany }}</strong>
                <span>{{ row.fromWallet }}</span>
              </div>
            </td>
            <td class="party-cell">
              <div class="party-cell-content">
                <strong>{{ row.toCompany }}</strong>
                <span>{{ row.toWallet }}</span>
              </div>
            </td>
            <td class="col-date">{{ row.date }}</td>
            <td class="col-amount">{{ row.amount }}</td>
            <td class="col-action">
              <button class="edit-button" type="button" @click="editTransaction(row)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
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

.history-table {
  width: 1457px;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 6px;
  border-spacing: 0;
  border-collapse: separate;
  table-layout: fixed;
}

.history-table th {
  height: 56px;
  padding: 18px 16px;
  border: 0;
  border-right: 1px solid var(--g-kit-black-20);
  background: var(--g-kit-lime-50);
  color: var(--g-kit-white);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-extrabold, 800);
  line-height: var(--g-kit-line-height-omicron);
  text-align: left;
  white-space: nowrap;
}

.history-table th:first-child {
  border-top-left-radius: 6px;
}

.history-table th:last-child {
  border-top-right-radius: 6px;
}

.history-table td {
  padding: 16px;
  border-top: 1px solid transparent;
  border-right: 1px solid var(--g-kit-black-20);
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-semibold, 600);
  line-height: var(--g-kit-line-height-omicron);
  vertical-align: top;
  word-break: break-word;
}

.history-table th:last-child,
.history-table td:last-child {
  border-right: 0;
}

.history-table tbody tr {
  background: var(--g-kit-white);
}

.history-table tbody tr:nth-child(even) {
  background: var(--g-kit-black-10);
}

.history-table tbody tr + tr td {
  border-top-color: var(--g-kit-black-20);
}

.col-no {
  width: 67px;
  text-align: center;
}

.col-hash {
  width: 220px;
}

.col-party {
  width: 280px;
}

.col-date {
  width: 160px;
}

.col-amount,
.col-action {
  width: 150px;
}

.col-amount {
  font-weight: var(--g-kit-font-weight-extrabold, 800);
  white-space: nowrap;
}

.party-cell-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.party-cell-content strong,
.party-cell-content span {
  min-width: 0;
  color: var(--g-kit-black-60);
}

.party-cell-content strong {
  overflow: hidden;
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-extrabold, 800);
  line-height: var(--g-kit-line-height-kappa);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.party-cell-content span {
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-semibold, 600);
  line-height: var(--g-kit-line-height-omicron);
}

.edit-button {
  width: 100%;
  min-height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  border: 1px solid var(--g-kit-lime-50);
  border-radius: 4px;
  background: var(--g-kit-white);
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-extrabold, 800);
  line-height: var(--g-kit-line-height-sigma);
  cursor: pointer;
}

.edit-button:hover,
.edit-button:focus-visible {
  background: var(--g-kit-lime-10);
  outline: 0;
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

  .history-table {
    width: 1220px;
  }
}
</style>
