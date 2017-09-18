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
export default class Observer {
  count = 0;
  _callback (){
    let firstTime = true;
    return (entries, observer) => {
      if (firstTime) {
        firstTime = false;
        entries.filter((entry)=>entry.intersectionRatio).forEach(
          (entry) => {
            this.count--;
            observer.unobserve(entry.target);
            this.fn(entry.target, entry);
          }
        )

      } else {
        entries.forEach((entry) => {
          this.count--;
          observer.unobserve(entry.target);
          this.fn(entry.target, entry);
        })
      }
      if (!this.count && this.autoDisconnect) {
        this.disconnect()
      }
    }
  }
  constructor(fn, container, autoDisconnect=false){
    this.fn = fn;
    this.autoDisconnect = autoDisconnect;
    this.observer = new IntersectionObserver(
      this._callback(),
      {
        root: container,
        // rootMargin: '0px 0px -20% 0px', // 距离根元素上下200px的时候触发
        threshold:  [0.2, 0.3,0.4,0.5,0.6,0.7,0.8,0.9,1] // 刚刚进入就触发
      }
    )
  }
  observe(...els) {
    els.forEach(el=>{
      this.observer.observe(el);
      this.count++;
    })
  }

  disconnect() {
    this.observer.disconnect()
  }

  unobserve (...els){
    els.forEach((el) => {
      this.observer.unobserve(el)
    })
  }

}
