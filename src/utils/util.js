import configIndex from './config/index.js'
import { httpRequest, httpRequestSync } from './httpRequest.js'

const errorCaptured = async function (asyncFunc, ...param) {
  // console.log("param=>", param)
  try {
    let res = await asyncFunc(...param)
    return [res, null]
  } catch (e) {
    return [null, e]
  }
}
const delayMethod = () => {
  return new Promise(res => {
    setTimeout(() => {
      res(true)
    }, 2000);
  })
}
function formatCurrency(num) {
  num = num.toString().replace(/\$|,/g, '');
  if (isNaN(num))
    num = "0";
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) {
    cents = "0" + cents;
  }
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  }
  return num + '.' + cents;
}
//保留2位小数，如：2，会在2后面补上00.即2.00
function toDecimal2(x) {
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}
//保留2位小数，如：2，还会保留2 不会补0
function toDecimal2NoZero(x) {
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  return s;
}
export default {
  httpRequest,
  httpRequestSync,
  errorCaptured,
  ...configIndex,
  delayMethod,
  formatCurrency,
  toDecimal2,
  toDecimal2NoZero,
}
