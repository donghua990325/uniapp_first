<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">添加地址</block>
    </cu-custom>
    <view class="addaddress">
      <view class="cu-form-group">
        <view class="title">姓名</view>
        <input
          type="text"
          placeholder="姓名"
          v-model="userName"
          maxlength="20"
        />
      </view>
      <view class="cu-form-group">
        <view class="title">手机</view>
        <input
          type="text"
          placeholder="手机号码"
          v-model="telNumber"
          maxlength="11"
        />
      </view>
      <view class="cu-form-group" style="display: none">
        <view class="title">邮箱账号</view>
        <input type="text" placeholder="邮箱账号" v-model="email" />
      </view>
      <view class="cu-form-group">
        <view class="title">城市</view>
        <input
          @click="WebaddressChange"
          type="text"
          placeholder="省份、城市、区县"
          v-model="address"
          disabled="false"
          focus="false"
        />
        <w-picker
          mode="region"
          :defaultVal="defaultVal"
          @confirm="onConfirm"
          ref="region"
          themeColor="#f00"
        ></w-picker>
      </view>
      <view class="cu-form-group">
        <view class="title">地址</view>
        <input
          type="text"
          placeholder="详细地址，如楼道、楼盘号等"
          v-model="detailadress"
        />
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">设置为默认地址</view>
        <switch
          @change="checkboxChange"
          :class="checked ? 'checked' : ''"
          :checked="checked ? true : false"
        ></switch>
      </view>
      <view class="cu-form-group">
        <view class="title">使用地理位置</view>
        <button class="cu-btn bg-green shadow" @click="GetAddress">
          附近位置
        </button>
      </view>
      <view @click="saveAddress" class="bottom">保存</view>
    </view>
  </view>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue";
import {
  addaddressDetailActionApi,
  GetRealyAddressApi,
  addressDetailApi,
} from "../../server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
  },
  created() {},
  mounted() {
    if (this.$root.$mp.query.res) {
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res));
      console.log(this.res);
      this.userName = this.res.userName;
      this.telNumber = this.res.telNumber;
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`;
      this.detailadress = this.res.detailInfo;
    }

    if (this.$root.$mp.query.id) {
      this.id = this.$root.$mp.query.id;
    }
    this.getDetail();
  },
  data() {
    return {
      region: [],
      customItem: "全部",
      id: "",
      res: {},
      userName: "",
      telNumber: "",
      email: "",
      address: "",
      detailadress: "",
      add_id_list: "",
      defaultVal: [10, 0, 5],
      checked: true,
    };
  },
  components: {
    wPicker,
  },
  methods: {
    onConfirm(val) {
      this.address =
        val.checkArr[0] + " " + val.checkArr[1] + " " + val.checkArr[2];
      this.address_id_list = val.checkKey;
    },
    watch() {},
    async WebaddressChange() {
      this.$refs["region"].show();
    },
    async getDetail() {
      if (
        this.$mp.query.mobile_addr_id_list != "" &&
        this.$mp.query.mobile_addr_id_list
      ) {
        let mobile_tmp = this.$mp.query.mobile_addr_id_list.split(",");
        let tmp = [];
        mobile_tmp.forEach((item) => {
          tmp.push(parseInt(item));
        });
        this.defaultVal = tmp;
      }
      if (this.$mp.query.id != "" && this.$mp.query.id) {
        const data = await addressDetailApi({
          address_id: this.$mp.query.id,
        });
        if (data.data.is_detail === false) {
          uni.showToast({
            title: "无此地址",
            icon: "none",
            duration: 1000,
          });
          setTimeout(() => {
            uni.redirectTo({
              url: "/apiCart/addressselect/main",
            });
          }, 1000);
        }
        let detail = data.data.data;
        this.userName = detail.consignee;
        this.telNumber = detail.mobile;
        this.email = detail.email;
        this.address =
          detail.province_name +
          " " +
          detail.city_name +
          " " +
          detail.district_name;
        this.detailadress = detail.address;
        if (detail.mobile_addr_id_list !== "") {
          this.address_id_list = "";
          this.add_id_list = detail.mobile_addr_id_list;
        }
        this.checked = detail.is_default == "true" ? true : false;
      }
    },
    checkboxChange(e) {
      this.checked = e.mp.detail.value;
    },
    async saveAddress() {
      let _this = this;
      let yz_email = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      let yz_mobile = /0?(13|14|15|16|17|18|19)[0-9]{9}/;
      let yz_name = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

      if (yz_name.test(_this.userName) === false) {
        uni.showToast({
          icon: "none",
          duration: 1000,
          title: "姓名格式错误",
        });
        return false;
      }

      if (yz_mobile.test(_this.telNumber) === false) {
        uni.showToast({
          icon: "none",
          duration: 1000,
          title: "手机号格式错误",
        });
        return false;
      }

      // if (yz_email.test(_this.email) === false) {
      //   uni.showToast({
      //     icon: "none",
      //     duration: 1000,
      //     title: "邮箱格式错误"
      //   });
      //   return false;
      // }

      if (_this.detailadress == "") {
        uni.showToast({
          title: "地址不能为空",
          icon: "none", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {},
        });
        return false;
      }

      if (_this.detailadress.length > 32) {
        uni.showToast({
          title: "地址输入有误，不能超过32个字符",
          icon: "none", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {},
        });
        return false;
      }

      let address_string = _this.address.split(" ");

      if (this.address_id_list != "" && this.address_id_list) {
        this.add_id_list = Object.values(this.address_id_list).join(",");
      } else {
        // 防止选择地址之后没有滑动
        this.add_id_list = "10,0,5";
      }

      const data = await addaddressDetailActionApi({
        consignee: _this.userName,
        email: _this.email,
        mobile: _this.telNumber,
        address: _this.detailadress,
        mobile_addr_id_list: this.add_id_list,
        checked: _this.checked,
        address_id: _this.id,
        province: address_string[0],
        city: address_string[1],
        district: address_string[2],
      });

      if (data.data.is_add) {
        uni.showToast({
          title: "成功", //提示的内容,
          icon: "success", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {
            uni.redirectTo({
              url: "/apiCart/addressselect/main",
            });
          },
        });
      }
    },
    GetAddress() {
      let _this = this;
      uni.chooseLocation({
        success: function (res) {
          console.log("详细地址：" + res.address);
          let params = res.latitude + "," + res.longitude;

          const data = GetRealyAddressApi({
            params: params,
          });
          data.then(function (res) {
            console.log(
              res.result.address_component.province +
                res.result.address_component.city +
                res.result.address_component.district
            );

            _this.address = `${res.result.address_component.province} ${res.result.address_component.city} ${res.result.address_component.district}`;

            _this.detailadress = res.result.address_component.street_number;
          });
        },
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
