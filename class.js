import {isIE9} from '.env'

export function setClass (el, cls) {
	if (isIE9 && !/svg$/.test(el.namespaceURI)) {
		el.className = cls
	} else {
		el.setAttribute('class', cls)
	}
}

export function getClass(el) {
	return el.className
}

export function addClass(el, cls) {
	if (el.classList) {
		el.classList.add(cls)
	} else {
		const cur = ` ${getClass(el)} `
		if (cur.indexOf(` ${cls} `) < 0) {
			setClass(el, (cur + cls).trim())
		}
	}
}

export function removeClass(el, cls) {
	if (el.classList) {
		el.classList.remove(cls)
	} else {
		let cur = ` ${getClass(el)} `
		const tar = ` ${cls} `
		while (cur.indexOf(tar) >= 0){
			cur = cur.replace(tar, ' ')
		}
		setClass(el, cur.trim())
	}
	if (!el.className) {
		el.removeAttribute('class')
	}
}