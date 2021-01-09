import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types'
import { parseHeader } from '../helper/header'
import { createError } from '../helper/error'
import { isURLSameOrigin, isAbsolute, combinUrl } from '../helper/url';
import cookie from '../helper/cookie';
import CancelToken from '../cancel/CancelToken';
import {isFormData} from '../helper/util'
export function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise((resolve, reject) => {
    let {baseUrl,validateStatus,onDownProgress,onUploadProgress,xsrfCookieName,xsrfHeaderName,withCredentials,cancelToken,timeout, data = null, method = 'get', url, headers, responseType } = config
    if(baseUrl) {
      url = combinUrl(baseUrl,url);
    }
    let xhr = new XMLHttpRequest()
    xhr.open(method, url!, true)
    if (responseType) {
      xhr.responseType = responseType
    }
    if (timeout) {
      xhr.timeout = timeout
    }
    if(isFormData(data)) {
      delete headers['Content-Type'];
    }
    if(onDownProgress) {
      xhr.onprogress = onDownProgress;
    }
    if(onUploadProgress) {
      xhr.upload.onprogress = onUploadProgress;
    }
    if((withCredentials||isURLSameOrigin(url!))&&xsrfCookieName) {
        xhr.withCredentials = withCredentials!;
        const cookieVal = cookie.read(xsrfCookieName);
        if(cookieVal) {
          headers[xsrfHeaderName!] = cookieVal;
        }
    }
    xhr.onreadystatechange = function handle() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const responseHeader = xhr.getAllResponseHeaders()
          const response: IAxiosResponse = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: parseHeader(responseHeader),
            config,
            request: xhr,
            data: responseType === 'text' ? xhr.responseText : xhr.response
          }
          handleResponse(response)
        }
      }
    }
    //处理网络请求错误
    xhr.onerror = function handleError() {
      reject(createError('network error', true, config, '404', xhr, undefined))
    }
    //处理超时请求
    xhr.ontimeout = function handleTimeout() {
      reject(createError(`time out of ${timeout} ms`, true, config, undefined, xhr, undefined))
    }
 
    Object.keys(headers).map(key => {
      if (key.toUpperCase() === 'Content-Type') {
        delete headers[key]
      } else {
        xhr.setRequestHeader(key, headers[key])
      }
    })
    if(cancelToken) {
      cancelToken.promise.then(result=>{
        xhr.abort();
        reject(result)
      });
    }
    xhr.send(data)
    function handleResponse(res: IAxiosResponse): void {
      if (!validateStatus||validateStatus(res.status)) {
        resolve(res)
      } else {
        reject(
          createError(
            `request fail with code ${res.status}`,
            true,
            config,
            res.status.toString(),
            xhr,
            res
          )
        )
      }
    }
  })
}
