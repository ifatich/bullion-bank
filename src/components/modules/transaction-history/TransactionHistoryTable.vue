<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { GTablePagination } from '@/components'
import { useAppAlert } from '@/hooks/useAppAlert'

const rowLimit = ref('5')
const currentPage = ref(1)
const searchQuery = ref('')
const lastUpdated = ref('08/07/2024, 09.00 AM')
const selectedTransaction = ref<TransactionHistoryRow | null>(null)
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
    amount: '12 KG',
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
    amount: '1 KG',
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
    amount: '122 KG',
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
    amount: '3 KG',
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
    amount: '24 KG',
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
    amount: '8 KG',
  },
  {
    id: 7,
    no: '7',
    transactionHash: 'CMP-BBP-2026-000427',
    fromCompany: 'PT Nusantara Token Emas',
    fromWallet: 'BBP-WAL-2026-009127',
    toCompany: 'PT Pegadaian Digital Aset',
    toWallet: 'BBP-WAL-2026-002819',
    date: '03 Mar 2022',
    amount: '15 KG',
  },
  {
    id: 8,
    no: '8',
    transactionHash: 'CMP-BBP-2026-000428',
    fromCompany: 'PT Indonesia Blockchain Persada',
    fromWallet: 'BBP-WAL-2026-001245',
    toCompany: 'PT Sentra Bullion Indonesia',
    toWallet: 'BBP-WAL-2026-110043',
    date: '04 Mar 2022',
    amount: '9 KG',
  },
  {
    id: 9,
    no: '9',
    transactionHash: 'CMP-BBP-2026-000429',
    fromCompany: 'PT MY Blockchain Corp',
    fromWallet: 'BBP-WAL-2026-234354',
    toCompany: 'PT Blockchain Persada',
    toWallet: 'BBP-WAL-2026-001246',
    date: '05 Mar 2022',
    amount: '32 KG',
  },
  {
    id: 10,
    no: '10',
    transactionHash: 'CMP-BBP-2026-000430',
    fromCompany: 'PT Indonesia Maju',
    fromWallet: 'BBP-WAL-2026-008210',
    toCompany: 'PT Nusantara Token Emas',
    toWallet: 'BBP-WAL-2026-009127',
    date: '05 Mar 2022',
    amount: '5 KG',
  },
  {
    id: 11,
    no: '11',
    transactionHash: 'CMP-BBP-2026-000431',
    fromCompany: 'PT Pegadaian Digital Aset',
    fromWallet: 'BBP-WAL-2026-002819',
    toCompany: 'PT Indonesia Blockchain Persada',
    toWallet: 'BBP-WAL-2026-001245',
    date: '06 Mar 2022',
    amount: '18 KG',
  },
  {
    id: 12,
    no: '12',
    transactionHash: 'CMP-BBP-2026-000432',
    fromCompany: 'PT Sentra Bullion Indonesia',
    fromWallet: 'BBP-WAL-2026-110043',
    toCompany: 'PT MY Blockchain Corp',
    toWallet: 'BBP-WAL-2026-234354',
    date: '07 Mar 2022',
    amount: '41 KG',
  },
  {
    id: 13,
    no: '13',
    transactionHash: 'CMP-BBP-2026-000433',
    fromCompany: 'PT Blockchain Persada',
    fromWallet: 'BBP-WAL-2026-001246',
    toCompany: 'PT Pegadaian Digital Aset',
    toWallet: 'BBP-WAL-2026-002819',
    date: '07 Mar 2022',
    amount: '27 KG',
  },
  {
    id: 14,
    no: '14',
    transactionHash: 'CMP-BBP-2026-000434',
    fromCompany: 'PT Indonesia Blockchain Persada',
    fromWallet: 'BBP-WAL-2026-001245',
    toCompany: 'PT Indonesia Maju',
    toWallet: 'BBP-WAL-2026-008210',
    date: '08 Mar 2022',
    amount: '11 KG',
  },
  {
    id: 15,
    no: '15',
    transactionHash: 'CMP-BBP-2026-000435',
    fromCompany: 'PT Nusantara Token Emas',
    fromWallet: 'BBP-WAL-2026-009127',
    toCompany: 'PT Sentra Bullion Indonesia',
    toWallet: 'BBP-WAL-2026-110043',
    date: '09 Mar 2022',
    amount: '64 KG',
  },
]

