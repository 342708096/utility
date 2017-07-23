export default {
    /**
     * @func getCookie
     * @desc 获取cookie字段
     * @param {string} name - 字段名 
     * @returns {(string|object)} 返回字段值或整个cookie对象
     */
    get: function (name) {
        const reg = new RegExp("(^| )"+name+"=([^;]+)(?=;|$)")
        const arr = document.cookie.match(reg)
        return arr && decodeURIComponent(arr[2])
    },

    /**
     * @func setCookie
     * @desc 设置cookie字段
     * @param {string} d - cookie域名 
     * @param {string} e - cookie参数
     * @param {string} t - cookie值
     * @param {number} n - 过期小时数
     */
    set: function ( name, value, hour, domain, path='/', secure) {
        
        value = encodeURIComponent(value);
        const expires =  hour ? '; expires=' + new Date((new Date()).getTime() + hour * 36e5).toUTCString() : '';
        domain = domain ? '; domain=' + domain : '';
        path = path ? '; path=' + path : '';
        secure = secure ? '; secure=' + secure : '';

        document.cookie = [name, '=', value, expires, path, domain, secure].join('');
    },

    remove: function(name, domain) {
        this.set(name, '', -1, domain);
    }
};