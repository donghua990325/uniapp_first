<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">配送方式</block>
    </cu-custom>
    <div class="container">
      <div class="pay-list">
        <div class="h">请选择配送方式</div>
        <div class="b">
          <div
            @click="tagVal(index, item.delivery_id, isShow, item.type)"
            :data-index="index"
            v-for="(item, index) in dt"
            :key="index"
          >
            <div class="item">
				<div
				  :class="[index === dtchecked ? 'checked checkbox' : 'checkbox']"
				></div>
				<div class="name" v-if="item.delivery_name">
				  {{ item.delivery_name }}
				  <span v-if="item.delivery_id == d_id && dtype != true">
				    ----({{ delivery_name }})</span
				  >
				  <span v-if="dtype == true"
				    ><span v-if="item.type == '1'">
				      ----({{ delivery_name }})</span
				    ></span
				  >
				</div>
			</div>
			<div>12346</div>
          </div>
        </div>
      </div>
      <div class="pay-btn" @click="startOrder">确定</div>
    </div>
	
	<!--  -->
    <view
      class="cu-modal"
      :class="modalName == 'RadioModal' ? 'show' : ''"
      
    >
	<!-- @tap="hideModal" -->
      <view class="cu-dialog" @tap.stop="">
        <radio-group class="block" @change="RadioChange">
          <view class="cu-list menu text-left">
            <view
              class="cu-item"
              v-for="(item, index) in list"
              :key="index"
              @click="name(item.delivery_name)"
            >
              <label
                class="flex justify-between align-center flex-sub"
                @click="
                  clickId(
                    item.delivery_id,
                    item.type,
                    item.k_status,
                    item.delivery_name,
                    item.parent_id,
                    item.type
                  )
                "
              >
                <view class="flex-sub">{{ item.delivery_name }}</view>
                <radio
                  class="round"
                  :class="radio == 'radio' + index ? 'checked' : ''"
                  :checked="radio == 'radio' + index ? true : false"
                  :value="item.delivery_name"
                ></radio>
				<!-- :value="'radio' + index" -->
              </label>
            </view>
          </view>
        </radio-group>
      </view>
    </view>
  </view>
</template>

