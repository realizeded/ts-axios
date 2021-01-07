import Axios from './core/Axios'
import defaults from './core/default'
import mergeConfig from './core/mergeConfig'
import { AxiosStatic, extend,IAxiosRequestConfig} from './types'
import { isCancel } from './cancel/Cancel';
import CancelToken from './cancel/CancelToken';
function createInstance(config:IAxiosRequestConfig): AxiosStatic {
  const axios = new Axios(config)
  const request = Axios.prototype.request.bind(axios)
  extend(request, axios)
  return request as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = function(config?:IAxiosRequestConfig):AxiosStatic {
  return createInstance(mergeConfig(defaults,config));
}
axios.cancelToken = CancelToken;
axios.isCancel = isCancel;
export default axios
export * from './types'
