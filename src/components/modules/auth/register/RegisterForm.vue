<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { GButton, GDatePicker, GDropdown, GFilePicker, GInputText, GTextArea } from '@/components'
import { uniqueDatePickerFields as vUniqueDatePickerFields } from '@/directives/uniqueDatePickerFields'
import { useAppAlert } from '@/hooks/useAppAlert'

const router = useRouter()
const currentStep = ref(1)
const { showAlert } = useAppAlert()

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
  rtRw: '',

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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isStepValid = computed(() => {
  if (currentStep.value === 1) {
    return Boolean(
      form.businessName &&
      form.directorName &&
      emailPattern.test(form.companyEmail) &&
      form.nibNumber && form.nibFile &&
      form.npwpNumber && form.npwpFile,
    )
  }
  if (currentStep.value === 2) {
    return Boolean(
      form.deedNo && form.deedFile && form.deedDate &&
      form.latestDeedNo && form.latestDeedFile && form.latestDeedDate,
    )
  }
  if (currentStep.value === 3) {
    return Boolean(
      form.companyAddress && form.province && form.city && form.district && form.subDistrict && form.rtRw,
    )
  }
  if (currentStep.value === 4) {
    return Boolean(
      form.adminName && form.adminNik && form.adminNikFile &&
      form.adminNpwp && form.adminNpwpFile && form.adminPhone,
    )
  }
  return Boolean(
    form.executorName && form.executorNik && form.executorNikFile &&
    form.executorNpwp && form.executorNpwpFile && form.executorPhone,
  )
})

const primaryLabel = computed(() => (currentStep.value === 5 ? 'Daftar Sekarang' : 'Selanjutnya'))

