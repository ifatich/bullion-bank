# Design Documentation

> Based on component library: [ifatich4.github.io](https://ifatich4.github.io)  
> Total: **33 components**, documented with props rules per variant.
> Design token source: `kitvue-public/src/assets/scss/g-kit/*` and `kitvue-public/src/assets/scss/_variables.scss`.

---

## Design Token Reference

Gunakan token dari `kitvue-public` sebelum membuat style custom. Detail lengkap ada di [docs/kitvue-public-design-system.md](docs/kitvue-public-design-system.md), dan aturan implementasi frontend ada di [docs/frontend-implementation-rules.md](docs/frontend-implementation-rules.md).

### Token Sources

| Source | Purpose |
| --- | --- |
| `node_modules/kitvue-public/src/assets/scss/g-kit/_colors.scss` | Color palette dan CSS variable `--g-kit-*` |
| `node_modules/kitvue-public/src/assets/scss/g-kit/_typography.scss` | Font family, font size, line-height, font weight |
| `node_modules/kitvue-public/src/assets/scss/_variables.scss` | Baseline button, input, form, table, Bootstrap override |

### Core CSS Variables

| Usage | CSS Variable |
| --- | --- |
| Primary action | `var(--g-kit-lime-50)` |
| Primary hover | `var(--g-kit-lime-60)` |
| Primary active | `var(--g-kit-lime-80)` |
| Success | `var(--g-kit-lime-50)` |
| Pending/warning | `var(--g-kit-orange-50)` |
| Failed/danger | `var(--g-kit-red-50)` |
| Info | `var(--g-kit-blue-50)` |
| Text primary | `var(--g-kit-black-80)` |
| Text secondary | `var(--g-kit-black-60)` |
| Placeholder/tertiary | `var(--g-kit-black-50)` |
| Border neutral | `var(--g-kit-black-20)` |
| Surface light | `var(--g-kit-black-10)` atau `var(--g-kit-white)` |
| Brand dark surface | `var(--g-kit-broccoli-50)` sampai `var(--g-kit-broccoli-90)` |

### Typography Variables

| Token | CSS Variables |
| --- | --- |
| `zeta` | `var(--g-kit-font-size-zeta)` / `var(--g-kit-line-height-zeta)` |
| `kappa` | `var(--g-kit-font-size-kappa)` / `var(--g-kit-line-height-kappa)` |
| `lambda` | `var(--g-kit-font-size-lambda)` / `var(--g-kit-line-height-lambda)` |
| `omicron` | `var(--g-kit-font-size-omicron)` / `var(--g-kit-line-height-omicron)` |
| `sigma` | `var(--g-kit-font-size-sigma)` / `var(--g-kit-line-height-sigma)` |
| `omega` | `var(--g-kit-font-size-omega)` / `var(--g-kit-line-height-omega)` |
| `atom` | `var(--g-kit-font-size-atom)` / `var(--g-kit-line-height-atom)` |

Weight resmi yang tersedia dari `kitvue-public` hanya:

- `var(--g-kit-font-weight-normal)` = `600`
- `var(--g-kit-font-weight-bold)` = `800`

Jangan membuat hardcoded color, font-size, line-height, atau font-weight jika nilai tersebut sudah tersedia sebagai `--g-kit-*`.

---

## Table of Contents

1. [Accordion](#accordion)
2. [AddAmountCounter](#addamountcounter)
3. [Alert](#alert)
4. [Badge](#badge)
5. [BottomSheet](#bottomsheet)
6. [Breadcrumb](#breadcrumb)
7. [Button](#button)
8. [Card](#card)
9. [Chart](#chart)
10. [Checkbox](#checkbox)
11. [DatePicker](#datepicker)
12. [Dropdown](#dropdown)
13. [FilePicker](#filepicker)
14. [Filter](#filter)
15. [Header](#header)
16. [ImageView](#imageview)
17. [Input](#input)
18. [InputField](#inputfield)
19. [Label](#label)
20. [ListGroup](#listgroup)
21. [Loader](#loader)
22. [Modal](#modal)
23. [MonthPicker](#monthpicker)
24. [Navbar](#navbar)
25. [Navigation](#navigation)
26. [Radio](#radio)
27. [SelectOption](#selectoption)
28. [Stepper](#stepper)
29. [Switch](#switch)
30. [Tab](#tab)
31. [Table](#table)
32. [TimePicker](#timepicker)
33. [Tooltip](#tooltip)

---

## Accordion

Komponen collapsible untuk menampilkan konten yang dapat dibuka/tutup.

**Variants:** `Single` · `Group`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Judul header accordion |
| `content` | `string \| ReactNode` | — | Konten yang ditampilkan saat accordion terbuka |
| `defaultOpen` | `boolean` | `false` | Status awal accordion (terbuka/tertutup) |
| `disabled` | `boolean` | `false` | Nonaktifkan interaksi accordion |
| `onChange` | `(isOpen: boolean) => void` | — | Callback saat state berubah |

### Variant Rules

#### `Single`
- Hanya satu item accordion; membuka satu tidak menutup yang lain.
- `defaultOpen` dapat di-set `true` untuk membuka saat render.

#### `Group`
- Kumpulan beberapa accordion dalam satu container.
- Tambahan prop: `items: AccordionItem[]` — array of `{ title, content, disabled? }`
- Prop `defaultOpen` tidak berlaku di level root; set per-item di `items[n].defaultOpen`.
- Gunakan prop `exclusive?: boolean` (default `false`) untuk mode "hanya satu terbuka sekaligus".

---

## AddAmountCounter

Input counter untuk menambah/mengurangi jumlah nilai numerik.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Nilai saat ini |
| `min` | `number` | `0` | Nilai minimum yang diizinkan |
| `max` | `number` | `999` | Nilai maksimum yang diizinkan |
| `step` | `number` | `1` | Increment/decrement per aksi |
| `disabled` | `boolean` | `false` | Nonaktifkan counter |
| `onChange` | `(value: number) => void` | — | Callback saat nilai berubah |

### Variant Rules

#### `Default`
- Tampilkan tombol `−` dan `+` di kiri-kanan nilai.
- Tombol `−` di-disable saat `value === min`.
- Tombol `+` di-disable saat `value === max`.

---

## Alert

Komponen notifikasi inline untuk pesan status/feedback.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` | Tipe/severity alert |
| `title` | `string` | — | Judul pesan (opsional) |
| `message` | `string` | — | Isi pesan alert |
| `dismissible` | `boolean` | `false` | Tampilkan tombol close (×) |
| `onDismiss` | `() => void` | — | Callback saat alert ditutup |
| `icon` | `boolean` | `true` | Tampilkan icon sesuai tipe |

### Variant Rules

#### `Default`
- Gunakan warna sesuai `type`: hijau (success), kuning (warning), merah (error), biru (info).
- `dismissible={true}` wajib diimbangi dengan `onDismiss` handler.

---

## Badge

Label kecil untuk status, kategori, atau notifikasi angka.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string \| number` | — | Teks atau angka yang ditampilkan |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'neutral'` | Warna badge |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ukuran badge |
| `rounded` | `boolean` | `true` | Tampilan pill (rounded-full) |
| `dot` | `boolean` | `false` | Tampilkan dot indicator tanpa teks |

### Variant Rules

#### `Default`
- Jika `label` adalah angka > 99, tampilkan `"99+"`.
- `dot={true}` mengabaikan prop `label`.

---

## BottomSheet

Panel modal yang muncul dari bawah layar, umum untuk mobile.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Kontrol visibility bottom sheet |
| `onClose` | `() => void` | — | Callback saat sheet ditutup |
| `title` | `string` | — | Judul di header sheet (opsional) |
| `children` | `ReactNode` | — | Konten dalam sheet |
| `snapPoints` | `number[]` | `[0.5, 1]` | Titik snap sebagai fraksi tinggi layar |
| `backdrop` | `boolean` | `true` | Tampilkan overlay backdrop |
| `closeOnBackdrop` | `boolean` | `true` | Tutup sheet saat backdrop diklik |

### Variant Rules

#### `Default`
- Selalu sediakan `onClose` handler agar sheet bisa ditutup.
- `isOpen` dikontrol dari parent (controlled component).

---

## Breadcrumb

Navigasi hierarkis untuk menunjukkan posisi halaman saat ini.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | — | Array of `{ label: string, href?: string }` |
| `separator` | `string \| ReactNode` | `'/'` | Karakter pemisah antar item |
| `maxItems` | `number` | — | Jumlah maksimal item yang ditampilkan (sisanya collapse) |
| `activeIndex` | `number` | `items.length - 1` | Index item yang dianggap aktif (current page) |

### Variant Rules

#### `Default`
- Item terakhir (aktif) tidak perlu `href` dan tampil sebagai plain text.
- Item sebelumnya yang memiliki `href` tampil sebagai link.

---

## Button

Elemen aksi utama untuk interaksi pengguna.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Teks tombol |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Gaya visual tombol |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ukuran tombol |
| `disabled` | `boolean` | `false` | Nonaktifkan tombol |
| `loading` | `boolean` | `false` | Tampilkan spinner, nonaktifkan klik |
| `leftIcon` | `ReactNode` | — | Icon di kiri label |
| `rightIcon` | `ReactNode` | — | Icon di kanan label |
| `fullWidth` | `boolean` | `false` | Lebar 100% container |
| `onClick` | `() => void` | — | Handler klik |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML type attribute |

### Variant Rules

#### `Default`
- `loading={true}` otomatis set `disabled={true}` secara visual.
- Jangan set `label` kosong jika tidak ada `leftIcon` atau `rightIcon` (aksesibilitas).
- `type="submit"` digunakan dalam konteks form.

---

## Card

Container konten dengan border dan shadow.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Konten dalam card |
| `title` | `string` | — | Judul card di header (opsional) |
| `subtitle` | `string` | — | Subjudul di bawah title (opsional) |
| `footer` | `ReactNode` | — | Konten area footer card (opsional) |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Padding internal card |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Intensitas shadow card |
| `bordered` | `boolean` | `true` | Tampilkan border |
| `onClick` | `() => void` | — | Jadikan card clickable (opsional) |

### Variant Rules

#### `Default`
- Jika `onClick` disediakan, tambahkan `cursor-pointer` dan hover state.
- `title` dan `subtitle` render di header card sebelum `children`.

---

## Chart

Komponen visualisasi data berbasis chart.

**Variants:** `BarChart` · `DoughnutChart`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ChartData` | — | Dataset sesuai format Chart.js |
| `options` | `ChartOptions` | — | Konfigurasi chart (opsional) |
| `width` | `number \| string` | `'100%'` | Lebar chart |
| `height` | `number` | `300` | Tinggi chart dalam px |
| `title` | `string` | — | Judul chart (opsional) |
| `loading` | `boolean` | `false` | Tampilkan skeleton/loader |
| `emptyMessage` | `string` | `'Tidak ada data'` | Pesan saat data kosong |

### Variant Rules

#### `BarChart`
- `data.datasets[n].backgroundColor` direkomendasikan berupa array warna per bar.
- Tambahan prop: `horizontal?: boolean` — ubah orientasi jadi horizontal bar.
- Tambahan prop: `stacked?: boolean` — mode stacked bar chart.

#### `DoughnutChart`
- Tambahan prop: `centerLabel?: string` — teks di tengah donut.
- `data.labels` wajib diisi untuk legenda yang bermakna.

---

## Checkbox

Input boolean berbentuk kotak centang.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label teks di samping checkbox |
| `checked` | `boolean` | `false` | State tercentang (controlled) |
| `indeterminate` | `boolean` | `false` | State setengah tercentang (untuk select-all) |
| `disabled` | `boolean` | `false` | Nonaktifkan checkbox |
| `onChange` | `(checked: boolean) => void` | — | Callback saat state berubah |
| `error` | `string` | — | Pesan error di bawah checkbox |
| `required` | `boolean` | `false` | Tandai sebagai required |

### Variant Rules

#### `Default`
- `indeterminate` digunakan pada "select all" ketika sebagian item tercentang.
- `error` muncul dalam warna merah di bawah label.

---

## DatePicker

Input untuk memilih tanggal dari kalender.

**Variants:** `InputSmallDate` · `CalendarDropdown`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| string \| null` | `null` | Tanggal terpilih |
| `onChange` | `(date: Date \| null) => void` | — | Callback saat tanggal berubah |
| `placeholder` | `string` | `'Pilih tanggal'` | Placeholder input |
| `minDate` | `Date` | — | Tanggal minimum yang bisa dipilih |
| `maxDate` | `Date` | — | Tanggal maksimum yang bisa dipilih |
| `disabled` | `boolean` | `false` | Nonaktifkan input |
| `format` | `string` | `'DD/MM/YYYY'` | Format tampilan tanggal |
| `error` | `string` | — | Pesan error |
| `label` | `string` | — | Label di atas input |
| `required` | `boolean` | `false` | Tandai sebagai required |

### Variant Rules

#### `InputSmallDate`
- Ukuran lebih compact, cocok untuk form inline atau tabel.
- Tidak menampilkan label di atas, hanya input field.

#### `CalendarDropdown`
- Menampilkan kalender penuh dalam dropdown.
- Mendukung navigasi bulan/tahun dengan arrow.
- Tambahan prop: `showMonthYearPicker?: boolean` untuk jump ke bulan/tahun.

---

## Dropdown

Komponen pilihan dari daftar item yang muncul saat diklik.

**Variants:** `Default` · `DropdownItem` · `DropdownGroupItem` · `DropdownHeader` · `InputDropdownMultiple`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactNode` | — | Elemen pemicu dropdown |
| `items` | `DropdownItem[]` | — | Daftar item dropdown |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Posisi dropdown |
| `disabled` | `boolean` | `false` | Nonaktifkan dropdown |
| `onSelect` | `(item: DropdownItem) => void` | — | Callback saat item dipilih |
| `closeOnSelect` | `boolean` | `true` | Tutup dropdown setelah item dipilih |

### Variant Rules

#### `Default`
- `items` adalah array `{ label: string, value: any, disabled?: boolean, icon?: ReactNode }`.

#### `DropdownItem`
- Sub-komponen individual yang digunakan di dalam `Default`.
- Props: `label`, `value`, `disabled`, `icon`, `onClick`.

#### `DropdownGroupItem`
- Mengelompokkan beberapa `DropdownItem` dengan header grup.
- Props: `groupLabel: string`, `items: DropdownItem[]`.

#### `DropdownHeader`
- Header non-interaktif di dalam dropdown sebagai pemisah/judul seksi.
- Props: `label: string`.

#### `InputDropdownMultiple`
- Dropdown dengan fitur multiple selection + input pencarian.
- Tambahan props: `value: any[]`, `onChange: (values: any[]) => void`, `searchable?: boolean`, `maxSelected?: number`.

---

## FilePicker

Komponen upload file dengan preview dan validasi.

**Variants:** `Default` · `FilePickerLG` · `FilePickerSM` · `ImagePickerWithCamera`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | `'*'` | Tipe file yang diterima (MIME type) |
| `multiple` | `boolean` | `false` | Izinkan multiple file |
| `maxSize` | `number` | — | Ukuran maksimum file dalam bytes |
| `maxFiles` | `number` | — | Jumlah maksimum file |
| `disabled` | `boolean` | `false` | Nonaktifkan file picker |
| `onChange` | `(files: File[]) => void` | — | Callback saat file dipilih |
| `onError` | `(error: string) => void` | — | Callback saat terjadi error validasi |
| `preview` | `boolean` | `true` | Tampilkan preview file terpilih |
| `label` | `string` | — | Label di atas input |

### Variant Rules

#### `Default`
- Tampil sebagai dropzone sedang, drag-and-drop + click to browse.

#### `FilePickerLG`
- Ukuran dropzone besar, cocok untuk hero upload area.
- Tampilkan instruksi lebih detail (tipe file, ukuran maks).

#### `FilePickerSM`
- Ukuran compact berupa tombol kecil, cocok untuk form inline.
- Preview hanya nama file tanpa thumbnail.

#### `ImagePickerWithCamera`
- Khusus gambar (`accept="image/*"`).
- Tambahan opsi: kamera device (`capture="environment"`).
- Tampilkan preview thumbnail gambar terpilih.

---

## Filter

Komponen untuk memfilter data dengan satu atau beberapa kriteria.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filters` | `FilterOption[]` | — | Array opsi filter `{ label, value, type? }` |
| `value` | `any` | — | Nilai filter aktif (controlled) |
| `onChange` | `(value: any) => void` | — | Callback saat filter berubah |
| `placeholder` | `string` | `'Filter'` | Teks placeholder |
| `multiple` | `boolean` | `false` | Izinkan multiple filter aktif |
| `clearable` | `boolean` | `true` | Tampilkan tombol reset filter |

### Variant Rules

#### `Default`
- `clearable={true}` menampilkan tombol "Reset" atau "×" untuk menghapus filter.

---

## Header

Header halaman atau section, biasanya berisi judul dan aksi.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Judul utama header |
| `subtitle` | `string` | — | Teks sekunder di bawah judul (opsional) |
| `leftAction` | `ReactNode` | — | Elemen di sisi kiri (tombol back, dsb) |
| `rightAction` | `ReactNode` | — | Elemen di sisi kanan (tombol aksi, dsb) |
| `sticky` | `boolean` | `false` | Header tetap di atas saat scroll |
| `bordered` | `boolean` | `false` | Tampilkan border bawah |

### Variant Rules

#### `Default`
- `sticky={true}` menggunakan `position: sticky; top: 0` dengan z-index yang sesuai.

---

## ImageView

Komponen untuk menampilkan gambar dengan fallback dan lazy loading.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | URL sumber gambar |
| `alt` | `string` | — | Alt text gambar (wajib untuk aksesibilitas) |
| `width` | `number \| string` | — | Lebar gambar |
| `height` | `number \| string` | — | Tinggi gambar |
| `fallback` | `string \| ReactNode` | — | Tampilan saat gambar gagal dimuat |
| `lazy` | `boolean` | `true` | Aktifkan lazy loading |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'none'` | Border radius gambar |
| `objectFit` | `'cover' \| 'contain' \| 'fill'` | `'cover'` | CSS object-fit |

### Variant Rules

#### `Default`
- `alt` selalu wajib diisi untuk aksesibilitas (screen reader).
- `fallback` ditampilkan saat `src` error atau kosong.

---

## Input

Input field generik untuk berbagai jenis teks.

**Variants:** `Default` · `InputKTP` · `InputMonth` · `InputSearch` · `InputSearchQR` · `InputSmallText` · `InputTimePicker` · `InputWithActionButton`

### Props (Base)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Nilai input (controlled) |
| `onChange` | `(value: string) => void` | — | Callback saat nilai berubah |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Nonaktifkan input |
| `readOnly` | `boolean` | `false` | Mode read-only |
| `error` | `string` | — | Pesan error |
| `label` | `string` | — | Label di atas input |
| `required` | `boolean` | `false` | Tandai sebagai required |
| `leftAddon` | `ReactNode` | — | Elemen di dalam input, sisi kiri |
| `rightAddon` | `ReactNode` | — | Elemen di dalam input, sisi kanan |

### Variant Rules

#### `Default`
- Input teks standar tanpa format khusus.

#### `InputKTP`
- Otomatis format 16 digit NIK KTP.
- Prop tambahan: `maxLength` default `16`, hanya menerima angka.

#### `InputMonth`
- Input untuk memilih bulan dalam format `MM/YYYY`.
- Prop tambahan: `minMonth?: string`, `maxMonth?: string`.

#### `InputSearch`
- Icon 🔍 di sisi kiri sebagai `leftAddon`.
- Prop tambahan: `onSearch?: (value: string) => void` — trigger saat Enter.
- Prop tambahan: `clearable?: boolean` — tampilkan tombol clear (×).

#### `InputSearchQR`
- Kombinasi input search + tombol scan QR di kanan.
- Prop tambahan: `onScanQR?: () => void` — callback buka scanner QR.

#### `InputSmallText`
- Ukuran lebih compact (padding dan font lebih kecil), untuk form dense.

#### `InputTimePicker`
- Input khusus waktu format `HH:MM`.
- Prop tambahan: `format?: '12h' \| '24h'`, default `'24h'`.

#### `InputWithActionButton`
- Input dengan tombol aksi terintegrasi di sisi kanan.
- Prop tambahan: `actionLabel: string`, `onAction: () => void`.

---

## InputField

Input field dengan fitur lebih lengkap: label, helper text, counter.

**Variants:** `Default` · `TextArea` · `Search` · `NIK` · `NominalEnd`

### Props (Base)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Nilai field (controlled) |
| `onChange` | `(value: string) => void` | — | Callback saat nilai berubah |
| `label` | `string` | — | Label atas input |
| `placeholder` | `string` | — | Placeholder text |
| `helperText` | `string` | — | Teks bantuan di bawah input |
| `error` | `string` | — | Pesan error (override helperText) |
| `required` | `boolean` | `false` | Tandai as required dengan asterisk |
| `disabled` | `boolean` | `false` | Nonaktifkan field |
| `maxLength` | `number` | — | Panjang karakter maksimum |
| `showCounter` | `boolean` | `false` | Tampilkan counter karakter (X/max) |

### Variant Rules

#### `Default`
- Input teks satu baris standar.

#### `TextArea`
- Multi-baris. Prop tambahan: `rows?: number` (default `3`), `resize?: boolean` (default `true`).
- `showCounter` sangat direkomendasikan untuk textarea berkarakter terbatas.

#### `Search`
- Dengan icon search terintegrasi.
- Prop tambahan: `onClear?: () => void`.

#### `NIK`
- Khusus Nomor Induk Kependudukan 16 digit.
- Format otomatis, hanya angka. `maxLength` fixed `16`.

#### `NominalEnd`
- Input dengan satuan/suffix di akhir (contoh: "IDR", "%").
- Prop tambahan: `suffix: string` — teks unit yang muncul di kanan.

---

## Label

Teks label kecil sebagai keterangan atau penanda.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Isi teks label |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Warna label |
| `size` | `'xs' \| 'sm' \| 'md'` | `'sm'` | Ukuran font |
| `required` | `boolean` | `false` | Tampilkan asterisk merah |
| `htmlFor` | `string` | — | Asociasi dengan input via `for` attribute |

### Variant Rules

#### `Default`
- Gunakan `htmlFor` agar label dapat diklik untuk fokus ke input terkait.

---

## ListGroup

Daftar item dalam format terurut atau tak terurut.

**Variants:** `Ordered` · `Unordered`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ListItem[]` | — | Array of `{ label: string, icon?: ReactNode, onClick?: () => void }` |
| `divided` | `boolean` | `true` | Tampilkan divider antar item |
| `hoverable` | `boolean` | `false` | Aktifkan hover state per item |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ukuran padding item |

### Variant Rules

#### `Ordered`
- Item ditampilkan dengan angka urut (1, 2, 3...).
- Prop tambahan: `startFrom?: number` (default `1`).

#### `Unordered`
- Item ditampilkan dengan bullet atau icon kustom.
- Prop tambahan: `bulletStyle?: 'disc' \| 'dash' \| 'none'` (default `'disc'`).

---

## Loader

Indikator loading saat konten sedang dimuat.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ukuran loader |
| `color` | `string` | — | Warna loader (CSS color) |
| `label` | `string` | — | Teks di bawah loader (opsional) |
| `overlay` | `boolean` | `false` | Tampilkan loader sebagai full-screen overlay |
| `fullPage` | `boolean` | `false` | Center loader di tengah halaman |

### Variant Rules

#### `Default`
- Spinner animasi melingkar.
- `overlay={true}` cocok untuk blocking UI saat proses async.

---

## Modal

Dialog overlay untuk konten atau konfirmasi.

**Variants:** `Default` · `CustomModal` · `Slider`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Kontrol visibility modal |
| `onClose` | `() => void` | — | Callback saat modal ditutup |
| `title` | `string` | — | Judul di header modal |
| `children` | `ReactNode` | — | Konten modal |
| `footer` | `ReactNode` | — | Konten footer modal (tombol aksi) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Lebar modal |
| `closeOnBackdrop` | `boolean` | `true` | Tutup modal saat backdrop diklik |
| `closeOnEsc` | `boolean` | `true` | Tutup modal saat Escape ditekan |
| `centered` | `boolean` | `true` | Posisikan modal di tengah layar |

### Variant Rules

#### `Default`
- Modal standar dengan header, body, dan footer.

#### `CustomModal`
- Tanpa header/footer bawaan; seluruh konten dikontrol via `children`.
- Cocok untuk layout modal yang tidak standar.

#### `Slider`
- Modal yang muncul dari sisi layar (slide-in panel).
- Prop tambahan: `side?: 'left' \| 'right'` (default `'right'`), `width?: string`.

---

## MonthPicker

Input untuk memilih bulan dan tahun.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `{ month: number, year: number } \| null` | `null` | Nilai terpilih |
| `onChange` | `(value: { month: number, year: number }) => void` | — | Callback saat berubah |
| `placeholder` | `string` | `'Pilih bulan'` | Placeholder input |
| `minMonth` | `{ month: number, year: number }` | — | Batas minimum |
| `maxMonth` | `{ month: number, year: number }` | — | Batas maksimum |
| `disabled` | `boolean` | `false` | Nonaktifkan picker |
| `label` | `string` | — | Label input |
| `error` | `string` | — | Pesan error |

### Variant Rules

#### `Default`
- Tampilkan grid bulan (Jan–Des) dengan navigasi tahun via panah kiri/kanan.

---

## Navbar

Navigasi utama aplikasi (sidebar atau top bar).

**Variants:** `SideNavCMS`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `NavItem[]` | — | Daftar menu navigasi |
| `activeId` | `string` | — | ID item yang sedang aktif |
| `onNavigate` | `(item: NavItem) => void` | — | Callback saat item diklik |
| `logo` | `ReactNode` | — | Logo/brand di atas sidebar |
| `collapsed` | `boolean` | `false` | Mode collapsed (hanya icon) |
| `onToggleCollapse` | `() => void` | — | Callback toggle collapsed |

### Variant Rules

#### `SideNavCMS`
- Sidebar vertikal untuk aplikasi CMS/admin panel.
- `items` support `{ id, label, icon, children?: NavItem[] }` untuk nested menu.
- `collapsed={true}` menyembunyikan label, hanya tampilkan icon + tooltip.

---

## Navigation

Navigasi tab atau menu horizontal inline.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `NavItem[]` | — | Array of `{ id, label, href?, disabled? }` |
| `activeId` | `string` | — | ID item aktif |
| `onChange` | `(id: string) => void` | — | Callback saat item dipilih |
| `variant` | `'tabs' \| 'pills' \| 'underline'` | `'underline'` | Gaya visual navigasi |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ukuran navigasi |

### Variant Rules

#### `Default`
- Item dengan `disabled: true` tidak dapat diklik, tampil dengan opacity rendah.

---

## Radio

Input pilihan tunggal dari beberapa opsi.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `RadioOption[]` | — | Array of `{ label, value, disabled? }` |
| `value` | `any` | — | Nilai terpilih (controlled) |
| `onChange` | `(value: any) => void` | — | Callback saat pilihan berubah |
| `name` | `string` | — | HTML name attribute (wajib untuk aksesibilitas) |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Arah susunan opsi |
| `disabled` | `boolean` | `false` | Nonaktifkan semua opsi |
| `error` | `string` | — | Pesan error |
| `label` | `string` | — | Label grup radio |
| `required` | `boolean` | `false` | Tandai sebagai required |

### Variant Rules

#### `Default`
- `name` wajib diisi agar browser mengelompokkan radio sebagai satu grup.

---

## SelectOption

Dropdown select untuk memilih dari daftar opsi.

**Variants:** `Default` · `AutoComplete`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOptionItem[]` | — | Array of `{ label, value, disabled? }` |
| `value` | `any` | — | Nilai terpilih (controlled) |
| `onChange` | `(value: any) => void` | — | Callback saat pilihan berubah |
| `placeholder` | `string` | `'Pilih opsi'` | Placeholder saat belum ada pilihan |
| `disabled` | `boolean` | `false` | Nonaktifkan select |
| `label` | `string` | — | Label di atas select |
| `error` | `string` | — | Pesan error |
| `required` | `boolean` | `false` | Tandai sebagai required |
| `clearable` | `boolean` | `false` | Tampilkan tombol clear pilihan |
| `multiple` | `boolean` | `false` | Izinkan multiple selection |

### Variant Rules

#### `Default`
- Dropdown select standar, pilih satu opsi.

#### `AutoComplete`
- Input dengan fitur pencarian/filter opsi saat mengetik.
- Prop tambahan: `searchable?: boolean` (default `true`), `noOptionsMessage?: string`.
- Mendukung async: `loadOptions?: (inputValue: string) => Promise<SelectOptionItem[]>`.

---

## Stepper

Indikator langkah dalam proses multi-step.

**Variants:** `Default` · `Side Stepper`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepItem[]` | — | Array of `{ label, description?, status?: 'completed' \| 'active' \| 'pending' \| 'error' }` |
| `activeStep` | `number` | `0` | Index langkah aktif (0-based) |
| `onChange` | `(index: number) => void` | — | Callback saat step diklik (jika clickable) |
| `clickable` | `boolean` | `false` | Izinkan navigasi klik antar step |
| `showConnector` | `boolean` | `true` | Tampilkan garis penghubung antar step |

### Variant Rules

#### `Default`
- Stepper horizontal di atas halaman/form.

#### `Side Stepper`
- Stepper vertikal di sisi kiri halaman (sidebar step).
- Cocok untuk wizard/form panjang dengan banyak langkah.

---

## Switch

Toggle boolean on/off.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | State aktif (controlled) |
| `onChange` | `(checked: boolean) => void` | — | Callback saat state berubah |
| `label` | `string` | — | Label di samping switch |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Posisi label relatif switch |
| `disabled` | `boolean` | `false` | Nonaktifkan switch |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ukuran switch |

### Variant Rules

#### `Default`
- Selalu gunakan dalam mode controlled (sediakan `checked` + `onChange`).

---

## Tab

Navigasi tab untuk mengganti konten dalam area yang sama.

**Variants:** `Default` · `TabKategori`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | — | Array of `{ id, label, content: ReactNode, disabled?, badge? }` |
| `activeId` | `string` | — | ID tab aktif (controlled) |
| `onChange` | `(id: string) => void` | — | Callback saat tab berubah |
| `variant` | `'line' \| 'enclosed' \| 'pills'` | `'line'` | Gaya visual tab |
| `fullWidth` | `boolean` | `false` | Tab memenuhi lebar container |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ukuran tab |

### Variant Rules

#### `Default`
- Tab standar dengan garis bawah pada tab aktif.
- `badge` pada `TabItem` menampilkan Badge kecil di kanan label tab.

#### `TabKategori`
- Tab berbentuk pill/chip, cocok untuk filter kategori.
- `variant` default `'pills'`.
- Biasanya digunakan horizontal scroll pada mobile.

---

## Table

Tabel data dengan fitur sorting, pagination, dan seleksi.

**Variants:** `DataTable` · `Pagination`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `Column[]` | — | Definisi kolom: `{ key, label, sortable?, width?, render? }` |
| `data` | `object[]` | — | Array data baris |
| `loading` | `boolean` | `false` | Tampilkan skeleton loading |
| `emptyMessage` | `string` | `'Tidak ada data'` | Pesan saat data kosong |
| `selectable` | `boolean` | `false` | Aktifkan checkbox per baris |
| `selectedRows` | `any[]` | `[]` | Array key baris terpilih |
| `onSelectionChange` | `(rows: any[]) => void` | — | Callback seleksi berubah |
| `rowKey` | `string` | `'id'` | Key unik per baris |
| `onRowClick` | `(row: object) => void` | — | Callback saat baris diklik |
| `stickyHeader` | `boolean` | `false` | Header tetap saat scroll vertikal |

### Variant Rules

#### `DataTable`
- Tabel lengkap dengan sorting, filter kolom, dan fitur ekspor (opsional).
- Prop tambahan: `sortBy?: string`, `sortOrder?: 'asc' \| 'desc'`, `onSort?: (key, order) => void`.

#### `Pagination`
- Sub-komponen atau variant yang fokus pada navigasi halaman.
- Props: `currentPage: number`, `totalPages: number`, `onPageChange: (page: number) => void`, `pageSize?: number`, `totalItems?: number`, `showInfo?: boolean`.

---

## TimePicker

Input untuk memilih waktu.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| null` | `null` | Waktu terpilih format `HH:MM` |
| `onChange` | `(time: string) => void` | — | Callback saat waktu berubah |
| `placeholder` | `string` | `'Pilih waktu'` | Placeholder input |
| `format` | `'12h' \| '24h'` | `'24h'` | Format waktu |
| `minTime` | `string` | — | Waktu minimum (`HH:MM`) |
| `maxTime` | `string` | — | Waktu maksimum (`HH:MM`) |
| `disabled` | `boolean` | `false` | Nonaktifkan input |
| `label` | `string` | — | Label input |
| `error` | `string` | — | Pesan error |
| `minuteStep` | `number` | `1` | Interval menit (1, 5, 10, 15, 30) |

### Variant Rules

#### `Default`
- Tampilkan dropdown jam:menit atau input langsung.
- `minuteStep={15}` umum digunakan untuk booking/appointment.

---

## Tooltip

Label informatif kecil yang muncul saat hover/fokus pada elemen.

**Variants:** `Default`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| ReactNode` | — | Konten dalam tooltip |
| `children` | `ReactNode` | — | Elemen target yang memicu tooltip |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posisi tooltip relatif target |
| `trigger` | `'hover' \| 'click' \| 'focus'` | `'hover'` | Event pemicu tooltip |
| `delay` | `number` | `200` | Delay munculnya tooltip dalam ms |
| `disabled` | `boolean` | `false` | Nonaktifkan tooltip |
| `maxWidth` | `number` | `200` | Lebar maksimum tooltip dalam px |
| `arrow` | `boolean` | `true` | Tampilkan panah penunjuk |

### Variant Rules

#### `Default`
- `trigger="hover"` untuk informasi tambahan non-kritis.
- `trigger="click"` untuk tooltip interaktif atau pada mobile.
- Hindari tooltip untuk informasi yang wajib dibaca pengguna — gunakan Alert atau helperText.

---

## Konvensi Umum

### Prop Naming
- State boolean: `isOpen`, `disabled`, `loading`, `required`, `checked`
- Callback: `onChange`, `onClose`, `onClick`, `onSelect`, `onNavigate`
- Konten: `children`, `label`, `title`, `placeholder`
- Styling: `size`, `variant`, `fullWidth`

### Controlled vs Uncontrolled
Semua komponen form (`Input`, `Checkbox`, `Switch`, `Radio`, `SelectOption`, dll.) menggunakan **controlled pattern** — selalu sediakan `value` + `onChange`.

### Aksesibilitas
- Setiap form element wajib memiliki `label` atau `aria-label`.
- Gunakan `htmlFor` pada `<Label>` untuk asosiasi dengan input.
- Prop `name` wajib pada `<Radio>`.
- `alt` wajib pada `<ImageView>`.

### Error Handling
Prop `error: string` tersedia di semua komponen form. Saat `error` terisi:
- Border input berubah warna merah.
- Pesan error tampil di bawah input menggantikan `helperText`.
