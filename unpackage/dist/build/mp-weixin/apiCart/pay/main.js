(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["apiCart/pay/main"],{"105c":function(e,a,t){"use strict";(function(e){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=i(t("a34a")),n=t("de50"),o=t("26b0");function i(e){return e&&e.__esModule?e:{default:e}}function u(e,a,t,r,n,o,i){try{var u=e[o](i),c=u.value}catch(s){return void t(s)}u.done?a(c):Promise.resolve(c).then(r,n)}function c(e){return function(){var a=this,t=arguments;return new Promise((function(r,n){var o=e.apply(a,t);function i(e){u(o,r,n,i,c,"next",e)}function c(e){u(o,r,n,i,c,"throw",e)}i(void 0)}))}}function s(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}var d={onLoad:function(e){this.orderId=e.orderId,this.code=e.code,this.orderDetail()},onShow:function(){(0,o.toLogin)(),e.getStorageSync("bonusName",""),e.getStorageSync("bonus_id",""),this.advance=e.getStorageSync("advance"),this.code&&this.wxpayh5Pay(),e.getStorageSync("openId")||this.getWechatOpenid()},mounted:function(){this.getPayment(),this.GetAdvance(),this.getPaymentIsUse()},data:function(){var e;return e={modalName:null,orderId:0,actualPrice:0,advance:"",payParams:[],balance_amount:0,pay_id:"",paytype:"wxpaywxapp",alipaywap:"",goods_name:""},s(e,"advance",0),s(e,"code",""),s(e,"small_is_use",""),s(e,"hfive_is_use",""),s(e,"app_is_use",""),s(e,"zhifu_is_use",""),s(e,"iswechatH5",""),e},methods:{showModal:function(e){this.modalName=e.currentTarget.dataset.target},hideModal:function(e){this.modalName=null},back:function(){return c(r.default.mark((function a(){return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.switchTab({url:"/pages/my/main"});case 1:case"end":return a.stop()}}),a)})))()},orderDetail:function(){var a=this;return c(r.default.mark((function t(){var o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,n.payDetailApi)({order_id:a.orderId});case 2:if(o=t.sent,!1!==o.data.pay_detail){t.next=7;break}return e.showToast({title:"不存在此订单",icon:"none",duration:2e3}),e.navigateTo({url:"/pages/index/main"}),t.abrupt("return",!1);case 7:a.actualPrice=o.data.info.total_fee,a.order=o.data.info,a.order_id=a.$root.$mp.query.orderId,a.payment_list=o.data.info.payment_list,a.alipaywap=o.data.other.url,a.goods_name=o.data.other.goods_name,console.log("-----"),console.log(o),console.log("-----");case 16:case"end":return t.stop()}}),t)})))()},selectPayment:function(e){this.pay_id=e},GetAdvance:function(){var e=this;return c(r.default.mark((function a(){var t;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,(0,n.memberInfoApi)({});case 2:t=a.sent,e.advance=t.data.info.user_money;case 4:case"end":return a.stop()}}),a)})))()},doPay:function(){var a=this;return c(r.default.mark((function t(){var o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("balance"!==a.pay_id){t.next=5;break}return t.next=3,(0,n.doPaymentBalanceApi)({order_id:a.$root.$mp.query.orderId,pay_id:a.pay_id});case 3:o=t.sent,o.data.dopay?(e.showToast({title:"订单支付成功",icon:"none",duration:1e3}),setTimeout((function(){e.redirectTo({url:"/apiMember/orderdetail/main?id="+a.$root.$mp.query.orderId})}),1e3)):(e.showToast({title:o.data.info,icon:"none",duration:1e3}),setTimeout((function(){e.redirectTo({url:"/apiMember/orderdetail/main?id="+a.$root.$mp.query.orderId})}),1e3));case 5:case"end":return t.stop()}}),t)})))()},getPayment:function(){var a=this;return c(r.default.mark((function t(){var o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,n.getPaymentListApi)({});case 2:o=t.sent,0===o.data.info.length?e.showToast({title:"请配置支付方式",icon:"none",duration:2e3}):a.pay_id=o.data.info[0].pay_code,o.data.info.forEach((function(e){"balance"===e.pay_code&&(a.balance=!0,a.balance_amount=e.amount_txt),"alipay"===e.pay_code&&(a.alipay=!0),"wxpay"===e.pay_code&&(a.wxpay=!0)}));case 5:case"end":return t.stop()}}),t)})))()},startPay:function(){var e=this;return c(r.default.mark((function a(){return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:a.t0=e.paytype,a.next="deposit"===a.t0?3:"wxpaywxapp"===a.t0?6:"malipaymyapp"===a.t0?9:"wxpayh5"===a.t0?12:"malipaynew"===a.t0?15:"wxpayappplus"===a.t0?18:"malipayappplus"===a.t0?21:"bankcard"===a.t0?23:26;break;case 3:return e.depositPay(),a.abrupt("return",!1);case 6:return e.wxpaywxappPay(),a.abrupt("return",!1);case 9:return e.malipaymyappPay(),a.abrupt("return",!1);case 12:return e.wxpayh5Pay(),a.abrupt("return",!1);case 15:return e.malipaynewPay(),a.abrupt("return",!1);case 18:return e.wxpayappplusPay(),a.abrupt("return",!1);case 21:return e.malipayappplusPay(),a.abrupt("return",!1);case 23:return e.bankcardPay(),a.abrupt("return",!1);case 26:return a.abrupt("return",!1);case 28:case"end":return a.stop()}}),a)})))()},depositPay:function(){var a=this;return c(r.default.mark((function t(){var o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(Number(a.advance)<Number(a.actualPrice))){t.next=3;break}return e.showToast({icon:"none",title:"余额不足"}),t.abrupt("return",!1);case 3:return t.next=5,(0,n.doPaymentBalanceApi)({pay_id:a.paytype,order_id:a.orderId,money:a.actualPrice});case 5:if(o=t.sent,!1!==o.data.dopay){t.next=9;break}return e.redirectTo({url:"/apiCart/payresult/main?status=0&orderId="+a.orderId+"&money="+a.actualPrice+"&paytype="+a.paytype}),t.abrupt("return",!1);case 9:e.redirectTo({url:"/apiCart/payresult/main?status=1&orderId="+a.orderId+"&money="+a.actualPrice+"&paytype="+a.paytype});case 10:case"end":return t.stop()}}),t)})))()},wxpaywxappPay:function(){var a=this;return c(r.default.mark((function t(){var o,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,n.payDopaymentApi)({pay_type:"wxpayMp",order_id:a.orderId,money:a.actualPrice,openid:e.getStorageSync("openId")});case 2:if(o=t.sent,!1!==o.data.res){t.next=6;break}return e.showToast({icon:"none",title:o.data.msg}),t.abrupt("return",!1);case 6:a.payParams=o,i=a,e.requestPayment({provider:"wxpay",timeStamp:o.data.timeStamp,nonceStr:o.data.nonceStr,package:o.data.package,signType:"MD5",paySign:o.data.paySign,success:function(a){e.redirectTo({url:"/apiCart/payresult/main?status=1&orderId="+i.orderId+"&money="+i.actualPrice})},fail:function(a){console.log(i.orderId),e.redirectTo({url:"/apiCart/payresult/main?status=0&orderId="+i.orderId+"&money="+i.actualPrice})}});case 9:case"end":return t.stop()}}),t)})))()},malipaymyappPay:function(){var a=this;return c(r.default.mark((function t(){var o,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,n.payDopaymentApi)({paytype:a.paytype,orderId:a.orderId,money:a.actualPrice});case 2:o=t.sent,console.log(o),a.payParams=o,i=a,a.payParams.trade_no&&e.tradePay({tradeNO:a.payParams.trade_no,success:function(a){console.log(a),e.redirectTo({url:"/apiCart/payresult/main?status=1&orderId="+i.orderId+"&money="+i.actualPrice+"&paytype="+this.paytype})},fail:function(a){e.redirectTo({url:"/apiCart/payresult/main?status=0&orderId="+i.orderId+"&money="+i.actualPrice+"&paytype="+this.paytype}),console.log(a)}});case 7:case"end":return t.stop()}}),t)})))()},wxpayh5Pay:function(){var a=this;return c(r.default.mark((function t(){var o,i,u;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a.iswechatH5){t.next=15;break}return t.next=3,(0,n.wechatPayApi)({order_id:a.orderId,code:a.code,money:a.actualPrice});case 3:if(o=t.sent,"code"!=o.data.status){t.next=7;break}return window.location=o.data.url,t.abrupt("return",!1);case 7:if(!0!==o.data.res){t.next=12;break}i={appId:o.data.result.appId,timeStamp:o.data.result.timeStamp,nonceStr:o.data.result.nonceStr,package:o.data.result.package,signType:"MD5",paySign:o.data.result.paySign},a.onBridgeReady(i,o.data.redirect_url),t.next=14;break;case 12:return e.showToast({title:o.data.msg,icon:"none",duration:1500}),t.abrupt("return",!1);case 14:return t.abrupt("return",!1);case 15:return t.next=17,(0,n.payDopaymentApi)({pay_id:a.paytype,order_id:a.orderId,money:a.actualPrice,pay_type:"wxpayH5"});case 17:if(u=t.sent,!1!==u.data.res){t.next=21;break}return e.showToast({title:u.data.msg,icon:"none",duration:1500}),t.abrupt("return",!1);case 21:!0===u.data.res&&(location.href=u.data.url);case 22:case"end":return t.stop()}}),t)})))()},malipaynewPay:function(){var e=this;return c(r.default.mark((function a(){var t;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:console.log(window.location.href),t=e.alipaywap+"&order_sn="+e.orderId+"&body="+e.goods_name+"&money="+e.actualPrice+"&quit_url="+window.location.href,console.log(t),location.href=t;case 4:case"end":return a.stop()}}),a)})))()},wxpayappplusPay:function(){var a=this;return c(r.default.mark((function t(){var o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("微信APP支付"),t.next=3,(0,n.payDopaymentApi)({order_id:a.orderId,money:a.actualPrice,pay_type:"wxpayApp"});case 3:o=t.sent,e.requestPayment({provider:"wxpay",orderInfo:o.data.response,success:function(e){console.log("支付成功"),console.log(e)},fail:function(e){console.log("失败"),console.log(e)}});case 5:case"end":return t.stop()}}),t)})))()},bankcardPay:function(){var a=this;return c(r.default.mark((function t(){var o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return o=a,t.next=3,(0,n.payDopaymentApi)({order_id:a.orderId,money:a.actualPrice,pay_type:"bankcard"});case 3:t.sent,e.redirectTo({url:"/apiCart/payresult/main?status=1&orderId="+o.orderId+"&money="+o.actualPrice+"&paytype="+a.paytype});case 5:case"end":return t.stop()}}),t)})))()},onBridgeReady:function(e,a){return c(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:WeixinJSBridge.invoke("getBrandWCPayRequest",e,(function(e){"get_brand_wcpay_request:ok"==e.err_msg&&(location.href=a)}));case 1:case"end":return t.stop()}}),t)})))()},malipayappplusPay:function(){var a=this;return c(r.default.mark((function t(){var o,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("支付宝支付"),t.next=3,(0,n.payDopaymentApi)({order_id:a.orderId,money:a.actualPrice,pay_type:"alipayApp"});case 3:o=t.sent,i=a,e.requestPayment({provider:"alipay",orderInfo:o.data.response.payInfo,success:function(a){console.log(a),console.log("成功支付"),console.log(i.orderId),console.log("-------"),e.redirectTo({url:"/apiCart/payresult/main?status=1&orderId="+i.orderId})},fail:function(e){console.log(e),console.log("支付失败")}});case 6:case"end":return t.stop()}}),t)})))()},getWechatOpenid:function(){var a=this;return c(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.showLoading({title:"登录中...",mask:!0,success:function(e){}}),e.login({success:function(){var t=c(r.default.mark((function t(o){var i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!o.code){t.next=8;break}return a.code=o.code,console.log("code："+a.code),t.next=5,(0,n.loginWechatApi)({code:a.code,platform:"MP-WEIXIN-MOBILE"});case 5:i=t.sent,!0===i.data.res&&e.setStorageSync("openId",i.data.openid),e.setStorageSync("openId",i.data.openid);case 8:case"end":return t.stop()}}),t)})));function o(e){return t.apply(this,arguments)}return o}()});case 2:case"end":return t.stop()}}),t)})))()},getPaymentIsUse:function(){var e=this;return c(r.default.mark((function a(){var t;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,(0,n.getPaymentIsUseApi)({});case 2:t=a.sent,e.small_is_use=t.data.small_is_use,e.hfive_is_use=t.data.hfive_is_use,e.app_is_use=t.data.app_is_use,e.zhifu_is_use=t.data.zhifu_is_use;case 7:case"end":return a.stop()}}),a)})))()}}};a.default=d}).call(this,t("543d")["default"])},"2ab8":function(e,a,t){"use strict";t.r(a);var r=t("5187"),n=t("acf6");for(var o in n)"default"!==o&&function(e){t.d(a,e,(function(){return n[e]}))}(o);t("7c79");var i,u=t("f0c5"),c=Object(u["a"])(n["default"],r["b"],r["c"],!1,null,"cf1c7bc8",null,!1,r["a"],i);a["default"]=c.exports},5187:function(e,a,t){"use strict";var r;t.d(a,"b",(function(){return n})),t.d(a,"c",(function(){return o})),t.d(a,"a",(function(){return r}));var n=function(){var e=this,a=e.$createElement;e._self._c;e._isMounted||(e.e0=function(a){e.paytype="wxpaywxapp"},e.e1=function(a){e.paytype="deposit"})},o=[]},"7c79":function(e,a,t){"use strict";var r=t("7f24"),n=t.n(r);n.a},"7f24":function(e,a,t){},acf6:function(e,a,t){"use strict";t.r(a);var r=t("105c"),n=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(a,e,(function(){return r[e]}))}(o);a["default"]=n.a},ef1d:function(e,a,t){"use strict";(function(e){t("a2bf");r(t("66fd"));var a=r(t("2ab8"));function r(e){return e&&e.__esModule?e:{default:e}}e(a.default)}).call(this,t("543d")["createPage"])}},[["ef1d","common/runtime","common/vendor"]]]);