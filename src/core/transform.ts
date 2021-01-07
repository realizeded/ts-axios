import {AxiosTransform} from '../types'
function transform(data:any,header:any,fns?:AxiosTransform|AxiosTransform[]):any {
    if(!fns) {
        return data;
    }
    if(!Array.isArray(fns)) {
        fns = [fns];
    }
    fns.forEach(fn=>{
        data = fn(data,header);
    })

    return data;
}
export default transform;