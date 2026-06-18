<script setup lang="ts">
import { ref } from 'vue'

import BaseCard from '@/components/shared/card/Card.vue'
import { GButton, GInputText } from '@/components'
import LoginHeader from './LoginHeader.vue'

import { useLogin } from '@/hooks/useLogin'
import { useAppAlert } from '@/hooks/useAppAlert'

const { username, password, loading, login } = useLogin()
const showPassword = ref(false)
const { showAlert } = useAppAlert()

const requestPasswordReset = () => {
  showAlert({
    label: 'Fitur lupa password belum terhubung.',
    variant: 'warning',
  })
}
</script>

<template>
  <BaseCard class="login-card">
    <div class="login-card-inner">
      <LoginHeader />

      <form class="login-form" @submit.prevent="login">
        <div class="fields">
          <GInputText v-model="username" label="Username" placeholder="Username HCMS / Aralia">
            <template #prefix>
              <span class="field-icon field-icon-prefix" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </template>
          </GInputText>

          <GInputText
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="Password"
          >
            <template #prefix>
              <span class="field-icon field-icon-prefix" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            </template>

            <template #suffix>
              <button
                class="field-icon field-icon-button"
                type="button"
                :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
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
        </div>

        <button class="forgot" type="button" @click="requestPasswordReset">Lupa Password?</button>

        <GButton
          class="login-action"
          :loading="loading"
          :icon="false"
          label="Masuk"
          size="md"
          type="primary"
        />
      </form>

      <div class="help">
        <span>Butuh Bantuan ?</span>
        <RouterLink to="/register">Klik disini</RouterLink>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
.login-card {
  width: 100%;
  max-width: 542px;
  min-height: 716px;
  padding: 95px 0;
  border-radius: 10px;
  box-shadow: none;
}

.login-card-inner {
  width: 372px;
  margin: 0 auto;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.fields {
  display: grid;
  gap: 24px;
  margin-bottom: 24px;
}

.forgot {
  align-self: flex-end;
  padding: 0;
  border: 0;
  margin-bottom: 24px;
  background: transparent;
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  cursor: pointer;
  text-decoration: none;
}

.login-action {
  width: 100%;
}

.help {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.help a {
  color: var(--g-kit-lime-50);
  font-weight: var(--g-kit-font-weight-bold);
  text-decoration: none;
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

.field-icon-prefix {
  margin-left: 14px;
}

.field-icon-button {
  margin-right: 14px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.login-action {
  width: 100%;
}

@media (max-width: 768px) {
  .login-card-inner {
    width: min(372px, calc(100vw - 64px));
  }

  .login-card {
    min-height: auto;
    padding: 48px 0;
  }

  .help {
    flex-wrap: wrap;
    margin-top: 32px;
  }
}

@media (max-width: 420px) {
  .login-card-inner {
    width: calc(100vw - 48px);
  }
}
</style>
