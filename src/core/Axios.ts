import dispatchRequest from './dispatchRequest'
import { IAxiosRequestConfig, IAxiosPromise, Method, IAxiosResponse } from '../types/index'
import interceptorManager from './interceptorManager'
interface Interceptor {
  request: interceptorManager<IAxiosRequestConfig>
  response: interceptorManager<IAxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((resolve: dispatchRequest) => Promise<T>)
  rejectd: RejectFn
}
export default class Axios {
  interceptor: Interceptor
  constructor() {
    this.interceptor = {
      request: new interceptorManager<IAxiosRequestConfig>(),
      response: new interceptorManager<IAxiosResponse>()
    }
  }

  request(url: any, config?: IAxiosRequestConfig): IAxiosPromise {
    if (typeof url === 'string') {
      config = config || {}
      config.url = url
    } else {
      config = url
    }
    let chain: Array<PromiseChain<any>> = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    this.interceptor.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptor.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    let pro = Promise.resolve(config)
    while (chain.length) {
      const inter = chain.shift()
      pro = pro.then(inter.resolved, inter.rejected)
    }
    return pro
  }
  get(url?: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithoutData('get', url, config)
  }
  delete(url?: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithoutData('get', url, config)
  }
  head(url?: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithoutData('get', url, config)
  }
  options(url?: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithoutData('get', url, config)
  }
  post(url?: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithData('post', url, data, config)
  }
  patch(url?: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestWithData('post', url, data, config)
  }
  _requestWithoutData(method: Method, url?: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  _requestWithData(
    method: Method,
    url?: string,
    data?: any,
    config?: IAxiosRequestConfig
  ): IAxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
