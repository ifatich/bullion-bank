/**
 * @file balance.ts
 * @description Pinia store for gold balance and denomination data.
 * Shared between Dashboard summary and Transfer page balance card.
 * Denomination images are resolved locally from assets.
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import bullionBankService from '@/services/BullionBankService'
import type { DenominationItem } from '@/types/balance'

// Local denomination image assets
import img1g from '@/assets/img/denominasi=1.svg'
import img5g from '@/assets/img/denominasi=5.svg'
import img10g from '@/assets/img/denominasi=10.svg'
import img20g from '@/assets/img/denominasi=20.svg'
import img25g from '@/assets/img/denominasi=25.svg'
import img50g from '@/assets/img/denominasi=50.svg'
import img100g from '@/assets/img/denominasi=100.svg'
import img250g from '@/assets/img/denominasi=250.svg'
import img500g from '@/assets/img/denominasi=500.svg'
import img1000g from '@/assets/img/denominasi=1000.svg'

/** Map weightGram → local image asset path */
const denominationImageMap: Record<number, string> = {
  1: img1g,
  5: img5g,
  10: img10g,
  20: img20g,
  25: img25g,
  50: img50g,
  100: img100g,
  250: img250g,
  500: img500g,
  1000: img1000g,
}

export interface DenominationDisplay extends DenominationItem {
  /** Total weight formatted as a human-readable string (e.g. '99,000 Gram') */
  totalWeightLabel: string
  /** Resolved local image path */
  image: string
}

export const useBalanceStore = defineStore('balance', () => {
  const totalKg = ref<string>('')
  const estimateIdr = ref<string>('')
  const denominations = ref<DenominationDisplay[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // ── Getters ───────────────────────────────────────────────────────────────

  /** Only denominations with at least 1 piece */
  const activeDenominations = computed(() =>
    denominations.value.filter((d) => d.pcs > 0),
  )

  /** Total number of pieces across all active denominations */
  const totalPcs = computed(() =>
    activeDenominations.value.reduce((acc, d) => acc + d.pcs, 0),
  )

  /** Estimate IDR formatted with thousand separators */
  const estimateIdrFormatted = computed(() => {
    const num = parseInt(estimateIdr.value.replace(/\D/g, ''), 10)
    if (isNaN(num)) return estimateIdr.value
    return num.toLocaleString('id-ID')
  })

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Fetch balance data from API and resolve denomination images locally.
   * Safe to call multiple times — skips if data is already loaded.
   */
  async function fetchBalance() {
    isLoading.value = true
    error.value = null
    try {
      const response = await bullionBankService.getBalance()
      const data = response.data

      totalKg.value = data.totalKg
      estimateIdr.value = data.estimateIdr

      denominations.value = data.denominations.map((d) => ({
        ...d,
        totalWeightLabel: d.totalWeightGram.toLocaleString('id-ID') + ' Gram',
        image: denominationImageMap[d.weightGram] ?? img1g,
      }))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Gagal memuat data saldo.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    totalKg,
    estimateIdr,
    denominations,
    isLoading,
    error,
    activeDenominations,
    totalPcs,
    estimateIdrFormatted,
    fetchBalance,
  }
})
