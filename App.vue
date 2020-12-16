   <script>
import Vue from "vue";
// 引入检查更新模块
import { checkUpdater } from "@/common/checkUpdater";

export default {
  onLaunch: function () {
    console.log("App Launch");
    // app打开时先检查是否有更新记录（更新记录会被保存在storage中）
    // 更新记录的内容为 { 更新标记, 安装包位置 }

    // 如果存在更新记录，且更新标记（complete=true）则删除上次使用过的安装包，达到存储释放空间的目的

    // 如果存在更新记录，且更新标记（complete=false）则进行安装更新 - 2019年3月27日 新增强制更新内容

    // #ifdef APP-PLUS
    plus.screen.lockOrientation("portrait-primary"); //竖屏正方向锁定

    const updated = uni.getStorageSync("updated"); // 尝试读取storage

    if (updated.completed === true) {
      // 如果上次刚更新过
      // 删除安装包及安装记录
      console.log("安装记录被删除，更新成功");
      uni.removeSavedFile({
        filePath: updated.packgePath,
        success: (res) => {
          uni.removeStorageSync("updated");
        },
      });
    } else if (updated.completed === false) {
      uni.removeStorageSync("updated");
      plus.runtime.install(updated.packgePath, { force: true });
      uni.setStorage({
        key: "updated",
        data: {
          completed: true,
          packgePath: updated.packgePath,
        },
        success: (res) => {
          console.log("成功安装上次的更新，应用需要重启才能继续完成");
        },
      });
      uni.showModal({
        title: "提示",
        content: "应用将重启以完成更新",
        showCancel: false,
        complete: () => {
          plus.runtime.restart();
        },
      });
    } else {
      // 检查更新，参数：{ 当前版本号，跳转到更新页面的url }
      checkUpdater(this.$current.id);
    }
    // #endif
    //-------end
    uni.getSystemInfo({
      success: function (e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform == "android") {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        // #endif

        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar =
          custom.bottom + custom.top - e.statusBarHeight;
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
      },
    });

    Vue.prototype.ColorList = [
      {
        title: "嫣红",
        name: "red",
        color: "#e54d42",
      },
      {
        title: "桔橙",
        name: "orange",
        color: "#f37b1d",
      },
      {
        title: "明黄",
        name: "yellow",
        color: "#fbbd08",
      },
      {
        title: "橄榄",
        name: "olive",
        color: "#8dc63f",
      },
      {
        title: "森绿",
        name: "green",
        color: "#39b54a",
      },
      {
        title: "天青",
        name: "cyan",
        color: "#1cbbb4",
      },
      {
        title: "海蓝",
        name: "blue",
        color: "#0081ff",
      },
      {
        title: "姹紫",
        name: "purple",
        color: "#6739b6",
      },
      {
        title: "木槿",
        name: "mauve",
        color: "#9c26b0",
      },
      {
        title: "桃粉",
        name: "pink",
        color: "#e03997",
      },
      {
        title: "棕褐",
        name: "brown",
        color: "#a5673f",
      },
      {
        title: "玄灰",
        name: "grey",
        color: "#8799a3",
      },
      {
        title: "草灰",
        name: "gray",
        color: "#aaaaaa",
      },
      {
        title: "墨黑",
        name: "black",
        color: "#333333",
      },
      {
        title: "雅白",
        name: "white",
        color: "#ffffff",
      },
    ];
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
@import "colorui/main.css";
@import "colorui/icon.css";
@import "static/css/colorui.css";
@import "static/iconfont/iconfont.css";
/*每个页面公共css */
</style>
