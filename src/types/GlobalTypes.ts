export interface TBaseResponse<T = unknown> {
  responseCode?: string
  responseDescription?: string
  data?: T
}
