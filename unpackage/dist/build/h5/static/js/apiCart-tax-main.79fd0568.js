(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["apiCart-tax-main"],{"1eef":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-867b9aaa]{min-height:100vh;width:100%;background:#f4f4f4}.container[data-v-867b9aaa]{padding-top:%?20?%}.pay-list[data-v-867b9aaa]{height:600px;width:100%;overflow:hidden}.b[data-v-867b9aaa]{border-top:%?1?% solid #f4f4f4}.pay-list .h[data-v-867b9aaa]{width:100%;height:%?50?%;line-height:%?50?%;margin-left:%?31.25?%;margin-bottom:%?20?%;font-size:%?28?%}.pay-list .item[data-v-867b9aaa]{height:%?108?%;padding-left:%?31.25?%;background:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:.01rem solid #f4f4f4}.pay-list .item-info[data-v-867b9aaa]{padding-left:%?31.25?%;background:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}ul[data-v-867b9aaa]{width:%?690?%;list-style:none;padding-left:0;padding-bottom:%?15?%}li[data-v-867b9aaa]{padding:%?20?% 0;border-bottom:%?1?% solid #f4f4f4}uni-input[data-v-867b9aaa]{font-size:%?26?%;color:#333}.pay-list .checkbox[data-v-867b9aaa]{background:url(https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/checkbox-sed.png) 0 %?-448?% no-repeat;background-size:%?38?% %?486?%;width:%?40?%;height:%?40?%;display:inline-block;vertical-align:middle;margin-right:%?30?%}.pay-list .checkbox.checked[data-v-867b9aaa]{background:url(https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/checkbox-sed.png) 0 %?-192?% no-repeat;background-size:%?38?% %?486?%}.pay-list .icon[data-v-867b9aaa]{display:inline-block;vertical-align:middle;margin-right:%?10.5?%;width:%?56.25?%;height:%?56.25?%}.pay-list .name[data-v-867b9aaa]{display:inline-block;vertical-align:middle;height:%?56.25?%;line-height:%?56.25?%}.pay-btn[data-v-867b9aaa]{position:fixed;left:0;bottom:0;height:%?100?%;width:100%;text-align:center;line-height:%?100?%;background:#b4282d;color:#fff;font-size:%?30?%}.tips[data-v-867b9aaa]{height:%?40?%;width:92%;font-size:%?24?%;color:#999;line-height:%?40?%;padding-left:%?30?%;padding-right:%?30?%}body.?%PAGE?%[data-v-867b9aaa]{background:#f4f4f4}',""]),t.exports=e},"37ca":function(t,e,a){"use strict";(function(t){var n=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("96cf");var i=n(a("1da1")),r=a("d956"),c=a("926e"),s={onShow:function(){(0,c.toLogin)(),this.getTaxlist(),uni.getStorageSync("tax_type")&&(this.index=uni.getStorageSync("tax_type")),uni.getStorageSync("tax_name")&&(this.title=uni.getStorageSync("tax_name")),uni.getStorageSync("taxNo")&&(this.taxNo=uni.getStorageSync("taxNo")),uni.getStorageSync("tax_bank")&&(this.tax_bank=uni.getStorageSync("tax_bank")),uni.getStorageSync("bank_account")&&(this.bank_account=uni.getStorageSync("bank_account")),uni.getStorageSync("tax_addr")&&(this.tax_addr=uni.getStorageSync("tax_addr"))},data:function(){return{tax:[],addressId:"",dtchecked:0,dt:[],index:"false",title:"",taxNo:"",rate:"",tax_bank:"",bank_account:"",tax_addr:"",shipping:[],tax_num:""}},onLoad:function(){return(0,i.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},methods:{getTaxlist:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,(0,r.taxListApi)({});case 2:n=a.sent,t.log(n),n&&(e.tax=n.data);case 5:case"end":return a.stop()}}),a)})))()},startOrder:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(uni.setStorageSync("tax_type",t.index),"1"!=t.index){e.next=7;break}if(""!==t.title){e.next=5;break}return uni.showToast({title:"请填写发票抬头",duration:2e3,icon:"none",mask:!0,success:function(t){}}),e.abrupt("return",!1);case 5:uni.setStorageSync("tax_type_name",t.tax[1][0]),uni.setStorageSync("tax_name",t.title);case 7:if("2"!=t.index){e.next=17;break}if(""!==t.title){e.next=11;break}return uni.showToast({title:"请填写发票抬头",duration:2e3,icon:"none",mask:!0,success:function(t){}}),e.abrupt("return",!1);case 11:if(""!==t.num){e.next=14;break}return uni.showToast({icon:"none",title:"请填写纳税人识别号"}),e.abrupt("return",!1);case 14:uni.setStorageSync("tax_type_name",t.tax[2][0]),uni.setStorageSync("tax_name",t.title),uni.setStorageSync("tax_num",t.tax_num);case 17:if("3"!=t.index){e.next=23;break}if(""!==t.title){e.next=21;break}return uni.showToast({title:"请填写发票抬头",duration:2e3,icon:"none",mask:!0,success:function(t){}}),e.abrupt("return",!1);case 21:uni.setStorageSync("tax_type_name",t.tax[3][0]),uni.setStorageSync("tax_name",t.title);case 23:"n"===t.index&&uni.setStorageSync("tax_type_name","不开票"),uni.navigateBack({url:"/apiCart/order/main"});case 25:case"end":return e.stop()}}),e)})))()},tagVal:function(e){var a=this;return(0,i.default)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:a.index=e,t.info(typeof a.index);case 2:case"end":return n.stop()}}),n)})))()}}};e.default=s}).call(this,a("5a52")["default"])},"3dbb":function(t,e,a){"use strict";a.r(e);var n=a("b94d"),i=a("96d7");for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);a("4cf5");var c,s=a("f0c5"),o=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"867b9aaa",null,!1,n["a"],c);e["default"]=o.exports},"4cf5":function(t,e,a){"use strict";var n=a("d13a"),i=a.n(n);i.a},"96d7":function(t,e,a){"use strict";a.r(e);var n=a("37ca"),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},b94d:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("cu-custom",{attrs:{bgColor:"bg-white",isBack:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("返回")]),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("订单发票")])],2),a("div",{staticClass:"container"},[a("div",{staticClass:"pay-list"},[a("div",{staticClass:"h"},[t._v("请填写发票信息")]),a("div",{staticClass:"b"},[a("div",{staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tagVal("n")}}},[a("div",{class:["n"===t.index?"checked checkbox":"checkbox"]}),a("div",{staticClass:"name"},[t._v("不开票")])]),t._l(t.tax,(function(e,n){return a("div",{key:n,staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tagVal(n)}}},[1==n?a("div",{class:[1==t.index?"checked checkbox":"checkbox"]}):t._e(),2==n?a("div",{class:[2==t.index?"checked checkbox":"checkbox"]}):t._e(),a("div",{staticClass:"name"},[t._v(t._s(e[0])+" 税率:"+t._s(e[1])+"%")])])}))],2),"1"==t.index?a("div",{staticClass:"item-info"},[a("ul",[a("li",[a("div",{staticClass:"t user-info"},[a("v-uni-input",{attrs:{type:"text",placeholder:"开票抬头"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1)])])]):t._e(),"2"==t.index?a("div",{staticClass:"item-info"},[a("ul",[a("li",[a("div",{staticClass:"t user-info"},[a("v-uni-input",{attrs:{type:"text",placeholder:"开票抬头"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1)]),a("li",[a("div",{staticClass:"t user-info"},[a("v-uni-input",{attrs:{type:"text",placeholder:"纳税人识别号"},model:{value:t.tax_num,callback:function(e){t.tax_num=e},expression:"tax_num"}})],1)])])]):t._e()]),a("div",{staticClass:"pay-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.startOrder.apply(void 0,arguments)}}},[t._v("确定")])])],1)},r=[]},d13a:function(t,e,a){var n=a("1eef");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("7521a340",n,!0,{sourceMap:!1,shadowMode:!1})}}]);