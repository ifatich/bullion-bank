<script setup lang="ts">
import BaseModal from '@/components/shared/modals/BaseModal.vue'
import StatusBadge from '@/components/shared/status-badge/StatusBadge.vue'

export type TransactionDetail = {
  no: string
  transactionHash: string
  referenceNumber: string
  transactionType: string
  status: 'Success' | 'Pending' | 'Failed'
  date: string
  confirmedAt: string
  asset: string
  network: string
  amount: string
  fee: string
  netAmount: string
  fiatValue: string
  blockNumber: string
  confirmations: string
  fromCompany: string
  fromWallet: string
  fromAddress: string
  toCompany: string
  toWallet: string
  toAddress: string
}

defineProps<{
  isVisible: boolean
  transaction: TransactionDetail | null
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <BaseModal
    :model-value="isVisible"
    width="640px"
    title-id="transaction-detail-title"
    @update:model-value="$emit('close')"
  >
    <template #header>
      <header class="detail-modal-header">
        <div>
          <h2 id="transaction-detail-title">Transaction Detail</h2>
          <p>{{ transaction?.transactionHash }}</p>
        </div>
        <button
          class="detail-close-button"
          type="button"
          aria-label="Close transaction detail"
          @click="$emit('close')"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </header>
    </template>

    <div class="detail-modal-content">
      <dl class="detail-list">
        <div class="detail-item">
          <dt>No</dt>
          <dd>{{ transaction?.no }}</dd>
        </div>
        <div class="detail-item">
          <dt>Transaction Hash</dt>
          <dd>{{ transaction?.transactionHash }}</dd>
        </div>
        <div class="detail-item">
          <dt>Reference Number</dt>
          <dd>{{ transaction?.referenceNumber }}</dd>
        </div>
        <div class="detail-item">
          <dt>Transaction Type</dt>
          <dd>{{ transaction?.transactionType }}</dd>
        </div>
        <div class="detail-item">
          <dt>Status</dt>
            <dd>
              <StatusBadge
                :variant="transaction?.status.toLowerCase() as 'success' | 'pending' | 'failed'"
                :label="transaction?.status ?? ''"
              />
            </dd>
        </div>
        <div class="detail-item">
          <dt>Date</dt>
          <dd>{{ transaction?.date }}</dd>
        </div>
        <div class="detail-item">
          <dt>Confirmed At</dt>
          <dd>{{ transaction?.confirmedAt }}</dd>
        </div>
        <div class="detail-item">
          <dt>Asset</dt>
          <dd>{{ transaction?.asset }}</dd>
        </div>
        <div class="detail-item">
          <dt>Network</dt>
          <dd>{{ transaction?.network }}</dd>
        </div>
        <div class="detail-item">
          <dt>Amount</dt>
          <dd>{{ transaction?.amount }}</dd>
        </div>
        <div class="detail-item">
          <dt>Fee</dt>
          <dd>{{ transaction?.fee }}</dd>
        </div>
        <div class="detail-item">
          <dt>Net Amount</dt>
          <dd>{{ transaction?.netAmount }}</dd>
        </div>
        <div class="detail-item">
          <dt>Fiat Value</dt>
          <dd>{{ transaction?.fiatValue }}</dd>
        </div>
        <div class="detail-item">
          <dt>Block Number</dt>
          <dd>{{ transaction?.blockNumber }}</dd>
        </div>
        <div class="detail-item">
          <dt>Confirmations</dt>
          <dd>{{ transaction?.confirmations }}</dd>
        </div>
      </dl>

      <div class="detail-party-grid">
        <article class="detail-party-card">
          <span>From</span>
          <strong>{{ transaction?.fromCompany }}</strong>
          <p>{{ transaction?.fromWallet }}</p>
          <p>{{ transaction?.fromAddress }}</p>
        </article>
        <article class="detail-party-card">
          <span>To</span>
          <strong>{{ transaction?.toCompany }}</strong>
          <p>{{ transaction?.toWallet }}</p>
          <p>{{ transaction?.toAddress }}</p>
        </article>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.detail-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 16px 16px 0;
}

.detail-modal-header h2 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-lambda, 18px);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-lambda, 26px);
}

.detail-modal-header p {
  margin-top: 4px;
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  word-break: break-word;
}

.detail-close-button {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--g-kit-black-80);
  cursor: pointer;
}

.detail-close-button svg {
  width: 24px;
  height: 24px;
}

.detail-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 16px;
}

.detail-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.detail-item dt,
.detail-party-card span {
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.detail-item dd {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  word-break: break-word;
}

.detail-party-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-party-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 6px;
  background: var(--g-kit-black-10);
}

.detail-party-card strong {
  overflow: hidden;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-party-card p {
  margin: 0;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  word-break: break-word;
}

@media (max-width: 760px) {
  .detail-list,
  .detail-party-grid {
    grid-template-columns: 1fr;
  }
}
</style>
