<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">物流跟踪</block>
    </cu-custom>
    <div class="total-wrap">
      <div class="logistics-title">物流跟踪</div>
      <block v-for="(item, index) in tracesData" :key="index">
        <trackNode
          :is-first="index === tracesData.length - 1"
          :is-newest="index === 0"
          :is-main-node="item.isMainNode"
          :node-data="item"
        ></trackNode>
      </block>
    </div>
  </view>
</template>

<script>
import trackNode from "@/components/etherealwheat-track/trackNode.vue";
import { toLogin } from "@/server/api.js";
import { LogisticsInfoApi } from "@/server/config.js";
export default {
  components: {
    trackNode,
  },
  data() {
    return {
      // tracesData: [
      //   {
      //     acceptStation: "包裹已被吴亦发同学签收", // 节点描述
      //     createTime: "2019-10-24 15: 27: 16",
      //     status: "COMPLETE", // 节点状态
      //     phone: "", // 电话
      //     statusName: "已签收", // 节点标题
      //     isMainNode: true // 是否主节点，主节点前方展示icon
      //   },
      //   {
      //     acceptStation: "由派送员蔡小坤同志配送，电话：",
      //     createTime: "2019-10-24 15: 26: 41",
      //     status: "DELIVERING",
      //     phone: "16677778888",
      //     statusName: "运输中",
      //     isMainNode: true
      //   },
      //   {
      //     acceptStation: "已到XXX小区快递点",
      //     createTime: "2019-10-24 15: 26: 41",
      //     status: "DELIVERING",
      //     phone: "",
      //     statusName: "运输中",
      //     isMainNode: false
      //   },
      //   {
      //     acceptStation: "已到海宁集散中心",
      //     createTime: "2019-10-24 15: 26: 18",
      //     status: "DELIVERING",
      //     phone: "",
      //     statusName: "运输中",
      //     isMainNode: false
      //   },
      //   {
      //     acceptStation: "已到杭州集散中心",
      //     createTime: "2019-10-24 15: 26: 07",
      //     status: "DELIVERING",
      //     phone: "",
      //     statusName: "运输中",
      //     isMainNode: false
      //   },
      //   {
      //     acceptStation: "包裹已到达余杭区集散中心",
      //     createTime: "2019-10-24 15: 25: 54",
      //     status: "DELIVERING",
      //     phone: "",
      //     statusName: "运输中",
      //     isMainNode: false
      //   },
      //   {
      //     acceptStation: "快递员已上门取件",
      //     createTime: "2019-10-24 15: 25: 17",
      //     status: "DELIVERING",
      //     phone: "",
      //     statusName: "已揽收",
      //     isMainNode: false
      //   },
      //   {
      //     acceptStation: "等待快递员上门揽件",
      //     createTime: "2019-10-24 15: 25: 00",
      //     status: "WATTING_DELIVER",
      //     phone: "",
      //     statusName: "已发货",
      //     isMainNode: true
      //   },
      //   {
      //     acceptStation: "您的包裹正在打包",
      //     createTime: "2019-10-24 15: 24: 00",
      //     status: "WATTING_DELIVER",
      //     phone: "",
      //     statusName: "待发货",
      //     isMainNode: false
      //   },
      //   {
      //     acceptStation: "订单支付成功，等待商家发货",
      //     createTime: "2019-10-24 15: 22: 30",
      //     status: "PAYED",
      //     statusName: "已支付",
      //     isMainNode: true
      //   },
      //   {
      //     acceptStation: "订单提交成功",
      //     createTime: "2019-10-24 15: 22: 00",
      //     status: "WATTING_PAY",
      //     statusName: "已下单",
      //     isMainNode: true
      //   }
      // ],
      tracesData: [],
      order_id: "",
    };
  },
  onLoad(options) {
    this.id = options.id;
  },
  onShow() {
    toLogin();
    this.order_id = this.id;
    this.logisticsInfo();
  },
  methods: {
    async logisticsInfo() {
      const data = await LogisticsInfoApi({ order_id: this.order_id });
      if (data.data.status == false) {
        uni.showToast({
          title: data.data.msg,
          duration: 2000, //延迟时间,
          icon: "none",
          mask: true, //显示透明蒙层，防止触摸穿透,
        });
      } else {
        this.tracesData = data.data.response;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./style";
</style>
