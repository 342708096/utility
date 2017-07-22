// 驼峰转下划线连字符

export function kebabCase(str, token='_') {
	// return str.replace(/(?!^)([A-Z])/g, '_$1').toLowerCase();
	return str.replace(/([a-z\d])([A-Z])/g, `$1${token}$2`).toLowerCase();
}

// 转驼峰

export function camelCase(str) {
	return str.replace(/(_\w)/g, l => l.slice(1).toUpperCase())
}

// 首字母大写
export function capitalize(str) {
	// \b matches a word boundary (the beginning or ending of word);
	// \w matches the following meta-character [a-zA-Z0-9].
  return str.replace(/\b\w/g, l => l.toUpperCase())
}