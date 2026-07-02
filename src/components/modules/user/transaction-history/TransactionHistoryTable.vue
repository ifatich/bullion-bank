<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { GTablePagination, GButton } from '@/components'
import StatusBadge from '@/components/shared/status-badge/StatusBadge.vue'
import TableRowControl from '@/components/shared/table/TableRowControl.vue'
import TableHeader from '@/components/shared/table/TableHeader.vue'
import TableFooter from '@/components/shared/table/TableFooter.vue'
import TransactionDetailModal from '@/components/modules/user/transaction-history/TransactionDetailModal.vue'
import ExportDateRangeModal from '@/components/modules/user/transaction-history/ExportDateRangeModal.vue'
import { useTransactions } from '@/hooks/useTransactions'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { useAppAlert } from '@/hooks/useAppAlert'
import { generatePdfEStatement } from '@/utils/generate-pdf-statement.util'

const {
  rows,
  reportMetadata,
  fetchTransactions,
  fetchReportMetadata
} = useTransactions()

const authStore = useAuthStore()

const rowLimit = ref(5)
const currentPage = ref(1)
const searchQuery = ref('')
const lastUpdated = ref('08/07/2024, 09.00 AM')
const selectedTransaction = ref<TransactionHistoryRow | null>(null)
const isTransactionDetailVisible = ref(false)
const isExportModalVisible = ref(false)
const exportError = ref('')
const { showAlert } = useAppAlert()

type TransactionHistoryRow = {
  id: number
  no: string
  transactionHash: string
  transactionType: string
  status: 'Success' | 'Pending' | 'Failed'
  fromCompany: string
  fromWallet: string
  fromAddress: string
  toCompany: string
  toWallet: string
  toAddress: string
  date: string
  confirmedAt: string
  asset: string
  network: string
  amount: string
  fee: string
  netAmount: string
  fiatValue: string
  blockNumber: string
  confirmations: string
  referenceNumber: string
}

// API types are derived dynamically from @/types/transaction.ts

// Mock data removed. Data fetched dynamically from APIs via onMounted.

onMounted(async () => {
  await fetchTransactions()
  await fetchReportMetadata()
  if (reportMetadata.value) {
    lastUpdated.value = reportMetadata.value.lastUpdated
  }
})

const perPage = computed(() => rowLimit.value)
const hasTableControls = computed(() => rows.value.length > 10)

