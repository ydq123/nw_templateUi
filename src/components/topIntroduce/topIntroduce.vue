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
          class="danger-mark mr5"
          :class="stateClass"
          v-for="(item, index) in introduceData.statusValue"
          :key="index"
          :style="
            `background: ${introduceData.statusBg}; color: ${introduceData.statusColor}`
          "
        >
          {{ item }}
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
  computed: {
    stateClass() {
      if(this.introduceData.status == 1) {
        return 'state1'
      }else if(this.introduceData.status == 2) {
        return 'state2'
      }else if(this.introduceData.status == 3) {
        return 'state3'
      }
    }
  },
  props: {
    introduceData: {
      type: Object,
      default:() => ({
        orderNumber: "GPL-2020-1020-LIMITED",//单号
        copyText: "复制",//复制按钮文本
        showCopy: true,//控制复制按钮显示隐藏，默认为true显示；false隐藏
        status: 1,//标签颜色状态；值为1,2,3
        statusValue: ["审核中", "处理中"],//标签状态文本
        statusColor: "#fff",//标签状态文本颜色；注：status字段为0时生效
        statusBg: "#1e87f0",//标签状态背景颜色；注：status字段为0时生效
        keyValues: [//内容数组
          {
            name: "缺陷设备",//内容标题
            value: "缺陷设备2号"//内容说明
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
        success (data) {
          this.$toast(data);
        },
        fail (data) {
          this.$toast(data);
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
// 标签
.danger-mark {
  padding: 4px 6px;
  border-radius: 2px;
  color: #1e87f0;
  font-size: 10px;
  text-align: center;
  &.state1 {
    color: #1ca300 !important;
    background: #DDF1D9 !important;
  }
  &.state2 {
    color: #ffc417 !important;
    background: #FFF6DC !important;
  }
  &.state3 {
    color: #1e87f0 !important;
    background: #DDEDFD !important;
  }
}
</style>
