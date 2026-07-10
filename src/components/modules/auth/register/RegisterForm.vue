<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'

import { GButton, GDatePicker, GDropdown, GFilePicker, GInputText, GTextArea } from '@/components'
import { uniqueDatePickerFields as vUniqueDatePickerFields } from '@/directives/uniqueDatePickerFields'
import { useAppAlert } from '@/hooks/useAppAlert'
const router = useRouter()
const currentStep = ref(1)
const submitting = ref(false)
const { showAlert } = useAppAlert()
const isMobile = useMediaQuery('(max-width: 768px)')

const emit = defineEmits<{
  (e: 'submit', payload: Record<string, any>): void
}>()

const form = reactive({
  // Step 1 — Data Perusahaan
  businessName: '',
  directorName: '',
  companyEmail: '',
  nibNumber: '',
  nibFile: null as File | null,
  npwpNumber: '',
  npwpFile: null as File | null,

  // Step 2 — Data Akta
  deedNo: '',
  deedFile: null as File | null,
  deedDate: '',
  latestDeedNo: '',
  latestDeedFile: null as File | null,
  latestDeedDate: '',

  // Step 3 — Alamat
  companyAddress: '',
  province: '',
  city: '',
  district: '',
  subDistrict: '',
  rt: '',
  rw: '',

  // Step 4 — Data Pengurus
  adminName: '',
  adminNik: '',
  adminNikFile: null as File | null,
  adminNpwp: '',
  adminNpwpFile: null as File | null,
  adminPhone: '',

  // Step 5 — Data Pelaksana Transaksi
  executorName: '',
  executorNik: '',
  executorNikFile: null as File | null,
  executorNpwp: '',
  executorNpwpFile: null as File | null,
  executorPhone: '',

  // Step 6 — Akun (login credentials)
  password: '',
  konfirmasiPassword: '',
})

/**
 * Tracks which fields have been interacted with (blurred).
 * Validation errors only display after the user has touched a field.
 */
const touched = reactive<Record<string, boolean>>({})

/** Mark a field as touched on blur */
const onBlur = (field: string) => {
  touched[field] = true
}

/** Show/hide password toggles */
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const provinceItems = ref<{ value: string; label: string }[]>([])
const cityItems = ref<{ value: string; label: string }[]>([])
const districtItems = ref<{ value: string; label: string }[]>([])
const subDistrictItems = ref<{ value: string; label: string }[]>([])

const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

const fetchProvinces = async () => {
  try {
    const res = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
    const data = await res.json()
    provinceItems.value = data.map((item: any) => ({
      value: item.id,
      label: toTitleCase(item.name),
    }))
  } catch (error) {
    console.error('Failed to fetch provinces:', error)
  }
}

const fetchCities = async (provinceId: string) => {
  if (!provinceId) {
    cityItems.value = []
    return
  }
  try {
    const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
    const data = await res.json()
    cityItems.value = data.map((item: any) => ({
      value: item.id,
      label: toTitleCase(item.name),
    }))
  } catch (error) {
    console.error('Failed to fetch cities:', error)
  }
}

const fetchDistricts = async (cityId: string) => {
  if (!cityId) {
    districtItems.value = []
    return
  }
  try {
    const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`)
    const data = await res.json()
    districtItems.value = data.map((item: any) => ({
      value: item.id,
      label: toTitleCase(item.name),
    }))
  } catch (error) {
    console.error('Failed to fetch districts:', error)
  }
}

const fetchSubDistricts = async (districtId: string) => {
  if (!districtId) {
    subDistrictItems.value = []
    return
  }
  try {
    const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`)
    const data = await res.json()
    subDistrictItems.value = data.map((item: any) => ({
      value: item.id,
      label: toTitleCase(item.name),
    }))
  } catch (error) {
    console.error('Failed to fetch sub-districts:', error)
  }
}

onMounted(() => {
  fetchProvinces()
})

watch(() => form.province, (newVal) => {
  form.city = ''
  form.district = ''
  form.subDistrict = ''
  fetchCities(newVal)
})

watch(() => form.city, (newVal) => {
  form.district = ''
  form.subDistrict = ''
  fetchDistricts(newVal)
})

