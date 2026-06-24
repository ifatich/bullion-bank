<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { GTablePagination, GButton } from '@/components'
import StatusBadge from '@/components/shared/status-badge/StatusBadge.vue'
import TableRowControl from '@/components/shared/table/TableRowControl.vue'
import TableHeader from '@/components/shared/table/TableHeader.vue'
import TableFooter from '@/components/shared/table/TableFooter.vue'
import TransactionDetailModal from '@/components/modules/user/transaction-history/TransactionDetailModal.vue'
import { useAppAlert } from '@/hooks/useAppAlert'
import type { TransactionHistoryResponse } from '@/types/transaction'
import transactionHistoryMock from '@/utils/data/transaction-history.mock.json'
import { generatePdfEStatement } from '@/utils/generate-pdf-statement.util'

const transactionHistoryData = transactionHistoryMock as TransactionHistoryResponse
const reportMetadata = transactionHistoryData.report
const rowLimit = ref(5)
const currentPage = ref(1)
const searchQuery = ref('')
const lastUpdated = ref(reportMetadata.lastUpdated)
const selectedTransaction = ref<TransactionHistoryRow | null>(null)
const isTransactionDetailVisible = ref(false)
const { showAlert } = useAppAlert()

type TransactionHistoryRow = {
  id: number
  no: string
  transactionHash: string
  transactionType: string
  status: 'Success' | 'Pending' | 'Failed'
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
  referenceNumber: string
}

type BaseTransactionRow = Pick<
  TransactionHistoryRow,
  | 'id'
  | 'no'
  | 'transactionHash'
  | 'fromCompany'
  | 'fromWallet'
  | 'toCompany'
  | 'toWallet'
  | 'date'
  | 'amount'
>

type CustodyTransactionMetadata = Omit<TransactionHistoryRow, keyof BaseTransactionRow>