const handleFile = (field: keyof typeof form) => (file: File) => {
  ;(form[field] as unknown as File | null) = file
}
const removeFile = (field: keyof typeof form) => () => {
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
  showAlert({ label: 'Pendaftaran berhasil dikirim.', variant: 'success' })
  router.push('/')
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
        <span>{{ currentStep }}/5</span>
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

          <div class="upload-field">
            <label>No NIB</label>
            <div class="upload-row">
              <GInputText
                id="reg-nib-number"
                name="nibNumber"
                v-model="form.nibNumber"
                placeholder="Masukkan No NIB"
                type="number"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="30"
              />
              <GFilePicker
                unique-key="nib"
                :file="form.nibFile"
                :image-only="false"
                error-text="Ukuran file maksimal 10 MB"
                @file-dropped="handleFile('nibFile')"
                @file-removed="removeFile('nibFile')"
              />
            </div>
          </div>

          <div class="upload-field">
            <label>No NPWP Perusahaan</label>
            <div class="upload-row">
              <GInputText
                id="reg-npwp-number"
                name="npwpNumber"
                v-model="form.npwpNumber"
                placeholder="Masukkan No NPWP"
                type="number"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="15"
              />
              <GFilePicker
                unique-key="npwp"
                :file="form.npwpFile"
                :image-only="false"
                error-text="Ukuran file maksimal 10 MB"
                @file-dropped="handleFile('npwpFile')"
                @file-removed="removeFile('npwpFile')"
              />
            </div>
          </div>
        </div>

        <!-- ==================== STEP 2 — Data Akta ==================== -->
        <div v-if="currentStep === 2" class="fields">
          <div class="upload-field">
            <label>No Akta Pendirian</label>
            <div class="upload-row">
              <GInputText
                id="reg-deed-no"
                name="deedNo"
                v-model="form.deedNo"
                placeholder="Masukkan No Akta"
              />
              <GFilePicker
                unique-key="deed"
                :file="form.deedFile"
                :image-only="false"
                error-text="Ukuran file maksimal 10 MB"
                @file-dropped="handleFile('deedFile')"
                @file-removed="removeFile('deedFile')"
              />
            </div>
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
          />

          <div class="upload-field">
            <label>No Akta Terakhir</label>
            <div class="upload-row">
              <GInputText
                id="reg-latest-deed-no"
                name="latestDeedNo"
                v-model="form.latestDeedNo"
                placeholder="Masukkan No Akta"
              />
              <GFilePicker
                unique-key="latest-deed"
                :file="form.latestDeedFile"
                :image-only="false"
                error-text="Ukuran file maksimal 10 MB"
                @file-dropped="handleFile('latestDeedFile')"
                @file-removed="removeFile('latestDeedFile')"
              />
            </div>
          </div>
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
          />
          <GDropdown
            id="reg-province"
            name="province"
            v-model="form.province"
            label="Provinsi"
            placeholder="Pilih provinsi"
            :items="[]"
            item-value="value"
            item-text="label"
          />
          <GDropdown
            id="reg-city"
            name="city"
            v-model="form.city"
            label="Kota/Kabupaten"
            placeholder="Pilih kota/kabupaten"
            :items="[]"
            item-value="value"
            item-text="label"
          />
          <GDropdown
            id="reg-district"
            name="district"
            v-model="form.district"
            label="Kecamatan"
            placeholder="Pilih kecamatan"
            :items="[]"
            item-value="value"
            item-text="label"
          />
          <GDropdown
            id="reg-sub-district"
            name="subDistrict"
            v-model="form.subDistrict"
            label="Kelurahan"
            placeholder="Pilih kelurahan"
            :items="[]"
            item-value="value"
            item-text="label"
          />
          <GInputText
            id="reg-rt-rw"
            name="rtRw"
            v-model="form.rtRw"
            label="RT/RW"
            placeholder="Contoh: 001/002"
          />
        </div>

        <!-- ==================== STEP 4 — Data Pengurus ==================== -->
        <div v-else-if="currentStep === 4" class="fields">
          <section class="section-block" aria-label="Data Pengurus">
            <h2>Data Pengurus</h2>
            <GInputText
              id="reg-admin-name"
              name="adminName"
              v-model="form.adminName"
              label="Nama Pengurus"
              placeholder="Masukkan nama pengurus"
            />
            <div class="upload-field">
              <label>NIK KTP Pengurus</label>
              <div class="upload-row">
                <GInputText
                  id="reg-admin-nik"
                  name="adminNik"
                  v-model="form.adminNik"
                  placeholder="Masukkan NIK"
                  type="number"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  maxlength="16"
                />
                <GFilePicker
                  unique-key="admin-nik"
                  :file="form.adminNikFile"
                  :image-only="true"
                  error-text="Ukuran file Image maksimal 10 MB"
                  @file-dropped="handleFile('adminNikFile')"
                  @file-removed="removeFile('adminNikFile')"
                />
              </div>
            </div>
            <div class="upload-field">
              <label>No NPWP Pengurus</label>
              <div class="upload-row">
                <GInputText
                  id="reg-admin-npwp"
                  name="adminNpwp"
                  v-model="form.adminNpwp"
                  placeholder="Masukkan No NPWP"
                  type="number"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  maxlength="15"
                />
                <GFilePicker
                  unique-key="admin-npwp"
                  :file="form.adminNpwpFile"
                  :image-only="false"
                  error-text="Ukuran file maksimal 10 MB"
                  @file-dropped="handleFile('adminNpwpFile')"
                  @file-removed="removeFile('adminNpwpFile')"
                />
              </div>
            </div>
            <GInputText
              id="reg-admin-phone"
              name="adminPhone"
              v-model="form.adminPhone"
              label="No Hp Pengurus"
              placeholder="Masukkan nomor telepon"
              type="number"
              inputmode="numeric"
              pattern="[0-9]*"
              autocomplete="tel"
            />
          </section>
        </div>

        <!-- ==================== STEP 5 — Data Pelaksana Transaksi ==================== -->
        <div v-else class="fields">
          <section class="section-block" aria-label="Data Pelaksana Transaksi">
            <h2>Data Pelaksana Transaksi</h2>
            <GInputText
              id="reg-executor-name"
              name="executorName"
              v-model="form.executorName"
              label="Nama Pelaksana Transaksi"
              placeholder="Masukkan nama pelaksana"
            />
            <div class="upload-field">
              <label>NIK KTP Pelaksana Transaksi</label>
              <div class="upload-row">
                <GInputText
                  id="reg-executor-nik"
                  name="executorNik"
                  v-model="form.executorNik"
                  placeholder="Masukkan NIK"
                  type="number"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  maxlength="16"
                />
                <GFilePicker
                  unique-key="executor-nik"
                  :file="form.executorNikFile"
                  :image-only="true"
                  error-text="Ukuran file Image maksimal 10 MB"
                  @file-dropped="handleFile('executorNikFile')"
                  @file-removed="removeFile('executorNikFile')"
                />
              </div>
            </div>
            <div class="upload-field">
              <label>No NPWP Pelaksana Transaksi</label>
              <div class="upload-row">
                <GInputText
                  id="reg-executor-npwp"
                  name="executorNpwp"
                  v-model="form.executorNpwp"
                  placeholder="Masukkan No NPWP"
                  type="number"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  maxlength="15"
                />
                <GFilePicker
                  unique-key="executor-npwp"
                  :file="form.executorNpwpFile"
                  :image-only="false"
                  error-text="Ukuran file maksimal 10 MB"
                  @file-dropped="handleFile('executorNpwpFile')"
                  @file-removed="removeFile('executorNpwpFile')"
                />
              </div>
            </div>
            <GInputText
              id="reg-executor-phone"
              name="executorPhone"
              v-model="form.executorPhone"
              label="No Hp Pelaksana Transaksi"
              placeholder="Masukkan nomor telepon"
              type="number"
              inputmode="numeric"
              pattern="[0-9]*"
              autocomplete="tel"
            />
          </section>
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

<style scoped>
.register-card {
  width: 542px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
}

.register-content {
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow-y: auto;
  min-height: 0;
}

.register-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
}

.help {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
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
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fields .group-input {
  margin-bottom: 0;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.upload-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.upload-field > label {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
}

.upload-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: auto;
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
    width: min(542px, calc(100vw - 32px));
  }

  .register-form {
    min-height: auto;
  }

  .form-footer {
    margin-top: 32px;
  }
}
</style>
