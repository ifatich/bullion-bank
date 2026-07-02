<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch, nextTick } from 'vue'

import { GLineChart } from '@/components'
import { goldPriceChartMock } from '@/utils/data/gold-price-chart.mock'
// @ts-ignore - chart.js is a transitive dependency via kitvue-public
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js'

withDefaults(defineProps<{
  compact?: boolean
}>(), {
  compact: false,
})

type Interval = '1M' | '1W' | 'ALL'
type ChartType = 'line' | 'candle'
const selectedInterval = ref<Interval>('ALL')
const selectedChartType = ref<ChartType>('line')
const intervals: Interval[] = ['1M', '1W', 'ALL']

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: goldPriceChartMock.currency,
  maximumFractionDigits: 0,
})

const compactFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: goldPriceChartMock.currency,
  maximumFractionDigits: 0,
  notation: 'compact',
  compactDisplay: 'short',
})

const formatMillionTick = (value: string | number) =>
  `${(Number(value) / 1_000_000).toLocaleString('id-ID', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} jt`

const palette = reactive({
  line: '#089981',
  grid: '#d1d4dc',
  tick: '#787b86',
  white: '#ffffff',
  lineFill: 'rgba(8, 153, 129, 0.08)',
  crosshair: 'rgba(19, 23, 34, 0.15)',
})

const readToken = (name: string, fallback: string) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

onMounted(() => {
  palette.line = readToken('--g-kit-lime-50', palette.line)
  palette.grid = readToken('--g-kit-black-20', palette.grid)
  palette.tick = readToken('--g-kit-black-60', palette.tick)
  palette.white = readToken('--g-kit-white', palette.white)
})

// Filter points by selected interval
const filteredPoints = computed(() => {
  const all = goldPriceChartMock.points
  if (selectedInterval.value === '1M') return all.slice(-30)
  if (selectedInterval.value === '1W') return all.slice(-7)
  return all
})

const labels = computed(() => filteredPoints.value.map(p => p.label))
const values = computed(() => filteredPoints.value.map(p => p.value))
const volumes = computed(() => filteredPoints.value.map(p => p.volume ?? 0))
const highs = computed(() => filteredPoints.value.map(p => p.high ?? p.value))
const lows = computed(() => filteredPoints.value.map(p => p.low ?? p.value))

const latestPrice = computed(() => values.value[values.value.length - 1] ?? 0)
const previousPrice = computed(() => values.value[values.value.length - 2] ?? latestPrice.value)
const priceChange = computed(() => latestPrice.value - previousPrice.value)
const priceChangePercent = computed(() =>
  previousPrice.value ? ((priceChange.value / previousPrice.value) * 100) : 0
)
const isPositive = computed(() => priceChange.value >= 0)

const rangeHigh = computed(() => (highs.value.length ? Math.max(...highs.value) : 0))
const rangeLow = computed(() => (lows.value.length ? Math.min(...lows.value) : 0))
const rangeOpen = computed(() => values.value[0] ?? 0)
const totalVolume = computed(() => volumes.value.reduce((a, b) => a + b, 0))

const firstLabel = computed(() => labels.value[0] ?? '')
const lastLabel = computed(() => labels.value[labels.value.length - 1] ?? '')
const yAxisStep = 500_000
const yAxisMin = computed(() => {
  const m = lows.value.length ? Math.min(...lows.value) : 0
  return Math.floor(m / yAxisStep) * yAxisStep
})
const yAxisMax = computed(() => {
  const m = highs.value.length ? Math.max(...highs.value) : yAxisStep
  return Math.ceil(m / yAxisStep) * yAxisStep
})

