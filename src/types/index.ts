export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'head'
  | 'HEAD'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
export interface IAxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
}
