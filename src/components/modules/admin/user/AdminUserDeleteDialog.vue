<script setup lang="ts">
import { ref } from 'vue'

import { GButton } from '@/components'
import BaseModal from '@/components/shared/modals/BaseModal.vue'

defineProps<{
  isVisible: boolean
  userName: string
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const isSuccess = ref(false)

function _handleConfirm() {
  isSuccess.value = true
  emit('confirm')
}

function _handleClose() {
  isSuccess.value = false
  emit('close')
}
</script>

<template>
  <BaseModal :model-value="isVisible && !isSuccess" title-id="delete-dialog-title" @update:model-value="_handleClose">
    <div class="dialog-box" role="alertdialog" aria-labelledby="delete-dialog-title">
      <div class="dialog-icon dialog-icon--warning">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 4 2 44h44L24 4Z" fill="#E07E26" opacity="0.15"/>
          <path d="M24 4 2 44h44L24 4Z" stroke="#E07E26" stroke-width="2" stroke-linejoin="round"/>
          <path d="M24 18v12M24 34v2" stroke="#E07E26" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h3 id="delete-dialog-title" class="dialog-title">Perhatian</h3>
      <p class="dialog-text">
        Apakah kamu yakin untuk menghapus akun <strong>{{ userName }}</strong>? Silakan kembali kehalaman sebelumnya.
      </p>
    </div>
    <template #footer>
      <div class="dialog-actions">
        <GButton
          id="admin-user-delete-cancel"
          label="Batal"
          type="secondary"
          size="md"
          class="dialog-btn"
          @click="_handleClose"
        />
        <GButton
          id="admin-user-delete-confirm"
          label="Ya, Lanjutkan"
          type="primary"
          size="md"
          class="dialog-btn"
          @click="_handleConfirm"
        />
      </div>
    </template>
  </BaseModal>

  <BaseModal :model-value="isVisible && isSuccess" @update:model-value="_handleClose">
    <div class="dialog-box" role="alert" aria-labelledby="delete-success-title">
      <div class="dialog-icon dialog-icon--success">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" fill="#00AB4E" opacity="0.15"/>
          <circle cx="24" cy="24" r="22" stroke="#00AB4E" stroke-width="2"/>
          <path d="M14 24l7 7 13-13" stroke="#00AB4E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 id="delete-success-title" class="dialog-title">Berhasil</h3>
      <p class="dialog-text">
        Data user berhasil dihapus. Silakan kembali kehalaman sebelumnya.
      </p>
    </div>
    <template #footer>
      <GButton
        id="admin-user-delete-dismiss"
        label="Mengerti"
        type="primary"
        size="md"
        class="dialog-btn dialog-btn--full"
        @click="_handleClose"
      />
    </template>
  </BaseModal>
</template>

<style scoped>
.dialog-box {
  padding: 40px 28px 28px;
  text-align: center;
}

.dialog-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.dialog-title {
  margin: 0 0 8px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-lambda);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-lambda);
}

.dialog-text {
  margin: 0 0 24px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.dialog-actions {
  display: flex;
  gap: 12px;
}

.dialog-btn {
  flex: 1;
}


.dialog-btn--full {
  width: 100%;
}
</style>
