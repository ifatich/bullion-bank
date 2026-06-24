<script setup lang="ts">
import AdminTransactionHistory from '@/components/modules/admin/transaction-history/AdminTransactionHistory.vue'
import AdminPageLayout from '@/components/shared/layouts/AdminPageLayout.vue'

const breadcrumbItems = [{ label: 'Dashboard', to: '/admin/dashboard' }, { label: 'Transaction History' }]
</script>

<template>
  <AdminPageLayout
    :breadcrumb="breadcrumbItems"
    nav-back-label="Dashboard"
    nav-back-to="/admin/dashboard"
    title="Transaction History"
  >
    <AdminTransactionHistory />
  </AdminPageLayout>
</template>
