# Kitvue Public Design System Reference

Dokumen ini menjadi checklist lokal sebelum membuat layout dari Figma MCP. Tujuannya: selalu cek `kitvue-public` dan design token lebih dulu sebelum membuat komponen atau style custom.

## Sumber Token

Token berada di:

- `node_modules/kitvue-public/src/assets/scss/g-kit/_colors.scss`
- `node_modules/kitvue-public/src/assets/scss/g-kit/_typography.scss`
- `node_modules/kitvue-public/src/assets/scss/_variables.scss`

Import global style sudah melalui `kitvue-public/dist/style.css`, sehingga CSS variable dapat dipakai langsung di SFC.

## Warna

Gunakan CSS variable `--g-kit-{palette}-{scale}`. Hindari hardcode hex kecuali token memang belum tersedia.

| Kebutuhan | Token Utama |
| --- | --- |
| Text utama | `var(--g-kit-black-80)` |
| Text sekunder | `var(--g-kit-black-60)` |
| Text tertiary/placeholder | `var(--g-kit-black-50)` |
| Border/netral | `var(--g-kit-black-20)` |
| Background terang | `var(--g-kit-black-10)` atau `var(--g-kit-white)` |
| Primary/action | `var(--g-kit-lime-50)` |
| Primary hover | `var(--g-kit-lime-60)` |
| Primary active | `var(--g-kit-lime-80)` |
| Success | `var(--g-kit-lime-50)` |
| Warning/pending | `var(--g-kit-orange-50)` |
| Danger/failed | `var(--g-kit-red-50)` |
| Info | `var(--g-kit-blue-50)` |
| Gold accent | `var(--g-kit-gold-50)` |
| Dark brand surface | `var(--g-kit-broccoli-50)` sampai `var(--g-kit-broccoli-90)` |

Palette yang tersedia: `broccoli`, `lime`, `pear`, `kiwi`, `red`, `orange`, `yellow`, `gold`, `turquoise`, `blue`, `purple`, `black`, `white`.

## Typography

Font family library adalah Nunito Sans. Gunakan token ukuran dan line-height berikut.

| Token | Size | Line-height | Penggunaan Umum |
| --- | ---: | ---: | --- |
| `alpha` | 72px | 108px | Display sangat besar |
| `beta` | 60px | 90px | Display |
| `gamma` | 48px | 72px | Hero/title besar |
| `delta` | 36px | 54px | Heading besar |
| `epsilon` | 30px | 44px | Heading |
| `zeta` | 24px | 36px | Section title |
| `kappa` | 20px | 30px | Card/page title |
| `lambda` | 18px | 26px | Subtitle |
| `omicron` | 16px | 24px | Body/form/default |
| `sigma` | 14px | 20px | Table/caption compact |
| `omega` | 12px | 18px | Helper text/meta |
| `atom` | 10px | 14px | Fine print |

Weight resmi yang tersedia:

- `var(--g-kit-font-weight-normal)` = `600`
- `var(--g-kit-font-weight-bold)` = `800`

Jangan mengandalkan token seperti `--g-kit-font-weight-semibold` atau `--g-kit-font-weight-extrabold` karena tidak didefinisikan oleh `kitvue-public`.

Contoh:

```css
.table-cell {
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  line-height: var(--g-kit-line-height-sigma);
  font-weight: var(--g-kit-font-weight-normal);
}
```

## Token Komponen

`_variables.scss` sudah mendefinisikan baseline untuk button, input, dan table.

| Area | Baseline Kitvue |
| --- | --- |
| Button font | `omicron`, `bold` |
| Button primary | `lime-50`, hover `lime-60`, active `lime-80` |
| Input font | `omicron`, `normal` |
| Input radius | `6px` |
| Input padding | `12px` |
| Input border | `black-20` |
| Input focus | `lime-50` |
| Input placeholder | `black-50` |
| Label | `omicron`, `bold`, `black-80` |
| Helper text | `omega`, `normal`, `black-60` |

Untuk komponen dari `kitvue-public`, prioritaskan scoped CSS hanya pada wrapper/layout. Hindari override internal seperti border input, padding button, atau font table kecuali design Figma memang berbeda dan token tetap dipakai.

## Komponen Yang Tersedia

