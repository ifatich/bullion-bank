<script setup lang="ts">
import { reactive } from 'vue'

import { GButton, GDatePicker, GDropdown, GFilePicker, GInputText, GTextArea } from '@/components'
import BaseModal from '@/components/shared/modals/BaseModal.vue'

export interface AddAdminForm {
  fullName: string
  birthPlace: string
  nationality: string
  email: string
  birthDate: string
  identityType: string
  identityFile: File | null
  fullAddress: string
  domicileAddress: string
  phoneNumber: string
  occupation: string
}

defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits<{
  close: []
  save: [form: AddAdminForm]
}>()

const form = reactive<AddAdminForm>({
  fullName: '',
  birthPlace: '',
  nationality: '',
  email: '',
  birthDate: '',
  identityType: '',
  identityFile: null,
  fullAddress: '',
  domicileAddress: '',
  phoneNumber: '',
  occupation: '',
})

const nationalityOptions = [
  { label: 'Warga Negara Indonesia', value: 'WNI' },
  { label: 'Warga Negara Asing', value: 'WNA' },
]

const identityOptions = [
  { label: 'KTP', value: 'ktp' },
  { label: 'Paspor', value: 'passport' },
  { label: 'KITAS', value: 'kitas' },
]

function handleIdentityFile(file: File) {
  form.identityFile = file
}

function removeIdentityFile() {
  form.identityFile = null
}

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
    title-id="add-admin-title"
    @update:model-value="handleClose"
  >
    <template #header>
      <header class="modal-header">
        <h3 id="add-admin-title" class="modal-title">Add New Admin</h3>
        <button
          id="add-admin-close"
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
            id="add-admin-full-name"
            name="fullName"
            v-model="form.fullName"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            autocomplete="name"
          />
          <GInputText
            id="add-admin-phone"
            name="phoneNumber"
            v-model="form.phoneNumber"
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon"
            autocomplete="tel"
            type="number"
          />
          <GInputText
            id="add-admin-birth-place"
            name="birthPlace"
            v-model="form.birthPlace"
            label="Tempat Lahir"
            placeholder="Masukkan tempat lahir"
            autocomplete="address-level2"
          />
          <GDropdown
            id="add-admin-nationality"
            name="nationality"
            v-model="form.nationality"
            label="Kewarganegaraan"
            placeholder="Pilih kewarganegaraan"
            :items="nationalityOptions"
            item-value="value"
            item-text="label"
          />
          <GDropdown
            id="add-admin-identity-type"
            name="identityType"
            v-model="form.identityType"
            label="Jenis Identitas"
            placeholder="Pilih jenis identitas"
            :items="identityOptions"
            item-value="value"
            item-text="label"
          />
          <GTextArea
            id="add-admin-full-address"
            name="fullAddress"
            v-model="form.fullAddress"
            label="Alamat Lengkap"
            placeholder="Masukkan alamat lengkap"
            autocomplete="street-address"
          />
        </div>

        <div class="field-column">
          <GInputText
            id="add-admin-email"
            name="email"
            v-model="form.email"
            label="Alamat Email"
            placeholder="Masukkan alamat email"
            autocomplete="email"
            autocapitalize="none"
            spellcheck="false"
          />
          <GInputText
            id="add-admin-occupation"
            name="occupation"
            v-model="form.occupation"
            label="Pekerjaan Utama"
            placeholder="Masukkan pekerjaan utama"
            autocomplete="organization-title"
          />
          <GDatePicker
            id="add-admin-birth-date"
            name="birthDate"
            v-model="form.birthDate"
            title="Tanggal Lahir"
            placeholder="Pilih tanggal lahir"
            autocomplete="off"
          />
          <div class="upload-field">
            <label for="add-admin-identity-file">Bukti Identitas</label>
            <GFilePicker
              unique-key="add-admin-identity"
              :file="form.identityFile"
              :image-only="true"
              error-text="Ukuran file Image maksimal 10 MB"
              @file-dropped="handleIdentityFile"
              @file-removed="removeIdentityFile"
            />
          </div>
          <GTextArea
            id="add-admin-domicile-address"
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
      <div class="modal-footer">
        <GButton
          id="add-admin-save"
          label="Simpan"
          type="primary"
          size="md"
          class="save-button"
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
  padding: 0 24px;
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

.modal-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.save-button {
  width: 100%;
}

@media (max-width: 760px) {
  .field-columns {
    flex-direction: column;
  }
}
</style>
