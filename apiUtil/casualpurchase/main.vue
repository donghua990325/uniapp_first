<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">随心购</block>
    </cu-custom>
    <view
      class="page"
      :style="{ height: `${sysHeight}px`, width: `${sysWidth}px` }"
    >
      <!-- #ifndef APP-PLUS -->
      <movable-area
        class="move-area"
        :style="{
          height: `${3 * sysHeight}px`,
          width: `${3 * sysWidth}px`,
          top: `${-sysHeight}px`,
          left: `${-sysWidth}px`,
        }"
      >
        <movable-view
          id="move"
          class="move-view"
          v-for="(item, index) in dataList"
          :key="item._id"
          :style="{ zIndex: `${99999 - item._id}` }"
          direction="all"
          :x="item.moveX"
          :y="item.moveY"
          out-of-bounds
          v-if="index <= number"
          :disabled="index != 0"
          :animation="item.animation"
          @tap="tapCard(item)"
          @touchend="touchend"
          @touchmove="touchMove"
          @touchstart="touchStart"
        >
          <view
            class="cardBox"
            :animation="animationData[index]"
            :style="{
              transform:
                index < number
                  ? `rotate(${rotate * index}deg) scale(${
                      1 - (1 - scale.x) * index
                    },${1 - (1 - scale.y) * index}) skew(${
                      skew.x * index
                    }deg, ${skew.y * index}deg) translate(${
                      translate.x * index
                    }px, ${translate.y * index}px)`
                  : `rotate(${rotate * (number - 1)}deg) scale(${
                      1 - (1 - scale.x) * (number - 1)
                    },${1 - (1 - scale.y) * (number - 1)}) skew(${
                      skew.x * (number - 1)
                    }deg, ${skew.y * (number - 1)}deg) translate(${
                      translate.x * (number - 1)
                    }px, ${translate.y * (number - 1)}px)`,
              opacity:
                index < number
                  ? `${1 - (1 - opacity) * index}`
                  : `${1 - (1 - opacity) * (number - 1)}`,
            }"
          >
            <card-box
              :goods_id="item.goods_id"
              :src="item.src"
              :address="item.address"
              :goods_name="item.goods_name"
              :shop_price="item.shop_price"
              :number="item.number"
              :heat_number="item.heat_number"
              :goods_number="item.goods_number"
              ref="cardBox"
            >
            </card-box>
          </view>
        </movable-view>
      </movable-area>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS -->
      <view
        v-if="index <= number"
        class="move-view"
        :key="item._id"
        @touchend="touchend"
        @tap="tapCard(item)"
        v-for="(item, index) in dataList"
        @touchmove="touchMove"
        @touchstart="touchStart"
        :animation="animationData[index]"
        :style="{
          transform:
            index < number
              ? `rotate(${rotate * index}deg) scale(${
                  1 - (1 - scale.x) * index
                },${1 - (1 - scale.y) * index}) skew(${skew.x * index}deg, ${
                  skew.y * index
                }deg) translate(${translate.x * index}px, ${
                  translate.y * index
                }px)`
              : `rotate(${rotate * (number - 1)}deg) scale(${
                  1 - (1 - scale.x) * (number - 1)
                },${1 - (1 - scale.y) * (number - 1)}) skew(${
                  skew.x * (number - 1)
                }deg, ${skew.y * (number - 1)}deg) translate(${
                  translate.x * (number - 1)
                }px, ${translate.y * (number - 1)}px)`,
          zIndex: `${99999 - item._id}`,
          opacity:
            index < number
              ? `${1 - (1 - opacity) * index}`
              : `${1 - (1 - opacity) * (number - 1)}`,
        }"
      >
        <view class="cardBox">
          <card-box
            :goods_id="item.goods_id"
            :src="item.src"
            :address="item.address"
            :goods_name="item.goods_name"
            :shop_price="item.shop_price"
            :number="item.number"
            :heat_number="item.heat_number"
            :goods_number="item.goods_number"
            ref="cardBox"
          >
          </card-box>
        </view>
      </view>
      <!-- #endif -->
    </view>
  </view>
</template>

<script>
import { casualPurchaseApi } from "@/server/config.js";
import clCardDel from "@/components/cl-cardDel/cl-cardDel";
import cardBox from "./card-box";
export default {
  mixins: [clCardDel],
  components: { cardBox },
  data() {
    return {};
  },
  onLoad() {},
  mounted() {},
  methods: {
    //设置初始参数
    init() {
      this.number = 3; //card 3
      this.translate = { x: 0, y: 8 }; //y下移10px
      this.scale = { x: 0.95, y: 1 }; //x 缩小0.9
      this.type = true;

      this.moveRotate = {
        //设置位移图片旋转角度距离  card中心点 - 指向坐标
        x: 0,
        y: uni.getSystemInfoSync().screenHeight,
      };
    },
    //获取数据
    async getData() {
      console.log(123123123);
      const data = await casualPurchaseApi({});
      let dataGroup = [];
      for (let item of data.data) {
        dataGroup.push({
          goods_id: Number(item.goods_id),
          src: item.url,
          address: "CCC制造商",
          goods_name: item.goods_name,
          shop_price: "￥" + item.shop_price,
          number: 1,
          heat_number: Number(item.heat_number),
          goods_number: "库存：" + item.goods_number,
        });
      }

      this.dataList = [...this.dataList, ...dataGroup];
    },
    //触摸中判断
    moveJudge(x, y, ratio) {
      let el = this.$refs.cardBox[0];

      if (x > 20) {
        el.moveRight(ratio);
      } else if (x < -20) {
        el.moveLeft(ratio);
      } else {
        el.moveCenter();
      }
    },
    //触摸结束判断
    endJudge(x, y) {
      let el = this.$refs.cardBox[0];
      if (Math.abs(x) < 40) {
        this._back();
        el._back();
      } else {
        this._del();
        el.clearAnimation();
      }
    },
    //删除card时
    delCard(x, y) {
      if (x > 0) {
        console.log(this.dataList[0], "喜欢");
      } else {
        console.log(this.dataList[0], "不喜欢");
      }
    },
    tapCard(item) {
      console.log(item, "点击");
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + item.goods_id,
      });
    },
  },
};
</script>


<style lang='scss' scoped>
@import "./style";
</style>

