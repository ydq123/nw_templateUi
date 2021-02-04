<template>
  <div class="topIntroduce">
    <div class="heaer-info pl15 pr15 pt15 pb15 bg-white f14 borderButtomE8">
      <div class="header-title verticle-center ju-b pb10">
        <div class="title f16 fw flex-1 text-left pr10" id="codeNum">
          {{ introduceData.orderNumber }}
        </div>
        <div
          class="copy-btn gray287"
          data-clipboard-action="copy"
          data-clipboard-target="#codeNum"
          v-if="introduceData.showCopy"
          @click="copyHandle"
        >
          {{ introduceData.copyText }}
        </div>
      </div>
      <div
        class="status verticle-center mb10"
        v-if="introduceData.statusValue.length"
      >
        <div
          class="danger-mark mr5 f10"
          :class="item.state | stateClass"
          v-for="(item, index) in introduceData.statusValue"
          :key="index"
          :style="
            `background: ${introduceData.statusBg}; color: ${introduceData.statusColor}`
          "
        >
          {{ item.text }}
        </div>
      </div>
      <div
        class="pb10 flex word"
        v-for="(item, index) in introduceData.keyValues"
        :key="index"
      >
        <span class="gray8 min-w130 pr10">{{ item.name }}&nbsp;</span>
        <span class="flex-1 text-left">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  filters: {
    stateClass(val) {
      if (val == 1) {
        return "state1";
      } else if (val == 2) {
        return "state2";
      } else if (val == 3) {
        return "state3";
      }
    }
  },
  computed: {},
  props: {
    introduceData: {
      type: Object,
      default: () => ({
        orderNumber: "GPL-2020-1020-LIMITED",
        copyText: "复制",
        showCopy: true,
        statusValue: [
          {
            state: 1,
            text: "待处理"
          },
          {
            state: 2,
            text: "处理中"
          },
          {
            state: 3,
            text: "已处理"
          }
        ],
        statusFontSize: 'f10',
        statusColor: "#fff",
        statusBg: "#1e87f0",
        keyValues: [
          {
            name: "缺陷设备",
            value: "缺陷设备2号"
          },
          {
            name: "缺陷等级",
            value: "1v"
          },
          {
            name: "缺陷应完成时间",
            value: "2020-10-20"
          }
        ]
      })
    }
  },
  methods: {
    copyHandle() {
      this.myJssdk.clipBoard({
        text: document.getElementById("codeNum").innerText,
        success(data) {
          this.$toast(data);
        },
        fail(data) {
          this.$toast(data);
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
	@import "../../assets/less/nw_tool.less";
// 标签
.danger-mark {
  .pxToremLess(padding-top, 4px);
  .pxToremLess(padding-bottom, 4px);
  .pxToremLess(padding-left, 6px);
  .pxToremLess(padding-right, 6px);
  .pxToremLess(border-radius, 2px);
  color: #1e87f0;
  text-align: center;
  &.state1 {
    color: #1ca300 !important;
    background: #ddf1d9 !important;
  }
  &.state2 {
    color: #ffc417 !important;
    background: #fff6dc !important;
  }
  &.state3 {
    color: #1e87f0 !important;
    background: #ddedfd !important;
  }
}
</style>
