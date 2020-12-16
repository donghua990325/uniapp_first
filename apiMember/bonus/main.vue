<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">激活红包</block>
    </cu-custom>
    <view class="forget">
      <view class="content">
        <!-- 主体 -->
        <view class="main">
          <!-- <view class="tips">若你忘记了密码，可在此重置新密码。</view> -->
          <wInput
            v-model="bonus_id"
            type="text"
            maxlength="11"
            placeholder="请输入红包激活码"
          ></wInput>
        </view>

        <wButton
          text="激活红包"
          :rotate="isRotate"
          @click.native="startRePass()"
        ></wButton>
      </view>
    </view>
  </view>
</template>

<script>
import { toLogin, quit } from "@/server/api.js";
import { activeBonusApi } from "@/server/config.js";
import wInput from "@/components/watch-login/watch-input.vue"; //input
import wButton from "@/components/watch-login/watch-button.vue"; //button
export default {
  onShow() {
    toLogin();
  },
  data() {
    return {
      // logoImage: "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/logo.png",
      bonus_id: "", //红包id
      isRotate: false, //是否加载旋转
    };
  },
  components: {
    wInput,
    wButton,
  },
  onLoad() {},
  methods: {
    async startRePass() {
      if (this.bonus_id.length === 0) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请输入红包激活码",
        });
        return false;
      }
      const data = await activeBonusApi({
        bonus_id: this.bonus_id,
      });
      if (data.data.msg === "success") {
        uni.showToast({
          icon: "none",
          title: "添加成功",
          success: function () {
            setTimeout(() => {
              uni.redirectTo({
                url: "/apiMember/coupon/main",
              });
            }, 1000);
          },
        });
      }
      if (data.data.msg === "def") {
        uni.showToast({
          icon: "none",
          title: "激活失败",
        });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import url("../../components/watch-login/css/icon.css");
@import "./style";
</style>

