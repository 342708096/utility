// 驼峰转下划线连字符

export function kebabCase(str) {
	return str.replace(/(?!^)([A-Z])/g, '_$1').toLowerCase();
}

// 转驼峰

export function camelCase(str) {
	return str.replace(/(_[\w])/g, (all, letter) => (letter.slice(1).toUpperCase()))
}