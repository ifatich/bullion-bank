<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'

import { GLineChart } from '@/components'
import { goldPriceChartMock } from '@/utils/data/gold-price-chart.mock'

const formatMillionTick = (value: string | number) =>
  `${(Number(value) / 1_000_000).toLocaleString('id-ID', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} jt`

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: goldPriceChartMock.currency,
  maximumFractionDigits: 0,
})

const palette = reactive({
  line: '#00ab4e',
  grid: '#eeeeef',
  tick: '#58585b',
  white: '#ffffff',
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

const labels = goldPriceChartMock.points.map((point) => point.label)
const values = goldPriceChartMock.points.map((point) => point.value)
const latestPrice = values[values.length - 1] ?? 0
const firstLabel = labels[0] ?? ''
const lastLabel = labels[labels.length - 1] ?? ''
const yAxisStep = 500_000
const minimumPrice = values.length ? Math.min(...values) : 0
const maximumPrice = values.length ? Math.max(...values) : yAxisStep
const yAxisMin = Math.floor(minimumPrice / yAxisStep) * yAxisStep
const yAxisMax = Math.ceil(maximumPrice / yAxisStep) * yAxisStep

const chartDatasets = computed(() => [
  {
    label: `Harga ${goldPriceChartMock.asset} / ${goldPriceChartMock.unit}`,
    data: values,
    backgroundColor: palette.line,
    borderColor: palette.line,
    borderWidth: 2.5,
    fill: true,
    tension: 0.35,
    pointRadius: 0,
    pointHoverRadius: 8,
    pointHoverBorderWidth: 4,
    pointHoverBackgroundColor: palette.line,
    pointHoverBorderColor: palette.white,
  },
])

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 600,
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  layout: {
    padding: {
      top: 6,
      right: 4,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        title: (items: Array<{ label?: string }>) => items[0]?.label ?? '',
        label: (context: { raw: number }) => currencyFormatter.format(context.raw),
      },
    },
  },
  scales: {
    y: {
      min: yAxisMin,
      max: yAxisMax,
      border: {
        display: false,
      },
      grid: {
        color: palette.grid,
        drawTicks: false,
        borderDash: [4, 4],
        borderDashOffset: 0,
        lineWidth: 0.25,
      },
      ticks: {
        color: palette.white,
        font: {
          family: 'Nunito Sans',
          size: 12,
          weight: 600,
        },
        padding: 10,
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
        color: palette.white,
        font: {
          family: 'Nunito Sans',
          size: 10,
          weight: 600,
        },
      },
    },
  },
}))

const chartDescription = `Grafik harga ${goldPriceChartMock.asset} (${goldPriceChartMock.symbol}) untuk ${goldPriceChartMock.unit} dari ${firstLabel} hingga ${lastLabel}. Harga terakhir ${currencyFormatter.format(latestPrice)}. Sumber ${goldPriceChartMock.source}, diperbarui ${goldPriceChartMock.updatedAt}.`
</script>

<template>
  <figure class="gold-price-chart">
    <figcaption class="visually-hidden">{{ chartDescription }}</figcaption>
    <GLineChart
      class="chart"
      :labels="labels"
      :datasets="chartDatasets"
      :options="chartOptions"
      role="img"
      :aria-label="chartDescription"
    />
  </figure>
</template>

<style scoped>
.gold-price-chart {
  width: 100%;
  height: 200px;
  margin: 0;
  /* padding: 12px 12px; */
  overflow: hidden;
  border-radius: 4px;
  /* background: var(--g-kit-white); */
}

.chart {
  width: 100%;
  height: 100%;
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
