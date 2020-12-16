<template>
  <view>
    <!--  #ifdef  MP || APP-PLUS-->
    <cu-custom bgColor="bg-white" :isBack="false">
      <block slot="backText">返回</block>
      <block slot="content">分类</block>
    </cu-custom>
    <!--  #endif -->
    <div class="category">
      <div class="search" @click="tosearch">
        <div class="ser">
          <span class="icon"></span>
          <span>商品搜索</span>
        </div>
      </div>
      <div class="content">
        <scroll-view class="left" scroll-y="true">
          <div
            class="iconText"
            @click="selectitem(item.cat_id, index, item.cat_name)"
            v-for="(item, index) in listData"
            :class="[index == nowIndex ? 'active' : '']"
            :key="index"
          >
            {{ item.cat_name }}
          </div>
        </scroll-view>
        <scroll-view class="right" scroll-y="true">
          <div class="banner">
            <img :src="banner_url" alt="" />
          </div>
          <div class="title">
            <span>—</span>
            <span>{{ name }}分类</span>
            <span>—</span>
          </div>
          <div v-if="datalength != 0" class="bottom">
            <div
              @click="categoryList(item.cat_id)"
              v-for="(item, index) in detailData"
              :key="index"
              class="item"
            >
              <img :src="item.pic" alt="" />
              <!-- οnerrοr="this.src=https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/goodsIndex/488b706c00fcc2d55f69f73612687b48.png.jpg" -->
              <!-- 			  data() {
			    return {
			      defaultImg: 'this.src="' + require('../../assets/img/timg.jpg') + '"'
			    }
			  } -->

              <span>{{ item.cat_name }}</span>
            </div>
          </div>
          <div style="font-size: 18upx; text-align: center" v-else>
            该分类下暂无其他子分类,我们会尽快添加~~
          </div>
        </scroll-view>
      </div>
    </div>
  </view>
</template>

<script>
import { categoryListApi, categorySecondaryApi } from "@/server/config.js";
import Jfooter from "@/components/footer/footer.vue";

export default {
  created() {},
  mounted() {
    //获取列表数据
    this.getListData();
    //获取默认右侧数据
    this.selectitem(this.id, this.nowIndex);
  },
  data() {
    return {
      id: "-1",
      nowIndex: 0,
      name: "",
      listData: [],
      detailData: {},
      banner_url: "",
      datalength: 0,
    };
  },
  components: {},
  methods: {
    tosearch() {
      uni.navigateTo({ url: "/apiShop/search/main" });
    },
    async selectitem(id, index, name) {
      this.nowIndex = index;
      this.id = id;
      this.name = name;
      console.log(index);
      if (this.id == "-1") {
        return false;
      }
      const data = await categorySecondaryApi({ cat_id: id });
      this.detailData = data.data.data;
      if (this.nowIndex == "1") {
        this.banner_url = data.data.banner_url.banner_url;
      } else {
        this.banner_url = data.data.banner_url.banner_url;
      }
      this.datalength = this.detailData.length;
      console.log(this.detailData);
    },
    async getListData() {
      const data = await categoryListApi({});
      this.listData = data.data.cat_list;
      if (this.id == "-1") {
        this.nowIndex = data.data.this_cat.cat_id;
        this.detailData = data.data.cat_item;
        this.id = data.data.this_cat.cat_id;
        this.name = data.data.this_cat.cat_name;
        this.banner_url = data.data.this_cat.banner_url;
        if (this.detailData != "") {
          this.datalength = 1;
        }
      }
    },
    categoryList(id) {
      console.log("tiaozhuan");

      uni.navigateTo({
        url: "/apiShop/categorylist/main?id=" + id,
      });
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
