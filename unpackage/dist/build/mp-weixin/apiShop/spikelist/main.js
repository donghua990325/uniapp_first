(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["apiShop/spikelist/main"],{"162a":function(t,i,n){"use strict";n.r(i);var e=n("d6e4"),a=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(i,t,(function(){return e[t]}))}(o);i["default"]=a.a},"5c85":function(t,i,n){"use strict";(function(t){n("a2bf");e(n("66fd"));var i=e(n("cd50"));function e(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,n("543d")["createPage"])},"81d7":function(t,i,n){"use strict";var e;n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return o})),n.d(i,"a",(function(){return e}));var a=function(){var t=this,i=t.$createElement;t._self._c},o=[]},a20b:function(t,i,n){},cd50:function(t,i,n){"use strict";n.r(i);var e=n("81d7"),a=n("162a");for(var o in a)"default"!==o&&function(t){n.d(i,t,(function(){return a[t]}))}(o);n("f1bc");var s,u=n("f0c5"),r=Object(u["a"])(a["default"],e["b"],e["c"],!1,null,"6f792642",null,!1,e["a"],s);i["default"]=r.exports},d6e4:function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=o(n("a34a")),a=n("de50");function o(t){return t&&t.__esModule?t:{default:t}}function s(t,i,n,e,a,o,s){try{var u=t[o](s),r=u.value}catch(c){return void n(c)}u.done?i(r):Promise.resolve(r).then(e,a)}function u(t){return function(){var i=this,n=arguments;return new Promise((function(e,a){var o=t.apply(i,n);function u(t){s(o,e,a,u,r,"next",t)}function r(t){s(o,e,a,u,r,"throw",t)}u(void 0)}))}}var r={onReachBottom:function(){if(this.page=this.page+1,this.page>this.pagetotal)return!1;this.getlistData()},created:function(){},onLoad:function(t){this.isHot=t.isHot,this.isNew=t.isNew,this.id=t.id},mounted:function(){this.isHot&&(this.isHot=this.isHot),this.isNew&&(this.isNew=this.isNew),this.id=this.id,void 0===this.id&&(this.id=""),this.getlistData(!0)},data:function(){return{id:"",page:1,order:"",isHot:"",isNew:"",nowIndex:0,listData:[],activeClass:""}},components:{},methods:{getlistData:function(){var t=this;return u(e.default.mark((function i(){var n;return e.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,(0,a.miaoshaGoodsListApi)({page:t.page});case 2:n=i.sent,1==t.page&&(t.listData=n.data.list),t.pagetotal=n.data.pagetotal,t.page>1&&(t.listData=t.listData.concat(n.data.list));case 6:case"end":return i.stop()}}),i)})))()},goodsDetail:function(i){t.navigateTo({url:"/apiShop/goods/main?id="+i})}},computed:{}};i.default=r}).call(this,n("543d")["default"])},f1bc:function(t,i,n){"use strict";var e=n("a20b"),a=n.n(e);a.a}},[["5c85","common/runtime","common/vendor"]]]);