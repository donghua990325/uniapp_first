(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["apiShop/hotgooslist/main"],{"3fe2":function(t,n,i){},"53ab":function(t,n,i){"use strict";i.r(n);var e=i("7b88"),a=i("cd91");for(var o in a)"default"!==o&&function(t){i.d(n,t,(function(){return a[t]}))}(o);i("6065");var s,u=i("f0c5"),r=Object(u["a"])(a["default"],e["b"],e["c"],!1,null,"67212d70",null,!1,e["a"],s);n["default"]=r.exports},6065:function(t,n,i){"use strict";var e=i("3fe2"),a=i.n(e);a.a},"7b88":function(t,n,i){"use strict";var e;i.d(n,"b",(function(){return a})),i.d(n,"c",(function(){return o})),i.d(n,"a",(function(){return e}));var a=function(){var t=this,n=t.$createElement;t._self._c},o=[]},8512:function(t,n,i){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=o(i("a34a")),a=i("de50");function o(t){return t&&t.__esModule?t:{default:t}}function s(t,n,i,e,a,o,s){try{var u=t[o](s),r=u.value}catch(c){return void i(c)}u.done?n(r):Promise.resolve(r).then(e,a)}function u(t){return function(){var n=this,i=arguments;return new Promise((function(e,a){var o=t.apply(n,i);function u(t){s(o,e,a,u,r,"next",t)}function r(t){s(o,e,a,u,r,"throw",t)}u(void 0)}))}}var r={onReachBottom:function(){if(this.page=this.page+1,this.page>this.pagetotal)return!1;this.getlistData()},created:function(){},onLoad:function(t){this.isHot=t.isHot,this.isNew=t.isNew,this.id=t.id},mounted:function(){this.isHot&&(this.isHot=this.isHot),this.isNew&&(this.isNew=this.isNew),this.id=this.id,void 0===this.id&&(this.id=""),this.getlistData(!0)},data:function(){return{id:"",page:1,order:"",isHot:"",isNew:"",nowIndex:0,listData:[],activeClass:""}},components:{},methods:{getlistData:function(){var t=this;return u(e.default.mark((function n(){var i;return e.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,a.hotGoodsListApi)({page:t.page});case 2:i=n.sent,1==t.page&&(t.listData=i.data.list),t.pagetotal=i.data.pagetotal,t.page>1&&(t.listData=t.listData.concat(i.data.list));case 6:case"end":return n.stop()}}),n)})))()},goodsDetail:function(n){t.navigateTo({url:"/apiShop/goods/main?id="+n})}},computed:{}};n.default=r}).call(this,i("543d")["default"])},8710:function(t,n,i){"use strict";(function(t){i("a2bf");e(i("66fd"));var n=e(i("53ab"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,i("543d")["createPage"])},cd91:function(t,n,i){"use strict";i.r(n);var e=i("8512"),a=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(n,t,(function(){return e[t]}))}(o);n["default"]=a.a}},[["8710","common/runtime","common/vendor"]]]);