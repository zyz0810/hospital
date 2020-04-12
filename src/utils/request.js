import axios from 'axios'
import { MessageBox, Message,Confirm } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: 'http://139.224.233.152:18000/',
  baseURL:'',
  withCredentials: false, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';application/json
// axios.defaults.headers['Content-Type'] = 'application/json';
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['Content-Type'] = 'text/plain' // 关键所在

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.

    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || '获取数据失败',
    //     type: 'error',
    //     duration: 5 * 1000
    //   });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;

      // else{
      //   return Promise.reject(error)
      // }
      // return Promise.reject(new Error(res.message || 'Error'))


    if (res.status === 0){
      return res
    }
    if (res.status === 1) {
      // to re-login
      // MessageBox.confirm('您已注销，您可以取消以停留在此页，或重新登录', '确认注销', {
      //   confirmButtonText: '重新登录',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
      // })
    }
    else if (res.status === 2){
      Message({
        message: '登录密码错误',
        type: 'error',
        duration: 5 * 1000
      })
    }
    else if (res.status === 3) {
      Message({
        message: '您没此权限',
        type: 'error',
        duration: 5 * 1000
      })
    }
    else if (res.status === 4) {
      Message({
        message: '该数据不存在',
        type: 'error',
        duration: 5 * 1000
      })
    }
    else if (res.status === 5){
      Message({
        message: '该数据已存在',
        type: 'error',
        duration: 5 * 1000
      })
    }
    else if (res.status === 6) {
      // MessageBox.confirm('该数据有关联数据，不能删除', '提示', {
      //   confirmButtonText: '确定',
      //   showCancelButton:false,
      //   type: 'warning'
      // });
      Message({
        message: '该数据有关联数据，不能删除',
        type: 'error',
        duration: 5 * 1000
      })
      return res
    }else{
        Message({
          message: res.message || '获取数据失败',
          type: 'error',
          duration: 5 * 1000
        });
    }

  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  }
)

export default service
