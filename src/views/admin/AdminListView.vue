<script setup lang="ts">
import { ref } from 'vue'
import AdminListTable from '@/components/modules/admin/admin-list/AdminListTable.vue'
import AdminListDetailModal from '@/components/modules/admin/admin-list/AdminListDetailModal.vue'
import AdminListDeleteDialog from '@/components/modules/admin/admin-list/AdminListDeleteDialog.vue'
import AdminListAddModal from '@/components/modules/admin/admin-list/AdminListAddModal.vue'
import AdminPageLayout from '@/components/shared/layouts/AdminPageLayout.vue'
import adminUserMock from '@/utils/data/admin-user.mock.json'

import type { AdminListUser } from '@/components/modules/admin/admin-list/AdminListTable.vue'
import type { EditAdmin } from '@/components/modules/admin/admin-list/AdminListDetailModal.vue'
import type { AddAdminForm } from '@/components/modules/admin/admin-list/AdminListAddModal.vue'

const breadcrumbItems = [{ label: 'Dashboard', to: '/admin/dashboard' }, { label: 'Admin List' }]
const isEditAdminModalVisible = ref(false)
const isAdminListDeleteDialogVisible = ref(false)
const isAddAdminModalVisible = ref(false)
const selectedAdminUser = ref<AdminListUser | null>(null)

function openEditAdminModal(row: AdminListUser) {
  selectedAdminUser.value = row
  isEditAdminModalVisible.value = true
}

function requestAdminListDeletion(row: AdminListUser) {
  selectedAdminUser.value = row
  isAdminListDeleteDialogVisible.value = true
}

function confirmAdminListDeletion() {
  // In real app: call API to delete user
}

function closeEditAdminModal() {
  isEditAdminModalVisible.value = false
  selectedAdminUser.value = null
}

function closeAdminListDeleteDialog() {
  isAdminListDeleteDialogVisible.value = false
  selectedAdminUser.value = null
}

function saveEditAdmin(_form: EditAdmin) {
  // In real app: call API to update admin
  isEditAdminModalVisible.value = false
}

function openAddAdminModal() {
  isAddAdminModalVisible.value = true
}

function closeAddAdminModal() {
  isAddAdminModalVisible.value = false
}

function saveAddAdmin(_form: AddAdminForm) {
  // In real app: call API to create admin
  isAddAdminModalVisible.value = false
}
</script>

<template>
  <AdminPageLayout
    :breadcrumb="breadcrumbItems"
    nav-back-label="Dashboard"
    nav-back-to="/admin/dashboard"
    title="Admin List"
  >
    <AdminListTable
      :admin-users="(adminUserMock.adminUsers as AdminListUser[])"
      @edit-admin-user="openEditAdminModal"
      @delete-admin-user="requestAdminListDeletion"
      @add-admin="openAddAdminModal"
    />
  </AdminPageLayout>

  <AdminListDetailModal
    :is-visible="isEditAdminModalVisible"
    :detail="selectedAdminUser as unknown as EditAdmin"
    @close="closeEditAdminModal"
    @save="saveEditAdmin"
  />

  <AdminListDeleteDialog
    :is-visible="isAdminListDeleteDialogVisible"
    :user-name="selectedAdminUser?.name ?? ''"
    @close="closeAdminListDeleteDialog"
    @confirm="confirmAdminListDeletion"
  />

  <AdminListAddModal
    :is-visible="isAddAdminModalVisible"
    @close="closeAddAdminModal"
    @save="saveAddAdmin"
  />
</template>
