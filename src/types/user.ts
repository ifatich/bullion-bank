export interface KybStatus {
  status: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'UNSUBMITTED'
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  walletAddress: string
  companyId: string
  companyName: string
  companyAddress: string
  kyb: KybStatus

  // Step 1 — Data Perusahaan
  businessName?: string
  directorName?: string
  companyEmail?: string
  nibNumber?: string
  nibFile?: string | File | null
  npwpNumber?: string
  npwpFile?: string | File | null

  // Step 2 — Data Akta
  deedNo?: string
  deedFile?: string | File | null
  deedDate?: string
  latestDeedNo?: string
  latestDeedFile?: string | File | null
  latestDeedDate?: string

  // Step 3 — Alamat
  province?: string
  city?: string
  district?: string
  subDistrict?: string
  rt?: string
  rw?: string

  // Step 4 — Data Pengurus
  adminName?: string
  adminNik?: string
  adminNikFile?: string | File | null
  adminNpwp?: string
  adminNpwpFile?: string | File | null
  adminPhone?: string

  // Step 5 — Data Pelaksana Transaksi
  executorName?: string
  executorNik?: string
  executorNikFile?: string | File | null
  executorNpwp?: string
  executorNpwpFile?: string | File | null
  executorPhone?: string
}

export interface UserProfileResponse {
  data: UserProfile
}
