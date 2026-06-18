# Information Architecture

## Product Scope

Bullion Bank CMS adalah aplikasi internal untuk operator bisnis bullion-backed token. Struktur saat ini berfokus pada autentikasi, ringkasan dashboard, dan transaksi token swap.

## User Roles

| Role | Primary Need | Current Coverage |
| --- | --- | --- |
| CMS Operator | Melihat ringkasan aktivitas dan menjalankan transaksi token | Dashboard, Token Swap, Token Redemption, Transaction History |
| Approver / Supervisor | Meninjau aktivitas dan tugas tertunda | Dashboard task card, belum ada detail task |
| Admin | Mengelola profil, akses, dan konfigurasi | Belum tersedia |

## Site Map

```text
/
├── Login
└── Register

/dashboard
├── Dashboard Summary
├── Task List Preview
├── Transaction History
├── Token
│   ├── Swap
│   ├── Redemption
│   └── Transfer
└── QR Generate
    └── Add QR

/token/swap
├── Breadcrumb: Dashboard > Token Swap
├── Back Navigation
├── Information Banner
├── Sell Token
├── Buy Token
└── Action Bar
    ├── Abort
    └── Swap Token

/transaction-history
├── Breadcrumb: Dashboard > Transaction History
├── Back Navigation
├── Information Banner
└── Transaction History Table
    ├── Last Updated
    ├── Row Limit Control
    ├── Empty State
    └── Pagination Summary
```

## Route Inventory

| Route | Name | View | Status | Purpose |
| --- | --- | --- | --- | --- |
| `/` | `Login` | `src/views/auth/LoginView.vue` | Implemented | Entry point untuk autentikasi pengguna. |
| `/register` | `Register` | `src/views/auth/RegisterView.vue` | Implemented | Flow registrasi akun baru dalam 3 langkah. |
| `/dashboard` | `Dashboard` | `src/views/dashboard/DashboardView.vue` | Implemented | Landing page setelah login, berisi ringkasan, task, dan menu modul. |
| `/token/swap` | `TokenSwap` | `src/views/token/TokenSwapView.vue` | Implemented | Form transaksi pertukaran token. |
| `/token/redemption` | `TokenRedemption` | `src/views/token/TokenRedemptionView.vue` | Implemented | Penukaran token menjadi underlying asset / nilai terkait. |
| `/token/transfer` | `TokenTransfer` | TBD | Planned | Transfer token antar akun atau entitas. |
| `/qr/add` | `QRAdd` | TBD | Planned | Generate atau registrasi QR. |
| `/transaction-history` | `TransactionHistory` | `src/views/transaction-history/TransactionHistoryView.vue` | Implemented | Riwayat transaksi dan audit aktivitas. |
| `/profile` | `Profile` | `src/views/profile/ProfileView.vue` | Implemented | Informasi pengguna dan pengaturan akun. |

## Navigation Model

### Global Navigation

Global navigation ditampilkan pada halaman authenticated melalui `DashboardTopbar`.

| Label | Target | Status |
| --- | --- | --- |
| Dashboard | `/dashboard` | Implemented |
| Transaction History | `/transaction-history` | Implemented |
| Profile | `/profile` | Implemented |

### Dashboard Module Navigation

Dashboard menggunakan menu berbasis modul melalui `MenuSection`.

| Section | Menu Item | Target | Status |
| --- | --- | --- | --- |
| Token | Swap | `/token/swap` | Implemented |
| Token | Redemption | `/token/redemption` | Implemented |
| Token | Transfer | `/token/transfer` | Planned |
| QR Generate | Add QR | `/qr/add` | Planned |

### Local Navigation

| Pattern | Component | Usage |
| --- | --- | --- |
| Breadcrumb | `GBreadcrumb` from `kitvue-public` | Menunjukkan hierarchy halaman detail. |
| Back navigation | `GNavBackNavigator` wrapped by `src/components/shared/navBack/navBack.vue` | Kembali dari detail/module page ke dashboard atau halaman induk. |
| Sticky action bar | Local page action area + `GButton` | Aksi utama dan pembatalan pada halaman transaksi. |

## Page-Level IA

### Login

```text
LoginView
├── LoginHero
└── LoginForm
    ├── LoginHeader
    ├── Username
    ├── Password
    └── Submit
```

Primary action: login ke dashboard.  
Success destination: `/dashboard`.

