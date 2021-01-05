import axios from '../../src/index'
/* 
axios({
  url:'/base/get',
  method:'get',
  params:{
    foo:['1','2']
  }
}); */
axios({
  url:'/base/post',
  method:'post',
  headers:{
    "Content-Type":"application/json;charset=utf8"
  },
  responseType:'json',
  data:{
    a:'12',
    b:'13'
  }
}).then(res=>{
  console.log(res);
});


axios({
  url:'/base/formpost',
  method:'post',
  headers:{
    "Content-Type":"application/json;charset=utf8"
  },
  data:{
    a:'12',
    b:'13'
  }
}).then(res=>{
  console.log(res);
});