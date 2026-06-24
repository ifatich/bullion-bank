<script setup lang="ts">
import { GButton } from '@/components'
import BaseModal from '@/components/shared/modals/BaseModal.vue'

export type UserDetail = {
  fullName: string
  email: string
  birthPlace: string
  birthDate: string
  phone: string
  nationality: string
  occupation: string
  identityType: string
  identityNumber: string
  identityBukti: string
  fullAddress: string
  domicileAddress: string
}

defineProps<{
  isVisible: boolean
  detail: UserDetail
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <BaseModal
    :model-value="isVisible"
    width="852px"
    title-id="user-detail-title"
    @update:model-value="$emit('close')"
  >
    <template #header>
      <div class="modal-header">
        <h3 id="user-detail-title" class="modal-title">User Detail</h3>
        <button
          id="admin-user-detail-close"
          class="modal-close"
          aria-label="Close modal"
          @click="$emit('close')"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </template>

    <div class="modal-body">
      <section class="section" aria-labelledby="user-info-title">
        <h4 id="user-info-title" class="section-title">User Information</h4>
        <div class="field-columns">
          <div class="field-column">
            <div class="field">
              <span class="field-label">Nama Lengkap</span>
              <span class="field-value">: {{ detail.fullName }}</span>
            </div>
            <div class="field">
              <span class="field-label">Alamat Email</span>
              <span class="field-value">: {{ detail.email }}</span>
            </div>
            <div class="field">
              <span class="field-label">Kewarganegaraan</span>
              <span class="field-value">: {{ detail.nationality }}</span>
            </div>
            <div class="field">
              <span class="field-label">Pekerjaan Utama</span>
              <span class="field-value">: {{ detail.occupation }}</span>
            </div>
          </div>

          <div class="field-column">
            <div class="field">
              <span class="field-label">Tempat Lahir</span>
              <span class="field-value">: {{ detail.birthPlace }}</span>
            </div>
            <div class="field">
              <span class="field-label">Tanggal Lahir</span>
              <span class="field-value">: {{ detail.birthDate }}</span>
            </div>
            <div class="field">
              <span class="field-label">Nomor Telephone</span>
              <span class="field-value">: {{ detail.phone }}</span>
            </div>
          </div>
        </div>
      </section>

      <div class="section-divider" />

      <section class="section" aria-labelledby="identity-title">
        <h4 id="identity-title" class="section-title">Identity Type</h4>
        <div class="field-columns">
          <div class="field-column">
            <div class="field">
              <span class="field-label">Jenis Identitas</span>
              <span class="field-value">: {{ detail.identityType }}</span>
            </div>
            <div class="field field--multiline">
              <span class="field-label">Alamat Lengkap</span>
              <span class="field-value">: {{ detail.fullAddress }}</span>
            </div>
          </div>

          <div class="field-column">
            <div class="field">
              <span class="field-label">Bukti Identitas</span>
              <span class="field-value">: {{ detail.identityBukti }}</span>
            </div>
            <div class="field field--multiline">
              <span class="field-label">Alamat Domisili</span>
              <span class="field-value">: {{ detail.domicileAddress }}</span>
            </div>
          </div>
        </div>
      </section>

      <div class="section-divider" />

      <section class="section" aria-labelledby="document-title">
        <div class="document-row">
          <span class="field-label document-label">Foto Dokumentasi</span>
          <div class="document-list">
            <div class="document-photo" />
            <div class="document-photo" />
          </div>
        </div>
      </section>
    </div>

    <template #footer>
      <div class="modal-footer">
        <GButton
          id="admin-user-detail-close-btn"
          label="Close"
          type="secondary"
          size="lg"
          class="footer-button"
          @click="$emit('close')"
        />
      </div>
    </template>
  </BaseModal>
</template>

<style scoped>
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 0;
}

.modal-title {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-lambda);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-lambda);
}

.modal-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--g-kit-black-60);
  cursor: pointer;
  transition: background 0.15s ease;
}

.modal-close:hover {
  background: var(--g-kit-black-10);
}

.modal-divider,
.section-divider {
  width: 100%;
  height: 1px;
  background: var(--g-kit-black-20);
}

.modal-divider {
  margin-top: 16px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
}

.field-columns {
  display: flex;
  gap: 24px;
  width: 100%;
}

.field-column {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.field {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  line-height: var(--g-kit-line-height-omicron);
}

.field-label {
  flex: 0 0 165px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
}

.field-value {
  flex: 1;
  min-width: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
  word-break: break-all;
}

.document-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.document-label {
  padding-top: 0;
}

.document-list {
  display: flex;
  flex: 1;
  gap: 16px;
  min-height: 120px;
}

.document-photo {
  flex: 0 0 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0) 45%),
    var(--g-kit-black-20);
}

.modal-footer {
}

.footer-button {
  width: 100%;
}

.footer-button :deep(button),
.footer-button :deep(.btn) {
  width: 100%;
  border-color: var(--g-kit-black-40);
  color: var(--g-kit-black-60);
}

@media (max-width: 760px) {
  .field-columns,
  .document-row,
  .document-list {
    flex-direction: column;
  }

  .field-label {
    flex-basis: 140px;
  }

  .document-photo {
    width: 100%;
    flex-basis: 120px;
  }
}
</style>
