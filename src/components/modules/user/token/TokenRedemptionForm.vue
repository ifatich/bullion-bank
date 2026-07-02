<script setup lang="ts">
import { ref } from 'vue'

import { GDatePicker, GInputText } from '@/components'
import { uniqueDatePickerFields as vUniqueDatePickerFields } from '@/directives/uniqueDatePickerFields'

const amount = ref('')
const redemptionDate = ref('')
const transactionFee = ref('---')
const grandTotal = ref('---')
</script>

<template>
  <section class="redemption-card" aria-labelledby="token-redemption-title">
    <header class="redemption-card-header">
      <h1 id="token-redemption-title">Token Redemption</h1>
    </header>

    <div class="redemption-fields">
      <GInputText
        id="token-redemption-amount"
        name="amount"
        class="mb-0"
        v-model="amount"
        label="Amount"
        placeholder="Masukkan amount"
        autocomplete="off"
      />
      <GDatePicker
        v-unique-date-picker-fields="{
          id: 'token-redemption-date',
          name: 'redemptionDate',
        }"
        id="token-redemption-date"
        name="redemptionDate"
        class="mb-0"
        v-model="redemptionDate"
        title="Redemption Date"
        placeholder="Pilih redemption date"
        format-type="date"
        autocomplete="off"
      />

      <div class="section-divider" aria-hidden="true" />

      <div class="summary-grid">
        <GInputText
          id="token-redemption-transaction-fee"
          name="transactionFee"
          class="mb-0"
          v-model="transactionFee"
          label="Transaction Fee"
          disabled
          placeholder="---"
          autocomplete="off"
        />
        <GInputText
          id="token-redemption-grand-total"
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
.redemption-card {
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

.redemption-card-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

h1 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.redemption-fields {
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
