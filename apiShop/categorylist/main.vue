<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">分类列表</block>
    </cu-custom>
    <div class="categoryList">
      <scroll-view scroll-x="true" :scroll-left="scrollLeft" class="head">
        <div
          @click="changeTab(index, item.id)"
          :class="[nowIndex == index ? 'active' : '']"
          v-for="(item, index) in navData"
          :key="index"
        >
          {{ item.name }}
        </div>
      </scroll-view>
      <div class="info">
        <p>{{ currentNav.name }}</p>
        <p>{{ currentNav.front_desc }}</p>
      </div>
      <div class="sortnav">
        <div
          @click="filterchangeTab(0)"
          :class="[0 == nowIndex_filter ? 'active' : '']"
        >
          综合
        </div>
        <div
          @click="filterchangeTab(1)"
          class="price"
          :class="[1 == nowIndex_filter ? activeClass : '']"
        >
          价格
        </div>
        <div
          @click="filterchangeTab(2)"
          class="price"
          :class="[2 == nowIndex_filter ? activeClass : '']"
        >
          销量
        </div>
      </div>
      <div class="list" v-if="goodsList.length != null">
        <div
          @click="goodsDetail(item.id)"
          class="item"
          v-for="(item, index) in goodsList"
          :key="index"
        >
          <img :src="item.list_pic_url" alt="" />
          <div class="goods-name">
            <div class="name">{{ item.name }}</div>
          </div>
          <p
            v-if="item.show_marketprice == '1'"
            style="text-decoration: line-through"
          >
            ￥{{ item.market_price }}
          </p>
          <p class="price">￥{{ item.retail_price }}</p>
          <span>已售：{{ item.virtual_sales }}</span>
        </div>
      </div>
      <div v-else class="none">数据库暂无数据...</div>
    </div>
  </view>
</template>

<script>
import {
  categorylistNavListApi,
  categorylistGoodsListApi,
} from "@/server/config.js";

export default {
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.pagetotal) {
      return false;
    }
	if(this.type==''){
		this.getAllData();
	}else if(this.type = "name"){
		this.filterchangeTab(0)
	}else if(this.type = "price"){
		this.filterchangeTab(1)
	}else if(this.type = "sales"){
		this.filterchangeTab(2)
	}
  },
  created() {},
  onUnload() {},
  onLoad(options) {
    this.id = options.id;
  },
  mounted() {
    //获取页面传的参数
    this.categoryId = this.id;
    this.getAllData(true);
    uni.removeStorageSync("s_cat_id");
  },
  data() {
    return {
      page: 1,
      pagetotal: "",
      categoryId: "",
      s_cat_id: "",
      activeClass: "",
      order: "",
      type: "",
      nowIndex: 0,
      nowIndex_filter: 0,
      goodsList: [],
      navData: [],
      currentNav: {},
      scrollLeft: 0,
    };
  },
  components: {},
  methods: {
    async changeTab(index, id) {
      this.nowIndex = index;
      this.page = 1;
      uni.setStorageSync("s_cat_id", id);
      const listdata = await categorylistGoodsListApi({
        cat_id: id,
		order: this.order,
        page: this.page,
      });
      this.goodsList = listdata.data.data;
      this.pagetotal = listdata.data.pagetotal;
      this.currentNav = listdata.data.currentNav;
      //需要让导航滚动到可见区域
      if (this.nowIndex > 4) {
        this.scrollLeft = this.nowIndex * 60;
      }
    },
    async filterchangeTab(index) {
      this.nowIndex_filter = index;
      // this.page = 1;
      if (uni.getStorageSync("s_cat_id")) {
        this.s_cat_id = uni.getStorageSync("s_cat_id");
      } else {
        this.s_cat_id = this.categoryId;
      }
	  if (index == 0) {
        // this.page = 1;
        this.type = "name";
		this.order = "asc"
		// this.active = this.order;
		//this.activeClass = this.order + 'active' : '';
	  }
      else if (index == 1) {
        this.order = this.order == "asc" ? "desc" : "asc";
        // this.page = 1;
        this.type = "price";
        this.activeClass == "";
        this.activeClass = this.order + " active";
      } else if (index == 2) {
        this.order = this.order == "asc" ? "desc" : "asc";
        this.page = 1;
        this.type = "sales";
        this.activeClass = this.order + " active";
      }
      const listdata = await categorylistGoodsListApi({
        cat_id: this.s_cat_id,
        order: this.order,
        type: this.type,
        page: this.page,
      });
      this.goodsList = listdata.data.data;
      this.pagetotal = listdata.data.pagetotal;
      this.currentNav = listdata.data.currentNav;
      //需要让导航滚动到可见区域
      if (this.nowIndex_filter > 4) {
        this.scrollLeft = this.nowIndex_filter * 60;
      }
    },
    async getAllData(first) {
      if (first) {
        const navdata = await categorylistNavListApi({
          cat_id: this.categoryId,
        });
        this.navData = navdata.data.navData;
        console.log(this.navData);
        this.currentNav = navdata.data.currentNav;
        for (let i = 0; i < this.navData.length; i++) {
          const id = this.navData[i].id;
          if (id == this.currentNav.id) {
            this.nowIndex = i;
          }
        }

        //需要让导航滚动到可见区域
        if (this.nowIndex > 4) {
          this.scrollLeft = this.nowIndex * 60;
        } else {
          this.scrollLeft = 0;
        }
        const listdata = await categorylistGoodsListApi({
          cat_id: this.categoryId,
		  order: this.order,
          page: this.page,
        });
        this.goodsList = listdata.data.data;
        this.pagetotal = listdata.data.pagetotal;
      } else {
        //上拉加载跟多
        const listdata = await categorylistGoodsListApi({
          cat_id: this.categoryId,
		  order: this.order,
		  //type:this.type,
          page: this.page,
        });
        this.goodsList = this.goodsList.concat(listdata.data.data);
      }
    },
    goodsDetail(id) {
      console.log(id);
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + id,
      });
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
