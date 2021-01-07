import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types/index';
import { xhr } from '../core/xhr'
import { buildURL } from '../helper/url'
import { transformData, transformResponseData } from '../helper/data'
import { processHeader,flatHeader } from '../helper/header'
import transform from './transform';
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

 /*  config.data = transformRequestData(config)
  config.headers = transformHeaders(config) */

  config.data = transform(config.data,config.headers,config.transformRequest);
  config.headers = flatHeader(config.headers,config.method);
}
function transformURL(config: IAxiosRequestConfig): string {
  const { params, url } = config
  return buildURL(url!, params)
}
function transformRequestData(config: IAxiosRequestConfig): any {
  return transformData(config.data)
}
function transformResponsesData(res: IAxiosResponse): IAxiosResponse {
  res.data = transform(res.data,res.headers,res.config.transformResponse);
  return res;
}
function transformHeaders(config: IAxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeader(headers, data)
}
function throwIfCancellationRequested(config:IAxiosRequestConfig):void {
  if(config.cancelToken) {
    config.cancelToken?.throwIfCancelRequest();
  }

}
export default dispatchRequest
