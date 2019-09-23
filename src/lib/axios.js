/*
 * @Author: vance
 * @Date:   2018-04-22 00:24:29
 * @Last Modified by:   vance
 * @Last Modified time: 2018-05-14 15:25:19
 */
import axios from 'axios'
import qs from 'qs';
import Vue from 'vue'
import {
  LoadingPlugin,
  ToastPlugin
} from 'vux'
import router from '../router'
import utils from '@/assets/js/utils'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin, {
  position: 'middle',
  type: 'text',
  isShowMask: true
})

let requestCount = 0

function showLoading(loadTxt) {
  if (requestCount === 0) {
    Vue.$vux.loading.show({
      text: loadTxt || ''
    })
  }
  requestCount++
}
// 隐藏loading
function hideLoading() {
  setTimeout(_ => {
    if (requestCount <= 0) return false
    requestCount--
    if (requestCount === 0) {
      Vue.$vux.loading.hide()
    }
  }, 0)
}

// 用于存下所有已发生的请求，并在合适的时候进行cancel
let requests = []
axios.cancelAll = function () {
  requests.forEach((ele, index) => {
    ele.cancel()
    delete requests[index]
  })
}
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    showLoading('加载中...')
    let token = utils.cookies.getCookie('token')
    config.headers.AppAuthorization = token
    config.data = qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.timeout = 500000
    let rootUrl = ''
    // 通过环境变量来切换服务器api
    // if (process.env.NODE_ENV === 'production') {
    //   rootUrl = 'http://tnhp.3h40c.cn'
    // } else {
    //   // rootUrl = '/api'
    //   rootUrl = 'http://www.paiming001.com'
    // }
    // console.log(process.env.NODE_ENV, 'axios')
    //http://www.paiming001.com
    rootUrl = 'http://www.paiming001.com'

    config.url = rootUrl + config.url
    config.cancelToken = new axios.CancelToken(cancel => {
      requests.push({
        cancel
      })
    })
    return config
  },
  function (error) {
    try {
      Vue.$vux.toast.text('加载超时')
    } catch (e) { }
    hideLoading()
    // 对请求错误做些什么
    return '加载超时'
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  function (xhr) {
    // 对响应数据做点什么
    // adapted to mockjs with {array:[...]} but not [...]
    let data = null
    hideLoading()
    if (xhr.data.status === true || xhr.data.status === 1) {
      return xhr.data
    } else if (xhr.data.status === '_0001') {
      utils.cookies.delAllCookie()
      Vue.$vux.toast.text(xhr.data.msg || '登录失效，请重新登录')
      setTimeout(_ => {
        router.replace('/h5/login')
      }, 1500)
      return Promise.reject(xhr)
    } else {
      Vue.$vux.toast.text(xhr.data.msg || '服务器响应失败，请检测网络')
      return Promise.reject(xhr)
    }
  },
  function (error) {
    hideLoading()
    // 对响应错误做点什么
    if (!error.response) {
      // console('网络错误')
      return Promise.reject('网络错误')
    }
    let xhr = error.response
    if (xhr.data.status === '_0001') {
      utils.cookies.delAllCookie()
      Vue.$vux.toast.text(xhr.data.msg || '登录失效，请重新登录')
      setTimeout(_ => {
        router.replace('/h5/login')
      }, 1000)
    } else {
      Vue.$vux.toast.text(xhr.data.msg || '服务器响应失败，请稍后再试')
    }
    return Promise.reject(xhr)
  }
)
export default axios
