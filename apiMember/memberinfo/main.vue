<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">会员信息</block>
    </cu-custom>
    <!--    <view class="cu-form-group">-->
    <!--      <view class="title">头像</view>-->
    <!--      <view>-->
    <!--        <avatar-->
    <!--          class="portrait"-->
    <!--          selWidth="600upx"-->
    <!--          selHeight="600upx"-->
    <!--          @upload="myUpload"-->
    <!--          :avatarSrc="avator"-->
    <!--          avatarStyle="width: 70upx; height: 70upx; border-radius: 100%;"-->
    <!--        >-->
    <!--        </avatar>-->
    <!--      </view>-->
    <!--    </view>-->
    <view class="cu-form-group">
      <view class="title">账号</view>
      <view class="picker">{{ login_account }}</view>
    </view>
    <!--    <view class="cu-form-group">-->
    <!--      <view class="title">昵称</view>-->
    <!--      <view class="text">-->
    <!--        <input-->
    <!--          maxlength="20"-->
    <!--          type="text"-->
    <!--          :placeholder="name"-->
    <!--          v-model="name"-->
    <!--        >-->
    <!--      </view>-->
    <!--    </view>-->
    <view class="cu-form-group">
      <view class="title">性别</view>
      <picker @change="PickerChange" :value="index" :range="picker">
        <view class="picker">{{ index > -1 ? picker[index] : "请选择" }}</view>
      </picker>
    </view>
    <view class="cu-form-group">
      <view class="title">生日</view>
      <picker
        mode="date"
        :value="date"
        start="1910-01-01"
        end="2021-01-01"
        @change="DateChange"
      >
        <view class="picker">{{ date }}</view>
      </picker>
    </view>
    <view class="list-cell log-out-btn" @click="memberinfoSave">
      <text class="cell-tit">保存信息</text>
    </view>
  </view>
</template>

<script>
import { toLogin } from "@/server/api.js";
import { getMemberApi, memberinfoSaveApi } from "@/server/config.js";
import avatar from "../../components/yq-avatar/yq-avatar.vue";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
  },
  onLoad() {
    //获取会员信息显示
    this.getMember();
  },
  data() {
    return {
      login_account: "",
      name: "未知",
      index: -1,
      picker: ["保密", "男", "女"],
      date: "2019-01-01",
      avator:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/missing-face.png",
    };
  },
  components: {
    avatar,
  },
  methods: {
    myUpload(rsp) {
      this.avator = rsp.path; //更新头像方式一
      //rsp.avatar.imgSrc = rsp.path; //更新头像方式二
    },
    PickerChange(e) {
      this.index = e.detail.value;
    },
    DateChange(e) {
      this.date = e.detail.value;
    },
    async getMember() {
      const data = await getMemberApi({});
      console.log(data.data.info);
      this.date = data.data.info.birthday;
      this.index = data.data.info.sex;
      this.login_account = data.data.info.user_name;
      this.name = data.data.info.name;
      if (data.data.info.user_pic) {
        this.avator = data.data.info.user_pic;
      }
    },
    async memberinfoSave() {
      const data = await memberinfoSaveApi({
        birthdaytime: this.date,
        sex: this.index,
      });

      if (data) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "保存成功",
        });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style.scss";
</style>
