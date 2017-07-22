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