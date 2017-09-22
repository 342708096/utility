export function offset(el) {
  let left = 0;
  let top = 0;

  while (el) {
    left -= el.offsetLeft;
    top -= el.offsetTop;
    el = el.offsetParent;
  }

  return {
    left,
    top
  }
}

/**
 * 检查是否进入视口
 **/

export function checkInView (el, options={preLoad:1.3, preLoadTop:0}) {
  let {top,left,right,bottom} = el.getBoundingClientRect()
  return (top < window.innerHeight * options.preLoad && bottom > options.preLoadTop) &&
    (left < window.innerWidth * options.preLoad && right > 0)
}
