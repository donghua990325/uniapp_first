<template>
  <!-- 自定义底部未使用，后面考虑把 -->
  <view class="cu-bar tabbar bg-white shadow foot">
    <view class="action" @click="NavChange('index')" data-cur="index">
      <view class="cuIcon-cu-image">
        <image
          :src="
            '/static/images/ic_menu_choice' +
            [PageCur == 'index' ? '_pressed' : '_nor'] +
            '.png'
          "
        ></image>
      </view>
      <view :class="PageCur == 'index' ? 'text-jred' : 'text-jgray'">首页</view>
    </view>

    <view class="action" @click="NavChange('topic')" data-cur="topic">
      <view class="cuIcon-cu-image">
        <image
          :src="
            '/static/images/ic_menu_topic' +
            [PageCur == 'topic' ? '_pressed' : '_nor'] +
            '.png'
          "
        ></image>
      </view>
      <view :class="PageCur == 'topic' ? 'text-jred' : 'text-jgray'">精选</view>
    </view>

    <view class="action" @click="NavChange('category')" data-cur="category">
      <view class="cuIcon-cu-image">
        <image
          :src="
            '/static/images/ic_menu_sort' +
            [PageCur == 'category' ? '_pressed' : '_nor'] +
            '.png'
          "
        ></image>
      </view>
      <view :class="PageCur == 'category' ? 'text-jred' : 'text-jgray'"
        >分类</view
      >
    </view>

    <view class="action" @click="NavChange('cart')" data-cur="cart">
      <view class="cuIcon-cu-image">
        <image
          :src="
            '/static/images/ic_menu_shoping' +
            [PageCur == 'cart' ? '_pressed' : '_nor'] +
            '.png'
          "
        ></image>
      </view>
      <view :class="PageCur == 'cart' ? 'text-jred' : 'text-jgray'"
        >购物车</view
      >
    </view>

    <view class="action" @click="NavChange('my')" data-cur="my">
      <view class="cuIcon-cu-image">
        <image
          :src="
            '/static/images/ic_menu_me' +
            [PageCur == 'my' ? '_pressed' : '_nor'] +
            '.png'
          "
        ></image>
      </view>
      <view :class="PageCur == 'my' ? 'text-jred' : 'text-jgray'">我的</view>
    </view>
  </view>
</template>
<script>
export default {
  created() {
    // switch (this.$route.meta.pagePath) {
    //   case "pages/index/main":
    //     this.PageCur = "index";
    //     break;
    //   case "pages/topic/main":
    //     this.PageCur = "topic";
    //     break;
    //   case "pages/category/main":
    //     this.PageCur = "category";
    //     break;
    //   case "pages/cart/main":
    //     this.PageCur = "cart";
    //     break;
    //   case "pages/my/main":
    //     this.PageCur = "my";
    //     break;
    //   default:
    //     break;
    // }
  },
  onLoad() {},
  data() {
    return {
      PageCur: "",
    };
  },
  methods: {
    NavChange: function (navgo) {
      uni.navigateTo({
        url: "/pages/" + navgo + "/main",
      });
    },
  },
};
</script>

<style>
</style>