const hasTableControls = computed(() => rows.length > 10)
const perPage = computed(() => Number(rowLimit.value))

const filteredRows = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) return rows

  return rows.filter((row) =>
    [
      row.no,
      row.transactionHash,
      row.fromCompany,
      row.fromWallet,
      row.toCompany,
      row.toWallet,
      row.date,
      row.amount,
    ]
      .join(' ')
      .toLowerCase()
      .includes(query),
  )
})

const paginatedRows = computed(() => {
  if (!hasTableControls.value) return filteredRows.value

  const startIndex = (currentPage.value - 1) * perPage.value
  return filteredRows.value.slice(startIndex, startIndex + perPage.value)
})

const paginationSummary = computed(() => {
  if (filteredRows.value.length === 0) {
    return 'Menampilkan 0 sampai 0 dari 0 baris'
  }

  const startRow = hasTableControls.value ? (currentPage.value - 1) * perPage.value + 1 : 1
  const endRow = hasTableControls.value
    ? Math.min(currentPage.value * perPage.value, filteredRows.value.length)
    : filteredRows.value.length

  return `Menampilkan ${startRow} sampai ${endRow} dari ${filteredRows.value.length} baris`
})

watch([rowLimit, searchQuery], () => {
  currentPage.value = 1
})

const csvHeaders = [
  'No',
  'Transaction Hash',
  'From Company',
  'From Wallet',
  'To Company',
  'To Wallet',
  'Date',
  'Amount',
]

const escapeCsvValue = (value: string) => `"${value.replace(/"/g, '""')}"`

const exportTransactions = () => {
  const csvRows = [
    csvHeaders.map(escapeCsvValue).join(','),
    ...rows.map((row) =>
      [
        row.no,
        row.transactionHash,
        row.fromCompany,
        row.fromWallet,
        row.toCompany,
        row.toWallet,
        row.date,
        row.amount,
      ]
        .map(escapeCsvValue)
        .join(','),
    ),
  ]

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'transaction-history.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  showAlert({
    label: 'Detail transaksi berhasil diexport.',
    variant: 'success',
  })
}

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

const previewTransaction = (row: TransactionHistoryRow) => {
  selectedTransaction.value = row
}

const closeTransactionDetail = () => {
  selectedTransaction.value = null
}
</script>

