<script setup lang="ts">
import { ref } from 'vue'

import { GDatePicker, GInputText } from '@/components'
import { useAppAlert } from '@/hooks/useAppAlert'

const amount = ref('')
const redemptionDate = ref('')
const transactionFee = ref('---')
const grandTotal = ref('---')
const lastUpdated = ref('08/07/2024, 09.00 AM')
const { showAlert } = useAppAlert()

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
    label: 'Data token redemption berhasil diperbarui.',
    variant: 'info',
  })
}
</script>

<template>
  <section class="redemption-card" aria-labelledby="token-redemption-title">
    <header class="redemption-card-header">
      <h1 id="token-redemption-title">Token Redemption</h1>
      <p>
        Last updated on {{ lastUpdated }}
        <button
          class="refresh-button"
          type="button"
          aria-label="Refresh token redemption data"
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

    <div class="redemption-fields">
      <GInputText v-model="amount" label="Amount" placeholder="Masukkan amount" />
      <GDatePicker
        v-model="redemptionDate"
        title="Redemption Date"
        placeholder="Pilih redemption date"
        format-type="date"
      />

      <div class="section-divider" aria-hidden="true" />

      <div class="summary-grid">
        <GInputText v-model="transactionFee" label="Transaction Fee" disabled placeholder="---" />
        <GInputText v-model="grandTotal" label="Grand Total" disabled placeholder="---" />
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

.redemption-card-header p {
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
