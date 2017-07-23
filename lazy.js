export function loadImageAsync (src) {

    return new Promise(function(resolve,reject){
        let image = new Image()
        image.src = src
        image.onload = function () {
            resolve({
                naturalHeight: image.naturalHeight,
                naturalWidth: image.naturalWidth,
                src: image.src
            })
        }
        image.onerror = function (e) {
            reject(e)
        }
    })

}

/**
* 检查是否进入视口
**/

export function checkInView (el, options={preLoad:1.3, preLoadTop:0}) {
        let {top,left,right,bottom} = el.getBoundingClientRect()
        return (top < window.innerHeight * options.preLoad && bottom > options.preLoadTop) &&
            (left < window.innerWidth * options.preLoad && right > 0)
}

/**
*进入视口后触发回调, 懒加载神器
**/

export function observerRegister(fn, container, autoDisconnect=true) {
    let count = 0;
    function callback (){
      let firstTime = true;
      return (entries, observer) => {
          if (firstTime) {
              firstTime = false
              entries.filter((entry)=>entry.intersectionRatio).forEach(
                  (entry) => {
                    count--;
                    observer.unobserve(entry.target);
                    fn(entry.target, entry);
                }
              )

          } else {
              entries.forEach((entry) => {
                  count--;
              observer.unobserve(entry.target);
              fn(entry.target, entry);
              })
          }
          if (!count && autoDisconnect) {
              observer.disconnect()
          }
      }
    }


    let observer = new IntersectionObserver(
      callback(),
      {
          root: container,
          rootMargin: '0px 0px 130% 0px', // 距离根元素上下200px的时候触发
          threshold: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1] // 刚刚进入就触发
      }
    )


    function observe(...els) {
      els.forEach(el=>{
          observer.observe(el);
      count++;
    })
    }

    observe.disconnect = () => observer.disconnect()
    observe.unobserve = (el) => observer.unobserve(el)
    return observe
}