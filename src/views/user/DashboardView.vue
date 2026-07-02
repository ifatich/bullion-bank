<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import DashboardSummary from '@/components/modules/user/dashboard/DashboardSummary.vue'
import MenuSection from '@/components/modules/user/dashboard/MenuSection.vue'
import QRGenerateModal from '@/components/modules/user/dashboard/QRGenerateModal.vue'
import TaskCard from '@/components/modules/user/dashboard/TaskCard.vue'
import UserPageLayout from '@/components/shared/layouts/UserPageLayout.vue'
import ExportDateRangeModal from '@/components/modules/user/transaction-history/ExportDateRangeModal.vue'
import { useAppAlert } from '@/hooks/useAppAlert'
import { generatePdfEStatement } from '@/utils/generate-pdf-statement.util'
import { useTransactions } from '@/hooks/useTransactions'
import { useAuthStore } from '@/stores/auth'

const {
  rows: transactions,
  reportMetadata,
  fetchTransactions,
  fetchReportMetadata
} = useTransactions()

const authStore = useAuthStore()

const tokenMenus = [
  { label: 'Swap', to: '/token/swap', icon: 'swap' },
  { label: 'Redemption', to: '/token/redemption', icon: 'redemption' },
  { label: 'Transfer', to: '/token/transfer', icon: 'transfer' },
]
const qrMenus = [
  { label: 'Show QR', icon: 'add-qr' },
  { label: 'Custody Report', icon: 'custody' },
]
const isQRModalOpen = ref(false)
const isExportModalOpen = ref(false)
const exportError = ref('')
const { showAlert } = useAppAlert()

const handleTokenMenuSelect = () => {
  showAlert({
    label: 'Fitur token transfer belum tersedia.',
    variant: 'warning',
  })
}

const handleQRMenuSelect = (item: { label: string }) => {
  if (item.label === 'Show QR') {
    isQRModalOpen.value = true
  } else if (item.label === 'Custody Report') {
    exportError.value = ''
    isExportModalOpen.value = true
  }
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

const handleExportConfirm = async (dateRange: { fromDate: string; toDate: string }) => {
  try {
    const start = new Date(dateRange.fromDate + 'T00:00:00')
    const end = new Date(dateRange.toDate + 'T23:59:59')

    if (transactions.value.length === 0) {
      await fetchTransactions({ fromDate: dateRange.fromDate, toDate: dateRange.toDate })
    }

    const filteredTransactions = transactions.value
      .filter((tx) => {
        const txDate = new Date(tx.date)
        return !isNaN(txDate.getTime()) && txDate >= start && txDate <= end
      })
      .map((row) => ({
        ...row,
        status: row.status as 'Success' | 'Pending' | 'Failed',
      }))

    if (filteredTransactions.length === 0) {
      exportError.value = 'Tidak ada transaksi dalam rentang tanggal yang dipilih.'
      return
    }

    exportError.value = ''

    await fetchReportMetadata({ fromDate: dateRange.fromDate, toDate: dateRange.toDate })

    const fromFormatted = formatToDDMMYYYYSpaced(dateRange.fromDate)
    const toFormatted = formatToDDMMYYYYSpaced(dateRange.toDate)
    const company = reportMetadata.value?.companyName || authStore.companyName
    const filename = `Custody Report - ${company} - ${fromFormatted} - ${toFormatted}.pdf`

    await generatePdfEStatement({
      title: reportMetadata.value?.title || 'Custody Transaction Report',
      companyName: reportMetadata.value?.companyName || authStore.companyName,
      companyId: reportMetadata.value?.companyId || authStore.companyId,
      custodyAccountId: reportMetadata.value?.custodyAccountId || 'CUST-BBP-2026-001',
      walletId: reportMetadata.value?.walletId || authStore.walletAddress,
      reportPeriod: `${dateRange.fromDate} - ${dateRange.toDate}`,
      openingBalance: reportMetadata.value?.openingBalance || '0 KG',
      totalDebit: reportMetadata.value?.totalDebit || '0 KG',
      totalCredit: reportMetadata.value?.totalCredit || '0 KG',
      closingBalance: reportMetadata.value?.closingBalance || '0 KG',
      lastUpdated: reportMetadata.value?.lastUpdated || new Date().toLocaleString(),
      filename,
      transactions: filteredTransactions,
    })

    showAlert({
      label: 'Detail transaksi berhasil diexport sebagai PDF.',
      variant: 'success',
    })
    isExportModalOpen.value = false
  } catch (err) {
    exportError.value = 'Gagal mengeksport laporan.'
  }
}

const tvWidgetRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!tvWidgetRef.value) return

  const container = tvWidgetRef.value
  container.innerHTML = ''

  // Widget inner container
  const widgetDiv = document.createElement('div')
  widgetDiv.className = 'tradingview-widget-container__widget'
  container.appendChild(widgetDiv)

  // External embed script — advanced chart widget
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.textContent = JSON.stringify({
    allow_symbol_change: false,
    calendar: false,
    details: false,
    hide_side_toolbar: true,
    hide_top_toolbar: true,
    hide_legend: false,
    hide_volume: true,
    hotlist: false,
    interval: "1",
    locale: "id",
    save_image: false,
    style: "1",
    symbol: "OANDA:XAUUSD",
    theme: "light",
    timezone: "Asia/Jakarta",
    isTransparent: true,
    gridColor: "#2e2e2e0f",
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    autosize: false,
    width: "100%",
    height: "360"
  })
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
  container.appendChild(script)
})

