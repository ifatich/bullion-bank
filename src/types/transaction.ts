export type TransactionStatus = 'Success' | 'Pending' | 'Failed'

export type TransactionHistoryRow = {
  id: number
  no: string
  transactionHash: string
  referenceNumber: string
  transactionType: string
  status: TransactionStatus
  fromCompany: string
  fromWallet: string
  fromAddress: string
  toCompany: string
  toWallet: string
  toAddress: string
  date: string
  confirmedAt: string
  asset: string
  network: string
  amount: string
  fee: string
  netAmount: string
  fiatValue: string
  blockNumber: string
  confirmations: string
}

export type CustodyReportMetadata = {
  title: string
  companyName: string
  companyId: string
  custodyAccountId: string
  walletId: string
  reportPeriod: string
  openingBalance: string
  totalDebit: string
  totalCredit: string
  closingBalance: string
  lastUpdated: string
}

export type TransactionHistoryResponse = {
  report: CustodyReportMetadata
  transactions: TransactionHistoryRow[]
}