watch(() => form.district, (newVal) => {
  form.subDistrict = ''
  fetchSubDistricts(newVal)
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const numericOnlyPattern = /^\d+$/
const alphabetOnlyPattern = /^[a-zA-Z\s.,'-]+$/
const passwordMinLength = 8

// Helper validation functions
const formatNumericSpaced = (val: string) => {
  // If value contains non-digits (like slashes or dashes), do not format with spaces
  if (/[^\d\s]/.test(val)) {
    return val
  }
  const digits = val.replace(/\D/g, '')
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

// Watchers to apply space formatting on numerical fields
watch(() => form.nibNumber, (newVal) => {
  form.nibNumber = formatNumericSpaced(newVal)
})
watch(() => form.npwpNumber, (newVal) => {
  form.npwpNumber = formatNumericSpaced(newVal)
})
watch(() => form.deedNo, (newVal) => {
  form.deedNo = formatNumericSpaced(newVal)
})
watch(() => form.latestDeedNo, (newVal) => {
  form.latestDeedNo = formatNumericSpaced(newVal)
})
watch(() => form.rt, (newVal) => {
  form.rt = formatNumericSpaced(newVal)
})
watch(() => form.rw, (newVal) => {
  form.rw = formatNumericSpaced(newVal)
})
watch(() => form.adminNik, (newVal) => {
  form.adminNik = formatNumericSpaced(newVal)
})
watch(() => form.adminNpwp, (newVal) => {
  form.adminNpwp = formatNumericSpaced(newVal)
})
watch(() => form.adminPhone, (newVal) => {
  form.adminPhone = formatNumericSpaced(newVal)
})
watch(() => form.executorNik, (newVal) => {
  form.executorNik = formatNumericSpaced(newVal)
})
watch(() => form.executorNpwp, (newVal) => {
  form.executorNpwp = formatNumericSpaced(newVal)
})
watch(() => form.executorPhone, (newVal) => {
  form.executorPhone = formatNumericSpaced(newVal)
})

/**
 * Blocks non-digit keystrokes on numeric-only input fields.
 * Allows navigation keys, editing keys, and modifier combos (Ctrl/Cmd+A/C/V/X).
 */
const onlyAllowDigits = (event: KeyboardEvent) => {
  // Special/control keys have multi-char names (e.g. "Backspace", "ArrowLeft")
  if (event.ctrlKey || event.metaKey || event.altKey || event.key.length > 1) {
    return
  }
  if (!/^\d$/.test(event.key)) {
    event.preventDefault()
  }
}

/**
 * Strips non-digit characters from pasted text on numeric-only input fields.
 */
const handleNumericPaste = (event: ClipboardEvent) => {
  const pastedText = event.clipboardData?.getData('text') ?? ''
  if (/\D/.test(pastedText)) {
    event.preventDefault()
    const digitsOnly = pastedText.replace(/\D/g, '')
    if (!digitsOnly) return
    const target = event.target as HTMLInputElement
    const start = target.selectionStart ?? 0
    const end = target.selectionEnd ?? 0
    const current = target.value
    const newValue = current.slice(0, start) + digitsOnly + current.slice(end)
    target.value = newValue
    target.dispatchEvent(new Event('input', { bubbles: true }))
    const cursorPos = start + digitsOnly.length
    target.setSelectionRange(cursorPos, cursorPos)
  }
}

const validateNumeric = (val: string, length?: number) => {
  const cleanVal = val.replace(/\s/g, '')
  if (!numericOnlyPattern.test(cleanVal)) return false
  if (length !== undefined && cleanVal.length !== length) return false
  return true
}

const validatePhone = (val: string) => {
  const cleanVal = val.replace(/\s/g, '')
  return numericOnlyPattern.test(cleanVal) && cleanVal.length >= 9 && cleanVal.length <= 15
}

const validateName = (val: string) => {
  return alphabetOnlyPattern.test(val) && val.trim().length >= 2
}

const validatePassword = (val: string) => {
  return val.length >= passwordMinLength
}

const validateConfirmPassword = (val: string) => {
  return val === form.password && val.length > 0
}

// ──────────────────────────────────────────────────
// Per-field error messages (only shown when touched)
// ──────────────────────────────────────────────────
const fieldErrors = computed(() => {
  const errors: Record<string, string> = {}

  // Step 1
  if (touched.businessName && !form.businessName.trim()) {
    errors.businessName = 'Nama badan usaha wajib diisi'
  }
  if (touched.directorName) {
    if (!form.directorName.trim()) errors.directorName = 'Nama direktur wajib diisi'
    else if (!validateName(form.directorName)) errors.directorName = 'Nama hanya boleh berisi huruf, minimal 2 karakter'
  }
  if (touched.companyEmail) {
    if (!form.companyEmail.trim()) errors.companyEmail = 'Email perusahaan wajib diisi'
    else if (!emailPattern.test(form.companyEmail)) errors.companyEmail = 'Format email tidak valid'
  }
  if (touched.password) {
    if (!form.password) errors.password = 'Password wajib diisi'
    else {
      const passwordValid = form.password.length >= 8 && /[A-Za-z]/.test(form.password) && /\d/.test(form.password)
      if (!passwordValid) errors.password = 'Password minimal 8 karakter, huruf & angka'
    }
  }
  if (touched.konfirmasiPassword) {
    if (!form.konfirmasiPassword) errors.konfirmasiPassword = 'Konfirmasi password wajib diisi'
    else if (form.password !== form.konfirmasiPassword) errors.konfirmasiPassword = 'Password tidak sama'
  }
  if (touched.nibNumber) {
    if (!form.nibNumber.trim()) errors.nibNumber = 'Nomor NIB wajib diisi'
    else if (!validateNumeric(form.nibNumber, 13)) errors.nibNumber = 'NIB harus 13 digit angka'
  }
  if (touched.nibFile && !form.nibFile) {
    errors.nibFile = 'File NIB wajib diunggah'
  }
  if (touched.npwpNumber) {
    if (!form.npwpNumber.trim()) errors.npwpNumber = 'Nomor NPWP wajib diisi'
    else if (!validateNumeric(form.npwpNumber, 15) && !validateNumeric(form.npwpNumber, 16)) errors.npwpNumber = 'NPWP harus 15 atau 16 digit angka'
  }
  if (touched.npwpFile && !form.npwpFile) {
    errors.npwpFile = 'File NPWP wajib diunggah'
  }

  // Step 2
  if (touched.deedNo && !form.deedNo.trim()) errors.deedNo = 'No Akta Pendirian wajib diisi'
  if (touched.deedFile && !form.deedFile) errors.deedFile = 'File Akta Pendirian wajib diunggah'
  if (touched.deedDate && !form.deedDate) errors.deedDate = 'Tanggal Akta Pendirian wajib dipilih'
  if (touched.latestDeedNo && !form.latestDeedNo.trim()) errors.latestDeedNo = 'No Akta Terakhir wajib diisi'
  if (touched.latestDeedFile && !form.latestDeedFile) errors.latestDeedFile = 'File Akta Terakhir wajib diunggah'
  if (touched.latestDeedDate && !form.latestDeedDate) errors.latestDeedDate = 'Tanggal Akta Terakhir wajib dipilih'

  // Step 3
  if (touched.companyAddress && !form.companyAddress.trim()) errors.companyAddress = 'Alamat perusahaan wajib diisi'
  if (touched.province && !form.province) errors.province = 'Provinsi wajib dipilih'
  if (touched.city && !form.city) errors.city = 'Kota/Kabupaten wajib dipilih'
  if (touched.district && !form.district) errors.district = 'Kecamatan wajib dipilih'
  if (touched.subDistrict && !form.subDistrict) errors.subDistrict = 'Kelurahan wajib dipilih'
  if (touched.rt) {
    if (!form.rt.trim()) errors.rt = 'RT wajib diisi'
    else if (!validateNumeric(form.rt)) errors.rt = 'RT harus berupa angka'
  }
  if (touched.rw) {
    if (!form.rw.trim()) errors.rw = 'RW wajib diisi'
    else if (!validateNumeric(form.rw)) errors.rw = 'RW harus berupa angka'
  }

  // Step 4
  if (touched.adminName) {
    if (!form.adminName.trim()) errors.adminName = 'Nama pengurus wajib diisi'
    else if (!validateName(form.adminName)) errors.adminName = 'Nama hanya boleh berisi huruf, minimal 2 karakter'
  }
  if (touched.adminPhone) {
    if (!form.adminPhone.trim()) errors.adminPhone = 'No HP pengurus wajib diisi'
    else if (!validatePhone(form.adminPhone)) errors.adminPhone = 'Nomor telepon harus 9–15 digit angka'
  }
  if (touched.adminNik) {
    if (!form.adminNik.trim()) errors.adminNik = 'NIK pengurus wajib diisi'
    else if (!validateNumeric(form.adminNik, 16)) errors.adminNik = 'NIK harus 16 digit angka'
  }
  if (touched.adminNikFile && !form.adminNikFile) errors.adminNikFile = 'File KTP pengurus wajib diunggah'
  if (touched.adminNpwp) {
    if (!form.adminNpwp.trim()) errors.adminNpwp = 'NPWP pengurus wajib diisi'
    else if (!validateNumeric(form.adminNpwp, 15) && !validateNumeric(form.adminNpwp, 16)) errors.adminNpwp = 'NPWP harus 15 atau 16 digit angka'
  }
  if (touched.adminNpwpFile && !form.adminNpwpFile) errors.adminNpwpFile = 'File NPWP pengurus wajib diunggah'

  // Step 5
  if (touched.executorName) {
    if (!form.executorName.trim()) errors.executorName = 'Nama pelaksana wajib diisi'
    else if (!validateName(form.executorName)) errors.executorName = 'Nama hanya boleh berisi huruf, minimal 2 karakter'
  }
  if (touched.executorPhone) {
    if (!form.executorPhone.trim()) errors.executorPhone = 'No HP pelaksana wajib diisi'
    else if (!validatePhone(form.executorPhone)) errors.executorPhone = 'Nomor telepon harus 9–15 digit angka'
  }
  if (touched.executorNik) {
    if (!form.executorNik.trim()) errors.executorNik = 'NIK pelaksana wajib diisi'
    else if (!validateNumeric(form.executorNik, 16)) errors.executorNik = 'NIK harus 16 digit angka'
  }
  if (touched.executorNikFile && !form.executorNikFile) errors.executorNikFile = 'File KTP pelaksana wajib diunggah'
  if (touched.executorNpwp) {
    if (!form.executorNpwp.trim()) errors.executorNpwp = 'NPWP pelaksana wajib diisi'
    else if (!validateNumeric(form.executorNpwp, 15) && !validateNumeric(form.executorNpwp, 16)) errors.executorNpwp = 'NPWP harus 15 atau 16 digit angka'
  }
  if (touched.executorNpwpFile && !form.executorNpwpFile) errors.executorNpwpFile = 'File NPWP pelaksana wajib diunggah'

  return errors
})

/**
 * Mark all fields of the current step as touched.
 * Called when user tries to proceed but the step is invalid.
 */
const touchCurrentStepFields = () => {
  const stepFieldMap: Record<number, string[]> = {
    1: ['businessName', 'directorName', 'companyEmail', 'nibNumber', 'nibFile', 'npwpNumber', 'npwpFile'],
    2: ['deedNo', 'deedFile', 'deedDate', 'latestDeedNo', 'latestDeedFile', 'latestDeedDate'],
    3: ['companyAddress', 'province', 'city', 'district', 'subDistrict', 'rt', 'rw'],
    4: ['adminName', 'adminPhone', 'adminNik', 'adminNikFile', 'adminNpwp', 'adminNpwpFile'],
    5: ['executorName', 'executorPhone', 'executorNik', 'executorNikFile', 'executorNpwp', 'executorNpwpFile'],
    6: ['password', 'konfirmasiPassword'],
  }
  const fields = stepFieldMap[currentStep.value] ?? []
  for (const field of fields) {
    touched[field] = true
  }
}

const isStepValid = computed(() => {
  if (currentStep.value === 1) {
    return Boolean(
      form.businessName.trim() &&
      validateName(form.directorName) &&
      emailPattern.test(form.companyEmail) &&
      validateNumeric(form.nibNumber, 13) && form.nibFile &&
      (validateNumeric(form.npwpNumber, 15) || validateNumeric(form.npwpNumber, 16)) && form.npwpFile,
    )
  }
  if (currentStep.value === 2) {
    return Boolean(
      form.deedNo.trim() && form.deedFile && form.deedDate &&
      form.latestDeedNo.trim() && form.latestDeedFile && form.latestDeedDate,
    )
  }
  if (currentStep.value === 3) {
    return Boolean(
      form.companyAddress.trim() && form.province && form.city && form.district && form.subDistrict &&
      validateNumeric(form.rt) && validateNumeric(form.rw),
    )
  }
  if (currentStep.value === 4) {
    return Boolean(
      validateName(form.adminName) &&
      validateNumeric(form.adminNik, 16) && form.adminNikFile &&
      (validateNumeric(form.adminNpwp, 15) || validateNumeric(form.adminNpwp, 16)) && form.adminNpwpFile &&
      validatePhone(form.adminPhone),
    )
  }
  if (currentStep.value === 5) {
    return Boolean(
      validateName(form.executorName) &&
      validateNumeric(form.executorNik, 16) && form.executorNikFile &&
      (validateNumeric(form.executorNpwp, 15) || validateNumeric(form.executorNpwp, 16)) && form.executorNpwpFile &&
      validatePhone(form.executorPhone),
    )
  }
  // Step 6 — Akun: password ≥ 8 chars with letters + numbers, and matching confirm.
  const passwordValid =
    form.password.length >= 8 &&
    /[A-Za-z]/.test(form.password) &&
    /\d/.test(form.password)
  return Boolean(passwordValid && form.password === form.konfirmasiPassword)
})

const primaryLabel = computed(() => (currentStep.value === 6 ? 'Daftar Sekarang' : 'Selanjutnya'))

const handleFile = (field: keyof typeof form, file: File) => {
  console.log('handleFile called for field:', field, 'with file:', file)
  ;(form[field] as unknown as File | null) = file
  touched[field] = true
}
const removeFile = (field: keyof typeof form) => {
  console.log('removeFile called for field:', field)
  ;(form[field] as unknown as File | null) = null
  touched[field] = true
}

const goBack = () => {
  if (currentStep.value > 1) currentStep.value -= 1
}

const nospace = (s: string) => s.replace(/\s/g, '')

const goNext = async () => {
  if (!isStepValid.value) {
    touchCurrentStepFields()
    showAlert({
      label: 'Harap lengkapi semua field yang ditandai.',
      variant: 'warning',
    })
    return
  }
  if (submitting.value) return

  if (currentStep.value < 6) {
    currentStep.value += 1
    showAlert({
      label: `Form pendaftaran step ${currentStep.value} siap dilengkapi.`,
      variant: 'info',
    })
    return
  }
  await submitRegistration()
}

const submitRegistration = async () => {
  submitting.value = true
  try {
    const fd = new FormData()

    // Text fields — numeric IDs sent digits-only (matches backend DTO).
    const text: Record<string, string> = {
      businessName: form.businessName,
      directorName: form.directorName,
      companyEmail: form.companyEmail,
      nibNumber: nospace(form.nibNumber),
      npwpNumber: nospace(form.npwpNumber),
      deedNo: nospace(form.deedNo),
      deedDate: form.deedDate,
      latestDeedNo: nospace(form.latestDeedNo),
      latestDeedDate: form.latestDeedDate,
      companyAddress: form.companyAddress,
      province: form.province,
      city: form.city,
      district: form.district,
      subDistrict: form.subDistrict,
      rt: nospace(form.rt),
      rw: nospace(form.rw),
      adminName: form.adminName,
      adminNik: nospace(form.adminNik),
      adminNpwp: nospace(form.adminNpwp),
      adminPhone: nospace(form.adminPhone),
      executorName: form.executorName,
      executorNik: nospace(form.executorNik),
      executorNpwp: nospace(form.executorNpwp),
      executorPhone: nospace(form.executorPhone),
      password: form.password,
      konfirmasiPassword: form.konfirmasiPassword,
    }
    Object.entries(text).forEach(([key, value]) => fd.append(key, value))

    // Document uploads.
    const files: Record<string, File | null> = {
      nibFile: form.nibFile,
      npwpFile: form.npwpFile,
      deedFile: form.deedFile,
      latestDeedFile: form.latestDeedFile,
      adminNikFile: form.adminNikFile,
      adminNpwpFile: form.adminNpwpFile,
      executorNikFile: form.executorNikFile,
      executorNpwpFile: form.executorNpwpFile,
    }
    Object.entries(files).forEach(([key, file]) => {
      if (file) fd.append(key, file)
    })

    // MOCK API CALL for testing
    const payload = Object.fromEntries(fd.entries())
    console.log('Sanitized Registration Payload:', payload)
    emit('submit', payload)
    showAlert({ label: 'Pendaftaran berhasil', variant: 'success' })
    router.push('/')
  } catch (err) {
    showAlert({
      label: err instanceof Error ? err.message : 'Pendaftaran gagal.',
      variant: 'danger',
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="register-card" aria-labelledby="register-title">
    <div class="register-content">
      <header class="register-header">
        <div class="title-row">
          <button
            v-if="currentStep > 1"
            class="back-button"
            type="button"
            aria-label="Kembali"
            @click="goBack"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m15 5-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
          <h1 id="register-title">Form Pendaftaran</h1>
        </div>
        <span>{{ currentStep }}/6</span>
      </header>

      <form class="register-form" @submit.prevent="goNext">
        <div class="register-scroll">
          <!-- ==================== STEP 1 — Data Perusahaan ==================== -->
          <div v-if="currentStep === 1" class="fields">
            <GInputText
              id="reg-business-name"
              name="businessName"
              v-model="form.businessName"
              label="Nama Badan Usaha"
              placeholder="Masukkan nama badan usaha"
              class="col-span-2"
              :error="fieldErrors.businessName"
              @blur="onBlur('businessName')"
            />
            <GInputText
              id="reg-director-name"
              name="directorName"
              v-model="form.directorName"
              label="Nama Direktur Utama / CEO"
              placeholder="Masukkan nama direktur utama"
              :error="fieldErrors.directorName"
              @blur="onBlur('directorName')"
            />
            <GInputText
              id="reg-company-email"
              name="companyEmail"
              v-model="form.companyEmail"
              type="text"
              label="Email Perusahaan"
              placeholder="Masukkan email perusahaan"
              autocomplete="email"
              autocapitalize="none"
              spellcheck="false"
              :pattern="emailPattern.source"
              :error="fieldErrors.companyEmail"
              @blur="onBlur('companyEmail')"
            />

            <div class="upload-field col-span-2">
              <label>No NIB</label>
              <div class="upload-row">
                <GInputText
                  id="reg-nib-number"
                  name="nibNumber"
                  v-model="form.nibNumber"
                  placeholder="Masukkan No NIB"
                  type="text"
                  inputmode="numeric"
                  maxlength="16"
                  :error="fieldErrors.nibNumber"
                  @blur="onBlur('nibNumber')"
                  @keydown="onlyAllowDigits"
                  @paste="handleNumericPaste"
                />
                 <GFilePicker
                  unique-key="nib"
                  :file="typeof form.nibFile === 'string' ? form.nibFile : null"
                  :image-only="false"
                  error-text="Ukuran file maksimal 10 MB"
                  @file-dropped="(file: any) => handleFile('nibFile', file)"
                  @file-removed="() => removeFile('nibFile')"
                />
              </div>
              <span class="field-helper">Unggah dokumen NIB resmi perusahaan (PDF, PNG, JPG. Maks. 10 MB)</span>
              <span v-if="fieldErrors.nibFile" class="field-error">{{ fieldErrors.nibFile }}</span>
            </div>

            <div class="upload-field col-span-2">
              <label>No NPWP Perusahaan</label>
              <div class="upload-row">
                <GInputText
                  id="reg-npwp-number"
                  name="npwpNumber"
                  v-model="form.npwpNumber"
                  placeholder="Masukkan No NPWP"
                  type="text"
                  inputmode="numeric"
                  maxlength="19"
                  :error="fieldErrors.npwpNumber"
                  @blur="onBlur('npwpNumber')"
                  @keydown="onlyAllowDigits"
                  @paste="handleNumericPaste"
                />
                <GFilePicker
                  unique-key="npwp"
                  :file="typeof form.npwpFile === 'string' ? form.npwpFile : null"
                  :image-only="false"
                  error-text="Ukuran file maksimal 10 MB"
                  @file-dropped="(file: any) => handleFile('npwpFile', file)"
                  @file-removed="() => removeFile('npwpFile')"
                />
              </div>
              <span class="field-helper">Unggah kartu atau dokumen NPWP perusahaan (PDF, PNG, JPG. Maks. 10 MB)</span>
              <span v-if="fieldErrors.npwpFile" class="field-error">{{ fieldErrors.npwpFile }}</span>
            </div>
          </div>

          <!-- ==================== STEP 2 — Data Akta ==================== -->
          <div v-else-if="currentStep === 2" class="fields">
            <div class="upload-field">
              <label>No Akta Pendirian</label>
              <div class="upload-row-stacked">
                <GInputText
                  id="reg-deed-no"
                  name="deedNo"
                  v-model="form.deedNo"
                  placeholder="Masukkan No Akta"
                  type="text"
                  maxlength="50"
                  :error="fieldErrors.deedNo"
                  @blur="onBlur('deedNo')"
                />
                 <GFilePicker
                  unique-key="deed"
                  :file="typeof form.deedFile === 'string' ? form.deedFile : null"
                  :image-only="false"
                  error-text="Ukuran file maksimal 10 MB"
                  @file-dropped="(file: any) => handleFile('deedFile', file)"
                  @file-removed="() => removeFile('deedFile')"
                />
              </div>
              <span class="field-helper">Unggah salinan dokumen Akta Pendirian resmi (PDF, PNG, JPG. Maks. 10 MB)</span>
              <span v-if="fieldErrors.deedFile" class="field-error">{{ fieldErrors.deedFile }}</span>
            </div>
            <div class="upload-field">
              <label>No Akta Terakhir</label>
              <div class="upload-row-stacked">
                <GInputText
                  id="reg-latest-deed-no"
                  name="latestDeedNo"
                  v-model="form.latestDeedNo"
                  placeholder="Masukkan No Akta"
                  type="text"
                  maxlength="50"
                  :error="fieldErrors.latestDeedNo"
                  @blur="onBlur('latestDeedNo')"
                />
                 <GFilePicker
                  unique-key="latest-deed"
                  :file="typeof form.latestDeedFile === 'string' ? form.latestDeedFile : null"
                  :image-only="false"
                  error-text="Ukuran file maksimal 10 MB"
                  @file-dropped="(file: any) => handleFile('latestDeedFile', file)"
                  @file-removed="() => removeFile('latestDeedFile')"
                />
              </div>
              <span class="field-helper">Unggah salinan Akta Perubahan Terakhir (PDF, PNG, JPG. Maks. 10 MB)</span>
              <span v-if="fieldErrors.latestDeedFile" class="field-error">{{ fieldErrors.latestDeedFile }}</span>
            </div>
            <GDatePicker
              v-unique-date-picker-fields="{ id: 'reg-deed-date', name: 'deedDate' }"
              id="reg-deed-date"
              name="deedDate"
              v-model="form.deedDate"
              title="Tanggal Akta Pendirian"
              placeholder="Pilih tanggal"
              autocomplete="off"
              disableFutureDates
              :maxYear="0"
              date-position="top"
            />
            <GDatePicker
              v-unique-date-picker-fields="{ id: 'reg-latest-deed-date', name: 'latestDeedDate' }"
              id="reg-latest-deed-date"
              name="latestDeedDate"
              v-model="form.latestDeedDate"
              title="Tanggal Akta Terakhir"
              placeholder="Pilih tanggal"
              autocomplete="off"
              disableFutureDates
              :maxYear="0"
              date-position="top"
            />
          </div>

          <!-- ==================== STEP 3 — Alamat ==================== -->
          <div v-else-if="currentStep === 3" class="fields">
            <GTextArea
              id="reg-company-address"
              name="companyAddress"
              v-model="form.companyAddress"
              label="Alamat Perusahaan"
              placeholder="Masukkan alamat lengkap perusahaan"
              autocomplete="street-address"
              class="col-span-2 compact-textarea"
              @blur="onBlur('companyAddress')"
            />
            <span v-if="fieldErrors.companyAddress" class="field-error standalone-error">{{ fieldErrors.companyAddress }}</span>
            <GDropdown
              id="reg-province"
              name="province"
              v-model="form.province"
              label="Provinsi"
              placeholder="Pilih provinsi"
              :items="provinceItems"
              item-value="value"
              item-text="label"
              :use-bottom-sheet="isMobile"
              :error="fieldErrors.province"
            />
            <GDropdown
              id="reg-city"
              name="city"
              v-model="form.city"
              label="Kota/Kabupaten"
              placeholder="Pilih kota/kabupaten"
              :items="cityItems"
              item-value="value"
              item-text="label"
              :use-bottom-sheet="isMobile"
              :error="fieldErrors.city"
            />
            <GDropdown
              id="reg-district"
              name="district"
              v-model="form.district"
              label="Kecamatan"
              placeholder="Pilih kecamatan"
              :items="districtItems"
              item-value="value"
              item-text="label"
              :use-bottom-sheet="isMobile"
              :error="fieldErrors.district"
            />
            <GDropdown
              id="reg-sub-district"
              name="subDistrict"
              v-model="form.subDistrict"
              label="Kelurahan"
              placeholder="Pilih kelurahan"
              :items="subDistrictItems"
              item-value="value"
              item-text="label"
              :use-bottom-sheet="isMobile"
              :error="fieldErrors.subDistrict"
            />
            <div class="rt-rw-row col-span-2">
              <GInputText
                id="reg-rt"
                name="rt"
                v-model="form.rt"
                label="RT"
                placeholder="Contoh: 001"
                type="text"
                inputmode="numeric"
                maxlength="3"
                :error="fieldErrors.rt"
                @blur="onBlur('rt')"
                @keydown="onlyAllowDigits"
                @paste="handleNumericPaste"
              />
              <GInputText
                id="reg-rw"
                name="rw"
                v-model="form.rw"
                label="RW"
                placeholder="Contoh: 002"
                type="text"
                inputmode="numeric"
                maxlength="3"
                :error="fieldErrors.rw"
                @blur="onBlur('rw')"
                @keydown="onlyAllowDigits"
                @paste="handleNumericPaste"
              />
            </div>
          </div>

          <!-- ==================== STEP 4 — Data Pengurus ==================== -->
          <div v-else-if="currentStep === 4" class="fields">
            <GInputText
              id="reg-admin-name"
              name="adminName"
              v-model="form.adminName"
              label="Nama Pengurus"
              placeholder="Masukkan nama pengurus"
              :error="fieldErrors.adminName"
              @blur="onBlur('adminName')"
            />
            <GInputText
              id="reg-admin-phone"
              name="adminPhone"
              v-model="form.adminPhone"
              label="No Hp Pengurus"
              placeholder="Masukkan nomor telepon"
              type="text"
              inputmode="numeric"
              maxlength="18"
              autocomplete="tel"
              :error="fieldErrors.adminPhone"
              @blur="onBlur('adminPhone')"
              @keydown="onlyAllowDigits"
              @paste="handleNumericPaste"
            />
            <div class="upload-field col-span-2">
              <label>NIK KTP Pengurus</label>
              <div class="upload-row">
                <GInputText
                  id="reg-admin-nik"
                  name="adminNik"
                  v-model="form.adminNik"
                  placeholder="Masukkan NIK"
                  type="text"
                  inputmode="numeric"
                  maxlength="19"
                  :error="fieldErrors.adminNik"
                  @blur="onBlur('adminNik')"
                  @keydown="onlyAllowDigits"
                  @paste="handleNumericPaste"
                />
                 <GFilePicker
                  unique-key="admin-nik"
                  :file="typeof form.adminNikFile === 'string' ? form.adminNikFile : null"
                  :image-only="false"
                  error-text="Ukuran file Image maksimal 10 MB"
                  @file-dropped="(file: any) => handleFile('adminNikFile', file)"
                  @file-removed="() => removeFile('adminNikFile')"
                />
              </div>
              <span class="field-helper">Unggah foto KTP Pengurus dengan jelas (PNG, JPG, JPEG. Maks. 10 MB)</span>
              <span v-if="fieldErrors.adminNikFile" class="field-error">{{ fieldErrors.adminNikFile }}</span>
            </div>
            <div class="upload-field col-span-2">
              <label>No NPWP Pengurus</label>
              <div class="upload-row">
                <GInputText
                  id="reg-admin-npwp"
                  name="adminNpwp"
                  v-model="form.adminNpwp"
                  placeholder="Masukkan No NPWP"
                  type="text"
                  inputmode="numeric"
                  maxlength="19"
                  :error="fieldErrors.adminNpwp"
                  @blur="onBlur('adminNpwp')"
                  @keydown="onlyAllowDigits"
                  @paste="handleNumericPaste"
                />
                 <GFilePicker
                  unique-key="admin-npwp"
                  :file="typeof form.adminNpwpFile === 'string' ? form.adminNpwpFile : null"
                  :image-only="false"
                  error-text="Ukuran file maksimal 10 MB"
                  @file-dropped="(file: any) => handleFile('adminNpwpFile', file)"
                  @file-removed="() => removeFile('adminNpwpFile')"
                />
              </div>
              <span class="field-helper">Unggah foto kartu NPWP Pengurus (PNG, JPG, JPEG. Maks. 10 MB)</span>
              <span v-if="fieldErrors.adminNpwpFile" class="field-error">{{ fieldErrors.adminNpwpFile }}</span>
            </div>
          </div>

          <!-- ==================== STEP 5 — Data Pelaksana Transaksi ==================== -->
          <div v-else-if="currentStep === 5" class="fields">
            <GInputText
              id="reg-executor-name"
              name="executorName"
              v-model="form.executorName"
              label="Nama Pelaksana Transaksi"
              placeholder="Masukkan nama pelaksana"
              :error="fieldErrors.executorName"
              @blur="onBlur('executorName')"
            />
            <GInputText
              id="reg-executor-phone"
              name="executorPhone"
              v-model="form.executorPhone"
              label="No Hp Pelaksana Transaksi"
              placeholder="Masukkan nomor telepon"
              type="text"
              inputmode="numeric"
              maxlength="18"
              autocomplete="tel"
              :error="fieldErrors.executorPhone"
              @blur="onBlur('executorPhone')"
              @keydown="onlyAllowDigits"
              @paste="handleNumericPaste"
            />
            <div class="upload-field col-span-2">
              <label>NIK KTP Pelaksana Transaksi</label>
              <div class="upload-row">
                <GInputText
                  id="reg-executor-nik"
                  name="executorNik"
                  v-model="form.executorNik"
                  placeholder="Masukkan NIK"
                  type="text"
                  inputmode="numeric"
                  maxlength="19"
                  :error="fieldErrors.executorNik"
                  @blur="onBlur('executorNik')"
                  @keydown="onlyAllowDigits"
                  @paste="handleNumericPaste"
                />
                 <GFilePicker
                  unique-key="executor-nik"
                  :file="typeof form.executorNikFile === 'string' ? form.executorNikFile : null"
                  :image-only="false"
                  error-text="Ukuran file Image maksimal 10 MB"
                  @file-dropped="(file: any) => handleFile('executorNikFile', file)"
                  @file-removed="() => removeFile('executorNikFile')"
                />
              </div>
              <span class="field-helper">Unggah foto KTP Pelaksana Transaksi dengan jelas (PNG, JPG, JPEG. Maks. 10 MB)</span>
              <span v-if="fieldErrors.executorNikFile" class="field-error">{{ fieldErrors.executorNikFile }}</span>
            </div>
            <div class="upload-field col-span-2">
              <label>No NPWP Pelaksana Transaksi</label>
              <div class="upload-row">
                <GInputText
                  id="reg-executor-npwp"
                  name="executorNpwp"
                  v-model="form.executorNpwp"
                  placeholder="Masukkan No NPWP"
                  type="text"
                  inputmode="numeric"
                  maxlength="19"
                  :error="fieldErrors.executorNpwp"
                  @blur="onBlur('executorNpwp')"
                  @keydown="onlyAllowDigits"
                  @paste="handleNumericPaste"
                />
                 <GFilePicker
                  unique-key="executor-npwp"
                  :file="typeof form.executorNpwpFile === 'string' ? form.executorNpwpFile : null"
                  :image-only="false"
                  error-text="Ukuran file maksimal 10 MB"
                  @file-dropped="(file: any) => handleFile('executorNpwpFile', file)"
                  @file-removed="() => removeFile('executorNpwpFile')"
                />
              </div>
              <span class="field-helper">Unggah kartu atau dokumen NPWP Pelaksana Transaksi (PDF, PNG, JPG. Maks. 10 MB)</span>
              <span v-if="fieldErrors.executorNpwpFile" class="field-error">{{ fieldErrors.executorNpwpFile }}</span>
            </div>
          </div>
          <!-- ==================== STEP 6 — Akun ==================== -->
          <div v-else class="fields">
            <p class="field-helper">
              Email login Anda: <strong>{{ form.companyEmail || '-' }}</strong>
            </p>
            <!-- Password -->
            <div class="password-field">
              <GInputText
                id="reg-password"
                name="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                label="Kata Sandi"
                placeholder="Minimal 8 karakter, huruf & angka"
                autocomplete="new-password"
                :error="fieldErrors.password"
                @blur="onBlur('password')"
              >
                <template #suffix>
                  <button
                    class="field-icon field-icon-button"
                    type="button"
                    :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
                    @click="showPassword = !showPassword"
                  >
                    <!-- Eye open -->
                    <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" />
                    </svg>
                    <!-- Eye closed -->
                    <svg v-else viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-6 0-9.5-6-9.5-6a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c6 0 9.5 6 9.5 6a18.5 18.5 0 0 1-1.86 2.65M14.12 14.12a3 3 0 1 1-4.24-4.24"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                    </svg>
                  </button>
                </template>
              </GInputText>
            </div>

            <!-- Confirm Password -->
            <div class="password-field">
              <GInputText
                id="reg-konfirmasi-password"
                name="konfirmasiPassword"
                v-model="form.konfirmasiPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                label="Konfirmasi Kata Sandi"
                placeholder="Ulangi kata sandi"
                autocomplete="new-password"
                :error="fieldErrors.konfirmasiPassword"
                @blur="onBlur('konfirmasiPassword')"
              >
                <template #suffix>
                  <button
                    class="field-icon field-icon-button"
                    type="button"
                    :aria-label="showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <svg v-if="!showConfirmPassword" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" />
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-6 0-9.5-6-9.5-6a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c6 0 9.5 6 9.5 6a18.5 18.5 0 0 1-1.86 2.65M14.12 14.12a3 3 0 1 1-4.24-4.24"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                    </svg>
                  </button>
                </template>
              </GInputText>
            </div>
          </div>
        </div><!-- /register-scroll -->

        <footer class="form-footer">
          <GButton
            class="register-action"
            :disabled="!isStepValid || submitting"
            :loading="submitting"
            :icon="false"
            :label="primaryLabel"
            size="md"
            type="primary"
          />
          <p class="help">
            Sudah punya akun?
            <RouterLink to="/">Klik disini</RouterLink>
          </p>
        </footer>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.register-card {
  width: 580px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  overflow: hidden;
}

.register-content {
  display: flex;
  flex-direction: column;
  padding: 24px;
  min-height: 0;
  overflow: hidden;
}

.register-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.help {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

h1, h2, p {
  margin: 0;
}

h1, h2 {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.register-header span {
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.back-button {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--g-kit-lime-50);
  cursor: pointer;
}

.back-button svg {
  width: 24px;
  height: 24px;
}

.register-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.register-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  min-height: 0;
}

.fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.col-span-2 {
  grid-column: span 1 / span 1;
}

.rt-rw-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.compact-textarea :deep(textarea) {
  height: 60px;
}

.fields .group-input {
  margin-bottom: 0;
}

.upload-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
}

.upload-field > label {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
}

.field-helper {
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omega, 11px);
  margin-top: 4px;
  margin-bottom: 0;
  line-height: 1.4;
}

.field-error {
  color: var(--g-kit-red-50, #ef4444);
  font-size: var(--g-kit-font-size-omega, 11px);
  margin-top: 2px;
  line-height: 1.4;
}

.standalone-error {
  margin-top: -8px;
}

.upload-row {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
}

:deep(.custom-file-upload) {
  min-height: 120px !important;
  max-height: 120px !important;
  max-width: 100%;
  box-sizing: border-box;
  p {
    width: max-content;
  }
}

:deep(.custom-file-upload.hns) {
  min-height: 120px !important;
  max-height: 120px !important;
  max-width: 100%;
  box-sizing: border-box;
  p {
    width: max-content;
  }
}

:deep(.custom-file-upload.fileName) {
  min-height: unset !important;
  max-height: unset !important;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

:deep(.custom-file-upload__file-name) {
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 100%;
    overflow: hidden;
  }

  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex: 1;
  }
}

.upload-row-stacked {
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  flex-shrink: 0;
}

.register-action {
  width: 100%;
}

.form-footer p {
  display: flex;
  justify-content: center;
  gap: 12px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.form-footer a {
  color: var(--g-kit-lime-50);
  font-weight: var(--g-kit-font-weight-bold);
  text-decoration: none;
}

/* Password field icon styling — matches LoginForm pattern */
.password-field {
  position: relative;
}

.field-icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  color: var(--g-kit-black-60);
  flex: 0 0 auto;
}

.field-icon svg {
  width: 20px;
  height: 20px;
}

.field-icon-button {
  margin-right: 14px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

@media (max-width: 768px) {
  .register-card {
    width: min(580px, calc(100vw - 32px));
    max-height: none;
  }

  .register-content {
    overflow: visible;
  }

  .register-form {
    overflow: visible;
  }

  .register-scroll {
    overflow-y: visible;
  }

  .upload-row {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
  }

  .fields {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .col-span-2 {
    grid-column: span 1 / span 1;
  }

  .upload-row {
    grid-template-columns: 1fr;
  }

  .rt-rw-row {
    gap: 8px;
  }

  .register-form {
    min-height: auto;
  }

  .form-footer {
    margin-top: 20px;
  }
}
</style>

<style lang="scss">
@media (max-width: 768px) {
  .offcanvas-body {
    padding-left: 0px !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
  }
}
</style>
