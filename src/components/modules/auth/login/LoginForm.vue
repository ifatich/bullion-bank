<script setup lang="ts">
import { ref } from 'vue'

import BaseCard from '@/components/shared/card/Card.vue'
import { GButton, GInputText } from '@/components'
import LoginHeader from './LoginHeader.vue'
import CaptchaCanvas from '@/components/shared/captcha/CaptchaCanvas.vue'

import { useLogin } from '@/hooks/useLogin'
import { useAppAlert } from '@/hooks/useAppAlert'

const { username, password, captchaInput, captchaActual, loading, lockoutTimeRemaining, login } = useLogin()
const showPassword = ref(false)
const { showAlert } = useAppAlert()
const captchaCanvasRef = ref<InstanceType<typeof CaptchaCanvas> | null>(null)

const handleLogin = async () => {
  const success = await login()
  if (!success) {
    captchaCanvasRef.value?.refresh()
  }
}

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

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="fields">
          <GInputText
            id="login-username"
            name="username"
            v-model="username"
            label="Username"
            placeholder="Username HCMS / Aralia"
            autocomplete="username"
          >
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
            id="login-password"
            name="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="Password"
            autocomplete="current-password"
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

          <div class="captcha-group">
            <label class="captcha-label">Captcha</label>
            <div class="captcha-figma-container">
              <CaptchaCanvas
                v-model:captcha="captchaActual"
                ref="captchaCanvasRef"
                :hide-refresh="true"
              />
              <input
                type="text"
                v-model="captchaInput"
                placeholder="Masukkan capcha"
                class="captcha-input-middle"
                autocomplete="off"
                :disabled="lockoutTimeRemaining > 0"
              />
              <button
                type="button"
                class="captcha-refresh-right"
                :disabled="lockoutTimeRemaining > 0"
                @click="captchaCanvasRef?.refresh()"
                aria-label="Refresh Captcha"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="refresh-icon"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button class="forgot" type="button" @click="requestPasswordReset">Lupa Password?</button>

        <GButton
          class="login-action"
          :loading="loading"
          :icon="false"
          :disabled="lockoutTimeRemaining > 0"
          :label="lockoutTimeRemaining > 0 ? `Coba lagi dalam ${lockoutTimeRemaining}s` : 'Masuk'"
          size="md"
          type="primary"
        />
      </form>

      <div class="help">
        <span>Belum punya akun?</span>
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

.login-form .group-input{
  margin-bottom: 0px;
}

.fields {
  display: grid;
  gap: 24px;
  margin-bottom: 24px;
}

.captcha-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.captcha-label {
  color: var(--g-kit-black-80, #0f172a);
  font-size: var(--g-kit-font-size-sigma, 14px);
  font-weight: var(--g-kit-font-weight-bold, 700);
  line-height: var(--g-kit-line-height-sigma, 20px);
}

.captcha-figma-container {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--g-kit-black-20, #cbd5e1);
  border-radius: 8px;
  overflow: hidden;
  height: 48px;
  background: var(--g-kit-white, #ffffff);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.captcha-figma-container:focus-within {
  border-color: var(--g-kit-lime-50, #84cc16);
  box-shadow: 0 0 0 2px rgba(132, 204, 22, 0.15);
}

.captcha-input-middle {
  flex: 1;
  border: none;
  outline: none;
  padding: 0 16px;
  font-size: var(--g-kit-font-size-sigma, 14px);
  color: var(--g-kit-black-80, #1e293b);
  background: transparent;
}

.captcha-input-middle::placeholder {
  color: var(--g-kit-black-40, #94a3b8);
}

.captcha-input-middle:disabled {
  cursor: not-allowed;
  color: var(--g-kit-black-40, #94a3b8);
}

.captcha-refresh-right {
  flex: 0 0 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--g-kit-black-60, #64748b);
  cursor: pointer;
  transition: all 0.2s ease;
}

.captcha-refresh-right:hover:not(:disabled) {
  background: var(--g-kit-black-5, #f1f5f9);
  color: var(--g-kit-black-80, #334155);
}

.captcha-refresh-right:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  color: var(--g-kit-black-30, #cbd5e1);
}

.refresh-icon {
  width: 20px;
  height: 20px;
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
  align-items: center;
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
