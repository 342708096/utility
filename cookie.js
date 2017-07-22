export default {
    /**
     * @func getCookie
     * @desc 获取cookie字段
     * @param {string} name - 字段名 
     * @returns {(string|object)} 返回字段值或整个cookie对象
     */
    get: function (name) {
        const cookie = {};
        const cookieSplit = document.cookie.split('; ');
        for (let i = 0; i < cookieSplit.length; i++) {
            const keyValue = cookieSplit[i].split('=');
            cookie[keyValue[0]] = unescape(keyValue[1]);
        }

        return name ? cookie[name] : cookie;
    },

    /**
     * @func setCookie
     * @desc 设置cookie字段
     * @param {string} d - cookie域名 
     * @param {string} e - cookie参数
     * @param {string} t - cookie值
     * @param {number} n - 过期小时数
     */
    set: function (domain, key, value, hour) {
        if (hour) {
            const i = new Date((new Date()).getTime() + hour * 36e5);
            document.cookie = key + "=" + escape(value) + ";path=/;domain=" + domain + ";expires=" + i.toGMTString();
        } else {
            document.cookie = key + "=" + escape(value) + ";path=/;domain=" + domain;
        }
    }
};