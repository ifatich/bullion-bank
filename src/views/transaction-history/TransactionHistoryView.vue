<script setup lang="ts">
import DashboardTopbar from '@/components/modules/dashboard/DashboardTopbar.vue'
import TransactionHistoryTable from '@/components/modules/transaction-history/TransactionHistoryTable.vue'
import Breadcrumb from '@/components/shared/breadcrumb/Breadcrumb.vue'
import NavBack from '@/components/shared/navBack/navBack.vue'

const breadcrumbItems = [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Transaction History' }]
</script>

<template>
  <div class="transaction-history-page">
    <main class="transaction-history-main">
      <DashboardTopbar />

      <nav class="breadcrumb-row" aria-label="Breadcrumb">
        <Breadcrumb :items="breadcrumbItems" />
      </nav>

      <div class="header-line" aria-hidden="true" />

      <section class="history-content" aria-labelledby="transaction-history-page-title">
        <NavBack id="transaction-history-page-title" label="Dashboard" to="/dashboard" />

        <aside class="info-banner">
          <p>
            Seamlessly convert digital bullion tokens into physical gold with a trusted redemption
            process.
          </p>
          <span class="info-accent" aria-hidden="true" />
        </aside>

        <TransactionHistoryTable />
      </section>
    </main>

    <footer class="history-footer">Copyright © 2024 PT. Pegadaian. All Rights Reserved.</footer>
  </div>
</template>

<style scoped>
.transaction-history-page {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  font-family:
    'Nunito Sans',
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.transaction-history-main {
  flex: 1;
}

.breadcrumb-row,
.header-line,
.history-content {
  width: min(1152px, calc(100vw - 48px));
  margin-right: auto;
  margin-left: auto;
}

.header-line {
  height: 1px;
  background: var(--g-kit-black-20);
}

.history-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 48px;
}

.info-banner {
  min-height: 48px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 12px;
  border-radius: 6px;
  background: var(--g-kit-blue-10);
}

.info-banner p {
  position: relative;
  z-index: 1;
  min-width: 0;
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.info-accent {
  position: absolute;
  top: -48px;
  right: -65px;
  width: 129px;
  height: 111px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--g-kit-blue-40) 35%, transparent);
}

.info-accent::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--g-kit-blue-40) 18%, transparent);
}

.history-footer {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--g-kit-black-20);
  background: var(--g-kit-white);
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

@media (max-width: 760px) {
  .breadcrumb-row,
  .header-line,
  .history-content {
    width: calc(100vw - 32px);
  }

  .history-content {
    margin-top: 24px;
  }

  .history-footer {
    padding: 12px 16px;
    text-align: center;
    font-size: var(--g-kit-font-size-sigma);
  }
}
</style>
