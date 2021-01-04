import { IAxiosRequestConfig } from './types/index'
import { xhr } from './xhr'
import { buildURL } from './helper/url'
import { transformData } from './helper/data'
import { processHeader } from './helper/header'
function axios(config: IAxiosRequestConfig) {
  // TODO
  processConfig(config)
  xhr(config)
}
function processConfig(config: IAxiosRequestConfig): void {
  // 处理config

  config.url = transformURL(config)
  config.data = transformRequestData(config)
  config.headers = transformHeaders(config)
}
function transformURL(config: IAxiosRequestConfig): string {
  const { params, url } = config
  return buildURL(url, params)
}
function transformRequestData(config: IAxiosRequestConfig): any {
  return transformData(config.data)
}
function transformHeaders(config: IAxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeader(headers, data)
}
export default axios
