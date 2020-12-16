<template>
  <view class="w-picker">
    <view
      class="mask"
      :class="{ show: showPicker }"
      @tap="maskTap"
      @touchmove.stop.prevent
      catchtouchmove="true"
    ></view>
    <view class="w-picker-cnt" :class="{ show: showPicker }">
      <view class="w-picker-hd" @touchmove.stop.prevent catchtouchmove="true">
        <view class="w-picker-btn" @tap="pickerCancel">取消</view>
        <view
          class="w-picker-btn"
          :style="{ color: themeColor }"
          @tap="pickerConfirm"
          >确定</view
        >
      </view>
      <view class="w-picker-view" v-if="mode == 'date'">
        <picker-view
          :indicator-style="itemHeight"
          :value="pickVal"
          @change="bindChange"
        >
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.years"
              :key="index"
              >{{ item }}年</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.months"
              :key="index"
              >{{ item }}月</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.days"
              :key="index"
              >{{ item }}日</view
            >
          </picker-view-column>
        </picker-view>
      </view>
      <view class="w-picker-view" v-if="mode == 'yearMonth'">
        <picker-view
          :indicator-style="itemHeight"
          :value="pickVal"
          @change="bindChange"
        >
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.years"
              :key="index"
              >{{ item }}年</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.months"
              :key="index"
              >{{ item }}月</view
            >
          </picker-view-column>
        </picker-view>
      </view>
      <view class="w-picker-view" v-if="mode == 'dateTime'">
        <picker-view
          :indicator-style="itemHeight"
          :value="pickVal"
          @change="bindChange"
        >
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.years"
              :key="index"
              >{{ item }}年</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.months"
              :key="index"
              >{{ item }}月</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.days"
              :key="index"
              >{{ item }}日</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.hours"
              :key="index"
              >{{ item }}时</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.minutes"
              :key="index"
              >{{ item }}分</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.seconds"
              :key="index"
              >{{ item }}秒</view
            >
          </picker-view-column>
        </picker-view>
      </view>
      <view class="w-picker-view" v-if="mode == 'range'">
        <picker-view
          :indicator-style="itemHeight"
          :value="pickVal"
          @change="bindChange"
        >
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.fyears"
              :key="index"
              >{{ item }}</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.fmonths"
              :key="index"
              >{{ item }}</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.fdays"
              :key="index"
              >{{ item }}</view
            >
          </picker-view-column>
          <picker-view-column>
            <view class="w-picker-item">-</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.tyears"
              :key="index"
              >{{ item }}</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.tmonths"
              :key="index"
              >{{ item }}</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.tdays"
              :key="index"
              >{{ item }}</view
            >
          </picker-view-column>
        </picker-view>
      </view>
      <view class="w-picker-view" v-if="mode == 'time'">
        <picker-view
          :indicator-style="itemHeight"
          :value="pickVal"
          @change="bindChange"
        >
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.hours"
              :key="index"
              >{{ item }}时</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.minutes"
              :key="index"
              >{{ item }}分</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.seconds"
              :key="index"
              >{{ item }}秒</view
            >
          </picker-view-column>
        </picker-view>
      </view>
      <view class="w-picker-view" v-if="mode == 'region'">
        <picker-view
          :indicator-style="itemHeight"
          :value="pickVal"
          @change="bindChange"
        >
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in provinces"
              :key="index"
              >{{ item.value }}</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in citys"
              :key="index"
              >{{ item.value }}</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in areas"
              :key="index"
              >{{ item.value }}</view
            >
          </picker-view-column>
        </picker-view>
      </view>
      <view class="w-picker-view" v-if="mode == 'selector'">
        <picker-view
          :indicator-style="itemHeight"
          :value="pickVal"
          @change="bindChange"
        >
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data"
              :key="index"
              >{{ item.label }}</view
            >
          </picker-view-column>
        </picker-view>
      </view>
      <view class="w-picker-view" v-if="mode == 'limit'">
        <picker-view
          :indicator-style="itemHeight"
          :value="pickVal"
          @change="bindChange"
        >
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.date"
              :key="index"
              >{{ item.label }}</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.hours"
              :key="index"
              >{{ item.label }}时</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.minutes"
              :key="index"
              >{{ item.label }}分</view
            >
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script>
import https from "../../server/https";
//改造后，调用线上接口了，没用原来的静态地址数据
// import provinces from "./city-data/province.js";
// import citys from "./city-data/city.js";
// import areas from "./city-data/area.js";
import initPicker from "./w-picker.js";
function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  console.log(new Error("mode无效，请选择有效的mode!"));
  return false;
}
export default {
  data() {
    return {
      result: [],
      data: {},
      provinces: {},
      citys: {},
      areas: {},
      checkArr: [],
      checkValue: [],
      pickVal: [],
      areaVal: [],
      showPicker: false,
      resultStr: "",
      itemHeight: `height: ${uni.upx2px(88)}px;`,
    };
  },
  computed: {},
  props: {
    mode: {
      type: String,
      validator(mode) {
        let modeList = [
          "date",
          "dateTime",
          "yearMonth",
          "time",
          "region",
          "selector",
          "limit",
          "range",
        ]; //过滤无效mode;
        return oneOf(mode, modeList);
      },
      default() {
        return "date";
      },
    },
    themeColor: {
      type: String,
      default() {
        return "#f5a200";
      },
    },
    startYear: {
      type: [String, Number],
      default() {
        return "1970";
      },
    },
    endYear: {
      type: [String, Number],
      default() {
        return new Date().getFullYear() + "";
      },
    },
    defaultVal: {
      type: Array,
      default() {
        return [0, 0, 0, 0, 0, 0, 0];
      },
    },
    step: {
      type: [String, Number],
      default: 1,
    },
    current: {
      type: Boolean,
      default: false,
    },
    selectList: {
      type: Array,
      default() {
        return [];
      },
    },
    //以下参数仅对mode==limit有效
    dayStep: {
      type: [String, Number],
      default: 7,
    },
    startHour: {
      type: [String, Number],
      default: 8,
    },
    endHour: {
      type: [String, Number],
      default: 20,
    },
    minuteStep: {
      type: [String, Number],
      default: 10,
    },
    afterStep: {
      type: [String, Number],
      default: 30,
    },
  },
  watch: {
    mode() {
      this.initData();
    },
    selectList() {
      this.initData();
    },
  },
  methods: {
    useCurrent() {
      let aToday = new Date();
      let tYear = aToday.getFullYear().toString();
      let tMonth = this.formatNum(aToday.getMonth() + 1).toString();
      let tDay = this.formatNum(aToday.getDate()).toString();
      let tHours = this.formatNum(aToday.getHours()).toString();
      let tMinutes = this.formatNum(aToday.getMinutes()).toString();
      let tSeconds = this.formatNum(aToday.getSeconds()).toString();
      if (this.current) {
        return [
          tYear,
          tMonth,
          tDay,
          tHours,
          (Math.floor(tMinutes / this.step) * this.step).toString(),
          tSeconds,
        ];
      } else {
        return this.defaultVal;
      }
    },
    formatNum(num) {
      return num < 10 ? "0" + num : num + "";
    },
    maskTap() {
      this.showPicker = false;
    },
    show() {
      this.showPicker = true;
    },
    hide() {
      this.showPicker = false;
    },
    pickerCancel() {
      this.$emit("cancel", {
        checkArr: this.checkArr,
        defaultVal: this.pickVal,
      });
      this.showPicker = false;
    },
    pickerConfirm(e) {
      switch (this.mode) {
        case "range":
          let checkArr = this.checkArr;
          let fDateTime = new Date(checkArr[0], checkArr[1], checkArr[2]);
          let tDateTime = new Date(checkArr[3], checkArr[4], checkArr[5]);
          if (fDateTime > tDateTime) {
            uni.showModal({
              title: "提示",
              content: "结束日期不能小于开始时间",
              confirmColor: this.themeColor,
            });
            return;
          }
          this.$emit("confirm", {
            checkArr: this.checkArr,
            from: checkArr[0] + "-" + checkArr[1] + "-" + checkArr[2],
            to: checkArr[3] + "-" + checkArr[4] + "-" + checkArr[5],
            defaultVal: this.pickVal,
            result: this.resultStr,
          });
          break;
        case "limit":
          let aTime = new Date().getTime();
          let bTime = new Date(this.resultStr.replace(/-/g, "/")).getTime();
          if (aTime > bTime) {
            uni.showModal({
              title: "提示",
              content: "选择时间必须大于当前时间",
              confirmColor: this.themeColor,
            });
            return;
          }
          this.$emit("confirm", {
            checkArr: this.checkArr,
            defaultVal: this.pickVal,
            result: this.resultStr,
          });
          break;
        case "region":
          this.$emit("confirm", {
            checkArr: this.checkArr,
            checkValue: this.checkValue,
            defaultVal: this.pickVal,
            areaVal: this.areaVal,
            result: this.resultStr,
          });
          break;
        default:
          this.$emit("confirm", {
            checkArr: this.checkArr,
            defaultVal: this.pickVal,
            result: this.resultStr,
          });
          break;
      }
      this.showPicker = false;
    },
    bindChange(val) {
      let _this = this;
      let arr = val.detail.value;
      let year = "",
        month = "",
        day = "",
        hour = "",
        minute = "",
        second = "",
        province,
        city,
        area;
      let checkArr = _this.checkArr;
      let days = [];
      let mode = _this.mode;
      switch (mode) {
        case "limit":
          let col1, col2;
          col1 = _this.data.date[arr[0]];
          if (col1.flag) {
            col2 = _this.data.hours[arr[1]];
            _this.data = initPicker.limit(
              _this.dayStep,
              _this.starHour,
              _this.endHour,
              _this.minuteStep,
              _this.afterStep
            );
            if (!col2.flag) {
              let minutes = initPicker.initLimitMinutes(_this.minuteStep);
              _this.data.minutes = minutes;
            } else {
              _this.data = initPicker.limit(
                _this.dayStep,
                _this.starHour,
                _this.endHour,
                _this.minuteStep,
                _this.afterStep
              );
            }
          } else {
            let hours = initPicker.initLimitHours(
              _this.startHour,
              _this.endHour
            );
            let minutes = initPicker.initLimitMinutes(_this.minuteStep);
            _this.data.hours = hours;
            _this.data.minutes = minutes;
          }
          let d = _this.data.date[arr[0]];
          let h = _this.data.hours[arr[1]];
          let m = _this.data.minutes[arr[2]];
          _this.checkArr = [d, h, m];
          _this.resultStr = `${
            d.value +
            " " +
            ((h && h.value) || "") +
            ":" +
            ((m && m.value) || "") +
            ":" +
            "00"
          }`;
          break;
        case "range":
          let fyear = _this.data.fyears[arr[0]];
          let fmonth = _this.data.fmonths[arr[1]];
          let fday = _this.data.fdays[arr[2]];
          let tyear = _this.data.tyears[arr[4]];
          let tmonth = _this.data.tmonths[arr[5]];
          let tday = _this.data.tdays[arr[6]];
          if (fyear != checkArr[0]) {
            days = initPicker.initRangeDays(fyear, fmonth);
            _this.data.fdays = days;
          }
          if (fmonth != checkArr[1]) {
            days = initPicker.initRangeDays(fyear, fmonth);
            _this.data.fdays = days;
          }
          if (tyear != checkArr[3]) {
            days = initPicker.initRangeDays(tyear, tmonth);
            _this.data.tdays = days;
          }
          if (tmonth != checkArr[4]) {
            days = initPicker.initRangeDays(tyear, tmonth);
            _this.data.tdays = days;
          }
          _this.checkArr = [fyear, fmonth, fday, tyear, tmonth, tday];
          _this.resultStr = `${
            fyear +
            "-" +
            fmonth +
            "-" +
            fday +
            "至" +
            tyear +
            "-" +
            tmonth +
            "-" +
            tday
          }`;
          break;
        case "date":
          year = _this.data.years[arr[0]];
          month = _this.data.months[arr[1]];
          day = _this.data.days[arr[2]];
          if (year != checkArr[0]) {
            days = initPicker.initDays(year, month);
            _this.data.days = days;
          }
          if (month != checkArr[1]) {
            days = initPicker.initDays(year, month);
            _this.data.days = days;
          }
          _this.checkArr = [year, month, day];
          _this.resultStr = `${year + "-" + month + "-" + day}`;
          break;
        case "yearMonth":
          year = _this.data.years[arr[0]];
          month = _this.data.months[arr[1]];
          _this.checkArr = [year, month];
          _this.resultStr = `${year + "-" + month}`;
          break;
        case "dateTime":
          year = _this.data.years[arr[0]];
          month = _this.data.months[arr[1]];
          day = _this.data.days[arr[2]];
          hour = _this.data.hours[arr[3]];
          minute = _this.data.minutes[arr[4]];
          second = _this.data.seconds[arr[5]];
          if (year != checkArr[0]) {
            days = initPicker.initDays(year, month);
            _this.data.days = days;
          }
          if (month != checkArr[1]) {
            days = initPicker.initDays(year, month);
            _this.data.days = days;
          }
          _this.checkArr = [year, month, day, hour, minute, second];
          _this.resultStr = `${
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second
          }`;
          break;
        case "time":
          hour = _this.data.hours[arr[0]];
          minute = _this.data.minutes[arr[1]];
          second = _this.data.seconds[arr[2]];
          _this.checkArr = [hour, minute, second];
          _this.resultStr = `${hour + ":" + minute + ":" + second}`;
          break;
        case "region":
          province = _this.data[arr[0]].value;
          //前置判断
          if (province != checkArr[0]) {
            arr[1] = 0;
            arr[2] = 0;
          }

          if (typeof _this.data[arr[0]].children[arr[1]] === "undefined") {
            city = "";
          } else {
            city = _this.data[arr[0]].children[arr[1]].value;
          }
          //前置判断
          if (city != checkArr[1]) {
            arr[2] = 0;
          }
          if (
            typeof _this.data[arr[0]].children[arr[1]].children[arr[2]] ===
            "undefined"
          ) {
            area = "";
          } else {
            area = _this.data[arr[0]].children[arr[1]].children[arr[2]].value;
          }
          if (province != checkArr[0]) {
            arr[1] = 0;
            arr[2] = 0;
            city = _this.data[arr[0]].children[arr[1]].value;
            area = _this.data[arr[0]].children[arr[1]].children[arr[2]].value;
          }
          if (city != checkArr[1]) {
            arr[2] = 0;
            area = _this.data[arr[0]].children[arr[1]].children[arr[2]].value;
          }
          _this.checkArr = [province, city, area];
          _this.checkValue = [
            _this.data[arr[0]].value,
            _this.data[arr[0]].children[arr[1]].value,
            _this.data[arr[0]].children[arr[1]].children[arr[2]].value,
          ];
          _this.resultStr = province + city + area;
          _this.provinces = _this.data;
          _this.citys = _this.data[arr[0]].children;
          _this.areas = _this.data[arr[0]].children[arr[1]].children;
          _this.areaVal = [
            _this.data[arr[0]].id,
            _this.data[arr[0]].children[arr[1]].id,
            _this.data[arr[0]].children[arr[1]].children[arr[2]].id,
          ];
          break;
        case "selector":
          _this.checkArr = _this.data[arr[0]];
          _this.resultStr = _this.data[arr[0]].label;
          break;
      }
      _this.$nextTick(() => {
        _this.pickVal = arr;
      });
    },
    initData() {
      let _this = this;
      let data = {};
      let mode = _this.mode;
      let year, month, day, hour, minute, second, province, city, area;
      const regionhost = https.regionhost();
      if (mode == "region") {
        uni.request({
          url: regionhost,
          method: "GET",
          data: {},
          success: (res) => {
            if (res.statusCode === 200) {
              data = res.data;
              _this.data = data;
              let dVal =
                data.defaultVal && _this.current
                  ? data.defaultVal
                  : _this.defaultVal;
              data.some((v, k) => {
                if (Number(v.id) === Number(dVal[0])) {
                  dVal[0] = k;
                  if (data[k].children != "undefined") {
                    data[k].children.some((n, m) => {
                      if (Number(n.id) === Number(dVal[1])) {
                        dVal[1] = m;
                        if (data[k].children[m].children != "undefined") {
                          data[k].children[m].children.some((p, o) => {
                            if (Number(p.id) === Number(dVal[2])) {
                              dVal[2] = o;
                            }
                          });
                        }
                      }
                    });
                  }
                }
              });
              province = data[dVal[0]];
              if (data[dVal[0]].children === "undefined") {
                city = "";
              } else {
                city = data[dVal[0]].children[dVal[1]];
              }
              if (data[dVal[0]].children[dVal[1]].children === "undefined") {
                area = "";
              } else {
                area = data[dVal[0]].children[dVal[1]].children[dVal[2]];
              }
              _this.checkArr = [province.value, city.value, area.value];
              _this.checkValue = [province.id, city.id, area.id];
              _this.resultStr = province.value + city.value + area.value;
              _this.$nextTick(() => {
                if (data.defaultVal && _this.current) {
                  _this.pickVal = data.defaultVal;
                } else {
                  _this.pickVal = _this.defaultVal;
                }
              });
              _this.provinces = data;
              _this.citys = data[dVal[0]].children;
              _this.areas = data[dVal[0]].children[dVal[1]].children;
              _this.areaVal = [
                data[dVal[0]].id,
                data[dVal[0]].children[dVal[1]].id,
                data[dVal[0]].children[dVal[1]].children[dVal[2]].id,
              ];
            }
          },
        });
      } else if (mode == "selector") {
        data = _this.selectList;
      } else if (mode == "limit") {
        data = initPicker.limit(
          _this.dayStep,
          _this.starHour,
          _this.endHour,
          _this.minuteStep,
          _this.afterStep
        );
      } else if (mode == "range") {
        data = initPicker.range(
          _this.startYear,
          _this.endYear,
          _this.useCurrent(),
          _this.current
        );
      } else {
        data = initPicker.date(
          _this.startYear,
          _this.endYear,
          _this.mode,
          _this.step,
          _this.useCurrent(),
          _this.current
        );
      }
      //上面接口里面执行了下面方法直接不请求了吧
      if (mode == "region") {
        return true;
      }
      _this.data = data;
      let dVal =
        data.defaultVal && _this.current ? data.defaultVal : _this.defaultVal;
      switch (mode) {
        case "limit":
          let col1, col2, col3;
          col1 = data.date[dVal[0]];
          col2 = data.hours[dVal[1]];
          col3 = data.minutes[dVal[2]];
          _this.checkArr = [col1, col2, col3];
          _this.resultStr = `${
            col1.value + " " + col2.value + ":" + col3.value + ":" + "00"
          }`;
          break;
        case "range":
          let fYear = data.fyears[dVal[0]];
          let fmonth = data.fmonths[dVal[1]];
          let fday = data.fdays[dVal[2]];
          let tYear = data.tyears[dVal[4]];
          let tmonth = data.tmonths[dVal[5]];
          let tday = data.tdays[dVal[6]];
          _this.checkArr = [fYear, fmonth, fday, tYear, tmonth, tday];
          _this.resultStr = `${
            fYear +
            "-" +
            fmonth +
            "-" +
            fday +
            "至" +
            tYear +
            "-" +
            tmonth +
            "-" +
            tday
          }`;
          break;
        case "date":
          year = data.years[dVal[0]];
          month = data.months[dVal[1]];
          day = data.days[dVal[2]];
          _this.checkArr = [year, month, day];
          _this.resultStr = `${year + "-" + month + "-" + day}`;
          break;
        case "yearMonth":
          year = data.years[dVal[0]];
          month = data.months[dVal[1]];
          _this.checkArr = [year, month];
          _this.resultStr = `${year + "-" + month}`;
          break;
        case "dateTime":
          year = data.years[dVal[0]];
          month = data.months[dVal[1]];
          day = data.days[dVal[2]];
          hour = data.hours[dVal[3]];
          minute = data.minutes[dVal[4]];
          second = data.seconds[dVal[5]];
          _this.resultStr = `${
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second
          }`;
          _this.checkArr = [year, month, day, hour, minute];
          break;
        case "time":
          hour = data.hours[dVal[0]];
          minute = data.minutes[dVal[1]];
          second = data.seconds[dVal[2]];
          _this.checkArr = [hour, minute, second];
          _this.resultStr = `${hour + ":" + minute + ":" + second}`;
          break;
        case "region":
          break;
        case "selector":
          _this.checkArr = data[dVal[0]];
          _this.resultStr = data[dVal[0]].label;
          break;
      }
      _this.$nextTick(() => {
        if (data.defaultVal && _this.current) {
          _this.pickVal = data.defaultVal;
        } else {
          _this.pickVal = _this.defaultVal;
        }
      });
    },
  },
  mounted() {
    this.initData();
  },
};
</script>

<style lang="scss">
.w-picker {
  position: relative;
  z-index: 888;
  .mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease;
  }
  .mask.show {
    visibility: visible;
    opacity: 1;
  }
  .w-picker-cnt {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: all 0.3s ease;
    transform: translateY(100%);
    z-index: 3000;
  }
  .w-picker-cnt.show {
    transform: translateY(0);
  }
  .w-picker-hd {
    display: flex;
    align-items: center;
    padding: 0 30upx;
    height: 88upx;
    background-color: #fff;
    position: relative;
    text-align: center;
    font-size: 32upx;
    justify-content: space-between;
    .w-picker-btn {
      font-size: 30upx;
    }
  }

  .w-picker-hd:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  .w-picker-item {
    text-align: center;
    width: 100%;
    height: 88upx;
    line-height: 88upx;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 30upx;
  }
  .w-picker-view {
    width: 100%;
    height: 476upx;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 1);
    z-index: 666;
  }
  picker-view {
    height: 100%;
  }
}
</style>
