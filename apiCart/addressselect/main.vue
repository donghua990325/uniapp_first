<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">地址管理</block>
    </cu-custom>
    <div class="address">
      <scroll-view :scroll-y="scrollflag" class="addcont" style="height: 100%">
        <div v-if="listData.length != 0" class="item">
          <div
            class="list"
            @touchstart="startMove"
            :data-index="index"
            @touchmove="deleteGoods"
            @touchend="endMove"
            v-for="(item, index) in listData"
            :key="index"
            @click="goConfirm(item)"
          >
            <div class="addresslist" :style="item.textStyle">
              <div>
                <span>{{ item.name }}</span>
                <div v-if="item.is_default" class="moren">默认</div>
              </div>
              <div class="info" @click="selAddress(item.address_id)">
                <p>{{ item.consignee }}&nbsp;&nbsp;{{ item.mobile }}</p>
                <p>{{ item.address_list }}&nbsp;&nbsp;{{ item.address }}</p>
              </div>
              <div
                @click="toDetail(item.address_id, item.mobile_addr_id_list)"
              ></div>
            </div>
            <div
              @click="delAddress(item.address_id)"
              class="delete"
              :style="item.textStyle1"
            >
              <div>删除</div>
            </div>
          </div>
        </div>

        <div v-else class="center">
          <p>收货地址在哪里?</p>
        </div>
      </scroll-view>

      <div class="bottom">
        <div @click="wxaddress(1)">+新建地址</div>
        <!--  #ifdef  MP-WEIXIN -->
        <div @click="wxaddress">一键导入微信地址</div>
        <!--  #endif -->
      </div>
    </div>
  </view>
</template>

<script>
import { addressGetListApi, addressDeleteApi } from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();

    uni.removeStorage({
      key: "addressId",
    });

    this.getAddressList();
  },
  created() {},
  data() {
    return {
      scrollflag: true,
      nowIndex: 0,
      imgUrl: "",
      listData: [],
      tranX: 0,
      tranX1: 0,
      startX: "",
      startY: "",
      moveX: "",
      moveY: "",
      moveEndX: "",
      moveEndY: "",
      X: 0,
      Y: "",
      flag: false,
    };
  },
  components: {},
  onBackPress() {},
  methods: {
    selAddress(id) {
      uni.setStorageSync("addressId", id);
      uni.navigateBack({
        delta: 1, //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },
    initTextStyle() {
      //滑动之前先初始化数据
      for (let i = 0; i < this.listData.length; i++) {
        this.listData[i].textStyle = "";
        this.listData[i].textStyle1 = "";
      }
    },
    startMove(e) {
      this.initTextStyle();
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
    },
    async delAddress(id) {
      let _this = this;
      uni.showModal({
        title: "",
        content: "是否要删除该收货地址",
        success: function (res) {
          console.log("delete");
          if (res.confirm) {
            _this.addressDeleteApi(id);
          } else if (res.cancel) {
            console.log("用户点击取消");
            //滑动之前先初始化样式数据
            _this.initTextStyle();
          }
        },
      });
    },
    onLoad(options) {
      this.type = options.type;
    },
    goConfirm(e) {
      let type = this.type;
      uni.setStorageSync("addressId", e.address_id);
      if (type == "buy") {
        uni.navigateBack({
          url: "/apiCart/order/main",
        });
      }
    },
    deleteGoods(e) {
      //滑动之前先初始化样式数据
      this.initTextStyle();
      let index = e.currentTarget.dataset.index;
      console.log(this.X);
      if (this.X <= -100) {
        this.flag = true;
      }
      if (!this.flag) {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;
        this.listData[
          index
        ].textStyle = `transform:translateX(${this.tranX}rpx);`;
        if (this.X >= 100) {
          this.X = 0;
        }
        this.tranX = this.X;
        if (this.X <= -100) {
          this.X = -100;
        }
        this.tranX1 = this.X;
        this.listData[
          index
        ].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      } else {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;

        this.tranX = this.X - 100;
        this.listData[
          index
        ].textStyle = `transform:translateX(${this.tranX}rpx);`;

        if (this.X + -100 > -100) {
          this.flag = false;
        }
        this.tranX1 = -100;
        this.listData[index].textStyle1 = `transform:translateX(-100rpx);`;
      }
    },
    endMove(e) {
      let index = e.currentTarget.dataset.index;
      if (this.X > -50) {
        this.tranX1 = 0;
        this.tranX = 0;
        this.listData[
          index
        ].textStyle = `transform:translateX(${this.tranX}rpx);`;
        this.listData[
          index
        ].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      } else if (this.X <= -50) {
        this.tranX1 = -100;
        this.tranX = -100;
        this.listData[
          index
        ].textStyle = `transform:translateX(${this.tranX}rpx);`;
        this.listData[
          index
        ].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      }
    },
    toDetail(id, mobile_addr_id_list) {
      uni.navigateTo({
        url:
          "/apiCart/addaddress/main?id=" +
          id +
          "&mobile_addr_id_list=" +
          mobile_addr_id_list,
      });
    },
    async addressDeleteApi(id) {
      const data = await addressDeleteApi({
        id: id,
      }).then(() => {
        this.getAddressList();
      });
    },
    async getAddressList() {
      let _this = this;
      const data = await addressGetListApi({});
      for (let i = 0; i < data.data.info.length; i++) {
        data.data.info[i].textStyle = "";
        data.data.info[i].textStyle1 = "";
      }
      this.listData = data.data.info;
    },
    wxaddress(index) {
      if (index == 1) {
        uni.navigateTo({
          url: "/apiCart/addaddress/main",
        });
      } else {
        uni.chooseAddress({
          success: function (res) {
            let wxres = encodeURIComponent(JSON.stringify(res));
            uni.navigateTo({
              url: "/apiCart/addaddress/main?res=" + wxres,
            });
          },
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
