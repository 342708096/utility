import {isIE9} from '.env'
/**
* 按照css选择器查找
**/

export function query(el) {
	return document.querySelector(el)
}

/**
* 在target节点前插入el
**/

export function before(el, target) {
	target.parentNode.insertBefore(el, target)
}

/**
* 在target节点后插入el
**/

export function after(el, target) {
	if (target.nextSibling) {
		before(el, target.nextSibling)
	} else {
		target.parentNode.appendChild(el)
	}
}

/**
* 将el插入到target最前面
**/

export function prepend(el, target) {
	if (targt.firstChild) {
		before (el, target.firstChild)
	} else {
		target.appendChild(el)
	}
}
/**
 * 设置class, 会覆盖掉原有的
 **/
export function setClass (el, ...cls) {
    if (isIE9 && !/svg$/.test(el.namespaceURI)) {
        el.className = cls.join(' ')
    } else {
        el.setAttribute('class', cls.join(' '))
    }
}
/**
 * 获取class
 **/
export function getClass(el) {
    return el.className.trim()
}
/**
 * 添加class
 **/
export function addClass(el, ...cls) {
  if (el.classList) {
    el.classList.add(...cls)
  } else {
    let cur = getClass(el).split(/\s+/g)
    cls.forEach((c) => {
      if (!(c in cur)) {
        cur.push(c)
      }
    })
    setClass(el, cur.join(' '))
  }
}
/**
 * 删除class
 **/
export function removeClass(el, ...cls) {
  if (el.classList) {
    el.classList.remove(...cls)
  } else {
    let cur = getClass(el).split(/\s+/g)
    cls.forEach((c) => {
      let index = cur.indexOf(c)
      if (index !== -1) {
        cur.splice(index, 1)
      }
    })
    setClass(el, cur.join(' '))
  }
  if (!el.className) {
    el.removeAttribute('class')
  }
}
/**
 * 绑定事件
 **/
export function addEvent(el, type, fn, capture) {
    el.addEventListener(type, fn, {passive: false, capture: !!capture})
}
/**
 * 删除事件
 **/
export function removeEvent(el, type, fn, capture) {
    el.removeEventListener(type, fn, {passive: false, capture: !!capture})
}
/**
 * 读取/写入ele data
 **/
export function data(el, name, value){
  var attrName = 'data-' + name.replace(/([A-Z])/g, '-$1').toLowerCase()

  var data = (1 in arguments) ?
    el.attr(attrName, value) :
    el.attr(attrName)

  return data !== null ? deserializeValue(data) : undefined
}

export function deserializeValue(value) {
  try {
    return value ?
      value == "true" ||
      ( value == "false" ? false :
        value == "null" ? null :
          +value + "" == value ? +value :
            /^[\[\{]/.test(value) ? JSON.parse(value) :
              value )
      : value
  } catch(e) {
    return value
  }
}
