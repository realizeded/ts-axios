import {IAxiosRequestConfig} from '../types';
import {deepMerge,isPlainObject} from '../helper/util';
const stract = Object.create(null);
function defaultStart(val1:any,val2:any):any {
    return typeof val2 !== 'undefined'?val2:val1;
}
function fromVal2Start(val1:any,val2:any):any {
    if(typeof val2 !== 'undefined') {
        return val2;
    }
}
const stractKeyMap = ['url','data','params'];
stractKeyMap.forEach(key=>{
    stract[key] = fromVal2Start;
})
function deepMergeStart(val1:any,val2:any):any {
    if(isPlainObject(val2)) {
        return deepMerge(val1,val2);
    }else if(typeof val2 !== 'undefined') {
        return val2;
    } else if(isPlainObject(val1)) {
        return deepMerge(val2);
    } else {
        return val1;
    }
}
const starctDeepMergeKeyMap = ['headers'];
for(let val of starctDeepMergeKeyMap) {
    stract[val] = deepMergeStart;
}
const starctMergeArrayKeyMap = ['transformRequest','transformResponse'];
starctMergeArrayKeyMap.forEach(key=>{
    stract[key] = starctMergeArray;
})
function starctMergeArray(val1:any,val2:any):any {
    val2 = val2||[];
    return [...val1,...val2];
}
function mergeConfig(config1:IAxiosRequestConfig,config2?:IAxiosRequestConfig) {
    if(!config2) {
        config2 = {};
    }
    const config = Object.create(null);
    for(let key in config2) {
        mergeField(key);
    }
    for(let key in config1) {
        if(!config2[key]) {
            mergeField(key);
        }
    }
    function mergeField(key:string):void {
        const stracts = stract[key]||defaultStart;
        config[key] = stracts(config1[key],config2![key])
        
    }
    return config;
}
export default mergeConfig;