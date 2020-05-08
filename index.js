const Request = require('./http.js');
const { queryString,getCurrentPage } = require('../utils/util');
const ENV = require('../config/index');
const mock = require('./mock');

function getBaseUrl(){
    let ENV_OBJ = {
        'development':'http://salary.chinahr.com',
        'test':'http://salary.chinahr.com',
        'production':'https://salary.chinahr.com'
    };
    return ENV_OBJ[ENV];
}

/**
 * 增加mock接口的url
 * @param {*} url
 */
function addMock(url,ajax) {
    console.log(ENV,url,ajax);
    return ENV === 'development' ? (new Promise((resolve)=>{ resolve(mock[url])})) : ajax;
}

let http = new Request({
    baseUrl: getBaseUrl(),
    getCookie:() => {
        let cookieKeys = ['sa_uuid'];
        let cookies =  cookieKeys.reduce((total,currentValue)=>{
            if(wx.getStorageSync(currentValue)){
                total += `${currentValue}=${wx.getStorageSync(currentValue)};`
            }
            return total;
        },'');
        console.log('cookies:',cookies);
        return cookies;
    },
    filter:(result)=>{
        let {
            code,
            data,
            msg
        } = result;
        if(code === 1){
            return data;
        }else if(code === 10){
            const page = getCurrentPage();
            const url = page.route;
            const options = page.options;
            const optionsStr = queryString.stringify(options);
            const totalFrom = url + (optionsStr ? '?' + optionsStr : '')
            const path = `../login/login?from=${encodeURIComponent(totalFrom)}&scene=${options.scene?options.scene:'1'}`
            wx.redirectTo({
                url: path
            })
        }else{
            wx.showToast({
                title: msg,
                icon: 'none',
                duration:3000
            });
            throw msg;
        }
    }
});



/**
 * 获取任务组列表
 * @returns 
 * [
		{
			"id": 0,
			"name": ""
		}
	]
 */
function getTaskList(){
    return addMock('/worker/task/list',http.get(`/worker/task/list`,{}));
}

/**
 * 登录接口
 * @param {*} encryptedData  
 * @param {*} code
 * @param {*} iv
 * @param {*} scene
 * @returns
 */
function login(encryptedData, code, iv, scene){
    return http.post(`/worker/decrypt`,{
        data:{
            encryptedData,
            iv,
            jsCode:code,
            projectId:scene
        }
    });
}

/**
 * 工作组详情
 * @returns
 */
function getTaskInfo(){
    return addMock('/worker/task/info',http.get('/worker/task/info',{}));
}

/**
 * 切换任务组
 * @param {*} taskId 工作组id
 * @returns
 */
function switchTask(taskId){
    return http.get('/worker/task/switch',{
        data:{
            taskId
        }
    });
}

/**
 * 校验定位地点
 * @param {*} longitude  经度
 * @param {*} latitude  维度
 * @returns
 */
function checkLocation(longitude,latitude){
    return addMock('/worker/duty/location',http.post('/worker/duty/location',{
        data:{
            lat:latitude,
            lng:longitude
        },
        loading:false
    }));
}

/**
 * 获取某年某整月的考勤数据
 * @param {*} year
 * @param {*} month
 */
function getMonthDutyData(year,month){
    return addMock('/worker/duty/data',http.get('/worker/duty/data',{
        data:{
            year,
            month
        }
    }));
}

/**
 * 考勤详情
 * @param {*} dutyId
 * @returns
 */
function getDutyDetail(dutyId){
    return addMock('/worker/duty/detail',http.get('/worker/duty/detail',{
        data:{
            dutyId
        }
    }));
}

/**
 * 打卡接口复制
 * @param {*} data 
 * {
 *  address:'',
 *  pics:[],
 *  positionLat:'',
 *  positionLon:'',
 *  remark:'',
 *  type:'',
 *  workData:''
 * }
 * @returns dutyId 考勤id
 */
function dutyClocked(data){
    return addMock('/worker/duty/clocked',http.post('/worker/duty/clocked',{
        data
    }));
}

/**
 * 获取当天有无考勤记录
 * @return Boolean
 */
function getCurrentDayIsClocked(){
    return addMock('/worker/duty/record',http.get('/worker/duty/record',{}));
}

module.exports = {
    login,
    getTaskList,
    getTaskInfo,
    switchTask,
    checkLocation,
    getMonthDutyData,
    getDutyDetail,
    dutyClocked,
    getCurrentDayIsClocked
}
