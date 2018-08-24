import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/vuex/store'
// axios 配置
axios.defaults.timeout = 3000; // 设置超时时间为3s
// 配置axios发送请求时携带cookie
axios.defaults.withCredentials = false;

// 设置content-type
// 这里处理的是 针对SpringMVC Controller 无法正确获得请求参数的问题
// axios.interceptors.request.use(
//     config => {
//         config.headers = {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//         }
//         const data = config.data
//         if (!data) {
//             return config
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    store.state.loading = true;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

axios.interceptors.response.use(response => {
    store.state.loading = false;
    const res = response.data;
    if (res.status !== 0) {
        Message({
            message: res.statusinfo,
            type: 'error',
            duration: 5 * 1000
        })
    } else {
        return response.data
    }
}, error => {
    console.log('err:' + error)
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})

export default axios