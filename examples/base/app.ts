import axios,{Cancel}from '../../src/index';
/* const CancelToken = axios.cancelToken;
const source = CancelToken.source();
axios({
  url:"/reject/get",
  method:'get',
  cancelToken:source.token
}).catch((e:Cancel)=>{
  if(axios.isCancel(e)) {
    console.log(e.message);
  }
});
console.log('请求发送');
setTimeout(()=>{
  source.cancel('network is error');
},1000) */
const CancelToken = axios.cancelToken;
let cancel:any;
axios({
  url:"/reject/get",
  method:'get',
  cancelToken:new CancelToken(c=>{
    cancel=c;
  })
}).catch((e:Cancel)=>{
  if(axios.isCancel(e)) {
    console.log(e.message);
  }
});
console.log('请求发送');
setTimeout(()=>{
  cancel('network is error');
},1000)