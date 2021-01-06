import Axios from './core/Axios'
import { AxiosInstance, extend } from './types'
function createInstance(): AxiosInstance {
  const axios = new Axios()
  const request = Axios.prototype.request.bind(axios)
  extend(request, axios)
  return request as AxiosInstance
}
const axios = createInstance()
export default axios
export * from './types'