const baseRows: BaseTransactionRow[] = [
  {
    id: 1,
    no: '1',
    transactionHash: 'CMP-BBP-2026-000421',
    fromCompany: 'PT Indonesia Blockchain Persada',
    fromWallet: 'BBP-WAL-2026-001245',
    toCompany: 'PT MY Blockchain Corp',
    toWallet: 'BBP-WAL-2026-234354',
    date: '01 Mar 2022',
    amount: '12 KG',
  },
  {
    id: 2,
    no: '2',
    transactionHash: 'CMP-BBP-2026-000422',
    fromCompany: 'PT Indonesia Maju',
    fromWallet: 'BBP-WAL-2026-008210',
    toCompany: 'PT Indonesia Blockchain Persada',
    toWallet: 'BBP-WAL-2026-001245',
    date: '01 Mar 2022',
    amount: '1 KG',
  },
  {
    id: 3,
    no: '3',
    transactionHash: 'CMP-BBP-2026-000423',
    fromCompany: 'PT Blockchain Persada',
    fromWallet: 'BBP-WAL-2026-001246',
    toCompany: 'PT Indonesia Maju',
    toWallet: 'BBP-WAL-2026-008210',
    date: '01 Mar 2022',
    amount: '122 KG',
  },
  {
    id: 4,
    no: '4',
    transactionHash: 'CMP-BBP-2026-000424',
    fromCompany: 'PT MY Blockchain Corp',
    fromWallet: 'BBP-WAL-2026-234354',
    toCompany: 'PT Indonesia Blockchain Persada',
    toWallet: 'BBP-WAL-2026-001245',
    date: '01 Mar 2022',
    amount: '3 KG',
  },
  {
    id: 5,
    no: '5',
    transactionHash: 'CMP-BBP-2026-000425',
    fromCompany: 'PT Pegadaian Digital Aset',
    fromWallet: 'BBP-WAL-2026-002819',
    toCompany: 'PT Nusantara Token Emas',
    toWallet: 'BBP-WAL-2026-009127',
    date: '02 Mar 2022',
    amount: '24 KG',
  },
  {
    id: 6,
    no: '6',
    transactionHash: 'CMP-BBP-2026-000426',
    fromCompany: 'PT Sentra Bullion Indonesia',
    fromWallet: 'BBP-WAL-2026-110043',
    toCompany: 'PT Indonesia Maju',
    toWallet: 'BBP-WAL-2026-008210',
    date: '03 Mar 2022',
    amount: '8 KG',
  },
  {
    id: 7,
    no: '7',
    transactionHash: 'CMP-BBP-2026-000427',
    fromCompany: 'PT Nusantara Token Emas',
    fromWallet: 'BBP-WAL-2026-009127',
    toCompany: 'PT Pegadaian Digital Aset',
    toWallet: 'BBP-WAL-2026-002819',
    date: '03 Mar 2022',
    amount: '15 KG',
  },
  {
    id: 8,
    no: '8',
    transactionHash: 'CMP-BBP-2026-000428',
    fromCompany: 'PT Indonesia Blockchain Persada',
    fromWallet: 'BBP-WAL-2026-001245',
    toCompany: 'PT Sentra Bullion Indonesia',
    toWallet: 'BBP-WAL-2026-110043',
    date: '04 Mar 2022',
    amount: '9 KG',
  },
  {
    id: 9,
    no: '9',
    transactionHash: 'CMP-BBP-2026-000429',
    fromCompany: 'PT MY Blockchain Corp',
    fromWallet: 'BBP-WAL-2026-234354',
    toCompany: 'PT Blockchain Persada',
    toWallet: 'BBP-WAL-2026-001246',
    date: '05 Mar 2022',
    amount: '32 KG',
  },
  {
    id: 10,
    no: '10',
    transactionHash: 'CMP-BBP-2026-000430',
    fromCompany: 'PT Indonesia Maju',
    fromWallet: 'BBP-WAL-2026-008210',
    toCompany: 'PT Nusantara Token Emas',
    toWallet: 'BBP-WAL-2026-009127',
    date: '05 Mar 2022',
    amount: '5 KG',
  },
  {
    id: 11,
    no: '11',
    transactionHash: 'CMP-BBP-2026-000431',
    fromCompany: 'PT Pegadaian Digital Aset',
    fromWallet: 'BBP-WAL-2026-002819',
    toCompany: 'PT Indonesia Blockchain Persada',
    toWallet: 'BBP-WAL-2026-001245',
    date: '06 Mar 2022',
    amount: '18 KG',
  },
  {
    id: 12,
    no: '12',
    transactionHash: 'CMP-BBP-2026-000432',
    fromCompany: 'PT Sentra Bullion Indonesia',
    fromWallet: 'BBP-WAL-2026-110043',
    toCompany: 'PT MY Blockchain Corp',
    toWallet: 'BBP-WAL-2026-234354',
    date: '07 Mar 2022',
    amount: '41 KG',
  },
  {
    id: 13,
    no: '13',
    transactionHash: 'CMP-BBP-2026-000433',
    fromCompany: 'PT Blockchain Persada',
    fromWallet: 'BBP-WAL-2026-001246',
    toCompany: 'PT Pegadaian Digital Aset',
    toWallet: 'BBP-WAL-2026-002819',
    date: '07 Mar 2022',
    amount: '27 KG',
  },
  {
    id: 14,
    no: '14',
    transactionHash: 'CMP-BBP-2026-000434',
    fromCompany: 'PT Indonesia Blockchain Persada',
    fromWallet: 'BBP-WAL-2026-001245',
    toCompany: 'PT Indonesia Maju',
    toWallet: 'BBP-WAL-2026-008210',
    date: '08 Mar 2022',
    amount: '11 KG',
  },
  {
    id: 15,
    no: '15',
    transactionHash: 'CMP-BBP-2026-000435',
    fromCompany: 'PT Nusantara Token Emas',
    fromWallet: 'BBP-WAL-2026-009127',
    toCompany: 'PT Sentra Bullion Indonesia',
    toWallet: 'BBP-WAL-2026-110043',
    date: '09 Mar 2022',
    amount: '64 KG',
  },
]

