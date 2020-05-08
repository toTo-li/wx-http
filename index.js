const Request = require('./http.js');
const {
    queryString,
    getCurrentPage
} = require('./util');
const ENV = require('./config');
const mock = require('./mock');

function getBaseUrl() {
    let ENV_OBJ = {
        'development': 'http://demo.http.com',
        'test': 'http://demo.http.com',
        'production': 'https://demo.http.com'
    };
    return ENV_OBJ[ENV];
}

/**
 * 增加mock接口的url
 * @param {*} url
 */
function addMock(url, ajax) {
    console.log(ENV, url, ajax);
    return ENV === 'development' ? (new Promise((resolve) => {
        resolve(mock[url])
    })) : ajax;
}

let http = new Request({
    baseUrl: getBaseUrl(),
    getCookie: () => {
        let cookieKeys = ['sa_uuid'];
        let cookies = cookieKeys.reduce((total, currentValue) => {
            if (wx.getStorageSync(currentValue)) {
                total += `${currentValue}=${wx.getStorageSync(currentValue)};`
            }
            return total;
        }, '');
        console.log('cookies:', cookies);
        return cookies;
    },
    filter: (result) => {
        let {
            code,
            data,
            msg
        } = result;
        if (code === 1) {
            return data;
        } else if (code === 10) {
            const page = getCurrentPage();
            const url = page.route;
            const options = page.options;
            const optionsStr = queryString.stringify(options);
            const totalFrom = url + (optionsStr ? '?' + optionsStr : '')
            const path = `../login/login?from=${encodeURIComponent(totalFrom)}&scene=${options.scene?options.scene:'1'}`
            wx.redirectTo({
                url: path
            })
        } else {
            wx.showToast({
                title: msg,
                icon: 'none',
                duration: 3000
            });
            throw msg;
        }
    }
});



/**
 * 获取列表
 * @returns 
 */
function getList() {
    return addMock('/worker/task/list', http.get(`/worker/task/list`, {}));
}

/**
 * 登录接口
 * @param {*} encryptedData  
 * @param {*} code
 * @param {*} iv
 * @param {*} scene
 * @returns
 */
function login(encryptedData, code, iv, scene) {
    return http.post(`/worker/decrypt`, {
        data: {
            encryptedData,
            iv,
            jsCode: code,
            projectId: scene
        }
    });
}


module.exports = {
    login,
    getList
}