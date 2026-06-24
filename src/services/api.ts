import type { AxiosRequestConfig } from 'axios'

export const BullionBankBaseUrl = import.meta.env.VITE_API_BULLION_BANK_URL

function login(request: TParamsLogin) {
  const options: AxiosRequestConfig = {
    baseURL: BullionBankBaseUrl,
    data: request,
    method: 'POST',
    url: '/auth/login',
  }

  return options
}

export interface TParamsLogin {
  username: string
  password: string
}

export default {
  login,
}
