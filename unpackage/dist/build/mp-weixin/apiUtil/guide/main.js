(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["apiUtil/guide/main"],{"35d7":function(n,t,e){"use strict";var u;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return u}));var a=function(){var n=this,t=n.$createElement;n._self._c},r=[]},"7a57":function(n,t,e){"use strict";e.r(t);var u=e("8376"),a=e.n(u);for(var r in u)"default"!==r&&function(n){e.d(t,n,(function(){return u[n]}))}(r);t["default"]=a.a},8376:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(e("a34a")),a=e("de50");function r(n){return n&&n.__esModule?n:{default:n}}function i(n,t,e,u,a,r,i){try{var c=n[r](i),o=c.value}catch(s){return void e(s)}c.done?t(o):Promise.resolve(o).then(u,a)}function c(n){return function(){var t=this,e=arguments;return new Promise((function(u,a){var r=n.apply(t,e);function c(n){i(r,u,a,c,o,"next",n)}function o(n){i(r,u,a,c,o,"throw",n)}c(void 0)}))}}var o=n.getSystemInfoSync(),s={onLoad:function(){this.getData()},data:function(){return{imageList:[],autoPlay:!1,currIndex:0,screenWidth:o.screenWidth}},methods:{sliderChange:function(n){console.log(n),this.currIndex=n.detail.current},launchAppIndex:function(){console.log("launchAppIndex"),this.imageList.length==this.currIndex+1&&this.launchApp()},launchApp:function(){n.setStorage({key:"launchFlag",data:!0,success:function(){n.switchTab({url:"/pages/index/main"})}})},getData:function(){var n=this;return c(u.default.mark((function t(){var e;return u.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,a.indexGuidePagesApi)({});case 2:e=t.sent,n.imageList=e.data.guide,console.log(n.imageList);case 5:case"end":return t.stop()}}),t)})))()}}};t.default=s}).call(this,e("543d")["default"])},"87e9":function(n,t,e){"use strict";var u=e("b459"),a=e.n(u);a.a},b459:function(n,t,e){},b997:function(n,t,e){"use strict";e.r(t);var u=e("35d7"),a=e("7a57");for(var r in a)"default"!==r&&function(n){e.d(t,n,(function(){return a[n]}))}(r);e("87e9");var i,c=e("f0c5"),o=Object(c["a"])(a["default"],u["b"],u["c"],!1,null,"3444e824",null,!1,u["a"],i);t["default"]=o.exports},cbd9:function(n,t,e){"use strict";(function(n){e("a2bf");u(e("66fd"));var t=u(e("b997"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])}},[["cbd9","common/runtime","common/vendor"]]]);