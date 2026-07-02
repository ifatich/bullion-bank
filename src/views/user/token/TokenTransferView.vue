<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { GButton } from '@/components'
import BalanceSummaryCard from '@/components/modules/user/token/BalanceSummaryCard.vue'
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
    info-banner="Seamlessly move your digital bullion tokens between your business partners."
    title="Token Transfer"
  >
    <div class="transfer-layout">
      <BalanceSummaryCard class="balance-sidebar" />
      <TokenTransferForm class="transfer-form" />
    </div>

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
.transfer-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 24px;
  align-items: start;
}

.action-button {
  width: 200px;
}

@media (max-width: 960px) {
  .transfer-layout {
    grid-template-columns: 1fr;
  }

  .balance-sidebar {
    order: -1;
  }
}
</style>
