<script setup lang="ts">
import { computed, ref } from 'vue'

import { GButton } from '@/components'
import { useAppAlert } from '@/hooks/useAppAlert'

import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const authStore = useAuthStore()
const qrAddress = computed(() => authStore.walletAddress || 'bbc1qxy2kgdygjrs3p83kkfjhx0wlhbc1qxy2kgdygjrs3p83kkfjhx0wlh')
const isCopied = ref(false)
const { showAlert } = useAppAlert()

const qrCodeUrl = computed(() => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=216x216&data=${encodeURIComponent(qrAddress.value)}`
})

const closeModal = () => {
  isOpen.value = false
}

const copyAddress = async () => {
  if (!navigator.clipboard?.writeText) {
    window.prompt('Copy address', qrAddress.value)
    showAlert({
      label: `Clipboard browser tidak tersedia. Salin QR address ${qrAddress.value} secara manual.`,
      variant: 'warning',
      timeout: 5000,
    })
    return
  }

  try {
    await navigator.clipboard.writeText(qrAddress.value)
    isCopied.value = true
    showAlert({
      label: `QR address ${qrAddress.value} berhasil disalin.`,
      variant: 'success',
      timeout: 4000,
    })
    window.setTimeout(() => {
      isCopied.value = false
    }, 1400)
  } catch {
    showAlert({
      label: `QR address ${qrAddress.value} gagal disalin.`,
      variant: 'danger',
      timeout: 4000,
    })
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="qr-modal-backdrop" role="presentation" @click.self="closeModal">
        <section class="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-modal-title">
          <header class="qr-modal-header">
            <h2 id="qr-modal-title">Scan QR Code</h2>
            <button class="close-button" type="button" aria-label="Close modal" @click="closeModal">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </header>

          <div class="modal-divider" aria-hidden="true" />

          <div class="qr-modal-content">
            <div class="qr-code" aria-label="QR code">
              <img :src="qrCodeUrl" alt="QR Code" style="width: 100%; height: 100%; border-radius: 4px;" />
            </div>

            <p class="qr-address" :title="qrAddress">{{ qrAddress }}</p>
          </div>

          <footer class="qr-modal-footer">
            <GButton
              class="modal-action"
              :icon="false"
              label="Close"
              size="md"
              type="neutral"
              @click="closeModal"
            />
            <GButton
              class="modal-action"
              :icon="false"
              :label="isCopied ? 'Copied' : 'Copy Address'"
              size="md"
              type="neutral"
              @click="copyAddress"
            />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.qr-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgb(0 0 0 / 40%);
}

.qr-modal {
  width: min(564px, calc(100vw - 32px));
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  padding-top: 16px;
  border-radius: 12px;
  background: var(--g-kit-white);
}

.qr-modal-header {
  display: flex;
  align-items: center;
  gap: 96px;
  width: 100%;
  padding: 0 16px;
}

h2 {
  flex: 1 1 0;
  min-width: 0;
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-lambda, 18px);
  font-weight: var(--g-kit-font-weight-extrabold, 800);
  line-height: var(--g-kit-line-height-lambda, 26px);
}

.close-button {
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

.close-button svg {
  width: 24px;
  height: 24px;
}

.modal-divider {
  width: 100%;
  height: 1px;
  background: var(--g-kit-black-20);
}

.qr-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  padding: 0 16px;
}

.qr-code {
  width: 216px;
  height: 216px;
}

.qr-code svg {
  width: 100%;
  height: 100%;
  display: block;
}

.qr-address {
  max-width: 400px;
  overflow: hidden;
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-semibold, 600);
  line-height: var(--g-kit-line-height-kappa);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.qr-modal-footer {
  width: 100%;
  display: flex;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background: var(--g-kit-white);
  box-shadow:
    0 2px 3px rgb(0 0 0 / 14%),
    0 0 1px rgb(0 0 0 / 8%);
}

.modal-action {
  flex: 1 1 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.16s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 760px) {
  .qr-modal-backdrop {
    align-items: flex-end;
    justify-content: stretch;
    padding: 0;
  }

  .qr-modal {
    width: 100%;
    max-height: calc(100svh - 48px);
    overflow-y: auto;
    border-radius: 16px 16px 0 0;
    padding-top: 12px;
  }

  .qr-modal::before {
    content: '';
    width: 48px;
    height: 4px;
    display: block;
    flex: 0 0 auto;
    align-self: center;
    border-radius: 999px;
    background: var(--g-kit-black-20);
  }

  .qr-modal-header {
    gap: 24px;
  }

  .qr-modal-footer {
    flex-direction: column-reverse;
  }

  .qr-address {
    max-width: calc(100vw - 64px);
  }

  .modal-fade-enter-active .qr-modal,
  .modal-fade-leave-active .qr-modal {
    transition: transform 0.2s ease;
  }

  .modal-fade-enter-from .qr-modal,
  .modal-fade-leave-to .qr-modal {
    transform: translateY(100%);
  }
}
</style>
