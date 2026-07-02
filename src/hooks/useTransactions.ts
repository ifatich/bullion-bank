/**
 * @file useTransactions.ts
 * @description Composable for fetching and filtering transaction history.
 * Supports pagination, date range filter, and search query.
 * Falls back to mock data if API_URL is not configured.
 * @example
 *   const { rows, reportMetadata, isLoading, fetchTransactions } = useTransactions()
 */
import { ref } from 'vue'
import bullionBankService from '@/services/BullionBankService'
import type { TransactionHistoryRow, CustodyReportMetadata } from '@/types/transaction'
import type { TParamsGetTransactions, TParamsDateRange } from '@/services/api'

export function useTransactions() {
  const rows = ref<TransactionHistoryRow[]>([])
  const reportMetadata = ref<CustodyReportMetadata | null>(null)
  const isLoading = ref(false)
  const isReportLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch transaction list with optional filters.
   * @param params - page, limit, search, fromDate, toDate
   */
  async function fetchTransactions(params?: TParamsGetTransactions) {
    isLoading.value = true
    error.value = null
    try {
      const response = await bullionBankService.getTransactions(params)
      rows.value = response.transactions
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Gagal memuat data transaksi.'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch report metadata (company info, balances) for a given date range.
   * Used for custody report PDF generation.
   * @param params - fromDate, toDate
   */
  async function fetchReportMetadata(params?: TParamsDateRange) {
    isReportLoading.value = true
    error.value = null
    try {
      const response = await bullionBankService.getTransactionReport(params)
      reportMetadata.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Gagal memuat metadata laporan.'
    } finally {
      isReportLoading.value = false
    }
  }

  return {
    rows,
    reportMetadata,
    isLoading,
    isReportLoading,
    error,
    fetchTransactions,
    fetchReportMetadata,
  }
}
