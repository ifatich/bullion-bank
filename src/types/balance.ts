/**
 * @file balance.ts
 * @description Type definitions for gold balance and denomination breakdown data.
 * Consumed by balanceStore, useBalance composable, DashboardSummary, BalanceSummaryCard,
 * and GoldBarDetailModal.
 */

/**
 * A single gold bar denomination entry.
 * @example { weightGram: 1000, label: '1 Kilogram', pcs: 99, totalWeightGram: 99000 }
 */
export interface DenominationItem {
  /** Weight of a single bar in grams (e.g. 10, 50, 100, 1000) */
  weightGram: number
  /** Human-readable label (e.g. '10 Gram', '1 Kilogram') */
  label: string
  /** Number of pieces owned */
  pcs: number
  /** Total weight of all pieces in grams */
  totalWeightGram: number
}

/** Overall gold balance summary. */
export interface Balance {
  /** Total balance in kilograms, formatted string (e.g. '100 KG') */
  totalKg: string
  /** Estimated IDR value as a plain number string (e.g. '1234000000') */
  estimateIdr: string
  /** Denomination breakdown — all sizes, including pcs=0 */
  denominations: DenominationItem[]
}

/** API response shape from GET /balance */
export interface BalanceResponse {
  data: Balance
}
