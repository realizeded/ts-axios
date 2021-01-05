import { IAxiosRequestConfig, IAxiosResponse } from '../types'
class AxiosError extends Error {
  isAxiosError: boolean
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  response?: IAxiosResponse
  constructor(
    message: string,
    isAxiosError: boolean,
    config: IAxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: IAxiosResponse
  ) {
    super(message)
    this.isAxiosError = isAxiosError
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
export function createError(
  message: string,
  isAxiosError: boolean,
  config: IAxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: IAxiosResponse
): AxiosError {
  return new AxiosError(message, isAxiosError, config, code, request, response)
}
