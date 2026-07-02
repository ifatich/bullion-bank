import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAppAlert } from '@/hooks/useAppAlert'

export function useLogin() {
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const captchaInput = ref('')
  const captchaActual = ref('')
  const loading = ref(false)
  const { showAlert } = useAppAlert()

  const loginAttempts = ref(0)
  const lockoutTimeRemaining = ref(0)
  let lockoutTimer: ReturnType<typeof setInterval> | null = null

  const runLockoutTimer = (seconds: number) => {
    lockoutTimeRemaining.value = seconds
    if (lockoutTimer) clearInterval(lockoutTimer)

    lockoutTimer = setInterval(() => {
      const storedEndTime = Number(localStorage.getItem('bb_login_lockout_end') || 0)
      const remaining = Math.ceil((storedEndTime - Date.now()) / 1000)
      if (remaining <= 0) {
        if (lockoutTimer) {
          clearInterval(lockoutTimer)
          lockoutTimer = null
        }
        lockoutTimeRemaining.value = 0
        loginAttempts.value = 0
        localStorage.removeItem('bb_login_lockout_end')
      } else {
        lockoutTimeRemaining.value = remaining
      }
    }, 1000)
  }

  const startLockout = () => {
    const endTime = Date.now() + 60000
    localStorage.setItem('bb_login_lockout_end', endTime.toString())
    runLockoutTimer(60)
  }

  // Check for existing lockout on hook initialization
  const storedEndTime = Number(localStorage.getItem('bb_login_lockout_end') || 0)
  if (storedEndTime > Date.now()) {
    const remaining = Math.ceil((storedEndTime - Date.now()) / 1000)
    lockoutTimeRemaining.value = remaining
    runLockoutTimer(remaining)
  }

  onUnmounted(() => {
    if (lockoutTimer) {
      clearInterval(lockoutTimer)
    }
  })

  const login = async () => {
    if (lockoutTimeRemaining.value > 0) {
      showAlert({
        label: `Mencoba terlalu sering. Silakan tunggu ${lockoutTimeRemaining.value} detik.`,
        variant: 'danger',
      })
      return false
    }

    if (!username.value || !password.value) {
      showAlert({
        label: 'Username dan password wajib diisi.',
        variant: 'warning',
      })
      handleFailure()
      return false
    }

    if (!captchaInput.value) {
      showAlert({
        label: 'Captcha wajib diisi.',
        variant: 'warning',
      })
      handleFailure()
      return false
    }

    if (captchaInput.value !== captchaActual.value) {
      showAlert({
        label: 'Captcha yang Anda masukkan salah.',
        variant: 'danger',
      })
      captchaInput.value = ''
      handleFailure()
      return false
    }

    try {
      loading.value = true

      console.log({
        username: username.value,
        password: password.value,
      })

      // API login integration will be added when the Bullion Bank endpoint is ready.
      showAlert({
        label: 'Login berhasil.',
        variant: 'success',
      })
      router.push('/dashboard')
      loginAttempts.value = 0 // Reset attempts on successful login
      return true
    } catch (error) {
      console.error(error)
      captchaInput.value = ''
      handleFailure()
      return false
    } finally {
      loading.value = false
    }
  }

  const handleFailure = () => {
    loginAttempts.value++
    if (loginAttempts.value >= 3) {
      startLockout()
      showAlert({
        label: 'Gagal 3 kali. Form login terkunci selama 1 menit.',
        variant: 'danger',
      })
    }
  }

  return {
    username,
    password,
    captchaInput,
    captchaActual,
    loading,
    lockoutTimeRemaining,
    login,
  }
}
