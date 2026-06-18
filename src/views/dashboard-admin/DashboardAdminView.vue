<script setup lang="ts">
import AdminAppShell from '@/components/modules/dashboard-admin/AdminAppShell.vue'
import AdminApprovalPanel from '@/components/modules/dashboard-admin/AdminApprovalPanel.vue'
import AdminMetricPanel from '@/components/modules/dashboard-admin/AdminMetricPanel.vue'
import AdminVehicleTable from '@/components/modules/dashboard-admin/AdminVehicleTable.vue'
import dashboardAdminMock from '@/utils/data/dashboard-admin.mock.json'
</script>

<template>
  <AdminAppShell>
    <div class="dashboard-admin-page">
      <div class="top-grid">
        <AdminMetricPanel :items="dashboardAdminMock.summary" />
        <AdminApprovalPanel :items="dashboardAdminMock.approvalRequests" />
      </div>

      <AdminVehicleTable :rows="dashboardAdminMock.vehicleIdentities" />
    </div>
  </AdminAppShell>
</template>

<style scoped>
.dashboard-admin-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.top-grid {
  display: grid;
  grid-template-columns: minmax(0, 2040px) 368px;
  gap: 24px;
  align-items: start;
}

@media (max-width: 1180px) {
  .top-grid {
    grid-template-columns: 1fr;
  }
}
</style>
