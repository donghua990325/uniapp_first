(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["apiCart-payresult-main"],{3272:function(t,e,n){"use strict";n.r(e);var a=n("642f"),r=n("ec66");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("83b7");var o,s=n("f0c5"),c=Object(s["a"])(r["default"],a["b"],a["c"],!1,null,"fcb2643e",null,!1,a["a"],o);e["default"]=c.exports},4465:function(t,e,n){var a=n("9d88");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var r=n("4f06").default;r("51b10558",a,!0,{sourceMap:!1,shadowMode:!1})},4718:function(t,e,n){"use strict";n.r(e);var a=n("9db9"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a},"642f":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-countdown"},[t.showDay?n("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.d))]):t._e(),t.showDay?n("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v("天")]):t._e(),n("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.h))]),n("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v(t._s(t.showColon?":":"时"))]),n("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.i))]),n("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v(t._s(t.showColon?":":"分"))]),n("v-uni-text",{staticClass:"uni-countdown__number",style:{borderColor:t.borderColor,color:t.color,backgroundColor:t.backgroundColor}},[t._v(t._s(t.s))]),t.showColon?t._e():n("v-uni-text",{staticClass:"uni-countdown__splitor",style:{color:t.splitorColor}},[t._v("秒")])],1)},i=[]},"6d98":function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"UniCountdown",props:{showDay:{type:Boolean,default:!0},showColon:{type:Boolean,default:!0},backgroundColor:{type:String,default:"#FFFFFF"},borderColor:{type:String,default:"#000000"},color:{type:String,default:"#000000"},splitorColor:{type:String,default:"#000000"},day:{type:Number,default:0},hour:{type:Number,default:0},minute:{type:Number,default:0},second:{type:Number,default:0}},data:function(){return{timer:null,syncFlag:!1,d:"00",h:"00",i:"00",s:"00",leftTime:0,seconds:0}},watch:{day:function(t){this.changeFlag()},hour:function(t){this.changeFlag()},minute:function(t){this.changeFlag()},second:function(t){this.changeFlag()}},created:function(t){this.startData()},beforeDestroy:function(){clearInterval(this.timer)},methods:{toSeconds:function(t,e,n,a){return 60*t*60*24+60*e*60+60*n+a},timeUp:function(){clearInterval(this.timer),this.$emit("timeup")},countDown:function(){var t=this.seconds,e=0,n=0,a=0,r=0;t>0?(e=Math.floor(t/86400),n=Math.floor(t/3600)-24*e,a=Math.floor(t/60)-24*e*60-60*n,r=Math.floor(t)-24*e*60*60-60*n*60-60*a):this.timeUp(),e<10&&(e="0"+e),n<10&&(n="0"+n),a<10&&(a="0"+a),r<10&&(r="0"+r),this.d=e,this.h=n,this.i=a,this.s=r},startData:function(){var t=this;this.seconds=this.toSeconds(this.day,this.hour,this.minute,this.second),this.seconds<=0||(this.countDown(),this.timer=setInterval((function(){t.seconds--,t.seconds<0?t.timeUp():t.countDown()}),1e3))},changeFlag:function(){this.syncFlag||(this.seconds=this.toSeconds(this.day,this.hour,this.minute,this.second),this.startData(),this.syncFlag=!0)}}};e.default=a},7891:function(t,e,n){"use strict";n.r(e);var a=n("8ac0"),r=n("4718");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("99b1");var o,s=n("f0c5"),c=Object(s["a"])(r["default"],a["b"],a["c"],!1,null,"40131ea0",null,!1,a["a"],o);e["default"]=c.exports},"83b7":function(t,e,n){"use strict";var a=n("4465"),r=n.n(a);r.a},"8ac0":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("cu-custom",{attrs:{bgColor:"bg-white",isBack:!1}},[n("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("返回")]),n("template",{attrs:{slot:"content"},slot:"content"},[t._v("支付结果")])],2),n("div",{staticClass:"container"},[n("div",{staticClass:"pay-result"},[1==t.status?n("div",{staticClass:"success"},[n("div",{staticClass:"msg"},[t._v("付款成功")]),n("div",{staticClass:"btns"},[n("v-uni-navigator",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.orderDetailGo(t.orderId)}}},[t._v("查看订单")]),n("v-uni-navigator",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.HomeGo()}}},[t._v("继续逛")])],1)]):t._e(),1!=t.status?n("div",{staticClass:"error"},[n("div",{staticClass:"msg"},[t._v("付款中断")]),n("div",{staticClass:"tips"},[n("div",{staticClass:"p"},[t._v("可能的原因有以下几种：")]),n("div",{staticClass:"p"},[t._v("1.账户余额不足 2.订单不存在 3.订单已支付")])]),n("div",{staticClass:"btns"},[n("v-uni-navigator",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.orderDetailGo(t.orderId)}}},[t._v("查看订单")]),n("v-uni-navigator",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.rePay(t.orderId)}}},[t._v("重新付款")])],1)]):t._e(),t.pintuan?n("div",{staticClass:"activity-line"},[n("div",{staticClass:"activity"},[n("div",{staticClass:"title"},[t._v("拼团中")])]),n("div",{staticClass:"timer"},[n("div",{staticClass:"text"},[t._v("距离拼团结束")]),n("uni-countdown",{attrs:{color:"#FFFFFF","background-color":"#00B26A","border-color":"#00B26A","show-day":!0,day:t.end_day,hour:t.end_hour,minute:t.end_minute,second:t.end_second},on:{timeup:function(e){arguments[0]=e=t.$handleEvent(e),t.orderDetail.apply(void 0,arguments)}}})],1)]):t._e()]),t.pintuan?n("div",{staticClass:"activity-line"},[n("div",{staticClass:"activity"},[n("div",{staticClass:"title"},[t._v("请分享："+t._s(t.pin_goods_url))])])]):t._e()])],1)},i=[]},"8bce":function(t,e,n){"use strict";function a(t,e,n){var a=plus.screen.resolutionWidth,r=25,i=25,o=55,s=55,c=10,u=12,l=Math.floor(a/(o+i)),d=(a-(o+i)*l-i)/(l+1),p=i+d,f=o+p,y=s+c+u+r,h=s+c,v=new plus.nativeObj.View("alphaBg",{top:"0px",left:"0px",height:"100%",width:"100%",backgroundColor:"rgba(0,0,0,0.5)"});v.addEventListener("click",(function(){v.hide(),b.hide()}));var b=new plus.nativeObj.View("shareMenu",{bottom:"0px",left:"0px",height:Math.ceil(e.length/l)*y+r+44+1+"px",width:"100%",backgroundColor:"rgb(255,255,255)"});return b.draw([{tag:"rect",color:"#e7e7e7",position:{top:"0px",height:"1px"}},{tag:"font",id:"sharecancel",text:"取消分享",textStyles:{size:"14px"},position:{bottom:"0px",height:"44px"}},{tag:"rect",color:"#e7e7e7",position:{bottom:"45px",height:"1px"}}]),e.map((function(t,e){var n=(new Date).getTime(),a=Math.floor(e/l),i=e%l,s=[{src:t.icon,id:1e3*Math.random()+n,tag:"img",position:{top:a*y+r,left:i*f+p,width:o,height:o}},{text:t.text,id:1e3*Math.random()+n,tag:"font",textStyles:{size:u},position:{top:a*y+h,left:i*f+p,width:o,height:o}}];b.draw(s)})),b.addEventListener("click",(function(t){if(t.screenY>plus.screen.resolutionHeight-44)v.hide(),b.hide();else if(t.clientX<5||t.clientX>a-5||t.clientY<5);else{var e=t.clientX,r=t.clientY,i=Math.floor(e/f),o=Math.floor(r/y),s=i+o*l;n&&n(s)}})),{alphaBg:v,shareMenu:b}}n("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a;e.default=r},"99b1":function(t,e,n){"use strict";var a=n("a7f0"),r=n.n(a);r.a},"9d88":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.uni-countdown[data-v-fcb2643e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;padding:%?2?% 0}.uni-countdown__splitor[data-v-fcb2643e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;line-height:%?48?%;padding:%?5?%;font-size:%?24?%}.uni-countdown__number[data-v-fcb2643e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?52?%;height:%?48?%;line-height:%?48?%;margin:%?5?%;text-align:center;font-size:%?24?%}',""]),t.exports=e},"9db9":function(t,e,n){"use strict";(function(t){var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var r=a(n("1da1")),i=a(n("3272")),o=(a(n("8bce")),n("d956")),s=n("926e"),c={onShow:function(){(0,s.toLogin)()},data:function(){return{status:!1,orderId:"",actualPrice:"",order:[],pintuan:""}},onLoad:function(t){this.status=t.status,this.orderId=t.orderId,this.money=t.money},mounted:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.status=t.status,t.orderId=t.orderId,t.actualPrice=t.money;case 3:case"end":return e.stop()}}),e)})))()},components:{uniCountdown:i.default},methods:{HomeGo:function(){uni.switchTab({url:"/pages/index/main"})},orderDetailGo:function(t){uni.redirectTo({url:"/apiMember/orderdetail/main?id="+t})},orderDetail:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.orderdetailGetApi)({orderId:t.orderId});case 2:n=e.sent,t.order=n;case 4:case"end":return e.stop()}}),e)})))()},rePay:function(t){uni.redirectTo({url:"/apiCart/pay/main?orderId="+t})},startPay:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:e.t0=t.paytype,e.next="deposit"===e.t0?3:"wxpaywxapp"===e.t0?6:"malipaymyapp"===e.t0?9:"wxpayh5"===e.t0?12:"malipaynew"===e.t0?15:"wxpayappplus"===e.t0?18:"malipayappplus"===e.t0?21:24;break;case 3:return t.depositPay(),e.abrupt("return",!1);case 6:return t.wxpaywxappPay(),e.abrupt("return",!1);case 9:return t.malipaymyappPay(),e.abrupt("return",!1);case 12:return t.wxpayh5Pay(),e.abrupt("return",!1);case 15:return t.malipaynewPay(),e.abrupt("return",!1);case 18:return t.wxpayappplusPay(),e.abrupt("return",!1);case 21:return t.malipayappplusPay(),e.abrupt("return",!1);case 24:return e.abrupt("return",!1);case 26:case"end":return e.stop()}}),e)})))()},depositPay:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,payDopaymentApi({paytype:t.paytype,orderId:t.orderId,money:t.actualPrice});case 2:e.sent,uni.redirectTo({url:"/apiCart/payresult/main?status=1&orderId="+t.orderId+"&money="+t.actualPrice+"&paytype="+t.paytype});case 4:case"end":return e.stop()}}),e)})))()},wxpaywxappPay:function(){var e=this;return(0,r.default)(regeneratorRuntime.mark((function n(){var a,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,payDopaymentApi({paytype:e.paytype,orderId:e.orderId,money:e.actualPrice});case 2:a=n.sent,e.payParams=a,r=e,uni.requestPayment({timeStamp:e.payParams.timeStamp,nonceStr:e.payParams.nonceStr,package:e.payParams.package,signType:"MD5",paySign:e.payParams.paySign,success:function(t){uni.redirectTo({url:"/apiCart/payresult/main?status=1&orderId="+r.orderId+"&money="+r.actualPrice+"&paytype="+this.paytype})},fail:function(e){t.log(r.orderId),uni.redirectTo({url:"/apiCart/payresult/main?status=0&orderId="+r.orderId+"&money="+r.actualPrice+"&paytype="+this.paytype})}});case 6:case"end":return n.stop()}}),n)})))()},malipaymyappPay:function(){var e=this;return(0,r.default)(regeneratorRuntime.mark((function n(){var a,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,payDopaymentApi({paytype:e.paytype,orderId:e.orderId,money:e.actualPrice});case 2:a=n.sent,t.log(a),e.payParams=a,r=e,e.payParams.trade_no&&uni.tradePay({tradeNO:e.payParams.trade_no,success:function(e){t.log(e),uni.redirectTo({url:"/apiCart/payresult/main?status=1&orderId="+r.orderId+"&money="+r.actualPrice+"&paytype="+this.paytype})},fail:function(e){uni.redirectTo({url:"/apiCart/payresult/main?status=0&orderId="+r.orderId+"&money="+r.actualPrice+"&paytype="+this.paytype}),t.log(e)}});case 7:case"end":return n.stop()}}),n)})))()},wxpayh5Pay:function(){return(0,r.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},malipaynewPay:function(){return(0,r.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},wxpayappplusPay:function(){return(0,r.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},malipayappplusPay:function(){return(0,r.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()}}};e.default=c}).call(this,n("5a52")["default"])},a7f0:function(t,e,n){var a=n("f250");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var r=n("4f06").default;r("b572f694",a,!0,{sourceMap:!1,shadowMode:!1})},ec66:function(t,e,n){"use strict";n.r(e);var a=n("6d98"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a},f250:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.container[data-v-40131ea0]{background:#fff}.pay-result[data-v-40131ea0]{background:#fff}.pay-result .msg[data-v-40131ea0]{text-align:center;margin:%?100?% auto;color:#2bab25;font-size:%?36?%}.pay-result .btns[data-v-40131ea0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.pay-result .btn[data-v-40131ea0]{text-align:center;height:%?80?%;margin:0 %?20?%;width:%?200?%;line-height:%?78?%;border:.01rem solid #868686;color:#000}.pay-result .error .msg[data-v-40131ea0]{color:#b4282d;margin-bottom:%?60?%}.pay-result .error .tips[data-v-40131ea0]{color:#7f7f7f;margin-bottom:%?70?%}.pay-result .error .tips .p[data-v-40131ea0]{font-size:%?24?%;line-height:%?42?%;text-align:center}.pay-result .error .tips .p .time[data-v-40131ea0]{color:#b4282d;line-height:%?42?%;text-align:center}.activity-line[data-v-40131ea0]{height:%?60?%;padding:%?8?% %?30?%;margin-top:20px;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;background:#f4f4f4}.activity-line .activity[data-v-40131ea0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.activity-line .activity .title[data-v-40131ea0]{color:#b4282d;font-size:16px;line-height:%?60?%}.activity-line .activity .sub[data-v-40131ea0]{padding-left:%?10?%;color:#666;font-size:%?22?%;line-height:%?60?%}.activity-line .activity .content[data-v-40131ea0]{text-align:center;color:#b4282d;font-size:16px;line-height:%?60?%}.activity-line .timer[data-v-40131ea0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;line-height:%?60?%}.activity-line .timer .text[data-v-40131ea0]{color:#666;font-size:16px;line-height:%?60?%;padding-right:%?10?%}.uni-countdown[data-v-40131ea0]{margin-top:4px}',""]),t.exports=e}}]);