const custodyMetadata: CustodyTransactionMetadata[] = [
  {
    transactionType: 'Transfer',
    status: 'Success',
    fromAddress: 'bb1qpx8n9du2s7v6m4wxahk9pr80qx2k4c2n6tyg5l',
    toAddress: 'bb1qmx4d9lv2p8r7yq0cnt6gwh3e2uf5s9adk1zpa',
    confirmedAt: '01 Mar 2022, 10:24 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.01 KG',
    netAmount: '11.99 KG',
    fiatValue: 'Rp 13.188.000',
    blockNumber: 'BBP-2022-0301-000184',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000421',
  },
  {
    transactionType: 'QR Receive',
    status: 'Success',
    fromAddress: 'bb1q8xlt6v2d94ka3sjp0hmwfq5gny7cerz1b2vdx',
    toAddress: 'bb1qpx8n9du2s7v6m4wxahk9pr80qx2k4c2n6tyg5l',
    confirmedAt: '01 Mar 2022, 11:08 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.00 KG',
    netAmount: '1 KG',
    fiatValue: 'Rp 1.100.000',
    blockNumber: 'BBP-2022-0301-000193',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000422',
  },
  {
    transactionType: 'Deposit',
    status: 'Success',
    fromAddress: 'bb1q3m7sjx5enr88q0zp6twyk9d4ufxlt92avh6sn',
    toAddress: 'bb1q8xlt6v2d94ka3sjp0hmwfq5gny7cerz1b2vdx',
    confirmedAt: '01 Mar 2022, 13:45 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.03 KG',
    netAmount: '121.97 KG',
    fiatValue: 'Rp 134.200.000',
    blockNumber: 'BBP-2022-0301-000205',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000423',
  },
  {
    transactionType: 'Transfer',
    status: 'Pending',
    fromAddress: 'bb1qmx4d9lv2p8r7yq0cnt6gwh3e2uf5s9adk1zpa',
    toAddress: 'bb1qpx8n9du2s7v6m4wxahk9pr80qx2k4c2n6tyg5l',
    confirmedAt: '01 Mar 2022, 15:17 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.01 KG',
    netAmount: '2.99 KG',
    fiatValue: 'Rp 3.300.000',
    blockNumber: 'BBP-2022-0301-000218',
    confirmations: '4/12',
    referenceNumber: 'BB-CUST-2022-000424',
  },
  {
    transactionType: 'Swap',
    status: 'Success',
    fromAddress: 'bb1q25e2tc79ru0nlp5a8kgx3cq0shmr49vq2dj73',
    toAddress: 'bb1q7nwjp9u2vl6k5mk8hctra0s2x3dg4feq96zpn',
    confirmedAt: '02 Mar 2022, 09:16 WIB',
    asset: 'PGT',
    network: 'Bullion Private Ledger',
    fee: '0.02 KG',
    netAmount: '23.98 KG',
    fiatValue: 'Rp 26.400.000',
    blockNumber: 'BBP-2022-0302-000244',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000425',
  },
  {
    transactionType: 'Redemption',
    status: 'Success',
    fromAddress: 'bb1qfyw9scl4ne82mt4g6hzxpa7k0q5c3dj1r8qvl',
    toAddress: 'bb1q8xlt6v2d94ka3sjp0hmwfq5gny7cerz1b2vdx',
    confirmedAt: '03 Mar 2022, 12:22 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.01 KG',
    netAmount: '7.99 KG',
    fiatValue: 'Rp 8.800.000',
    blockNumber: 'BBP-2022-0303-000267',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000426',
  },
  {
    transactionType: 'QR Receive',
    status: 'Success',
    fromAddress: 'bb1q7nwjp9u2vl6k5mk8hctra0s2x3dg4feq96zpn',
    toAddress: 'bb1q25e2tc79ru0nlp5a8kgx3cq0shmr49vq2dj73',
    confirmedAt: '03 Mar 2022, 14:39 WIB',
    asset: 'PGT',
    network: 'Bullion Private Ledger',
    fee: '0.00 KG',
    netAmount: '15 KG',
    fiatValue: 'Rp 16.500.000',
    blockNumber: 'BBP-2022-0303-000273',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000427',
  },
  {
    transactionType: 'Transfer',
    status: 'Failed',
    fromAddress: 'bb1qpx8n9du2s7v6m4wxahk9pr80qx2k4c2n6tyg5l',
    toAddress: 'bb1qfyw9scl4ne82mt4g6hzxpa7k0q5c3dj1r8qvl',
    confirmedAt: '04 Mar 2022, 09:03 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.00 KG',
    netAmount: '0 KG',
    fiatValue: 'Rp 9.900.000',
    blockNumber: 'BBP-2022-0304-000301',
    confirmations: '0/12',
    referenceNumber: 'BB-CUST-2022-000428',
  },
  {
    transactionType: 'Transfer',
    status: 'Success',
    fromAddress: 'bb1qmx4d9lv2p8r7yq0cnt6gwh3e2uf5s9adk1zpa',
    toAddress: 'bb1q3m7sjx5enr88q0zp6twyk9d4ufxlt92avh6sn',
    confirmedAt: '05 Mar 2022, 10:47 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.02 KG',
    netAmount: '31.98 KG',
    fiatValue: 'Rp 35.200.000',
    blockNumber: 'BBP-2022-0305-000329',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000429',
  },
  {
    transactionType: 'Transfer',
    status: 'Pending',
    fromAddress: 'bb1q8xlt6v2d94ka3sjp0hmwfq5gny7cerz1b2vdx',
    toAddress: 'bb1q7nwjp9u2vl6k5mk8hctra0s2x3dg4feq96zpn',
    confirmedAt: '05 Mar 2022, 16:05 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.01 KG',
    netAmount: '4.99 KG',
    fiatValue: 'Rp 5.500.000',
    blockNumber: 'BBP-2022-0305-000341',
    confirmations: '7/12',
    referenceNumber: 'BB-CUST-2022-000430',
  },
  {
    transactionType: 'Withdrawal',
    status: 'Success',
    fromAddress: 'bb1q25e2tc79ru0nlp5a8kgx3cq0shmr49vq2dj73',
    toAddress: 'bb1qpx8n9du2s7v6m4wxahk9pr80qx2k4c2n6tyg5l',
    confirmedAt: '06 Mar 2022, 08:51 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.01 KG',
    netAmount: '17.99 KG',
    fiatValue: 'Rp 19.800.000',
    blockNumber: 'BBP-2022-0306-000356',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000431',
  },
  {
    transactionType: 'Deposit',
    status: 'Success',
    fromAddress: 'bb1qfyw9scl4ne82mt4g6hzxpa7k0q5c3dj1r8qvl',
    toAddress: 'bb1qmx4d9lv2p8r7yq0cnt6gwh3e2uf5s9adk1zpa',
    confirmedAt: '07 Mar 2022, 10:12 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.03 KG',
    netAmount: '40.97 KG',
    fiatValue: 'Rp 45.100.000',
    blockNumber: 'BBP-2022-0307-000381',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000432',
  },
  {
    transactionType: 'Swap',
    status: 'Success',
    fromAddress: 'bb1q3m7sjx5enr88q0zp6twyk9d4ufxlt92avh6sn',
    toAddress: 'bb1q25e2tc79ru0nlp5a8kgx3cq0shmr49vq2dj73',
    confirmedAt: '07 Mar 2022, 13:31 WIB',
    asset: 'PGT',
    network: 'Bullion Private Ledger',
    fee: '0.02 KG',
    netAmount: '26.98 KG',
    fiatValue: 'Rp 29.700.000',
    blockNumber: 'BBP-2022-0307-000396',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000433',
  },
  {
    transactionType: 'Transfer',
    status: 'Success',
    fromAddress: 'bb1qpx8n9du2s7v6m4wxahk9pr80qx2k4c2n6tyg5l',
    toAddress: 'bb1q8xlt6v2d94ka3sjp0hmwfq5gny7cerz1b2vdx',
    confirmedAt: '08 Mar 2022, 09:57 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.01 KG',
    netAmount: '10.99 KG',
    fiatValue: 'Rp 12.100.000',
    blockNumber: 'BBP-2022-0308-000417',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000434',
  },
  {
    transactionType: 'Deposit',
    status: 'Success',
    fromAddress: 'bb1q7nwjp9u2vl6k5mk8hctra0s2x3dg4feq96zpn',
    toAddress: 'bb1qfyw9scl4ne82mt4g6hzxpa7k0q5c3dj1r8qvl',
    confirmedAt: '09 Mar 2022, 11:26 WIB',
    asset: 'PAXG',
    network: 'Bullion Private Ledger',
    fee: '0.04 KG',
    netAmount: '63.96 KG',
    fiatValue: 'Rp 70.400.000',
    blockNumber: 'BBP-2022-0309-000452',
    confirmations: '12/12',
    referenceNumber: 'BB-CUST-2022-000435',
  },
]

