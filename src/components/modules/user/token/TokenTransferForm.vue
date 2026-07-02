<script setup lang="ts">
import { ref } from 'vue'

import { GInputText } from '@/components'

const walletAddress = ref('')
const amount = ref('')
const transactionFee = ref('---')
const grandTotal = ref('---')
</script>

<template>
  <section class="transfer-card" aria-labelledby="token-transfer-title">
    <header class="transfer-card-header">
      <h1 id="token-transfer-title">Token Transfer</h1>
    </header>

    <div class="transfer-fields">
      <GInputText
        id="token-transfer-wallet-address"
        name="walletAddress"
        v-model="walletAddress"
        label="Recipient Wallet Address "
        placeholder="Masukkan recipient wallet address "
        class="mb-0"
        autocomplete="off"
      />
      <GInputText
        id="token-transfer-amount"
        name="amount"
        v-model="amount"
        label="Amount"
        placeholder="Masukkan amount"
        class="mb-0"
        autocomplete="off"
      />
      <div class="section-divider" aria-hidden="true" />

      <div class="summary-grid">
        <GInputText
          id="token-transfer-transaction-fee"
          name="transactionFee"
          class="mb-0"
          v-model="transactionFee"
          label="Transaction Fee"
          disabled
          placeholder="---"
          autocomplete="off"
        />
        <GInputText
          id="token-transfer-grand-total"
          name="grandTotal"
          class="mb-0"
          v-model="grandTotal"
          label="Grand Total"
          disabled
          placeholder="---"
          autocomplete="off"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.transfer-card {
  width: 100%;
  min-height: 392px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.transfer-card-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

h1,
p {
  margin: 0;
}

h1 {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.transfer-card-header p {
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

.transfer-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-divider {
  width: 100%;
  height: 8px;
  background: var(--g-kit-black-10);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 760px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
