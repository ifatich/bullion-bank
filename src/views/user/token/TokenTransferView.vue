<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { GButton } from '@/components'
import TokenTransferForm from '@/components/modules/user/token/TokenTransferForm.vue'
import UserPageLayout from '@/components/shared/layouts/UserPageLayout.vue'
import TransactionAlertModal from '@/components/shared/modals/TransactionAlertModal.vue'
import { useAppAlert } from '@/hooks/useAppAlert'

const breadcrumbItems = [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Token Transfer' }]

const router = useRouter()
const { showAlert } = useAppAlert()
const isTransactionModalOpen = ref(false)

const abortTransfer = () => {
  showAlert({
    label: 'Token transfer dibatalkan.',
    variant: 'info',
  })
  router.push('/dashboard')
}

const submitTransfer = () => {
  isTransactionModalOpen.value = true
}
</script>

<template>
  <UserPageLayout
    :breadcrumb="breadcrumbItems"
    nav-back-label="Dashboard"
    nav-back-to="/dashboard"
    info-banner="Seamlessly convert digital bullion tokens into physical gold with a trusted redemption process."
    title="Token Transfer"
  >
    <TokenTransferForm />

    <template #actions>
      <GButton
        class="action-button"
        :icon="false"
        label="Abort"
        size="md"
        type="neutral"
        @click="abortTransfer"
      />
      <GButton
        class="action-button"
        :icon="false"
        label="Request Transfer"
        size="md"
        type="primary"
        @click="submitTransfer"
      />
    </template>

    <TransactionAlertModal
      v-model="isTransactionModalOpen"
      variant="success"
      title="Transfer Successful"
      description="Your tokens have been successfully transferred. The updated balance is now reflected in your account."
    />
  </UserPageLayout>
</template>

<style scoped>
.action-button {
  width: 200px;
}
</style>