const rows: TransactionHistoryRow[] = baseRows.map(
  (row, index): TransactionHistoryRow => ({
    ...row,
    ...custodyMetadata[index]!,
  }),
)

const perPage = computed(() => rowLimit.value)
const hasTableControls = computed(() => rows.length > 10)

const filteredRows = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) return rows

  return rows.filter((row) =>
    [
      row.no,
      row.transactionHash,
      row.transactionType,
      row.status,
      row.fromCompany,
      row.fromWallet,
      row.fromAddress,
      row.toCompany,
      row.toWallet,
      row.toAddress,
      row.date,
      row.confirmedAt,
      row.asset,
      row.network,
      row.amount,
      row.fee,
      row.netAmount,
      row.fiatValue,
      row.blockNumber,
      row.confirmations,
      row.referenceNumber,
    ]
      .join(' ')
      .toLowerCase()
      .includes(query),
  )
})

const paginatedRows = computed(() => {
  if (!hasTableControls.value) return filteredRows.value

  const startIndex = (currentPage.value - 1) * perPage.value
  return filteredRows.value.slice(startIndex, startIndex + perPage.value)
})

const displayStart = computed(() => {
  if (filteredRows.value.length === 0) return 0
  return hasTableControls.value ? (currentPage.value - 1) * perPage.value + 1 : 1
})

