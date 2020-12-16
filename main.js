import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import https from './server/https'

const currentVersion = https.version();

Vue.component('cu-custom', cuCustom)
Vue.config.productionTip = false

Vue.prototype.$current = currentVersion

//价格过滤器
// arg表示原始参数,num表示小数点位,默认保留两位,symbol表示符号,spilt是否进行逗号分隔【true，false】
Vue.filter('priceFormat', function (arg, num = 0, symbol, spilt = false) {
    arg = Number(arg).toFixed(num)
    if (spilt == true) {
        if (arg.indexOf('.') == -1) {
            arg = arg.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            var parts = arg.split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            arg = parts.join(".");
        }
    }
    if (symbol) {
        arg = symbol + arg;
    }
    return arg;
})

Vue.filter('timeFormat', function (arg, type = 'YYYY-MM-DD h:m:s') {
    if (arg.toString().length == 10) {
        arg = arg * 1000;
        //如果date为13位不需要乘1000
        //[js时间戳长度是13位]，php，java等时间戳长度为10位
    }
    var date = new Date(arg)
    var year = date.getFullYear(); //获取年
    var mouth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1); //月
    var day = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()); //日
    var hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()); //时
    var minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()); //分
    var second = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()); //秒
    var week; //星期
    if (date.getDay() == 0) week = "星期日"
    if (date.getDay() == 1) week = "星期一"
    if (date.getDay() == 2) week = "星期二"
    if (date.getDay() == 3) week = "星期三"
    if (date.getDay() == 4) week = "星期四"
    if (date.getDay() == 5) week = "星期五"
    if (date.getDay() == 6) week = "星期六"
    if (type == 'YYYY-MM-DD h:m:s') {
        return year + '-' + mouth + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }
    if (type == 'YYYY-MM-DD') {
        return year + '-' + mouth + '-' + day;
    }
    if (type == 'MM-DD') {
        return mouth + '-' + day;
    }
    if (type == 'MM-DD WEEK') {
        return mouth + '-' + day + ' ' + week;
    }
})

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()