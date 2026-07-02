<script setup lang="ts">
import { computed } from 'vue'

import img10g from '@/assets/img/denominasi=10.svg'
import img50g from '@/assets/img/denominasi=50.svg'
import img100g from '@/assets/img/denominasi=100.svg'
import img1000g from '@/assets/img/denominasi=1000.svg'

// Mock balance data — replace with composable/store when API is available
const totalBalance = '100 KG'
const estimateCurrency = 'IDR'
const estimateAmount = '1,234,000,000'

/**
 * Denomination breakdown.
 * Each entry represents a physical gold bar size, its count (pcs), and total weight.
 */
const denominations = [
  { denomination: '10 Gram', pcs: 10, totalWeight: '100 Gram', image: img10g },
  { denomination: '50 Gram', pcs: 8, totalWeight: '400 Gram', image: img50g },
  { denomination: '100 Gram', pcs: 5, totalWeight: '500 Gram', image: img100g },
  { denomination: '1 Kilogram', pcs: 99, totalWeight: '99,000 Gram', image: img1000g },
]

/** Only show denominations that have at least 1 piece */
const activeDenominations = computed(() => denominations.filter((d) => d.pcs > 0))

const totalPcs = computed(() => activeDenominations.value.reduce((acc, d) => acc + d.pcs, 0))
</script>

<template>
  <aside class="balance-card" aria-labelledby="balance-card-title">
    <!-- Header -->
    <header class="balance-header">
      <h2 id="balance-card-title">Saldo Anda</h2>
    </header>

    <!-- Balance totals -->
    <div class="balance-totals">
      <div class="balance-row">
        <span class="balance-label">Total Balance</span>
        <strong class="balance-value">{{ totalBalance }}</strong>
      </div>
      <div class="balance-divider" aria-hidden="true" />
      <div class="balance-row balance-row--top">
        <span class="balance-label">Estimate Balance</span>
        <div class="estimate-value-block">
          <span class="estimate-currency">{{ estimateCurrency }}</span>
          <strong class="balance-value estimate">{{ estimateAmount }}</strong>
        </div>
      </div>
    </div>

    <!-- Denomination breakdown -->
    <div class="denom-section">
      <div class="denom-header">
        <span class="denom-title">Rincian Keping</span>
        <span class="denom-total">{{ totalPcs }} keping</span>
      </div>

      <ul class="denom-list" aria-label="Rincian keping emas">
        <li
          v-for="item in activeDenominations"
          :key="item.denomination"
          class="denom-item"
        >
          <div class="denom-icon-wrap">
            <img :src="item.image" :alt="item.denomination" class="denom-img" />
          </div>
          <div class="denom-info">
            <span class="denom-name">{{ item.denomination }}</span>
            <span class="denom-weight">{{ item.totalWeight }}</span>
          </div>
          <span class="denom-pcs">{{ item.pcs }} keping</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.balance-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 8px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

/* ── Header ── */
.balance-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h2 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

/* ── Balance totals ── */
.balance-totals {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: color-mix(in srgb, var(--g-kit-lime-10) 50%, transparent);
  border: 1px solid #e9f5e2;
  border-radius: 8px;
  padding: 12px 14px;
}

.balance-divider {
  height: 1px;
  background: #d8f0c8;
  margin: 10px 0;
}

.balance-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.balance-row--top {
  align-items: flex-start;
}

.balance-label {
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.balance-value {
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
  text-align: right;
}

.balance-value.estimate {
  display: block;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
  text-align: right;
}

.estimate-value-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0;
}

.estimate-currency {
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  text-align: right;
}

/* ── Denomination section ── */
.denom-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.denom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.denom-title {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
}

.denom-total {
  padding: 2px 8px;
  background: color-mix(in srgb, var(--g-kit-lime-10) 80%, transparent);
  border: 1px solid #c9eaae;
  border-radius: 100px;
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
}

.denom-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.denom-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  background: var(--g-kit-black-10, #f8f8f8);
  border: 1px solid var(--g-kit-black-20, #eeeeef);
  transition: background 0.15s ease;
}

.denom-item:hover {
  background: color-mix(in srgb, var(--g-kit-lime-10) 40%, transparent);
}

.denom-icon-wrap {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: var(--g-kit-white);
  border: 1px solid #d8f0c8;
  overflow: hidden;
}

.denom-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.denom-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.denom-name {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
}

.denom-weight {
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.denom-pcs {
  flex: 0 0 auto;
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
  text-align: right;
}
</style>
