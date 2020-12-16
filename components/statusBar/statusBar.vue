<template>
  <div>
    <div :style="{ height: statusBarHeight, background: bgColor }"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusBarHeight: "",
    };
  },
  props: {
    bgColor: {
      type: String,
      default: "#fff",
    },
  },
  created() {
    let _t = this;
    _t.$nextTick(() => {
      //获取状态栏高度
      uni.getSystemInfo({
        success: function (res) {
          _t.statusBarHeight = res.statusBarHeight + "px";
        },
      });
    });
  },
  mounted() {
    this.$emit("getHeight", this.statusBarHeight);
  },
};
</script>
<style lang="scss" scoped>
</style>
