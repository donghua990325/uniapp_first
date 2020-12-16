<template>
	<view>
		<!--  #ifdef  MP-WEIXIN -->
		<scroll-view scroll-y="true" @scroll="scroll" class="scroll">
			<view class="top-bar" :style="{ opacity: opacity }"></view>
			<!--  #endif -->
			<view class="container">
				<view class="user-section">
					<image class="bg" src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/user-bg.png"></image>
					<view class="user-info-box" @click="navTo('/apiMember/memberinfo/main')">
						<view class="portrait-box">
							<image class="portrait" :src="avator"></image>
						</view>
						<view class="info-box">
							<text class="username">{{ userInfo.nickName || "请登录" }}</text>
						</view>
					</view>

					<view class="vip-card-box">
						<image class="card-bg" src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/vip-card-bg.png" mode=""></image>
						<view class="b-btn" v-if="statuslv === 'formallv'"> 查看信息 </view>
						<view class="tit">
							<text class="yticon icon-iLinkapp-"></text>
							{{ rank_name.rank_name }}
						</view>
						<text class="e-m">等级优惠</text>
						<text class="e-b">当前等级享受：{{ rank_name.discount }} 折的购物优惠</text>
					</view>
				</view>
				<view class="cover-container" :style="[
            {
              transform: coverTransform,
              transition: coverTransition,
            },
          ]"
				 @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
					<image class="arc" src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/arc.png"></image>

					<view class="tj-sction">
						<view class="tj-item" @click="navTo('/apiMember/advancelist/main')">
							<text class="num">{{ advance }}</text>
							<text>余额</text>
						</view>
						<view class="tj-item" @click="navTo('/apiMember/coupon/main')">
							<text class="num">{{ couponNum }}</text>
							<text>红包</text>
						</view>
						<view class="tj-item" @click="navTo('/apiMember/point/main')">
							<text class="num">{{ point }}</text>
							<text>积分</text>
						</view>
					</view>
					<!-- 订单1 -->
					<view class="all-line">
						<view class="name">我的订单</view>
						<view class="all" @click="navTo('/apiMember/orderlist/main?status=0')">查看全部订单></view>
					</view>
					<view class="order-section">
						<!-- <view
              class="order-item"
              @click="navTo('/apiMember/orderlist/main?status=0')"
              hover-class="common-hover"
              :hover-stay-time="50"
            >
              <div
                class="faker"
                v-if="sup.a == 0"
              >{{sup.a}}</div>
              <div
                class="sup"
                v-if="sup.a != 0 && sup.a <= 99 "
              >{{sup.a}}</div>

              <div
                class="sup"
                v-if="sup.a > 99"
              >{{99+'+'}}</div>

              <text class="yticon icon-quanbudingdan"></text>
              <text>全部订单</text>
            </view> -->
						<view class="order-item" @click="navTo('/apiMember/orderlist/main?status=1')" hover-class="common-hover"
						 :hover-stay-time="50">
							<div class="faker" v-if="waitPayNum == undefined">0</div>

							<div class="sup" v-if="waitPayNum != undefined && waitPayNum <= 99">
								{{ waitPayNum }}
							</div>

							<div class="sup" v-if="waitPayNum > 99">{{ 99 + "+" }}</div>

							<text class="yticon icon-dengdaifukuan"></text>
							<text>待付款</text>
						</view>
						<view class="order-item" @click="navTo('/apiMember/orderlist/main?status=2')" hover-class="common-hover"
						 :hover-stay-time="50">


							<div class="faker" v-if="waitFhNum == undefined">0</div>
							<div class="sup" v-if="waitFhNum != undefined">{{waitFhNum}}</div>

							<!--  <div class="faker" v-if="waitRecNum == undefined">0</div>
              <div class="sup" v-if="waitRecNum != undefined">
                {{ waitRecNum }}
              </div> -->


							<text class="yticon icon-daishouhuo"></text>
							<text>待发货</text>
						</view>
						<view class="order-item" @click="navTo('/apiMember/orderlist/main?status=3')" hover-class="common-hover"
						 :hover-stay-time="50">
							<div class="faker" v-if="waitRecNum == undefined">0</div>
							<div class="sup" v-if="waitRecNum != undefined">
								{{ waitRecNum }}
							</div>

							<text class="yticon icon-daishouhuo"></text>
							<text>待收货</text>
						</view>
						<view class="order-item" @click="navTo('/apiMember/orderlist/main?status=4')" hover-class="common-hover"
						 :hover-stay-time="50">
							<div class="faker"></div>
							<text class="yticon icon-tianjiapinglun"></text>
							<text>待评价</text>
						</view>
						<view class="order-item" @click="navTo('/apiMember/orderlist/main?status=5')" hover-class="common-hover"
						 :hover-stay-time="50">
							<div class="faker" v-if="sup.d == 0">0</div>
							<div class="sup" v-if="sup.d != 0">{{ sup.d }}</div>

							<text class="yticon icon-refund"></text>
							<text>退款/售后</text>
						</view>
					</view>

					<!-- 订单2 -->
					<!-- <view class="order-section">
            <view
              class="order-item"
              @click="navTo('/apiMember/orderlist/main?status=6')"
              hover-class="common-hover"
              :hover-stay-time="50"
            >
              <div class="faker"></div>
              <text class="yticon icon-miaosha"></text>
              <text>秒杀</text>
            </view>
            <view
              class="order-item"
              @click="navTo('/apiMember/orderlist/main?status=7')"
              hover-class="common-hover"
              :hover-stay-time="50"
            >
              <div class="faker"></div>
              <text class="yticon icon-pintuan3"></text>
              <text>拼团</text>
            </view>
            <view
              class="order-item"
              @click="navTo('/apiMember/orderlist/main?status=5')"
              hover-class="common-hover"
              :hover-stay-time="50"
            >

              <div
                class="faker"
                v-if="sup.d == 0"
              >0</div>
              <div
                class="sup"
                v-if="sup.d != 0"
              >{{sup.d}}</div>

              <text class="yticon icon-refund"></text>
              <text>退款/售后</text>
            </view>
            <view
              class="order-item"
              @click="navTo('/apiMember/aftersalelist/main')"
              hover-class="common-hover"
              :hover-stay-time="50"
            >
              <div
                class="faker"
                v-if="sup.d == 0"
              >0</div>
              <div
                class="sup"
                v-if="sup.d != 0"
              >{{sup.d}}</div>
              <text class="yticon icon-weixiu"></text>
              <text>售后管理</text>

            </view>
          </view> -->
					<!-- 浏览历史 -->
					<view class="history-section icon">
						<view class="sec-header">
							<text class="yticon icon-lishi"></text>
							<text>浏览历史</text>
						</view>
						<scroll-view scroll-x class="h-list">
							<image v-for="(item, index) in historyGoods" @click="goodsDetail(item.id)" :src="item.img" :key="index" mode="aspectFill"></image>
						</scroll-view>
						<list-cell icon="icon-qianbao" iconColor="#e07472" title="我的钱包" @eventClick="navTo('/apiMember/deposit/main')"></list-cell>
						<list-cell icon="icon-jifenduihuan" iconColor="#54b4ef" title="积分兑换" @eventClick="navTo('/apiShop/integralgoods/main')"></list-cell>
						<list-cell icon="icon-qianbao" iconColor="#e07472" title="超值礼包" @eventClick="navTo('/apiShop/superpackage/main')"></list-cell>
						<list-cell icon="icon-libao" iconColor="#e07472" title="红包激活" border="" @eventClick="navTo('/apiMember/bonus/main')"></list-cell>
						<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/apiCart/address/main')"></list-cell>
						<!--  #ifdef  MP -->
						<button style="background-color: #fff" class="share" hover-class="none" open-type="share" value>
							<list-cell icon="icon-fenxiang" iconColor="#9789f7" title="分享" tips="邀请好友赢10万大礼"></list-cell>
						</button>
						<button style="background-color: #fff" class="share" hover-class="none" @click="ceshi" value>
							<list-cell icon="icon-fenxiang" iconColor="#9789f7" title="测试" tips="10万大礼"></list-cell>
						</button>
						<!--  #endif -->
						<list-cell icon="icon-fenxiaodingdanbiaoshi" iconColor="#54b4ef" title="我的下级" @eventClick="navTo('/apiMember/agent/main')"></list-cell>
						<!--  #ifdef  H5 -->
						<list-cell icon="icon-fenxiang" iconColor="#9789f7" title="分享" tips="邀请好友赢大礼" @eventClick="navTo('/apiMember/promote/main')"></list-cell>
						<!--  #endif -->
						<!--  #ifdef  APP-PLUS -->
						<list-cell icon="icon-fenxiang" iconColor="#9789f7" title="分享" tips="邀请好友赢大礼" @eventClick="navTo('/apiMember/promote/main')"></list-cell>
						<!--  #endif -->
						<list-cell icon="icon-shoucang" iconColor="#54b4ef" title="我的收藏" @eventClick="navTo('/apiMember/collectlist/main')"></list-cell>
						<!--  #ifdef  MP-WEIXIN -->
						<button class="btn" open-type="contact" bindcontact="handleContact">
							<list-cell icon="icon-shouye" iconColor="#ee883b" title="联系客服">
							</list-cell>
						</button>
						<!--  #endif -->
						<!--  #ifdef  H5 || APP-PLUS -->
						<button class="btn shadow" @tap="showModal" data-target="Modal">
							<list-cell icon="icon-shouye" iconColor="#ee883b" title="联系客服"></list-cell>
						</button>
						<!--  #endif -->
						<list-cell icon="icon-shezhi_" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/apiMember/set/main')"></list-cell>
					</view>
				</view>

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
			<!--  #ifdef  MP-WEIXIN -->
		</scroll-view>
		<!--  #endif -->
	</view>
