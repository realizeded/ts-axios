import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types'
import { parseHeader } from '../helper/header'
import { createError } from '../helper/error'
import CancelToken from '../cancel/CancelToken';
export function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise((resolve, reject) => {
    const { cancelToken,timeout, data = null, method = 'get', url, headers, responseType } = config
    let xhr = new XMLHttpRequest()
    xhr.open(method, url!, true)
    if (responseType) {
      xhr.responseType = responseType
    }
    if (timeout) {
      xhr.timeout = timeout
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
      if (res.status >= 200 && res.status <= 200) {
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
