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
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface IAxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: any
}

export interface IAxiosPromise<T = any> extends Promise<IAxiosResponse<T>> {}

export interface IAxiosError extends Error {
  isAxiosError: boolean
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  response?: IAxiosResponse
}

export interface Axios {
  interceptor: {
    request: AxiosInterceptorManager<IAxiosRequestConfig>
    response: AxiosInterceptorManager<IAxiosResponse>
  }
  request<T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>
  get<T = any>(url?: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  delete<T = any>(url?: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  head<T = any>(url?: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  options<T = any>(url?: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  post<T = any>(url?: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
  patch<T = any>(url?: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
}
export interface AxiosInstance extends Axios {
  <T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>
  <T = any>(url?: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
}
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number
  eject(id: number): void
}
export interface ResolveFn<T> {
  (val: T): T | Promise<T>
}
export interface RejectFn {
  (error: T): void
}
