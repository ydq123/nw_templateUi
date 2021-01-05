<template>
  <div ref="slidePanel" class="">
    <slot name="outer"></slot>
    <div ref="scrollPanel" :style="{top: top,height:height}" class="slide-panel" @mousedown="onButtonDown" @touchstart="onButtonDown">
      <slot name="static"></slot>
      <div v-show="showState === 'simple'" ref="slideSimple" class="slide-simple" @click.stop="toMiddle">
        <slot name="simple"></slot>
      </div>
      <div v-show="showState !== 'simple'" :class="['slide-detail', `state_${showState}`]" ref="slideDetail">
        <slot name="detail"></slot>
      </div>
    </div>
  </div>
</template>
<script>
/* ease动画函数 */
function ease(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 2))
}

export default {
  props: {
    // 默认显示的面板
    showState: {
      type: String,
      default: 'simple'
    },
    // 高度定义：simple / middle / detail
    layout: {
      type: Array,
      default() {
        return ['36px', '60%', '100%']
      }
    },
    // 只针对该数组中的元素才能进行手势动作
    effectDOM: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      top: 0,
      min: null,
      middle: null,
      max: null,
      height:0,
      // 手势相关属性
      dragging: false, // 是否正在拖动
      isClick: false, // 标记是否是start事件
      direction: null,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: null,
      tickID: null
    }
  },
  computed: {
    hasSplit() {
      return this.layout.length >= 3
    },
    currentPosition() {
      return this.top
    }
  },
  watch: {
    top(val) {
      let showState = ''
      const top = parseFloat(val)
      if (top >= (this.min - 10)) {
        showState = 'simple'
      } else{
        if(this.hasSplit){
          const split = (this.max - this.middle) / 2
          showState = (top <= this.middle + split && top >= this.max) ? 'detail' : 'middle'
        } else{
          showState = 'detail'
        }
      }
      if(showState !== this.showState){
        this.changeShowState(showState)
      }
      console.log(showState)
    },
    layout:{
      deep: true,
      handler(val){
        this.initPosition()
      }
    }
  },
  mounted(){
    this.windowHt = window.innerHeight
    this.initPosition()
    window.addEventListener('resize', () => {
      this.windowHt = window.innerHeight
      this.initPosition()
    })
  },
  methods: {
    changeShowState(state) {
      this.$emit('update:show-state', state)
    },
    initPosition() {
      const wdHt = window.innerHeight
      const init = ['42px', '60%', '100%']
      const position = this.layout.map((p, ind) => {
        const newP = isNaN(parseFloat(p)) ? init[ind] : p
        const val = parseFloat(newP)
        if (newP.indexOf('%') !== -1) {
          return ((100 - val) * wdHt) / 100
        } else {
          return wdHt - val
        }
      })
      this.min = position[0]
	  console.log(this.min);
      this.middle = position[1]
      this.max = position.pop()
      this.top = (this.showState === 'middle' ? this.middle : this.showState === 'detail' ? this.max : this.min) + 'px'
      console.log(`min: ${this.min}; middle: ${this.middle}; max: ${this.max}; top: ${this.top}`)
    },
    onButtonDown(event) {
      if (this.effectDOM && this.effectDOM.length) { // 如果定义
        const effectName = this.findEffectDOM(event.target)
        if (!effectName) {
          return false
        }
      }
      this.onDragStart(event)
      window.addEventListener('mousemove', this.onDragging)
      window.addEventListener('touchmove', this.onDragging)
      window.addEventListener('mouseup', this.onDragEnd)
      window.addEventListener('touchend', this.onDragEnd)
      window.addEventListener('contextmenu', this.onDragEnd)
    },

    // 判断是否是在可以进行手势动作的区域
    findEffectDOM(node) {
      let paramName = ''
      if (!paramName && node && node !== this.$refs.slidePanel && node !== document.body) {
        const classList = node.classList
        const idAttr = node.id ? node.id : ''
        this.effectDOM.forEach(name => {
          name = name.replace(/^[#.]/, '')
          if (idAttr === name) {
            paramName = '#' + name
            return false
          } else if (classList && classList.contains(name)) {
            paramName = '.' + name
            return false
          }
        })
        if (!paramName && node) {
          paramName = this.findEffectDOM(node.parentNode)
        }
      }
      return paramName
    },

    onDragStart(event) {
      this.dragging = true
      this.isClick = true
      if (event.type === 'touchstart') {
        event.clientY = event.touches[0].clientY
      }
      this.startY = event.clientY
      this.startPosition = parseFloat(this.currentPosition)
      this.newPosition = this.startPosition
    },

    onDragging(event) {
      if (this.dragging) {
        this.isClick = false
        if (event.type === 'touchmove') {
          event.clientY = event.touches[0].clientY
        }
        this.currentY = event.clientY
        const diff = this.currentY - this.startY
        this.direction = diff > 0 ? 'down' : diff < 0 ? 'up' : null
        const scrollDOM = this.findScrollDOM(event.target)
        if(diff > 0 && scrollDOM && scrollDOM.scrollTop > 0){
          return
        }

        this.newPosition = this.startPosition + diff
        this.setPosition(this.newPosition)
        this.emitAnimate('changing', this.newPosition, this.direction)
      }
    },

    onDragEnd(event) {
      if (this.dragging) {
        setTimeout(() => {
          this.dragging = false
          if (!this.isClick) {
            let target
            const c = parseFloat(this.currentPosition)
            if (this.direction === 'down') {
              target = c > this.max && c < this.middle ? this.middle : c > this.middle && c < this.min ? this.min : c
            }
            if (this.direction === 'up') {
              target = c > this.max && c < this.middle ? this.max : c > this.middle && c < this.min ? this.middle : c
            }
            if(target === c){
              this.emitAnimate('end', c)
            } else{
              this.to(target)
            }
          }
        }, 0)
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('touchmove', this.onDragging)
        window.removeEventListener('mouseup', this.onDragEnd)
        window.removeEventListener('touchend', this.onDragEnd)
        window.removeEventListener('contextmenu', this.onDragEnd)
      }
    },

    // 判断是否是内容滚动区域
    findScrollDOM(node) {
      if (node && node !== document.body) {
        const isScroll = node.getAttribute('aria-label') === 'scroll'
        if (isScroll) {
          return node
        } else {
          return this.findScrollDOM(node.parentNode)
        }
      }
    },

    setPosition(val) {
      if (val <= this.min && val >= this.max) {
        this.top = val + 'px';
        let height = (this.min - val - 1 );
        if (height < (this.windowHt -this.min) *2) {
          height = (this.windowHt -this.min) *2;
        }
        this.height = height + 'px';
      }
    },

    to(endVal) {
      const self = this
      const startVal = parseFloat(this.currentPosition)
      const diffDir = endVal - startVal // 目标值和当前值的差值
      const direction = diffDir > 0 ? 'down' : diffDir < 0 ? 'up' : null
      const time = 200
      if (diffDir !== 0) {
        const beginTime = +new Date() // 开始时间戳
        const toTick = function() {
          const diffTime = +new Date() - beginTime // 时间差值

          // 若超出了指定时间，则动画结束
          if (diffTime >= time) {
            self.setPosition(endVal)
            self.emitAnimate('end', endVal, direction)
            return
          }

          // 否则就继续进行动画
          var nextPosition = diffDir * ease(diffTime / time) + startVal
          self.setPosition(nextPosition)
          self.emitAnimate('changing', nextPosition, direction)
          self.tickID = requestAnimationFrame(toTick) // 循环调用动画
        }
        toTick()
      }
    },

    toMin() {
      this.to(this.min)
    },
    toMax() {
      this.to(this.max)
    },
    toMiddle() {
      if (this.hasSplit) {
        this.to(this.middle)
      } else {
        this.to(this.max)
      }
    },

    emitAnimate(witch, top, direction){
      if(witch === 'changing'){
        this.$emit('animating', { top, direction })
      } else{
        const state = top === this.min ? 'min' : top === this.middle? 'middle' : top === this.max? 'max': null;
        this.$emit('animate-end', { top, direction, state, layout: {min: this.min, middle: this.middle, max: this.max} })
      }
    },

    // animateEnd(top, state){
    //   let showState = 'detail'
    //   if(!state){
    //     debugger
    //     if(top >= this.min){
    //       showState = 'simple';
    //       this.toMin()
    //     } else if(top >= this.middle && top < this.min){
    //       showState = 'middle';
    //       this.toMiddle()
    //     } else {
    //       showState = "detail";
    //       this.toMax()
    //     }
    //   }
    //   return showState;
    // }
  }
}
</script>
<style lang="less">
.slide-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  .slide-simple {
    height: 100%;
		background-color: #fff;
    .to-show-more {
      height: 100%;
      line-height: 36px;
      font-size: 14px;
      text-align: center;
      background: #fff;
      box-shadow: 0 1px 3px #9e9e9e;
    }
  }
  .slide-detail {
    height: 100%;
	background-color: #fff;
  }
}
</style>
