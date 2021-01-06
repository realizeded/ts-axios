import axios from '../../src/index';
axios.default.headers.common['text1'] = 'text1';
axios({
  url:'/extend/get',
  method:'get',
  headers:{
    "text2":"text2"
  }
});