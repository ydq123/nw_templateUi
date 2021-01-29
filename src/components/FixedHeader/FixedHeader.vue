<template>
	<div class="top-fixed" id="header" :style="'padding-top:' + '0px ;'">
		<slot name="default">
			<div class="header">
				<div class="left-btn">
					<slot name="left">
						<div @click="headBack">
							<i class="iconfont icon-houtui"></i>
						</div>
					</slot>
				</div>
				<slot name="center">
					<div class="header-txt f16">{{ title }}</div>
				</slot>
				<!-- <div class="right-content">更多</div> -->
				<div class="right-content">
					<slot name="right">
						<div class="right-slot-content">
							<slot name="right1">
								<!--  @click="threeClock" -->
								<div class="bg-white"></div>
							</slot>
							<slot name="right2">
								<div @click="backHome"></div>
							</slot>
						</div>
					</slot>
				</div>
			</div>
		</slot>
		<slot name="page-bottom"></slot>
		<!--第一种--使用示例如下 直接自己全新定义 -->
		<!-- <nw-FixedHeader @headBackeHandle="backHandle" @threeClockHandle="ClockHandle" @backHomeHandle="HomeHandle">
      <div slot="default">
				<div class="header">
					<div class="left-btn">取消222</div>
					<div class="header-txt">标题标题222</div>
					<div class="right-content">4526</div>
				</div>
        <div slot="page-bottmo">需要固定在头部的其他东西</div>
			</div>
    </nw-FixedHeader> -->
		<!-- 第二种--使用示例如下 title传进来，自己定义left和right内容，也可以不传，有默认内容 自个斟酌-->
		<!-- <nw-FixedHeader title="徐徐噶" @headBackeHandle="backHandle" @threeClockHandle="ClockHandle" @backHomeHandle="HomeHandle">
      <div slot="left"><i class="pl10 iconfont icon-huitui"></i></div>
      <div slot="right"><i class="pr10 iconfont icon-qianjin"></i></div>
      <div slot="page-bottmo">需要固定在头部的其他东西</div>
    </nw-FixedHeader> -->
		<!-- methods说明 -->
		<!-- headBackeHandle---点击左上角返回按钮事件  threeClockHandle---点击右上角三点按钮事件 backHomeHandle---点击右上角⚪点按钮事件-->
	</div>
</template>

<script>
	import {
		NWtabMinxin
	} from "../../mixin/NWtabMinxin.js";
	export default {
		props: {
			title: {
				type: String,
				default: "默认标题"
			}
		},
		mixins: [NWtabMinxin], //混入公共类
		name: "fixed-header",
		methods: {
			threeClock() {
				this.$emit("threeClockHandle");
			},
			backHome() {
				// this.$emit("backHomeHandle");
				this.$nwBackHome('');
			},
			headBack() {
				this.$nwBack(-1);
				// this.$emit("headBackeHandle");
			}
		}
	};
</script>

<style lang="less" scoped>
	@import "../../assets/less/nw_tool.less";

	//顶部返回导航
	.top-fixed {
		width: 100%;
		background: transparent;
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
			background: #fff;
			.pxToremLess(line-height, 44px);
			.pxToremLess(height, 44px);
			position: relative;
			display: flex;
			justify-items: center;
			align-items: center;
		}

		.left-btn {
			.pxToremLess(padding-left, 15px);
			.pxToremLess(padding-right, 15px);
			.pxToremLess(padding-top, 0);
			.pxToremLess(padding-bottom, 0);
			color: #333333;
			position: absolute;
			left: 0px;
			.pxToremLess(height, 44px);
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
			.pxToremLess(font-size, 12px);
			.pxToremLess(padding-left, 15px);
			.pxToremLess(padding-right, 15px);
			.pxToremLess(padding-top, 0);
			.pxToremLess(padding-bottom, 0);
			color: #272727;
			position: absolute;
			right: 0px;
			.pxToremLess(height, 42px);
			top: 50%;
			display: flex;
			justify-items: center;
			align-items: center;
			z-index: 9;
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);

			.iconfont {
				display: block;
				.pxToremLess(width, 20px);
				.pxToremLess(height, 20px);
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
			font-weight: bold;
			color: #212121;
			.pxToremLess(line-height, 23px);
		}

		.right-word {
			.pxToremLess(font-size, 7px);
			color: #4a4a4a;
			position: absolute;
			.pxToremLess(right, 10px);
		}

		.top-fixed-shadow {
			box-shadow: 0 0.15rem 0.20rem rgba(0, 0, 0, 0.17);
		}

		&.top-fixed-shadow {
			box-shadow: 0 0.15rem 0.20rem rgba(0, 0, 0, 0.17);
		}

		.back-icon {
			.pxToremLess(width, 10px);
			.pxToremLess(height, 18px);
		}
	}

	/* 顶部分享 */
	.right-content {
		.pxToremLess(width, 86px);
		.pxToremLess(height, 44px);
		.pxToremLess(line-height, 44px);
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		transform-origin: 0 0;
		-webkit-transform-origin: 0 0;

		.right-slot-content {
			.pxToremLess(width, 86px);
			.pxToremLess(height, 44px);
			.pxToremLess(line-height, 44px);
			background-size: contain;
			background-position: center center;
			background-repeat: no-repeat;
			background-image: url("../../assets/images/top_rigth.png");

			div {
				float: left;
				width: 50% !important;
				height: 100% !important;
			}
		}
	}
</style>
