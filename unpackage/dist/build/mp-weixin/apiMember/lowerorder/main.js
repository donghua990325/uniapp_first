(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["apiMember/lowerorder/main"],{6554:function(t,e,n){"use strict";(function(t){n("a2bf");o(n("66fd"));var e=o(n("f2af"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},aaa0:function(t,e,n){},b10e:function(t,e,n){"use strict";var o=n("aaa0"),a=n.n(o);a.a},bea8:function(t,e,n){"use strict";n.r(e);var o=n("c243"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},c243:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("a34a")),a=n("26b0"),i=n("de50");function r(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,o,a,i,r){try{var u=t[i](r),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(o,a)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var i=t.apply(e,n);function r(t){u(i,o,a,r,c,"next",t)}function c(t){u(i,o,a,r,c,"throw",t)}r(void 0)}))}}var s=function(){n.e("components/watch-login/watch-button").then(function(){return resolve(n("2f40"))}.bind(null,n)).catch(n.oe)},d={components:{WatchButton:s},onShow:function(){(0,a.toLogin)(),this.tabbarIndex=this.$root.$mp.query.status,this.user_id=this.$root.$mp.query.id,this.showType(this.tabbarIndex)},onReachBottom:function(){if(this.page=this.page+1,this.page>this.total)return!1;this.getOrderList()},created:function(){},mounted:function(){},data:function(){return{img_blank:"https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/no_order.png",headerPosition:"",typeText:{unpaid:"等待付款",back:"等待发货",unreceived:"已发货",received:"等待评价",completed:"交易已完成",refunds:"退货中",cancelled:"订单已取消"},orderList:[],list:[],tabbarIndex:0,page:1,excelUrl:"",total:""}},onLoad:function(t){console.log("option: "+JSON.stringify(t));var e=parseInt(t.tbIndex)+1;this.tabbarIndex=e},onPageScroll:function(t){},methods:{orderDetailGo:function(e){t.navigateTo({url:"/apiPromote/orderdetail/main?id="+e})},showType:function(t){this.tabbarIndex=t,this.page=1,this.list=[],this.total="",this.getOrderList(!0)},onceAgain:function(e){t.navigateTo({url:"/apiShop/goods/main?id="+e.goods_list[0].goods_id})},getOrderList:function(t){var e=this;return c(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,i.lowerCommissionApi)({id:e.user_id,page:e.page});case 2:a=n.sent,e.total=a.data.pagetotal,e.list=t?a.data.lowerorder:e.list.concat(a.data.lowerorder);case 5:case"end":return n.stop()}}),n)})))()}}};e.default=d}).call(this,n("543d")["default"])},ed18:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement;t._self._c},i=[]},f2af:function(t,e,n){"use strict";n.r(e);var o=n("ed18"),a=n("bea8");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("b10e");var r,u=n("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=c.exports}},[["6554","common/runtime","common/vendor"]]]);