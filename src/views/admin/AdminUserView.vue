<script setup lang="ts">
import { ref } from 'vue'
import AdminUserTable from '@/components/modules/admin/user/AdminUserTable.vue'
import AdminUserDetailModal from '@/components/modules/admin/user/AdminUserDetailModal.vue'
import AdminUserDeleteDialog from '@/components/modules/admin/user/AdminUserDeleteDialog.vue'
import AdminPageLayout from '@/components/shared/layouts/AdminPageLayout.vue'
import adminUserMock from '@/utils/data/admin-user.mock.json'

import type { AdminUser } from '@/components/modules/admin/user/AdminUserTable.vue'
import type { UserDetail } from '@/components/modules/admin/user/AdminUserDetailModal.vue'

const breadcrumbItems = [{ label: 'Dashboard', to: '/admin/dashboard' }, { label: 'Admin User' }]
const isAdminUserDetailModalVisible = ref(false)
const isAdminUserDeleteDialogVisible = ref(false)
const selectedAdminUser = ref<AdminUser | null>(null)

function openAdminUserDetailModal(row: AdminUser) {
  selectedAdminUser.value = row
  isAdminUserDetailModalVisible.value = true
}

function requestAdminUserDeletion(row: AdminUser) {
  selectedAdminUser.value = row
  isAdminUserDeleteDialogVisible.value = true
}

function openAddUser() {
  // In real app: navigate to add user page or open modal
}

function confirmAdminUserDeletion() {
  // In real app: call API to delete user
}

function closeAdminUserDetailModal() {
  isAdminUserDetailModalVisible.value = false
  selectedAdminUser.value = null
}

function closeAdminUserDeleteDialog() {
  isAdminUserDeleteDialogVisible.value = false
  selectedAdminUser.value = null
}
</script>

<template>
  <AdminPageLayout
    :breadcrumb="breadcrumbItems"
    nav-back-label="Dashboard"
    nav-back-to="/admin/dashboard"
    title="Admin User"
  >
    <AdminUserTable
      :admin-users="(adminUserMock.adminUsers as AdminUser[])"
      @preview-admin-user="openAdminUserDetailModal"
      @delete-admin-user="requestAdminUserDeletion"
      @add-user="openAddUser"
    />
  </AdminPageLayout>

  <AdminUserDetailModal
    :is-visible="isAdminUserDetailModalVisible"
    :detail="(adminUserMock.userDetail as UserDetail)"
    @close="closeAdminUserDetailModal"
  />

  <AdminUserDeleteDialog
    :is-visible="isAdminUserDeleteDialogVisible"
    :user-name="selectedAdminUser?.name ?? ''"
    @close="closeAdminUserDeleteDialog"
    @confirm="confirmAdminUserDeletion"
  />
</template>
