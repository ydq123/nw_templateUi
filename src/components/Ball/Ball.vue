<template>
  <div>
    <div class="ball-container">
      <transition v-for="(ball, index) in balls" :key="index" name="drop" @before-enter="beforeEnter" @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook fw" :style="{backgroundColor:ballColor}">
            {{ballNub}}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      ballColor: {
        type: String,
        default: 'rgb(0, 160, 220)'
      },
      ballNub: {
        type: Number,
        default: 1
      },
      direction: {
        type: String,
        default: 'left'
      }
    },
    data() {
      return {
        balls: [{
            show: false,
          },
          {
            show: false,
          },
          {
            show: false,
          },
          {
            show: false,
          },
          {
            show: false,
          },
        ],
        dropBall: [],
        directions: ['left', 'right']
      };
    },
    mounted() {
      if (this.direction == this.directions[1]) {

      }
    },
    methods: {
      changeShow(index, isShow, el) {
        this.balls[index].show = isShow;
        this.balls[index].el = el;
      },
      changeDropBall(ball) {
        this.dropBall.push(ball);
      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            //getBoundingClientRect返回值是一个 DOMRect 对象, 此包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。
            //除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 72;
            let y = -(window.innerHeight - rect.top - 22);
            //小球外层控制y轴的运动轨迹,translate3d()可以开启硬件加速
            el.style.display = "";
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            //内层小球控制x轴运动轨迹,内外层运动方式是不一样的, y轴贝塞尔曲线, x轴匀速.
            let inner = el.getElementsByClassName("inner-hook")[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter(el) {
        // 触发浏览器重绘
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = "translate3d(0, 0, 0)";
          el.style.transform = "translate3d(0, 0, 0)";
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(0, 0, 0)`;
          inner.style.transform = `translate3d(0, 0, 0)`;
        });
      },
      afterEnter(el) {
        // 删除数组第一个元素, 并返回第一个元素,因对象都是指向地址,所以操作dropBall数组也就操作了balls数组
        let ball = this.dropBall.shift();
        if (ball) {
          ball.show = false;
          el.style.display = "none";
        }
        this.$emit('pageAfterEnter')
      },
    },
  };
</script>

<style lang="less" scoped>
  .ball-container {
    .ball {
      position: fixed;
      left: 2rem;
      bottom: 1rem;
      z-index: 200;
      width: 0.32rem;
      height: 0.32rem;
      border-radius: 50%;

      // background rgb(0, 160, 220)
      &.drop-enter-active {
        transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      }

      .inner {
        width: 0.60rem;
        height: 0.60rem;
        border-radius: 50%;
        transition: all 0.6s linear;
        color: #fff;
        font-size: 12px;
        text-align: center;
      }
    }
  }
</style>
