<template>
  <view class="guide">
    <swiper
      class="flex1"
      interval="3000"
      :show-indicators="false"
      :auto-play="autoPlay"
      @change="sliderChange"
      :infinite="false"
      :forbid-slide-animation="false"
    >
      <swiper-item class="flex1" v-for="(img, index) in imageList" :key="index">
        <view class="flex1" @click="launchAppIndex">
          <!-- #ifndef APP-PLUS -->
          <a :href="img.url">
            <image
              class="flex1"
              mode="aspectFill"
              :style="{ width: screenWidth + 'px' }"
              :src="img.src"
            />
          </a>
          <!-- #endif -->

          <!-- #ifdef APP-PLUS -->
          <image class="flex1" resize="contain" :src="img.src" />
          <!-- #endif -->
        </view>
      </swiper-item>
    </swiper>
    <view class="swiper-to-home" @click="launchApp"
      ><text class="swiper-to-home-text">跳过</text></view
    >
  </view>
</template>

<script>
const SystemInfo = uni.getSystemInfoSync();
import { indexGuidePagesApi } from "@/server/config.js";

export default {
  onLoad() {
    this.getData();
  },
  data() {
    return {
      imageList: [],
      autoPlay: false,
      currIndex: 0,
      screenWidth: SystemInfo.screenWidth,
    };
  },
  methods: {
    sliderChange(e) {
      console.log(e);
      this.currIndex = e.detail.current;
    },
    launchAppIndex() {
      console.log("launchAppIndex");
      if (this.imageList.length == this.currIndex + 1) {
        this.launchApp();
      } else {
        return;
      }
    },
    launchApp() {
      // 直接到APP 且下次不再显示引导页
      uni.setStorage({
        key: "launchFlag",
        data: true,
        success() {
          uni.switchTab({
            url: "/pages/index/main",
          });
        },
      });
    },
    async getData() {
      const data = await indexGuidePagesApi({});
      this.imageList = data.data.guide;
      console.log(this.imageList);
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style.scss";
</style>