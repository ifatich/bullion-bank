import type { AxiosRequestConfig } from 'axios'

export const BullionBankBaseUrl = import.meta.env.VITE_API_BULLION_BANK_URL

// ── Auth ────────────────────────────────────────────────────────────────────

function login(request: TParamsLogin): AxiosRequestConfig {
  return {
    baseURL: BullionBankBaseUrl,
    data: request,
    method: 'POST',
    url: '/auth/login',
  }
}

/** GET /auth/me — fetch authenticated user's full profile */
function getProfile(): AxiosRequestConfig {
  return {
    baseURL: BullionBankBaseUrl,
    method: 'GET',
    url: '/auth/me',
  }
}

// ── Balance ──────────────────────────────────────────────────────────────────

/** GET /balance — fetch total balance, estimate IDR, and denomination breakdown */
function getBalance(): AxiosRequestConfig {
  return {
    baseURL: BullionBankBaseUrl,
    method: 'GET',
    url: '/balance',
  }
}

// ── Transactions ─────────────────────────────────────────────────────────────

/** GET /transactions — fetch paginated transaction list */
function getTransactions(params?: TParamsGetTransactions): AxiosRequestConfig {
  return {
    baseURL: BullionBankBaseUrl,
    method: 'GET',
    url: '/transactions',
    params,
  }
}

/** GET /transactions/report — fetch report metadata (balances, company info) */
function getTransactionReport(params?: TParamsDateRange): AxiosRequestConfig {
  return {
    baseURL: BullionBankBaseUrl,
    method: 'GET',
    url: '/transactions/report',
    params,
  }
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface TParamsLogin {
  username: string
  password: string
}

export interface TParamsDateRange {
  fromDate?: string
  toDate?: string
}

export interface TParamsGetTransactions extends TParamsDateRange {
  page?: number
  limit?: number
  search?: string
}

export default {
  login,
  getProfile,
  getBalance,
  getTransactions,
  getTransactionReport,
}
