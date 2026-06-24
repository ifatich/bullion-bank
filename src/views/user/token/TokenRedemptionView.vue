<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { GButton } from '@/components'
import TokenRedemptionForm from '@/components/modules/user/token/TokenRedemptionForm.vue'
import UserPageLayout from '@/components/shared/layouts/UserPageLayout.vue'
import TransactionAlertModal from '@/components/shared/modals/TransactionAlertModal.vue'
import { useAppAlert } from '@/hooks/useAppAlert'

const breadcrumbItems = [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Token Redemption' }]

const router = useRouter()
const { showAlert } = useAppAlert()
const isTransactionModalOpen = ref(false)

const abortRedemption = () => {
  showAlert({
    label: 'Token redemption dibatalkan.',
    variant: 'info',
  })
  router.push('/dashboard')
}

const submitRedemption = () => {
  isTransactionModalOpen.value = true
}
</script>

<template>
  <UserPageLayout
    :breadcrumb="breadcrumbItems"
    nav-back-label="Dashboard"
    nav-back-to="/dashboard"
    info-banner="Seamlessly convert digital bullion tokens into physical gold with a trusted redemption process."
    title="Token Redemption"
  >
    <TokenRedemptionForm />

    <template #actions>
      <GButton
        class="action-button"
        :icon="false"
        label="Abort"
        size="md"
        type="neutral"
        @click="abortRedemption"
      />
      <GButton
        class="action-button"
        :icon="false"
        label="Request Redemption"
        size="md"
        type="primary"
        @click="submitRedemption"
      />
    </template>

    <TransactionAlertModal
      v-model="isTransactionModalOpen"
      variant="success"
      title="Request Submitted"
      description="Your token redemption request has been submitted. Please wait while the request is processed."
    />
  </UserPageLayout>
</template>

<style scoped>
.action-button {
  width: 200px;
}
</style>