<script>
import {
  shippingListApi,
  shippingListBottomApi,
  shippingListTopApi,
} from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();

    this.addressId = uni.getStorageSync("addressId");
	console.log(this.addressId)
    this.goods_status = uni.getStorageSync("goods_status");
    this.getDeliverylist();
  },
  data() {
    return {
      addressId: "",
      dtchecked: 0,
      dt: [],
      modalName: null,
      dtype: false,
      radio: "",
      shipping: [],
      list: [],
      delivery_name: " ",
      d_id: " ",
      type: 0,
      isShow: true,
    };
  },
  async mounted() {},
  methods: {
    clickId(id, type, k_status, name, parent_id, dtype) {
      uni.setStorageSync("shipping_id", id);
      uni.setStorageSync("p_type", type);
      if (type == undefined) {
        uni.setStorageSync("p_type", true);
      }
      uni.setStorageSync("k_status", k_status);
      this.delivery_name = name;
      this.d_id = parent_id;
      this.modalName = " ";
      this.dtype = false;
      if (dtype == undefined) {
        this.dtype = true;
      }
    },
    onLoad(options) {
      this.ral = options.ral;
      this.superpack = options.superpack;
    },
    // 点击确定
    async startOrder() {
      //存配送方式相关信息 purchase[shipping]
      if (uni.getStorageSync("shipping") === "") {
        uni.setStorageSync("shipping_id", this.list[0].delivery_id);
      }
      // uni.setStorageSync("p_type", '1');
      uni.setStorageSync("k_status", "");
      this.shipping = {
        id: this.dt[this.dtchecked].shipping_id,
        dt_name: this.dt[this.dtchecked].shipping_name,
        has_cod: this.dt[this.dtchecked].support_cod,
        is_protect: "N",
      };
      uni.setStorageSync("shipping", this.shipping);
      if (this.p_status == false) {
        uni.showToast({
          title: "该配送方式没有配送地点，请选择其他配送方式", //提示的内容,
          duration: 2000, //延迟时间,
          icon: "none",
          mask: true, //显示透明蒙层，防止触摸穿透,
        });
        return false;
      }
      if (this.goods_status == false) {
        if (this.type == "1") {
          uni.showToast({
            title: "订单中存在，不允许快递配送的商品，请选择其他配送方式", //提示的内容,
            duration: 2000, //延迟时间,
            icon: "none",
            mask: true, //显示透明蒙层，防止触摸穿透,
          });
          return false;
        }
      }
      if (this.delivery_name == " ") {
        uni.showToast({
          title: "请选择配送地点", //提示的内容,
          duration: 2000, //延迟时间,
          icon: "none",
          mask: true, //显示透明蒙层，防止触摸穿透,
        });
        return false;
      }
      uni.setStorageSync("delivery_name", this.delivery_name);
      if (this.ral) {
        uni.navigateBack({ url: "/apiCart/order/main?ral=true" });
      } else if (this.superpack) {
        uni.navigateBack({ url: "/apiCart/order/main?super=true" });
      } else {
        uni.navigateBack({ url: "/apiCart/order/main" });
      }

      // uni.setStorageSync("delivery_name", this.delivery_name);
    },
    showModal(e) {
      this.modalName = e;
    },
    // hideModal(e) {
    //   this.modalName = "RadioModal";
    // },
    RadioChange(e) {
      this.radio = e.detail.value;
    },
    name(delivery_name) {
      this.delivery_name = delivery_name;
    },
    async tagVal(iIndex, delivery_id, isShow = true, type) {
		console.log(iIndex, delivery_id, isShow, type)
      const isMe = this.dtchecked == iIndex;
      this.dtchecked = iIndex;

      const data = await shippingListBottomApi({
        delivery_name: this.delivery_name,
        delivery_id: delivery_id, //一级菜单的id
      });
      this.type = type;
      uni.setStorageSync("delivery_id", delivery_id);
      this.list = data.data;
      if (this.type == "0") {
        if (isShow) {
          this.modalName = "RadioModal";
        }
        if (!isMe) {
          if (this.list) {
            uni.setStorageSync("p_type", this.list[0].type);
            uni.setStorageSync("k_status", this.list[0].k_status);
            this.p_status = "true";
          } else {
            this.modalName = null;
            this.p_status = false;
          }
        } else {
          if (this.list == false) {
            this.modalName = null;
            this.p_status = false;
          }
        }

        uni.setStorageSync("shipping_type", "b");
      }
      if (this.type == undefined) {
        if (this.delivery_name == " ") {
          this.delivery_name = this.list[0].delivery_name;
          this.d_id = this.list[0].parent_id;
          this.radio = "radio0";
        }
      }
      if (this.type == "1") {
        const data = await shippingListTopApi({
          address_id: this.addressId,
        });
        this.modalName = "RadioModal";
        this.list = data.data.info;
        if (this.list.length === 0) {
          this.modalName = "";
          uni.showToast({
            title: "该配送方式没有下级请选择别的方式配送",
            icon: "none",
            duration: 1500,
          });
          return false;
        }
        this.delivery_name = this.list[0].delivery_name;
        this.d_id = this.list[0].delivery_id;
        this.p_status = "true";
        this.dtype = true;
        this.radio = "radio0";
        uni.setStorageSync("shipping_type", "a");
      }
    },
	
	
	
    async getDeliverylist() {
      const data = await shippingListApi({
        address_id: this.addressId,
      });
      if (data) {
        this.dt = data.data.info;
		console.log(111,this.dt)
        this.type = data.data.info[0]["type"];
      }
      this.tagVal(0, this.dt[0].delivery_id, true,'1');

      if (uni.getStorageSync("shipping")) {
        this.shipping = uni.getStorageSync("shipping");
        Object.values(this.dt).forEach((value, index) => {});
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>