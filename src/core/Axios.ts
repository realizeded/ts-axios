import dispatchRequest from './dispatchRequest'
import {CancelToken,ResolveFn, RejectFn, IAxiosRequestConfig, IAxiosPromise, Method, IAxiosResponse} from '../types/index';
import interceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig';
interface Interceptor {
  request: interceptorManager<IAxiosRequestConfig>
  response: interceptorManager<IAxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((resolve: typeof dispatchRequest) => Promise<T>)
  rejected?: RejectFn
}
export default class Axios {
  default:IAxiosRequestConfig
  interceptor: Interceptor
  constructor(config:IAxiosRequestConfig) {
    this.default = config;
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
    config = mergeConfig(this.default,config);
    
    let chain: Array<PromiseChain<any>> = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    this.interceptor.request.forEach(interceptor => {
      chain.unshift({resolved:interceptor.resolved!,rejected:interceptor.rejected});
    })
    this.interceptor.response.forEach(interceptor => {
      chain.push({resolved:interceptor.resolved!,rejected:interceptor.rejected})
    })
    let pro = Promise.resolve(config)
    while (chain.length) {
      const inter = chain.shift()
      pro = pro.then(inter!.resolved as (((value: IAxiosRequestConfig | undefined) => any) | null | undefined), inter!.rejected)
    }
    return pro as IAxiosPromise;
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
