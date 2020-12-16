<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">订单发票</block>
    </cu-custom>
    <div class="container">
      <div class="pay-list">
        <div class="h">请填写发票信息</div>
        <div class="b">
          <div class="item" @click="tagVal('n')">
            <div
              :class="[index === 'n' ? 'checked checkbox' : 'checkbox']"
            ></div>
            <div class="name">不开票</div>
          </div>
          <div
            v-for="(item, tindex) in tax"
            :key="tindex"
            class="item"
            @click="tagVal(tindex)"
          >
            <!-- 后台配置共有3个设置项 -->
            <div
              v-if="tindex == 1"
              :class="[index == 1 ? 'checked checkbox' : 'checkbox']"
            ></div>
            <div
              v-if="tindex == 2"
              :class="[index == 2 ? 'checked checkbox' : 'checkbox']"
            ></div>
            <div class="name">{{ item[0] }} 税率:{{ item[1] }}%</div>
          </div>
        </div>
        <div class="item-info" v-if="index == '1'">
          <ul>
            <li>
              <div class="t user-info">
                <input type="text" v-model="title" placeholder="开票抬头" />
              </div>
            </li>
          </ul>
        </div>
        <div class="item-info" v-if="index == '2'">
          <ul>
            <li>
              <div class="t user-info">
                <input type="text" v-model="title" placeholder="开票抬头" />
              </div>
            </li>
            <li>
              <div class="t user-info">
                <input
                  type="text"
                  v-model="tax_num"
                  placeholder="纳税人识别号"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="pay-btn" @click="startOrder">确定</div>
    </div>
  </view>
</template>

<script>
import { taxListApi } from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    this.getTaxlist();
    if (uni.getStorageSync("tax_type")) {
      this.index = uni.getStorageSync("tax_type");
    }
    if (uni.getStorageSync("tax_name")) {
      this.title = uni.getStorageSync("tax_name");
    }
	if (uni.getStorageSync("tax_num")) {
	  this.tax_num = uni.getStorageSync("tax_num");
	}
    if (uni.getStorageSync("taxNo")) {
      this.taxNo = uni.getStorageSync("taxNo");
    }
    if (uni.getStorageSync("tax_bank")) {
      this.tax_bank = uni.getStorageSync("tax_bank");
    }
    if (uni.getStorageSync("bank_account")) {
      this.bank_account = uni.getStorageSync("bank_account");
    }
    if (uni.getStorageSync("tax_addr")) {
      this.tax_addr = uni.getStorageSync("tax_addr");
    }
  },
  data() {
    return {
      tax: [],
      addressId: "",
      dtchecked: 0,
      dt: [],
      index: "false",
      title: "",
      taxNo: "",
      rate: "", // 税率
      tax_bank: "",
      bank_account: "",
      tax_addr: "",
      shipping: [],
      tax_num: "", //
    };
  },
  async onLoad() {},
  methods: {
    async getTaxlist() {
      const data = await taxListApi({});
      console.log(data);
      if (data) {
        this.tax = data.data;
      }

      // if (uni.getStorageSync("shipping")) {
      //     this.shipping = uni.getStorageSync("shipping");
      //     Object.values(this.dt).forEach((value, index) => {

      //         if (value.shipping_id == this.shipping.id) {
      //             this.tagVal(index)
      //         }
      //     })
      // }
    },
    // 点击确定
    async startOrder() {
      uni.setStorageSync("tax_type", this.index); // 记录类型
      if (this.index == "1") {
        if (this.title === "") {
          uni.showToast({
            title: "请填写发票抬头", //提示的内容,
            duration: 2000, //延迟时间,
            icon: "none",
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: (res) => {},
          });
          return false;
        }
        uni.setStorageSync("tax_type_name", this.tax[1][0]); // 记录发票类型名字
        uni.setStorageSync("tax_name", this.title); // 发票抬头
      }
      if (this.index == "2") {
        if (this.title === "") {
          uni.showToast({
            title: "请填写发票抬头", //提示的内容,
            duration: 2000, //延迟时间,
            icon: "none",
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: (res) => {},
          });
          return false;
        }
        if (this.num === "") {
          uni.showToast({
            icon: "none",
            title: "请填写纳税人识别号",
          });
          return false;
        }
        uni.setStorageSync("tax_type_name", this.tax[2][0]); // 记录发票类型名字
        uni.setStorageSync("tax_name", this.title); // 发票抬头
        uni.setStorageSync("tax_num", this.tax_num); // 记录纳税人识别号
      }
      if (this.index == "3") {
        if (this.title === "") {
          uni.showToast({
            title: "请填写发票抬头", //提示的内容,
            duration: 2000, //延迟时间,
            icon: "none",
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: (res) => {},
          });
          return false;
        }
        uni.setStorageSync("tax_type_name", this.tax[3][0]); // 记录发票类型名字
        uni.setStorageSync("tax_name", this.title); // 发票抬头
      }
      if (this.index === "n") {
        uni.setStorageSync("tax_type_name", "不开票");
      }
      uni.navigateBack({
        url: "/apiCart/order/main",
      });
    },
    async tagVal(iIndex) {
      this.index = iIndex;
      console.info(typeof this.index);
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>