const chartDatasets = computed(() => {
  if (selectedChartType.value === 'candle') {
    const points = filteredPoints.value
    return [
      // Wick (high-low)
      {
        label: 'Wick',
        data: points.map(p => [p.low ?? p.value, p.high ?? p.value]),
        backgroundColor: points.map(p =>
          (p.value >= (p.high ?? p.value) + (p.low ?? p.value) / 2 ? 1 : -1) > 0
            ? 'rgba(0, 171, 78, 0.4)'
            : 'rgba(220, 53, 69, 0.4)'
        ),
        borderColor: points.map(p =>
          (p.value ?? 0) >= (points[points.indexOf(p) - 1]?.value ?? p.value)
            ? '#089981'
            : '#f23645'
        ),
        borderWidth: 1,
        borderSkipped: false,
        barPercentage: 0.3,
        categoryPercentage: 0.8,
      },
      // Body (open-close)
      {
        label: 'Body',
        data: points.map(p => {
          const open = points[points.indexOf(p) - 1]?.value ?? p.value
          const close = p.value
          return [Math.min(open, close), Math.max(open, close)]
        }),
        backgroundColor: points.map((p, i) => {
          const open = i > 0 ? points[i - 1].value : p.value
          return p.value >= open ? '#089981' : '#f23645'
        }),
        borderColor: points.map((p, i) => {
          const open = i > 0 ? points[i - 1].value : p.value
          return p.value >= open ? '#089981' : '#f23645'
        }),
        borderWidth: 1,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ]
  }

  // Line chart
  return [
    {
      label: `Harga ${goldPriceChartMock.asset}/${goldPriceChartMock.unit}`,
      data: values.value,
      backgroundColor: palette.lineFill,
      borderColor: palette.line,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBorderWidth: 3,
      pointHoverBackgroundColor: palette.line,
      pointHoverBorderColor: palette.white,
    },
  ]
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 400, easing: 'easeOutQuart' },
  interaction: { mode: 'index', intersect: false },
  layout: { padding: { top: 4, right: 4, bottom: 0, left: 4 } },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      backgroundColor: palette.white,
      titleColor: palette.tick,
      bodyColor: palette.line,
      borderColor: palette.grid,
      borderWidth: 1,
      titleFont: { family: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, sans-serif', size: 12, weight: 600 },
      bodyFont: { family: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, sans-serif', size: 13, weight: 600 },
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        title: (items: Array<{ dataIndex?: number; label?: string; datasetIndex?: number }>) => {
          const item = items.find(i => i.datasetIndex === (chartDatasets.value.length - 1))
          if (!item) return ''
          const idx = item.dataIndex
          if (idx == null) return item.label ?? ''
          const p = filteredPoints.value[idx]
          if (!p) return item.label ?? ''
          const vol = p.volume ?? 0
          return `${p.label}\nVol: ${vol.toLocaleString('id-ID')} XAUT`
        },
        label: (context: { raw: number; dataIndex: number; datasetIndex: number }) => {
          if (context.datasetIndex !== chartDatasets.value.length - 1) return ''
          const p = filteredPoints.value[context.dataIndex]
          if (!p) return currencyFormatter.format(context.raw)
          return [
            `Close: ${currencyFormatter.format(p.value)}`,
            `High: ${currencyFormatter.format(p.high ?? p.value)}`,
            `Low:  ${currencyFormatter.format(p.low ?? p.value)}`,
          ].join('\n')
        },
      },
    },
  },
  scales: {
    y: {
      min: yAxisMin.value,
      max: yAxisMax.value,
      border: {
        display: false,
      },
      grid: {
        color: palette.grid,
        drawTicks: false,
        lineWidth: 1,
      },
      ticks: {
        color: palette.tick,
        font: {
          family: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, sans-serif',
          size: 11,
          weight: 400,
        },
        padding: 8,
        stepSize: yAxisStep,
        callback: formatMillionTick,
      },
    },
    x: {
      offset: false,
      grid: {
        display: false,
      },
      ticks: {
        color: palette.tick,
        maxTicksLimit: 7,
        font: {
          family: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, sans-serif',
          size: 10,
          weight: 400,
        },
        padding: 4,
      },
    },
  },
}))

const chartDescription = `Grafik harga ${goldPriceChartMock.asset} (${goldPriceChartMock.symbol}) dari ${firstLabel.value} hingga ${lastLabel.value}. Harga terakhir ${currencyFormatter.format(latestPrice.value)}.`

// Candle chart canvas
const candleCanvasRef = ref<HTMLCanvasElement | null>(null)
let candleChartInstance: any = null

const initCandleChart = () => {
  if (!candleCanvasRef.value || selectedChartType.value !== 'candle') return
  if (candleChartInstance) candleChartInstance.destroy()

  Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler)

  candleChartInstance = new Chart(candleCanvasRef.value, {
    type: 'bar',
    data: { labels: labels.value, datasets: chartDatasets.value as any },
    options: chartOptions.value as any,
  })
}

watch(selectedChartType, (val) => {
  if (val === 'candle') { nextTick(() => initCandleChart()) }
})

watch([labels, chartDatasets], () => {
  if (selectedChartType.value === 'candle') { nextTick(() => initCandleChart()) }
})

onMounted(() => { if (selectedChartType.value === 'candle') initCandleChart() })
onUnmounted(() => { if (candleChartInstance) candleChartInstance.destroy() })
</script>

