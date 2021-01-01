import { IAxiosRequestConfig } from './types'
export function xhr(config: IAxiosRequestConfig): void {
  const { data = null, method = 'get', url } = config
  let xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.send(data)
}
