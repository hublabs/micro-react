import { Modal } from 'antd';
const axios = require('axios');
// const fundebug = require("fundebug-javascript");

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // console.log("error.response=>", error.response);
    // send2fundebug(error.response)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          logout()
          break;
        case 400:
          console.log(error.response.data)
          if (error.response.data.message === "missing or malformed jwt") {
            logout()
          }
          break;
        default:
          break;
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
);

const logout = () => {
  Modal.info({
    title: '您的登录信息已过期，请重新扫码登录，谢谢！',
    okText: "重新登录",
    onOk() {
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = "/tempLogin"
    },
  });
}

export const httpRequest = function (options = {
  url: '',
  method: 'GET',
  data: {},
  headers: {},
}) {
  let token = window.localStorage.getItem('token')
  if (token) {
    options.headers = {
      "Authorization": 'Bearer ' + token,
      ...options.headers
    }
  }
  return axios({
    // ...options
    url: options.url,
    method: options.method,
    data: options.data,
    headers: options.headers,
  }).then(res => {
    return res.data.result
  }).catch(error => {
    // console.log("util.httpRequest", error)
    throw error
  })
}

export const httpRequestSync = async function (...param) {
  // console.log("param=>", param)
  try {
    let res = await httpRequest(...param)
    return [res, null]
  } catch (e) {
    return [null, e]
  }
}
export default httpRequest