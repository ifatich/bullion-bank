const CONFIG = {
  CHANNEL_ID: import.meta.env.VITE_CHANNEL_ID || '',
  CLIENTID: import.meta.env.VITE_CLIENT_ID,
  KEY_DECRYPT: import.meta.env.VITE_SECRET_KEY,
  EXA_HOST_ASSETS_URL: import.meta.env.VITE_EXA_HOST_ASSETS_URL,
}

export default CONFIG
