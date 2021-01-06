import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types/index'
import { xhr } from '../core/xhr'
import { buildURL } from '../helper/url'
import { transformData, transformResponseData } from '../helper/data'
import { processHeader } from '../helper/header'
function dispatchRequest(config: IAxiosRequestConfig): IAxiosPromise {
  // TODO
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponsesData(res)
  })
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
function transformResponsesData(res: IAxiosResponse): IAxiosResponse {
  res.data = transformResponseData(res.data)
  return res
}
function transformHeaders(config: IAxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeader(headers, data)
}
export default dispatchRequest
