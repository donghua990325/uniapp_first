<template>
  <div class="show">
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">直播</block>
    </cu-custom>
    <div class="show-time">
      <div :url="item.url" v-for="(item, index) in livelist" :key="index">
        <img
          class="top-room"
          :src="item.cover_img"
          mode="widthFix"
          @click="goLiveRoom(item.wxa_room_id)"
        />
        直播间名字：{{ item.name }} -- 直播开始时间：{{
          item.start_time | timeFormat
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { getLiveSettingsApi } from "@/server/config.js";
import Jfooter from "@/components/footer/footer.vue";
export default {
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.total) {
      return false;
    }
    this.getListData();
  },
  created() {},
  mounted() {
    this.getListData(true);
  },
  data() {
    return {
      livelist: [],
      page: 1,
      total: "",
      list: [], //直播
    };
  },
  components: {},
  methods: {
    async getListData(first) {
      const res = await getLiveSettingsApi({
        page: this.page,
      });
      var data = res.data;

      this.page = data.curr_page;
      this.total = data.total_page;

      if (data.status == "success") {
        if (first) {
          this.livelist = data.live_list;
        } else {
          this.livelist = this.livelist.concat(data.live_list);
        }
      }

      if (data.status == "fail") {
        uni.showToast({
          title: data.message,
          icon: "none",
        });
        return;
      }
    },
    goLiveRoom(id) {
      let roomId = id;
      // 此处后期做分销分享可用
      let customParams = encodeURIComponent(
        JSON.stringify({ path: "pages/index/index", pid: 1 })
      );

      //console.log(`plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=` + roomId)

      //`plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=` + roomId + `&custom_params=` + customParams
      uni.navigateTo({
        url:
          `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=` +
          roomId,
      });
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
@import "./style";
/* 直播 */
.show-time {
  padding: 0 20rpx;
  margin-top: 20rpx;

  .top-room {
    width: 710rpx;
    margin-bottom: 10rpx;
  }
}
</style>