Komponen tersedia di `node_modules/kitvue-public/src/components`. Alias yang sudah dipakai project ada di `src/components.ts`:

| Alias Project | Komponen Kitvue |
| --- | --- |
| `GButton` | `Button/Button.vue` |
| `GModal` | `Modal/ModalComponent.vue` |
| `GDropdown` | `Dropdown/InputDropdown.vue` |
| `GInputText` | `Input/InputText.vue` |
| `GInputRupiah` | `Input/InputNominalEnd.vue` |
| `GTextArea` | `Input/InputTextArea.vue` |
| `GDatePicker` | `Input/InputSmallDate.vue` |
| `GRangeDatePicker` | `Input/DateRangePicker.vue` |
| `GAlert` | `Alert/AlertVarian.vue` |
| `GAccordion`, `GAccordionItem` | `Accordion/*` |
| `GTable` | `Table/TableData.vue` |
| `GTablePagination` | `Table/TablePagination.vue` |
| `GFilePicker` | `Filepicker/FilePickerLG.vue` |
| `GRadio` | `Radio/Radio.vue` |
| `GBadge` | `Badge/Badge.vue` |
| `GCardContent` | `Card/CardContent.vue` |
| `GBreadcrumb` | `Breadcrumb/Breadcrumb.vue` |
| `GNavBackNavigator` | `Navbar/NavBackNavigator.vue` |
| `GBerandaHeader` | `Navbar/BerandaHeader.vue` |

Komponen lain yang tersedia tapi belum tentu dialias:

- `BottomSheet/GOffCanvas.vue`
- `Checkbox/CustomCheckbox.vue`
- `Input/InputSearch.vue`
- `Input/InputWithActionButton.vue`
- `Input/InputPhone.vue`
- `Input/InputDatePicker.vue`
- `Input/InputCamera.vue`
- `Table/TableSticky.vue`
- `Table/CustomTable.vue`
- `Navbar/NavbarCorporate.vue`
- `Navbar/SideNavCMS.vue`
- `Tooltip/TooltipComponent.vue`
- `Switch/Switch.vue`
- `Tab/*`
- `Chart/*`

Jika perlu komponen yang belum ada aliasnya, tambahkan alias di `src/components.ts` daripada import langsung berulang di tiap SFC.

## Checklist Implementasi Figma MCP

1. Ambil design context dari Figma.
2. Baca kebutuhan UI: navbar, breadcrumb, form, table, modal, bottomsheet, alert, card, button.
3. Cek `design.md` untuk aturan komponen.
4. Cek `src/components.ts` apakah komponen sudah punya alias `G*`.
5. Jika belum ada alias, cek folder `node_modules/kitvue-public/src/components`.
6. Gunakan komponen `kitvue-public` lebih dulu.
7. Pakai CSS variable `--g-kit-*` untuk color, typography, status, dan spacing visual.
8. Custom component hanya untuk komposisi domain project, bukan mengganti komponen library yang sudah tersedia.
9. Gunakan scoped CSS untuk layout wrapper, bukan restyling internal komponen kitvue.
10. Verifikasi responsive: desktop table boleh table, mobile gunakan card/bottomsheet bila pattern sudah ada.

## Mapping Status

| Status | Text | Background Ringan |
| --- | --- | --- |
| Success | `var(--g-kit-lime-50)` | `var(--g-kit-lime-10)` |
| Pending | `var(--g-kit-orange-50)` | `var(--g-kit-orange-10)` |
| Failed | `var(--g-kit-red-50)` | `var(--g-kit-red-10)` |
| Info | `var(--g-kit-blue-50)` | `var(--g-kit-blue-10)` |

## Catatan Untuk Project Ini

- Navbar/dashboard memakai `GBerandaHeader` sebagai dasar, lalu wrapper project mengatur posisi sesuai Figma.
- Breadcrumb memakai `GBreadcrumb` melalui wrapper `src/components/shared/breadcrumb/Breadcrumb.vue`.
- Back navigation memakai `GNavBackNavigator` melalui wrapper `src/components/shared/navBack/navBack.vue`.
- Alert global memakai `GAlert`/`AlertVarian` melalui host project.
- Table history memakai data dummy di `src/utils/data/transaction-history.mock.json`; struktur ini disiapkan agar mudah diganti response API.
