import md5 from './md5'
import https from './https'

//域名地址
const host = https.host();

//授权参数设置
const env = https.env();

export {
    host
}

//请求封装
function request(url, method, data, header = {}) {
    uni.showLoading({
        title: '加载中' //数据请求前loading
    })

    //授权公共参数
    const authorizations = {
        openId: getStorageOpenid(),
        token: getStorageAccesstoken(),
        accesstoken: getStorageAccesstoken(),
        user_id: getStorageUserId(),
        platform: getStoragePlatform()
    }

    //公共授权数据
    if (authorizations.accesstoken && authorizations.user_id) {
        if (authorizations.openId) {
            data.openId = authorizations.openId;
        }
        data.accesstoken = authorizations.accesstoken;
        data.user_id = authorizations.user_id;
        data.platform = authorizations.platform;
    }

    //标准授权数据
    data.app_key = env.app_key;
    data.format = env.format;
    data.api_version = env.api_version;
    data.timestamp = process_date();
    data.req_source = env.req_source;
    data.token = getStorageAccesstoken();
    data.sign = CalcuMD5(data);
    data.platform = getStoragePlatform();
    let apihost = host + url;

    //微信请求方法，差异只有request与httpRequest的区别
    return new Promise((resolve, reject) => {
        uni.request({
            url: apihost, //仅为示例，并非真实的接口地址
            method: method,
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
                // 'content-type': 'application/json' // 这里不用json
            },
            success: function (res) {
                console.log(res)
                uni.hideLoading();
                /**
                 * 系统登录失败
                 */
                if (res.data.ret === 403) {
                    uni.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 1500
                    });
                    //退出登录统一清除缓存方法
                    quit();
                    uni.navigateTo({
                        url: "/apiPam/login/main"
                    });
                }
                if (res.data.code != 1) {
                    resolve(res.data);
                    if (res.data.msg) {
                        uni.showToast({
                            title: res.data.msg,
                            icon: "none",
                            duration: 1500
                        });
                    }
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 1500
                    });
                    return false;
                }
            },
            fail: function (error) {
                uni.hideLoading();
                reject(false)
            },
            complete: function () {
                uni.hideLoading();
            }
        })
    })
}

//不支持get，所以关闭
// export function get(url, data) {
//   return request(url, 'GET', data)
// }

export function post(url, data) {
    return request(url, 'POST', data)
}

//@Author:  i@jinjiajin.net @DateTime:  2019-02-17 15:12:21
//api接口加密sign值md5处理
let CalcuMD5 = function (param) {
    let sign_basis = 'ANDYJJ' + assemble(param) + env.APP_SERECT;
    sign_basis = md5(sign_basis).toUpperCase();
    return sign_basis;
}

//@Author:  i@jinjiajin.net @DateTime:  2019-02-17 15:12:26
//api接口加密param值处理
let assemble = function (param) {
    let joint = '';
    if (typeof param == "object" && Object.getOwnPropertyNames(param).length > 0) {
        let arr = Object.getOwnPropertyNames(param);
        let arr1 = arr.sort();
        let i = '';
        for (i in arr1) {
            let val = param[arr1[i]];
            if (val == void 0 || val == '') {
                continue;
            }
            if (typeof val == "boolean") {
                let val = val ? 1 : 0;
            }
            val = (typeof val == "object" && Object.getOwnPropertyNames(val).length > 0) ? assemble(val) : val;
            joint += (arr1[i] + val);
        }
    }
    return joint;
}

//@Author:  i@jinjiajin.net @DateTime:  2019-02-17 15:12:31
//api接口加密所用时间处理
let process_date = function () {
    let now = new Date();
    let fullyear = now.getFullYear();
    let month = (now.getMonth() + 1) > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
    let day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
    let hours = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
    let seconds = now.getSeconds() > 9 ? now.getSeconds() : '0' + now.getSeconds();
    let minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
    return fullyear + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}



//----------------------------------------------常用方法 --------------------
//用户是否登录 未登录跳转到登录页面
export function toLogin() {
    let accesstoken = uni.getStorageSync('accesstoken');
    let user_id = uni.getStorageSync("user_id");
    let openId = uni.getStorageSync("openId");
    if (!accesstoken || !user_id) {
        uni.navigateTo({
            url: "/apiPam/login/main"
        });
    } else {
        return true;
    }
}

//获取openId
export function getStorageOpenid() {
    let openId = uni.getStorageSync("openId");
    if (openId) {
        return openId;
    } else {
        return ''
    }
}

//获取用户信息
export function getStorageUserInfo() {
    let userInfo = uni.getStorageSync("userInfo");
    if (userInfo) {
        return userInfo;
    } else {
        return ''
    }
}

//获取accesstoken
export function getStorageAccesstoken() {
    let accesstoken = uni.getStorageSync("accesstoken");
    if (accesstoken) {
        return accesstoken;
    } else {
        return ''
    }
}

//获取user_id
export function getStorageUserId() {
    let user_id = uni.getStorageSync("user_id");
    if (user_id) {
        return user_id;
    } else {
        return ''
    }
}

//获取平台
export function getStoragePlatform() {
    // #ifdef H5
    let platform = 'H5';
    // #endif
    // #ifdef APP-PLUS
    let platform = 'APP-PLUS';
    // #endif
    // #ifdef MP-WEIXIN
    let platform = 'MP-WEIXIN';
    // #endif
    // #ifdef MP-ALIPAY
    let platform = 'MP-ALIPAY';
    // #endif
    // #ifdef MP-BAIDU
    let platform = 'MP-BAIDU';
    // #endif
    // #ifdef MP-TOUTIAO
    let platform = 'MP-TOUTIAO';
    // #endif
    // #ifdef MP-QQ
    let platform = 'MP-QQ';
    // #endif
    return platform;
}

// 退出清除相应数据  -- 防止清除一些不需要清除的数据
export function quit() {
    uni.clearStorageSync();
    uni.setStorageSync("launchFlag", true);
}
//----------------------------------------------常用方法 --------------------

function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}