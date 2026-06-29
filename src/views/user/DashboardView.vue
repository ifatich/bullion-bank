<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

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
const qrMenus = [
  { label: 'Add QR' },
  { label: 'Custody Report' },
]
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

const tvWidgetRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!tvWidgetRef.value) return

  const container = tvWidgetRef.value
  container.innerHTML = ''

  // Widget inner container
  const widgetDiv = document.createElement('div')
  widgetDiv.className = 'tradingview-widget-container__widget'
  container.appendChild(widgetDiv)

  // Copyright
  const copyright = document.createElement('div')
  copyright.className = 'tradingview-widget-copyright'
  copyright.innerHTML =
    '<a href="https://www.tradingview.com/symbols/XAUTUSDT/?exchange=BYBIT" rel="noopener nofollow" target="_blank"><span class="blue-text">XAUUSD quote</span></a><span class="trademark">&nbsp;by TradingView</span>'
  container.appendChild(copyright)

  // External embed script — config goes in textContent so the script reads it via
  // document.currentScript. The browser fetches from src but preserves textContent.
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.textContent = JSON.stringify({
    lineWidth: 1,
    lineType: 0,
    chartType: 'area',
    fontColor: 'rgb(106, 109, 120)',
    gridLineColor: 'rgba(46, 46, 46, 0.06)',
    volumeUpColor: 'rgba(34, 171, 148, 0.5)',
    volumeDownColor: 'rgba(247, 82, 95, 0.5)',
    backgroundColor: '#ffffff',
    widgetFontColor: '#0F0F0F',
    upColor: '#22ab94',
    downColor: '#f7525f',
    borderUpColor: '#22ab94',
    borderDownColor: '#f7525f',
    wickUpColor: '#22ab94',
    wickDownColor: '#f7525f',
    colorTheme: 'light',
    isTransparent: true,
    locale: 'id',
    chartOnly: true,
    scalePosition: 'left',
    scaleMode: 'Normal',
    fontFamily: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
    valuesTracking: '1',
    changeMode: 'price-and-percent',
    symbols: [['BYBIT:XAUTUSDT|1D']],
    dateRanges: ['1d|1', '1m|30', '3m|60'],
    fontSize: '10',
    headerFontSize: 'medium',
    autosize: false,
    width: '100%',
    height: 360,
    noTimeScale: false,
    hideDateRanges: false,
  })
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
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
        <MenuSection title="Token" :items="tokenMenus" @select="handleTokenMenuSelect" />
        <MenuSection title="Connection" :items="qrMenus" @select="openQRModal" />
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

.menu-rows {
  margin-top: 28px;
}

.chart-card {
  background: var(--g-kit-white);
  border-radius: 12px;
  box-shadow: var(--bb-elevation-1);
  padding: 12px 16px 24px;
  min-height: 380px;
  display: flex;
  flex-direction: column;
}

.tradingview-widget-container {
  width: 100%;
  height: 360px;
  overflow: hidden;
}

.tradingview-widget-container :deep(iframe) {
  width: 100% !important;
  height: 360px !important;
  border: 0 !important;
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
