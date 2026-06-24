<script setup lang="ts">
import { reactive, watch } from 'vue'

import { GButton, GDatePicker, GDropdown, GFilePicker, GInputText, GTextArea } from '@/components'
import BaseModal from '@/components/shared/modals/BaseModal.vue'

export type EditAdmin = {
  fullName: string
  email: string
  birthPlace: string
  birthDate: string
  phoneNumber: string
  nationality: string
  occupation: string
  identityType: string
  identityFile: string
  fullAddress: string
  domicileAddress: string
}

const nationalityOptions = [
  { label: 'Warga Negara Indonesia', value: 'WNI' },
  { label: 'Warga Negara Asing', value: 'WNA' },
]

const identityOptions = [
  { label: 'KTP', value: 'ktp' },
  { label: 'Paspor', value: 'passport' },
  { label: 'KITAS', value: 'kitas' },
]

const props = defineProps<{
  isVisible: boolean
  detail: EditAdmin
}>()

const emit = defineEmits<{
  close: []
  save: [detail: EditAdmin]
}>()

const form = reactive<EditAdmin>({
  fullName: '',
  email: '',
  birthPlace: '',
  birthDate: '',
  phoneNumber: '',
  nationality: '',
  occupation: '',
  identityType: '',
  identityFile: '',
  fullAddress: '',
  domicileAddress: '',
})

watch(
  () => props.detail,
  (val) => {
    if (val) {
      Object.assign(form, val)
    }
  },
  { immediate: true },
)

function handleClose() {
  emit('close')
}

function handleSave() {
  emit('save', { ...form })
}
</script>

<template>
  <BaseModal
    :model-value="isVisible"
    width="852px"
    title-id="edit-admin-title"
    @update:model-value="handleClose"
  >
    <template #header>
      <header class="modal-header">
        <h3 id="edit-admin-title" class="modal-title">Edit Admin</h3>
        <button
          id="edit-admin-close"
          class="modal-close"
          aria-label="Close modal"
          @click="handleClose"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </header>
    </template>

    <form class="modal-body" @submit.prevent="handleSave">
      <div class="field-columns">
        <div class="field-column">
          <GInputText
            id="edit-admin-full-name"
            name="fullName"
            v-model="form.fullName"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            autocomplete="name"
          />
          <GInputText
            id="edit-admin-phone"
            name="phoneNumber"
            v-model="form.phoneNumber"
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon"
            autocomplete="tel"
            type="number"
          />
          <GInputText
            id="edit-admin-birth-place"
            name="birthPlace"
            v-model="form.birthPlace"
            label="Tempat Lahir"
            placeholder="Masukkan tempat lahir"
            autocomplete="address-level2"
          />
          <GDropdown
            id="edit-admin-nationality"
            name="nationality"
            v-model="form.nationality"
            label="Kewarganegaraan"
            placeholder="Pilih kewarganegaraan"
            :items="nationalityOptions"
            item-value="value"
            item-text="label"
          />
          <GDropdown
            id="edit-admin-identity-type"
            name="identityType"
            v-model="form.identityType"
            label="Jenis Identitas"
            placeholder="Pilih jenis identitas"
            :items="identityOptions"
            item-value="value"
            item-text="label"
          />
          <GTextArea
            id="edit-admin-full-address"
            name="fullAddress"
            v-model="form.fullAddress"
            label="Alamat Lengkap"
            placeholder="Masukkan alamat lengkap"
            autocomplete="street-address"
          />
        </div>

        <div class="field-column">
          <GInputText
            id="edit-admin-email"
            name="email"
            v-model="form.email"
            label="Alamat Email"
            placeholder="Masukkan alamat email"
            autocomplete="email"
            autocapitalize="none"
            spellcheck="false"
          />
          <GInputText
            id="edit-admin-occupation"
            name="occupation"
            v-model="form.occupation"
            label="Pekerjaan Utama"
            placeholder="Masukkan pekerjaan utama"
            autocomplete="organization-title"
          />
          <GDatePicker
            id="edit-admin-birth-date"
            name="birthDate"
            v-model="form.birthDate"
            title="Tanggal Lahir"
            placeholder="Pilih tanggal lahir"
            autocomplete="off"
          />
          <div class="upload-field">
            <label for="edit-admin-identity-file">Bukti Identitas</label>
            <GFilePicker
              unique-key="edit-admin-identity"
              image-only
              error-text="Ukuran file Image maksimal 10 MB"
            />
            <p v-if="form.identityFile" class="file-name">{{ form.identityFile }}</p>
          </div>
          <GTextArea
            id="edit-admin-domicile-address"
            name="domicileAddress"
            v-model="form.domicileAddress"
            label="Alamat Domisili"
            placeholder="Masukkan alamat domisili"
            autocomplete="street-address"
          />
        </div>
      </div>
    </form>

    <template #footer>
      <div class="footer-buttons">
        <GButton
          id="edit-admin-cancel"
          label="Batal"
          type="secondary"
          size="md"
          class="footer-btn"
          @click="handleClose"
        />
        <GButton
          id="edit-admin-save"
          label="Simpan"
          type="primary"
          size="md"
          class="footer-btn"
          @click="handleSave"
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

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 24px;
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
  gap: 16px;
  min-width: 0;
}

.upload-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.upload-field label {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
}

.file-name {
  margin: 0;
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omega);
}

.footer-buttons {
  display: flex;
  gap: 12px;
}

.footer-btn {
  flex: 1;
}

@media (max-width: 760px) {
  .field-columns {
    flex-direction: column;
  }

  .footer-buttons {
    flex-direction: column;
  }
}
</style>
