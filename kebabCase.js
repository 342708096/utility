// 驼峰转下划线连字符

function kebabCase(str) {
	return str.replace(/(?!^)([A-Z])/g, '_$1').toLowerCase();
}