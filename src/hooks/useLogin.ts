import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAppAlert } from '@/hooks/useAppAlert'

export function useLogin() {
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const loading = ref(false)
  const { showAlert } = useAppAlert()

  const login = async () => {
    if (!username.value || !password.value) {
      showAlert({
        label: 'Username dan password wajib diisi.',
        variant: 'warning',
      })
      return
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
    } finally {
      loading.value = false
    }
  }

  return {
    username,
    password,
    loading,
    login,
  }
}
