<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/components/shared/modals/BaseModal.vue'
import { GButton } from '@/components'
import DateRangePopupPicker from './DateRangePopupPicker.vue'

export type ExportDateRange = {
  fromDate: string
  toDate: string
}

interface Props {
  isVisible: boolean
  errorText?: string
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
  confirm: [dateRange: ExportDateRange]
}>()

const fromDate = ref('')
const toDate = ref('')
const dateRangeError = ref('')

const handleConfirm = () => {
  if (!fromDate.value || !toDate.value) {
    dateRangeError.value = 'Silakan pilih tanggal mulai dan tanggal akhir terlebih dahulu'
    return
  }

  dateRangeError.value = ''
  emit('confirm', {
    fromDate: fromDate.value,
    toDate: toDate.value,
  })

  fromDate.value = ''
  toDate.value = ''
}

const handleClose = () => {
  fromDate.value = ''
  toDate.value = ''
  dateRangeError.value = ''
  emit('close')
}
</script>

<template>
  <BaseModal
    :model-value="isVisible"
    width="520px"
    title-id="export-date-range-title"
    @update:model-value="handleClose"
  >
    <template #header>
      <header class="export-modal-header">
        <div>
          <h2 id="export-date-range-title">Select Export Date Range</h2>
        </div>
        <button
          class="export-close-button"
          type="button"
          aria-label="Close date range selection"
          @click="handleClose"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.35469 6.35451C6.79903 5.91031 7.50273 5.88367 7.97773 6.27541L8.06465 6.35451L12.5002 10.7901L16.9357 6.35451L17.0217 6.27541C17.4967 5.88332 18.2013 5.91006 18.6457 6.35451C19.1179 6.82677 19.1179 7.59222 18.6457 8.06447L14.2102 12.5L18.6457 16.9356C19.1179 17.4078 19.1178 18.1732 18.6457 18.6455C18.2012 19.09 17.4967 19.1168 17.0217 18.7246L16.9357 18.6455L12.5002 14.21L8.06465 18.6455L7.97773 18.7246C7.50269 19.1165 6.79905 19.0898 6.35469 18.6455C5.88242 18.1733 5.88242 17.4078 6.35469 16.9356L10.7902 12.5L6.35469 8.06447C5.88242 7.59221 5.88242 6.82677 6.35469 6.35451Z" fill="#58585B"/>
          </svg>
        </button>
      </header>
    </template>

    <div class="export-modal-content">
      <DateRangePopupPicker
        v-model:start-date="fromDate"
        v-model:end-date="toDate"
        first-label="Tanggal Mulai"
        second-label="Tanggal Akhir"
        first-placeholder="DD / MM / YYYY"
        second-placeholder="DD / MM / YYYY"
        class="p-3"
      />

      <p v-if="dateRangeError || errorText" class="export-date-error px-3 pb-3">{{ dateRangeError || errorText }}</p>

      <div class="export-modal-actions">
        <GButton
          label="Cancel"
          type="neutral"
          size="md"
          @click="handleClose"
        />
        <GButton
          label="Export"
          type="primary"
          size="md"
          @click="handleConfirm"
        />
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.export-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding-bottom: 16px;
}

.export-modal-header h2 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-lambda, 18px);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-lambda, 26px);
}

.export-modal-header p {
  margin-top: 4px;
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.export-close-button {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--g-kit-black-80);
  cursor: pointer;
}

.export-close-button svg {
  width: 24px;
  height: 24px;
}

.export-modal-content {
  display: flex;
  flex-direction: column;
}

.export-date-error {
  margin: 0;
  color: var(--g-kit-red-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.export-modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  border-top: 1px solid var(--g-kit-black-20);
  padding: 16px;
}

@media (max-width: 520px) {
  .export-modal-actions {
    flex-direction: column-reverse;
  }
}
</style>
