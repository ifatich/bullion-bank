<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBalance } from '@/hooks/useBalance'

import { GDropdown, GInputText } from '@/components'

const authStore = useAuthStore()
const { totalKg, estimateIdrFormatted, isLoading: isBalanceLoading } = useBalance()

const sellAmount = ref('')
const buyAmount = ref('')
const sellToken = ref('tgr')
const buyToken = ref('goidr')

const tokenOptions = [
  { label: 'TGR', value: 'tgr' },
  { label: 'GOIDR', value: 'goidr' },
]

// Mock Conversion Rate
const MOCK_CONVERSION_RATE = 1000; // 1 TGR = 1000 GOIDR

let isUpdatingSell = false
let isUpdatingBuy = false

const formatDecimals = (num: number) => {
  return parseFloat(num.toFixed(4)).toString();
}

const calculateConversion = (amount: string, fromToken: string, toToken: string) => {
  if (!amount || isNaN(Number(amount))) return ''
  const num = Number(amount)
  
  if (fromToken === 'tgr' && toToken === 'goidr') {
    return formatDecimals(num * MOCK_CONVERSION_RATE)
  } else if (fromToken === 'goidr' && toToken === 'tgr') {
    return formatDecimals(num / MOCK_CONVERSION_RATE)
  }
  return formatDecimals(num) // 1:1 fallback
}

watch(sellAmount, (newVal) => {
  if (isUpdatingSell) {
    isUpdatingSell = false
    return
  }
  isUpdatingBuy = true
  buyAmount.value = calculateConversion(newVal, sellToken.value, buyToken.value)
})

watch(buyAmount, (newVal) => {
  if (isUpdatingBuy) {
    isUpdatingBuy = false
    return
  }
  isUpdatingSell = true
  sellAmount.value = calculateConversion(newVal, buyToken.value, sellToken.value)
})

watch(sellToken, (newVal, oldVal) => {
  if (newVal === buyToken.value) {
    buyToken.value = oldVal || (newVal === 'tgr' ? 'goidr' : 'tgr')
  } else {
    isUpdatingBuy = true
    buyAmount.value = calculateConversion(sellAmount.value, sellToken.value, buyToken.value)
  }
})

watch(buyToken, (newVal, oldVal) => {
  if (newVal === sellToken.value) {
    sellToken.value = oldVal || (newVal === 'tgr' ? 'goidr' : 'tgr')
  } else {
    isUpdatingBuy = true
    buyAmount.value = calculateConversion(sellAmount.value, sellToken.value, buyToken.value)
  }
})
</script>

<template>
  <section class="swap-card" aria-labelledby="token-swap-title">
    <header class="swap-card-header">
      <h1 id="token-swap-title">Token Swap</h1>
    </header>

    <!-- Balance Card -->
    <div class="balance-card mt-2 mb-2 max-w-[200px]">
      <div class="d-flex flex-wrap align-items-center justify-content-between pb-3 gap-3" style="border-bottom: 1px solid rgba(0,0,0,0.05);">
        <div class="d-flex gap-4 flex-wrap">
          <!-- PGT Balance -->
          <div class="d-flex align-items-center gap-3">
            <div>
              <div class="balance-label">Total Balance</div>
              <div class="balance-value" :aria-busy="isBalanceLoading">
                {{ isBalanceLoading ? '...' : totalKg }} PGT
              </div>
            </div>
            <div>
              <div class="balance-label">Estimate Balance</div>
              <div class="balance-value">
                Rp {{ isBalanceLoading ? '...' : estimateIdrFormatted }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pt-3">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="balance-sub-label">Saldo Blokir</span>
          <div class="d-flex align-items-center gap-2">
            <span class="balance-sub-value">0 gr</span>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <span class="balance-sub-label text-nowrap me-2">Wallet Information</span>
          <div class="d-flex align-items-center gap-2" style="min-width: 0;">
            <span class="balance-sub-value text-truncate" style="max-width: 250px;" :title="authStore.walletAddress">
              {{ authStore.walletAddress }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="swap-sections">
      <section class="swap-section" aria-labelledby="sell-token-title">
        <h2 id="sell-token-title">Sell Token</h2>
        <div class="field-grid">
          <GInputText
            id="token-swap-sell-amount"
            name="sellAmount"
            class="mb-0"
            v-model="sellAmount"
            label="Sell"
            placeholder="Sell"
            autocomplete="off"
          />
          <GDropdown
            id="token-swap-sell-token"
            name="sellToken"
            class="mb-0"
            v-model="sellToken"
            label="Token"
            placeholder="Select token"
            :items="tokenOptions"
            item-value="value"
            item-text="label"
          />
        </div>
      </section>

      <div class="d-flex justify-content-center align-items-center position-relative my-2">
        <div class="section-divider position-absolute w-100" aria-hidden="true" style="z-index: 0; height: 1px;"></div>
        <div class="conversion-badge px-3 py-1 position-relative" style="background: var(--g-kit-white); z-index: 1; border-radius: 16px; border: 1px solid var(--g-kit-black-10); font-size: 12px; color: var(--g-kit-black-60);">
          1 TGR = 1.000 GOIDR
        </div>
      </div>

      <section class="swap-section" aria-labelledby="buy-token-title">
        <h2 id="buy-token-title">Buy Token</h2>
        <div class="field-grid">
          <GInputText
            id="token-swap-buy-amount"
            name="buyAmount"
            class="mb-0"
            v-model="buyAmount"
            label="Buy"
            placeholder="Buy"
            autocomplete="off"
          />
          <GDropdown
            id="token-swap-buy-token"
            name="buyToken"
            class="mb-0"
            v-model="buyToken"
            label="Token"
            placeholder="Select token"
            :items="tokenOptions"
            item-value="value"
            item-text="label"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.swap-card {
  width: 100%;
  min-height: 410px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.swap-card-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

h1,
h2 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.swap-sections {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
}

.swap-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.section-divider {
  width: 100%;
  height: 8px;
  background: var(--g-kit-black-10);
}

@media (max-width: 760px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
}

.balance-card {
  background-color: #EAF8ED;
  border-radius: 16px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  max-width: 450px;
}

.balance-card::before {
  content: '';
  position: absolute;
  top: -40px;
  right: -20px;
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  z-index: 0;
}

.balance-card > * {
  position: relative;
  z-index: 1;
}


.balance-label {
  font-size: 14px;
  color: #666;
}

.balance-value {
  font-size: 18px;
  font-weight: 700;
  color: #1B5E20;
}

.balance-sub-label {
  font-size: 14px;
  color: #666;
}

.balance-sub-value {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
</style>
