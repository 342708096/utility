/**
*函数执行的间隔必须大于delay
**/


export function throttle (action, delay) {
    let timeout = null
    let lastRun = 0
    return function () {
        if (timeout) {
            return
        }
        let elapsed = Date.now() - lastRun
        let context = this
        let args = arguments
        let runCallback = function () {
                lastRun = Date.now()
                timeout = false
                action.apply(context, args)
            }
        if (elapsed >= delay) {
            runCallback()
        }
        else {
            timeout = setTimeout(runCallback, delay)
        }
    }
}

/**
*再次执行重置delay
**/

export function debounce(action, delay){
  let last
  return function(){
    const ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function(){
        action.apply(ctx, args)
    }, delay)
  }
}

/**
 *格式化日期
 **/
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.slice(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}

export function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.slice(1).match(reg);

  if (r !== null)
    return decodeURIComponent(r[2]);
  return null;
}

export function loadImageAsync (src) {
  return new Promise(function(resolve,reject){
    let image = new Image()
    image.src = src
    if (image.complete) {
      return resolve({
        naturalHeight: image.naturalHeight,
        naturalWidth: image.naturalWidth,
        src: image.src
      })
    }
    image.onload = function () {
      return resolve({
        naturalHeight: image.naturalHeight,
        naturalWidth: image.naturalWidth,
        src: image.src
      })
    }
    image.onerror = function (e) {
      return reject(e)
    }
  })
}