const displayEnd = computed(() => {
  if (filteredRows.value.length === 0) return 0
  return hasTableControls.value
    ? Math.min(currentPage.value * perPage.value, filteredRows.value.length)
    : filteredRows.value.length
})

watch([rowLimit, searchQuery], () => {
  currentPage.value = 1
})

function onRowLimitChange(val: number) {
  rowLimit.value = val
}

function onSearchChange(val: string) {
  searchQuery.value = val
}

const exportTransactions = async () => {
  try {
    await generatePdfEStatement({
      title: reportMetadata.title,
      companyName: reportMetadata.companyName,
      companyId: reportMetadata.companyId,
      custodyAccountId: reportMetadata.custodyAccountId,
      walletId: reportMetadata.walletId,
      reportPeriod: reportMetadata.reportPeriod,
      openingBalance: reportMetadata.openingBalance,
      totalDebit: reportMetadata.totalDebit,
      totalCredit: reportMetadata.totalCredit,
      closingBalance: reportMetadata.closingBalance,
      lastUpdated: lastUpdated.value,
      transactions: rows,
    })
    showAlert({
      label: 'Detail transaksi berhasil diexport sebagai PDF.',
      variant: 'success',
    })
  } catch (error) {
    showAlert({
      label: 'Gagal mengexport transaksi. Silakan coba lagi.',
      variant: 'danger',
    })
    console.error('Export error:', error)
  }
}

const refreshData = () => {
  lastUpdated.value = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date())
  showAlert({
    label: 'Transaction history berhasil diperbarui.',
    variant: 'info',
  })
}

const previewTransaction = (row: TransactionHistoryRow) => {
  selectedTransaction.value = row
  isTransactionDetailVisible.value = true
}

const closeTransactionDetail = () => {
  selectedTransaction.value = null
  isTransactionDetailVisible.value = false
}
</script>

