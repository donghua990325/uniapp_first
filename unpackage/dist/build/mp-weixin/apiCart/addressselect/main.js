(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["apiCart/addressselect/main"],{3918:function(t,e,a){"use strict";(function(t){a("a2bf");n(a("66fd"));var e=n(a("f9a5"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"4fa3":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("a34a")),s=a("de50"),r=a("26b0");function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e,a,n,s,r,i){try{var o=t[r](i),c=o.value}catch(u){return void a(u)}o.done?e(c):Promise.resolve(c).then(n,s)}function c(t){return function(){var e=this,a=arguments;return new Promise((function(n,s){var r=t.apply(e,a);function i(t){o(r,n,s,i,c,"next",t)}function c(t){o(r,n,s,i,c,"throw",t)}i(void 0)}))}}var u={onShow:function(){(0,r.toLogin)(),t.removeStorage({key:"addressId"}),this.getAddressList()},created:function(){},data:function(){return{scrollflag:!0,nowIndex:0,imgUrl:"",listData:[],tranX:0,tranX1:0,startX:"",startY:"",moveX:"",moveY:"",moveEndX:"",moveEndY:"",X:0,Y:"",flag:!1}},components:{},onBackPress:function(){},methods:{selAddress:function(e){t.setStorageSync("addressId",e),t.navigateBack({delta:1})},initTextStyle:function(){for(var t=0;t<this.listData.length;t++)this.listData[t].textStyle="",this.listData[t].textStyle1=""},startMove:function(t){this.initTextStyle(),this.startX=t.touches[0].pageX,this.startY=t.touches[0].pageY},delAddress:function(e){var a=this;return c(n.default.mark((function s(){var r;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=a,t.showModal({title:"",content:"是否要删除该收货地址",success:function(t){console.log("delete"),t.confirm?r.addressDeleteApi(e):t.cancel&&(console.log("用户点击取消"),r.initTextStyle())}});case 2:case"end":return n.stop()}}),s)})))()},onLoad:function(t){this.type=t.type},goConfirm:function(e){var a=this.type;t.setStorageSync("addressId",e.address_id),"buy"==a&&t.navigateBack({url:"/apiCart/order/main"})},deleteGoods:function(t){this.initTextStyle();var e=t.currentTarget.dataset.index;console.log(this.X),this.X<=-100&&(this.flag=!0),this.flag?(this.moveX=t.touches[0].pageX,this.moveY=t.touches[0].pageY,this.X=this.moveX-this.startX,this.Y=this.moveX-this.startY,this.tranX=this.X-100,this.listData[e].textStyle="transform:translateX(".concat(this.tranX,"rpx);"),this.X+-100>-100&&(this.flag=!1),this.tranX1=-100,this.listData[e].textStyle1="transform:translateX(-100rpx);"):(this.moveX=t.touches[0].pageX,this.moveY=t.touches[0].pageY,this.X=this.moveX-this.startX,this.Y=this.moveX-this.startY,this.listData[e].textStyle="transform:translateX(".concat(this.tranX,"rpx);"),this.X>=100&&(this.X=0),this.tranX=this.X,this.X<=-100&&(this.X=-100),this.tranX1=this.X,this.listData[e].textStyle1="transform:translateX(".concat(this.tranX1,"rpx);"))},endMove:function(t){var e=t.currentTarget.dataset.index;this.X>-50?(this.tranX1=0,this.tranX=0,this.listData[e].textStyle="transform:translateX(".concat(this.tranX,"rpx);"),this.listData[e].textStyle1="transform:translateX(".concat(this.tranX1,"rpx);")):this.X<=-50&&(this.tranX1=-100,this.tranX=-100,this.listData[e].textStyle="transform:translateX(".concat(this.tranX,"rpx);"),this.listData[e].textStyle1="transform:translateX(".concat(this.tranX1,"rpx);"))},toDetail:function(e,a){t.navigateTo({url:"/apiCart/addaddress/main?id="+e+"&mobile_addr_id_list="+a})},addressDeleteApi:function(t){var e=this;return c(n.default.mark((function a(){return n.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,(0,s.addressDeleteApi)({id:t}).then((function(){e.getAddressList()}));case 2:a.sent;case 3:case"end":return a.stop()}}),a)})))()},getAddressList:function(){var t=this;return c(n.default.mark((function e(){var a,r;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t,e.next=3,(0,s.addressGetListApi)({});case 3:for(a=e.sent,r=0;r<a.data.info.length;r++)a.data.info[r].textStyle="",a.data.info[r].textStyle1="";t.listData=a.data.info;case 6:case"end":return e.stop()}}),e)})))()},wxaddress:function(e){1==e?t.navigateTo({url:"/apiCart/addaddress/main"}):t.chooseAddress({success:function(e){var a=encodeURIComponent(JSON.stringify(e));t.navigateTo({url:"/apiCart/addaddress/main?res="+a})}})}}};e.default=u}).call(this,a("543d")["default"])},6077:function(t,e,a){},"82f3":function(t,e,a){"use strict";a.r(e);var n=a("4fa3"),s=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=s.a},"8b5b":function(t,e,a){"use strict";var n=a("6077"),s=a.n(n);s.a},"9ca6":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement;t._self._c},r=[]},f9a5:function(t,e,a){"use strict";a.r(e);var n=a("9ca6"),s=a("82f3");for(var r in s)"default"!==r&&function(t){a.d(e,t,(function(){return s[t]}))}(r);a("8b5b");var i,o=a("f0c5"),c=Object(o["a"])(s["default"],n["b"],n["c"],!1,null,"11e8235e",null,!1,n["a"],i);e["default"]=c.exports}},[["3918","common/runtime","common/vendor"]]]);