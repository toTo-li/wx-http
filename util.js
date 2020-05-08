/**
 * wx.request是一个基础的api，fail只发生在系统和网络层面的失败情况，比如网络丢包、域名解析失败等等，
 * 而类似404、500之类的接口状态，依旧是调用success，并体现在statusCode上。
 */
const isSuccessStatus = (status) => {
    return status >= 200 && status < 300 || status === 304
}
/**
 * 判断是否是绝对路径
 */
const isHttpProtocol = (url) => {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
}

/**
 * 转换参数
 */
const convertParamsToString = (value) => {
    const type = typeof value;
    if (type === 'undefined') {
        return '';
    } else if (type === 'object') {
        return encodeURIComponent(JSON.stringify(value));
    } else if (type === 'string') {
        return encodeURIComponent(value);
    }
    return value;
}

/**
 * 数据提交格式转化
 */
function getValueByFormat(data, format) {
    if (format == 'json') {
        return JSON.stringify(data);
    } else if (format == 'form') {
        let dataStr = '';
        for (const key in data) {
            let val = data[key];
            if (dataStr.length == 0) {
                dataStr = `${key}=${convertParamsToString(val)}`;
            } else {
                dataStr += `&${key}=${convertParamsToString(val)}`;
            }
        }
        return dataStr;
    } else if (format == 'form-data') {
        const formData = new FormData();
        if (data) {
            Object.keys(data).map(key => {
                formData.append(key, data[key]);
            });
        }
        return formData;
    }else{
        return data;
    }
}

const getContentType = (type)=>{
    let contentTypes = {
        'form': 'application/x-www-form-urlencoded',
        'json': 'application/json',
        'form-data': 'multipart/form-data'
    };
    return contentTypes[type];
}

const isArray = (val) => {
    return toString.call(val) === '[object Array]'
}

const forEach = function (obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
        return
    }
  
    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /* eslint no-param-reassign:0 */
        obj = [obj]
    }
  
    if (isArray(obj)) {
        // Iterate over array values
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj)
        }
    } else {
        // Iterate over object keys
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj)
            }
        }
    }
}

const bind = function (fn, thisArg) {
    return function wrap() {
        const args = new Array(arguments.length)
        for (let i = 0; i < args.length; i++) {
            args[i] = arguments[i]
        }
        return fn.apply(thisArg, args)
    }
}

const extend = function (a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg)
        } else {
            a[key] = val
        }
    })
    return a
}

const queryString = {
    stringify(obj) {
        let str = ''
        if (isEmptyObj(obj)) return str
        for (const key in obj) {
            str += `${key}=${obj[key]}`
        }
        return str
    }
}
/**
 * 获取当前页的page对象
 */
function getCurrentPage() {
    const pages = getCurrentPages() // 获取加载的页面
    const currentPage = pages[pages.length - 1] // 获取当前页面的对象
    return currentPage
}

module.exports = {
    isSuccessStatus,
    isHttpProtocol,
    convertParamsToString,
    getValueByFormat,
    getContentType,
    bind,
    extend,
    queryString,
    getCurrentPage
}