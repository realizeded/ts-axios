import { isPlainObject } from './util'
function normalizeHeaerName(header: any, normalizeName: string): void {
  Object.keys(header).forEach(key => {
    if (key !== normalizeName && key.toUpperCase() === normalizeName.toUpperCase()) {
      header[normalizeName] = header(key)
      delete header[key]
    }
  })
}
export function parseHeader(header: string): any {
  const parse = Object.create(null)
  if (!header) {
    return parse
  }
  header.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    if (!key) {
      return
    }
    key = key.trim().toLowerCase()
    if (val) {
      val = val.trim()
    }
    parse[key] = val
  })
  return parse
}
export function processHeader(header: any, data: any): any {
  if (header == undefined) {
    return header
  }
  normalizeHeaerName(header, 'Content-Type')
  if (isPlainObject(data)) {
    //设置Content-Type默认值
    if (header && !header['Content-Type']) {
      header['Content-Type'] = 'application/json;charset=utf8'
    }
  }
  return header
}
