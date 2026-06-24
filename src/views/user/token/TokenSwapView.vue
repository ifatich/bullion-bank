<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { GButton } from '@/components'
import TokenSwapForm from '@/components/modules/user/token/TokenSwapForm.vue'
import UserPageLayout from '@/components/shared/layouts/UserPageLayout.vue'
import TransactionAlertModal from '@/components/shared/modals/TransactionAlertModal.vue'
import { useAppAlert } from '@/hooks/useAppAlert'

const breadcrumbItems = [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Token Swap' }]

const router = useRouter()
const { showAlert } = useAppAlert()
const isTransactionModalOpen = ref(false)

const abortSwap = () => {
  showAlert({
    label: 'Token swap dibatalkan.',
    variant: 'info',
  })
  router.push('/dashboard')
}

const submitSwap = () => {
  isTransactionModalOpen.value = true
}
</script>

<template>
  <UserPageLayout
    :breadcrumb="breadcrumbItems"
    nav-back-label="Dashboard"
    nav-back-to="/dashboard"
    info-banner="Instantly exchange bullion-backed tokens with secure, fast and transparent transactions."
    title="Token Swap"
  >
    <TokenSwapForm />

    <template #actions>
      <GButton
        class="action-button"
        :icon="false"
        label="Abort"
        size="md"
        type="neutral"
        @click="abortSwap"
      />
      <GButton
        class="action-button"
        :icon="false"
        label="Swap Token"
        size="md"
        type="primary"
        @click="submitSwap"
      />
    </template>

    <TransactionAlertModal
      v-model="isTransactionModalOpen"
      variant="success"
      title="Swap Successful"
      description="Your tokens have been successfully swapped. The updated balance is now reflected in your account."
    />
  </UserPageLayout>
</template>

<style scoped>
.action-button {
  width: 200px;
}
</style>
