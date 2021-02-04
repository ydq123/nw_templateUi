<template>
  <div class="yw-botbut">
    <!-- 大按钮 -->
    <div class="p10 bg-white boxs" v-if="btnInfo.btnType == 1">
      <div
        @click="bigBtnHandle"
        class="btn ju-c btn-width-100 cybtn"
        :class="[btnInfo.fontSize, btnInfo.bgColor, btnInfo.fontColor]"
      >
        <slot name="default">{{ btnInfo.fontText }}</slot>
      </div>
    </div>
    <!-- 左右等分按钮 -->
    <div class="p10 bg-white flex-d boxs" v-if="btnInfo.btnType == 2">
      <div
        @click="leftBtnHandle"
        class="btn ju-c btn-width-100 cybtn mr5"
        :class="[
          btnInfo.leftFontSize,
          btnInfo.leftBgColor,
          btnInfo.leftFontColor
        ]"
      >
        <slot name="leftBtnText">{{ btnInfo.leftBtnText }}</slot>
      </div>
      <div
        @click="rightBtnHandle"
        class="btn ju-c btn-width-100 ml5"
        :class="[
          btnInfo.rightFontSize,
          btnInfo.rightBgColor,
          btnInfo.rightFontColor
        ]"
      >
        <slot name="rightBtnText">{{ btnInfo.rightBtnText }}</slot>
      </div>
    </div>
    <!-- 底部固定按钮 -->
    <div class="p10 bg-white boxs" v-if="btnInfo.btnType == 3">
      <div class="btn ju-c btn-width-100 mr5 btn-row btn-al-c btn-ju-a">
        <div class="btn-width-100 flex ju-b">
          <div
            v-for="(iItem, iIndex) in btnInfo.fixedButtonList"
            :key="iIndex"
            @click="bottomClickHandle(iItem, iIndex)"
            :class="[
              iIndex == btnInfo.fixedButtonList.length - 1
                ? 'btn-width-50'
                : 'flex-1 verticle-center ju-c'
            ]"
          >
            <!-- 左侧小按钮 -->
            <div v-if="iIndex != btnInfo.fixedButtonList.length - 1">
              <div class="">
                <i
                  class="iconfont"
                  :class="[iItem.iconName, iItem.iconSize]"
                ></i>
              </div>
              <div class="mt5" :class="[iItem.fontSize, iItem.fontColor]">
                {{ iItem.fontText }}
              </div>
            </div>
            <!-- 右侧主要按钮 -->
            <div
              v-else
              class="btn ju-c"
              :class="[iItem.fontSize, iItem.fontColor, iItem.bgColor]"
            >
              {{ iItem.fontText }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部弹窗 -->
    <van-popup v-model="showZdcIconBox" round position="bottom">
      <div class="bg-f5 pb10">
        <div class="title f15 verticle-center ju-b pl15 pr15 pt20 pb20 fw">
          更多操作<i
            class="iconfont icon-shanchu3 gray9 f18"
            @click="showZdcIconBox = false"
          ></i>
        </div>
        <div
          class="btn-father btn-width-100 btn-hei-au btn-row pl15 pr15 ju-b fl-w"
        >
          <div
            class="btnItem pt10 pb10 mb15 column ju-a"
            :class="[item.fontColor, item.bgColor]"
            @click="botPopIconBtn(item)"
            v-for="(item, index) in btnInfo.moreOperation"
            :key="index"
          >
            <i class="iconfont f22" :class="[item.iconName, item.iconSize]"></i>
            <div :class="[item.fontSize]">
              {{ item.fontText }}
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "BotButton",
  display: "BotButton模块底部按钮",
  data() {
    return {
      iconListLen: [],
      showZdcIconBox: false //底部弹窗控制
    };
  },
  props: {
    // 按钮类型btnType 1-大按钮， 2-等分双按钮， 3-底部多按钮
    btnInfo: {
      type: Object,
      default: () => ({
        btnType: 3,
        fontSize: "f14",
        fontText: "主要按钮",
        fontColor: "text-white",
        bgColor: "bg-287",
        leftBtnText: "保存",
        rightBtnText: "发送",
        leftFontSize: "f14",
        rightFontSize: "f14",
        leftBgColor: "bg-white",
        rightBgColor: "bg-287",
        leftFontColor: "text-black",
        rightFontColor: "text-white",
        fixedButtonList: [
          {
            fontSize: "f12",
            fontText: "流程页面",
            fontColor: "text-black",
            iconName: "icon-jinyongqingkuang",
            iconSize: "f14",
            id: 1
          },
          {
            fontSize: "f12",
            fontText: "台账地图",
            fontColor: "text-black",
            iconName: "icon-jinyongqingkuang",
            iconSize: "f14",
            id: 2
          },
          {
            fontSize: "f12",
            fontText: "更多",
            fontColor: "text-black",
            iconName: "icon-gengduo",
            iconSize: "f14",
            isMore: true,
          },
          {
            fontSize: "f12",
            fontText: "选择单位",
            fontColor: "text-white",
            bgColor: "bg-287",
            iconName: "icon-jinyongqingkuang",
            iconSize: "f14",
            id: 3
          }
        ], //底部多个固定按钮
        moreOperation: [
          {
            fontSize: "f12",
            fontText: "人员单选",
            fontColor: "text-black",
            bgColor: "bg-white",
            iconName: "icon-jinyongqingkuang",
            iconSize: "f14",
            id: 1
          },
          {
            fontSize: "f12",
            fontText: "人员多选",
            fontColor: "text-black",
            bgColor: "bg-white",
            iconName: "icon-jinyongqingkuang",
            iconSize: "f14",
            id: 2
          },
          {
            fontSize: "f12",
            fontText: "选择人员",
            fontColor: "text-black",
            bgColor: "bg-white",
            iconName: "icon-jinyongqingkuang",
            iconSize: "f14"
          },
          {
            fontSize: "f12",
            fontText: "选择人员",
            fontColor: "text-black",
            bgColor: "bg-white",
            iconName: "icon-jinyongqingkuang",
            iconSize: "f14"
          }
        ] //更多操作
      })
    }
  },
  computed: {},
  mounted() {},
  activated() {
    this.showZdcIconBox = false;
  },
  methods: {
    // 大按钮点击事件
    bigBtnHandle: function() {
      this.$emit("bigBtnHandle");
    },
    // 等分按钮-右边按钮点击事件
    rightBtnHandle: function() {
      this.$emit("rightBtnHandle");
    },
    // 等分按钮-左边按钮点击事件
    leftBtnHandle: function() {
      this.$emit("leftBtnHandle");
    },
    // 底部按钮点击事件
    bottomClickHandle: function(item, index) {
      if (item.isMore) {
        this.showZdcIconBox = true;
      } else {
        this.$emit("bottomClickHandle", item);
      }
    },
    // 点击底部更多按钮事件
    botPopIconBtn: function(item) {
      this.$emit("botPopIconBtn", item);
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/nw_tool.less";

.yw-botbut {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 8;
  text-align: center;
  width: 100%;
}

.boxs {
  box-shadow: 0.7rem 0.7rem 0.7rem 0.7rem rgba(0, 0, 0, 0.2);
}

.btn {
  .pxToremLess(height, 44px);
  .pxToremLess(border-radius, 4px);
  display: flex;
  align-items: center;
  // justify-content: center;
  white-space: nowrap;
  /*让文字不换行*/
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

// 主要按钮
.zybtn {
  color: white;
  background-color: #1e87f0;
}

// 次要按钮
.cybtn {
  // color: #262626;
  border: 1px solid #d8d8d8;
}

.btn-width-100 {
  width: 100%;
}
.btn-width-50 {
  width: 50%;
}
.btn-father {
  &::after {
    content: "";
    width: 80px;
  }
  .btnItem {
    .pxToremLess(width, 80px);
    .pxToremLess(height, 80px);
    .pxToremLess(border-radius, 10px);
  }
}

.flex-d {
  display: flex;
  justify-content: space-around;
}

.flex-w {
  flex-wrap: wrap;
}

.btn-row {
  display: flex;
  flex-direction: row;
}

.btn-al-c {
  align-items: center;
}

.btn-ju-a {
  justify-content: space-around;
}

.btn-hei-au {
  height: auto;
}
</style>