<template>
  <section class="history-card" aria-labelledby="transaction-history-title">
    <TableHeader
      title="Transaction History"
      :last-updated="`Last updated on ${lastUpdated}`"
      @refresh="refreshData"
    >
      <template #actions>
        <GButton label="Export" type="neutral" size="md" @click="exportTransactions" />
      </template>
    </TableHeader>

    <TableRowControl
      v-if="hasTableControls"
      :row-limit="rowLimit"
      :search-query="searchQuery"
      search-placeholder="Search transaction"
      @update:row-limit="onRowLimitChange"
      @update:search-query="onSearchChange"
    />

    <div class="history-table-wrap">
      <table class="history-table">
        <thead>
          <tr>
            <th class="col-no">No</th>
            <th class="col-hash">Transaction Hash</th>
            <th class="col-type">Type</th>
            <th class="col-party">From</th>
            <th class="col-party">To</th>
            <th class="col-date">Date</th>
            <th class="col-asset">Asset</th>
            <th class="col-amount">Amount</th>
            <th class="col-action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedRows" :key="row.id">
            <td class="col-no">{{ row.no }}</td>
            <td class="col-hash">{{ row.transactionHash }}</td>
            <td class="type-cell">
              <span>{{ row.transactionType }}</span>
                            <StatusBadge
                :variant="row.status.toLowerCase() as 'success' | 'pending' | 'failed'"
                :label="row.status"
              />
            </td>
            <td class="party-cell">
              <div class="party-cell-content">
                <strong>{{ row.fromCompany }}</strong>
                <span>{{ row.fromWallet }}</span>
              </div>
            </td>
            <td class="party-cell">
              <div class="party-cell-content">
                <strong>{{ row.toCompany }}</strong>
                <span>{{ row.toWallet }}</span>
              </div>
            </td>
            <td class="col-date">{{ row.date }}</td>
            <td class="asset-cell">
              <strong>{{ row.asset }}</strong>
              <span>{{ row.network }}</span>
            </td>
            <td class="col-amount">{{ row.amount }}</td>
            <td class="col-action">
              <button class="detail-button" type="button" @click="previewTransaction(row)">
                Preview Detail
              </button>
            </td>
          </tr>
          <tr v-if="paginatedRows.length === 0">
            <td class="empty-cell" colspan="9">Tidak ada data yang ditampilkan</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="history-mobile-list" aria-label="Transaction history cards">
      <article v-for="row in paginatedRows" :key="row.id" class="history-mobile-card">
        <header class="mobile-card-header">
          <div>
            <span>Transaction Hash</span>
            <strong>{{ row.transactionHash }}</strong>
          </div>
          <div class="mobile-card-meta">
                        <StatusBadge
              :variant="row.status.toLowerCase() as 'success' | 'pending' | 'failed'"
              :label="row.status"
            />
            <p>{{ row.amount }}</p>
          </div>
        </header>

        <div class="mobile-card-divider" aria-hidden="true" />

        <dl class="mobile-card-details">
          <div>
            <dt>Type</dt>
            <dd>{{ row.transactionType }}</dd>
          </div>
          <div>
            <dt>Asset</dt>
            <dd>
              <strong>{{ row.asset }}</strong>
              <span>{{ row.network }}</span>
            </dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{{ row.date }}</dd>
          </div>
          <div>
            <dt>From</dt>
            <dd>
              <strong>{{ row.fromCompany }}</strong>
              <span>{{ row.fromWallet }}</span>
            </dd>
          </div>
          <div>
            <dt>To</dt>
            <dd>
              <strong>{{ row.toCompany }}</strong>
              <span>{{ row.toWallet }}</span>
            </dd>
          </div>
        </dl>

        <button
          class="detail-button mobile-detail-button"
          type="button"
          @click="previewTransaction(row)"
        >
          Preview Detail
        </button>
      </article>

      <div v-if="paginatedRows.length === 0" class="history-mobile-empty">
        Tidak ada data yang ditampilkan
      </div>
    </div>

    <TableFooter
      :display-start="displayStart"
      :display-end="displayEnd"
      :total-rows="filteredRows.length"
    >
      <GTablePagination
        v-if="hasTableControls && filteredRows.length > perPage"
        v-model="currentPage"
        :total-rows="filteredRows.length"
        :per-page="perPage"
      />
    </TableFooter>
  </section>

  <TransactionDetailModal
    :is-visible="isTransactionDetailVisible"
    :transaction="selectedTransaction"
    @close="closeTransactionDetail"
  />
</template>

<style scoped>
.history-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.history-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.history-mobile-list {
  display: none;
}

