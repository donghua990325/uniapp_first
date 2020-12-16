<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="false">
      <block slot="backText">返回</block>
      <block slot="content">购物车</block>
    </cu-custom>
    <div class="cart">
      <!--<div class="top">
      
          <div>30天无忧退货</div>
          <div>48小时快速退款</div>
          <div>满88元免邮费</div>
      
      </div>-->
      <div class="cartlist">
        <div
          class="item"
          @touchstart="startMove"
          @touchmove="deleteGoods"
          @touchend="endMove"
          :data-index="index"
          v-for="(item, index) in listData"
          :key="index"
        >
          <div class="con" :style="item.textStyle">
            <div class="left">
              <div
                class="icon"
                @click="changeColor(index, item.rec_id)"
                :class="[Listids[index] ? 'active' : '']"
              ></div>
              <div class="img">
                <img :src="item.goods_thumb" alt />
              </div>
              <div class="info">
                <p>{{ item.goods_name }}</p>
                <p class="small">{{ item.sku_str }}</p>
                <p>￥{{ item.goods_price }}</p>
              </div>
            </div>
            <div class="right">
              <span
                @click="countGoodsNumber(item, false)"
                :class="{ disabled: item.goods_number === 1 }"
                >-</span
              >
              <input
                @blur="
                  changeCartNumber(
                    item.goods_id,
                    item.goods_number,
                    item.product_id,
                    item.goods_number
                  )
                "
                type="number"
                v-model="item.goods_number"
              />
              <span @click="countGoodsNumber(item, true)">+</span>
            </div>
          </div>

          <div
            @click="delGoods(item.rec_id, index)"
            class="delete"
            :style="item.textStyle1"
          >
            <div>删除</div>
          </div>
        </div>
      </div>
      <div class="nogoods" v-if="listData.length == 0">
        <img
          src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/noCart.png"
          alt
        />
      </div>
	  <!-- 增加浏览商品 -->
	  <div class="font_center">——猜你喜欢——</div>
	  <div class="newgoods">
	    <div class="sortlist">
	      <div
	        @click="goodsDetail(item.id)"
	        v-for="(item, index) in historyGoods"
	        :key="index"
	        class="item"
	      >
	        <img v-if="item.img" :src="item.img" alt="" />
			<img v-if="item.goods_thumb" :src="item.goods_thumb" alt="" />
	        <p class="name">{{ item.goods_name }}</p>
	        <p class="price">¥{{ item.shop_price }}</p>
	      </div>
	    </div>
	  </div>
	  <!-- 增加浏览商品 -->
      <div class="fixed">
        <div @click="allCheck" :class="{ active: allcheck }" class="left">
          全选({{ isCheckedNumber }})
        </div>
        <div class="right">
          <div>￥{{ allPrise }}</div>
          <div @click="orderDown">下单</div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import {
  cartListApi,
  orderSubmitaction,
  cartUpdateNumApi,
  cartCheckApi,
  cartCheckAllApi,
  cartDelApi,
  recommendGoodsApi,
} from "@/server/config.js";
import { toLogin, getStorageUserInfo  } from "@/server/api.js";

