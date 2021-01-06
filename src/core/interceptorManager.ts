import { ResolveFn, RejectFn } from '../types'
interface Interceptor<T> {
  resolved?: ResolveFn<T>
  rejected?: RejectFn
}
export default class interceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: ResolveFn<T>, rejected?: RejectFn): T | Promise<T> {
    this.interceptors.push({ resolved, rejected })
    return this.interceptors.length - 1
  }
  forEach(fn: (interceptos: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
