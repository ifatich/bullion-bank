import { ref } from 'vue'

export function useLogin() {
  const username = ref('')
  const password = ref('')
  const loading = ref(false)

  const login = async () => {
    try {
      loading.value = true

      console.log({
        username: username.value,
        password: password.value,
      })

      // API login integration will be added when the Bullion Bank endpoint is ready.
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
