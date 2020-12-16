<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">{{ info.goods_name }}</block>
    </cu-custom>
    <div class="goods">
      <div class="swiper">
        <swiper
          class="swiper-container"
          indicator-dots="true"
          autoplay="true"
          interval="3000"
          duration="1000"
        >
          <block v-for="(item, index) in gallery" :key="index">
            <swiper-item class="swiper-item">
              <image :src="item" class="slide-image" />
            </swiper-item>
          </block>
        </swiper>
        <!-- 分享按钮（图片）  -->
        <!--  #ifdef  MP -->
        <button class="share" hover-class="none" open-type="share" value>
          <img :src="share_img" alt />
        </button>

        <!--  #endif -->
        <!--  #ifdef  APP-PLUS -->
        <button class="share" type="primary" @tap="shareInfo">
          <img :src="share_img" alt />
        </button>
        <!--  #endif -->
      </div>
      <div class="goods-info">
        <div class="c">
          <p>{{ info.goods_name }}</p>
          <p>{{ info.goods_brief }}</p>
          <p v-if="ral != 'true' && pintuan != '1'">￥{{ info.shop_price }}</p>
          <p v-if="pintuan == '1'">￥{{ info.pt_price }}</p>
          <p style="text-decoration: line-through">￥{{ info.market_price }}</p>
          <!-- <p>已售：{{info.sales_volume_count}}</p> -->
          <!-- 秒杀已经开始 -->
          <div class="activity-line" v-if="result_value == '1'">
            <div class="activity">
              <div class="title">秒杀中</div>
            </div>
            <div class="timer">
              <div class="text">距离秒杀结束</div>
              <uni-countdown
                color="#FFFFFF"
                background-color="#00B26A"
                border-color="#00B26A"
                :show-day="true"
                :day="end_day"
                :hour="end_hour"
                :minute="end_minute"
                :second="end_second"
                :sys_second="end_haomiao"
                @timeup="upstarbuy"
              >
              </uni-countdown>
            </div>
          </div>

          <!-- 未开始倒计时 -->
          <div class="activity-line" v-if="result_value == '0'">
            <div class="activity">
              <div class="title">秒杀未开始</div>
            </div>
            <div class="timer">
              <div class="text">距离秒杀开始</div>
              <uni-countdown
                color="#FFFFFF"
                background-color="#00B26A"
                border-color="#00B26A"
                :show-day="true"
                :day="end_day"
                :hour="end_hour"
                :minute="end_minute"
                :second="end_second"
                :sys_second="end_haomiao"
                @timeup="upstarbuy"
              >
              </uni-countdown>
            </div>
          </div>

          <p v-if="ral == 'true'">{{ goodsInergral }}积分</p>
          <div v-if="brand.name" class="brand"></div>
        </div>
      </div>

      <div
        @click="goTomorepintuan(id)"
        v-if="pintuan == '1'"
        class="pintuan-nav"
      >
        <div>{{ pt_num }}人正在拼团，可直接参与</div>
        <div class="lookmore">查看全部拼团</div>
        <div class="right"></div>
      </div>
      <div class="pintuanitem" v-if="pintuan == '1'">
        <div class="item" v-for="(item, index) in pt_list" :key="index">
          <image class="portrait" v-if="item.avator" :src="item.avator"></image>
          <image class="portrait" v-if="!item.avator" :src="avator"></image>
          <div class="name">{{ item.consignee }}</div>
          <!-- <div class="time">{{item.add_time|timeFormat()}}</div> -->
          <div class="time">
            <uni-countdown
              color="#FFFFFF"
              background-color="#00B26A"
              border-color="#00B26A"
              :show-day="true"
              :hour="item.hour"
              :minute="item.min"
              :second="item.sec"
            >
            </uni-countdown>
            <div class="pd" @click="pindan(item.order_id)">去拼单</div>
          </div>
        </div>
      </div>
      <div
        v-if="this.ral != 'true' && prompt"
        @click="showType"
        class="section-nav"
      >
        <div style="color: red">
          <p>{{ prompt }}</p>
        </div>
      </div>
      <div @click="showType" class="section-nav">
        <div>请选择规格数量</div>
        <div></div>
      </div>
      <div @click="gotojudge(info.goods_id)" class="section-nav">
        <div>用户评价</div>
        <div></div>
      </div>
	  <div class="section-nav">
	    <div>购买此商品赠送积分：</div>
	    <span style="padding-right: 20px"> <span style="color: #39B54A;"> {{ integral }}</span>积分</span>
	  </div>
	  <div class="section-nav">
	    <div>近期销售量：</div>
	    <span style="padding-right: 20px">{{ info.sales_volume_count }}</span>
	  </div>

      <div v-if="attribute.length != 0" class="attribute">
        <div class="head">商品参数</div>
        <div v-for="(item, index) in attribute" :key="index" class="item">
          <div>{{ item.name }}</div>
          <div>{{ item.value }}</div>
        </div>
      </div>
      <div v-if="goods_desc" class="detail">
        <rich-text :nodes="goods_desc"></rich-text>
      </div>
      <!-- 常见问题 -->
      <div class="common-problem">
        <div class="h">
          <div class="line"></div>
          <text class="title">常见问题</text>
          <div class="line"></div>
        </div>
        <div class="b">
          <div class="item" v-for="(item, index) in issueList" :key="index">
            <div class="question-box">
              <text class="spot"></text>
              <text class="question">{{ item.question }}</text>
            </div>
            <div class="answer">{{ item.answer }}</div>
          </div>
        </div>
      </div>
      <!-- 常见问题 -->
      <!-- 附件下载 -->
      <!-- #ifdef H5 -->
      <div class="common-problem">
        <div class="h">
          <div class="line"></div>
          <text class="title">相关下载</text>
          <div class="line"></div>
        </div>
        <div class="b">
          <div class="item" v-for="(item, index) in file_list" :key="index">
            <div class="question-box">
              <text class="spot"></text>
              <a :href="item.file_url" :download="item.file_url" target="_blank"
                ><text class="question">{{ item.file_name }}</text></a
              >
            </div>

            <!-- <div class="answer">{{ item.answer }}</div> -->
          </div>
        </div>
      </div>
      <!-- #endif -->
      <!-- 附件下载 -->
      <!-- 大家都在看 -->

      <div class="common-problem">
        <div class="h">
          <div class="line"></div>
          <text class="title">大家都在看</text>
          <div class="line"></div>
        </div>
        <div class="sublist">
          <div
            @click="togoodsDetail(subitem.id)"
            v-for="(subitem, subindex) in productLookList"
            :key="subindex"
          >
            <img :src="subitem.list_pic_url" alt />
            <p>{{ subitem.name }}</p>
            <!-- <p >￥{{subitem.retail_price}}</p> -->
            <p v-if="subitem.active != 'true' && subitem.is_pintuan != '1'">
              ￥{{ subitem.retail_price }}
            </p>
            <p v-if="subitem.active == 'true' && subitem.is_pintuan != '1'">
              ￥{{ subitem.spike_sum }}
            </p>
            <p v-if="subitem.active != 'true' && subitem.is_pintuan == '1'">
              ￥{{ subitem.pt_price }}
            </p>
          </div>
        </div>
      </div>

      <!-- 大家都在看 -->
      <div class="bottom-fixed">
        <div @click="collect">
          <div class="collect" :class="[collectFlag ? 'active' : '']"></div>
        </div>
        <!--  #ifdef  MP-WEIXIN -->
        <div class="contact">
          <button class="btn" open-type="contact" bindcontact="handleContact">
            <img
              src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/ic_goods_cus_service_nor.png"
              alt
            />
          </button>
        </div>
        <!--  #endif -->
        <!--  #ifdef APP-PLUS -->
        <!--        <div @tap="showModal" data-target="Modal">-->
        <div @click="openQQ">
          <div class="btn">
            <img
              src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/ic_goods_cus_service_nor.png"
              alt
            />
          </div>
        </div>
        <!--  #endif -->

        <!--  #ifdef  H5  -->
        <!--        <div @tap="showModal" data-target="Modal">-->
        <div @click="openQQ">
          <div class="btn">
            <img
              src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/ic_goods_cus_service_nor.png"
              alt
            />
          </div>
        </div>
        <!--  #endif -->

        <div @click="toCart">
          <div class="car">
            <span>{{ allnumber }}</span>
            <img
              src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/ic_menu_shoping_nor.png"
              alt
            />
          </div>
        </div>

        <div
          v-if="ral != 'true' && active != 'true' && goods_type == ''"
          @click="fastbuy"
        >
          立即购买
        </div>
        <div
          v-if="ral != 'true' && active != 'true' && goods_type == ''"
          @click="addCart"
        >
          加入购物车
        </div>
        <div
          class="trade"
          v-if="ral == 'true' && active != 'true' && goods_type != 'pintuan'"
          @click="integral_exchange"
        >
          立即兑换
        </div>
        <div
          class="trade"
          v-if="active == 'true' && result_value == '1'"
          @click="integral_spike"
        >
          立即抢购
        </div>
        <div
          class="trade_one"
          v-if="active == 'true' && result_value == '0'"
          @click="integral_no"
        >
          立即抢购
        </div>
        <!--  #ifdef  MP-WEIXIN -->

        <!-- <div
		  class="trade"
		  v-if="active =='true' && result_value == 1"
		  @click="integral_spike"
		>立即抢购</div> -->
        <div
          class="trade_one"
          v-if="active == 'true' && result_value == 0"
          @click="integral_no"
        >
          立即抢购
        </div>
        <!--  #endif -->
        <div
          v-if="goods_type == 'pintuan' && order_id == '0'"
          class="trade"
          @click="click_pintuan"
        >
          立即开团
        </div>
        <div
          v-if="goods_type == 'pintuan' && order_id != '0'"
          class="trade"
          @click="click_pintuan"
        >
          立即拼团
        </div>
      </div>

      <!-- 选择规格部分 -->
      <div v-show="showpop" @click="showType" class="pop"></div>
      <scroll-view scroll-y='true' class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
        <div class="top">
          <div class="left">
            <img :src="info.goods_thumb" alt />
          </div>
          <div class="right">
            <div>
              <p v-if="info.is_pintuan == '1'">价格：￥{{ info.pt_price }}</p>
              <p v-if="this.ral == 'true'">积分：￥{{ goodsInergral }}</p>
              <p v-if="this.ral != 'true' && info.is_pintuan != '1'">
                价格：￥{{ info.shop_price }}
              </p>
              <p>库存：{{ defaultSkuStore }}</p>
              <p>请选择数量</p>
            </div>
          </div>
          <div @click="showType" class="close"><i class="cuIcon-close"></i></div>
        </div>
        <div class="b">
          <ul class="spec-list">
            <li v-for="(item, itemIndex) in goodsSkuNameList" :key="itemIndex">
              <h4>{{ item.skuName }}</h4>

              <div
                v-for="(tag, index) in item.skuValList"
                :key="index"
                @click="tagVal(itemIndex, index, tag.skuValId)"
                :class="[
                  goodsSkuNameList[itemIndex].skuValList[
                    goodsSkuNameList[itemIndex].activeSkuVal
                  ].skuValId === tag.skuValId
                    ? 'active tag tag-hollow'
                    : 'tag tag-hollow',
                ]"
              >
                {{ tag.skuVal }}
              </div>
            </li>
          </ul>
          <p>数量</p>
          <div class="count">
            <div @click="reduce" class="cut">-</div>
            <input class="number" v-model="number" />
            <div @click="add" class="add">+</div>
          </div>
        </div>
      </scroll-view>
      <!-- 选择规格部分 -->
    </div>

    <view class="cu-modal" :class="modalName == 'Modal' ? 'show' : ''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">客服电话</view>
          <view class="action" @tap="hideModal">
            <text class="cuIcon-close text-red"></text>
          </view>
        </view>
        <view class="padding-xl" @click="go()">
          {{ kefu_tel }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import share from "@/common/share.js";
import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue";
import {
  goodsDetailActionApi,
  goodsAddCartApi,
  goodsAddCollectApi,
  goodsAddCartFastApi,
  GoodsDiscountApi,
  getGoodsintegral,
  getPayPointsApi,
  pinGoodsApi,
  getGoodsPintuanApi,
  getGoodSpikeApi,
} from "@/server/config.js";
import { toLogin } from "@/server/api.js";

export default {
  onLoad() {
    //#ifdef  MP
    this.platform = "微信小程序";
    //#endif
    //#ifdef  APP-PLUS
    this.platform = "APP";
    //#endif
    //#ifdef  H5
    this.platform = "H5";
    //#endif
  },
  onShow() {},
  onLoad(options) {
    this.parent_id = options.parent_id;
    this.id = options.id;
    this.ral = options.ral;
    this.order_id = options.order_id;
  },
  components: { uniCountdown },
  mounted() {
    if (this.parent_id) {
      uni.setStorageSync("parent_id", this.parent_id);
    }
    this.id = this.id;
    this.ral = this.ral;
    this.order_id = this.order_id; // 这个是获取的一起拼单的id
    if (this.order_id == null) {
      this.order_id = "0";
    }
    if (this.ral == "true") {
      this.exchange_integral();
    }
    this.goodsDetail();
    this.getDiscount();

    // 清除拼团缓存
    uni.removeStorageSync("pt_goods_id");
    uni.removeStorageSync("pt_product_id");
    uni.removeStorageSync("pt_num");
    uni.removeStorageSync("pt_order_id");
  },
  //商品转发
  onShareAppMessage() {
    return {
      title: info.goods_name,
      path: "/apiShop/goods/main?id=" + this.id,
      imageUrl: this.gallery[0], //拿第一张商品的图片
    };
  },
  data() {
    return {
      share_img:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/share.png", //分享图标
      qq: 875358601,
      kefu_tel: "18888888888",
      modalName: null,
      allnumber: 0,
      collectFlag: false,
      number: 1,
      showpop: false,
      gallery: [],
      info: {},
      brand: {},
      attribute: [],
      issueList: [],
      productLookList: [],
      skuMap: {}, // 商品规格
      ral: "",
      goods_desc: "",
      id: "",
      goodsId: "",
	  integral:"",
      productId: "",
      allPrise: "",
      goodsInergral: "",
      defaultSkuStore: "", //库存,
      goodsSkuNameList: "",
      goodsSkuList: "",
      allSkuVal: [],
      activeSkuValId: {},
      goods_type: "",
      pintuan: "0", // 默认拼团不开启
      pt_list: [],
      order_id: "", // 默认为不与别人拼团
      avator:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/missing-face.png",
      hitCounts: "",
      platform: "",
      prompt: "",
      active: "",
      end_day: 0,
      end_hour: 0,
      end_minute: 0,
      end_second: 0,
      end_haomiao: 0,
      result_value: "",
      pt_num: 0,
      //    show_marketprice:'',
      kefu_qq: "",
      file_list: [],
    };
  },
  // components: {
  //   uniCountdown
  // },
  methods: {
    // 前往拼团页面
    goTomorepintuan(id) {
      uni.navigateTo({ url: "/apiShop/pintuan/main?id=" + id });
    },
    setCacheGoodsList(id, img, goods_name, shop_price) {
      let historyGoods = uni.getStorageSync("historyGoods");
      //historyGoods = []
      if (!historyGoods) {
        historyGoods = [];
      } else {
        historyGoods.forEach((item, index) => {
          if (item.id === id) {
            historyGoods.splice(index, 1);
          }
        });
      }
      let array = { id: id, img: img,goods_name: goods_name,shop_price:shop_price };
      historyGoods.unshift(array);
      historyGoods = historyGoods.slice(0, 10);
      uni.setStorageSync("historyGoods", historyGoods);
      /**
		let array = {'id':id,img:'img'}
		historyGoods.unshift(array)

		uni.setStorageSync("historyGoods", historyGoods);

		console.info(historyGoods)
		console.info(id)
		console.info(img)

		console.info(1)
		**/
    },
    openQQ() {
      //#ifdef H5
      // location.href = 'mqqwpa://im/chat?chat_type=wpa&uin='+this.kefu_qq+'&version=1&src_type=web&web_src=oicqzone.com'
      location.href =
        "http://wpa.qq.com/msgrd?v=3&uin=" + this.kefu_qq + "&site=qq&menu=yes";
      //#endif

      //  //#ifdef  MP-WEIXIN
      //   location.href = 'http://wpa.qq.com/msgrd?v=3&uin='+this.kefu_qq+'&site=qq&menu=yes'
      //  //#endif

      // 没有校验qq号是否为空或合法数字，如果不是可用的qq号，启动qq后会停留在qq主界面
      //#ifdef APP-PLUS
      let _this = this;
      uni.showModal({
        title: "客服QQ",
        content: this.kefu_qq,
        confirmText: "打开QQ",
        success: function (res) {
          if (res.confirm) {
            plus.runtime.openURL(
              "mqqwpa://im/chat?chat_type=wpa&uin=" +
                _this.kefu_qq +
                "&version=1&src_type=web&web_src=lvlingseeds.com"
            );
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
      //#endif
    },
    togoodsDetail(id) {
      uni.redirectTo({ url: "/apiShop/goods/main?id=" + id });
    },
    showModal(e) {
      // if(this.kefu_qq == '')
      // {
      // 	uni.showToast({
      // 		icon:"none",
      // 		title: '暂未设置QQ'
      // 	})
      // 	return;
      // }
      // // wap 为普通qq  crm 为营销QQ
      // // plus.runtime.openURL('mqqwpa://im/chat?chat_type=wap&uin=' + this.kefu_qq,function (res) {
      // plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + this.kefu_qq+ '&version=1&src_type=web ',function (res) {
      // 	plus.nativeUI.alert("本机没有安装QQ，无法启动");
      // });
      // // plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + this.kefu_qq + '&version=1&src_type=web ');
      this.modalName = e.currentTarget.dataset.target;
    },
    hideModal(e) {
      this.modalName = null;
    },
    go() {
      uni.makePhoneCall({
        // 手机号
        phoneNumber: this.kefu_tel,
        // 成功回调
        success: (res) => {
          console.log("调用成功!");
        },
        // 失败回调
        fail: (res) => {
          console.log("调用失败!");
        },
      });
    },
    async getDiscount() {
      const data = await GoodsDiscountApi({
        goods_id: this.id,
      });
      this.prompt = data.data.discount;
    },
    add() {
      this.number = parseInt(this.number) + 1;
      if (this.defaultSkuStore < this.number) {
        this.number = this.defaultSkuStore;
        //商品无库存
        uni.showToast({
          title: "库存不足",
          icon: "none",
          duration: 1500,
        });
      }
    },
    reduce() {
      if (this.number > 1) {
        this.number = parseInt(this.number) - 1;
      } else {
        return false;
      }
    },
    // 规格选中
    tagVal(allIndex, iIndex, id) {
      this.goodsSkuNameList.forEach((value, index) => {
        if (index === allIndex) {
          this.goodsSkuNameList[index].activeSkuVal = iIndex;
        }
        this.allSkuVal[index] = this.goodsSkuNameList[index].skuValList[
          this.goodsSkuNameList[index].activeSkuVal
        ].skuValId;
      });
      this.activeSkuValId[allIndex] = id;

      this.goodsSkuList.forEach((value, index) => {
        this.goodsSkuList[index].is_default = false;
        // console.log(this.goodsSkuList[index].skuValIds);
        // console.log(typeof this.allSkuVal);
        let result = this.goodsSkuList[index].skuValIds
          .replace("[", "")
          .replace("]", "");
        // console.log("比较的值：" + result === this.allSkuVal.sort().toString());
        // console.log(result);
        // console.log(this.allSkuVal.sort().toString());
        // let result = JSON.parse(this.goodsSkuList[index].skuValIds);
        // 比较
        // if (result.sort().toString() === this.allSkuVal.sort().toString()) {
        // result = result.split(',');
        // console.log(result);
        let tmp = this.allSkuVal.toString();
        tmp = tmp.split(",");
        tmp = tmp.sort().toString();
        // console.log(tmp);
        result = result.split(",");
        result = result.sort().toString();
        // console.log(result);
        if (result === tmp) {
          // console.log("kkkk");
          // console.log("1111---" + result);
          // console.log("2222---" + this.allSkuVal.sort().toString());
          this.goodsSkuList[index].is_default = true;
          this.defaultSkuStore = this.goodsSkuList[index].stockNum; //库存
          this.info.shop_price = this.goodsSkuList[index].price; //价格
          this.productId = this.goodsSkuList[index].product_id;
          // console.log("product_id---" + this.productId);
        }
      });
      // console.log(this.goodsId);
      // console.log(this.productId);
    },
    async upstarbuy() {},

    async integral_no() {
      const data = await goodsDetailActionApi({
        goods_id: this.id,
      });
      if (data.data.info.time.default == "0") {
        uni.showToast({
          title: "商品秒杀未开始，不能购买哟~~",
          icon: "none",
          duration: 2000,
        });
      }
    },

    async integral_spike() {
      const result = await getGoodSpikeApi({
        goods_id: this.id,
      });
      if (result.data == null) {
        const data = await getPayPointsApi({
          goods_id: this.id,
          num: this.number,
        });
        uni.setStorageSync("integralGoodsid", this.id);
        uni.navigateTo({
          url: "/apiCart/order/main?spike=true&goods_id=" + this.id,
        });
      }
      if (result.data.status == "fail") {
        uni.showToast({
          title: "库存不足",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
    },

    async integral_exchange() {
      const data = await getPayPointsApi({
        goods_id: this.id,
        num: this.number,
      });
      if (data.data.info == false) {
        uni.showToast({
          title: "积分不足，不能兑换",
          icon: "none",
          duration: 2000,
        });
      } else {
        uni.setStorageSync("integralGoodsid", this.id);
        uni.setStorageSync("jifennum", this.number);
        uni.navigateTo({
          url: "/apiCart/order/main?ral=true",
        });
      }
    },
    async fastbuy() {
      if (toLogin()) {
        if (this.showpop) {
          for (let key in this.goodsSkuNameList) {
            if (this.goodsSkuNameList[key].activeSkuVal === "") {
              uni.showToast({
                title: "请选择" + this.goodsSkuNameList[key].skuName, //提示的内容,
                duration: 2000, //延迟时间,
                icon: "none",
                mask: true, //显示透明蒙层，防止触摸穿透,
                success: (res) => {},
              });
              return false;
            }
          }
          if (this.number == 0) {
            uni.showToast({
              title: "请选择商品数量", //提示的内容,
              duration: 2000, //延迟时间,
              icon: "none",
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: (res) => {},
            });
            //return false;
            //立即购买存一哈
            // uni.setStorageSync("productId", this.productId);
            // uni.setStorageSync("number", this.number);
            // uni.navigateTo({
            //   url: "/pages/order/main"
            // });
          }
          uni.setStorageSync("productId", this.goodsId);
          let sku = Object.values(this.activeSkuValId).join(",");
          const data = await goodsAddCartFastApi({
            fastbuy: "true",
            goods_id: this.goodsId,
            sku: Object.values(this.activeSkuValId).join(","),
            num: this.number,
            product_id: this.productId,
          });
          console.info(data.data.add_cart);
          if (data.data.add_cart === false) {
            uni.showToast({
              icon: "none",
              title: data.data.msg,
            });
            return false;
          }
          if (data.data.add_cart) {
            uni.navigateTo({
              url: "/apiCart/order/main",
            });
          }
        } else {
          this.showpop = true;
        }
      }
    },
    async collect() {
      if (toLogin()) {
        // let userId = window.sessionStorage.getItem('user_id')
        // this.collectFlag = !this.collectFlag;
        const data = await goodsAddCollectApi({
          goods_id: this.goodsId,
          collect_status: this.collectFlag,
        });
        this.collectFlag = data.data.res;
        console.log("当前的收藏状态" + this.collectFlag);
      }
    },
    async addCart() {
      if (toLogin()) {
        if (this.showpop) {
          for (let key in this.goodsSkuNameList) {
            if (this.goodsSkuNameList[key].activeSkuVal === "") {
              uni.showToast({
                title: "请选择" + this.goodsSkuNameList[key].skuName, //提示的内容,
                duration: 2000, //延迟时间,
                icon: "none",
                mask: true, //显示透明蒙层，防止触摸穿透,
                success: (res) => {},
              });

              return false;
            }
          }

          if (this.number == 0) {
            uni.showToast({
              title: "请选择商品数量", //提示的内容,
              duration: 2000, //延迟时间,
              icon: "none",
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: (res) => {},
            });

            return false;
          }
          let sku = Object.values(this.activeSkuValId).join(",");
          // let userId = window.sessionStorage.getItem('user_id')
          const data = await goodsAddCartApi({
            goods_id: this.goodsId,
            sku: Object.values(this.activeSkuValId).join(","),
            num: this.number,
            product_id: this.productId,
          });
          if (data.data.add_cart === false) {
            uni.showToast({
              icon: "none",
              title: data.data.msg,
            });
            return false;
          }
          console.log(this.defaultSkuStore);
          console.log(this.number);
          if (this.defaultSkuStore < this.number) {
            //商品无库存
            uni.showToast({
              title: "库存不足",
              icon: "none",
              duration: 1500,
            });
          } else {
            //添加成功后
            this.allnumber = parseInt(this.allnumber) + parseInt(this.number);
            if (this.allnumber > 99) {
              this.allnumber = "99+";
            }
            uni.showToast({
              title: "添加购物车成功",
              icon: "success",
              duration: 1500,
            });
          }
        } else {
          this.showpop = true;
        }
      }
    },
    toCart() {
      uni.switchTab({
        url: "/pages/cart/main",
      });
      // uni.navigateTo({
      //   url: "/pages/cart/main"
      // });
    },
    async goodsDetail() {
      const data = await goodsDetailActionApi({
        goods_id: this.id,
        platform: this.platform,
      });
      this.file_list = data.data.file_list; // 附件列表
      this.hitCounts = data.data.hitCounts;
      this.gallery = data.data.gallery;
      this.info = data.data.info;
      this.allPrise = data.data.info.shop_price;
	  this.integral = data.data.info.rank_integral;
      this.goodsId = this.info.goods_id;
      this.productId = data.data.info.productId;
      this.brand = data.data.brand;
      this.url_fenxiang = data.data.url_fenxiang;
      if (data.data.kefu_tel) {
        this.kefu_tel = data.data.kefu_tel.val;
      }
      if (data.data.kefu_qq) {
        this.kefu_qq = data.data.kefu_qq;
      }
      this.attribute = data.data.attrlist;
      this.active = data.data.info.active;
      // this.show_marketprice = data.data.info.show_marketprice;
      console.log(this.url_fenxiang);
      // 这个值要与productid的值一致

      this.activeSkuValId = data.data.activeSkuValId;
      this.miaosha = this.info.active;
      if (this.miaosha == "true") {
        this.result_value = data.data.info.time.default;
        this.end_day = data.data.info.time.day;
        this.end_hour = data.data.info.time.hour;
        this.end_minute = data.data.info.time.minute;
        this.end_second = data.data.info.time.second;
      }
      this.goods_desc = data.data.info.goods_desc.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto;vertical-align: bottom;" '
      );
      // #ifdef  MP-ALIPAY
      this.goods_desc = escape2Html(data.info.goods_desc);
      // #endif
      this.issueList = data.data.issue;
      this.collectFlag = data.data.collected;
      this.allnumber = data.data.allnumber;
      if (this.allnumber > "99") {
        this.allnumber = "99+";
      }
      this.productLookList = data.data.productLookList;
      // this.collectFlag = data.isFavorite;
      // console.log(data.data.goodsSkuList[0].stockNum);
      // console.log(data.data.goodsSkuList[0].stockNum == null);
      // console.log(data.data.goodsSkuList[0].stockNum == "");
      // console.log(data.data.goodsSkuList[0].stockNum == false);
      if (data.data.defaultSkuData != "" && data.data.defaultSkuData) {
        this.defaultSkuStore = data.data.defaultSkuData.stock;
        this.info.shop_price = data.data.defaultSkuData.price;

        let skuList = data.data.goodsSkuList;
        this.productId = data.data.defaultSkuData.product_id;
        for (var value of skuList) {
          if (value.product_id == this.productId) {
            // 对数据进行处理
            let skuValIds = value.skuValIds
              .replace("[", "")
              .replace("]", "")
              .split(",");
            this.activeSkuValId = skuValIds;
            break;
          }
        }
      } else {
        this.defaultSkuStore = data.data.defaultSkuStore;
      }

      this.goodsSkuNameList = data.data.goodsSkuNameList;

      this.goodsSkuList = data.data.goodsSkuList;
      this.setCacheGoodsList(this.id, this.info.goods_thumb,this.info.goods_name,this.info.shop_price);
      this.pintuan = data.data.active.pintuan.is_pintuan;
      if (this.pintuan == "1") {
        this.goods_type = "pintuan";
        this.pt_info = data.data.pt_info;
        this.pt_list = this.pt_info.pt_list;
        this.pt_num = this.pt_info.pt_num.num;
      }
    },
    async exchange_integral() {
      const data = await getGoodsintegral({
        goods_id: this.id,
      });
      // this.shop_price = data.data.exchange_integral;
      this.goodsInergral = data.data.exchange_integral;
      // console.log("我执行了"+this.goodsInergral);
    },
    async click_pintuan() {
      if (this.showpop) {
        for (let key in this.goodsSkuNameList) {
          if (this.goodsSkuNameList[key].activeSkuVal === "") {
            uni.showToast({
              title: "请选择" + this.goodsSkuNameList[key].skuName, //提示的内容,
              duration: 2000, //延迟时间,
              icon: "none",
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: (res) => {},
            });
            return false;
          }
        }
        // 点击拼团

        // 单独拼团
        if (this.order_id == "0") {
          const data = await getGoodsPintuanApi({
            goods_id: this.id,
            order_id: "0",
          });
          if (data.data.status == "fail") {
            uni.showToast({
              icon: "none",
              title: "非拼团商品",
            });
            return false;
          }
        } else {
          // 与他人拼团
          const data = await getGoodsPintuanApi({
            goods_id: this.id,
            order_id: this.order_id,
          });
          if (data.data.status == "fail") {
            uni.showToast({
              icon: "none",
              title: "拼单商品错误",
            });
            return false;
          }
          // 验证通过 记录一下一起拼单的订单号
          uni.setStorageSync("pt_order_id", this.order_id);
        }

        // 可拼团跳转到订单页面
        uni.setStorageSync("pt_goods_id", this.id); // 商品ID
        uni.setStorageSync("pt_product_id", this.productId); // 属性ID
        uni.setStorageSync("pt_num", this.number);
        uni.navigateTo({
          url: "/apiCart/order/main?pintuan=true",
        });
      } else {
        this.showpop = true;
      }
    },
    // 点击拼团
    pindan(order_id) {
      this.order_id = order_id;
      if (this.showpop) {
        for (let key in this.goodsSkuNameList) {
          if (this.goodsSkuNameList[key].activeSkuVal === "") {
            uni.showToast({
              title: "请选择" + this.goodsSkuNameList[key].skuName, //提示的内容,
              duration: 2000, //延迟时间,
              icon: "none",
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: (res) => {},
            });
            return false;
          }
        }
      } else {
        this.showpop = true;
      }
    },
    showType() {
      this.showpop = !this.showpop;
    },
    gotojudge(id) {
      uni.navigateTo({
        url: "/apiShop/userjudge/main?id=" + id,
      });
    },
    //  kefu() {
    //    //#ifdef H5
    //    uni.showModal({
    //      title: "客服QQ",
    //      content: this.qq.toString(),
    //      confirmText: "打开QQ",
    //      success: function(res) {
    //        if (res.confirm) {
    //          let locatUrl =
    //            "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" +
    //            this.kefu_qq +
    //            "&card_type=person&source=sharecard";
    //          window.open(locatUrl);
    //        } else if (res.cancel) {
    //          console.log("用户点击取消");
    //        }
    //      }
    //    });
    //    //#endif
    // var appUrl = 'mqq://im/chat?chat_type=wpa&uin=' + this.kefu_qq+ '&version=1&src_type=web';
    //    //#ifdef APP-PLUS
    //     uni.showModal({
    //            title: "客服QQ",
    //            content: this.kefu_qq,
    //            confirmText: "打开QQ",
    //            success: function(res) {
    //              if (res.confirm) {
    //                plus.runtime.openURL(appUrl,
    //    				function(res) {
    //                    plus.nativeUI.alert("本机没有安装QQ，无法启动");
    //                  }
    //                );
    //              } else if (res.cancel) {
    //                console.log("用户点击取消");
    //              }
    //            }
    //          });
    //    //#endif
    //  },
    //app+h5分享
    shareInfo() {
      let shareInfo = {
        href: this.url_fenxiang,
        title: this.info.goods_name,
        desc: this.info.goods_name,
        imgUrl: this.info.goods_thumb,
      };
      let shareList = [
        {
          icon:
            "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/sharemenu/wx.png",
          text: "微信好友",
        },
        {
          icon:
            "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/sharemenu/pyq.png",
          text: "朋友圈",
        },
        // {
        //   icon:
        //     "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/sharemenu/weibo.png",
        //   text: "微博",
        // },
        {
          icon:
            "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/sharemenu/qq.png",
          text: "QQ",
        },
        {
          icon:
            "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/sharemenu/copy.png",
          text: "复制",
        },
        {
          icon:
            "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/sharemenu/more.png",
          text: "更多",
        },
      ];
      this.shareObj = share(shareInfo, shareList, function (index) {
        console.log("点击按钮的序号: " + index);
        let shareObj = {
          href: shareInfo.href || "",
          title: shareInfo.title || "",
          summary: shareInfo.desc || "",
          success: (res) => {
            console.log("success:" + JSON.stringify(res));
          },
          fail: (err) => {
            console.log("fail:" + JSON.stringify(err));
          },
        };
        switch (index) {
          case 0:
            shareObj.provider = "weixin";
            shareObj.scene = "WXSceneSession";
            shareObj.type = 0;
            shareObj.imageUrl = shareInfo.imgUrl || "";
            uni.share(shareObj);
            break;
          case 1:
            shareObj.provider = "weixin";
            shareObj.scene = "WXSenceTimeline";
            shareObj.type = 0;
            shareObj.imageUrl = shareInfo.imgUrl || "";
            uni.share(shareObj);
            break;
          // case 2:
          //   shareObj.provider = "sinaweibo";
          //   shareObj.type = 0;
          //   shareObj.imageUrl = shareInfo.imgUrl || "";
          //   uni.share(shareObj);
          //   break;
          case 2:
            shareObj.provider = "qq";
            shareObj.type = 1;
            shareObj.imageUrl = shareInfo.imgUrl || "";
            uni.share(shareObj);
            break;
          case 3:
            uni.setClipboardData({
              data: shareInfo.href,
              complete() {
                uni.showToast({
                  title: "已复制到剪贴板",
                });
              },
            });
            break;
          case 5:
            plus.share.sendWithSystem({
              type: "web",
              title: shareInfo.title || "",
              thumbs: [shareInfo.imgUrl || ""],
              href: shareInfo.href || "",
              content: shareInfo.desc || "",
            });
            break;
        }
      });
      this.$nextTick(() => {
        this.shareObj.alphaBg.show();
        this.shareObj.shareMenu.show();
      });
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style.scss";
</style>