<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">订单确认</block>
    </cu-custom>
    <div class="order">
      <div @click="toAddressList" v-if="address.consignee" class="address">
        <div class="item">
          <div class="list">
            <div class="addresslist">
              <div>
                <p>{{ address.consignee }}</p>
                <div v-if="address.is_default == 'true'" class="moren">
                  默认
                </div>
              </div>
              <div class="info">
                <p>{{ address.mobile }}</p>
                <p>{{ address.address }}</p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div @click="toAdd" v-else class="seladdress">请选择收货地址</div>

      <div class="order-itme-box" @click="toOrderdelivery">
        <div class="order-item">
          <div class="l">
            <text class="name">配送方式</text>
            <text class="txt" v-if="delivery_name != ''">{{
              delivery_name
            }}</text>
            <text class="txt" v-else>选择配送方式</text>
          </div>
          <div class="r">
            <image
              src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/address_right.png"
            />
          </div>
        </div>
      </div>
      <!-- <div class="order-itme-box" @click="toOrderpackage">
        <div class="order-item">
          <div class="l">
            <text class="name">商品包装</text>
            <text class="txt" v-if="package">{{ package.pack_name }}</text>
            <text class="txt" v-else>商品包装</text>
          </div>
          <div class="r">
            <image
              src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/address_right.png"
            />
          </div>
        </div>
      </div> -->
      <div
        class="order-itme-box"
        @click="toOrderTiem"
        v-if="ral != 'true' && superpack != 'true' && k_status == 'true'"
      >
        <div class="order-item">
          <div class="l">
            <text class="name">送达时间</text>
            <text class="txt" v-if="delivery">{{
              delivery.o_time || " "
            }}</text>
            <text class="txt" v-else>送达时间</text>
          </div>
          <div class="r">
            <image
              src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/address_right.png"
            />
          </div>
        </div>
      </div>

      <div
        v-if="ral != 'true' && superpack != 'true'"
        class="order-itme-box"
        @click="toBonus"
      >
        <div class="order-item">
          <div class="l">
            <text class="name">使用红包</text>
            <text class="txt" v-if="bonusName">{{ bonusName }}</text>
          </div>
          <div class="r">
            <image
              src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/address_right.png"
            />
          </div>
        </div>
      </div>

      <div v-if="this.ral != 'true'" class="order-itme-box" @click="toTax">
        <div class="order-item">
          <div class="l">
            <text class="name">发票</text>
            <text class="txt" v-if="tax_type != 'n'">{{ tax_type_name }}</text>
            <text class="txt" v-else>不开票</text>
          </div>
        </div>
      </div>

      <div v-if="this.ral != 'true' && result_spike != 'true'" class="orderbox">
        <div class="item">
          <div>
            使用积分
            <span style="margin-left: 2upx; font-size: 18upx"
              >(本订单最多可使用{{ max_integral }}积分)</span
            >
          </div>
          <div>
            <input
              type="text"
              style="
                border: 1upx solid #ccc;
                width: 120upx;
                height: 20upx;
                text-align: center;
                border-radius: 6rpx;
              "
              v-model="point"
            />
          </div>
        </div>
      </div>
      <div class="orderbox">
        <!-- <div v-if="ral =='true' && result_spike != 'true' && pintuan != 'true'" class="item">
        <div>商品合计</div>
        <div>￥{{costItem}}</div>
      </div> -->
      </div>
      <div class="orderbox">
        <div class="item" v-if="!ral">
          <div>商品合计</div>
          <div>￥{{ costItem }}</div>
        </div>
        <!-- <div class="item"  v-if="ral!='true'">
		    <div>商品合计"{{ral}}"</div>
		    <div>￥{{costItem}}</div>
		  </div> -->
        <!-- <div class="item">
          <div>包装费</div>
          <div>+￥{{ package.pack_fee || "0" }}</div>
        </div> -->
        <div class="item" v-if="type_money != 0">
          <div>红包抵扣</div>
          <div>-￥{{ type_money || "0" }}</div>
        </div>
        <div class="item">
          <div>运费</div>
          <div>+￥{{ money | priceFormat(2) }}</div>
        </div>
        <div v-if="tax_type != 'n'" class="item">
          <div>税费</div>
          <div>+￥{{ tax }}</div>
        </div>
        <div class="item" v-if="pmtOrder !== 0">
          <div>订单促销</div>
          <div>-￥{{ pmtOrder }}</div>
        </div>
        <div class="item" v-if="pmtAmount !== 0">
          <div>商品促销</div>
          <div>-￥{{ pmtAmount - pmtOrder }}</div>
        </div>
        <div class="item" v-if="end_status == 'succ'">
          <div>截单时间：{{ end_time }}，{{ prompt }}</div>
          <div></div>
          <div>
            <view class="action">
              <switch
                class="sm"
                @change="SetSize"
                :class="size ? 'checked' : ''"
              ></switch>
            </view>
          </div>
        </div>
        <div class="item" v-if="discount != 0">
          <div>优惠活动</div>
          <div>-￥{{ discount }}</div>
        </div>
      </div>
      <div class="cartlist">
        <div class="item" v-for="(item, index) in listData" :key="index">
          <div class="con">
            <div class="left">
              <div class="img">
                <img :src="item.goods_thumb" alt />
              </div>
              <div class="info">
                <p>{{ item.goods_name }}</p>
                <p class="small">{{ item.sku_str }}</p>
                <p
                  v-if="
                    ral != 'true' &&
                    superpack != 'true' &&
                    result_spike != 'true'
                  "
                >
                  ￥{{ item.goods_price }}
                </p>
                <p v-if="ral == 'true'">{{ item.exchange_integral }}积分</p>
                <p v-if="superpack == 'true' && result_spike == 'false'">
                  ￥{{ item.package_price }}
                </p>
                <p v-if="result_spike == 'true'">￥{{ item.package_price }}</p>
              </div>
            </div>
            <div class="right">
              <div
                v-if="superpack != 'true' && result_spike != 'true' && ral != 'true'"
                class="num"
              >
                x{{ item.goods_number }}
              </div>
              <div v-if="superpack == 'true'" class="num">x1</div>
              <div v-if="result_spike == 'true'" class="num">x1</div>
            </div>
          </div>
        </div>
        <div class="total">
          <div class="title">给卖家留言</div>
        </div>
        <textarea
          type="text"
          v-if="textarea"
          placeholder="给卖家留言"
          v-model="msg"
        ></textarea>
      </div>

      <div class="bottom">
        <div>实付 : ￥{{ finalAmount | priceFormat(2) }}</div>
        <div @click="pay">确认订单</div>
      </div>
    </div>
	<view
	  class="cu-modal"
	  :class="modalName == 'RadioModal' ? 'show' : ''"
	  @tap="hideModal"
	>
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
  orderDetailListApi,
  addaddressDetailActionApi,
  orderDefaultAddressApi,
  orderSaveCartApi,
  checkPointApi,
  getOrderEndApi,
  getDiscountApi,
  shippingListBottomApi,
  shippingListTopApi,
  shippingListApi,
} from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onLoad(options) {
    this.ral = options.ral;
    this.super = options.super;
    this.pintuan = options.pintuan;
    this.spike = options.spike;
    this.goods_id = options.goods_id;
  },
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();

    //获取地址
    if (uni.getStorageSync("addressId")) {
      this.addressId = uni.getStorageSync("addressId");
    }
	//获取地址名字
	// if (uni.getStorageSync("consignee")) {
	//   this.consignee = uni.getStorageSync("consignee");
	//   console.log(this.consignee)
	// }
	
    //获取快递方式
    if (uni.getStorageSync("shipping")) {
      this.shipping = uni.getStorageSync("shipping");
    }
    //包装信息
    if (uni.getStorageSync("package")) {
      this.package = uni.getStorageSync("package");
    } else {
      this.package.pack_fee = 0;
    }
    //配送时间
    if (uni.getStorageSync("delivery")) {
      this.delivery = uni.getStorageSync("delivery");
    }
    if (uni.getStorageSync("shipping_id")) {
      this.shipping_id = uni.getStorageSync("shipping_id");
	  console.log(this.shipping_id)
      this.shipping_type = uni.getStorageSync("shipping_type");
    }

    // 获取发票类型名
    if (uni.getStorageSync("tax_type_name")) {
      this.tax_type = uni.getStorageSync("tax_type");
      this.tax_type_name = uni.getStorageSync("tax_type_name");
      this.tax_title = uni.getStorageSync("tax_name");
      this.tax_num = uni.getStorageSync("tax_num");
    }
    //获取商品id（立即购买）
    if (uni.getStorageSync("productId")) {
      this.productId = uni.getStorageSync("productId");
    }
    //获取商品数量（立即购买）
    if (uni.getStorageSync("number")) {
      this.number = uni.getStorageSync("number");
    }
    // 获取红包信息
    if (uni.getStorageSync("bonusName")) {
      this.bonusName = uni.getStorageSync("bonusName");
      this.bonus_id = uni.getStorageSync("bonus_id");
      this.type_money = uni.getStorageSync("bonusMoney");
    }
    // 获得当前用户的积分数
    if (uni.getStorageSync("point")) {
      this.user_point = uni.getStorageSync("point");
    }
    // 获取配送方式
    if (uni.getStorageSync("p_type")) {
      this.p_type = uni.getStorageSync("p_type");
    }
    if (uni.getStorageSync("k_status")) {
      this.k_status = uni.getStorageSync("k_status");
    }

    if (uni.getStorageSync("delivery_name")) {
      this.delivery_name = uni.getStorageSync("delivery_name");
    }
    if (uni.getStorageInfoSync("delivery_id")) {
    }
    //判断是否是积分对换
    this.ral = this.ral;
    //判断是否是超值礼包
    this.superpack = this.super;
    // 判断是否为拼团
    this.pintuan = this.pintuan;
    this.result_spike = this.spike;
    this.goods_id = this.goods_id;

    this.getDetail();
	// this.getAddress();
    this.getOrder_end();
  },
  onUnload() {
    //addressId
    uni.removeStorage({
      key: "addressId",
    }),
      //清除快递
      uni.removeStorage({
        key: "shipping",
      }),
      //包装信息
      uni.removeStorage({
        key: "package",
      }),
      uni.removeStorage({
        key: "p_type",
      }),
      uni.removeStorage({
        key: "k_status",
      }),
      uni.removeStorage({
        key: "integralGoodsid",
      }),
      uni.removeStorage({
        key: "delivery",
      }),
      uni.removeStorage({
        key: "goods_status",
      }),
      uni.removeStorage({
        key: "delivery_name",
      }),
      //清除productId（立即购买）
      uni.removeStorage({
        key: "productId",
      }),
      //清除number（立即购买）
      uni.removeStorage({
        key: "number",
      });
  },
  created() {},
  mounted() {},
  data() {
    return {
      addressId: "",//地址id
      costItem: "",
      finalAmount: "",
      totalAmount: "",
      pmtOrder: 0,
      pmtAmount: 0,
      point: 0,
      listData: [],
      address: {},
      shipping: [],
      package: [],
      delivery: [],
      productId: "",
      shipping_id: "",
      k_status: "",
      number: "",
      money: "",
      bonus: [],
      bonusName: "",
      bonus_id: "",
      pay_app_id: "",
      tax_type_name: "", // 发票类型 默认 不开票
      tax_type: "n",
      tax: 0,
      tax_title: "", // 发票抬头
      tax_num: "", // 纳税人识别号
      max_integral: 0, // 当前订单可使用的最大积分数
      user_point: 0, //当前用户的积分数
      discount: 0, //活动优惠
      size: false,
      end_status: "",
      end_time: "",
      prompt: "",
      delivery_name: "",
      type_money: 0, // 红包金额
      superpack: "false",
      result_spike: "false",
      goods_id: "",
      pintuan: "false",
      ral: false,
      textarea: true, //给商品留言
      msg: "", //留言内容
      jifennum: "",
	  consignee:'',//地址名字
	  modalName: null,//快递弹出框是否显示
	  radio: "",//快递商家的名字
	  list: [],
	  d_id: " ",
	  dtype: false,
	  dt: [],
	  dtchecked: 0,
	  // isShow: true,
    };
  },
  components: {},
  methods: {
    SetSize(e) {
      this.size = e.detail.value;
    },
    async pay() {
      if (this.addressId == undefined) {
        uni.showToast({
          icon: "none",
          title: "请选择收货地址",
        });
        return false;
      }
      if (this.shipping.length === 0) {
        let shippingData = "";

        uni.showToast({
          title: "请选择配送方式", //提示的内容,
          duration: 2000, //延迟时间,
          icon: "none",
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {},
        });

        return false;
      } else {
        let shippingData = JSON.stringify(this.shipping);
      }
      if (this.tax_type == "") {
        uni.showToast({
          title: "请选择是否开取发票", //提示的内容,
          duration: 2000, //延迟时间,
          icon: "none",
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {},
        });
        return false;
      }
      let zero_number = /^(0|[1-9][0-9]*)$/;
      if (!zero_number.test(this.point)) {
        uni.showToast({
          title: "积分只能为大于0的整数", //提示的内容,
          duration: 2000, //延迟时间,
          icon: "none",
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {
            setTimeout(function () {
              this.point = 0;
            }, 10);
          },
        });

        return false;
      }
      if (this.point > Number(this.user_point)) {
        uni.showToast({
          title: "用户积分不足", //提示的内容,
          duration: 2000, //延迟时间,
          icon: "none",
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {
            this.point = 0;
          },
        });
        return false;
      }
      if (this.point > this.max_integral) {
        uni.showToast({
          title: "请填写正确的积分数", //提示的内容,
          duration: 2000, //延迟时间,
          icon: "none",
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {},
        });
        return false;
      }
      if (this.end_status == "succ") {
        if (this.size == false) {
          uni.showToast({
            title: "请同意明天配送", //提示的内容,
            duration: 2000, //延迟时间,
            icon: "none",
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: (res) => {},
          });
          return false;
        }
      }
      this.pay_app_id = "wxpaywxapp";
      if (this.ral == undefined) {
        this.ral = false;
      }
      if (this.superpack == undefined) {
        this.superpack = false;
      }

      const data = await orderSaveCartApi({
        address_id: this.addressId,
        shipping_id: this.shipping_id,
        productId: this.productId,
        bonus_id: this.bonus_id,
        point: this.point,
        p_type: this.p_type,
        o_time: this.delivery.o_time, //配送时间
        inv_payee: this.tax_title, // 发票抬头
        tax: this.tax, // 税额
        tax_type: this.tax_type,
        tax_num: this.tax_num, // 纳税人识别号  公司的发票才使用
        ral: this.ral,
        superpack: this.superpack,
        superGoodsid: this.superGoodsid,
        integralGoodsid: this.integralGoodsid,
        pack_fee: this.package.pack_fee, //包装费用
        pack_name: this.package.pack_name, //包装名
        inv_type: this.tax_type_name, // 发票类型
        result_spike: this.result_spike,
        goods_id: this.goods_id,
        delivery_name: uni.getStorageSync("delivery_name"),
        delivery_id: uni.getStorageSync("delivery_id"),
        pintuan: this.pintuan,
        pintuanGoodsId: this.pintuanGoodsId,
        pintuanNumber: this.number,
        pintuanOrderId: this.pintuanOrderId,
        msg: this.msg,
        jifennum: uni.getStorageSync("jifennum"),
      });

      //订单号存在
      if (data.data.gen_order) {
        uni.setStorageSync("bonusName", "");
        uni.setStorageSync("bonus_id", "");
        uni.setStorageSync("orderId", data.data.info.order_id);
        uni.navigateTo({
          url: "/apiCart/pay/main?orderId=" + data.data.info.order_id,
        });
      } else {
        uni.showToast({
          title: data.data.info,
          icon: "none",
          duration: 2000,
        });
      }
    },
    toBonus() {
      uni.navigateTo({
        url: "/apiMember/coupon/main?order=y&money=" + this.costItem,
      });
    },
    toOrderpackage() {
      if (this.ral == "true") {
        uni.navigateTo({
          url: "/apiCart/orderpackage/main?ral=true",
        });
      } else if (this.superpack == "true") {
        uni.navigateTo({
          url: "/apiCart/orderpackage/main?superpack=true",
        });
      } else {
        uni.navigateTo({
          url: "/apiCart/orderpackage/main",
        });
      }
    },
    toOrderTiem() {
      if (this.ral == "true") {
        uni.navigateTo({
          url: "/apiCart/deliveryTime/main?ral=true",
        });
      } else if (this.superpack == "true") {
        uni.navigateTo({
          url: "/apiCart/deliveryTime/main?superpack=true",
        });
      } else {
        uni.navigateTo({
          url: "/apiCart/deliveryTime/main",
        });
      }
    },
    toAddressList() {
      uni.navigateTo({
        url: "/apiCart/addressselect/main",
      });
    },
    toAdd() {
      uni.navigateTo({
        url: "/apiCart/address/main?type=buy",
      });
    },
    toCoupon() {
      uni.navigateTo({
        url: "/apiMember/coupon/main",
      });
    },
  //   async getAddress() {
		// console.log(999,this.addressId)
  //     if (this.addressId) {
  //       const data = await addaddressDetailActionApi({
  //         id: this.addressId,
		//   consignee:this.consignee
  //       });
		// console.log(888,data)
  //       this.address = data;
  //     } else {
  //       const data = await orderDefaultAddressApi({});
		// console.log(777,data.dep)
  //       this.address = data;
  //       this.addressId = data.id;
  //       uni.setStorageSync("addressId", this.addressId);
		// console.log(666,this.address,this.addressId)
  //     }
  //   },
    toTax() {
      if (this.addressId == undefined) {
        uni.showToast({
          title: "没有选择收货地址",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      uni.navigateTo({
        url: "/apiCart/tax/main",
      });
    },
    toOrderdelivery() {
      if (this.addressId == undefined) {
        uni.showToast({
          title: "没有选择收货地址",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.ral == "true") {
        uni.navigateTo({
          url: "/apiCart/orderdelivery/main?ral=true",
        });
      } else if (this.superpack == "true") {
        uni.navigateTo({
          url: "/apiCart/orderdelivery/main?superpack=true",
        });
      } else {
        // uni.navigateTo({
        //   url: "/apiCart/orderdelivery/main",
        // });
		this.tagVal(0,'1',true,'1')
		// console.log(123)
		
      }
    },
	//显示都有哪些快递
	async tagVal(iIndex, delivery_id, isShow = true, type) {
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
	RadioChange(e) {//切换快递的值
	console.log(456456,e)
	  this.radio = e.detail.value;
	},
	name(delivery_name) {
		console.log(1111112346)
	  this.delivery_name = delivery_name;
	},
	//选择快递之后
	clickId(id, type, k_status, name, parent_id, dtype) {
		console.log(77777895555)
	  uni.setStorageSync("shipping_id", id);
	  uni.setStorageSync("p_type", type);
	  if (type == undefined) {
	    uni.setStorageSync("p_type", true);
	  }
	  uni.setStorageSync("k_status", k_status);
	  this.delivery_name = name;
	  console.log(789789,this.delivery_name)
	  this.d_id = parent_id;
	  this.modalName = " ";
	  this.dtype = false;
	  if (dtype == undefined) {
	    this.dtype = true;
	  }
		this.getDeliverylist()
	},
	async startOrder() {
	  //存配送方式相关信息 purchase[shipping]
	  if (uni.getStorageSync("shipping") === "") {
		  console.log(this.list[0].delivery_id,this.dt[0].shipping_id)
	    uni.setStorageSync("shipping_id", this.list[0].delivery_id);
	  }
	  // uni.setStorageSync("p_type", '1');
	  uni.setStorageSync("k_status", "");
	  this.shipping = {
	    id: this.dt[0].shipping_id,
	    dt_name: this.dt[0].shipping_name,
	    has_cod: this.dt[0].support_cod,
	    is_protect: "N",
	  };
	  console.log(this.shipping,'46546fdsfdsfsdfsf')
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
	},
	// -------------------
    async getDeliverylist() {
      const data = await shippingListApi({
        address_id: this.addressId,
      });
      if (data) {
        this.dt = data.data.info;
    	console.log(111,this.dt)
		this.startOrder()
        this.type = data.data.info[0]["type"];
      }
    
      if (uni.getStorageSync("shipping")) {
        this.shipping = uni.getStorageSync("shipping");
        Object.values(this.dt).forEach((value, index) => {});
      }
    },
	async getDetail() {
      if (this.shipping.length === 0) {
        let shippingData = "";
      } else {
        let shippingData = JSON.stringify(this.shipping);
      }
      if (this.shipping.id) {
        this.shipping_id = this.shipping.id;
      }
      if (this.tax_type === "n") {
        this.tax_type = "n"; // 不开票
      }

      if (this.ral == "true") {
        this.integralGoodsid = uni.getStorageSync("integralGoodsid");
      }
      if (this.superpack == "true") {
        this.superGoodsid = uni.getStorageSync("superGoodsid");
      }
      if (this.p_type == undefined) {
        this.p_type = "true";
      }
      if (this.pintuan == "true") {
        this.productId = uni.getStorageSync("pt_product_id");
        this.number = uni.getStorageSync("pt_num");
        this.pintuanGoodsId = uni.getStorageSync("pt_goods_id");
        this.pintuanOrderId = uni.getStorageSync("pt_order_id");
      }
      const data = await orderDetailListApi({
        address_id: this.addressId,
        productId: this.productId,
        number: this.number,
        shipping: this.shippingData,
        ral: this.ral,
        super: this.superpack,
        integralGoodsid: this.integralGoodsid,
        superGoodsid: this.superGoodsid,
        shipping_id: this.shipping_id,
        p_type: this.p_type,
        tax_type: this.tax_type,
        shipping_type: this.shipping_type,
        pintuan: this.pintuan,
        pintuanGoodsId: this.pintuanGoodsId,
        result_spike: this.result_spike,
        goods_id: this.goods_id,
        jifennum: uni.getStorageSync("jifennum"),
      });
		console.log(111,data);
      if (data.data.info === false) {
        // 从订单页面退回
        uni.switchTab({
          // 跳转到我的页面
          url: "/pages/my/main",
        });
      }
      if (data.data.cart_init == false) {
        uni.showToast({
          icon: "none",
          title: data.data.info,
          success: function () {
            setTimeout(function () {
              uni.switchTab({
                url: "/pages/my/main",
              });
            }, 1000);
          },
        });
        return false;
      }

      // if (uni.getStorageSync("orderId")) { // 从订单页面退回
      //     uni.switchTab({ // 跳转到我的页面
      //         url: "/pages/my/main"
      //     });
      //     uni.removeStorage({
      //         key: 'orderId',
      //     })
      // }
      if (this.ral != "true" && this.superpack != "true") {
        this.getDiscount();
      }
      if (data) {
        this.costItem = data.data.info.total.goods_amount;
        this.finalAmount = data.data.info.total.total_fee;

        this.totalAmount = data.data.info.total.total_fee;
        this.max_integral = data.data.info.total.integral;
        if (data.data.info.total.pmtOrder) {
          this.pmtOrder = data.pmtOrder;
        }
        if (data.data.info.total.pmtAmount) {
          this.pmtAmount = data.pmtAmount;
        }
        this.listData = data.data.info.goods_list;
        this.money = data.data.info.total.shipping_fee;
        uni.setStorageSync("goods_status", data.data.info.total.goods_status);
        this.tax = data.data.info.total.tax;
        this.address = data.data.info.address_list;
        this.addressId = data.data.info.address_list.address_id;
        this.finalAmount = this.finalAmount - this.type_money;
        uni.setStorageSync("addressId", data.data.info.address_list.address_id);
        if (this.package) {
          if (this.costItem < this.package.free_money) {
            this.finalAmount =
              Number(this.finalAmount) + Number(this.package.pack_fee);
          }
          if (this.superpack == "true") {
            this.costItem = data.data.info.total.goods_price;
            this.money = data.data.info.total.shipping_fee;
            this.finalAmount = this.finalAmount + Number(this.package.pack_fee);
          }
          if (this.ral == "true") {
            this.finalAmount =
              this.finalAmount -
              this.discount -
              data.data.info.total.goods_price +
              Number(this.package.pack_fee);
          }
        }
      }
    },
    async getDiscount() {
      if (this.pintuan == "true") {
        this.goods_id = this.pintuanGoodsId;
      }
      const data = await getDiscountApi({
        product_id: this.productId,
        result_spike: this.result_spike,
        goods_id: this.goods_id,
      });
      if (data.data.discount) {
        this.discount = data.data.discount;
      }
      if (this.discount > 0) {
        this.finalAmount = this.finalAmount - this.discount;
      }
    },
    async getOrder_end() {
      const data = await getOrderEndApi({});
      if (data.data.status == "fail") {
        this.end_status = data.data.status;
      } else {
        this.end_status = data.data.status;
        this.end_time = data.data.response.end_time;
        this.prompt = data.data.response.prompt;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>+