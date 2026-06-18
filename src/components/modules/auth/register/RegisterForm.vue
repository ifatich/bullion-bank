<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { GButton, GDatePicker, GDropdown, GFilePicker, GInputText, GTextArea } from '@/components'
import { useAppAlert } from '@/hooks/useAppAlert'

const router = useRouter()
const currentStep = ref(1)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const { showAlert } = useAppAlert()

const form = reactive({
  fullName: '',
  birthPlace: '',
  nationality: '',
  email: '',
  birthDate: '',
  identityType: '',
  identityFile: null as File | null,
  fullAddress: '',
  domicileAddress: '',
  phoneNumber: '',
  occupation: '',
  password: '',
  confirmPassword: '',
})

const nationalityOptions = [
  { label: 'Warga Negara Indonesia', value: 'WNI' },
  { label: 'Warga Negara Asing', value: 'WNA' },
]

const identityOptions = [
  { label: 'KTP', value: 'ktp' },
  { label: 'Paspor', value: 'passport' },
  { label: 'KITAS', value: 'kitas' },
]

const isStepValid = computed(() => {
  if (currentStep.value === 1) {
    return Boolean(
      form.fullName && form.birthPlace && form.nationality && form.email && form.birthDate,
    )
  }

  if (currentStep.value === 2) {
    return Boolean(
      form.identityType && form.identityFile && form.fullAddress && form.domicileAddress,
    )
  }

  return Boolean(
    form.phoneNumber &&
    form.occupation &&
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword,
  )
})

const primaryLabel = computed(() => (currentStep.value === 3 ? 'Daftar Sekarang' : 'Selanjutnya'))

const handleIdentityFile = (file: File) => {
  form.identityFile = file
}

const removeIdentityFile = () => {
  form.identityFile = null
}

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1
  }
}

const goNext = () => {
  if (!isStepValid.value) return

  if (currentStep.value < 3) {
    currentStep.value += 1
    showAlert({
      label: `Form pendaftaran step ${currentStep.value} siap dilengkapi.`,
      variant: 'info',
    })
    return
  }

  showAlert({
    label: 'Pendaftaran berhasil dikirim.',
    variant: 'success',
  })
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
              <path
                d="m15 5-7 7 7 7"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <h1 id="register-title">Form Pendaftaran</h1>
        </div>
        <span>{{ currentStep }}/3</span>
      </header>

      <form class="register-form" @submit.prevent="goNext">
        <div v-if="currentStep === 1" class="fields">
          <GInputText
            v-model="form.fullName"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
          />
          <GInputText
            v-model="form.birthPlace"
            label="Tempat Lahir"
            placeholder="Masukkan tempat lahir"
          />
          <GDropdown
            v-model="form.nationality"
            label="Kewarganegaraan"
            placeholder="Pilih kewarganegaraan"
            :items="nationalityOptions"
            item-value="value"
            item-text="label"
          />
          <GInputText
            v-model="form.email"
            type="email"
            label="Alamat Email"
            placeholder="Masukkan alamat email"
          />
          <GDatePicker
            v-model="form.birthDate"
            title="Tanggal Lahir"
            placeholder="Pilih tanggal lahir"
          />
        </div>

        <div v-else-if="currentStep === 2" class="fields">
          <GDropdown
            v-model="form.identityType"
            label="Jenis Identitas"
            placeholder="Pilih jenis identitas"
            :items="identityOptions"
            item-value="value"
            item-text="label"
          />

          <div class="upload-field">
            <label>Bukti Identitas</label>
            <GFilePicker
              unique-key="identity-proof"
              :file="form.identityFile"
              :image-only="false"
              csv-only
              error-text="Ukuran file CSV maksimal 10 MB"
              @file-dropped="handleIdentityFile"
              @file-removed="removeIdentityFile"
            />
            <p>Ukuran file CSV maksimal 10 MB</p>
          </div>

          <GTextArea
            v-model="form.fullAddress"
            label="Alamat Lengkap"
            placeholder="Masukkan alamat lengkap"
          />
          <GTextArea
            v-model="form.domicileAddress"
            label="Alamat Domisili"
            placeholder="Masukkan alamat domisili"
          />
        </div>

        <div v-else class="fields step-three">
          <GInputText
            v-model="form.phoneNumber"
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon"
          />
          <GInputText
            v-model="form.occupation"
            label="Pekerjaan Utama"
            placeholder="Masukkan pekerjaan utama"
          />

          <section class="account-section" aria-label="Informasi Akun">
            <h2>Informasi Akun</h2>
            <GInputText
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              label="Kata Sandi"
              placeholder="Masukkan kata sandi"
            >
              <template #suffix>
                <button
                  class="password-icon password-button"
                  type="button"
                  :aria-label="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                  @click="showPassword = !showPassword"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" />
                  </svg>
                </button>
              </template>
            </GInputText>
            <GInputText
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              label="Konfirmasi Kata Sandi"
              placeholder="Masukkan konfirmasi kata sandi"
            >
              <template #suffix>
                <button
                  class="password-icon password-button"
                  type="button"
                  :aria-label="
                    showConfirmPassword
                      ? 'Sembunyikan konfirmasi kata sandi'
                      : 'Tampilkan konfirmasi kata sandi'
                  "
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" />
                  </svg>
                </button>
              </template>
            </GInputText>
          </section>
        </div>

        <footer class="form-footer">
          <GButton
            class="register-action"
            :disabled="!isStepValid"
            :icon="false"
            :label="primaryLabel"
            size="md"
            type="primary"
          />
          <p>
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
  min-height: 688px;
  border-radius: 10px;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
}

.register-content {
  min-height: 688px;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.register-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

h1,
h2,
p {
  margin: 0;
}

h1,
h2 {
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
  min-height: 588px;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-three {
  gap: 24px;
}

.account-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.upload-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.upload-field label {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
}

.upload-field p {
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omega);
}

.password-icon {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
  color: var(--g-kit-black-60);
}

.password-button {
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.password-icon svg {
  width: 20px;
  height: 20px;
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
    min-height: auto;
  }

  .register-content,
  .register-form {
    min-height: auto;
  }

  .form-footer {
    margin-top: 32px;
  }
}
</style>
