import type { TParamsGetTransactions, TParamsDateRange } from '@/services/api'
import BullionBankInstance from '@/services/BullionBankInstance'
import api, { type TParamsLogin } from '@/services/api'
import type { UserProfileResponse } from '@/types/user'
import type { BalanceResponse } from '@/types/balance'
import type { TransactionHistoryResponse } from '@/types/transaction'
import type { CustodyReportMetadata } from '@/types/transaction'
import transactionHistoryMock from '@/utils/data/transaction-history.mock.json'

class BullionBankService extends BullionBankInstance {
  login(request: TParamsLogin) {
    return this.axios<TParamsLogin, unknown>(api.login(request))
  }

  async getProfile(): Promise<UserProfileResponse> {
    try {
      return await this.axios<void, UserProfileResponse>(api.getProfile())
    } catch {
      return {
        data: {
          name: 'Thoriq Sadada',
          email: 'pegadaian@bullion.co.id',
          phone: '+62 812-3456-7890',
          walletAddress: 'bc1qxy2kgdygjrs3p83kkfjhx0wlhbc1qxy2kgdygjrs3p83kkfjhx0wlh',
          companyId: '001PXTID',
          companyName: 'PT Bullion Bank Indonesia',
          companyAddress: 'Gedung Menara Mulia, Jl. Jend. Gatot Subroto Kav. 9-11, Jakarta',
          kyb: { status: 'VERIFIED' },

          // Step 1 — Data Perusahaan
          businessName: 'PT Bullion Bank Indonesia',
          directorName: 'Budi Santoso',
          companyEmail: 'pegadaian@bullion.co.id',
          nibNumber: '1234567890123456',
          nibFile: 'nib_document.pdf',
          npwpNumber: '01.234.567.8-901.000',
          npwpFile: 'company_npwp.png',

          // Step 2 — Data Akta
          deedNo: 'AHU-0012345.AH.01.01',
          deedFile: 'deed_establishment.pdf',
          deedDate: '2020-01-15',
          latestDeedNo: 'AHU-0098765.AH.01.02',
          latestDeedFile: 'deed_latest_amendment.pdf',
          latestDeedDate: '2023-05-20',

          // Step 3 — Alamat
          province: 'DKI Jakarta',
          city: 'Jakarta Selatan',
          district: 'Kebayoran Baru',
          subDistrict: 'Melawai',
          rt: '005',
          rw: '003',

          // Step 4 — Data Pengurus
          adminName: 'Siti Rahma',
          adminNik: '3174012345670001',
          adminNikFile: 'admin_nik.jpg',
          adminNpwp: '09.123.456.7-890.000',
          adminNpwpFile: 'admin_npwp.jpg',
          adminPhone: '081298765432',

          // Step 5 — Data Pelaksana Transaksi
          executorName: 'Andi Wijaya',
          executorNik: '3174017654320002',
          executorNikFile: 'executor_nik.jpg',
          executorNpwp: '08.765.432.1-098.000',
          executorNpwpFile: 'executor_npwp.jpg',
          executorPhone: '081312345678'
        }
      }
    }
  }

  async getBalance(): Promise<BalanceResponse> {
    try {
      return await this.axios<void, BalanceResponse>(api.getBalance())
    } catch {
      return {
        data: {
          totalKg: '100 KG',
          estimateIdr: '1234000000',
          denominations: [
            { weightGram: 1, label: '1 Gram', pcs: 0, totalWeightGram: 0 },
            { weightGram: 5, label: '5 Gram', pcs: 0, totalWeightGram: 0 },
            { weightGram: 10, label: '10 Gram', pcs: 10, totalWeightGram: 100 },
            { weightGram: 20, label: '20 Gram', pcs: 0, totalWeightGram: 0 },
            { weightGram: 25, label: '25 Gram', pcs: 0, totalWeightGram: 0 },
            { weightGram: 50, label: '50 Gram', pcs: 8, totalWeightGram: 400 },
            { weightGram: 100, label: '100 Gram', pcs: 5, totalWeightGram: 500 },
            { weightGram: 250, label: '250 Gram', pcs: 0, totalWeightGram: 0 },
            { weightGram: 500, label: '500 Gram', pcs: 0, totalWeightGram: 0 },
            { weightGram: 1000, label: '1 Kilogram', pcs: 99, totalWeightGram: 99000 }
          ]
        }
      }
    }
  }

  async getTransactions(params?: TParamsGetTransactions): Promise<TransactionHistoryResponse> {
    try {
      return await this.axios<void, TransactionHistoryResponse>(api.getTransactions(params))
    } catch {
      const mockData = transactionHistoryMock as unknown as TransactionHistoryResponse
      let filtered = [...mockData.transactions]

      if (params?.search) {
        const query = params.search.toLowerCase()
        filtered = filtered.filter(tx =>
          tx.transactionHash.toLowerCase().includes(query) ||
          tx.transactionType.toLowerCase().includes(query) ||
          tx.fromCompany.toLowerCase().includes(query) ||
          tx.toCompany.toLowerCase().includes(query)
        )
      }

      if (params?.fromDate && params?.toDate) {
        const start = new Date(params.fromDate + 'T00:00:00')
        const end = new Date(params.toDate + 'T23:59:59')
        filtered = filtered.filter(tx => {
          const d = new Date(tx.date)
          return !isNaN(d.getTime()) && d >= start && d <= end
        })
      }

      return {
        report: mockData.report,
        transactions: filtered
      }
    }
  }

  async getTransactionReport(params?: TParamsDateRange): Promise<{ data: CustodyReportMetadata }> {
    try {
      return await this.axios<void, { data: CustodyReportMetadata }>(api.getTransactionReport(params))
    } catch {
      const mockData = transactionHistoryMock as unknown as TransactionHistoryResponse
      return {
        data: {
          ...mockData.report,
          reportPeriod: params?.fromDate && params?.toDate
            ? `${params.fromDate} - ${params.toDate}`
            : mockData.report.reportPeriod
        }
      }
    }
  }
}

export default new BullionBankService()
