(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["apiPam/binding/main"],{"09d2":function(e,t,n){"use strict";n.r(t);var o=n("3363"),r=n("f947");for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("c898");var i,s=n("f0c5"),c=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,"b37c221e",null,!1,o["a"],i);t["default"]=c.exports},"31b5":function(e,t,n){"use strict";(function(e){n("a2bf");o(n("66fd"));var t=o(n("09d2"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},3363:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var r=function(){var e=this,t=e.$createElement;e._self._c},a=[]},4540:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("a34a")),r=n("26b0"),a=n("de50");function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n,o,r,a,i){try{var s=e[a](i),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(o,r)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var a=e.apply(t,n);function i(e){s(a,o,r,i,c,"next",e)}function c(e){s(a,o,r,i,c,"throw",e)}i(void 0)}))}}var u=function(){n.e("components/watch-login/watch-input").then(function(){return resolve(n("a127"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/watch-login/watch-button").then(function(){return resolve(n("2f40"))}.bind(null,n)).catch(n.oe)},f={onShow:function(){this.openId=(0,r.getStorageOpenid)(),this.userInfo=(0,r.getStorageUserInfo)()},data:function(){return{phoneData:"",verCode:"",showAgree:!0,isRotate:!1,userInfo:[],openId:"",accesstoken:"",unionid:""}},components:{wInput:u,wButton:d},mounted:function(){},methods:{isShowAgree:function(){this.showAgree=!this.showAgree},getVerCode:function(){var t=this;return c(o.default.mark((function n(){var r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(11==t.phoneData.length){n.next=3;break}return e.showToast({icon:"none",position:"bottom",title:"手机号不正确"}),n.abrupt("return",!1);case 3:return n.next=5,(0,a.bindingSendSmsApi)({mobile:t.phoneData});case 5:r=n.sent,console.log("获取验证码"),console.log(r),r.data.res&&(t.$refs.runCode.$emit("runCode"),e.showToast({icon:"none",position:"bottom",title:"获取短信成功"}));case 9:case"end":return n.stop()}}),n)})))()},href:function(){var t=this;return c(o.default.mark((function n(){var r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,a.nextBingdingMobile)({openid:e.getStorageSync("openId"),unionid:e.getStorageSync("unionid"),platform:"MP-WEIXIN"});case 2:r=n.sent,t.user_id=r.data.user_id,t.accesstoken=r.data.sess_id,console.log("-------------"),console.log(t.user_id),console.log(t.accesstoken),console.log("-------------"),e.setStorageSync("accesstoken",t.accesstoken),e.setStorageSync("user_id",t.user_id),e.setStorageSync("tagtype","weixin"),e.switchTab({url:"/pages/my/main"});case 13:case"end":return n.stop()}}),n)})))()},startReg:function(){var t=this;return c(o.default.mark((function n(){var r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t.isRotate){n.next=2;break}return n.abrupt("return",!1);case 2:if(0!=t.showAgree){n.next=5;break}return e.showToast({icon:"none",position:"bottom",title:"请先同意《协议》"}),n.abrupt("return",!1);case 5:if(11==t.phoneData.length){n.next=8;break}return e.showToast({icon:"none",position:"bottom",title:"手机号不正确"}),n.abrupt("return",!1);case 8:if(!(t.verCode.length<4)){n.next=11;break}return e.showToast({icon:"none",position:"bottom",title:"验证码不正确"+t.verCode}),n.abrupt("return",!1);case 11:return n.next=13,(0,a.bindingWechatApi)({mobile:t.phoneData,verCode:t.verCode,openId:t.openId,nickname:t.userInfo.nickName,gender:t.userInfo.gender,avatarUrl:t.userInfo.avatarUrl,unionid:e.getStorageSync("unionid"),tagtype:"weixin",platform:"MP-WEIXIN"});case 13:if(r=n.sent,e.setStorageSync("tagtype","weixin"),!1!==r.data.res){n.next=18;break}return e.showToast({icon:"none",title:r.data.msg}),n.abrupt("return",!1);case 18:t.accesstoken=r.data.sess_id,t.openId=r.data.openId,t.user_id=r.data.user_id,e.setStorageSync("accesstoken",t.accesstoken),e.setStorageSync("openId",t.openId),e.setStorageSync("user_id",t.user_id),e.switchTab({url:"/pages/my/main"});case 25:case"end":return n.stop()}}),n)})))()},startRegDirect:function(){var t=this;return c(o.default.mark((function n(){var r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t.isRotate){n.next=2;break}return n.abrupt("return",!1);case 2:if(0!=t.showAgree){n.next=5;break}return e.showToast({icon:"none",position:"bottom",title:"请先同意《协议》"}),n.abrupt("return",!1);case 5:return n.next=7,(0,a.bindingWechatApi)({openId:t.openId,nickname:t.userInfo.nickName,gender:t.userInfo.gender,avatarUrl:t.userInfo.avatarUrl,tagtype:"weixin"});case 7:r=n.sent,e.setStorageSync("tagtype","weixin"),t.accesstoken=r.accesstoken,t.openId=r.openId,e.setStorageSync("userInfo",t.userInfo),e.setStorageSync("accesstoken",t.accesstoken),e.setStorageSync("openId",t.openId),e.switchTab({url:"/pages/my/main"});case 15:case"end":return n.stop()}}),n)})))()}}};t.default=f}).call(this,n("543d")["default"])},a3a5:function(e,t,n){},c898:function(e,t,n){"use strict";var o=n("a3a5"),r=n.n(o);r.a},f947:function(e,t,n){"use strict";n.r(t);var o=n("4540"),r=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a}},[["31b5","common/runtime","common/vendor"]]]);