const config = {
  WXSETTING_API: `https://staging.p2shop.com.cn/pangpang-common/wxsetting-api`,
}
export default (function () {
  console.log("REACT_APP_ENV=>", process.env.REACT_APP_ENV);
  if (process.env.REACT_APP_ENV === 'prd') {
    return {
      ...config,
      ...require('./prd')
    }
  }
  if (process.env.REACT_APP_ENV === 'qa') {
    return {
      ...config,
      ...require('./qa')
    }
  }
  return {
    ...config,
    ...require('./dev')
  }
})()