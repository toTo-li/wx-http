const logger = require('./logger')();

const {
    isHttpProtocol,
    isSuccessStatus,
    getContentType,
} = require('./util');

let defaultOption = {
    method: 'get',
    contentType: 'application/json',
    loading: true,
    header: {},
    timeout: 20000
};

let sum = 0;

// 封装请求 携带cookie
const requestHttp = (mergeOption) => {
    let {
        url,
        method,
        header,
        data,
        loading,
        timeout,
        filter
    } = mergeOption;

    logger.info('request -> url:', url);
    logger.info('request -> data:', data);
    logger.info('request -> options:', mergeOption);

    ++sum;
    if (loading) {
        wx.showLoading({
            title: '努力加载中...'
        });
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: data,
            header: header,
            method,
            timeout,
            success: (res) => {
                let {
                    statusCode
                } = res;
                const isSuccess = isSuccessStatus(statusCode);
                if (isSuccess) {
                    logger.success('response -> url:', url);
                    logger.success('response -> data:', res.data);
                    let filterData = filter && filter(Object.assign(res.data, {
                        succeed: true
                    }))
                    resolve(filterData);
                } else {
                    reject(new Error(`网络错误:状态码为${res.statusCode}`))
                }
            },
            fail: (res) => {
                wx.hideLoading();
                logger.error(JSON.stringify(res));
                wx.showToast({
                    title: `网络挤爆了:${JSON.stringify(res)}`,
                    icon: 'none',
                    duration: 3000
                });
                resolve(Object.assign(res, {
                    succeed: false
                }));
            },
            complete: () => {
                --sum;
                if (sum == 0 && loading) {
                    wx.hideLoading()
                }
            }
        })
    }).catch((error) => {
        wx.showToast({
            title: '网络异常,请稍后再试',
            icon: 'none',
            duration: 3000
        });
        throw error;
    });
}

function Http(config) {
    let {
        baseUrl,
        getCookie,
        filter
    } = config;

    this.baseUrl = baseUrl;
    this.filter = filter || ((res) => {
        return res;
    });

    this.getCookie = getCookie || (() => {
        let cookie = ''
        try {
            const {
                keys
            } = wx.getStorageInfoSync();
            keys.forEach(item => {
                if (wx.getStorageSync(item)) {
                    cookie += `${item}=${wx.getStorageSync(item)};`
                }
            })
        } catch (e) {
            logger.error('http -> getCookie -> error: ', e.message)
        }
        return cookie;
    });
}

Http.prototype.request = function (options) {

    let customOption = {
        filter: this.filter
    };

    let {
        url,
        format = 'json'
    } = options;

    let header = {};
    if (this.getCookie()) {
        header = Object.assign(header, {
            'Cookie': this.getCookie()
        });
    }

    customOption.header = Object.assign(header, {
        'Content-Type': getContentType(format)
    });

    if (!isHttpProtocol(url)) {
        customOption.url = `${this.baseUrl}${url}`;
    }

    return requestHttp(Object.assign(defaultOption, options, customOption));
}

let DefalutMethods = ['get', 'post'];
DefalutMethods.forEach((method) => {
    Http.prototype[method.toLowerCase()] = function (url, config) {
        return this.request(Object.assign({
            data: {}
        }, config, {
            url,
            method
        }));
    };
});

module.exports = Http;