const filteredRows = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) return rows.value

  return rows.value.filter((row: TransactionHistoryRow) =>
    [
      row.no,
      row.transactionHash,
      row.transactionType,
      row.status,
      row.fromCompany,
      row.fromWallet,
      row.fromAddress,
      row.toCompany,
      row.toWallet,
      row.toAddress,
      row.date,
      row.confirmedAt,
      row.asset,
      row.network,
      row.amount,
      row.fee,
      row.netAmount,
      row.fiatValue,
      row.blockNumber,
      row.confirmations,
      row.referenceNumber,
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

const displayStart = computed(() => {
  if (filteredRows.value.length === 0) return 0
  return hasTableControls.value ? (currentPage.value - 1) * perPage.value + 1 : 1
})

const displayEnd = computed(() => {
  if (filteredRows.value.length === 0) return 0
  return hasTableControls.value
    ? Math.min(currentPage.value * perPage.value, filteredRows.value.length)
    : filteredRows.value.length
})

watch([rowLimit, searchQuery], () => {
  currentPage.value = 1
})

function onRowLimitChange(val: number) {
  rowLimit.value = val
}

function onSearchChange(val: string) {
  searchQuery.value = val
}

const formatToDDMMYYYYSpaced = (dateStr: string): string => {
  const parts = dateStr.split('-')
  if (parts.length === 3) {
    const dd = parts[2]
    const mm = parts[1]
    const yyyy = parts[0]
    return `${dd} ${mm} ${yyyy}`
  }
  return dateStr
}

const exportTransactions = async (fromDate: string, toDate: string) => {
  try {
    // Parse selected date range
    const start = new Date(fromDate + 'T00:00:00')
    const end = new Date(toDate + 'T23:59:59')

    // Filter rows by date range
    const filteredTransactions = rows.value.filter((row: TransactionHistoryRow) => {
      const rowDate = new Date(row.date)
      return !isNaN(rowDate.getTime()) && rowDate >= start && rowDate <= end
    })

    if (filteredTransactions.length === 0) {
      exportError.value = 'Tidak ada transaksi dalam rentang tanggal yang dipilih.'
      return
    }

    exportError.value = ''

    const fromFormatted = formatToDDMMYYYYSpaced(fromDate)
    const toFormatted = formatToDDMMYYYYSpaced(toDate)
    const company = reportMetadata.value?.companyName || authStore.companyName
    const filename = `Custody Report - ${company} - ${fromFormatted} - ${toFormatted}.pdf`

    await generatePdfEStatement({
      title: reportMetadata.value?.title || 'Custody Transaction Report',
      companyName: reportMetadata.value?.companyName || authStore.companyName,
      companyId: reportMetadata.value?.companyId || authStore.companyId,
      custodyAccountId: reportMetadata.value?.custodyAccountId || 'CUST-BBP-2026-001',
      walletId: reportMetadata.value?.walletId || authStore.walletAddress,
      reportPeriod: `${fromDate} - ${toDate}`,
      openingBalance: reportMetadata.value?.openingBalance || '0 KG',
      totalDebit: reportMetadata.value?.totalDebit || '0 KG',
      totalCredit: reportMetadata.value?.totalCredit || '0 KG',
      closingBalance: reportMetadata.value?.closingBalance || '0 KG',
      lastUpdated: lastUpdated.value,
      filename,
      transactions: filteredTransactions,
    })
    showAlert({
      label: 'Detail transaksi berhasil diexport sebagai PDF.',
      variant: 'success',
    })
    exportError.value = ''
    isExportModalVisible.value = false
  } catch (error) {
    showAlert({
      label: 'Gagal mengexport transaksi. Silakan coba lagi.',
      variant: 'danger',
    })
    console.error('Export error:', error)
  }
}

const handleExportClick = () => {
  exportError.value = ''
  isExportModalVisible.value = true
}

const handleExportModalConfirm = (dateRange: { fromDate: string; toDate: string }) => {
  exportTransactions(dateRange.fromDate, dateRange.toDate)
}

const refreshData = async () => {
  await fetchTransactions()
  await fetchReportMetadata()
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
  isTransactionDetailVisible.value = true
}

const closeTransactionDetail = () => {
  selectedTransaction.value = null
  isTransactionDetailVisible.value = false
}
</script>

<template>
  <section class="history-card" aria-labelledby="transaction-history-title">
    <TableHeader
      title="Transaction History"
      :last-updated="`Last updated on ${lastUpdated}`"
      @refresh="refreshData"
    >
      <template #actions>
        <GButton label="Export" type="neutral" size="md" @click="handleExportClick" />

      </template>
    </TableHeader>

    <TableRowControl
      v-if="hasTableControls"
      :row-limit="rowLimit"
      :search-query="searchQuery"
      search-placeholder="Search transaction"
      @update:row-limit="onRowLimitChange"
      @update:search-query="onSearchChange"
    />

    <div class="history-table-wrap">
      <table class="history-table">
        <thead>
          <tr>
            <th class="col-no">No</th>
            <th class="col-hash">Transaction Hash</th>
            <th class="col-type">Type</th>
            <th class="col-party">From</th>
            <th class="col-party">To</th>
            <th class="col-date">Date</th>
            <th class="col-asset">Asset</th>
            <th class="col-amount">Amount</th>
            <th class="col-action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedRows" :key="row.id">
            <td class="col-no">{{ row.no }}</td>
            <td class="col-hash">{{ row.transactionHash }}</td>
            <td class="type-cell">
              <span>{{ row.transactionType }}</span>
                            <StatusBadge
                :variant="row.status.toLowerCase() as 'success' | 'pending' | 'failed'"
                :label="row.status"
              />
            </td>
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
            <td class="asset-cell">
              <strong>{{ row.asset }}</strong>
              <span>{{ row.network }}</span>
            </td>
            <td class="col-amount">{{ row.amount }}</td>
            <td class="col-action">
              <button class="detail-button" type="button" @click="previewTransaction(row)">
                Preview Detail
              </button>
            </td>
          </tr>
          <tr v-if="paginatedRows.length === 0">
            <td class="empty-cell" colspan="9">Tidak ada data yang ditampilkan</td>
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
          <div class="mobile-card-meta">
                        <StatusBadge
              :variant="row.status.toLowerCase() as 'success' | 'pending' | 'failed'"
              :label="row.status"
            />
            <p>{{ row.amount }}</p>
          </div>
        </header>

        <div class="mobile-card-divider" aria-hidden="true" />

        <dl class="mobile-card-details">
          <div>
            <dt>Type</dt>
            <dd>{{ row.transactionType }}</dd>
          </div>
          <div>
            <dt>Asset</dt>
            <dd>
              <strong>{{ row.asset }}</strong>
              <span>{{ row.network }}</span>
            </dd>
          </div>
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

    <TableFooter
      :display-start="displayStart"
      :display-end="displayEnd"
      :total-rows="filteredRows.length"
    >
      <GTablePagination
        v-if="hasTableControls && filteredRows.length > perPage"
        v-model="currentPage"
        :total-rows="filteredRows.length"
        :per-page="perPage"
      />
    </TableFooter>
  </section>

  <TransactionDetailModal
    :is-visible="isTransactionDetailVisible"
    :transaction="selectedTransaction"
    @close="closeTransactionDetail"
  />

  <ExportDateRangeModal
    :is-visible="isExportModalVisible"
    :error-text="exportError"
    @close="isExportModalVisible = false"
    @confirm="handleExportModalConfirm"
  />
</template>

<style scoped>
.history-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.history-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.history-mobile-list {
  display: none;
}

.history-table {
  width: 1720px;
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

.col-no { width: 67px; }
.col-hash { width: 220px; }
.history-table th.col-no,
.history-table th.col-hash { padding-inline: 24px; }
.history-table td.col-no { text-align: center; }
.col-party { width: 280px; }
.col-type { width: 160px; }
.col-date { width: 160px; }
.col-asset { width: 170px; }
.col-amount,
.col-action { width: 150px; }
.col-amount { font-weight: var(--g-kit-font-weight-bold); white-space: nowrap; }

.party-cell-content { display: flex; flex-direction: column; gap: 4px; }
.type-cell,
.asset-cell { display: flex; flex-direction: column; gap: 6px; }
.type-cell > span,
.asset-cell > span {
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}
.asset-cell > strong {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
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
.mobile-card-meta {
  flex: 0 0 auto;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 6px;
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

@media (max-width: 760px) {
  .history-card {
    padding: 20px 16px;
  }

  .history-table-wrap {
    display: none;
  }

  .history-mobile-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
