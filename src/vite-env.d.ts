/// <reference types="vite/client" />

declare module 'kitvue-public/*' {}

interface ImportMetaEnv {
  readonly VITE_API_BULLION_BANK_URL: string
  readonly VITE_SECRET_KEY: string
  readonly VITE_CLIENT_ID: string
  readonly VITE_CHANNEL_ID: string
  readonly VITE_EXA_HOST_ASSETS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
