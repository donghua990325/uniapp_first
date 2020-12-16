<template>
  <view>
    <!--  #ifdef  MP || APP-PLUS-->
    <cu-custom
      bgColor="bg-white"
      :isBack="false"
    >
      <block slot="backText">返回</block>
      <block slot="content">首页</block>
    </cu-custom>
    <!--  #endif -->
    <div class="index">
      <div :class="[{ topclose : isClose } , {container : true}]">

        <!-- #ifdef H5 -->
        <div class="con">
          <!-- 新人有礼 -->
          <div
            class="gift-top"
            v-if="isClose"
          >
            <div
              class="top-close"
              @click="is_close"
            ></div>
            <img
              class="ad-icon"
              src="https://imgt1.oss-cn-shanghai.aliyuncs.com/newecshop/new-index/nav_two.png"
              alt=""
            >
            <div class="info-content">
              <h4 class="line-one">官方APP上线</h4>
              <p class="line-two">新人下载APP领新人大礼包！</p>
            </div>
            <div
              class="go-buy"
              @click="download"
            >下载APP</div>
          </div>
          <div class="search">
            <div> <img :src="logo"></div>
            <div @click="toSearch">
              <input
                type="text"
                placeholder="搜索商品"
              >
              <span class="icon"></span>
            </div>

          </div>
        </div>
        <!--  #endif -->
        <!--  #ifdef  MP ||  APP-PLUS -->
        <div class="search">
          <div> <img :src="logo"></div>
          <div @click="toSearch">
            <input
              type="text"
              placeholder="搜索商品"
            >
            <span class="icon"></span>
          </div>
          <div @click="mpvueScanCode()">
            <img
              class="act"
              src="./../../static/images/ic_menu_scan_nor.png"
            >
          </div>
        </div>
        <!--  #endif -->
      </div>
      <!-- 轮播图开始 -->
      <div class="swiper">
        <swiper
          class="swiper-container"
          indicator-dots="true"
          autoplay="true"
          interval="3000"
          circular="true"
          duration="500"
        >
          <block
            v-for="(item, index) in banner "
            :key="index"
          >
            <!-- #ifdef MP -->
            <swiper-item
              @click="bannerLink(item.mp_url)"
              class="swiper-item"
            >
              <!-- #endif -->
              <!-- #ifdef APP-PLUS -->
              <swiper-item
                @click="bannerLink(item.app_url)"
                class="swiper-item"
              >
                <!-- #endif -->
                <!-- #ifdef H5 -->
                <swiper-item
                  @click="bannerLink(item.img_url)"
                  class="swiper-item"
                >
                  <!-- #endif -->
                  <image
                    :src="item.ad_code"
                    class="slide-image"
                  />
                </swiper-item>
          </block>
        </swiper>
      </div>
      <!-- 轮播图结束 -->
      <!-- 导航描述开始 -->
      <div class="slogon">
        <div
          class="one"
          v-for="(item, index) in index_prompt"
        >
          <img
            :src="item.image_url"
            alt=""
          >
          <div class="content">{{item.image_prompt}}</div>
        </div>
      </div>
      <!-- 导航描述结束 -->
      <!-- 导航开始 -->
      <div class="swiper nav">
        <div class="channel">
          <div
            v-for="(item, index) in channel1"
            @click="categoryList(item.id,'cat')"
          >
            <img
              :src="item.cate_img"
              alt=""
            >
            <p>{{item.cat_name}}</p>
          </div>
        </div>
        <div class="channel">
          <div v-for="(item,index) in channel2">
            <img
              :src="item.cate_img"
              alt=""
              @click="categoryList(item.id,'cat')"
            >
            <p>{{item.cat_name}}</p>
          </div>
        </div>
      </div>
      <!-- 导航结束 -->
		<!-- #ifdef MP -->
		<div v-if="live_is_open">
		  <showOnline :list="list"/>
		</div>
		<!-- #endif -->
		<!-- 限时购开始 -->
		<div 
				class="newgoods hotgoods recommendation block"
				v-if = "miaosha"
		>
		  <div
		    @click="goodsList('spike')"
		    class="topicList-top"
		  >
		    <div class="title">限时购</div>
		    <div class="time">
		      <uni-countdown
		        color="#FFFFFF"
		        background-color="#333"
		        border-color="#333"
		        :show-day="true"
		        :day="day"
		        :hour="hour"
		        :minute="min"
		        :second="sec"
		        @timeup="upstarbuy"
		      >
		      </uni-countdown>
		    </div>
		    <div class="right">
		      更多<span class="icon"></span>
		    </div>
		  </div>
		  <div class="list">
		    <ul>
		      <li
		        v-for=" (item,index) in  miaosha"
		        @click="goodsDetail(item.goods_id)"
		      >
		        <img
		          :src="item.goods_thumb"
		          alt=""
		        >
		        <span>{{item.goods_name}}</span>
		        <p class="price">{{item.shop_price}}<span class="del">{{item.market_price}}</span></p>
		      </li>
		    </ul>
		  </div>
		</div>
		<!-- 限时购结束 -->
      <!-- 品牌值得买开始 -->
      <div class="brand">
        <div
          @click="tobrandList"
          class="head"
        >
          品牌值得买
        </div>
        <div class="content">
          <div
            @click="branddetail(item.brand_id)"
            v-for="(item, index) in brandList"
            :key="index"
          >
            <div>
              <p>{{item.brand_name}}</p>
              <!--<p>{{item.floor_price}}元起</p>-->
            </div>
            <img :src="item.brand_logo">
          </div>
        </div>
      </div>
      <!-- 品牌结束 -->
      <!-- 拼团开始 -->
      <!-- <div class="newgoods">
        <div
          @click="goodsList('pintuan')"
          class="newgoods-top"
        >
          <div class="top">
            <p>拼团购买</p>
            <p>查看全部</p>
          </div>
        </div>
        <div class="list">
          <ul>
            <scroll-view
              class="scroll-view"
              :scroll-x="true"
            >
              <li
                @click="goodsDetail(item.goods_id)"
                v-for="(item, index) in pingtuan"
                :key="index"
              >
                <img
                  :src="item.goods_thumb"
                  alt=""
                >
                <p>{{item.goods_name}}</p>
                <p>{{item.goods_brief}}</p>
                <p>￥{{item.shop_price|priceFormat(2)}}</p>
              </li>
            </scroll-view>
          </ul>
        </div>
      </div> -->
      <!-- 拼团结束 -->
      
      <!-- 礼包开始 -->
      <!-- <div class="newgoods hotgoods">
        <div
          @click="goodsList('super')"
          class="newgoods-top"
        >
          <div class="top">
            <p>超值礼包</p>
            <p>查看全部</p>
          </div>
        </div>
        <div class="list">
          <ul>
            <scroll-view
              class="scroll-view"
              :scroll-x="true"
            >
              <li
                @click="goumaisuper(item.act_id)"
                v-for="(item, index) in supergoods"
                :key="index"
              >
                <img
                  :src="item.package_image"
                  alt=""
                >
                <p>{{item.package_name}}</p>
                <p>{{item.act_desc}}</p>
                <p>￥{{item.ext_info.package_price}}<span>购买</span></p>

              </li>
            </scroll-view>
          </ul>
        </div>
      </div> -->
      <!-- 礼包结束 -->
      <!-- 文章开始 -->
      <!-- <div class="topicList">
        <div
          @click="totopic"
          class="topicList-top"
        >
          专题精选
          <span class="icon"></span>
        </div>
        <div class="list">
          <ul>
            <scroll-view
              class="scroll-view"
              :scroll-x="true"
            >
              <li
                @click="topicdetail(item.article_id)"
                v-for="(item, index) in topicList"
                :key="index"
              >
                <img
                  :src="item.article_pic"
                  alt=""
                > -->
                <!-- <div class="btom">
                  <div>
                    <p>{{item.title}}</p>
                    <p>{{item.subtitle}}</p>
                  </div>
                  <div>
                    {{item.price_info}}元起
                  </div>
                </div> -->
              <!-- </li>
            </scroll-view>
          </ul>
        </div>
      </div> -->
      <!-- 文章结束 -->
      
        <!-- 人气推荐开始 -->
        <div class="newgoods hotgoods recommendation block">
          <div
            @click="goodsList('hot')"
            class="topicList-top"
          >
            <div class="title">人气推荐</div>
            <div class="right">
              更多<span class="icon"></span>
            </div>
          </div>
          <div class="list">
            <ul>
              <li
                v-for="(item , index) in  hotGoods"
                @click="goodsDetail(item.goods_id)"
              >
                <img
                  :src="item.goods_thumb"
                  alt=""
                >
                <span>{{item.goods_name}}</span>
        			  <!-- 原价 -->
        			  <p class="price">{{item.shop_price}}<span class="del">{{item.market_price}}</span></p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 人气推荐结束 -->
		<!-- 新品首发开始 -->
      <div class="newgoods hotgoods recommendation block">
		<div
          @click="goodsList('new')"
          class="topicList-top"
        >
          <div class="title">新品首发</div>
          <div class="right">
            更多<span class="icon"></span>
          </div>
        </div>
        <div class="list">
          <ul>
            <li
              v-for="(item, index) in newGoods"
              :key="index"
              @click="goodsDetail(item.goods_id)"
            >
              <img
                :src="item.goods_thumb"
                alt=""
              >
              <span>{{item.goods_name}}</span>
              <!-- <p class="price" v-if="item.active == 'false'">{{item.shop_price}}<span class="del">{{item.market_price}}</span></p>
              <p class="price" v-if="item.active == 'true'">{{item.spike_sum}}<span class="del">{{item.shop_price}}</span></p> -->
			  
			  <p class="price" v-if="item.active == 'false' && item.is_pintuan == '0'">{{item.shop_price}}<span class="del">{{item.market_price}}</span></p>
			  <!-- 秒杀 -->
			  <p class="price" v-if="item.active == 'true' && item.is_pintuan == '0'">{{item.spike_sum}}<span class="del">{{item.shop_price}}</span></p>
			  <!-- 拼团 -->
			  <p class="price" v-if="item.is_pintuan == '1' && item.active == 'false' || item.active == ''">{{item.pt_price}}<span class="del">{{item.shop_price}}</span></p>
			  
            </li>
          </ul>
        </div>
      </div>
      <!-- 新品首发结束 -->
      <!-- 积分兑换开始 -->
      <div class="newgoods hotgoods">
        <div
          @click="goodsList('intergral')"
          class="newgoods-top"
        >
          <div class="top">
            <p>积分兑换</p>
            <p>查看全部</p>
          </div>
        </div>
        <div class="list">
          <ul>
            <scroll-view
              class="scroll-view"
              :scroll-x="true"
            >
              <li
                @click="integralgoods(item.goods_id)"
                v-for="(item, index) in integral"
                :key="index"
              >
                <img
                  :src="item.list_pic_url"
                  alt=""
                >
                <p>{{item.goods_name}}</p>
                <p></p>
                <p>{{item.exchange_integral}}积分</p>
              </li>
            </scroll-view>
          </ul>
        </div>
      </div>
      <!-- 积分兑换结束 -->
      
      <!-- 版权开始 -->
      <div class="company">
        <div class="down">
          <!-- #ifdef H5 -->
