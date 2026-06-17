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

      // API LOGIN HERE
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
