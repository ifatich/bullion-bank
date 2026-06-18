<script setup lang="ts">
import { ref } from 'vue'

import { GInputText } from '@/components'

const isUserProfileOpen = ref(true)
const isSecurityOpen = ref(true)
const walletId = ref('---')
const companyId = ref('---')
const fullName = ref('---')
const phoneNumber = ref('---')
const fullAddress = ref('Masukkan amount')
const email = ref('pegadaian@bullion.co.id')
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
</script>

<template>
  <section class="profile-card" aria-labelledby="profile-card-title">
    <section class="profile-section" aria-labelledby="profile-card-title">
      <header class="section-header">
        <h1 id="profile-card-title">User Profile</h1>
        <button
          class="collapse-button"
          type="button"
          :class="{ 'is-collapsed': !isUserProfileOpen }"
          :aria-expanded="isUserProfileOpen"
          aria-controls="user-profile-panel"
          :aria-label="isUserProfileOpen ? 'Collapse user profile' : 'Expand user profile'"
          @click="isUserProfileOpen = !isUserProfileOpen"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div v-show="isUserProfileOpen" id="user-profile-panel" class="section-panel">
        <div class="field-grid">
          <GInputText class="mb-0" v-model="walletId" label="Wallet ID" disabled />
          <GInputText class="mb-0" v-model="companyId" label="Company ID" disabled />
          <GInputText class="mb-0" v-model="fullName" label="Nama Lengkap" disabled />
          <GInputText class="mb-0" v-model="phoneNumber" label="Nomor Telepon" disabled />
        </div>

        <GInputText class="mb-0" v-model="fullAddress" label="Alamat Lengkap" disabled />
      </div>
    </section>

    <div class="section-divider" aria-hidden="true" />

    <section class="profile-section" aria-labelledby="security-title">
      <header class="section-header">
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
          @click="isSecurityOpen = !isSecurityOpen"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div v-show="isSecurityOpen" id="security-panel" class="section-panel">
        <GInputText class="mb-0" v-model="email" label="Email" disabled />
        <GInputText
          class="mb-0"
          v-model="oldPassword"
          :type="showOldPassword ? 'text' : 'password'"
          label="Password Lama"
          placeholder="Masukkan password lama"
        >
          <template #suffix>
            <button
              class="password-icon password-button"
              type="button"
              :aria-label="
                showOldPassword ? 'Sembunyikan password lama' : 'Tampilkan password lama'
              "
              @click="showOldPassword = !showOldPassword"
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
            class="mb-0"
            v-model="newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            label="Masukkan Password Baru"
            placeholder="Masukkan password baru"
          >
            <template #suffix>
              <button
                class="password-icon password-button"
                type="button"
                :aria-label="
                  showNewPassword ? 'Sembunyikan password baru' : 'Tampilkan password baru'
                "
                @click="showNewPassword = !showNewPassword"
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
            class="mb-0"
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Konfirmasi Password Baru"
            placeholder="Konfirmasi password baru"
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
