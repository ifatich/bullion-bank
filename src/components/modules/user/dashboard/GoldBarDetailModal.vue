<script setup lang="ts">
import { computed } from 'vue'
import { GButton } from '@/components'
import { useBalanceStore } from '@/stores/balance'

const props = defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits<{
  'close': []
}>()

const isOpen = computed({
  get: () => props.isVisible,
  set: (value) => {
    if (!value) {
      emit('close')
    }
  },
})

const closeModal = () => {
  emit('close')
}

const balanceStore = useBalanceStore()
const activeDenominations = computed(() => balanceStore.activeDenominations)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="gold-modal-backdrop" role="presentation" @click.self="closeModal">
        <section class="gold-modal" role="dialog" aria-modal="true" aria-labelledby="gold-modal-title">
          <header class="gold-modal-header">
            <div class="header-text">
              <h2 id="gold-modal-title">Detail Pecahan Emas (Gold Bar)</h2>
              <p class="subtitle">Rincian denominasi emas batangan yang disimpan di dalam brankas.</p>
            </div>
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

          <div class="gold-modal-content">
            <div class="table-container">
              <table class="denomination-table">
                <thead>
                  <tr>
                    <th scope="col">Denominasi</th>
                    <th scope="col" class="text-right">Jumlah (Pcs)</th>
                    <th scope="col" class="text-right">Total Berat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in activeDenominations" :key="item.label">
                    <td>
                      <div class="gold-badge">
                        <img :src="item.image" :alt="item.label" class="gold-image" />
                        <span>{{ item.label }}</span>
                      </div>
                    </td>
                    <td class="text-right font-bold">{{ item.pcs }}</td>
                    <td class="text-right font-semibold text-primary">{{ item.totalWeightLabel }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td>Total Balance</td>
                    <td class="text-right">{{ balanceStore.totalPcs }} Pcs</td>
                    <td class="text-right font-bold text-primary">{{ balanceStore.totalKg }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <footer class="gold-modal-footer">
            <GButton
              class="modal-action"
              :icon="false"
              label="Tutup"
              size="md"
              type="neutral"
              @click="closeModal"
            />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.gold-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgb(0 0 0 / 40%);
}

.gold-modal {
  width: min(564px, calc(100vw - 32px));
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  padding-top: 16px;
  border-radius: 12px;
  background: var(--g-kit-white);
}

.gold-modal-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 0 16px;
}

.header-text {
  flex: 1 1 0;
  min-width: 0;
}

h2 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-lambda, 18px);
  font-weight: var(--g-kit-font-weight-extrabold, 800);
  line-height: var(--g-kit-line-height-lambda, 26px);
}

.subtitle {
  margin: 4px 0 0;
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-omega, 13px);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: 1.4;
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

.gold-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0 16px;
}

.table-container {
  border: 1px solid var(--g-kit-black-20);
  border-radius: 8px;
  overflow: hidden;
  background: var(--g-kit-white);
}

.denomination-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: var(--g-kit-font-size-sigma, 14px);
}

.denomination-table th,
.denomination-table td {
  padding: 12px 16px;
  color: var(--g-kit-black-80);
}

.denomination-table th {
  background: var(--g-kit-black-10);
  font-weight: var(--g-kit-font-weight-bold);
  color: var(--g-kit-black-60);
  border-bottom: 1px solid var(--g-kit-black-20);
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;
}

.denomination-table tbody tr {
  border-bottom: 1px solid var(--g-kit-black-15, #f0f0f2);
}

.denomination-table tbody tr:hover {
  background: #f8faf6;
}

.text-right {
  text-align: right;
}

.font-bold {
  font-weight: var(--g-kit-font-weight-bold);
}

.font-semibold {
  font-weight: var(--g-kit-font-weight-semibold, 600);
}

.text-primary {
  color: var(--g-kit-lime-50);
}

.gold-badge {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gold-image {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.total-row {
  background: #f4faf0;
  font-weight: var(--g-kit-font-weight-bold);
  border-top: 2px solid var(--g-kit-lime-20, #d5eed1);
}

.total-row td {
  color: var(--g-kit-black-80);
  padding: 14px 16px;
}

.gold-modal-footer {
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
  .gold-modal-backdrop {
    align-items: flex-end;
    justify-content: stretch;
    padding: 0;
  }

  .gold-modal {
    width: 100%;
    max-height: calc(100svh - 48px);
    overflow-y: auto;
    border-radius: 16px 16px 0 0;
    padding-top: 12px;
  }

  .gold-modal::before {
    content: '';
    width: 48px;
    height: 4px;
    display: block;
    flex: 0 0 auto;
    align-self: center;
    border-radius: 999px;
    background: var(--g-kit-black-20);
  }

  .gold-modal-header {
    gap: 24px;
  }

  .modal-fade-enter-active .gold-modal,
  .modal-fade-leave-active .gold-modal {
    transition: transform 0.2s ease;
  }

  .modal-fade-enter-from .gold-modal,
  .modal-fade-leave-to .gold-modal {
    transform: translateY(100%);
  }
}
</style>
