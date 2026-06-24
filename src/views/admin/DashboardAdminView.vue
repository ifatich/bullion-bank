<script setup lang="ts">
import AdminMetricPanel from '@/components/modules/admin/dashboard/AdminMetricPanel.vue'
import AdminApprovalPanel from '@/components/modules/admin/approval/AdminApprovalPanel.vue'
import AdminTransactionHistory from '@/components/modules/admin/transaction-history/AdminTransactionHistory.vue'
import AdminPageLayout from '@/components/shared/layouts/AdminPageLayout.vue'
import dashboardAdminMock from '@/utils/data/dashboard-admin.mock.json'
</script>

<template>
  <AdminPageLayout title="Dashboard">
    <div class="top-grid">
      <AdminMetricPanel :metrics="dashboardAdminMock.summary" />
      <AdminApprovalPanel :approval-requests="dashboardAdminMock.approvalRequests" />
    </div>

    <AdminTransactionHistory />
  </AdminPageLayout>
</template>

<style scoped>
.top-grid {
  display: grid;
  grid-template-columns: minmax(0, 2040px) 368px;
  gap: 16px;
  align-items: start;
}

@media (max-width: 1180px) {
  .top-grid {
    grid-template-columns: 1fr;
  }
}
</style>
