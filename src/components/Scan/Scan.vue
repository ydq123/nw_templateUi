<!-- 移动端页面滑动警告[Intervention] Unable to preventDefault inside passive event listener
   在有滚动的容器css样式添加如下代码 style="touch-action: pan-y;" -->
<template>
    <div
      v-show="!showCancel"
      :style="{ 'z-index': zIndex }"
      class="scan"
      ref="ball"
      id="moveDiv"
      @mousedown="down"
      @touchstart="down"
      @mousemove.stop.prevent="move"
      @touchmove.stop.prevent="move"
      @mouseup="end"
      @touchend="end"
    >
      <slot name="scanLot">
        <img class="scanImg" :src="centerImg" @click.stop="menuItmeTap"/>
      </slot>
    </div>
</template>

<script>
import { NWtabMinxin } from "../../mixin/NWtabMinxin.js";
export default {
  mixins: [NWtabMinxin], //混入公共类
  props: {
    result: { //必穿，否则外部无法接收扫成功后的回调内容
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 101
    },
    isCustomScanHandle: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showCancel: false,
      centerImg: require("../../assets/images/scan.png"),
      flags: false,
      moveDiv: "",
      cancelDiv: "",
      position: {
        x: 0,
        y: 0
      },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: ""
    };
  },
  watch: {},
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.moveDiv = this.$refs.ball;
    this.cancelDiv = this.$refs.cancel;
  },
  methods: {
    menuItmeTap() {
      if(this.isCustomScanHandle) {
        this.$emit('customHandle');
      }else {
        let that = this;
        this.myJssdk.scanQRCode({
          needResult: 1,
          success(data) {
            alert(data);
            that.$emit('result', data);
          },
          fail(error) {
            if(error== 'user cancel') {
              return
            }
            that.$emit('result', data);
          }
        })
      }
    },
    // 实现移动端拖拽
    down() {
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = this.moveDiv.offsetLeft;
      this.dy = this.moveDiv.offsetTop;
    },
    move() {
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        let LimitX =
          document.documentElement.clinetWidth || document.body.clientWidth;
        let limitY =
          document.documentElement.clientHeight || document.body.clientHeight;
        if (
          this.xPum < 0 ||
          this.yPum < 0 ||
          this.xPum > LimitX - this.moveDiv.offsetWidth ||
          this.yPum > limitY - this.moveDiv.offsetHeight
        ) {
          return false;
        }
        this.moveDiv.style.left = this.xPum + "px";
        this.moveDiv.style.top = this.yPum + "px";
        //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        window.addEventListener("touchmove", e => e.preventDefault());
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    },
    downTap: function() {
      if (this.showCancel) {
        var bodyW = this.tabScreenWidth / 2;
        //当最终位置在屏幕左半部分,默认松开无缝贴合
        var setBodyW = this.xPum || this.tabScreenWidth;
        if (setBodyW < bodyW) {
          this.moveDiv.style.left = "0px";
        } else {
          //当最终位置在屏幕左半部分
          this.moveDiv.style.left = this.tabScreenWidth - 48 + "px";
        }
      }
      this.showCancel = false;
    }
  }
};
</script>
<style scoped lang="less">
@import "../../assets/less/nw_tool.less";
.scan {
  position: fixed;
  .pxToremLess(width, 48px);
  .pxToremLess(height, 48px);
  .pxToremLess(right, 20px);
  .pxToremLess(bottom, 50px);
  border-radius: 50%;

  .scanImg {
    .pxToremLess(width, 65px);
    .pxToremLess(height, 65px);
  }
}

/* 边角做圆 */
.round-20 {
  .pxToremLess(border-radius, 20px);
}

.dialog-content {
  transition: 0.3s ease;
  transform: translateY(-50%) scale(0.2);
  opacity: 0;

  &.show {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}
</style>
