<template>
  <div class="top-fixed bg-white" id="header" :style="'padding-top:' + '0px ;'">
    <slot name="default">
      <div class="header">
        <slot name="left">
          <div class="left-btn"><i class="iconfont icon-huitui"></i></div>
        </slot>
        <slot name="center">
          <div class="header-txt">{{ title }}</div>
        </slot>
        <slot name="right">
          <div class="right-content">更多</div>
        </slot>
      </div>
    </slot>
    <!--第一种--使用示例如下 直接自己全新定义 -->
    <!-- <nw-FixedHeader>
      <div slot="default">
				<div class="header">
					<div class="left-btn">取消222</div>
					<div class="header-txt">标题标题222</div>
					<div class="right-content">4526</div>
				</div>
			</div>
    </nw-FixedHeader> -->
    <!-- 第二种--使用示例如下 title传进来，自己定义left和right内容，也可以不传，有默认内容 自个斟酌-->
    <!-- <nw-FixedHeader title="徐徐噶">
      <div slot="left"><i class="pl10 iconfont icon-huitui"></i></div>
      <div slot="right"><i class="pr10 iconfont icon-qianjin"></i></div>
    </nw-FixedHeader> -->
  </div>
</template>

<script>
import { tabMinxin } from "@/mixin/tabMinxin.js";
export default {
  props: {
    title: {
      type: String,
      default: "默认标题"
    }
  },
  mixins: [tabMinxin], //混入公共类
  name: "fixed-header",
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/nw_tool.scss";
//顶部返回导航
.top-fixed {
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 102;
  left: 0;
  text-align: center;
  .status-bar {
    // height: 24px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .header {
    line-height: r(44px) !important;
    height: r(44px) !important;
    position: relative;
    display: flex;
    justify-items: center;
    align-items: center;
  }
  .left-btn {
    padding: 0 r(15px) !important;
    color: #333333;
    position: absolute;
    left: 0px;
    height: r(44px) !important;
    top: 50%;
    display: flex;
    justify-items: center;
    align-items: center;
    z-index: 9;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);

    .iconfont {
      display: block;
      // width: 9px;
      // height: 14px;
      // background-image: url('~@/assets/images/left-btn.png');
      // background-size: contain;
      // background-position: center;
      // background-repeat: no-repeat;
    }
  }
  .right-btn {
    font-size: r(12px);
    padding: 0 r(15px);
    color: #272727;
    position: absolute;
    right: 0px;
    height: r(42px);
    top: 50%;
    display: flex;
    justify-items: center;
    align-items: center;
    z-index: 9;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    .iconfont {
      display: block;
      width: r(20px);
      height: r(20px);
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .header-txt {
    width: 60%;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // flex: 1;
    //      display: inline-block;
    font-size: r(16px) !important;
    font-weight: bold;
    color: #212121;
    line-height: r(23px);
  }
  .right-word {
    font-size: r(7px);
    color: #4a4a4a;
    position: absolute;
    right: r(10px);
  }
  .top-fixed-shadow {
    box-shadow: 0 r(2px) r(4px) rgba(0, 0, 0, 0.17);
  }
  &.top-fixed-shadow {
    box-shadow: 0 r(2px) r(4px) rgba(0, 0, 0, 0.17);
  }
  .back-icon {
    width: r(10px);
    height: r(18px);
  }
}

/* 顶部分享 */
.right-content {
  position: absolute;
  right: 0;
  // background-image: url("~@/assets/images/publicImg/top_rigth.png");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  height: r(44px);
  line-height: r(44px);
  width: r(60px);
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  div {
    width: 50% !important;
    height: 100% !important;
  }
}
</style>
