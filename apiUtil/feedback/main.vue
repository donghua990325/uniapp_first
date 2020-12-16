<template>
  <view>
    <cu-custom
      bgColor="bg-white"
      :isBack="true"
    >
      <block slot="backText">返回</block>
      <block slot="content">意见反馈</block>
    </cu-custom>
    <div class="feedback">
      <div class="connect">
        <label for="">
          标题:
        </label>
        <input
                type="text"
                v-model="title"
                name="title"
                placeholder="标题"
        >
      </div>

      <div class="title">
        意见与反馈：
      </div>
      <div class="cont">
        <textarea
          class="text"
          max='140'
          name=""
          v-model="content"
          placeholder="请填写你的意见和反馈"
        ></textarea>
        <span>{{content.length}}/140</span>
      </div>
      <div class="connect">
        <label for="">
          联系方式:
        </label>
        <input
          type="text"
          v-model="phone"
          name="phone"
          placeholder="邮箱/手机号/微信号"
        >
      </div>
      <div
        @click="submitMes"
        class="bottom"
      >
        提交
      </div>
    </div>
  </view>
</template>

<script>
import { feedbackSubmitActionApi } from "@/server/config.js";
import { toLogin, getStorageUserInfo } from "@/server/api.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    //获取用户信息
    this.userInfo = getStorageUserInfo();
  },
  onLoad() {},
  data() {
    return {
      userInfo: {},
      content: "",
      title: "",
      phone: ""
    };
  },
  components: {},
  methods: {
    async submitMes() {
      let _this = this;
	  let chinese = /[\u4E00-\u9FA5]/g;
      if (_this.content.length == 0 || _this.phone.length == 0 || this.title.length == 0) {
        uni.showToast({
          title: "请全部填写后提交~", //提示的内容,
          icon: "none", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });

        return;
      }
	  
	  //判断联系方式的输入长度
	  if ( _this.phone.length >= 40 ) {
	    uni.showToast({
	      title: "联系方式输入不能超过40位数", //提示的内容,
	      icon: "none", //图标,
	      duration: 2000, //延迟时间,
	      mask: true, //显示透明蒙层，防止触摸穿透,
	      success: res => {}
	    });
	  
	    return;
	  }
	  
	 //判断联系方式不能输入中文
	 if (chinese.test(_this.phone)) {
	   uni.showToast({
	     title: "联系方式不能输入中文", //提示的内容,
	     icon: "none", //图标,
	     duration: 2000, //延迟时间,
	     mask: true, //显示透明蒙层，防止触摸穿透,
	     success: res => {}
	   });
	 
	   return;
	 }
	  
      const data = await feedbackSubmitActionApi({
        name: this.userInfo.nickName,
        // user_id: uni.getStorageSync("user_id"),
        content: this.content,
        title: this.title,
        phone: this.phone
      });
      console.log(data.data);
      if (data.data) {
        uni.showToast({
          title: "提交成功", //提示app/apiMember/coupon/main.vue
          icon: "none", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {
            _this.title = "";
            _this.content = "";
            _this.phone = "";
          }
        });
      }
        // else {
      //   uni.showToast({
      //     title: data.msg, //提示的内容,
      //     icon: "none", //图标,
      //     duration: 2000, //延迟时间,
      //     mask: true, //显示透明蒙层，防止触摸穿透,
      //     success: res => {
      //       _this.content = "";
      //       _this.phone = "";
      //     }
      //   });
      // }
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