<template>
  <section class="history-card" aria-labelledby="transaction-history-title">
    <header class="history-card-header">
      <div class="history-title-row">
        <h1 id="transaction-history-title">Transaction History</h1>
        <button class="export-button" type="button" @click="exportTransactions">Export</button>
      </div>
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

    <div v-if="hasTableControls" class="history-toolbar">
      <div class="row-control" aria-label="Rows per page">
        <label class="row-limit">
          <select v-model="rowLimit" aria-label="Jumlah baris">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </label>
      </div>

      <label class="history-search">
        <input v-model="searchQuery" type="search" placeholder="Search transaction" />
      </label>
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
          <tr v-for="row in paginatedRows" :key="row.id">
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
              <button class="detail-button" type="button" @click="previewTransaction(row)">
                Preview Detail
              </button>
            </td>
          </tr>
          <tr v-if="paginatedRows.length === 0">
            <td class="empty-cell" colspan="7">Tidak ada data yang ditampilkan</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="history-mobile-list" aria-label="Transaction history cards">
      <article v-for="row in paginatedRows" :key="row.id" class="history-mobile-card">
        <header class="mobile-card-header">
          <div>
            <span>Transaction Hash</span>
            <strong>{{ row.transactionHash }}</strong>
          </div>
          <p>{{ row.amount }}</p>
        </header>

        <div class="mobile-card-divider" aria-hidden="true" />

        <dl class="mobile-card-details">
          <div>
            <dt>Date</dt>
            <dd>{{ row.date }}</dd>
          </div>
          <div>
            <dt>From</dt>
            <dd>
              <strong>{{ row.fromCompany }}</strong>
              <span>{{ row.fromWallet }}</span>
            </dd>
          </div>
          <div>
            <dt>To</dt>
            <dd>
              <strong>{{ row.toCompany }}</strong>
              <span>{{ row.toWallet }}</span>
            </dd>
          </div>
        </dl>

        <button
          class="detail-button mobile-detail-button"
          type="button"
          @click="previewTransaction(row)"
        >
          Preview Detail
        </button>
      </article>

      <div v-if="paginatedRows.length === 0" class="history-mobile-empty">
        Tidak ada data yang ditampilkan
      </div>
    </div>

    <footer class="history-table-footer">
      <span>{{ paginationSummary }}</span>
      <GTablePagination
        v-if="hasTableControls && filteredRows.length > perPage"
        v-model="currentPage"
        :total-rows="filteredRows.length"
        :per-page="perPage"
      />
    </footer>
  </section>

  <Teleport to="body">
    <Transition name="detail-modal-fade">
      <div
        v-if="selectedTransaction"
        class="detail-modal-backdrop"
        role="presentation"
        @click.self="closeTransactionDetail"
      >
        <section
          class="detail-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="transaction-detail-title"
        >
          <header class="detail-modal-header">
            <div>
              <h2 id="transaction-detail-title">Transaction Detail</h2>
              <p>{{ selectedTransaction.transactionHash }}</p>
            </div>
            <button
              class="detail-close-button"
              type="button"
              aria-label="Close transaction detail"
              @click="closeTransactionDetail"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </header>

          <div class="detail-divider" aria-hidden="true" />

          <dl class="detail-list">
            <div class="detail-item">
              <dt>No</dt>
              <dd>{{ selectedTransaction.no }}</dd>
            </div>
            <div class="detail-item">
              <dt>Transaction Hash</dt>
              <dd>{{ selectedTransaction.transactionHash }}</dd>
            </div>
            <div class="detail-item">
              <dt>Date</dt>
              <dd>{{ selectedTransaction.date }}</dd>
            </div>
            <div class="detail-item">
              <dt>Amount</dt>
              <dd>{{ selectedTransaction.amount }}</dd>
            </div>
          </dl>

          <div class="detail-party-grid">
            <article class="detail-party-card">
              <span>From</span>
              <strong>{{ selectedTransaction.fromCompany }}</strong>
              <p>{{ selectedTransaction.fromWallet }}</p>
            </article>
            <article class="detail-party-card">
              <span>To</span>
              <strong>{{ selectedTransaction.toCompany }}</strong>
              <p>{{ selectedTransaction.toWallet }}</p>
            </article>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
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

.history-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
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

.export-button {
  min-width: 104px;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid var(--g-kit-lime-50);
  border-radius: 4px;
  background: var(--g-kit-white);
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  cursor: pointer;
  white-space: nowrap;
}

.export-button:hover,
.export-button:focus-visible {
  background: var(--g-kit-lime-10);
  outline: 0;
}

