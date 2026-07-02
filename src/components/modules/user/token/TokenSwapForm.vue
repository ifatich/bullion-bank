<script setup lang="ts">
import { ref } from 'vue'

import { GDropdown, GInputText } from '@/components'

const sellAmount = ref('')
const buyAmount = ref('')
const sellToken = ref('')
const buyToken = ref('')

const tokenOptions = [
  { label: 'KG', value: 'kg' },
  { label: 'IDR', value: 'idr' },
  { label: 'Gold Token', value: 'gold-token' },
]
</script>

<template>
  <section class="swap-card" aria-labelledby="token-swap-title">
    <header class="swap-card-header">
      <h1 id="token-swap-title">Token Swap</h1>
    </header>

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

      <div class="section-divider" aria-hidden="true" />

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
</style>
