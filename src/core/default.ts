import {IAxiosRequestConfig} from '../types'
import { transformData,transformResponseData} from '../helper/data';
import {processHeader} from '../helper/header';
const defaults:IAxiosRequestConfig = {
    method:'get',
    timeout:0,
    headers:{
        common:{
            "accept":"application/json,text/plain,*/*"
        }
    },
    transformRequest:[
        function(data:any,header?:any):any {
            processHeader(header,data);
            return transformData(data);
        }
    ],
    transformResponse:[
        function(data:any):any {
            return transformResponseData(data);
        }
    ]
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