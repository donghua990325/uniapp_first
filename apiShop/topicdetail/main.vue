<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">文章详情</block>
    </cu-custom>
    <div class="topicdetail">
      <div class="content">
        <div
          v-if="topicdetaillength != 0"
          class="detail"
          v-html="replace(goods_desc)"
        >
          <!-- <rich-text :nodes="goods_desc" />
          </rich-text> -->
          <jyf-parser :html="goods_desc" ref="article"></jyf-parser>
        </div>
        <div v-else style="text-align: center">该文章一篇空白,什么都没有~~</div>
      </div>
      <!--    <div class="list">-->
      <!--      <p class="title">专题推荐</p>-->
      <!--      <div @click="topicdetail(item.id)" v-for="(item, index) in recommendList" :key="index" class="item">-->
      <!--        <img :src="item.scene_pic_url" alt="">-->
      <!--        <p>{{item.title}}</p>-->
      <!--      </div>-->
      <!--    </div>-->
    </div>
	<div class="newgoods hotgoods">
	<!-- 	  <div
		    @click="goodsList('super')"
		    class="newgoods-top"
		  >
		    <div class="top">
		      <p>超值礼包</p>
		      <p>查看全部</p>
		    </div>
		  </div> -->
		  <div class="list">
		    <ul>
		      <scroll-view
		        class="scroll-view"
		        :scroll-x="true"
		      >
		        <li
		          @click="goumaisuper(item.goods_id)"
		          v-for="(item, index) in list"
		          :key="index"
		        >
		          <img
		            :src="item.goods_thumb"
		            alt=""
		          >
		          <p>{{item.goods_name}}</p>
				  
		          <p><span style="color: #000000;">本店售价：</span><span style="color: red;">{{item.shop_price}}</span></p>
		        </li>
		      </scroll-view>
		    </ul>
		  </div>
		</div>
  </view>
</template>

<script>
import { topicdetailListApi,getArticleGoodsApi } from "@/server/config.js";
import jyfParser from "@/components/jyf-parser/jyf-parser";
export default {
  created() {},
  onShareAppMessage() {},//分享朋友
  onShareTimeline(){},//分享朋友圈
  onLoad(options) {
    this.id = options.id;
  },
  mounted() {
    this.id = this.id;
    this.getListData();
	this.getArticleGoods();
  },
  data() {
    return {
      recommendList: [],
      id: "",
      goods_desc: "",
      topicdetaillength: "",
	  list:[],
    };
  },
  components: {
    jyfParser,
  },
  methods: {
    topicdetail(id) {
      uni.navigateTo({
        url: "/apiShop/topicdetail/main?id=" + id,
      });
    },
	goumaisuper(goods_id) {
		  uni.navigateTo({
		    url: "/apiShop/goods/main?id=" + goods_id
		  });
		},
    async getListData() {
      const data = await topicdetailListApi({ id: this.id });
      // this.goods_desc = data.data.content;
      this.goods_desc = data.data.content.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto;vertical-align: bottom;" '
      );
      this.topicdetaillength = this.goods_desc.length;
      this.recommendList = data.recommendList;
    },
	async getArticleGoods() {
			const data = await getArticleGoodsApi({id: this.id});
			this.list = data.data;
		},
    replace: function (demo) {
      return demo.replace("<o:p></o:p>", "");
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
