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