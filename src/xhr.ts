import { IAxiosRequestConfig } from './types'
export function xhr(config: IAxiosRequestConfig): void {
  const { data = null, method = 'get', url, headers } = config
  let xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  Object.keys(headers).map(key => {
    if (key.toUpperCase() === 'Content-Type') {
      delete headers[key]
    } else {
      xhr.setRequestHeader(key, headers[key])
    }
  })
  xhr.send(data)
}
