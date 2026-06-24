<script setup lang="ts">
import TransactionHistoryTable from '@/components/modules/user/transaction-history/TransactionHistoryTable.vue'
import UserPageLayout from '@/components/shared/layouts/UserPageLayout.vue'

const breadcrumbItems = [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Transaction History' }]
</script>

<template>
  <UserPageLayout
    :breadcrumb="breadcrumbItems"
    nav-back-label="Dashboard"
    nav-back-to="/dashboard"
  >
    <TransactionHistoryTable />
  </UserPageLayout>
</template>
