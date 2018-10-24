import axios from 'axios';

import qs from "qs";

import {
  Message
} from 'element-ui';
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
  if (config.method === "post") {
    // 序列化
    console.log(`接口:${config.url}的参数:`, config.data);
    config.data = qs.stringify(config.data);
    // 温馨提示,提交能直接接受json 格式,可以不用 qs 来序列化的
  }
//   if (localStorage.token) {
//     config.headers.Authorization = localStorage.token;
//   }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // 对响应数据做点什么
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
  // 对响应错误做点什么
  console.log('err:' + error)
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
});

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  console.log(`$get方法->接口:${url}的参数:`,params);
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
};

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  console.log(`$post方法->接口:${url}的参数:`,data);
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}

export default axios
