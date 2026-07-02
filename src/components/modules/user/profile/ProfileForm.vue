<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { GInputText, GDatePicker } from '@/components'
import { uniqueDatePickerFields as vUniqueDatePickerFields } from '@/directives/uniqueDatePickerFields'

const authStore = useAuthStore()

const isUserProfileOpen = ref(true)
const isCompanyDataOpen = ref(false)
const isDeedDataOpen = ref(false)
const isAddressOpen = ref(false)
const isManagerDataOpen = ref(false)
const isExecutorDataOpen = ref(false)
const isSecurityOpen = ref(true)

const walletId = ref('---')
const companyId = ref('---')
const fullName = ref('---')
const phoneNumber = ref('---')
const fullAddress = ref('---')
const email = ref('---')

// Step 1 — Data Perusahaan
const businessName = ref('---')
const directorName = ref('---')
const companyEmail = ref('---')
const nibNumber = ref('---')
const nibFile = ref('---')
const npwpNumber = ref('---')
const npwpFile = ref('---')

// Step 2 — Data Akta
const deedNo = ref('---')
const deedFile = ref('---')
const deedDate = ref('---')
const latestDeedNo = ref('---')
const latestDeedFile = ref('---')
const latestDeedDate = ref('---')

// Step 3 — Alamat
const province = ref('---')
const city = ref('---')
const district = ref('---')
const subDistrict = ref('---')
const rt = ref('---')
const rw = ref('---')

// Step 4 — Data Pengurus
const adminName = ref('---')
const adminNik = ref('---')
const adminNikFile = ref('---')
const adminNpwp = ref('---')
const adminNpwpFile = ref('---')
const adminPhone = ref('---')

// Step 5 — Data Pelaksana Transaksi
const executorName = ref('---')
const executorNik = ref('---')
const executorNikFile = ref('---')
const executorNpwp = ref('---')
const executorNpwpFile = ref('---')
const executorPhone = ref('---')

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordMismatchError = computed(() => {
  if (!newPassword.value || !confirmPassword.value) return ''

  return newPassword.value === confirmPassword.value
    ? ''
    : 'Password baru dan konfirmasi password tidak sama'
})

onMounted(async () => {
  if (!authStore.profile) {
    await authStore.fetchProfile()
  }
  if (authStore.profile) {
    walletId.value = authStore.walletAddress
    companyId.value = authStore.companyId
    fullName.value = authStore.userName
    phoneNumber.value = authStore.phone
    fullAddress.value = authStore.profile.companyAddress
    email.value = authStore.email

    // Step 1 — Data Perusahaan
    businessName.value = authStore.profile.businessName || '---'
    directorName.value = authStore.profile.directorName || '---'
    companyEmail.value = authStore.profile.companyEmail || '---'
    nibNumber.value = authStore.profile.nibNumber || '---'
    nibFile.value = typeof authStore.profile.nibFile === 'string' ? authStore.profile.nibFile : '---'
    npwpNumber.value = authStore.profile.npwpNumber || '---'
    npwpFile.value = typeof authStore.profile.npwpFile === 'string' ? authStore.profile.npwpFile : '---'

    // Step 2 — Data Akta
    deedNo.value = authStore.profile.deedNo || '---'
    deedFile.value = typeof authStore.profile.deedFile === 'string' ? authStore.profile.deedFile : '---'
    deedDate.value = authStore.profile.deedDate || '---'
    latestDeedNo.value = authStore.profile.latestDeedNo || '---'
    latestDeedFile.value = typeof authStore.profile.latestDeedFile === 'string' ? authStore.profile.latestDeedFile : '---'
    latestDeedDate.value = authStore.profile.latestDeedDate || '---'

    // Step 3 — Alamat
    province.value = authStore.profile.province || '---'
    city.value = authStore.profile.city || '---'
    district.value = authStore.profile.district || '---'
    subDistrict.value = authStore.profile.subDistrict || '---'
    rt.value = authStore.profile.rt || '---'
    rw.value = authStore.profile.rw || '---'

    // Step 4 — Data Pengurus
    adminName.value = authStore.profile.adminName || '---'
    adminNik.value = authStore.profile.adminNik || '---'
    adminNikFile.value = typeof authStore.profile.adminNikFile === 'string' ? authStore.profile.adminNikFile : '---'
    adminNpwp.value = authStore.profile.adminNpwp || '---'
    adminNpwpFile.value = typeof authStore.profile.adminNpwpFile === 'string' ? authStore.profile.adminNpwpFile : '---'
    adminPhone.value = authStore.profile.adminPhone || '---'

    // Step 5 — Data Pelaksana Transaksi
    executorName.value = authStore.profile.executorName || '---'
    executorNik.value = authStore.profile.executorNik || '---'
    executorNikFile.value = typeof authStore.profile.executorNikFile === 'string' ? authStore.profile.executorNikFile : '---'
    executorNpwp.value = authStore.profile.executorNpwp || '---'
    executorNpwpFile.value = typeof authStore.profile.executorNpwpFile === 'string' ? authStore.profile.executorNpwpFile : '---'
    executorPhone.value = authStore.profile.executorPhone || '---'
  }
})
</script>

