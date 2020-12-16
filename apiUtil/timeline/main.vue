<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">更新日志</block>
    </cu-custom>

    <view class="cu-timeline">
      <view class="cu-time">19-10-20</view>
      <view class="cu-item text-orange">
        <view class="bg-red content"> Release base version </view>
      </view>
    </view>
    <view class="cu-timeline">
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-red">1.0.6</view>
          </view>
          <view class="margin-top">1.新增许个愿功能</view>
          <view class="margin-top">2.修复了一些未知BUG</view>
        </view>
      </view>
    </view>

    <view class="cu-timeline">
      <view class="cu-time">19-09-20</view>
      <view class="cu-item text-orange">
        <view class="bg-orange content"> Release base version </view>
      </view>
    </view>
    <view class="cu-timeline">
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-orange">1.0.5</view>
          </view>
          <view class="margin-top">1.新增红包抵扣支付功能</view>
          <view class="margin-top">2.新增预存款充值功能，支持微信与支付宝</view>
          <view class="margin-top">3.新增开发票功能</view>
          <view class="margin-top">4.新增积分抵扣</view>
          <view class="margin-top">5.同样修复了其他N多BUG</view>
        </view>
      </view>
    </view>

    <view class="cu-timeline">
      <view class="cu-time">19-09-12</view>
      <view class="cu-item text-yellow">
        <view class="bg-yellow content"> Release base version </view>
      </view>
    </view>
    <view class="cu-timeline">
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-yellow">1.0.4</view>
          </view>
          <view class="margin-top">1.新增缓存清除功能</view>
          <view class="margin-top">2.图标进行了统一封装</view>
          <view class="margin-top"
            >3.非自定义图片采用了新型压缩技术并托管至阿里云CDN</view
          >
          <view class="margin-top">4.新增QQ客服功能（H5+APP）</view>
          <view class="margin-top">5.同样修复了其他N多BUG</view>
        </view>
      </view>
    </view>

    <view class="cu-timeline">
      <view class="cu-time">19-08-25</view>
      <view class="cu-item text-olive">
        <view class="bg-olive content"> Release base version </view>
      </view>
    </view>
    <view class="cu-timeline">
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-olive">1.0.3</view>
          </view>
          <view class="margin-top">1.新增热更新功能</view>
          <view class="margin-top">2.完善购物车勾选与滑动删除功能</view>
          <view class="margin-top">3.完善实时搜索功能</view>
          <view class="margin-top">4.同样修复了其他N多BUG</view>
        </view>
      </view>
    </view>

    <view class="cu-timeline">
      <view class="cu-time">19-08-15</view>
      <view class="cu-item text-green">
        <view class="bg-green content"> Release base version </view>
      </view>
    </view>
    <view class="cu-timeline">
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-green">1.0.2</view>
          </view>
          <view class="margin-top">1.支持H5，APP，小程序</view>
          <view class="margin-top">2.修复了N多BUG</view>
        </view>
      </view>
    </view>

    <view class="cu-timeline">
      <view class="cu-time">19-06-02</view>
      <view class="cu-item text-blue">
        <view class="bg-cyan content"> Release base version </view>
      </view>
    </view>
    <view class="cu-timeline">
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-cyan">1.0.1</view>
          </view>
          <view class="margin-top">1.标准购物车商城开发版</view>
        </view>
      </view>
    </view>

    <view class="cu-timeline">
      <view class="cu-time">18-02-17</view>
      <view class="cu-item text-blue">
        <view class="bg-blue content">
          大吉大利，框架选型，兼容多端，永不受苦
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
@import "./style";
</style>
