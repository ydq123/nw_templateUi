<template>
  <div class="sync-loding column al-c ju-c f14">
    <div class="loadingImg">
      <slot name="loadingImg"><van-icon name="replay"/></slot>
    </div>
    <div class="sxtd mt15">
      <span>{{loadingText}}</span>
    </div>

    <!-- 调用示例-->
    <!--
    普通用法
    <inside-loading> </inside-loading>
    替换插槽
    <inside-loading>
      <div slot="loadingImg">
        <van-icon name="shrink" />
      </div>
    </inside-loading>
    -->
  </div>
</template>

<script>
export default {
  props: {
    loadingText: {
      type: String,
      default: '拼命加载中...'
    }
  },
  mixins: [], //混入公共类
  name: "inside-loading",
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../../assets/scss/nw_tool.less";
.sync-loding {
  // height: 100%;
  text-align: center;
  color: #b5b5b5;
}
.loadingImg {
  animation: rotate 0.7s linear infinite;
	.pxToremLess(font-size,70px);
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.sxtd {
  animation: bounce-up 0.8s linear infinite;
  span {
    //文字间距
		.pxToremLess(letter-spacing,10px);
  }
}

@keyframes bounce-up {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(3px);
  }
  50% {
    transform: translateY(6px) scale(1.1, 0.9);
  }
  75% {
    ransform: translateY(3px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
