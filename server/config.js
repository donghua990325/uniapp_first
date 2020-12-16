import { post } from './api.js';

//加接口之前必阅
//强迫症命名方式说明：文件名+接口简称+Api  例如 loginWechatApi（login Wechat Api）驼峰命名
//@Author:  i@jinjiajin.net @DateTime:  2019-02-23 23:04:23

//登录页1-微信登录
export const loginWechatApi = p => post('App.Passport.loginWechatApi', p);

//跳过手机号绑定
export const nextBingdingMobile = p => post('App.Passport.nextBingdingMobile', p);

//绑定手机号
export const bangdingMobile = p => post('App.Passport.bangdingMobile', p);

//是否显示手机号绑定
export const getSetting = p => post('App.Passport.getSetting', p);

//登录页2-微信登录绑定手机号(坑点发送的是注册短信，没有验证验证码)
export const bindingWechatApi = p => post('App.Passport.bindingWechatApi', p);

//登录页1-支付宝登录
export const loginAlipayApi = p => post('passport/loginAlipayApi', p);

//登录页2-支付宝登录绑定手机号(坑点发送的是注册短信，没有验证验证码)
export const bindingAlipayApi = p => post('passport/bindingAlipayApi', p);

//绑定手机号发送验证码(坑点发送的是注册短信，没有验证验证码)
export const bindingSendSmsApi = p => post('App.Tools.bindingSendSmsApi', p);

//手机验证码登录(坑点发送的是注册短信，没有验证验证码)(命名正确）
export const logincommonPhoneApi = p => post('App.Passport.logincommonPhoneApi', p);

//手机号登录发送验证码(坑点发送的是注册短信，没有验证验证码)
export const logincommonSendSmsApi = p => post('App.Tools.logincommonSendSmsApi', p);

//标准注册账号(坑点发送的是注册短信，没有验证验证码)
export const registerPhoneApi = p => post('App.Passport.registerPhoneApi', p);

//标准注册账号发送验证码(坑点发送的是注册短信，没有验证验证码)
export const registerSendSmsApi = p => post('App.Tools.registerSendSmsApi', p);

//找回密码(坑点发送的是注册短信，没有验证验证码)
export const forgetPhoneApi = p => post('App.Passport.forgetPhoneApi', p);

//找回密码发送验证码(坑点发送的是注册短信，没有验证验证码)
export const forgetSendSmsApi = p => post('App.Tools.forgetSendSmsApi', p);

//首页-全部数据
export const indexListApi = p => post('App.Index.indexListApi', p);

//引导页
export const indexGuidePagesApi = p => post('App.Index.indexGuidePagesApi', p);

//文章列表页-数据（下拉刷新）
export const topicListApi = p => post('App.Article.topicListApi', p);

//文章页-文章详情
export const topicdetailListApi = p => post('App.Article.topicdetailListApi', p);

//文章关联商品
export const getArticleGoodsApi = p => post('App.Article.getArticleGoodsApi', p);

//分类页-一级分类列表
export const categoryListApi = p => post('App.Category.categoryListApi', p);

//分类页-二级分类详情
export const categorySecondaryApi = p => post('App.Category.categorySecondaryApi', p);

//商品详情页-商品详情
export const goodsDetailActionApi = p => post('App.Goods.goodsDetailActionApi', p);
//获取 商品兑换积分
export const getGoodsintegral = p => post('App.Goods.getGoodsintegral', p);
//获取用户可用积分
export const getPayPointsApi = p => post('App.Goods.getPayPointsApi', p);
//超值礼包列表
export const SuperPackageApi = p => post('App.Goods.SuperPackageApi', p);

//这个带有筛选功能，通过首页里面的广告位点击进入
//新版二级分类商品列表页-商品列表数据 做为标签页使用 (无刷新加载商品已实现)
export const newgoodsGoodsListApi = p => post('App.Goods.newgoodsGoodsListApi', p);

//积分商品列表
export const integralgoodsGoodsListApi = p => post('App.Goods.integralgoodsGoodsList', p);

//扫码购接口(已完成)（命名正确）----
export const scancodeSaveApi = p => post('goods/scancodeSaveApi', p);

//购物车页-数据
export const cartListApi = p => post('App.Cart.cartListApi', p);

//购物车页-修改数据
export const cartUpdateNumApi = p => post('App.Cart.cartUpdateNumApi', p);

//购物车页-部分勾选
export const cartCheckApi = p => post('App.Cart.cartCheckApi', p);

//购物车页-全选
export const cartCheckAllApi = p => post('App.Cart.cartCheckAllApi', p);

//购物车页-删除商品
export const cartDelApi = p => post('App.Cart.cartDelApi', p);

//购物车页-购物车下面显示浏览商品
export const recommendGoodsApi = p => post('App.Goods.recommendGoods', p);

