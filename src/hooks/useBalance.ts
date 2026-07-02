/**
 * @file useBalance.ts
 * @description Composable wrapper around balanceStore.
 * Automatically fetches balance on first use if not yet loaded.
 * @example
 *   const { totalKg, estimateIdrFormatted, activeDenominations, isLoading } = useBalance()
 */
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBalanceStore } from '@/stores/balance'

export function useBalance() {
  const balanceStore = useBalanceStore()
  const {
    totalKg,
    estimateIdr,
    estimateIdrFormatted,
    denominations,
    activeDenominations,
    totalPcs,
    isLoading,
    error,
  } = storeToRefs(balanceStore)

  // Auto-fetch on first mount if data not yet loaded
  onMounted(() => {
    if (!totalKg.value) {
      balanceStore.fetchBalance()
    }
  })

  return {
    totalKg,
    estimateIdr,
    estimateIdrFormatted,
    denominations,
    activeDenominations,
    totalPcs,
    isLoading,
    error,
    refresh: balanceStore.fetchBalance,
  }
}
