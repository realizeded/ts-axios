import axios from '../../src/index'
interface ResponseData<T> {
  code:number
  result:T
}
interface User {
  name:string
}
axios.interceptor.request.use(config=>{
  config.headers.test += '1';
  return config;
});
axios.interceptor.request.use(config=>{
  config.headers.test += '2';
  return config;
});
axios.interceptor.request.use(config=>{
  config.headers.test += '3';
  return config;
});
axios.interceptor.response.use(res=>{
  res.data = '3';
  return res;
});
axios.interceptor.response.use(res=>{
  res.data = '2';
   return res;
});
axios.interceptor.response.use(res=>{
  res.data = '1';
   return res;
});
axios<ResponseData<User>>('/extend/getUser',{
  method:'get',
  headers:{
    test:''
  }
}).then(res=>{
  console.log(res);
});