<!--          <span
            class="app"
            @click="download"
          >下载APP</span> -->
          <!-- #endif -->
          <!-- <span class="web">电脑版</span> -->
        </div>
        <div class="owner">{{copyright.copyright_one}}</div>
        <div class="licence">{{copyright.copyright_two}}</div>
      </div>
      <!-- 版权结束 -->
      <!-- 首页弹窗开始 -->
      <div
        class="new-user-gift"
        v-if="close"
      >
        <img
          @click="gift_close_url"
          :src=prompt.prompt_image
          alt=""
        >

        <div
          class="gift-close"
          @click="gift_close"
        ></div>
      </div>
      <!-- 首页弹窗结束 -->
    </div>
  </view>
</template>

<script>
import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue";
import { indexListApi, SendBonusApi } from "@/server/config.js";
import { toLogin } from "@/server/api.js";
import Jfooter from "@/components/footer/footer.vue";
import showOnline from "@/components/show/showOnLine.vue";
export default {
  onShow() {},
  computed: {},
  onLoad() {
    //APP引导页
    // #ifdef APP-PLUS
    this.checkGuide();
    // #endif

    this.getData();
  },
  onPullDownRefresh() {
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
    this.getData();
  },
  onShareAppMessage() {
    return {
      path: "/pages/index/main",
    };
  },

  data() {
    return {
      isClose: false, //顶部新人有礼
      close: false, //新手有礼页面
      banner: [],
      channel1: [],
      channel2: [],
      brandList: [],
      newGoods: [],
      downloadUrl: "",
      pingtuan: [],
      integral: [],
      supergoods: [],
      miaosha: [],
      hotGoods: [],
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
      topicList: [],
      index_prompt: [],
      prompt: [],
      newCategoryList: [],
      logo: "",
      time_spike: [],
      pintuan_shop: [],
      copyright: [],
      list: {
        entry: "11111111111",
        img:
          "http://dyjwechat-oss.oss-cn-hangzhou.aliyuncs.com/986a2202007131603574843.jpg",
        rooms: [],
      }, //直播
      live_is_open: false,
    };
  },
  components: { Jfooter, uniCountdown, showOnline },
  methods: {
    async upstarbuy() {},
    bannerLink(url) {
      let http = /^http:\/\/.*/i.test(url);
      let https = /^https:\/\/.*/i.test(url);
      if (!http && !https) {
        uni.navigateTo({
          url: "/apiShop/goods/main?id=" + url,
        });
      } else {
        if (url.length < 9) {
          console.log("这不是一个链接");
          return false;
        }
        // #ifdef APP-PLUS
        plus.runtime.openURL(url);
        // #endif
        // #ifdef H5
        location.href = url;
        // #endif
      }
    },
    toSearch() {
      uni.navigateTo({
        url: "/apiShop/search/main",
      });
    },
    download() {
      window.location = "https://ecshop.yunyingbao.net/DownloadApp/";
    },
    async getData() {
      const data = await indexListApi({});
      console.log(data);
      this.banner = data.data.banner;
      this.channel1 = data.data.channel.data1;
      this.channel2 = data.data.channel.data2;
      this.brandList = data.data.brandList;
      this.newGoods = data.data.newGoods;
      this.downloadUrl = data.data.downloadUrl;
      this.pingtuan = data.data.pingtuan;
      this.miaosha = data.data.miaosha;
      this.supergoods = data.data.supergoods;
      this.integral = data.data.integral;
      if (data.data.miaosha) {
        this.day = data.data.miaosha[0]["day"] * 1;
        this.hour = data.data.miaosha[0]["hour"];
        this.min = data.data.miaosha[0]["min"];
        this.sec = data.data.miaosha[0]["sec"];
      }
      this.hotGoods = data.data.hotGoods;
      this.topicList = data.data.topicList;
      this.index_prompt = data.data.index_prompt;

      this.newCategoryList = data.data.newCategoryList;
      this.logo = data.data.logo;
      this.prompt = data.data.prompt;
      this.time_spike = data.data.time_spike;
      this.pintuan_shop = data.data.pintuan_shop;
      this.copyright = data.data.copyright;
      this.live_is_open = data.data.live_setting.is_open;
      if (data.data.live_setting.images != "") {
        this.list.img = data.data.live_setting.images;
      }

      if (this.prompt.prompt_image_status == "1") {
        this.close = true;
      } else {
        this.close = false;
      }
      console.log(this.prompt);
    },
    integralgoods(id) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + id + "&ral=true",
      });
    },
    goodsDetail(id) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + id,
      });
    },
    categoryList(id, type) {
      if (type == "cat") {
        uni.navigateTo({
          url: "/apiShop/categorylist/main?id=" + id,
        });
      } else {
        uni.navigateTo({
          url: "/apiShop/newgoods/main?id=" + id,
        });
      }
    },
    goumaisuper(act_id) {
      toLogin();
      uni.setStorageSync("superGoodsid", act_id);
      uni.navigateTo({
        url: "/apiCart/order/main?super=true",
      });
    },
    goodsList(info) {
      if (info == "hot") {
        uni.navigateTo({
          url: "/apiShop/hotgooslist/main?isHot=" + 1,
        });
      }
      if (info == "new") {
        uni.navigateTo({
          url: "/apiShop/newgoodslist/main?isNew=" + 1,
        });
      }
      if (info == "pintuan") {
        uni.navigateTo({
          url: "/apiShop/goodsstatus/main?pintuan=" + 1,
        });
      }
      if (info == "spike") {
        uni.navigateTo({
          url: "/apiShop/spikelist/main?spike=" + 1,
        });
      }
      if (info == "super") {
        uni.navigateTo({
          url: "/apiShop/superpackage/main",
        });
      }
      if (info == "intergral") {
        uni.navigateTo({
          url: "/apiShop/integralgoods/main",
        });
      }
    },
    goodsListSpike() {
      uni.navigateTo({
        url: "/apiShop/newgoods/main?spike=" + 1,
      });
    },
    goodsListpintuan() {
      uni.navigateTo({
        url: "/apiShop/newgoods/main?pintuan=" + 1,
      });
    },
    topicdetail(id) {
      uni.navigateTo({
        url: "/apiShop/topicdetail/main?id=" + id,
      });
    },
    totopic() {
      uni.switchTab({
        url: "/pages/topic/main",
      });
    },
    tobrandList() {
      uni.navigateTo({
        url: "/apiShop/brandlist/main",
      });
    },
    branddetail(id) {
      uni.navigateTo({
        url: "/apiShop/branddetail/main?id=" + id,
      });
    },
    async mpvueScanCode() {
      // #ifdef MP-ALIPAY
      //支付宝扫码
      uni.scan({
        type: "qr",
        success: async (res) => {
          // my.alert({ title: res.code });
          // console.log(res.code);
          // const data = await scancodeSaveApi({
          //   code: res.code
          // });
          // if (data.id) {
          //   uni.navigateTo({
          //     url: "/apiShop/goods/main?id=" + data.id
          //   });
          // } else {
          uni.showToast({
            title: "测试扫码效果", //提示的内容,
            duration: 2000, //延迟时间,
            icon: "none",
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: (res) => {},
          });
          // }
        },
      });
      // #endif
      // #ifdef MP-WEIXIN
      //微信扫码
      // 只允许从相机扫码
      uni.scanCode({
        onlyFromCamera: true,
        success: async (res) => {
          // console.log(res)
          // const data = await scancodeSaveApi({
          //   code: res.result
          // });
          // if (data.id) {
          //   uni.navigateTo({
          //     url: "/apiShop/goods/main?id=" + data.id
          //   });
          // } else {
          uni.showToast({
            title: "测试扫码效果", //提示的内容,
            duration: 2000, //延迟时间,
            icon: "none",
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: (res) => {},
          });
          // }
        },
      });
      // #endif
      // #ifdef APP-PLUS
      // 允许从相机和相册扫码
      uni.scanCode({
        success: function (res) {
          uni.showToast({
            title: "测试扫码效果", //提示的内容,
            duration: 2000, //延迟时间,
            icon: "none",
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: (res) => {},
          });
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
        },
      });

      // 只允许通过相机扫码
      // uni.scanCode({
      //     onlyFromCamera: true,
      //     success: function (res) {
      //         console.log('条码类型：' + res.scanType);
      //         console.log('条码内容：' + res.result);
      //     }
      // });
      // #endif
    },
    checkGuide() {
      // 思路： 检测是否有启动缓存，如果没有，就是第一次启动，第一次启动就去 启动介绍页面
      const launchFlag = uni.getStorageSync("launchFlag");
      console.log(launchFlag);
      if (launchFlag) {
        uni.switchTab({
          url: "/pages/index/main",
        });
      } else {
        console.log("去启动介绍页");
        uni.navigateTo({
          url: "/apiUtil/guide/main",
        });
      }
    },
    /**
     * 统一跳转接口,拦截未登录路由
     * navigator标签现在默认没有转场动画，所以用view
     */
    navTo(url) {
      uni.navigateTo({
        url,
      });
    },
    // 关闭新人有礼
    gift_close() {
      this.close = false;
    },
    is_close() {
      this.isClose = false;
    },
    async gift_close_url() {
      if (toLogin() == true) {
        if (this.prompt.prompt_bonus_id > 0) {
          let image_url = this.prompt.prompt_image_url;
          const data = await SendBonusApi({
            bonus_id: this.prompt.prompt_bonus_id,
          });
          this.close = false;
          if (data.data.res == false) {
            uni.showToast({
              title: data.data.msg,
              icon: "none",
              duration: 1000,
              success: function () {
                setTimeout(function () {
                  uni.switchTab({
                    url: image_url,
                    fail: function () {
                      uni.navigateTo({
                        url: image_url,
                      });
                    },
                  });
                }, 1000);
              },
            });
          } else {
            uni.showToast({
              title: data.data.msg,
              icon: "none",
              duration: 1000,
              success: function () {
                setTimeout(function () {
                  uni.switchTab({
                    url: image_url,
                    fail: function () {
                      uni.navigateTo({
                        url: image_url,
                      });
                    },
                  });
                }, 1000);
              },
            });
          }
        } else {
          let image_url = this.prompt.prompt_image_url;
          uni.switchTab({
            url: this.prompt.prompt_image_url,
            fail: function () {
              uni.navigateTo({
                url: image_url,
              });
            },
          });
        }
      }
    },
  },
  created() {},
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>