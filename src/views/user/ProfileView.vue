<script setup lang="ts">
import { useRouter } from 'vue-router'

import { GButton } from '@/components'
import ProfileForm from '@/components/modules/user/profile/ProfileForm.vue'
import UserPageLayout from '@/components/shared/layouts/UserPageLayout.vue'
import { useAppAlert } from '@/hooks/useAppAlert'

const breadcrumbItems = [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Profile' }]

const router = useRouter()
const { showAlert } = useAppAlert()

const abortProfile = () => {
  showAlert({
    label: 'Perubahan profile dibatalkan.',
    variant: 'info',
  })
  router.push('/dashboard')
}

const submitProfile = () => {
  showAlert({
    label: 'Perubahan profile berhasil disimpan.',
    variant: 'success',
  })
}
</script>

<template>
  <UserPageLayout
    :breadcrumb="breadcrumbItems"
    nav-back-label="Dashboard"
    nav-back-to="/dashboard"
    info-banner="Manage your personal information and security preferences in one place, ensuring a seamless and secure Bullion Bank experience."
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
  </UserPageLayout>
</template>

<style scoped>
.action-button {
  width: 200px;
}
</style>