onUnmounted(() => {
  if (tvWidgetRef.value) {
    tvWidgetRef.value.innerHTML = ''
  }
})
</script>

<template>
  <UserPageLayout background="var(--g-kit-black-10)">
    <div class="dashboard-content">
      <div class="top-grid">
        <DashboardSummary />
        <TaskCard />
      </div>

      <div class="menu-rows">
        <div class="chart-card">
          <div
            ref="tvWidgetRef"
            class="tradingview-widget-container"
          />
        </div>
      </div>

      <div class="menu-row">
        <MenuSection title="Token Use Case" :items="tokenMenus" @select="handleTokenMenuSelect" />
        <MenuSection title="Connection" :items="qrMenus" @select="handleQRMenuSelect" />
      </div>
    </div>

    <QRGenerateModal v-model="isQRModalOpen" />
    <ExportDateRangeModal
      :is-visible="isExportModalOpen"
      :error-text="exportError"
      @close="isExportModalOpen = false"
      @confirm="handleExportConfirm"
    />
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

.menu-rows {
  margin-top: 28px;
}

.chart-card {
  background: var(--g-kit-white);
  border-radius: 12px;
  box-shadow: var(--bb-elevation-1);
  overflow: hidden;
  padding: 12px 16px 24px;
  min-height: 380px;
  display: flex;
  flex-direction: column;
}

/* Hide TradingView floating navigation zoom/reset controls */
.chart-card :deep(iframe) {
  pointer-events: auto;
  border: none !important;
}
.chart-card :deep(.tradingview-widget-container) {
  position: relative;
}
:deep([class*="toolbox"]) {
  display: none !important;
}

.tradingview-widget-container {
  width: 100%;
  height: 360px;
  overflow: hidden;
  border: none !important;
}

.tradingview-widget-container :deep(div) {
  border: none !important;
}

.tradingview-widget-container :deep(iframe) {
  width: calc(100% + 4px) !important;
  height: calc(360px + 4px) !important;
  margin: -2px !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

@media (max-width: 1180px) {
  .top-grid,
  .menu-rows {
    grid-template-columns: 1fr;
  }
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

  .chart-card {
    padding: 16px;
    min-height: 240px;
  }
}
</style>