<template>
  <figure class="gold-price-chart" :class="{ compact: compact }">
    <figcaption class="visually-hidden">{{ chartDescription }}</figcaption>
    <div v-if="!compact" class="chart-header">
      <div class="chart-header-left">
        <h3 class="chart-title">{{ goldPriceChartMock.asset }}</h3>
        <span class="chart-symbol">{{ goldPriceChartMock.symbol }} · IDR</span>
      </div>
      <div class="chart-header-right">
        <span class="chart-price">{{ compactFormatter.format(latestPrice) }}</span>
        <span class="chart-change" :class="{ positive: isPositive, negative: !isPositive }">
          {{ isPositive ? '▲' : '▼' }}
          {{ currencyFormatter.format(Math.abs(priceChange)) }}
          ({{ priceChangePercent.toFixed(2) }}%)
        </span>
      </div>
    </div>

    <!-- OHLC Summary -->
    <div v-if="!compact" class="chart-ohlc">
      <div class="ohlc-item">
        <span class="ohlc-label">Open</span>
        <span class="ohlc-value">{{ compactFormatter.format(rangeOpen) }}</span>
      </div>
      <div class="ohlc-item">
        <span class="ohlc-label">High</span>
        <span class="ohlc-value up">{{ compactFormatter.format(rangeHigh) }}</span>
      </div>
      <div class="ohlc-item">
        <span class="ohlc-label">Low</span>
        <span class="ohlc-value down">{{ compactFormatter.format(rangeLow) }}</span>
      </div>
      <div class="ohlc-item">
        <span class="ohlc-label">Close</span>
        <span class="ohlc-value">{{ compactFormatter.format(latestPrice) }}</span>
      </div>
      <div class="ohlc-item">
        <span class="ohlc-label">Vol</span>
        <span class="ohlc-value">{{ totalVolume.toLocaleString('id-ID') }}</span>
      </div>
    </div>

    <!-- Interval & Chart Type Selector -->
    <div v-if="!compact" class="chart-controls">
      <div class="chart-intervals">
        <button
          v-for="iv in intervals"
          :key="iv"
          type="button"
          class="interval-btn"
          :class="{ active: selectedInterval === iv }"
          @click="selectedInterval = iv"
        >{{ iv }}</button>
      </div>
      <div class="chart-type-toggle">
        <button
          type="button"
          class="interval-btn"
          :class="{ active: selectedChartType === 'line' }"
          @click="selectedChartType = 'line'"
        >Line</button>
        <button
          type="button"
          class="interval-btn"
          :class="{ active: selectedChartType === 'candle' }"
          @click="selectedChartType = 'candle'"
        >Candle</button>
      </div>
    </div>

    <!-- Chart -->
    <div v-if="selectedChartType === 'candle' && !compact" class="chart-canvas">
      <canvas ref="candleCanvasRef" />
    </div>
    <GLineChart
      v-else
      class="chart-canvas"
      :labels="labels"
      :datasets="chartDatasets"
      :options="chartOptions"
      role="img"
      :aria-label="chartDescription"
    />
    <div v-if="!compact" class="chart-footer">
      <span class="chart-range">{{ firstLabel }} – {{ lastLabel }}</span>
      <span class="chart-source">Sumber: {{ goldPriceChartMock.source }}</span>
    </div>
  </figure>
</template>

<style scoped>
.gold-price-chart {
  --tv-green: #089981;
  --tv-red: #f23645;
  --tv-text: #131722;
  --tv-muted: #787b86;
  --tv-border: #e0e3eb;
  --tv-bg: #ffffff;

  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif;
  color: var(--tv-text);
  gap: 12px;
}

.gold-price-chart canvas {
  min-height: 260px !important;
}

/* Override inherited Nunito */
.gold-price-chart * {
  font-family: inherit;
}

/* Header */
.chart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2px;
}

.chart-header-left {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.chart-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--tv-text);
  line-height: 1.3;
}

.chart-symbol {
  font-size: 12px;
  font-weight: 400;
  color: var(--tv-muted);
  line-height: 1;
}

.chart-header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
}

.chart-price {
  font-size: 16px;
  font-weight: 700;
  color: var(--tv-text);
  line-height: 1.3;
  font-feature-settings: 'tnum';
}

.chart-change {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  font-feature-settings: 'tnum';
}

.chart-change.positive { color: var(--tv-green); }
.chart-change.negative { color: var(--tv-red); }

/* OHLC Bar */
.chart-ohlc {
  display: flex;
  gap: 16px;
  margin: 0 0 1px 0;
  padding: 0;
}

.ohlc-item {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.ohlc-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--tv-muted);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  line-height: 1.4;
}

.ohlc-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--tv-text);
  line-height: 1.3;
  font-feature-settings: 'tnum';
}

.ohlc-value.up { color: var(--tv-green); }
.ohlc-value.down { color: var(--tv-red); }

/* Controls Row */
.chart-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
}

.chart-intervals,
.chart-type-toggle {
  display: flex;
  gap: 2px;
}

.interval-btn {
  padding: 2px 8px;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: var(--tv-muted);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.interval-btn:hover {
  color: var(--tv-text);
  background: rgba(19, 23, 34, 0.06);
}

.interval-btn.active {
  background: var(--tv-green);
  color: #ffffff;
}

/* Chart Canvas */
.chart-canvas {
  flex: 1;
  min-height: 0;
}

.chart-canvas :deep(canvas) {
  width: 100% !important;
  height: 260px !important;
}

/* Compact */
.gold-price-chart.compact {
  height: 200px;
}

/* Footer */
.chart-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
}

.chart-range,
.chart-source {
  font-size: 11px;
  font-weight: 400;
  color: var(--tv-muted);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
