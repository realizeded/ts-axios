import axios from '../../src/index'
interface ResponseData<T> {
  code:number
  result:T
}
interface User {
  name:string
}

axios<ResponseData<User>>('/extend/getUser',{
  method:'post',
  headers:{
    test:''
  },
  transformRequest:[data=>{
    if(typeof data === 'object'&&data!=null) {
      data.val = 12;
    }
    return data;
  }],
  data:{
    a:1
  }
}).then(res=>{
  console.log(res);
});
