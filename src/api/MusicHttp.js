import Vue from 'vue'
import axios from 'axios'
import Service from './MusicApiManeger.js'

let baseURLx
process.env.NODE_ENV === 'development' ? baseURLx = '../../static/' : baseURLx = ''
//  创建实例
let instance = axios.create({
  baseURL: baseURLx,
  timeout: 3000
})

let MusicHttp = {} // 包裹请求方法的容器

//  遍历MusicApi里的参数输出不同的请求接口
for (let key in Service) {
  let api = Service[key] //  url

  MusicHttp[key] = async function (
    params, // 请求参数
    isFormData = false, //  是否为form-data请求
    config = {} //  请求参数
  ) {
    let newParams = {}
    //  content-type是否为form-data的判断
    if (params && isFormData) {
      newParams = new FormData()
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    //  不同请求方法的判断
    let response = {}
    if (api.method === 'put' || api.method === 'patch' || api.method === 'post') {
      try {
        response = await instance[api.method](api.url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if (api.method === 'delete' || api.method === 'get') {
      config.params = newParams
      try {
        response = await instance[api.method](api.url, config)
      } catch (err) {
        response = err
      }
    }
    // 返回响应返回值
    return response
  }
}

//  请求拦截器的添加
instance.interceptors.request.use(config => {
  if (localStorage.getItem('Authorization')) {
    config.headers.Authorization = localStorage.getItem('Authorization')
  }
  //  发起请求前需要做的事情

  if (
    config.url.indexOf('/Music/GetToken') >= 0 ||
    config.url.indexOf('/Album/GetMyAlbum') >= 0 ||
    config.url.indexOf('/Music/GetMyMusic') >= 0 ||
    config.url.indexOf('/Radio/GetMyRadioAndAudio') >= 0 ||
    config.url.indexOf('/User/FindSelect') >= 0
  ) { } else {
    Vue.$my_toast.show({ content: 'Please wait...', time: 7000, id: 'BackgroundToast' })
  }
  return config
}, err => {
  //  请求错误
  console.log(err)
  return Promise.reject(err)
})

//  响应拦截器的添加
instance.interceptors.response.use(res => {
  if (res.code === 401) {
    localStorage.removeItem('Authorization')
    this.$router.push('/')
  }
  if (
    res.config.url.indexOf('/Music/GetToken') >= 0 ||
    res.config.url.indexOf('/Album/GetMyAlbum') >= 0 ||
    res.config.url.indexOf('/Music/GetMyMusic') >= 0 ||
    res.config.url.indexOf('/Radio/GetMyRadioAndAudio') >= 0 ||
    res.config.url.indexOf('/User/FindSelect') >= 0
  ) {

  } else if (res.config.method === 'get') {
    Vue.$my_toast.hide()
  } else {
    Vue.$my_toast.hide()
    Vue.$my_toast.show({ content: 'Ok!!', Mask: false, time: 1000, id: 'axiosToastx' })
  }
  return res.data
}, err => {
  Vue.$my_toast.hide()
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求！'
        break
      case 401:
        err.message = '未授权！请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器错误'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求！'
        break
      //  自定义
      case 415:
        err.message = '登录账号有误！'
        break
      case 416:
        err.message = '登录密码有误！'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '网络异常，请稍后重试！'
  }
  Vue.$my_toast.show({ content: err.message, Mask: false, time: 1500, id: 'xxx1xz' })
  return Promise.reject(err)
})

export default MusicHttp
