(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["apiCart-addaddress-main"],{"03950":function(e,t,a){"use strict";a("c975"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(e){return e<10?"0"+e:e+""},n={initDays:function(e,t){for(var a=new Date(e,t,0).getDate(),n=[],r=1;r<=a;r++)n.push(i(r));return n},date:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"date",n=arguments.length>3?arguments[3]:void 0,r=arguments.length>4?arguments[4]:void 0,s=arguments.length>5?arguments[5]:void 0,c=(new Date,[]),u=new Date(e),o=new Date(t);e>t&&(u=new Date(t),o=new Date(e));for(var d=u.getFullYear(),l=(u.getMonth(),o.getFullYear()),v=[],f=[],h=[],p=[],m=[],k=[],w=[],y=s?1*r[1]:r[1]+1,g=new Date(d,y,0).getDate(),_=d;_<=l;_++)v.push(_+"");for(var b=1;b<=12;b++)f.push(i(b));for(var C=1;C<=g;C++)h.push(i(C));for(var x=0;x<24;x++)p.push(i(x));for(var V=0;V<60;V+=1*n)m.push(i(V));for(var S=0;S<60;S++)k.push(i(S));switch(s&&(w=[v.indexOf(r[0]),f.indexOf(r[1]),h.indexOf(r[2]),p.indexOf(r[3]),-1==m.indexOf(r[4])?0:m.indexOf(r[4]),k.indexOf(r[5])]),a){case"range":return s?(c=[w[0],w[1],w[2],0,w[0],w[1],w[2]],{years:v,months:f,days:h,defaultVal:c}):{years:v,months:f,days:h};case"date":return s?(c=[w[0],w[1],w[2]],{years:v,months:f,days:h,defaultVal:c}):{years:v,months:f,days:h};case"yearMonth":return s?(c=[w[0],w[1]],{years:v,months:f,defaultVal:c}):{years:v,months:f};case"dateTime":return s?(c=w,{years:v,months:f,days:h,hours:p,minutes:m,seconds:k,defaultVal:c}):{years:v,months:f,days:h,hours:p,minutes:m,seconds:k};case"time":return s?(c=[w[3],w[4],w[5]],{hours:p,minutes:m,seconds:k,defaultVal:c}):{hours:p,minutes:m,seconds:k}}},initLimitHours:function(e,t){for(var a=[],n=1*e;n<=1*t;n++)a.push({label:i(n),value:i(n),flag:!1});return a},initLimitMinutes:function(e){for(var t=[],a=0;a<60;a+=1*e)t.push({label:i(a),value:i(a)});return t},limit:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:7,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:20,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:30,r=new Date,s=new Date((new Date).getTime()+60*n*1e3),c=[],u=[],o=[],d=s.getHours(),l=Math.floor(s.getMinutes()/a)*a,v=["周日","周一","周二","周三","周四","周五","周六"],f=0;f<e;f++){var h=void 0,p=void 0,m=void 0,k=void 0;h=r.getFullYear(),p=i(r.getMonth()+1),m=i(r.getDate()),k=v[r.getDay()];var w="";switch(f){case 0:w="今天";break;case 1:w="明天";break;case 2:w="后天";break;default:w=p+"月"+m+"日 "+k;break}c.push({label:w,value:h+"-"+p+"-"+m,flag:0==f}),r.setDate(r.getDate()+1)}d>t&&(d=t);for(var y=1*d;y<=1*t;y++)u.push({label:i(y),value:i(y),flag:y==d});for(var g=l;g<60;g+=1*a)o.push({label:i(g),value:i(g)});return{date:c,hours:u,minutes:o}},initRangeDays:function(e,t){for(var a=new Date(e,t,0).getDate(),n=[],r=1;r<=a;r++)n.push(i(r));return n},range:function(e,t,a,n){new Date;var r=[],s=new Date(e),c=new Date(t);e>t&&(s=new Date(t),c=new Date(e));for(var u=s.getFullYear(),o=(s.getMonth(),c.getFullYear()),d=[],l=[],v=[],f=[],h=[],p=[],m=n?1*a[1]:a[1]+1,k=new Date(u,m,0).getDate(),w=u;w<=o;w++)d.push(w+"");for(var y=1;y<=12;y++)l.push(i(y));for(var g=1;g<=k;g++)v.push(i(g));for(var _=u;_<=o;_++)f.push(_+"");for(var b=1;b<=12;b++)h.push(i(b));for(var C=1;C<=k;C++)p.push(i(C));return n?(r=[d.indexOf(a[0]),l.indexOf(a[1]),v.indexOf(a[2]),0,f.indexOf(a[0]),h.indexOf(a[1]),p.indexOf(a[2])],{fyears:d,fmonths:l,fdays:v,tyears:f,tmonths:h,tdays:p,defaultVal:r}):{fyears:d,fmonths:l,fdays:v,tyears:f,tmonths:h,tdays:p}}},r=n;t.default=r},"05c1":function(e,t,a){"use strict";a.r(t);var i=a("c7d3"),n=a("f84e");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("fe37");var s,c=a("f0c5"),u=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,"26d606cd",null,!1,i["a"],s);t["default"]=u.exports},"0a9d":function(e,t,a){var i=a("8848");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("00c7b84e",i,!0,{sourceMap:!1,shadowMode:!1})},"0adb":function(e,t,a){var i=a("17dc");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("45fe94b6",i,!0,{sourceMap:!1,shadowMode:!1})},"17dc":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.w-picker[data-v-26d606cd]{position:relative;z-index:888}.w-picker .mask[data-v-26d606cd]{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,.6);visibility:hidden;opacity:0;-webkit-transition:all .3s ease;transition:all .3s ease}.w-picker .mask.show[data-v-26d606cd]{visibility:visible;opacity:1}.w-picker .w-picker-cnt[data-v-26d606cd]{position:fixed;bottom:0;left:0;width:100%;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translateY(100%);transform:translateY(100%);z-index:3000}.w-picker .w-picker-cnt.show[data-v-26d606cd]{-webkit-transform:translateY(0);transform:translateY(0)}.w-picker .w-picker-hd[data-v-26d606cd]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 %?30?%;height:%?88?%;background-color:#fff;position:relative;text-align:center;font-size:%?32?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.w-picker .w-picker-hd .w-picker-btn[data-v-26d606cd]{font-size:%?30?%}.w-picker .w-picker-hd[data-v-26d606cd]:after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.w-picker .w-picker-item[data-v-26d606cd]{text-align:center;width:100%;height:%?88?%;line-height:%?88?%;text-overflow:ellipsis;white-space:nowrap;font-size:%?30?%}.w-picker .w-picker-view[data-v-26d606cd]{width:100%;height:%?476?%;overflow:hidden;background-color:#fff;z-index:666}.w-picker uni-picker-view[data-v-26d606cd]{height:100%}',""]),e.exports=t},"19ec":function(e,t,a){"use strict";var i=a("0a9d"),n=a.n(i);n.a},"55cf":function(e,t,a){"use strict";a.r(t);var i=a("c932"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},7884:function(e,t,a){"use strict";a.r(t);var i=a("f54c"),n=a("55cf");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("19ec");var s,c=a("f0c5"),u=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,"5faee6e9",null,!1,i["a"],s);t["default"]=u.exports},8848:function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.addaddress .bottom[data-v-5faee6e9]{position:fixed;bottom:0;left:0;right:0;text-align:center;height:%?100?%;line-height:%?100?%;background:#b4282d;color:#fff;font-size:%?32?%}',""]),e.exports=t},a1e1:function(e,t,a){"use strict";(function(e){var i=a("4ea4");a("45fc"),a("a9e3"),a("d3b7"),a("ac1f"),a("25f0"),a("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("6d3f")),r=i(a("03950"));function s(t,a){for(var i=0;i<a.length;i++)if(t===a[i])return!0;return e.log(new Error("mode无效，请选择有效的mode!")),!1}var c={data:function(){return{result:[],data:{},provinces:{},citys:{},areas:{},checkArr:[],checkValue:[],pickVal:[],areaVal:[],showPicker:!1,resultStr:"",itemHeight:"height: ".concat(uni.upx2px(88),"px;")}},computed:{},props:{mode:{type:String,validator:function(e){var t=["date","dateTime","yearMonth","time","region","selector","limit","range"];return s(e,t)},default:function(){return"date"}},themeColor:{type:String,default:function(){return"#f5a200"}},startYear:{type:[String,Number],default:function(){return"1970"}},endYear:{type:[String,Number],default:function(){return(new Date).getFullYear()+""}},defaultVal:{type:Array,default:function(){return[0,0,0,0,0,0,0]}},step:{type:[String,Number],default:1},current:{type:Boolean,default:!1},selectList:{type:Array,default:function(){return[]}},dayStep:{type:[String,Number],default:7},startHour:{type:[String,Number],default:8},endHour:{type:[String,Number],default:20},minuteStep:{type:[String,Number],default:10},afterStep:{type:[String,Number],default:30}},watch:{mode:function(){this.initData()},selectList:function(){this.initData()}},methods:{useCurrent:function(){var e=new Date,t=e.getFullYear().toString(),a=this.formatNum(e.getMonth()+1).toString(),i=this.formatNum(e.getDate()).toString(),n=this.formatNum(e.getHours()).toString(),r=this.formatNum(e.getMinutes()).toString(),s=this.formatNum(e.getSeconds()).toString();return this.current?[t,a,i,n,(Math.floor(r/this.step)*this.step).toString(),s]:this.defaultVal},formatNum:function(e){return e<10?"0"+e:e+""},maskTap:function(){this.showPicker=!1},show:function(){this.showPicker=!0},hide:function(){this.showPicker=!1},pickerCancel:function(){this.$emit("cancel",{checkArr:this.checkArr,defaultVal:this.pickVal}),this.showPicker=!1},pickerConfirm:function(e){switch(this.mode){case"range":var t=this.checkArr,a=new Date(t[0],t[1],t[2]),i=new Date(t[3],t[4],t[5]);if(a>i)return void uni.showModal({title:"提示",content:"结束日期不能小于开始时间",confirmColor:this.themeColor});this.$emit("confirm",{checkArr:this.checkArr,from:t[0]+"-"+t[1]+"-"+t[2],to:t[3]+"-"+t[4]+"-"+t[5],defaultVal:this.pickVal,result:this.resultStr});break;case"limit":var n=(new Date).getTime(),r=new Date(this.resultStr.replace(/-/g,"/")).getTime();if(n>r)return void uni.showModal({title:"提示",content:"选择时间必须大于当前时间",confirmColor:this.themeColor});this.$emit("confirm",{checkArr:this.checkArr,defaultVal:this.pickVal,result:this.resultStr});break;case"region":this.$emit("confirm",{checkArr:this.checkArr,checkValue:this.checkValue,defaultVal:this.pickVal,areaVal:this.areaVal,result:this.resultStr});break;default:this.$emit("confirm",{checkArr:this.checkArr,defaultVal:this.pickVal,result:this.resultStr});break}this.showPicker=!1},bindChange:function(e){var t,a,i,n=this,s=e.detail.value,c="",u="",o="",d="",l="",v="",f=n.checkArr,h=[],p=n.mode;switch(p){case"limit":var m,k;if(m=n.data.date[s[0]],m.flag)if(k=n.data.hours[s[1]],n.data=r.default.limit(n.dayStep,n.starHour,n.endHour,n.minuteStep,n.afterStep),k.flag)n.data=r.default.limit(n.dayStep,n.starHour,n.endHour,n.minuteStep,n.afterStep);else{var w=r.default.initLimitMinutes(n.minuteStep);n.data.minutes=w}else{var y=r.default.initLimitHours(n.startHour,n.endHour),g=r.default.initLimitMinutes(n.minuteStep);n.data.hours=y,n.data.minutes=g}var _=n.data.date[s[0]],b=n.data.hours[s[1]],C=n.data.minutes[s[2]];n.checkArr=[_,b,C],n.resultStr="".concat(_.value+" "+(b&&b.value||"")+":"+(C&&C.value||"")+":00");break;case"range":var x=n.data.fyears[s[0]],V=n.data.fmonths[s[1]],S=n.data.fdays[s[2]],A=n.data.tyears[s[4]],D=n.data.tmonths[s[5]],$=n.data.tdays[s[6]];x!=f[0]&&(h=r.default.initRangeDays(x,V),n.data.fdays=h),V!=f[1]&&(h=r.default.initRangeDays(x,V),n.data.fdays=h),A!=f[3]&&(h=r.default.initRangeDays(A,D),n.data.tdays=h),D!=f[4]&&(h=r.default.initRangeDays(A,D),n.data.tdays=h),n.checkArr=[x,V,S,A,D,$],n.resultStr="".concat(x+"-"+V+"-"+S+"至"+A+"-"+D+"-"+$);break;case"date":c=n.data.years[s[0]],u=n.data.months[s[1]],o=n.data.days[s[2]],c!=f[0]&&(h=r.default.initDays(c,u),n.data.days=h),u!=f[1]&&(h=r.default.initDays(c,u),n.data.days=h),n.checkArr=[c,u,o],n.resultStr="".concat(c+"-"+u+"-"+o);break;case"yearMonth":c=n.data.years[s[0]],u=n.data.months[s[1]],n.checkArr=[c,u],n.resultStr="".concat(c+"-"+u);break;case"dateTime":c=n.data.years[s[0]],u=n.data.months[s[1]],o=n.data.days[s[2]],d=n.data.hours[s[3]],l=n.data.minutes[s[4]],v=n.data.seconds[s[5]],c!=f[0]&&(h=r.default.initDays(c,u),n.data.days=h),u!=f[1]&&(h=r.default.initDays(c,u),n.data.days=h),n.checkArr=[c,u,o,d,l,v],n.resultStr="".concat(c+"-"+u+"-"+o+" "+d+":"+l+":"+v);break;case"time":d=n.data.hours[s[0]],l=n.data.minutes[s[1]],v=n.data.seconds[s[2]],n.checkArr=[d,l,v],n.resultStr="".concat(d+":"+l+":"+v);break;case"region":t=n.data[s[0]].value,t!=f[0]&&(s[1]=0,s[2]=0),a="undefined"===typeof n.data[s[0]].children[s[1]]?"":n.data[s[0]].children[s[1]].value,a!=f[1]&&(s[2]=0),i="undefined"===typeof n.data[s[0]].children[s[1]].children[s[2]]?"":n.data[s[0]].children[s[1]].children[s[2]].value,t!=f[0]&&(s[1]=0,s[2]=0,a=n.data[s[0]].children[s[1]].value,i=n.data[s[0]].children[s[1]].children[s[2]].value),a!=f[1]&&(s[2]=0,i=n.data[s[0]].children[s[1]].children[s[2]].value),n.checkArr=[t,a,i],n.checkValue=[n.data[s[0]].value,n.data[s[0]].children[s[1]].value,n.data[s[0]].children[s[1]].children[s[2]].value],n.resultStr=t+a+i,n.provinces=n.data,n.citys=n.data[s[0]].children,n.areas=n.data[s[0]].children[s[1]].children,n.areaVal=[n.data[s[0]].id,n.data[s[0]].children[s[1]].id,n.data[s[0]].children[s[1]].children[s[2]].id];break;case"selector":n.checkArr=n.data[s[0]],n.resultStr=n.data[s[0]].label;break}n.$nextTick((function(){n.pickVal=s}))},initData:function(){var e,t,a,i,s,c,u,o,d,l=this,v={},f=l.mode,h=n.default.regionhost();if("region"==f?uni.request({url:h,method:"GET",data:{},success:function(e){if(200===e.statusCode){v=e.data,l.data=v;var t=v.defaultVal&&l.current?v.defaultVal:l.defaultVal;v.some((function(e,a){Number(e.id)===Number(t[0])&&(t[0]=a,"undefined"!=v[a].children&&v[a].children.some((function(e,i){Number(e.id)===Number(t[1])&&(t[1]=i,"undefined"!=v[a].children[i].children&&v[a].children[i].children.some((function(e,a){Number(e.id)===Number(t[2])&&(t[2]=a)})))})))})),u=v[t[0]],o="undefined"===v[t[0]].children?"":v[t[0]].children[t[1]],d="undefined"===v[t[0]].children[t[1]].children?"":v[t[0]].children[t[1]].children[t[2]],l.checkArr=[u.value,o.value,d.value],l.checkValue=[u.id,o.id,d.id],l.resultStr=u.value+o.value+d.value,l.$nextTick((function(){v.defaultVal&&l.current?l.pickVal=v.defaultVal:l.pickVal=l.defaultVal})),l.provinces=v,l.citys=v[t[0]].children,l.areas=v[t[0]].children[t[1]].children,l.areaVal=[v[t[0]].id,v[t[0]].children[t[1]].id,v[t[0]].children[t[1]].children[t[2]].id]}}}):v="selector"==f?l.selectList:"limit"==f?r.default.limit(l.dayStep,l.starHour,l.endHour,l.minuteStep,l.afterStep):"range"==f?r.default.range(l.startYear,l.endYear,l.useCurrent(),l.current):r.default.date(l.startYear,l.endYear,l.mode,l.step,l.useCurrent(),l.current),"region"==f)return!0;l.data=v;var p=v.defaultVal&&l.current?v.defaultVal:l.defaultVal;switch(f){case"limit":var m,k,w;m=v.date[p[0]],k=v.hours[p[1]],w=v.minutes[p[2]],l.checkArr=[m,k,w],l.resultStr="".concat(m.value+" "+k.value+":"+w.value+":00");break;case"range":var y=v.fyears[p[0]],g=v.fmonths[p[1]],_=v.fdays[p[2]],b=v.tyears[p[4]],C=v.tmonths[p[5]],x=v.tdays[p[6]];l.checkArr=[y,g,_,b,C,x],l.resultStr="".concat(y+"-"+g+"-"+_+"至"+b+"-"+C+"-"+x);break;case"date":e=v.years[p[0]],t=v.months[p[1]],a=v.days[p[2]],l.checkArr=[e,t,a],l.resultStr="".concat(e+"-"+t+"-"+a);break;case"yearMonth":e=v.years[p[0]],t=v.months[p[1]],l.checkArr=[e,t],l.resultStr="".concat(e+"-"+t);break;case"dateTime":e=v.years[p[0]],t=v.months[p[1]],a=v.days[p[2]],i=v.hours[p[3]],s=v.minutes[p[4]],c=v.seconds[p[5]],l.resultStr="".concat(e+"-"+t+"-"+a+" "+i+":"+s+":"+c),l.checkArr=[e,t,a,i,s];break;case"time":i=v.hours[p[0]],s=v.minutes[p[1]],c=v.seconds[p[2]],l.checkArr=[i,s,c],l.resultStr="".concat(i+":"+s+":"+c);break;case"region":break;case"selector":l.checkArr=v[p[0]],l.resultStr=v[p[0]].label;break}l.$nextTick((function(){v.defaultVal&&l.current?l.pickVal=v.defaultVal:l.pickVal=l.defaultVal}))}},mounted:function(){this.initData()}};t.default=c}).call(this,a("5a52")["default"])},c7d3:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"w-picker"},[a("v-uni-view",{staticClass:"mask",class:{show:e.showPicker},attrs:{catchtouchmove:"true"},on:{touchmove:function(t){t.stopPropagation(),t.preventDefault(),arguments[0]=t=e.$handleEvent(t)},click:function(t){arguments[0]=t=e.$handleEvent(t),e.maskTap.apply(void 0,arguments)}}}),a("v-uni-view",{staticClass:"w-picker-cnt",class:{show:e.showPicker}},[a("v-uni-view",{staticClass:"w-picker-hd",attrs:{catchtouchmove:"true"},on:{touchmove:function(t){t.stopPropagation(),t.preventDefault(),arguments[0]=t=e.$handleEvent(t)}}},[a("v-uni-view",{staticClass:"w-picker-btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.pickerCancel.apply(void 0,arguments)}}},[e._v("取消")]),a("v-uni-view",{staticClass:"w-picker-btn",style:{color:e.themeColor},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.pickerConfirm.apply(void 0,arguments)}}},[e._v("确定")])],1),"date"==e.mode?a("v-uni-view",{staticClass:"w-picker-view"},[a("v-uni-picker-view",{attrs:{"indicator-style":e.itemHeight,value:e.pickVal},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindChange.apply(void 0,arguments)}}},[a("v-uni-picker-view-column",e._l(e.data.years,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"年")])})),1),a("v-uni-picker-view-column",e._l(e.data.months,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"月")])})),1),a("v-uni-picker-view-column",e._l(e.data.days,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"日")])})),1)],1)],1):e._e(),"yearMonth"==e.mode?a("v-uni-view",{staticClass:"w-picker-view"},[a("v-uni-picker-view",{attrs:{"indicator-style":e.itemHeight,value:e.pickVal},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindChange.apply(void 0,arguments)}}},[a("v-uni-picker-view-column",e._l(e.data.years,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"年")])})),1),a("v-uni-picker-view-column",e._l(e.data.months,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"月")])})),1)],1)],1):e._e(),"dateTime"==e.mode?a("v-uni-view",{staticClass:"w-picker-view"},[a("v-uni-picker-view",{attrs:{"indicator-style":e.itemHeight,value:e.pickVal},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindChange.apply(void 0,arguments)}}},[a("v-uni-picker-view-column",e._l(e.data.years,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"年")])})),1),a("v-uni-picker-view-column",e._l(e.data.months,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"月")])})),1),a("v-uni-picker-view-column",e._l(e.data.days,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"日")])})),1),a("v-uni-picker-view-column",e._l(e.data.hours,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"时")])})),1),a("v-uni-picker-view-column",e._l(e.data.minutes,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"分")])})),1),a("v-uni-picker-view-column",e._l(e.data.seconds,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"秒")])})),1)],1)],1):e._e(),"range"==e.mode?a("v-uni-view",{staticClass:"w-picker-view"},[a("v-uni-picker-view",{attrs:{"indicator-style":e.itemHeight,value:e.pickVal},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindChange.apply(void 0,arguments)}}},[a("v-uni-picker-view-column",e._l(e.data.fyears,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t))])})),1),a("v-uni-picker-view-column",e._l(e.data.fmonths,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t))])})),1),a("v-uni-picker-view-column",e._l(e.data.fdays,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t))])})),1),a("v-uni-picker-view-column",[a("v-uni-view",{staticClass:"w-picker-item"},[e._v("-")])],1),a("v-uni-picker-view-column",e._l(e.data.tyears,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t))])})),1),a("v-uni-picker-view-column",e._l(e.data.tmonths,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t))])})),1),a("v-uni-picker-view-column",e._l(e.data.tdays,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t))])})),1)],1)],1):e._e(),"time"==e.mode?a("v-uni-view",{staticClass:"w-picker-view"},[a("v-uni-picker-view",{attrs:{"indicator-style":e.itemHeight,value:e.pickVal},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindChange.apply(void 0,arguments)}}},[a("v-uni-picker-view-column",e._l(e.data.hours,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"时")])})),1),a("v-uni-picker-view-column",e._l(e.data.minutes,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"分")])})),1),a("v-uni-picker-view-column",e._l(e.data.seconds,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t)+"秒")])})),1)],1)],1):e._e(),"region"==e.mode?a("v-uni-view",{staticClass:"w-picker-view"},[a("v-uni-picker-view",{attrs:{"indicator-style":e.itemHeight,value:e.pickVal},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindChange.apply(void 0,arguments)}}},[a("v-uni-picker-view-column",e._l(e.provinces,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t.value))])})),1),a("v-uni-picker-view-column",e._l(e.citys,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t.value))])})),1),a("v-uni-picker-view-column",e._l(e.areas,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t.value))])})),1)],1)],1):e._e(),"selector"==e.mode?a("v-uni-view",{staticClass:"w-picker-view"},[a("v-uni-picker-view",{attrs:{"indicator-style":e.itemHeight,value:e.pickVal},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindChange.apply(void 0,arguments)}}},[a("v-uni-picker-view-column",e._l(e.data,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t.label))])})),1)],1)],1):e._e(),"limit"==e.mode?a("v-uni-view",{staticClass:"w-picker-view"},[a("v-uni-picker-view",{attrs:{"indicator-style":e.itemHeight,value:e.pickVal},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindChange.apply(void 0,arguments)}}},[a("v-uni-picker-view-column",e._l(e.data.date,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t.label))])})),1),a("v-uni-picker-view-column",e._l(e.data.hours,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t.label)+"时")])})),1),a("v-uni-picker-view-column",e._l(e.data.minutes,(function(t,i){return a("v-uni-view",{key:i,staticClass:"w-picker-item"},[e._v(e._s(t.label)+"分")])})),1)],1)],1):e._e()],1)],1)},r=[]},c932:function(e,t,a){"use strict";(function(e){var i=a("4ea4");a("99af"),a("4160"),a("a15b"),a("07ac"),a("e25e"),a("ac1f"),a("1276"),a("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var n=i(a("1da1")),r=i(a("05c1")),s=a("d956"),c=a("926e"),u={onShow:function(){(0,c.toLogin)()},created:function(){},mounted:function(){this.$root.$mp.query.res&&(this.res=JSON.parse(decodeURIComponent(this.$root.$mp.query.res)),e.log(this.res),this.userName=this.res.userName,this.telNumber=this.res.telNumber,this.address="".concat(this.res.provinceName," ").concat(this.res.cityName," ").concat(this.res.countyName),this.detailadress=this.res.detailInfo),this.$root.$mp.query.id&&(this.id=this.$root.$mp.query.id),this.getDetail()},data:function(){return{region:[],customItem:"全部",id:"",res:{},userName:"",telNumber:"",email:"",address:"",detailadress:"",add_id_list:"",defaultVal:[10,0,5],checked:!0}},components:{wPicker:r.default},methods:{onConfirm:function(e){this.address=e.checkArr[0]+" "+e.checkArr[1]+" "+e.checkArr[2],this.address_id_list=e.checkKey},watch:function(){},WebaddressChange:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs["region"].show();case 1:case"end":return t.stop()}}),t)})))()},getDetail:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function t(){var a,i,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!=e.$mp.query.mobile_addr_id_list&&e.$mp.query.mobile_addr_id_list&&(a=e.$mp.query.mobile_addr_id_list.split(","),i=[],a.forEach((function(e){i.push(parseInt(e))})),e.defaultVal=i),""==e.$mp.query.id||!e.$mp.query.id){t.next=14;break}return t.next=4,(0,s.addressDetailApi)({address_id:e.$mp.query.id});case 4:n=t.sent,!1===n.data.is_detail&&(uni.showToast({title:"无此地址",icon:"none",duration:1e3}),setTimeout((function(){uni.redirectTo({url:"/apiCart/addressselect/main"})}),1e3)),r=n.data.data,e.userName=r.consignee,e.telNumber=r.mobile,e.email=r.email,e.address=r.province_name+" "+r.city_name+" "+r.district_name,e.detailadress=r.address,""!==r.mobile_addr_id_list&&(e.address_id_list="",e.add_id_list=r.mobile_addr_id_list),e.checked="true"==r.is_default;case 14:case"end":return t.stop()}}),t)})))()},checkboxChange:function(e){this.checked=e.mp.detail.value},saveAddress:function(){var e=this;return(0,n.default)(regeneratorRuntime.mark((function t(){var a,i,n,r,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=e,/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,i=/0?(13|14|15|16|17|18|19)[0-9]{9}/,n=/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,!1!==n.test(a.userName)){t.next=7;break}return uni.showToast({icon:"none",duration:1e3,title:"姓名格式错误"}),t.abrupt("return",!1);case 7:if(!1!==i.test(a.telNumber)){t.next=10;break}return uni.showToast({icon:"none",duration:1e3,title:"手机号格式错误"}),t.abrupt("return",!1);case 10:if(""!=a.detailadress){t.next=13;break}return uni.showToast({title:"地址不能为空",icon:"none",duration:2e3,mask:!0,success:function(e){}}),t.abrupt("return",!1);case 13:if(!(a.detailadress.length>32)){t.next=16;break}return uni.showToast({title:"地址输入有误，不能超过32个字符",icon:"none",duration:2e3,mask:!0,success:function(e){}}),t.abrupt("return",!1);case 16:return r=a.address.split(" "),""!=e.address_id_list&&e.address_id_list?e.add_id_list=Object.values(e.address_id_list).join(","):e.add_id_list="10,0,5",t.next=20,(0,s.addaddressDetailActionApi)({consignee:a.userName,email:a.email,mobile:a.telNumber,address:a.detailadress,mobile_addr_id_list:e.add_id_list,checked:a.checked,address_id:a.id,province:r[0],city:r[1],district:r[2]});case 20:c=t.sent,c.data.is_add&&uni.showToast({title:"成功",icon:"success",duration:2e3,mask:!0,success:function(e){uni.redirectTo({url:"/apiCart/addressselect/main"})}});case 22:case"end":return t.stop()}}),t)})))()},GetAddress:function(){var t=this;uni.chooseLocation({success:function(a){e.log("详细地址："+a.address);var i=a.latitude+","+a.longitude,n=(0,s.GetRealyAddressApi)({params:i});n.then((function(a){e.log(a.result.address_component.province+a.result.address_component.city+a.result.address_component.district),t.address="".concat(a.result.address_component.province," ").concat(a.result.address_component.city," ").concat(a.result.address_component.district),t.detailadress=a.result.address_component.street_number}))}})}}};t.default=u}).call(this,a("5a52")["default"])},f54c:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var i={wPicker:a("05c1").default},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("cu-custom",{attrs:{bgColor:"bg-white",isBack:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"},[e._v("返回")]),a("template",{attrs:{slot:"content"},slot:"content"},[e._v("添加地址")])],2),a("v-uni-view",{staticClass:"addaddress"},[a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("姓名")]),a("v-uni-input",{attrs:{type:"text",placeholder:"姓名",maxlength:"20"},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("手机")]),a("v-uni-input",{attrs:{type:"text",placeholder:"手机号码",maxlength:"11"},model:{value:e.telNumber,callback:function(t){e.telNumber=t},expression:"telNumber"}})],1),a("v-uni-view",{staticClass:"cu-form-group",staticStyle:{display:"none"}},[a("v-uni-view",{staticClass:"title"},[e._v("邮箱账号")]),a("v-uni-input",{attrs:{type:"text",placeholder:"邮箱账号"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("城市")]),a("v-uni-input",{attrs:{type:"text",placeholder:"省份、城市、区县",disabled:"false",focus:"false"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.WebaddressChange.apply(void 0,arguments)}},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}}),a("w-picker",{ref:"region",attrs:{mode:"region",defaultVal:e.defaultVal,themeColor:"#f00"},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.onConfirm.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("地址")]),a("v-uni-input",{attrs:{type:"text",placeholder:"详细地址，如楼道、楼盘号等"},model:{value:e.detailadress,callback:function(t){e.detailadress=t},expression:"detailadress"}})],1),a("v-uni-view",{staticClass:"cu-form-group margin-top"},[a("v-uni-view",{staticClass:"title"},[e._v("设置为默认地址")]),a("v-uni-switch",{class:e.checked?"checked":"",attrs:{checked:!!e.checked},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.checkboxChange.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("使用地理位置")]),a("v-uni-button",{staticClass:"cu-btn bg-green shadow",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.GetAddress.apply(void 0,arguments)}}},[e._v("附近位置")])],1),a("v-uni-view",{staticClass:"bottom",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.saveAddress.apply(void 0,arguments)}}},[e._v("保存")])],1)],1)},r=[]},f84e:function(e,t,a){"use strict";a.r(t);var i=a("a1e1"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},fe37:function(e,t,a){"use strict";var i=a("0adb"),n=a.n(i);n.a}}]);