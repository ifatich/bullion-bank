<script setup lang="ts">
import { ref } from 'vue'

import { GDropdown, GInputText } from '@/components'
import { useAppAlert } from '@/hooks/useAppAlert'

const sellAmount = ref('')
const buyAmount = ref('')
const sellToken = ref('')
const buyToken = ref('')
const lastUpdated = ref('08/07/2024, 09.00 AM')
const { showAlert } = useAppAlert()

const tokenOptions = [
  { label: 'KG', value: 'kg' },
  { label: 'IDR', value: 'idr' },
  { label: 'Gold Token', value: 'gold-token' },
]

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
    label: 'Data token swap berhasil diperbarui.',
    variant: 'info',
  })
}
</script>

<template>
  <section class="swap-card" aria-labelledby="token-swap-title">
    <header class="swap-card-header">
      <h1 id="token-swap-title">Token Swap</h1>
      <p>
        Last updated on {{ lastUpdated }}
        <button
          class="refresh-button"
          type="button"
          aria-label="Refresh token swap data"
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

    <div class="swap-sections">
      <section class="swap-section" aria-labelledby="sell-token-title">
        <h2 id="sell-token-title">Sell Token</h2>
        <div class="field-grid">
          <GInputText v-model="sellAmount" label="Sell" placeholder="Sell" />
          <GDropdown
            v-model="sellToken"
            label="Token"
            placeholder="Select token"
            :items="tokenOptions"
            item-value="value"
            item-text="label"
          />
        </div>
      </section>

      <div class="section-divider" aria-hidden="true" />

      <section class="swap-section" aria-labelledby="buy-token-title">
        <h2 id="buy-token-title">Buy Token</h2>
        <div class="field-grid">
          <GInputText v-model="buyAmount" label="Buy" placeholder="Buy" />
          <GDropdown
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
h2,
p {
  margin: 0;
}

h1,
h2 {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.swap-card-header p {
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
</style>