.history-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.row-control {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
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

.history-search {
  width: min(320px, 100%);
  flex: 1 1 320px;
  display: flex;
  align-items: center;
}

.history-search input {
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 6px;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.history-search input::placeholder {
  color: var(--g-kit-black-50);
}

.history-search input:focus {
  border-color: var(--g-kit-lime-50);
  outline: 0;
}

.history-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.history-mobile-list {
  display: none;
}

.history-table {
  width: 1457px;
  margin: 0;
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
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
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
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  vertical-align: top;
  word-break: break-word;
}

.history-table th:last-child,
.history-table td:last-child {
  border-right: 0;
}

.history-table th.col-action,
.history-table td.col-action {
  position: sticky;
  right: 0;
  z-index: 1;
  border-left: 1px solid var(--g-kit-black-20);
}

.history-table th.col-action {
  z-index: 2;
  background: var(--g-kit-lime-50);
}

.history-table td.col-action {
  background: var(--g-kit-white);
}

.history-table tbody tr:nth-child(even) td.col-action {
  background: var(--g-kit-black-10);
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

.empty-cell {
  height: 96px;
  text-align: center;
  vertical-align: middle;
}

.col-no {
  width: 67px;
}

.col-hash {
  width: 220px;
}

.history-table th.col-no,
.history-table th.col-hash {
  padding-inline: 24px;
}

.history-table td.col-no {
  text-align: center;
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
  font-weight: var(--g-kit-font-weight-bold);
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
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.party-cell-content span {
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.detail-button {
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
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omega);
  cursor: pointer;
  white-space: nowrap;
}

.detail-button:hover,
.detail-button:focus-visible {
  background: var(--g-kit-lime-10);
  outline: 0;
}

.history-table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.history-mobile-card,
.history-mobile-empty {
  border: 1px solid var(--g-kit-black-20);
  border-radius: 8px;
  background: var(--g-kit-white);
}

.history-mobile-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.mobile-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.mobile-card-header div {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-card-header span,
.mobile-card-details dt {
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.mobile-card-header strong {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  word-break: break-word;
}

.mobile-card-header p {
  flex: 0 0 auto;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  white-space: nowrap;
}

.mobile-card-divider {
  height: 1px;
  background: var(--g-kit-black-20);
}

.mobile-card-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
}

.mobile-card-details div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.mobile-card-details dd {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  color: var(--g-kit-black-60);
}

.mobile-card-details dd > strong {
  overflow: hidden;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-card-details dd > span,
.mobile-card-details dd {
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.mobile-detail-button {
  width: 100%;
  min-height: 36px;
}

.history-mobile-empty {
  padding: 24px 16px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  text-align: center;
}

.detail-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgb(0 0 0 / 40%);
}

.detail-modal {
  width: min(640px, calc(100vw - 32px));
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  padding: 24px;
  border-radius: 12px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.detail-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.detail-modal-header h2 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-lambda, 18px);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-lambda, 26px);
}

.detail-modal-header p {
  margin-top: 4px;
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  word-break: break-word;
}

.detail-close-button {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--g-kit-black-80);
  cursor: pointer;
}

.detail-close-button svg {
  width: 24px;
  height: 24px;
}

.detail-divider {
  width: 100%;
  height: 1px;
  background: var(--g-kit-black-20);
}

.detail-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.detail-item dt,
.detail-party-card span {
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.detail-item dd {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  word-break: break-word;
}

.detail-party-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-party-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 6px;
  background: var(--g-kit-black-10);
}

.detail-party-card strong {
  overflow: hidden;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-party-card p {
  margin: 0;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  word-break: break-word;
}

.detail-modal-fade-enter-active,
.detail-modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.detail-modal-fade-enter-from,
.detail-modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 760px) {
  .history-card {
    padding: 20px 16px;
  }

  .history-card-header p {
    align-items: flex-start;
  }

  .history-toolbar,
  .history-table-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .history-toolbar {
    align-items: center;
    flex-direction: row;
  }

  .history-search {
    width: auto;
    flex: 1 1 auto;
    min-width: 0;
  }

  .history-table-wrap {
    display: none;
  }

  .history-mobile-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .detail-modal-backdrop {
    align-items: flex-end;
    padding: 0;
  }

  .detail-modal {
    width: 100%;
    max-height: calc(100vh - 48px);
    overflow-y: auto;
    border-radius: 16px 16px 0 0;
  }

  .detail-modal::before {
    content: '';
    width: 48px;
    height: 4px;
    align-self: center;
    margin-bottom: 4px;
    border-radius: 999px;
    background: var(--g-kit-black-20);
  }

  .detail-list,
  .detail-party-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .history-title-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .export-button {
    width: 100%;
  }
}
</style>