//订单确认页-数据
export const orderDetailListApi = p => post('App.Order.orderDetailListApi', p);
//物流跟踪
export const LogisticsInfoApi = p => post('App.Order.LogisticsInfoApi', p);

//优惠活动
export const getDiscountApi = p => post('App.Order.getDiscountApi', p);

//截单
export const getOrderEndApi = p => post('App.Order.getOrderEndApi', p);

//商品包装
export const packageListApi = p => post('App.Order.packageListApi', p);

//订单确认页-数据
export const shippingListApi = p => post('App.Shipping.shippingListApi', p)

//商品详情页-商品添加至购物车
export const goodsAddCartApi = p => post('App.Cart.goodsAddCartApi', p);

//商品详情页-商品添加至购物车
export const goodsAddCartFastApi = p => post('App.Cart.goodsAddCartFastApi', p);

//超值礼包添加购物车
export const AddPackageCartApi = p => post('App.Cart.AddPackageCartApi', p);

//商品详情页-商品加入收藏
export const goodsAddCollectApi = p => post('App.User.goodsAddCollectApi', p);

//用户领取红包
export const SendBonusApi = p => post('App.User.SendBonusApi', p);

//二级分类商品列表页-二级分类数据
export const categorylistNavListApi = p => post('App.Category.categorylistNavListApi', p);

//二级分类商品列表页-商品列表数据 (无刷新加载商品已实现)
export const categorylistGoodsListApi = p => post('App.Category.categorylistGoodsListApi', p);

//会员中心页-我的收藏(无刷新加载商品已实现)
export const collectlistActionApi = p => post('App.User.collectlistActionApi', p);

//会员中心页-我的全部地址
export const addressGetListApi = p => post('App.User.addressGetListApi', p);

//订单确认页-地址修改(两处调用)
export const addaddressDetailActionApi = p => post('App.User.addaddressDetailActionApi', p);

//订单确认页-地址修改(两处调用)
export const addressDetailApi = p => post('App.User.addressDetailApi', p);
//经纬度获取位置信息
export const GetRealyAddressApi = p => post('App.User.GetRealyAddressApi', p);


//删除地址
export const addressDeleteApi = p => post('App.User.addressDeleteApi', p);

//默认地址
export const orderDefaultAddressApi = p => post('App.User.orderDefaultAddressApi', p);

//删除红包
export const deleteCouponApi = p => post('App.User.deleteCouponApi', p);

//品牌列表页
export const brandlistActionApi = p => post('App.Brand.brandlistActionApi', p);

//品牌商品列表页-商品数据
export const brandDetaiLactionApi = p => post('App.Brand.brandDetaiLactionApi', p);

//意见反馈
export const feedbackSubmitActionApi = p => post('App.User.feedbackSubmitActionApi', p);

//搜索页数据
export const searchIndexActionApi = p => post('App.Search.searchIndexActionApi', p);

//商品关键词搜索
export const searchHelperApi = p => post('App.Search.searchHelperApi', p);

//订单确认-发票选择页
export const taxListApi = p => post('App.Order.taxListApi', p);

//用户优惠券列表(待测试)
export const couponListApi = p => post('App.User.couponListApi', p);

//订单列表
export const orderlistActionApi = p => post('App.Order.orderlistActionApi', p);

//提交订单页
export const orderSaveCartApi = p => post('App.Order.orderSaveCartApi', p);
//订单配送时间
export const GetDeliveryTimeApi = p => post('App.Order.GetDeliveryTimeApi', p);
//判断订单配送剩余数量
export const DeliveryTimeApi = p => post('App.Order.DeliveryTimeApi', p);

//订单支付页
export const payDetailApi = p => post('App.Pay.payDetailApi', p);

//获取所有支付方式
export const getPaymentListApi = p => post('App.Pay.getPaymentListApi', p)

// 预存款支付
export const doPaymentBalanceApi = p => post('App.Pay.doPaymentBalanceApi', p);

//云卡通支付
export const payCardApi = p => post('App.Pay.payCardApi', p);

//订单详情(部分需要测试)
export const orderdetailGetApi = p => post('App.Order.orderdetailGetApi', p);

//帮助中心文章
export const myHelpTopicApi = p => post('article/myHelpTopicApi', p);

//充值记录
export const advancelistActionApi = p => post('App.User.advancelistActionApi', p);

//充值  钱包余额
export const depositApi = p => post('App.User.depositApi', p);

//积分记录
export const pointListApi = p => post('App.User.pointListApi', p);

//会员信息
export const memberInfoApi = p => post('App.User.memberInfoApi', p);

//个人中心 
export const getMemberApi = p => post('App.User.getMemberApi', p);

//账号密码登录
export const logincommonAccountApi = p => post('App.Passport.logincommonAccountApi', p);

//会员信息
export const checkLoginApi = p => post('App.Passport.checkLoginApi', p);

//商品评论  
export const goodsdetailGetApi = p => post('App.Comment.goodsdetailGetApi', p);

