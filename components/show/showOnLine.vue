<template>
  <div class="show">
    <div class="show-time">
      <navigator :url="list.entry">
        <img
          class="top-room"
          :src="list.img"
          mode="widthFix"
          @click.stop="toRooms"
        />
      </navigator>
      <div class="toolbar">
        <navigator
          class="derect-room"
          v-for="(item, index) in list.rooms"
          :key="index"
          :url="item.url"
        >
          <img :src="item.img" mode="widthFix" />
        </navigator>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Object,
      default: {},
    },
  },
  methods: {
    toRooms() {
      uni.navigateTo({
        url: "/pages/live/main",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/* 直播 */
.show-time {
  padding: 0 20rpx;
  margin-top: 20rpx;

  .top-room {
    width: 710rpx;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    padding: 10rpx 0;

    .derect-room {
      height: auto;
      width: 32.8%;
      img {
        width: 100%;
      }
    }
  }
}
</style>