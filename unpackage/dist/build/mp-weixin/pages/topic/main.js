(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/topic/main","components/footer/footer"],{"114c":function(t,n,e){"use strict";var a=e("8f3f"),u=e.n(a);u.a},"15ac":function(t,n,e){"use strict";(function(t){e("a2bf");a(e("66fd"));var n=a(e("ca50"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"23ad":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement;t._self._c},o=[]},"2d60":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={created:function(){},onLoad:function(){},data:function(){return{PageCur:""}},methods:{NavChange:function(n){t.navigateTo({url:"/pages/"+n+"/main"})}}};n.default=e}).call(this,e("543d")["default"])},"8f3f":function(t,n,e){},"97ac":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=o(e("a34a")),u=e("de50");o(e("f992"));function o(t){return t&&t.__esModule?t:{default:t}}function c(t,n,e,a,u,o,c){try{var i=t[o](c),r=i.value}catch(f){return void e(f)}i.done?n(r):Promise.resolve(r).then(a,u)}function i(t){return function(){var n=this,e=arguments;return new Promise((function(a,u){var o=t.apply(n,e);function i(t){c(o,a,u,i,r,"next",t)}function r(t){c(o,a,u,i,r,"throw",t)}i(void 0)}))}}var r={onPullDownRefresh:function(){this.page=1,this.getListData(!0),t.stopPullDownRefresh()},onReachBottom:function(){if(this.page=this.page+1,this.page>this.total)return!1;this.getListData()},created:function(){},mounted:function(){this.getListData(!0)},data:function(){return{topicList:[],page:1,total:""}},components:{},methods:{getListData:function(t){var n=this;return i(a.default.mark((function e(){var o;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,u.topicListApi)({page:n.page});case 2:o=e.sent,n.total=o.data.total,n.topicList=t?o.data.data:n.topicList.concat(o.data.data);case 5:case"end":return e.stop()}}),e)})))()},topicDetail:function(n){t.navigateTo({url:"/apiShop/topicdetail/main?id="+n})}},computed:{}};n.default=r}).call(this,e("543d")["default"])},ca50:function(t,n,e){"use strict";e.r(n);var a=e("23ad"),u=e("f2ea");for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);e("114c");var c,i=e("f0c5"),r=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,"24702210",null,!1,a["a"],c);n["default"]=r.exports},cce8:function(t,n,e){"use strict";e.r(n);var a=e("2d60"),u=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=u.a},e647:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement;t._self._c},o=[]},f2ea:function(t,n,e){"use strict";e.r(n);var a=e("97ac"),u=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=u.a},f992:function(t,n,e){"use strict";e.r(n);var a=e("e647"),u=e("cce8");for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);var c,i=e("f0c5"),r=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=r.exports}},[["15ac","common/runtime","common/vendor"]]]);