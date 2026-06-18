# Frontend Implementation Rules

Dokumen ini adalah aturan kerja saat mengubah Figma menjadi Vue implementation di project Bullion Bank CMS. Fokus utamanya: optimalkan Figma MCP, reuse `kitvue-public`, dan pakai design token yang sudah tersedia.

## Prinsip Utama

1. Figma MCP adalah sumber layout, spacing, typography, dan visual state.
2. `kitvue-public` adalah sumber komponen dan design token.
3. Custom component hanya dibuat untuk komposisi domain project, bukan mengganti komponen library yang sudah tersedia.
4. Scoped CSS dipakai untuk layout wrapper, bukan untuk menimpa internal style komponen `kitvue-public`.
5. Hardcoded value hanya boleh dipakai jika token tidak tersedia dan alasannya jelas.

## Alur Wajib Dari Figma MCP

Untuk setiap screen, modal, bottomsheet, atau komponen besar dari Figma:

1. Ambil design context node dengan Figma MCP.
2. Ambil variable definition node dengan Figma MCP.
3. Ambil screenshot node sebagai visual reference.
4. Catat style penting dari Figma:
   - color
   - font family
   - font size
   - line height
   - font weight
   - spacing
   - radius
   - border
   - shadow
   - state/status color
5. Cocokkan setiap style dengan token `kitvue-public`.
6. Implementasikan Vue memakai komponen `kitvue-public` lebih dulu.
7. Baru tambahkan custom wrapper/style jika layout Figma membutuhkan komposisi khusus.

Jika Figma MCP mengembalikan variable CSS seperti `var(--g-kit-font-size-omicron)`, pakai variable itu langsung. Jika Figma MCP hanya mengembalikan raw value seperti `16px`, cari mapping tokennya di `kitvue-public` sebelum menulis CSS.

## Figma Variable To CSS Token Mapping

Selalu cek file token ini:

```bash
node_modules/kitvue-public/src/assets/scss/g-kit/_colors.scss
node_modules/kitvue-public/src/assets/scss/g-kit/_typography.scss
node_modules/kitvue-public/src/assets/scss/_variables.scss
```

Gunakan pattern berikut:

| Figma Value | CSS Token |
| --- | --- |
| `#00ab4e` | `var(--g-kit-lime-50)` |
| `#00883e` | `var(--g-kit-lime-60)` |
| `#00662e` | `var(--g-kit-lime-80)` |
| `#252528` | `var(--g-kit-black-80)` |
| `#58585b` | `var(--g-kit-black-60)` |
| `#939597` | `var(--g-kit-black-50)` |
| `#eeeeef` | `var(--g-kit-black-20)` |
| `#f8f8f8` | `var(--g-kit-black-10)` |
| `#ae1e22` | `var(--g-kit-red-50)` |
| `#e07e26` | `var(--g-kit-orange-50)` |
| `#1868ab` | `var(--g-kit-blue-50)` |
| `#d8b56d` | `var(--g-kit-gold-50)` |
| `16px / 24px` | `var(--g-kit-font-size-omicron)` / `var(--g-kit-line-height-omicron)` |
| `14px / 20px` | `var(--g-kit-font-size-sigma)` / `var(--g-kit-line-height-sigma)` |
| `12px / 18px` | `var(--g-kit-font-size-omega)` / `var(--g-kit-line-height-omega)` |
| `600` | `var(--g-kit-font-weight-normal)` |
| `800` | `var(--g-kit-font-weight-bold)` |

Token weight resmi hanya `normal` dan `bold`. Jangan memakai `--g-kit-font-weight-semibold` atau `--g-kit-font-weight-extrabold` karena tidak tersedia di `kitvue-public`.

## Komponen First Rule

Sebelum membuat komponen baru, cek urutan ini:

1. `src/components.ts`
2. `node_modules/kitvue-public/src/components`
3. [design.md](./design.md)
4. [kitvue-public-design-system.md](kitvue-public-design-system.md)

Gunakan perintah berikut saat eksplorasi:

```bash
rg "export const G" src/components.ts
find node_modules/kitvue-public/src/components -maxdepth 2 -type f -name '*.vue' | sort
rg "--g-kit|font-size|line-height|font-weight" node_modules/kitvue-public/src/assets/scss
```

Jika komponen ada di `kitvue-public` tapi belum ada alias project, tambahkan alias di `src/components.ts`. Jangan import path panjang berulang di tiap file Vue.

## Mapping Komponen Project

| Kebutuhan UI | Prioritas Komponen |
| --- | --- |
| Button/action | `GButton` |
| Input text | `GInputText` |
| Textarea | `GTextArea` |
| Dropdown/select | `GDropdown` |
| Date/date range | `GDatePicker`, `GRangeDatePicker` |
| Alert/toast | `GAlert` / wrapper alert project |
| Badge/status | `GBadge` |
| Breadcrumb | `GBreadcrumb` / wrapper breadcrumb project |
| Back navigation | `GNavBackNavigator` / wrapper nav back project |
| Dashboard header/navbar | `GBerandaHeader` / wrapper dashboard topbar |
| Table | `GTable`, `GTablePagination`, atau `TableSticky` jika sesuai |
| Modal | `GModal` atau shared modal project |
| Bottomsheet mobile | `BottomSheet/GOffCanvas.vue` atau shared responsive modal project |
| Accordion | `GAccordion`, `GAccordionItem` |

## Styling Rules

Gunakan token seperti ini:

```css
.section-title {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  line-height: var(--g-kit-line-height-kappa);
  font-weight: var(--g-kit-font-weight-bold);
}

.body-text {
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  line-height: var(--g-kit-line-height-omicron);
  font-weight: var(--g-kit-font-weight-normal);
}
```

Hindari pattern ini:

```css
.body-text {
  color: #58585b;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
}
```

Khusus komponen `kitvue-public`, jangan override class internal jika cukup dengan props, slot, atau wrapper layout.

## Responsive Rules

1. Desktop table boleh menggunakan table horizontal.
2. Mobile transaction history harus berubah menjadi card list.
3. Modal/popup di mobile harus menjadi bottomsheet.
4. Bottomsheet wajib punya overlay dan z-index yang lebih rendah dari sheet content.
5. Sticky footer/button tidak boleh menutup content; tambahkan bottom padding pada page container.
6. Navbar mobile hanya menampilkan logo dan user trigger sesuai Figma.
7. Navbar mobile harus sticky jika screen membutuhkan scroll.

## Transaction And Custody Rules

Untuk data transaksi atau custody report, data dummy harus mendekati response backend:

- id
- transaction hash/reference
- custody reference
- type
- status
- from company
- from wallet
- to company
- to wallet
- asset
- network/ledger
- date/time
- amount
- fee
- net amount

Simpan data dummy di `src/utils/data/*.mock.json`, bukan hardcode langsung di component.

## Definition Of Done

Sebuah implementasi dari Figma dianggap selesai jika:

1. Sudah memakai Figma MCP design context.
2. Sudah mengecek Figma MCP variable definitions.
3. Style Figma sudah dipetakan ke `--g-kit-*`.
4. Komponen `kitvue-public` sudah dicek sebelum membuat custom component.
5. Custom CSS hanya untuk layout wrapper atau gap yang tidak disediakan komponen.
6. Responsive desktop/mobile sudah dicek.
7. Basic actions tersedia: copy, preview detail, export, open/close modal, bottomsheet overlay.
8. TypeScript check dan build berhasil.
