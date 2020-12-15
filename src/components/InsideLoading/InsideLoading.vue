<template>
  <div class="sync-loding column al-c ju-c f14">
    <div class="loadingImg">
      <slot name="loadingImg"><van-icon name="replay"/></slot>
    </div>
    <div class="sxtd mt15">
      <slot name="loadingText"><span>拼命加载中..</span></slot>
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
      <label slot="loadingText">
       <span>获取数据中...</span>
      </label>
    </inside-loading>
    -->
  </div>
</template>

<script>
export default {
  props: {
    insideCode: {
      type: Number,
      default: 200
    }
  },
  mixins: [], //混入公共类
  name: "inside-loading",
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/nw_tool.scss";
.sync-loding {
  // height: 100%;
  text-align: center;
  color: #b5b5b5;
}
.loadingImg {
  animation: rotate 0.7s linear infinite;
  font-size: r(70px) !important;
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
    letter-spacing: r(10px);
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
