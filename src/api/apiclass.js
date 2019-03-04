import axios from "axios";
import config from './config'
debugger
axios.defaults.baseURL = config.baseURL
axios.defaults.data = {}

// 请求拦截器
axios.interceptors.request.use(config=>{
    return config;
},err=>{
    /* return Promise.reject(err); */
});

// 响应拦截器
// axios.interceptors.response.use(res=>{
//     debugger
//     var msg=res.data.msg || res.data.message;
//     if(res.status!==200){
//         Message.warning(msg);
//     }else{
//         if(res.data.result.toString()==='0'){
//             Message.success(msg);
//         }else{
//             Message.warning(msg);
//         }
//     }
//     return res;
// },err=>{
//     Message.error('网络错误，请稍后再试！');
//     /* return Promise.reject(err); */
// });


class API {
    constructor(url) {
        this.url = url;
    }
    queryinfo(param, resolve, reject) {
        let url = this.url + "/info.do"; 
        debugger  
        axios.post(url, param).then(function(res) {
                return resolve(res);
            }).catch(function(res) {
                 return reject(res);
        });
    }
   
}
export default API;