.history-table {
  width: 1720px;
  margin: 0;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 6px;
  border-spacing: 0;
  border-collapse: separate;
  table-layout: fixed;
}

.history-table th {
  height: 56px;
  padding: 18px 16px;
  border: 0;
  border-right: 1px solid var(--g-kit-black-20);
  background: var(--g-kit-lime-50);
  color: var(--g-kit-white);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  text-align: left;
  white-space: nowrap;
}

.history-table th:first-child {
  border-top-left-radius: 6px;
}

.history-table th:last-child {
  border-top-right-radius: 6px;
}

.history-table td {
  padding: 16px;
  border-top: 1px solid transparent;
  border-right: 1px solid var(--g-kit-black-20);
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  vertical-align: top;
  word-break: break-word;
}

.history-table th:last-child,
.history-table td:last-child {
  border-right: 0;
}

.history-table th.col-action,
.history-table td.col-action {
  position: sticky;
  right: 0;
  z-index: 1;
  border-left: 1px solid var(--g-kit-black-20);
}

.history-table th.col-action {
  z-index: 2;
  background: var(--g-kit-lime-50);
}

.history-table td.col-action {
  background: var(--g-kit-white);
}

.history-table tbody tr:nth-child(even) td.col-action {
  background: var(--g-kit-black-10);
}

.history-table tbody tr {
  background: var(--g-kit-white);
}

.history-table tbody tr:nth-child(even) {
  background: var(--g-kit-black-10);
}

.history-table tbody tr + tr td {
  border-top-color: var(--g-kit-black-20);
}

.empty-cell {
  height: 96px;
  text-align: center;
  vertical-align: middle;
}

.col-no { width: 67px; }
.col-hash { width: 220px; }
.history-table th.col-no,
.history-table th.col-hash { padding-inline: 24px; }
.history-table td.col-no { text-align: center; }
.col-party { width: 280px; }
.col-type { width: 160px; }
.col-date { width: 160px; }
.col-asset { width: 170px; }
.col-amount,
.col-action { width: 150px; }
.col-amount { font-weight: var(--g-kit-font-weight-bold); white-space: nowrap; }

.party-cell-content { display: flex; flex-direction: column; gap: 4px; }
.type-cell,
.asset-cell { display: flex; flex-direction: column; gap: 6px; }
.type-cell > span,
.asset-cell > span {
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}
.asset-cell > strong {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
}


.party-cell-content strong,
.party-cell-content span {
  min-width: 0;
  color: var(--g-kit-black-60);
}
.party-cell-content strong {
  overflow: hidden;
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.party-cell-content span {
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.detail-button {
  width: 100%;
  min-height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  border: 1px solid var(--g-kit-lime-50);
  border-radius: 4px;
  background: var(--g-kit-white);
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omega);
  cursor: pointer;
  white-space: nowrap;
}
.detail-button:hover,
.detail-button:focus-visible {
  background: var(--g-kit-lime-10);
  outline: 0;
}

.history-mobile-card,
.history-mobile-empty {
  border: 1px solid var(--g-kit-black-20);
  border-radius: 8px;
  background: var(--g-kit-white);
}
.history-mobile-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}
.mobile-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.mobile-card-header div {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mobile-card-header span,
.mobile-card-details dt {
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}
.mobile-card-header strong {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  word-break: break-word;
}
.mobile-card-header p {
  flex: 0 0 auto;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  white-space: nowrap;
}
.mobile-card-meta {
  flex: 0 0 auto;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 6px;
}
.mobile-card-divider {
  height: 1px;
  background: var(--g-kit-black-20);
}
.mobile-card-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
}
.mobile-card-details div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.mobile-card-details dd {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  color: var(--g-kit-black-60);
}
.mobile-card-details dd > strong {
  overflow: hidden;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mobile-card-details dd > span,
.mobile-card-details dd {
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}
.mobile-detail-button {
  width: 100%;
  min-height: 36px;
}
.history-mobile-empty {
  padding: 24px 16px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  text-align: center;
}

@media (max-width: 760px) {
  .history-card {
    padding: 20px 16px;
  }

  .history-table-wrap {
    display: none;
  }

  .history-mobile-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
