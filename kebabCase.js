// 驼峰转下划线连字符

export function kebabCase(str, token='_') {
	// return str.replace(/(?!^)([A-Z])/g, '_$1').toLowerCase();
	return str.replace(/([a-z\d])([A-Z])/g, `$1${token}$2`).toLowerCase();
}

// 转驼峰

export function camelCase(str) {
	return str.replace(/(_(\w)/g, (all, letter) => (letter.slice(1).toUpperCase()))
}