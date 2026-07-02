<script setup lang="ts">
import { ref } from 'vue'
import { useAppAlert } from '@/hooks/useAppAlert'
import GoldBarDetailModal from './GoldBarDetailModal.vue'

const walletId = 'bc1qxy2kgdygjrs3p83kkfjhx0wlhbc1qxy2kgdygjrs3p83kkfjhx0wlh'
const companyId = '001PXTID'

const { showAlert } = useAppAlert()
const isDetailModalOpen = ref(false)

const copyToClipboard = async (fieldLabel: string, value: string) => {
  if (!navigator.clipboard?.writeText) {
    window.prompt(`Salin ${fieldLabel}`, value)
    showAlert({
      label: `Clipboard browser tidak tersedia. Salin ${fieldLabel} ${value} secara manual.`,
      variant: 'warning',
      timeout: 5000,
    })
    return
  }

  try {
    await navigator.clipboard.writeText(value)
    showAlert({
      label: `${fieldLabel} ${value} berhasil disalin.`,
      variant: 'success',
      timeout: 4000,
    })
  } catch {
    showAlert({
      label: `${fieldLabel} ${value} gagal disalin.`,
      variant: 'danger',
      timeout: 4000,
    })
  }
}
</script>

<template>
  <section class="dashboard-card summary-panel" aria-labelledby="dashboard-title">
    <h1 id="dashboard-title">Dashboard</h1>

    <div class="summary-grid">
      <article
        class="summary-tile balance"
        role="button"
        tabindex="0"
        aria-label="Total Balance, click to view gold bar details"
        @click="isDetailModalOpen = true"
        @keydown.enter.prevent="isDetailModalOpen = true"
        @keydown.space.prevent="isDetailModalOpen = true"
      >
        <div>
          <div class="tile-heading mb-1">
            <h2>Total Balance</h2>
            <span class="info-icon">i</span>
          </div>
          <strong class="balance-value">100 KG</strong>
        </div>

        <div>
          <div class="tile-heading mb-1">
            <h2>Estimate Balance</h2>
            <span class="info-icon">i</span>
          </div>
          <strong class="balance-value">IDR 1,234,000,000</strong>
        </div>
      </article>

      <article class="summary-tile wallet">
        <div class="tile-heading">
          <h2>Wallet Information</h2>
          <span class="info-icon">i</span>
        </div>
        <div class="meta-block">
          <span>Wallet ID</span>
          <p>
            <span>{{ walletId }}</span>
            <button
              type="button"
              aria-label="Copy wallet ID"
              @click="copyToClipboard('Wallet ID', walletId)"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 8h11v11H8V8ZM5 16H4V4h12v1"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </p>
        </div>
        <div class="meta-block">
          <span>Company ID</span>
          <p>
            <span>{{ companyId }}</span>
            <button
              type="button"
              aria-label="Copy company ID"
              @click="copyToClipboard('Company ID', companyId)"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 8h11v11H8V8ZM5 16H4V4h12v1"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
              </svg>
            </button>
          </p>
        </div>
        <!-- <div class="split-meta">
          <div class="meta-block">
            <span>Company ID</span>
            <p>
              <span>{{ companyId }}</span>
              <button
                type="button"
                aria-label="Copy company ID"
                @click="copyToClipboard('Company ID', companyId)"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 8h11v11H8V8ZM5 16H4V4h12v1"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                </svg>
              </button>
            </p>
          </div>
          <div class="meta-block">
            <span>Email Address</span>
            <p>
              <span>{{ emailAddress }}</span>
              <button
                type="button"
                aria-label="Copy email address"
                @click="copyToClipboard('Email', emailAddress)"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 8h11v11H8V8ZM5 16H4V4h12v1"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                </svg>
              </button>
            </p>
          </div>
        </div> -->
      </article>

      <article class="summary-tile ekyc">
        <div class="tile-heading">
          <h2>KYB Status</h2>
          <span class="info-icon">i</span>
        </div>

        <div class="meta-block">
          <span>Status</span>
          <strong class="status-value">VERIFIED</strong>
        </div>
      </article>
    </div>

    <!-- Gold Bar Denominations Detail Modal -->
    <GoldBarDetailModal
      :is-visible="isDetailModalOpen"
      @close="isDetailModalOpen = false"
    />
  </section>
</template>

<style scoped>
.dashboard-card {
  border-radius: 12px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.summary-panel {
  width: 760px;
  padding: 12px 16px 24px;
  box-shadow: none;
}

h1 {
  margin: 0 0 16px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.summary-tile {
  height: 154px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e9f5e2;
  overflow: hidden;
}

.balance {
  background: color-mix(in srgb, var(--g-kit-lime-10) 50%, transparent);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.balance:hover {
  transform: translateY(-2px);
  border-color: var(--g-kit-lime-30, #a9df8b);
  box-shadow: 0 4px 12px rgba(135, 197, 95, 0.12);
}

.balance:focus-visible {
  outline: 2px solid var(--g-kit-lime-50);
  outline-offset: 2px;
}

.wallet {
  background: color-mix(in srgb, var(--g-kit-yellow-10) 50%, transparent);
  border-color: color-mix(in srgb, var(--g-kit-yellow-20) 50%, transparent);
}

.ekyc {
  background: color-mix(in srgb, var(--g-kit-kiwi-10) 50%, transparent);
  border-color: #f8f7d3;
}

.tile-heading {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tile-heading h2 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
}

.info-icon {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--g-kit-black-80);
  border-radius: 50%;
  color: var(--g-kit-black-80);
  font-size: 11px;
  font-weight: var(--g-kit-font-weight-bold);
  line-height: 1;
}

.balance-value {
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.status-value {
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.meta-block {
  min-width: 0;
}

.meta-block > span {
  display: block;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omega);
}

.ekyc .meta-block > span {
  color: var(--g-kit-black-50);
}

.meta-block p {
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 4px 0 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.meta-block p span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta-block button {
  width: 16px;
  height: 16px;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--g-kit-black-60);
  cursor: pointer;
}

.meta-block svg {
  width: 16px;
  height: 16px;
}

.split-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

@media (max-width: 1180px) {
  .summary-panel {
    width: 100%;
  }
}

@media (max-width: 760px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
