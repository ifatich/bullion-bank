# Information Architecture

## Product Scope

Bullion Bank CMS adalah aplikasi internal untuk operator bisnis bullion-backed token. Struktur saat ini berfokus pada autentikasi, ringkasan dashboard, dan transaksi token swap.

## User Roles

| Role | Primary Need | Current Coverage |
| --- | --- | --- |
| CMS Operator | Melihat ringkasan aktivitas dan menjalankan transaksi token | Dashboard, Token Swap |
| Approver / Supervisor | Meninjau aktivitas dan tugas tertunda | Dashboard task card, belum ada detail task |
| Admin | Mengelola profil, akses, dan konfigurasi | Belum tersedia |

## Site Map

```text
/
└── Login

/dashboard
├── Dashboard Summary
├── Task List Preview
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
```

## Route Inventory

| Route | Name | View | Status | Purpose |
| --- | --- | --- | --- | --- |
| `/` | `Login` | `src/views/auth/LoginView.vue` | Implemented | Entry point untuk autentikasi pengguna. |
| `/dashboard` | `Dashboard` | `src/views/dashboard/DashboardView.vue` | Implemented | Landing page setelah login, berisi ringkasan, task, dan menu modul. |
| `/token/swap` | `TokenSwap` | `src/views/token/TokenSwapView.vue` | Implemented | Form transaksi pertukaran token. |
| `/token/redemption` | `TokenRedemption` | TBD | Planned | Penukaran token menjadi underlying asset / nilai terkait. |
| `/token/transfer` | `TokenTransfer` | TBD | Planned | Transfer token antar akun atau entitas. |
| `/qr/add` | `QRAdd` | TBD | Planned | Generate atau registrasi QR. |
| `/transaction-history` | `TransactionHistory` | TBD | Planned | Riwayat transaksi dan audit aktivitas. |
| `/profile` | `Profile` | TBD | Planned | Informasi pengguna dan pengaturan akun. |

## Navigation Model

### Global Navigation

Global navigation ditampilkan pada halaman authenticated melalui `DashboardTopbar`.

| Label | Target | Status |
| --- | --- | --- |
| Dashboard | `/dashboard` | Implemented |
| Transaction History | `/transaction-history` | Planned |
| Profile | `/profile` | Planned |

### Dashboard Module Navigation

Dashboard menggunakan menu berbasis modul melalui `MenuSection`.

| Section | Menu Item | Target | Status |
| --- | --- | --- | --- |
| Token | Swap | `/token/swap` | Implemented |
| Token | Redemption | `/token/redemption` | Planned |
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

1. Define route and page contract for Token Redemption.
2. Define route and page contract for Token Transfer.
3. Convert `DashboardTopbar` navigation items from placeholder anchors to router links.
4. Add authenticated route guard once auth integration is finalized.
5. Add empty, loading, error, and success states per transaction page.
