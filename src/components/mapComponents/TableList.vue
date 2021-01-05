<template>
	<nw-slide-index ref="slideIndex" :show-state="showState" :layout="layout" @animate-end="animateEnd">
		<template v-slot:static>
			<div style="height: 44px" class="bg-white">
				<div class="tab-box width-100 borderButtomE8 bg-white">
					<div class="pt5 row ju-c al-c">
						<div class="tab-top"></div>
					</div>
					<div class="tab-list-border row ju-a bg-white verticle-center f16">
						<div @click="changeTabList(tabIndex)" class="tab-item text-center width-30" v-for="(tabItem, tabIndex) in tabList"
						 :key="tabIndex">
							<!-- <span v-if="tabIndex == 0" class="lh200 f14 text-white">占</span> -->
							<span class="lh200 f14" :class="[curTabIndex === tabIndex ? 'gray287 fw' : 'gray3']">
								{{ tabItem.title }}</span>
							<span class="lh200 f14" :class="[curTabIndex === tabIndex ? 'gray287 fw' : 'gray9']">( {{ tabListNum[tabIndex] }}
								)</span>
						</div>
						<div class="tab-border bg-287" :style="activeBarStyle" ref="activeBar"></div>
					</div>
				</div>
			</div>
		</template>
		<template v-slot:detail>
			<slot name="listDetail"></slot>
		</template>
	</nw-slide-index>
</template>

<script>
	export default {
		props: {
			// 默认显示的面板
			showState: {
				type: String,
				default: "",
			},
			// 高度定义：simple / middle / detail
			layout: {
				type: Array,
				default () {
					return ["36px", "60%", "100%"];
				},
			},
			// 只针对该数组中的元素才能进行手势动作
			effectDOM: {
				type: Array,
				default () {
					return [];
				},
			},
			// 已办待办数据列表
			tabList: {
				type: Array,
				default () {
					return [{
							title: "待办",
							state: 0,
						},
						{
							title: "已办",
							state: 1,
						},
					];
				},
			},
			// 待办，已办数量
			tabListNum: {
				type: Array,
				default () {
					return [0, 0];
				},
			},
		},
		name: "nw-tableList",
		data() {
			return {
				curTabIndex: 0,
				activeBarX: 0,
				activeBarWidth: 0,
			};
		},
		mounted() {
			this.calcBarPosX();
		},
		methods: {
			// 点击列表数据
			animateEnd: function(data) {
				this.$emit("animateEnd1", data);
			},
			// 切换tab
			changeTabList(index) {
				this.curTabIndex = index;
				this.calcBarPosX();
				this.$emit("changeTab", index);
			},
			// 主动触发显示
			toMiddle() {
				this.$refs.slideIndex.toMiddle();
			},
			// 计算activeBar的translateX
			calcBarPosX: function() {
				var listChildren = document.getElementsByClassName("tab-item");
				if (listChildren.length <= this.curTabIndex) return;
				var item = listChildren[this.curTabIndex];
				var itemWidth = item.offsetWidth;
				var itemLeft = item.offsetLeft;
				this.activeBarWidth = Math.max(itemWidth * 1, itemWidth * 1);
				this.activeBarX = itemLeft + (itemWidth - this.activeBarWidth) / 2;
			},
		},
		computed: {
			// 动画
			activeBarStyle: function() {
				var left = this.activeBarWidth / 2 - 15; // 15是线宽度的一半
				if (this.curTabIndex == 0 || this.curTabIndex == 2) {
					left = this.activeBarWidth / 2 - 10;
				}
				return {
					transition: "all 300ms",
					// width: this.activeBarWidth + 'px',
					width: 30 + "px",
					left: left + "px",
					transform: "translate3d(" + this.activeBarX + "px, 0px, 0px)", //动画属性,
					backgroundColor: this.activeColor,
				};
			},
		},
	};
</script>

<style lang="less" scoped>
	.tab-top {
		width: 8vw;
		height: 1vw;
		background-color: #cccccc;
		border-radius: 0.5vw;
	}

	.tab-list-border {
		position: relative;
		min-width: 100%;
		overflow-x: scroll;
		white-space: nowrap;

		.tab-item {
			height: 44px;
			line-height: 44px;
		}

		.tab-border {
			position: absolute;
			bottom: 6px;
			height: 3px;
			border-radius: 6px;
		}

		.tab-number {
			position: absolute;
			bottom: 14px;
			display: inline-block;
			height: 15px;
			line-height: 15px;
			margin-left: 2px;
			padding: 0 7px;
			background-color: #f15747;
			border-radius: 7px;
			font-size: 10px;
			color: #ffffff;
		}
	}
</style>
