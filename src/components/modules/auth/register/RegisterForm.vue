<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'

import { GButton, GDatePicker, GDropdown, GFilePicker, GInputText, GTextArea } from '@/components'
import { uniqueDatePickerFields as vUniqueDatePickerFields } from '@/directives/uniqueDatePickerFields'
import { useAppAlert } from '@/hooks/useAppAlert'

const router = useRouter()
const currentStep = ref(1)
const { showAlert } = useAppAlert()
const isMobile = useMediaQuery('(max-width: 768px)')

const emit = defineEmits<{
  (e: 'submit', payload: typeof form): void
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
})

const provinceItems = ref<{ value: string; label: string }[]>([])
const cityItems = ref<{ value: string; label: string }[]>([])
const districtItems = ref<{ value: string; label: string }[]>([])
const subDistrictItems = ref<{ value: string; label: string }[]>([])

const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

const fetchProvinces = async () => {
  try {
    const res = await fetch('https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json')
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
    const res = await fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
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
    const res = await fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/districts/${cityId}.json`)
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
    const res = await fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`)
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
  return Boolean(
    validateName(form.executorName) &&
    validateNumeric(form.executorNik, 16) && form.executorNikFile &&
    (validateNumeric(form.executorNpwp, 15) || validateNumeric(form.executorNpwp, 16)) && form.executorNpwpFile &&
    validatePhone(form.executorPhone),
  )
})

const primaryLabel = computed(() => (currentStep.value === 5 ? 'Daftar Sekarang' : 'Selanjutnya'))

const handleFile = (field: keyof typeof form, file: File) => {
  console.log('handleFile called for field:', field, 'with file:', file)
  ;(form[field] as unknown as File | null) = file
}
const removeFile = (field: keyof typeof form) => {
  console.log('removeFile called for field:', field)
  ;(form[field] as unknown as File | null) = null
}

const goBack = () => {
  if (currentStep.value > 1) currentStep.value -= 1
}

const goNext = () => {
  if (!isStepValid.value) return
  if (currentStep.value < 5) {
    currentStep.value += 1
    showAlert({
      label: `Form pendaftaran step ${currentStep.value} siap dilengkapi.`,
      variant: 'info',
    })
    return
  }

  // Create a clean payload clone removing formatting spaces from numeric fields
  const cleanPayload = JSON.parse(JSON.stringify(form))
  cleanPayload.nibNumber = form.nibNumber.replace(/\s/g, '')
  cleanPayload.npwpNumber = form.npwpNumber.replace(/\s/g, '')
  cleanPayload.deedNo = form.deedNo.replace(/\s/g, '')
  cleanPayload.latestDeedNo = form.latestDeedNo.replace(/\s/g, '')
  cleanPayload.rt = form.rt.replace(/\s/g, '')
  cleanPayload.rw = form.rw.replace(/\s/g, '')
  cleanPayload.adminNik = form.adminNik.replace(/\s/g, '')
  cleanPayload.adminNpwp = form.adminNpwp.replace(/\s/g, '')
  cleanPayload.adminPhone = form.adminPhone.replace(/\s/g, '')
  cleanPayload.executorNik = form.executorNik.replace(/\s/g, '')
  cleanPayload.executorNpwp = form.executorNpwp.replace(/\s/g, '')
  cleanPayload.executorPhone = form.executorPhone.replace(/\s/g, '')

  // Preserve file objects as they are stripped by JSON serialization
  cleanPayload.nibFile = form.nibFile
  cleanPayload.npwpFile = form.npwpFile
  cleanPayload.deedFile = form.deedFile
  cleanPayload.latestDeedFile = form.latestDeedFile
  cleanPayload.adminNikFile = form.adminNikFile
  cleanPayload.adminNpwpFile = form.adminNpwpFile
  cleanPayload.executorNikFile = form.executorNikFile
  cleanPayload.executorNpwpFile = form.executorNpwpFile

  // Log sanitized payload for debugging
  console.log('Sanitized Registration Payload:', cleanPayload)

  // Emit clean payload
  emit('submit', cleanPayload)

  showAlert({ label: 'Pendaftaran berhasil dikirim.', variant: 'success' })
  router.push('/')
}
</script>

<template>
  <section class="register-card" :class="{ 'is-step-1': currentStep === 1 }" aria-labelledby="register-title">
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
        <span>{{ currentStep }}/5</span>
      </header>

      <form class="register-form" @submit.prevent="goNext">
        <div class="register-scroll" :class="{ 'is-step-1': currentStep === 1 }">
          <!-- ==================== STEP 1 — Data Perusahaan ==================== -->
          <div v-if="currentStep === 1" class="fields">
            <GInputText
              id="reg-business-name"
              name="businessName"
              v-model="form.businessName"
              label="Nama Badan Usaha"
              placeholder="Masukkan nama badan usaha"
              class="col-span-2"
            />
            <GInputText
              id="reg-director-name"
              name="directorName"
              v-model="form.directorName"
              label="Nama Direktur Utama / CEO"
              placeholder="Masukkan nama direktur utama"
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
            />
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
                maxlength="5"
              />
              <GInputText
                id="reg-rw"
                name="rw"
                v-model="form.rw"
                label="RW"
                placeholder="Contoh: 002"
                type="text"
                inputmode="numeric"
                maxlength="5"
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
            </div>
          </div>

          <!-- ==================== STEP 5 — Data Pelaksana Transaksi ==================== -->
          <div v-else class="fields">
            <GInputText
              id="reg-executor-name"
              name="executorName"
              v-model="form.executorName"
              label="Nama Pelaksana Transaksi"
              placeholder="Masukkan nama pelaksana"
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
            </div>
          </div>
        </div><!-- /register-scroll -->

        <footer class="form-footer">
          <GButton
            class="register-action"
            :disabled="!isStepValid"
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
  overflow-y: auto;
}

.register-card.is-step-1 {
  overflow: hidden;
}

.register-content {
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow: hidden;
  min-height: 0;
}

.register-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
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
}

.register-scroll {
  flex: 1;
  padding-right: 4px;
}

.register-scroll.is-step-1 {
  overflow-y: auto;
  max-height: 60vh;
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

.upload-row {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
}

:deep(.custom-file-upload) {
  min-height: 120px !important;
  max-height: 120px !important;
  p {
    width: max-content;
  }
}

:deep(.custom-file-upload.hns) {
  min-height: 120px !important;
  max-height: 120px !important;
  p {
    width: max-content;
  }
}

.upload-row-stacked {
  display: flex;
  flex-direction: column;
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
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

@media (max-width: 768px) {
  .register-card {
    width: min(580px, calc(100vw - 32px));
    max-height: fit-content;
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
