//域名配置
function host() {
    return 'https://api.17kudong.com/?service=';
}
//地址配置
function regionhost() {
    return 'https://www.17kudong.com/js/region.json';
}
//app版本
function version() {
    return { id: 106 };
}
//授权参数设置
function env() {
    const env = {
        //线上ec商城中config.php中定义的define('APP_SECRET', 'I4MoPIPaVCc8M5fnfruLBd');
        APP_SERECT: 'I4MoPIPaVCc8M5fnfruLBd',
        //线上ec商城中config.php中定义的define('APP_KEY', 'wolf100000001');
        app_key: 'wolf100000001',
        format: 'JSON',
        api_version: '2.0',
        req_source: 'app'
    }
    return env;
}
export default {
    version,
    host,
    regionhost,
    env
}