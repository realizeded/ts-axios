import { isDate, isObject } from './util'
function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildURL(url: string, params?: any): string {
  // 1.传递的是null或者undefined
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    // 数组
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      }
      if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  const serializedParams = parts.join('&')
  if (serializedParams) {
    // 进行url+params拼接
    // 去除hash
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex)
    }
    url += url.indexOf('?') !== -1 ? '&' : '?'
    url += serializedParams
  }
  return url
}
