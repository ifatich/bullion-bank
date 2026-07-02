<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'


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
    chartType: 'candlestick',
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
    height: 260,
    noTimeScale: false,
    hideDateRanges: true,
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
  <div class="hero">
    <img class="logo" src="@/assets/images/pegadaian-logo.svg" alt="Pegadaian" />

    <div class="content">
      
      <span class="subtitle"> Selamat Datang di </span>
      
      <h1>
        Tokenized Gold
        <br />
        Receipt
      </h1>
      
      <div class="line" />

      <div
        ref="tvWidgetRef"
        class="tradingview-widget-container"
      />

      <!-- <GoldPriceChart compact class="price-chart" /> -->

      <div class="line" />

      <p>Akses aplikasi dengan menggunakan username dan password.</p>
    </div>
  </div>
</template>

<style scoped>
.hero {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--g-kit-white);
}

.logo {
  width: 220px;
  height: auto;
}

.content {
  width: 100%;
  max-width: 540px;
  margin-top: auto;
  margin-bottom: 40px;
}

.subtitle {
  color: var(--g-kit-broccoli-20);
  font-size: var(--g-kit-font-size-delta);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-delta);
}

h1 {
  max-width: 454px;
  margin: 0;
  color: var(--g-kit-white);
  font-size: var(--g-kit-font-size-beta);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: 80px;
  letter-spacing: 0;
}

.price-chart {
  margin-top: 24px;
  margin-bottom: 24px;
}

.line {
  width: 50px;
  height: 2px;
  background: var(--g-kit-white);
  margin: 30px 0 28px;
}

p {
  max-width: 440px;
  margin: 0;
  color: var(--g-kit-white);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.tradingview-widget-container {
  width: 100%;
  height: 260px;
  overflow: hidden;
}

.tradingview-widget-container :deep(iframe) {
  width: 100% !important;
  height: 260px !important;
  border: 0 !important;
}

</style>
