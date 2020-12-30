<!-- 移动端页面滑动警告[Intervention] Unable to preventDefault inside passive event listener
   在有滚动的容器css样式添加如下代码 style="touch-action: pan-y;" -->
<template>
	<div>
		<div v-show="!showCancel" :style="{'z-index':zIndex}" class="xuanfu" ref="ball" id="moveDiv" @mousedown="down"
		 @touchstart="down" @mousemove.stop.prevent="move" @touchmove.stop.prevent="move" @mouseup="end" @touchend="end">
			<slot name='centerImg'>
				<img @click.stop="menuItmeTap('')" class="xuanfuImg" :src="centerImg" />
			</slot>
		</div>
		<div :style="{'z-index':zIndex}" class="pb20 pl20 pr20  round-20 dialog-content menuArr" ref="cancel" :class="{ show: showCancel }">
			<div @click="showCancel=!showCancel" class="row  fl-w" :class="[menuArr.length>3?'ju-b':'ju-a']">
				<div @click.stop="menuItmeTap(index)" class="column al-c mt20 ml5 mr5" v-for="(itme,index) in menuArr">
					<slot name="menuItme">
						<slot name="menuImg">
							<i v-if="itme.iconName" class="iconfont text-white" :class="[itme.iconColor?itme.iconColor:'text-white',itme.iconSize?itme.iconSize:mrIcoSize,itme.iconName]"></i>
							<img v-else class="menuArrImg" :src="itme.imgName" />
						</slot>
						<slot name="menuText">
							<span class="mt10 f14" :class="[itme.iconColor?itme.iconColor:'text-white']">{{itme.name}}</span>
						</slot>
					</slot>
				</div>
			</div>
		</div>
		<div @touchstart="downTap" v-show="showCancel" :style="{'z-index':zIndexBg}" style="position: fixed;top:0;left:0;width: 100vw;height: 100vh;"
		 @click="showCancel=!showCancel">
		</div>
	</div>
</template>

<script>
	import {
		NWtabMinxin
	} from '@/mixin/NWtabMinxin.js';
	export default {
		mixins: [NWtabMinxin], //混入公共类
		props: {
			zIndex: {
				type: Number,
				default: 102
			},
			zIndexBg: {
				type: Number,
				default: 90
			},
			mrIcoSize: {
				type: String,
				default: 'f30', //图标大小
			},
			menuArr: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				showCancel: false,
				centerImg: require("@/assets/images/center.png"),
				flags: false,
				moveDiv: '',
				cancelDiv: '',
				position: {
					x: 0,
					y: 0
				},
				nx: '',
				ny: '',
				dx: '',
				dy: '',
				xPum: '',
				yPum: '',
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
			menuCfTap: function() {

			},
			menuItmeTap: function(index) {
				var leg = this.menuArr.length;
				var val = '';
				if (leg > 0) {
					this.showCancel = !this.showCancel;
					if (this.showCancel == false) {
						val = {
							index: index
						};
						this.$emit('menuClick', val);
					}
				} else {
					this.$emit('menuClick', val);
				}
			},
			setCancel: function() {
				//屏幕宽tabScreenWidth 屏幕高度    tabScreeHeight
				var objMove = this.$baseDomOffset(this.moveDiv);
				// console.log(objMove);
				// console.log(this.tabScreeHeight);
				var w3 = this.tabScreenWidth / 3;
				var canceW = this.tabScreenWidth * 0.8;
				if (objMove.l < w3) {
					//在左半边
					var w1 = objMove.l + canceW;
					if (w1 > this.tabScreenWidth) {
						this.cancelDiv.style.left = w1 - this.tabScreenWidth + 'px';
					} else {
						this.cancelDiv.style.left = objMove.l + 'px';
					}
				} else {
					if (objMove.l < w3 * 2) {
						//中间
						this.cancelDiv.style.left = 30 + 'px';
					} else {
						//右半边
						var rw = objMove.l - canceW;
						if (rw > 10) {
							this.cancelDiv.style.left = objMove.l - canceW + 'px';
						} else {
							this.cancelDiv.style.left = '10px';
						}
					}
				}
				if (objMove.t < 90) {
					this.cancelDiv.style.top = '90px';
				} else {
					var bh = this.tabScreeHeight - objMove.t;
					if (this.menuArr.length > 3) {
						if (bh < 80) {
							this.cancelDiv.style.top = objMove.t - 80 + 'px';
						} else {
							this.cancelDiv.style.top = objMove.t + 'px';
						}
					} else {
						if (bh < 60) {
							this.cancelDiv.style.top = objMove.t - 60 + 'px';
						} else {
							this.cancelDiv.style.top = objMove.t + 'px';
						}
					}

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
					let LimitX = document.documentElement.clinetWidth || document.body.clientWidth;
					let limitY = document.documentElement.clientHeight || document.body.clientHeight;
					if (this.xPum < 0 || this.yPum < 0 || this.xPum > LimitX - this.moveDiv.offsetWidth || this.yPum > limitY - this.moveDiv
						.offsetHeight) {
						return false;
					}
					this.moveDiv.style.left = this.xPum + 'px';
					this.moveDiv.style.top = this.yPum + 'px';
					//阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
					window.addEventListener('touchmove', e => e.preventDefault())
				}
			},
			//鼠标释放时候的函数
			end() {
				this.flags = false;
				this.setCancel();
			},
			downTap: function() {
				if (this.showCancel) {
					var bodyW = this.tabScreenWidth / 2;
					//当最终位置在屏幕左半部分,默认松开无缝贴合
					var setBodyW = this.xPum || this.tabScreenWidth;
					if (setBodyW < bodyW) {
						this.moveDiv.style.left = '0px';
					} else { //当最终位置在屏幕左半部分
						this.moveDiv.style.left = (this.tabScreenWidth - 48) + 'px';
					}
				}
				this.showCancel = false;
			}
		}
	};
</script>
<style scoped lang="less">
@import "../../assets/less/nw_tool.less";
	.xuanfu {
		position: fixed;
		.pxToremLess(width,48px);
  	.pxToremLess(height,48px);
		right: 0;
  	.pxToremLess(bottom,30px);
		border-radius: 50%;

		.xuanfuImg {
			.pxToremLess(width,48px);
			.pxToremLess(height,48px);
		}
	}

/* 边角做圆 */
.round-20{
	.pxToremLess(border-radius,20px);
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
	.menuArr {
		position: fixed;
		width: 80vw;
		background: rgba(0, 0, 0, 0.5);

		.menuArrImg {
				.pxToremLess(height,40px);
				.pxToremLess(width,40px);
		}

		.menuArrSpan {}
	}
</style>
