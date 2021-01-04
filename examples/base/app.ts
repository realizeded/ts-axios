import axios from '../../src/index'

axios({
  url:'/base/get',
  method:'get',
  params:{
    foo:['1','2']
  }
});