export default {
  onShow() {
    if (getStorageUserInfo()) {
      this.getListData();
    }
	this.getCacheGoodsList()
  },
  created() {},
  data() {
    return {
      allPrise: "",
      allcheck: false,
      listData: [],
      Listids: [],
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
	  historyGoods: [],
    };
  },
  components: {},
  methods: {
    // 手动输入数量触发
    async changeCartNumber(goods_id, number, product_id, goods_number) {
      let yz_number = /^\d+$/;

      //    goods_number = goods_number.replace(/[^\d]/g, ''); // 清除“数字”和“.”以外的字符
      //    if (goods_number.indexOf('.') < 0 && goods_number != '') {
      //         // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      //        goods_number = parseInt(goods_number);
      //    }else{
      //   this.getListData();
      //   return false;
      // }

      if (number <= 0) {
        let _this = this;
        uni.showToast({
          icon: "none",
          duration: 1000,
          title: "数量不能小于等于0",
          success: function () {
            setTimeout(function () {
              _this.getListData();
            }, 1000);
          },
        });

        return false;
      }

      if (yz_number.test(number) === false) {
        uni.showToast({
          icon: "none",
          duration: 1000,
          title: "数量输入有误",
        });
        this.getListData();
        return false;
      }
      const data = await cartUpdateNumApi({
        number: number,
        goods_id: goods_id,
        product_id: product_id,
      });
      let _this = this;
      if (data.data.update_cart === false) {
        uni.showToast({
          icon: "none",
          title: data.data.msg,
          success: function (res) {
            setTimeout(function () {
              _this.getListData(); // 重新加载当前数据
            }, 1000);
          },
        });
        console.log(22222);
        return false;
      }
      this.getListData();
      this.allPrise = data.data.totalPrice;
    },
    // 商品数量加减
    async countGoodsNumber(goods, flag) {
      if (flag) {
        goods.goods_number++;
        // if(goods.goods_number>data.data.goods_list.goods_number){
        // 	// goods.goods_number = data.data.goods_list.goods_number;
        // 	// this.getListData();
        // }
      } else {
        if (goods.goods_number <= 1) {
          mpvue.showToast({
            title: "本商品1件起售",
            icon: "none",
            duration: 1500,
          });

          goods.goods_number = 1;
          return;
        }
        goods.goods_number--;
      }
      const data = await cartUpdateNumApi({
        number: goods.goods_number,
        goods_id: goods.goods_id,
        product_id: goods.product_id,
      });
      if (data.data.update_cart === false) {
        let _this = this;
        uni.showToast({
          icon: "none",
          title: data.data.msg,
          success: function (res) {
            setTimeout(function () {
              console.log(goods.goods_number);
              // goods.goods_number = 1; // 重新加载当前数据
              _this.getListData();
            }, 1000);
          },
        });
        return false;
      }

      //     uni.showToast({
      //       icon: "none",
      //       title: data.data.msg,
      // success() {

      // }
      //     });
      //     return false;
      //   }
      //   // console.log(data.totalPrice);
      this.getListData();
      this.allPrise = data.data.totalPrice;
    },
    async getCacheGoodsList() {
    	let historyGoods = uni.getStorageSync("historyGoods");
		if(historyGoods.length>=10){
			this.historyGoods = historyGoods;
		}else{
			// 调新接口recommendGoodsApi
			let his_length = 10
			if(historyGoods.length){
				his_length = 10 - historyGoods.length
			}
			const data = await recommendGoodsApi({
			  num:his_length,
			});
			if(historyGoods){
				this.historyGoods = historyGoods.concat(data.data)
			}else{
				this.historyGoods = data.data
			}
		}
    	
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
    deleteGoods(e) {
      //滑动之前先初始化样式数据
      this.initTextStyle();
      let index = e.currentTarget.dataset.index;
      // console.log(index);
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
        // transform:'translateX(' + tranX + 'rpx)'

        console.log(this.listData[index].textStyle);

        if (this.X + -100 > -100) {
          this.flag = false;
        }
        this.tranX1 = -100;
        this.listData[index].textStyle1 = `transform:translateX(-100rpx);`;
        console.log(this.listData[index].textStyle1);
        // this.listData = this.listData;
      }
      // if (Math.abs(this.X) > Math.abs(this.Y) && this.X > 20) {
      //   this.scrollflag = false;
      // } else if (Math.abs(this.X) > Math.abs(this.Y) && this.X < 20) {
      //   console.log("right 2 left");
      // }
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
    async orderDown() {
      // if (this.Listids.length == 0) {
      //判断商品金额
      if (this.allPrise == 0) {
        uni.showToast({
          title: "请选择商品",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      // 去掉数组中空的false的
      let newgoodsid = [];
      for (let i = 0; i < this.Listids.length; i++) {
        const element = this.Listids[i];
        if (element) {
          newgoodsid.push(element);
        }
      }
      uni.navigateTo({
        url: "/apiCart/order/main",
      });
    },
    delGoods(id, index) {
      let _this = this;
      uni.showModal({
        title: "",
        content: "是否要删除该商品",
        success: async function (res) {
          if (res.confirm) {
            _this.Listids.splice(index, 1);
            // _this.getListData();
            const data = await cartDelApi({
              id: id,
            });
            _this.getListData();
          } else if (res.cancel) {
            console.log("用户点击取消");
            //滑动之前先初始化样式数据
            this.initTextStyle();
          }
        },
      });
    },
    async getListData() {
      const data = await cartListApi({});
      if (data.data.info === false) {
        this.listData = [];
        this.allPrise = 0;
        this.Listids = [];
        return false;
      }
      for (let i = 0; i < data.data.info.goods_list.length; i++) {
        data.data.info.goods_list[i].textStyle = "";
        data.data.info.goods_list[i].textStyle1 = "";
      }
      if (data.data.hasOwnProperty("info")) {
        this.listData = data.data.info.goods_list;
        for (let key in this.listData) {
          if (this.listData[key].is_checked === "true") {
            this.Listids[key] = this.listData[key].goods_id;
          }else {
			  this.Listids[key] = '';
		  }
        }
      }
      if (!data.data.info) {
        this.listData = [];
        this.listData.length = 0;
        this.Listids.length = 0;
      } else {
        this.allPrise = data.data.info.total.check_goods_price;
      }
    },
    async allCheck() {
      //先清空
      this.Listids = [];
      if (this.allcheck) {
        this.allcheck = false;
        const data = await cartCheckAllApi({
          ischecked: 0,
        });
        this.allPrise = data.data.data.total.goods_price;

        console.log(data.data);
      } else {
        this.allcheck = true;
        //循环遍历所有的商品id
        for (let i = 0; i < this.listData.length; i++) {
          const element = this.listData[i];
          this.Listids.push(element.goods_id);
        }
        const data = await cartCheckAllApi({
          ischecked: 1,
        });
        this.allPrise = data.data.data.total.goods_price;
      }
    },
    change(e) {},
	//点击进入详情
	goodsDetail(id) {
	  uni.navigateTo({
	    url: "/apiShop/goods/main?id=" + id,
	  });
	},
    async changeColor(index, id) {
      console.info(index);
      console.info(id);
      if (this.Listids[index]) {
        this.$set(this.Listids, index, false);

        const data = await cartCheckApi({
          id: id,
          ischecked: 0,
        });
        this.allPrise = data.data.data.total.goods_price;
      } else {
        this.$set(this.Listids, index, id);

        const data = await cartCheckApi({
          id: id,
          ischecked: 1,
        });
        this.allPrise = data.data.data.total.goods_price;
      }
      console.log("---------");
      console.log(this.allPrise);
      console.log("===========");
    },
  },
  computed: {
    isCheckedNumber() {
      let number = 0;
      for (let i = 0; i < this.Listids.length; i++) {
        if (this.Listids[i]) {
          number++;
        }
      }
      if (number == this.listData.length && number != 0) {
        this.allcheck = true;
      } else {
        this.allcheck = false;
      }
      return number;
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
@import '../../apiShop/newgoodslist/style';
.newgoods{
	margin-bottom: 80rpx;
	.sortlist{
		.name{
			-webkit-box-orient: vertical;
			  display: -webkit-box;
			  line-clamp: 2;
			  -webkit-line-clamp: 2;
			  overflow: hidden;
			  text-overflow: ellipsis;
		}
	}
}
</style>