<template>
  <section class="profile-card" aria-labelledby="profile-card-title">
    <!-- Section 1: User Profile -->
    <section class="profile-section" aria-labelledby="profile-card-title">
      <header class="section-header" @click="isUserProfileOpen = !isUserProfileOpen">
        <h1 id="profile-card-title">User Profile</h1>
        <button
          class="collapse-button"
          type="button"
          :class="{ 'is-collapsed': !isUserProfileOpen }"
          :aria-expanded="isUserProfileOpen"
          aria-controls="user-profile-panel"
          :aria-label="isUserProfileOpen ? 'Collapse user profile' : 'Expand user profile'"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div v-show="isUserProfileOpen" id="user-profile-panel" class="section-panel">
        <div class="field-grid">
          <GInputText
            id="profile-wallet-id"
            name="walletId"
            class="mb-0"
            v-model="walletId"
            label="Wallet ID"
            autocomplete="off"
            disabled
          />
          <GInputText
            id="profile-company-id"
            name="companyId"
            class="mb-0"
            v-model="companyId"
            label="Company ID"
            autocomplete="off"
            disabled
          />
          <GInputText
            id="profile-full-name"
            name="fullName"
            class="mb-0"
            v-model="fullName"
            label="Nama Lengkap"
            autocomplete="name"
            disabled
          />
          <GInputText
            id="profile-phone-number"
            name="phoneNumber"
            class="mb-0"
            v-model="phoneNumber"
            label="Nomor Telepon"
            autocomplete="tel"
            disabled
          />
        </div>

        <GInputText
          id="profile-full-address"
          name="fullAddress"
          class="mb-0"
          v-model="fullAddress"
          label="Alamat Lengkap"
          autocomplete="street-address"
          disabled
        />
      </div>
    </section>

    <div class="section-divider" aria-hidden="true" />

    <!-- Section 2: Data Perusahaan (Step 1) -->
    <section class="profile-section" aria-labelledby="company-data-title">
      <header class="section-header" @click="isCompanyDataOpen = !isCompanyDataOpen">
        <h2 id="company-data-title">Data Perusahaan</h2>
        <button
          class="collapse-button"
          type="button"
          :class="{ 'is-collapsed': !isCompanyDataOpen }"
          :aria-expanded="isCompanyDataOpen"
          aria-controls="company-data-panel"
          :aria-label="isCompanyDataOpen ? 'Collapse company data' : 'Expand company data'"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div v-show="isCompanyDataOpen" id="company-data-panel" class="section-panel">
        <div class="field-grid">
          <GInputText
            id="profile-business-name"
            name="businessName"
            class="mb-0"
            v-model="businessName"
            label="Nama Badan Usaha"
            disabled
          />
          <GInputText
            id="profile-director-name"
            name="directorName"
            class="mb-0"
            v-model="directorName"
            label="Nama Direktur Utama / CEO"
            disabled
          />
          <GInputText
            id="profile-company-email"
            name="companyEmail"
            class="mb-0"
            v-model="companyEmail"
            label="Email Perusahaan"
            disabled
          />
          <GInputText
            id="profile-nib-number"
            name="nibNumber"
            class="mb-0"
            v-model="nibNumber"
            label="No NIB"
            disabled
          />
          <GInputText
            id="profile-nib-file"
            name="nibFile"
            class="mb-0"
            v-model="nibFile"
            label="Dokumen NIB"
            disabled
          />
          <GInputText
            id="profile-npwp-number"
            name="npwpNumber"
            class="mb-0"
            v-model="npwpNumber"
            label="No NPWP Perusahaan"
            disabled
          />
          <GInputText
            id="profile-npwp-file"
            name="npwpFile"
            class="mb-0"
            v-model="npwpFile"
            label="Dokumen NPWP Perusahaan"
            disabled
          />
        </div>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true" />

    <!-- Section 3: Data Akta (Step 2) -->
    <section class="profile-section" aria-labelledby="deed-data-title">
      <header class="section-header" @click="isDeedDataOpen = !isDeedDataOpen">
        <h2 id="deed-data-title">Data Akta</h2>
        <button
          class="collapse-button"
          type="button"
          :class="{ 'is-collapsed': !isDeedDataOpen }"
          :aria-expanded="isDeedDataOpen"
          aria-controls="deed-data-panel"
          :aria-label="isDeedDataOpen ? 'Collapse deed data' : 'Expand deed data'"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div v-show="isDeedDataOpen" id="deed-data-panel" class="section-panel">
        <div class="field-grid">
          <GInputText
            id="profile-deed-no"
            name="deedNo"
            class="mb-0"
            v-model="deedNo"
            label="No Akta Pendirian"
            disabled
          />
          <GInputText
            id="profile-deed-file"
            name="deedFile"
            class="mb-0"
            v-model="deedFile"
            label="Dokumen Akta Pendirian"
            disabled
          />
          <GDatePicker
            v-unique-date-picker-fields="{ id: 'profile-deed-date', name: 'deedDate' }"
            id="profile-deed-date"
            name="deedDate"
            class="mb-0"
            v-model="deedDate"
            title="Tanggal Akta Pendirian"
            disabled
          />
          <GInputText
            id="profile-latest-deed-no"
            name="latestDeedNo"
            class="mb-0"
            v-model="latestDeedNo"
            label="No Akta Perubahan Terakhir"
            disabled
          />
          <GInputText
            id="profile-latest-deed-file"
            name="latestDeedFile"
            class="mb-0"
            v-model="latestDeedFile"
            label="Dokumen Akta Perubahan Terakhir"
            disabled
          />
          <GDatePicker
            v-unique-date-picker-fields="{ id: 'profile-latest-deed-date', name: 'latestDeedDate' }"
            id="profile-latest-deed-date"
            name="latestDeedDate"
            class="mb-0"
            v-model="latestDeedDate"
            title="Tanggal Akta Perubahan Terakhir"
            disabled
          />
        </div>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true" />

    <!-- Section 4: Alamat (Step 3) -->
    <section class="profile-section" aria-labelledby="address-title">
      <header class="section-header" @click="isAddressOpen = !isAddressOpen">
        <h2 id="address-title">Alamat Perusahaan</h2>
        <button
          class="collapse-button"
          type="button"
          :class="{ 'is-collapsed': !isAddressOpen }"
          :aria-expanded="isAddressOpen"
          aria-controls="address-panel"
          :aria-label="isAddressOpen ? 'Collapse address data' : 'Expand address data'"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div v-show="isAddressOpen" id="address-panel" class="section-panel">
        <div class="field-grid">
          <GInputText
            id="profile-province"
            name="province"
            class="mb-0"
            v-model="province"
            label="Provinsi"
            disabled
          />
          <GInputText
            id="profile-city"
            name="city"
            class="mb-0"
            v-model="city"
            label="Kota/Kabupaten"
            disabled
          />
          <GInputText
            id="profile-district"
            name="district"
            class="mb-0"
            v-model="district"
            label="Kecamatan"
            disabled
          />
          <GInputText
            id="profile-sub-district"
            name="subDistrict"
            class="mb-0"
            v-model="subDistrict"
            label="Kelurahan"
            disabled
          />
          <GInputText
            id="profile-rt"
            name="rt"
            class="mb-0"
            v-model="rt"
            label="RT"
            disabled
          />
          <GInputText
            id="profile-rw"
            name="rw"
            class="mb-0"
            v-model="rw"
            label="RW"
            disabled
          />
        </div>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true" />

    <!-- Section 5: Data Pengurus (Step 4) -->
    <section class="profile-section" aria-labelledby="manager-data-title">
      <header class="section-header" @click="isManagerDataOpen = !isManagerDataOpen">
        <h2 id="manager-data-title">Data Pengurus</h2>
        <button
          class="collapse-button"
          type="button"
          :class="{ 'is-collapsed': !isManagerDataOpen }"
          :aria-expanded="isManagerDataOpen"
          aria-controls="manager-data-panel"
          :aria-label="isManagerDataOpen ? 'Collapse manager data' : 'Expand manager data'"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div v-show="isManagerDataOpen" id="manager-data-panel" class="section-panel">
        <div class="field-grid">
          <GInputText
            id="profile-admin-name"
            name="adminName"
            class="mb-0"
            v-model="adminName"
            label="Nama Admin"
            disabled
          />
          <GInputText
            id="profile-admin-nik"
            name="adminNik"
            class="mb-0"
            v-model="adminNik"
            label="NIK Admin"
            disabled
          />
          <GInputText
            id="profile-admin-nik-file"
            name="adminNikFile"
            class="mb-0"
            v-model="adminNikFile"
            label="Dokumen NIK Admin"
            disabled
          />
          <GInputText
            id="profile-admin-npwp"
            name="adminNpwp"
            class="mb-0"
            v-model="adminNpwp"
            label="NPWP Admin"
            disabled
          />
          <GInputText
            id="profile-admin-npwp-file"
            name="adminNpwpFile"
            class="mb-0"
            v-model="adminNpwpFile"
            label="Dokumen NPWP Admin"
            disabled
          />
          <GInputText
            id="profile-admin-phone"
            name="adminPhone"
            class="mb-0"
            v-model="adminPhone"
            label="Nomor Telepon Admin"
            disabled
          />
        </div>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true" />

    <!-- Section 6: Data Pelaksana Transaksi (Step 5) -->
    <section class="profile-section" aria-labelledby="executor-data-title">
      <header class="section-header" @click="isExecutorDataOpen = !isExecutorDataOpen">
        <h2 id="executor-data-title">Data Pelaksana Transaksi</h2>
        <button
          class="collapse-button"
          type="button"
          :class="{ 'is-collapsed': !isExecutorDataOpen }"
          :aria-expanded="isExecutorDataOpen"
          aria-controls="executor-data-panel"
          :aria-label="isExecutorDataOpen ? 'Collapse executor data' : 'Expand executor data'"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div v-show="isExecutorDataOpen" id="executor-data-panel" class="section-panel">
        <div class="field-grid">
          <GInputText
            id="profile-executor-name"
            name="executorName"
            class="mb-0"
            v-model="executorName"
            label="Nama Pelaksana Transaksi"
            disabled
          />
          <GInputText
            id="profile-executor-nik"
            name="executorNik"
            class="mb-0"
            v-model="executorNik"
            label="NIK Pelaksana Transaksi"
            disabled
          />
          <GInputText
            id="profile-executor-nik-file"
            name="executorNikFile"
            class="mb-0"
            v-model="executorNikFile"
            label="Dokumen NIK Pelaksana Transaksi"
            disabled
          />
          <GInputText
            id="profile-executor-npwp"
            name="executorNpwp"
            class="mb-0"
            v-model="executorNpwp"
            label="NPWP Pelaksana Transaksi"
            disabled
          />
          <GInputText
            id="profile-executor-npwp-file"
            name="executorNpwpFile"
            class="mb-0"
            v-model="executorNpwpFile"
            label="Dokumen NPWP Pelaksana Transaksi"
            disabled
          />
          <GInputText
            id="profile-executor-phone"
            name="executorPhone"
            class="mb-0"
            v-model="executorPhone"
            label="Nomor Telepon Pelaksana Transaksi"
            disabled
          />
        </div>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true" />

    <!-- Section 7: Security Preferences -->
    <section class="profile-section" aria-labelledby="security-title">
      <header class="section-header" @click="isSecurityOpen = !isSecurityOpen">
        <h2 id="security-title">Security Preferences</h2>
        <button
          class="collapse-button"
          type="button"
          :class="{ 'is-collapsed': !isSecurityOpen }"
          :aria-expanded="isSecurityOpen"
          aria-controls="security-panel"
          :aria-label="
            isSecurityOpen ? 'Collapse security preferences' : 'Expand security preferences'
          "
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div v-show="isSecurityOpen" id="security-panel" class="section-panel">
        <GInputText
          id="profile-email"
          name="email"
          class="mb-0"
          v-model="email"
          label="Email"
          autocomplete="email"
          disabled
        />
        <GInputText
          id="profile-old-password"
          name="oldPassword"
          class="mb-0"
          v-model="oldPassword"
          :type="showOldPassword ? 'text' : 'password'"
          label="Password Lama"
          placeholder="Masukkan password lama"
          autocomplete="current-password"
        >
          <template #suffix>
            <button
              class="password-icon password-button"
              type="button"
              :aria-label="
                showOldPassword ? 'Sembunyikan password lama' : 'Tampilkan password lama'
              "
              @click.stop="showOldPassword = !showOldPassword"
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

        <div class="field-grid">
          <GInputText
            id="profile-new-password"
            name="newPassword"
            class="mb-0"
            v-model="newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            label="Masukkan Password Baru"
            placeholder="Masukkan password baru"
            autocomplete="new-password"
          >
            <template #suffix>
              <button
                class="password-icon password-button"
                type="button"
                :aria-label="
                  showNewPassword ? 'Sembunyikan password baru' : 'Tampilkan password baru'
                "
                @click.stop="showNewPassword = !showNewPassword"
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
            id="profile-confirm-password"
            name="confirmPassword"
            class="mb-0"
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Konfirmasi Password Baru"
            placeholder="Konfirmasi password baru"
            autocomplete="new-password"
            :error="passwordMismatchError"
          >
            <template #suffix>
              <button
                class="password-icon password-button"
                type="button"
                :aria-label="
                  showConfirmPassword
                    ? 'Sembunyikan konfirmasi password baru'
                    : 'Tampilkan konfirmasi password baru'
                "
                @click.stop="showConfirmPassword = !showConfirmPassword"
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
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.profile-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.profile-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  user-select: none;
}

h1,
h2 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.collapse-button {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--g-kit-black-60);
  cursor: pointer;
  pointer-events: none; /* Let header click trigger the toggle */
}

.collapse-button svg {
  width: 24px;
  height: 24px;
  transition: transform 0.2s ease;
}

.collapse-button.is-collapsed svg {
  transform: rotate(180deg);
}

.section-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.section-divider {
  width: 100%;
  height: 8px;
  background: var(--g-kit-black-10);
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

@media (max-width: 760px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
}
</style>
