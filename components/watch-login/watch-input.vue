<template>
  <view class="main-list oBorder">
    <!-- 文本框 -->
    <input
      class="main-input"
      :value="value"
      :type="_type"
      :maxlength="maxlength"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :password="type === 'password' && !showPassword"
      @input="onInput"
    />
    <!-- 是否可见密码 -->
    <image
      v-if="_isShowPass && type === 'password' && !_isShowCode"
      class="img cuIcon"
      :class="showPassword ? 'cuIcon-attention' : 'cuIcon-attentionforbid'"
      @tap="showPass"
    ></image>
    <!-- 倒计时 -->
    <view
      v-if="_isShowCode && !_isShowPass"
      :class="['vercode', { 'vercode-run': second > 0 }]"
      @click="setCode"
      >{{ getVerCodeSecond }}</view
    >
  </view>
</template>

<script>
var _this, countDown;
export default {
  data() {
    return {
      showPassword: false, //是否显示明文
      second: 0, //倒计时
      isRunCode: false, //是否开始倒计时
    };
  },
  props: {
    type: String, //类型
    value: String, //值
    placeholder: String, //框内提示
    maxlength: {
      //最大长度
      type: [Number, String],
      default: 20,
    },
    isDisabled: {
      //是否可编辑
      type: [Boolean, String],
      default: false,
    },
    isShowPass: {
      //是否显示密码图标（二选一）
      type: [Boolean, String],
      default: false,
    },
    isShowCode: {
      //是否显示获取验证码（二选一）
      type: [Boolean, String],
      default: false,
    },
    codeText: {
      type: String,
      default: "获取验证码",
    },
    setTime: {
      //倒计时时间设置
      type: [Number, String],
      default: 60,
    },
  },
  model: {
    prop: "value",
    event: "input",
  },
  mounted() {
    _this = this;
    //准备触发
    this.$on("runCode", (val) => {
      this.runCode(val);
    });
    clearInterval(countDown); //先清理一次循环，避免缓存
  },
  methods: {
    showPass() {
      //是否显示密码
      this.showPassword = !this.showPassword;
    },
    onInput(e) {
      //传出值
      this.$emit("input", e.target.value);
    },
    setCode() {
      //设置获取验证码的事件
      if (this.isRunCode) {
        //判断是否开始倒计时，避免重复点击
        return false;
      }
      this.$emit("setCode");
    },
    runCode(val) {
      //开始倒计时
      if (String(val) == "0") {
        //判断是否需要终止循环
        this.second = 0; //初始倒计时
        clearInterval(countDown); //清理循环
        this.isRunCode = false; //关闭循环状态
        return false;
      }
      if (this.isRunCode) {
        //判断是否开始倒计时，避免重复点击
        return false;
      }
      this.isRunCode = true;
      this.second = this._setTime; //倒数秒数

      let _this = this;
      countDown = setInterval(function () {
        _this.second--;
        if (_this.second == 0) {
          _this.isRunCode = false;
          clearInterval(countDown);
        }
      }, 1000);
    },
  },
  computed: {
    _type() {
      //处理值
      const type = this.type;
      return type == "password" ? "text" : type;
    },
    _isShowPass() {
      //处理值
      return String(this.isShowPass) !== "false";
    },
    _isShowCode() {
      //处理值
      return String(this.isShowCode) !== "false";
    },
    _setTime() {
      //处理值
      const setTime = Number(this.setTime);
      return setTime > 0 ? setTime : 60;
    },
    getVerCodeSecond() {
      //验证码倒计时计算
      if (this.second <= 0) {
        return this.codeText;
      } else {
        if (this.second < 10) {
          return "0" + this.second;
        } else {
          return this.second;
        }
      }
    },
  },
};
</script>

<style>
@import url("./css/icon.css");
.main-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 36rpx;
  /* Input 高度 */
  color: #333333;
  padding: 40rpx 0 40rpx 20rpx;
  margin-top: 15rpx;
  margin-bottom: 15rpx;
  border: 1rpx solid #9f8286;
  /* border: 1rpx solid #A53533; */
  /* background: #F7F7F7; */
}

.img {
  width: 36rpx;
  height: 36rpx;
  font-size: 36rpx;
  margin-right: 40rpx;
}

.main-input {
  flex: 1;
  text-align: left;
  font-size: 28rpx;
  /* line-height: 100upx; */
  padding-right: 10rpx;
  margin-left: 20rpx;
  background: none;
}

.vercode {
  line-height: 80rpx;
  padding: 0px 20rpx 0px 20rpx;
  color: rgba(0, 0, 0, 0.7);
  font-size: 28rpx;
  color: #fff;
  text-align: center;
  background: #a53533;
  min-width: 160rpx;
}

.vercode-run {
  color: rgba(250, 250, 250, 1) !important;
}

.oBorder {
  /* border: none; */
  border-radius: 0.12rem;
  -webkit-box-shadow: 0 0 60rpx 0 rgba(43, 86, 112, 0.1);
  box-shadow: 0 0 60rpx 0 rgba(43, 86, 112, 0.1);
}
</style>