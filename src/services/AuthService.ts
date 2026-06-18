const TOKEN_KEY = 'bullion_bank_token'

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export default {
  getToken,
  setToken,
  clearToken
}
