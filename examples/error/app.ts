import axios,{IAxiosError} from '../../src/index'
axios({
    url:'/error/get',
    method:'get',
    params:{
        a:'1',
        b:'2'
    }
}).then(res=>{
    console.log(res);
},err=>{
    console.log(err);
})
axios({
    url:'/error/timeout',
    method:'get',
    params:{
        a:'1',
        b:'2'
    },
    timeout:1000
}).then((res)=>{
},(err:IAxiosError)=>{
   
    console.log(err.message);
    console.log(err.config);
});
setTimeout(()=>{
    axios({
        url:'/error/get',
        method:'get',
        params:{
            a:'1',
            b:'2'
        }
    }).then(res=>{
        console.log(res);
    },err=>{
        console.log(err);
    });
},5000);