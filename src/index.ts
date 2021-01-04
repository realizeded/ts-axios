import { IAxiosRequestConfig } from './types/index'
import { xhr } from './xhr'
import { buildURL } from './helper/url'
function axios(config: IAxiosRequestConfig) {
  // TODO
  processConfig(config)
  xhr(config)
}
function processConfig(config: IAxiosRequestConfig): void {
  // 处理config

  config.url = transformURL(config)
}
function transformURL(config: IAxiosRequestConfig): string {
  const { params, url } = config
  return buildURL(url, params)
}
export default axios