</template>

<script>
	import statusBar from "@/components/statusBar/statusBar.vue";
	import {
		toLogin,
		getStorageUserInfo,
		getStorageMemberId,
	} from "@/server/api.js";
	import {
		myHelpTopicApi,
		memberInfoApi,
		GetPromoteApi,
	} from "@/server/config.js";
	import listCell from "@/components/mix-list/mix-list-cell.vue";
	import Jfooter from "@/components/footer/footer.vue";
	import share from "@/common/share.js";

	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		onShow() {
			if (!toLogin()) {
				return false;
			}
			this.getData();

			// this.checkLogin;
			
			this.userInfo = getStorageUserInfo();
			console.log(this.userInfo);
			console.log("=============");
			console.log(JSON.stringify(getStorageUserInfo()));
			this.avator = this.userInfo.avatarUrl;
			this.getMemberInfo();
			this.getCacheGoodsList();
		},
		//商品转发
		onShareAppMessage() {
			console.log(this.url);
			let path = this.url;
			path = path.split("?")[1];
			console.log("/apiPam/login/main?" + path);
			return {
				// title: info.goods_name,
				path: "/apiPam/login/main?" + path,
				// imageUrl: this.gallery[0] //拿第一张商品的图片
			};
		},
		components: {
			listCell,
		},
		data() {
			return {
				opacity: 0,
				qq: 875358601,
				coverTransform: "translateY(0px)",
				coverTransition: "0s",
				moving: false,
				avator: "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/missing-face.png",
				allcheck: false,
				Listids: [],
				historyGoods: [],
				point: 0,
				modalName: null,
				couponNum: 0,
				advance: 0.0,
				kefu_tel: "18888888888",
				userInfo: {},
				sup: {
					a: 0,
					b: 0,
					c: 0,
					d: 0,
					e: 0
				},
				statuslv: "registerlv",
				rank_name: "", // 会员等级名称
				waitPayNum: 0, // 待付款数量
				waitRecNum: 0, // 待收货数量
				waitFhNum: 0, //待发货数量
				url: "" //分享链接

			};
		},
		onLoad() {},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo("/apiMember/set/main");
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index,
				});
				// #endif
				uni.switchTab({
					url: "/pages/topic/main",
				});
			}
		},
		// #endif
		computed: {
			// ...mapState(['hasLogin','userInfo'])
		},
		methods: {
			ceshi(){
				uni.navigateTo({
					url: "/apiShop/goods/main",
				});
			},
			scroll(e) {
				this.opacity = e.detail.scrollTop / 100;
				if (this.opacity >= 1) {
					this.opacity = 1;
				}
			},
			async getData() {
				console.log("URL的方法");
				const data = await GetPromoteApi({});
				this.url = data.data.url;
				var code_url = data.data.code_url;
			},

			gotoLogin() {
				if (!this.userInfo.avatarUrl) {
					toLogin();
				}
			},
			goodsDetail(id) {
				console.log(id);
				uni.navigateTo({
					url: "/apiShop/goods/main?id=" + id,
				});
			},
			getCacheGoodsList() {
				let historyGoods = uni.getStorageSync("historyGoods");
				this.historyGoods = historyGoods;
			},
			async getMemberInfo() {
				const data = await memberInfoApi({
					user_id: uni.getStorageSync("user_id"),
				});
				if (data.data.res === true) {
					this.point = data.data.info.point;
					this.advance = data.data.info.advance;
					this.couponNum = data.data.info.couponNum;
					this.sup = data.data.allOrderNum;
					this.statuslv = data.data.statuslv;
					this.rank_name = data.data.rank_name;
					if (data.data.kefu_tel) {
						this.kefu_tel = data.data.kefu_tel.val;
					}
					this.waitPayNum = this.sup.b; // 待付款数量
					this.waitRecNum = this.sup.c; // 待收货数量
					this.waitFhNum = this.sup.e; //待发货数量
					uni.setStorageSync("point", this.point);
					uni.setStorageSync("advance", this.advance); // 余额
					console.log(this.couponNum);
					console.log("历史：" + this.historyGoods);
					console.log(uni.getStorageSync("historyGoods") + "历史");
				}
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (toLogin()) {
					uni.navigateTo({
						url,
					});
				}
			},
			showModal(e) {
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
			kefu() {
				//#ifdef APP-PLUS
				// uni.showModal({
				//   title: "客服QQ",
				//   content: this.qq.toString(),
				//   confirmText: "打开QQ",
				//   success: function(res) {
				//     if (res.confirm) {
				//       plus.runtime.openURL(
				//         "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" +
				//           this.qq +
				//           "&card_type=person&source=sharecard",
				//         function(res) {
				//           // console.log(res);
				//         }
				//       );
				//     } else if (res.cancel) {
				//       console.log("用户点击取消");
				//     }
				//   }
				// });
				//#endif
			},
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = "transform .1s linear";
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}

				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = "transform 0.3s cubic-bezier(.21,1.93,.53,.64)";
				this.coverTransform = "translateY(0px)";
			},
		},
	};
</script>
<style lang='scss' scoped>
	@import "./style";
</style>
