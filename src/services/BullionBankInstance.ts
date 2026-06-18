import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
  type AxiosResponse
} from 'axios'

import authService from '@/services/AuthService'

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

export default class BullionBankInstance {
  axios: AxiosInstance

  constructor() {
    this.axios = Axios.create()

    this.axios.interceptors.request.use((config): AdaptAxiosRequestConfig => {
      const clientId = import.meta.env.VITE_CLIENT_ID

      if (clientId) {
        config.headers['x-client-id'] = clientId
      }

      const token = authService.getToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config as AdaptAxiosRequestConfig
    })

    this.axios.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error) => {
        if (error.message === 'Network Error') {
          throw new Error('Anda sedang offline, cek koneksi internet anda.')
        }

        if (error.response) {
          throw new Error('Terjadi kesalahan. Silahkan ulangi beberapa saat lagi.')
        }

        throw error
      }
    )
  }
}
