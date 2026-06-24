<script setup lang="ts">
import { useRouter } from 'vue-router'

import { GButton } from '@/components'
import ProfileForm from '@/components/modules/admin/profile/AdminProfileForm.vue'
import AdminPageLayout from '@/components/shared/layouts/AdminPageLayout.vue'
import { useAppAlert } from '@/hooks/useAppAlert'

const breadcrumbItems = [{ label: 'Dashboard', to: '/admin/dashboard' }, { label: 'Profile' }]

const router = useRouter()
const { showAlert } = useAppAlert()

const abortProfile = () => {
  showAlert({
    label: 'Perubahan profile dibatalkan.',
    variant: 'info',
  })
  router.push('/admin/dashboard')
}

const submitProfile = () => {
  showAlert({
    label: 'Perubahan profile berhasil disimpan.',
    variant: 'success',
  })
}
</script>

<template>
  <AdminPageLayout
    :breadcrumb="breadcrumbItems"
    nav-back-label="Dashboard"
    nav-back-to="/admin/dashboard"
    title="Profile"
  >
    <ProfileForm />

    <template #actions>
      <GButton
        class="action-button"
        :icon="false"
        label="Abort"
        size="md"
        type="neutral"
        @click="abortProfile"
      />
      <GButton
        class="action-button"
        :icon="false"
        label="Save Changes"
        size="md"
        type="primary"
        @click="submitProfile"
      />
    </template>
  </AdminPageLayout>
</template>

<style scoped>
.action-button {
  width: 200px;
}
</style>
