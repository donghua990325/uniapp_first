<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">搜索</block>
    </cu-custom>
    <div class="search">
      <div class="head">
        <div>
          <img
            src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/search.png"
            alt=""
          />
          <input
            type="text"
            confirm-type="search"
            focus="true"
            v-model="words"
            @focus="inputFocus"
            @input="tipsearch"
            @confirm="searchWords"
            placeholder="商品搜索"
            maxlength="13"
          />
          <img
            @click="clearInput"
            class="del"
            src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/clearIpt.png"
            alt=""
          />
        </div>
        <div @click="cancel">取消</div>
      </div>
      <div class="searchtips" v-if="words">
        <div
          @click="searchWords"
          :data-value="item.name"
          v-for="(item, index) in tipsData"
          :key="index"
        >
          {{ item.name }}
        </div>
        <div v-if="tipsData.length == 0" class="nogoods">
          数据库暂无此类商品...
        </div>
      </div>
      <div class="history" v-if="historyData.length != 0">
        <div class="t">
          <div>历史记录</div>
          <div @click="clearHistory"></div>
        </div>
        <div class="cont">
          <div
            @click="searchWords"
            :data-value="item"
            v-for="(item, index) in historyData"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="history hotsearch">
        <div class="t">
          <div>热门搜索</div>
        </div>
        <div class="cont">
          <div
            @click="searchWords"
            v-for="(item, index) in hotData"
            :data-value="item.keyword"
            :class="{ active: 0 == index }"
            :key="index"
          >
            {{ item.keyword }}
          </div>
        </div>
      </div>
      <!--商品列表  -->
      <div v-if="listData.length != 0" class="goodsList">
        <div class="sortnav">
          <div @click="changeTab(0)" :class="[0 == nowIndex ? 'active' : '']">
            综合
          </div>
          <div
            @click="changeTab(1)"
            class="price"
            :class="[1 == nowIndex ? activeClass : '']"
          >
            价格
          </div>
          <div
            @click="changeTab(2)"
            class="price"
            :class="[2 == nowIndex ? activeClass : '']"
          >
            销量
          </div>
        </div>
        <div class="sortlist">
          <div
            @click="goodsDetail(item.id)"
            v-for="(item, index) in listData"
            :key="index"
            :class="[listData.length % 2 == 0 ? 'active' : 'none']"
            class="item"
          >
            <img :src="item.list_pic_url" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">￥{{ item.retail_price }}</p>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import {
  searchIndexActionApi,
  searchClearhistoryaction,
  searchHelperApi,
} from "@/server/config.js";
export default {
  created() {},
  mounted() {
    this.getHotData();
    this.getHistoryData();
  },
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.pagetotal) {
      return false;
    }
    this.getlistData();
  },
  data() {
    return {
      nowIndex: 0,
      words: "",
      historyData: [],
      hotData: [],
      tipsData: [],
      listData: [],
      order: "",
      isHot: "",
      isNew: "",
      activeClass: "",
      page: 1,
      total_page: 1,
      num: "",
    };
  },
  components: {},
  methods: {
    goodsDetail(id) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + id,
      });
    },
    cancel() {
      uni.navigateBack({
        delta: 1, //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },
    clearInput() {
      this.page = 1;
      this.words = "";
      this.listData = [];
      this.tipsData = [];
      this.getHistoryData();
    },
    inputFocus() {
      //商品清空
      this.listData = [];
      //展示搜索提示信息
      this.tipsearch();
    },
    async getlistData(first) {
      //获取商品列表
      const data = await searchHelperApi({
        keyword: this.words,
        order: this.order,
        page: this.page,
        num: this.num,
      });
      // console.log(data);
      this.total_page = data.data.res.total_page;
      if (first) {
        this.listData = data.data.res; // 第一次取值
      } else {
        this.listData = this.listData.concat(data.data.res); // concat 就是将接受到的数据拼接到 上次数据的后面
      }
      // if (data.data.msg) {
      //   uni.showToast({
      //     icon: "none",
      //     duration: 1000,
      //     title: data.data.msg
      //   });
      //   return false;
      // } else {
      //   // this.listData = data.data;

      // }
    },
    changeTab(index) {
      this.nowIndex = index;
      this.page = 1;
      if (index == 1) {
        this.order = this.order == "asc" ? "desc" : "asc";
        this.activeClass = this.order + " active";
        this.num = "";
      } else if (index == 2) {
        this.num = this.num == "asc" ? "desc" : "asc";
        this.activeClass = this.num + " active";
        this.order = "";
      } else {
        this.order = "";
      }

      this.getlistData(true);
    },
    async clearHistory() {
      uni.removeStorage({
        key: "history",
      });
      this.historyData = [];
    },
    async searchWords(e) {
      let vaule = e.currentTarget.dataset.value;
      this.words = vaule || this.words;

      let history = uni.getStorageSync("history");

      if (!history) {
        uni.setStorage({
          key: "history",
          data: [this.words],
        });
      } else {
        if (history.length > 3) {
          history.splice(0, 1);
        }
        if (history.indexOf(this.words) == -1) {
          uni.setStorage({
            key: "history",
            data: history.concat(this.words),
          });
        }
      }
      this.getHistoryData();
      //获取历史数据
      this.getHotData();
      //获取商品列表
      this.tipsData = [];
      this.getlistData(true);
    },
    async getHotData(first) {
      const data = await searchIndexActionApi({});
      this.hotData = data.data.hotKeywordList;
      // this.historyData = data.historyData;
    },
    async tipsearch(e) {
      const data = await searchHelperApi({
        keyword: this.words,
        page: this.page,
      });
      if (data.data.msg) {
        uni.showToast({
          icon: "none",
          duration: 1000,
          title: data.data.msg,
        });
        return false;
      } else {
        this.tipsData = data.data.res;
      }
    },
    getHistoryData() {
      this.historyData = uni.getStorageSync("history") || [];

      if (this.historyData.length > 4) {
        this.historyData.length = 4;
        this.historyData = this.historyData;
      }
    },
    topicDetail(id) {
      uni.navigateTo({
        url: "/apiShop/topicdetail/main?id=" + id,
      });
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>