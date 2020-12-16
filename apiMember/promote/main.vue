<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">分享</block>
    </cu-custom>
    <view class="content">
      <view class="top"></view>
      <view class="banner">
        <dl>
          <dt>
            <image
              src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/missing-face.png"
              mode=""
            ></image>
          </dt>
        </dl>
        <view class="img">
          <image :src="code_url" mode=""></image>
        </view>
        <view class="tgtit"
          >推广链接：<text class="tugurl">{{ url }}</text></view
        >
        <view class="sharbuttn">
          <!--  #ifdef  APP-PLUS -->
          <view class="btn" @click="save">保存二维码</view>
          <!--  #endif -->
          <view class="btn" @click="sharurl">复制推广链接</view>
        </view>
        <view class="sharapk"> </view>
        <view class="bottom">
          <ul>
            <li>1、好友识别二维码通过手机号进行注册</li>
            <li>2、也可分享此页面到微信或QQ邀请好友注册</li>
            <li>3、注册完成后您即可得到相应的积分</li>
          </ul>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { GetPromoteApi } from "@/server/config.js";
import h5Copy from "@/components/junyi-h5-copy/junyi-h5-copy.js";

export default {
  data() {
    return {
      providerList: [],
      type: 0,
      code_url: "",
      url: "",
    };
  },
  onLoad() {
    this.getData();
  },
  methods: {
    //复制分享链接
    sharurl() {
      // #ifdef H5
      let content = this.url; // 复制内容，必须字符串，数字需要转换为字符串
      const result = h5Copy(content);
      if (result === true) {
        uni.showToast({
          title: "复制成功",
        });
      } else {
        uni.showToast({
          title: "复制失败",
          icon: "none",
        });
      }
      // #endif

      // #ifdef MP || APP-PLUS
      uni.setClipboardData({
        data: this.url,
        success: function () {
          console.log("success");
          uni.showModal({
            title: "复制成功",
            content: "内容已复制到粘贴板，可前往其他应用粘贴查看。",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                //console.log('用户点击确定');
              } else if (res.cancel) {
                //console.log('用户点击取消');
              }
            },
          });
        },
      });
      // #endif
    },
    //保存图片到相册
    save() {
      uni.downloadFile({
        // 下载图片
        url: this.code_url,
        success: (res) => {
          uni.saveImageToPhotosAlbum({
            // 保存图片到本地
            filePath: res.tempFilePath, // 图片临时路径
            success: function () {
              uni.showToast({
                title: "保存成功",
                duration: 2000,
              });
            },
          });
        },
      });
    },
    share(e) {
      if (this.providerList.length === 0) {
        uni.showModal({
          title: "当前环境无分享渠道!",
          showCancel: false,
        });
        return;
      }
      let itemList = this.providerList.map(function (value) {
        return value.name;
      });

      console.log(itemList);

      uni.showActionSheet({
        itemList: itemList,
        success: (res) => {
          console.log(this.providerList[res.tapIndex].id);
          if (this.providerList[res.tapIndex].id == "qq") {
            this.type = 1;
          } else {
            this.type = 0;
          }
          uni.share({
            provider: this.providerList[res.tapIndex].id,
            scene:
              this.providerList[res.tapIndex].type &&
              this.providerList[res.tapIndex].type === "WXSenceTimeline"
                ? "WXSenceTimeline"
                : "WXSceneSession",
            type: this.type,
            title: "商城软件",
            summary: "商城软件是一个在线购物平台",
            imageUrl:
              "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/logo.png",
            href: "https://ecshop.yunyingbao.net",
            success: (res) => {
              console.log("success:" + JSON.stringify(res));
            },
            fail: (e) => {
              uni.showModal({
                content: e.errMsg,
                showCancel: false,
              });
            },
          });
        },
      });
    },
    async getData() {
      const data = await GetPromoteApi({});
      this.url = data.data.url;
	  console.log(data.data.code_url);
      this.code_url = data.data.code_url;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./style";
</style>