//商品评论添加 
export const addGoodsCommentApi = p => post('App.Comment.addGoodsCommentApi', p);

//提交订单售后
export const submitAfterSaleApi = p => post('App.Order.submitAfterSaleApi', p);

//取消订单
export const cancelOrderApi = p => post('App.Order.cancelOrderApi', p);

//确认收货
export const receiveOrderApi = p => post('App.Order.receiveOrderApi', p);

//万能支付
export const payDopaymentApi = p => post('App.Pay.payDopaymentApi', p);

//售后详情
export const aftersaleGetDetailApi = p => post('aftersales/aftersaleGetDetailApi', p);

//添加售后单
export const aftersaleAddApi = p => post('aftersales/aftersaleAddApi', p);

//添加售后单
export const aftersaledeliveryAddAfterApi = p => post('aftersales/aftersaledeliveryAddAfterApi', p);

//售后单列表
export const aftersalelistActionApi = p => post('App.Order.aftersalelistActionApi', p);

//评论列表
export const userjudgeCommentListApi = p => post('App.Goods.userjudgeCommentListApi', p);

//商品优惠
export const GoodsDiscountApi = p => post('App.Goods.GoodsDiscountApi', p);

//会员信息显示
export const memberinfoActionApi = p => post('setting/memberinfoActionApi', p);

//会员信息保存
export const memberinfoSaveApi = p => post('App.User.memberinfoSaveApi', p);

//修改密码发送验证码
export const securitypwdSendSmsApi = p => post('App.Tools.securitypwdSendSmsApi', p);

//修改密码
export const securitypwdUpdateApi = p => post('App.User.securitypwdUpdateApi', p);

//发送验证码，会员修改绑定手机号
export const securityphoneSendBeforeApi = p => post('App.Tools.securityphoneSendBeforeApi', p);

//验证，会员修改绑定手机号前
export const securityphoneUpdateBeforeApi = p => post('App.User.securityphoneUpdateBeforeApi', p);

//验证，会员修改绑定手机号后
export const securityphoneUpdateAfterApi = p => post('App.User.securityphoneUpdateAfterApi', p);

// 支付宝APP支付
export const doPaymentAliAppAPi = p => post('App.Pay.doPaymentAliAppAPi', p);

// 余额充值的订单创建
export const createOrderApi = p => post('App.Pay.createOrderApi', p);

// 检测该微信是否已注册
export const checkWechatRegApi = p => post('App.Passport.checkWechatRegApi', p);

//随机购
export const casualPurchaseApi = p => post('App.Goods.casualPurchaseApi', p);

//登录页logo加载
export const loginLogo = p => post('App.User.logo', p);
//分享页面，获取二维码
export const GetPromoteApi = p => post('App.User.GetPromoteApi', p);

//一级菜单加载
export const shippingListTopApi = p => post('App.shipping.shippingListTopApi', p);

//二级菜单加载
export const shippingListBottomApi = p => post('App.shipping.shippingListBottomApi', p);

// 商品拼团购买
export const getGoodsPintuanApi = p => post('App.Goods.getGoodsPintuanApi', p);

// 商品拼团列表
export const pintuanListApi = p => post("App.Goods.pintuanListApi", p);

//限时秒杀订单
export const getGoodSpikeApi = p => post("App.Goods.getGoodSpikeApi", p);

//激活红包
export const activeBonusApi = p => post('App.User.activeBonusApi', p);

//支付方式开关
export const getPaymentIsUseApi = p => post('App.Pay.getPaymentIsUseApi', p);

//H5微信登录
export const getWxAuthApi = p => post('App.Passport.getWxAuthApi', p);

//微信登录获取的信息
export const getWXUserInfoApi = p => post('App.Passport.getWXUserInfoApi', p);

//微信内置浏览器H5支付
export const wechatPayApi = p => post('App.Pay.wechatPayApi', p);

//获取推广信息排名
export const getPromoteNumApi = p => post('App.User.getPromoteNumApi', p);

//获取下级用户分销明细
export const lowerCommissionApi = p => post('App.User.lowerCommissionApi', p);
//获取用户提现信息
export const getUserAccountApi = p => post('App.User.getUserAccountApi', p);
//发起提现申请
export const withdrawalApi = p => post('App.User.withdrawalApi', p);

// 直播信息获取
export const getLiveSettingsApi = p => post('App.Tools.getLiveListApi', p);

//拼团的所有商品
export const pintuanGoodsListApi = p => post('App.Goods.pintuanGoodsListApi', p);

//新品所有商品
export const spikeGoodsListApi = p => post('App.Goods.spikeGoodsListApi', p);

//人气推荐商品
export const hotGoodsListApi = p => post('App.Goods.hotGoodsListApi', p);

//秒杀的商品
export const miaoshaGoodsListApi = p => post('App.Goods.miaoshaGoodsListApi', p);

// 微信APP登录
export const wechatAppLogin = p => post('App.Passport.wechatAppLogin', p);