### Register

```text
RegisterView
├── LoginHero
└── RegisterForm
    ├── Step 1: Personal Information
    │   ├── Nama Lengkap
    │   ├── Tempat Lahir
    │   ├── Kewarganegaraan
    │   ├── Alamat Email
    │   └── Tanggal Lahir
    ├── Step 2: Identity Information
    │   ├── Jenis Identitas
    │   ├── Bukti Identitas
    │   ├── Alamat Lengkap
    │   └── Alamat Domisili
    └── Step 3: Account Information
        ├── Nomor Telepon
        ├── Pekerjaan Utama
        ├── Kata Sandi
        └── Konfirmasi Kata Sandi
```

Primary action: complete registration.  
Secondary action: return to login.

### Dashboard

```text
DashboardView
├── DashboardTopbar
├── DashboardSummary
├── TaskCard
├── MenuSection: Token
│   ├── Swap
│   ├── Redemption
│   └── Transfer
├── MenuSection: QR Generate
│   └── Add QR
└── Footer
```

Primary purpose: memberikan akses cepat ke aktivitas utama dan status operasional.

### Token Swap

```text
TokenSwapView
├── DashboardTopbar
├── Breadcrumb
├── NavBack
├── Information Banner
├── TokenSwapForm
│   ├── Header
│   ├── Last Updated
│   ├── Sell Token
│   │   ├── Sell Amount
│   │   └── Sell Token Dropdown
│   └── Buy Token
│       ├── Buy Amount
│       └── Buy Token Dropdown
├── Footer
└── Action Bar
    ├── Abort
    └── Swap Token
```

Primary action: submit token swap.  
Secondary action: abort and return to previous flow.

### Token Redemption

```text
TokenRedemptionView
├── DashboardTopbar
├── Breadcrumb
├── NavBack
├── Information Banner
├── TokenRedemptionForm
│   ├── Header
│   ├── Last Updated
│   ├── Amount
│   ├── Redemption Date
│   ├── Transaction Fee
│   └── Grand Total
├── Footer
└── Action Bar
    ├── Abort
    └── Request Redemption
```

Primary action: request token redemption.  
Secondary action: abort and return to previous flow.

### Transaction History

```text
TransactionHistoryView
├── DashboardTopbar
├── Breadcrumb
├── NavBack
├── Information Banner
├── TransactionHistoryTable
│   ├── Header
│   ├── Last Updated
│   ├── Row Limit Control
│   ├── Table
│   │   ├── No
│   │   ├── Transaction Name
│   │   └── Action
│   └── Pagination Summary
└── Footer
```

Primary purpose: menampilkan riwayat transaksi dan menyediakan empty state saat belum ada data.

## Content Types

| Content Type | Description | Example Fields |
| --- | --- | --- |
| User Session | Data pengguna aktif dan role. | name, role, token, permissions |
| Dashboard Summary | Ringkasan nilai dan aktivitas. | balance, token amount, growth, last update |
| Task | Tugas atau approval tertunda. | id, title, status, assignee, due date |
| Token | Aset/token yang dapat dipilih. | label, value, symbol, available balance |
| Token Swap Transaction | Payload transaksi swap. | sell amount, sell token, buy amount, buy token |
| QR Item | QR yang dibuat/terdaftar. | id, name, status, created date |
| Transaction History | Riwayat transaksi. | id, type, status, amount, timestamp |

## Recommended Folder Mapping

```text
src/
├── views/
│   ├── auth/
│   ├── dashboard/
│   ├── token/
│   ├── qr/
│   ├── transaction-history/
│   └── profile/
├── components/
│   ├── modules/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── token-swap/
│   │   ├── token-redemption/
│   │   ├── token-transfer/
│   │   ├── transaction-history/
│   │   └── qr/
│   └── shared/
├── services/
├── stores/
├── types/
└── utils/
```

## Implementation Rules

- Reuse exported aliases from `src/components.ts` for `kitvue-public` components.
- Keep page-specific composition inside `src/views/**`.
- Keep domain UI blocks inside `src/components/modules/**`.
- Keep generic wrappers inside `src/components/shared/**`.
- Add routes only after the target view exists.
- Do not commit environment files containing secrets.

## Next IA Tasks

1. Define route and page contract for Token Transfer.
2. Add authenticated route guard once auth integration is finalized.
3. Add empty, loading, error, and success states per transaction page.
