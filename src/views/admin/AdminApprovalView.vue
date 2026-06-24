<script setup lang="ts">
import AdminApprovalTable from '@/components/modules/admin/approval/AdminApprovalTable.vue'
import AdminPageLayout from '@/components/shared/layouts/AdminPageLayout.vue'
import approvalMock from '@/utils/data/admin-approval.mock.json'

const breadcrumbItems = [{ label: 'Dashboard', to: '/admin/dashboard' }, { label: 'Request Approval Multisignature' }]
</script>

<template>
  <AdminPageLayout
    :breadcrumb="breadcrumbItems"
    nav-back-label="Dashboard"
    nav-back-to="/admin/dashboard"
    title="Request Approval Multisignature"
  >
    <AdminApprovalTable :requests="approvalMock" />
  </AdminPageLayout>
</template>
