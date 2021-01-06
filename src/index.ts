import Axios from './core/Axios'
import defaults from './core/default'
import { AxiosInstance, extend,IAxiosRequestConfig} from './types'
function createInstance(config:IAxiosRequestConfig): AxiosInstance {
  const axios = new Axios(config)
  const request = Axios.prototype.request.bind(axios)
  extend(request, axios)
  return request as AxiosInstance
}
const axios = createInstance(defaults)
export default axios
export * from './types'
