import {IAxiosRequestConfig} from '../types'
const defaults:IAxiosRequestConfig = {
    method:'get',
    timeout:0,
    headers:{
        common:{
            "accept":"application/json,text/plain,*/*"
        }
    }
};
const methodNoData = ['get','post','head','delete','options'];
for(let val of methodNoData) {
    defaults.headers[val] = {}

}
const methodWithData = ['post','patch'];
for(let val of methodWithData) {
    defaults.headers[val] = {
        'Content-Type':'application/x-www-form-urlencoded'
    };
}
export default defaults;