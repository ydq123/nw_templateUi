import EimMobileJsSdk from 'eimjssdk';
var myJssdk = new EimMobileJsSdk();
const NativeService = (params) => {
  console.log(params);
  var header = {
    'Content-Type': 'application/json',
  };
  if ((!params.headers['access-token']) && window.NW_ACCESS_TOKEN) {
    header['access-token'] = window.NW_ACCESS_TOKEN
  }
  return new Promise((resolve, reject) => {
    myJssdk.ajax2({
      url: params.baseURL + params.url,
      method: params.method,
      data: params.data,
      header: Object.assign(header, params.headers),
      success: function(body, header) {
        var body = typeof body == 'string' ? JSON.parse(body) : body;
        resolve(body)
      },
      fail: function(error) {
        reject(error)
      }
    })
  })
}


import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: '', //默认请求头
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 120000, // request timeout 超时时间
})
// request拦截器 request interceptor  请求拦截器
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json";
    if ((!config.headers['access-token']) && window.NW_ACCESS_TOKEN) {
      config.headers["access-token"] = window.NW_ACCESS_TOKEN;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// respone拦截器 返回拦截器
service.interceptors.response.use(
  response => {
    //console.info(response);
    const res = response.data;
    return Promise.resolve(res);
  },
  error => {
    // 不做统一设置Cookie过期跳转到登陆页面，在具体接口去按照实际情况判断
    // 具体接口判断过期+清除jdap登录用户信息+跳转jdap登录页面的代码如下：
    // if (err.response.data.message && err.response.data.message.indexOf('租户访问token过期') >= 0) {
    // 	this.$textShow('租户访问token过期,请重新登录')
    // 	this.$store.dispatch('jdapLogOut').then(() => {
    // 		this.$tabOpenWin('login_jadp');
    // 	})
    // }

    //console.info(error);
    //console.log(error.response);
    return Promise.reject(error)
  }
)

let curService = null;
if (window.NW_BASEURL) {
  curService = NativeService
} else {
  curService = service
}
export default curService;
