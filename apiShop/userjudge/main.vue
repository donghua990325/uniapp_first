<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">商品评价</block>
    </cu-custom>
    <div class="bill">
      <div v-if="commentList != 0">
        <div class="all_judge">商品总评分：{{ score }}分</div>
        <div
          class="judge-info"
          v-for="(item, index) in commentList"
          :key="index"
        >
          <div class="desc">
            <div class="title">
              <img src="" alt="" />
              <div class="user-name">{{ item.user_name }}</div>
              <div v-if="item.user_name == 0" class="user-name">匿名用户</div>
              <uni-rate
                disabled
                size="18"
                :value="item.comment_rank"
              ></uni-rate>
            </div>
            <div class="type">
              <div class="time">{{ item.add_time | timeFormat }}</div>
            </div>
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
      <div class="onorder" v-if="commentList === 0">
        <image :src="img_blank"></image>
        <div class="text">此商品暂无评价~~</div>
      </div>
    </div>
  </view>
</template>

<script>
import { userjudgeCommentListApi } from "@/server/config.js";
import uniRate from "@/components/uni-rate/uni-rate.vue";

export default {
  onReachBottom() {
    this.pages = this.pages + 1;
    if (this.pages > this.sumpage) {
      console.log(111);
      console.log(this.pages);
      console.log(this.sumpage);
      return false;
    }

    this.goodsJudge();
  },
  onShow() {},
  onLoad(options) {
    this.id = options.id;
    this.goodsJudge(this.id);
  },
  components: {
    uniRate,
  },
  data() {
    return {
      active: true,
      percent: "99.9%",
      point: 4.4,
      pointa: 1.1,
      pointb: 3.1,
      img_show: false,
      imgs: "",
      commentList: 0,
      count: "",
      score: 0,
      pages: 1,
      img_blank:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/no_order.png",
      sumpage: "",
    };
  },
  computed: {},
  methods: {
    async goodsJudge(id) {
      const data = await userjudgeCommentListApi({
        goods_id: this.id,
        pages: this.pages,
      });

      if (this.pages == 1) {
        // this.commentList = Number(data.data.info.dis_count);
        this.commentList = data.data.data;
        this.score = data.data.score;
        this.sumpage = data.data.page_total;
        if (this.commentList == "") {
          this.commentList = 0;
        }
      } else {
        // let arr = [];

        // for (let i in this.commentList) {
        //   arr.push(this.commentList[i]); //属性
        // }

        this.commentList = this.commentList.concat(data.data.data);
      }

      // console.log(this.commentList);

      // this.score = data.data.info.score;score

      // this.sumpage = data.data.info.sumpage;
    },
    imgshow(res) {
      this.imgs = res;
      console.log(this.imgs);
      if (this.img_show == true) {
        this.img_show = false;
      } else {
        this.img_show = true;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>