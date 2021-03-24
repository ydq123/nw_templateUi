<template>
	<div>
		<div class="yw-moduletop nw_bag_F5">
			<slot name="topInput">
				<!-- 搜索框 -->
				<div class="top-input bg-f5">
					<div class="input-box" @click="inputTopBtn">
						<i class="iconfont icon-sousuo f14 text-99"></i>
						<span class="f14 text-99">搜索</span>
					</div>
				</div>
			</slot>
			<!-- tab -->
			<div class="tab-box width-100 borderButtomE8" v-if="isTopTab">
				<div class="tab-list-border verticle-center bg-white f16">
					<div @click="changeTab(tabIndex)" class="tab-item" v-for="(tabItem,tabIndex) in tabList" :key="tabIndex">
						<span class="lh200 f14" :class="[ curTabIndex === tabIndex ? 'gray287 fw' : 'gray3']">
							{{tabItem.title}}
							<span v-if="!tabList[tabIndex].nubStatus" :class="[ curTabIndex === tabIndex ? 'gray287 fw' : 'gray3']">({{tabList[tabIndex].number}})</span>
						</span>
						<span class="tab-number" v-if="tabList[tabIndex].nubStatus">{{tabList[tabIndex].number}}</span>
					</div>
					<div class="tab-border bg-287" :style="activeBarStyle" ref="activeBar"></div>
				</div>
			</div>
			<slot name="taskSreenSort">
				<div class="module-row task-top-sreen borderTopE8">
					<div class="flex-1 text-left gray6 pl15 f16 verticle-center">{{'共' + maxNumber + '条记录'}}</div>
					<div class="task-top-sreen-btn pl15 pr15 verticle-center" m="click" @click="changeSort" v-if="isSort">
						<span class="f16 mr5 gray6">排序</span>
						<i class="iconfont icon-qianjin-copy f10 gray9" :class="{'showRotate': sortData.showPop}"></i>
					</div>
					<div class="task-top-sreen-btn pl15 pr15 verticle-center" m="click" @click="changeSreen" v-if="isSreen">
						<span class="f16 mr5 gray6">筛选</span>
						<i class="iconfont icon-shaixuan1 f10 gray9"></i>
					</div>
				</div>
			</slot>
			<!-- 排序 -->
			<div v-if="sortData.showPop" class="bg-white">
				<div v-for="(sortItem, sortIndex) in tabList[curTabIndex].sortList ? tabList[curTabIndex].sortList : sortDataList" :key="sortIndex">
					<div class="f16 p15 gray3 borderTopE8 module-row" @click="changeSortItem(sortIndex)">
						<div class="flex-1 text-left">{{sortItem.text}}</div>
						<i class="iconfont pos-a gray287 icon-gou" v-if="sortItem.isSelect"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="" v-show="showPop" :class="[sortData.showPop?'sortzdc':'sreenzdc']" @click.stop="zdcBtnShow"></div>
		<!-- 筛选 -->
		<div class="sreen-warp bg-white" :class="[sreenData.showPop?'':'showBgcW']">
			<div class="sreen-box">
				<div v-if="curTabIndex == 0">
					<div v-for="(sItem,sIndex) in sreenData.sreenTodoItem" :key="sIndex">
						<div class="p15 f16 text-black text-left borderTopE8">{{ sItem.itemTitle }}</div>
						<div class="clearfix pl15">
							<div v-for="(value,index) in sItem.sreenList" :key="index" class="text-center module-width-33" @click="changSreenItem(sIndex,index)">
								<div class="sreen-item border_1_dc f14 pt10 pb10 pl15 pr15 mr15 mb15" :class="[value.isSelect ? 'sreen-item-cur' : '']">
									{{value.text}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="curTabIndex == 1">
					<div v-for="(sItem,sIndex) in sreenData.sreenDoneItem" :key="sIndex">
						<div class="p15 f16 text-black text-left borderTopE8">{{ sItem.itemTitle }}</div>
						<div class="clearfix pl15">
							<div v-for="(value,index) in sItem.sreenList" :key="index" class="text-center module-width-33" @click="changSreenItem(sIndex,index)">
								<div class="sreen-item border_1_dc f14 pt10 pb10 pl15 pr15 mr15 mb15" :class="[value.isSelect ? 'sreen-item-cur' : '']">
									{{value.text}}
								</div>
							</div>
						</div>
					</div>
				</div>

				<!--  选择时间
				<div class="p15 f16 text-black text-left borderTopE8">开票日期</div>
				<div class="ml15 mr15 pt15 pb15 module-row f15 verticle-center bg-white" @click="showDate5 = true" m="click">
					<div class="gray6 mr15">开始时间:</div>
					<div class="flex-1">
						<div class="gray9 text-right" v-if="!startTime3.time">请选择</div>
						<div class="gray3 text-right" v-else>{{startTime3.time}}</div>
					</div>
					<i class="iconfont icon-qianjin gray9 f13 ml10"></i>
				</div>
				 -->
			</div>
			<div class="bottom_button bg-white module-row ju-b f14 p15">
				<div class="nw_buttom_125_44 bg-f5 border_1_dc gray3" @click="resetScreen">重置</div>
				<div class="nw_buttom_125_44 bg-287 text-white" @click="submitScreen">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ModuleTop',
		display: 'ModuleTop模块头部组件',
		data() {
			return {
				showPop: false,
				showSreenPop: false,
				detailData: null,
				removeEvenStatus: true,
				curTabIndex: 0, //导航栏index
				curTabIndexCP: 0,
				activeBarX: 0,
				activeBarWidth: 0,
				keyWord: "",
				//排序数组下标判断
				sortData: {
					dbIndex: 0, //待办下标
					ybIndex: 0, //已办下标
					showPop: false
				},
				//筛选条件
				sreenData: this.sreenDataObj,
			}
		},
		props: {
			maxNumber: { /*共 条记录*/
				type: Number,
				default: 0
			},
			tabList: { // tab数组
				type: Array,
				default: () => [{
						title: "待办",
						nubStatus: false, //控制是否显示-顶部数标
						number: 0,
						sortList: [{
								text: "按日期降序",
								isSelect: false,
								sortType: "desc", //排序类型
							},
							{
								text: "按日期升序",
								isSelect: false,
								sortType: "asc", //排序类型
							},
						]
					},
					{
						title: "已办",
						nubStatus: false, //控制是否显示-顶部数标
						number: 0,
						sortList: [{
								text: "按日期降序",
								isSelect: false,
								sortType: "desc", //排序类型
							},
							{
								text: "按日期升序",
								isSelect: false,
								sortType: "asc", //排序类型
							},
						]
					},
				]
			},
			isSort: { // 控制显示排序按钮，默认为true：显示
				type: Boolean,
				default: true
			},
			isTopTab: { // 控制显示头部tab，默认为true：显示
				type: Boolean,
				default: true
			},
			isSreen: { // 控制显示筛选按钮，默认为true：显示
				type: Boolean,
				default: true
			},
			sortDataList: { // 排序数组
				type: Array,
				default: () => [{
						text: "按日期降序",
						isSelect: false,
						sortType: "desc", //排序类型
					},
					{
						text: "按日期升序",
						isSelect: false,
						sortType: "asc", //排序类型
					},
				]
			},
			sreenDataObj: { // 筛选对象
				type: Object,
				default: () => ({
					showPop: false,
					qfDdx: true, // 区分单选和多选，默认true为多选，false为单选
					sreenTodoItem: [ // 待办数组
						{
							itemTitle: '待办状态',
							isArrSta: 'todoZt', // 返回判断数组数据标识
							sreenList: [{
									id: "",
									text: "状态0",
									isSelect: false
								},
								{
									id: "",
									text: "状态1",
									isSelect: false
								},
								{
									id: "",
									text: "状态2",
									isSelect: false
								},
								{
									id: "",
									text: "状态3",
									isSelect: false
								},
							]
						},
					],
					sreenDoneItem: [ // 已办数组
						{
							itemTitle: '已办状态',
							isArrSta: 'doneZt', // 返回判断数组数据标识
							sreenList: [{
									id: "",
									text: "已办0",
									isSelect: false
								},
								{
									id: "",
									text: "已办1",
									isSelect: false
								},
								{
									id: "",
									text: "已办2",
									isSelect: false
								},
								{
									id: "",
									text: "已办3",
									isSelect: false
								},
							]
						},
					],
				})
			}
		},
		computed: {
			activeBarStyle: function() {
				var leg = this.tabList[this.curTabIndex].title.length || 0;
				if (leg == 2) {
					var left = this.activeBarWidth / 2 - 15; // 15是线宽度的一半
				} else if (leg == 3) {
					var left = this.activeBarWidth / 2 - 16; // 15是线宽度的一半
				} else {
					var left = this.activeBarWidth / 2 - 15; // 15是线宽度的一半
				}
				return {
					transition: "all 300ms",
					// width: this.activeBarWidth + 'px',
					width: 30 + "px",
					left: left + "px",
					transform: "translate3d(" + this.activeBarX + "px, 0px, 0px)", //动画属性,
					backgroundColor: this.activeColor
				};
			}
		},
		watch: {
			showPop: function() {
				if (!this.showPop) {
					document.body.style.overflow = '';
				} else {
					document.body.style.overflow = 'hidden';
				}
			}
		},
		mounted() {
			this.calcBarPosX();
		},
		methods: {
			inputTopBtn: function() {
				console.log('inputTopBtn');
				this.$emit('inputTopBtn');
			},
			// 显示隐藏筛选
			changeSreen: function() {
				console.log('changeSreen');
				this.$emit('changeSreen');
				// this.sreenData.showPop = !this.sreenData.showPop;
				// this.sortData.showPop = false;
				// this.showPop = true;
			},
			//选中筛选
			changSreenItem: function(sIndex, item) {
				if (this.curTabIndex == 0) {
					if (this.sreenData.qfDdx) {
						this.sreenData.sreenTodoItem[sIndex].sreenList[item].isSelect = !this.sreenData.sreenTodoItem[sIndex].sreenList[
							item].isSelect;
					} else {
						for (var i = 0; i < this.sreenData.sreenTodoItem.length; i++) {
							if (sIndex == i) {
								for (var e = 0; e < this.sreenData.sreenTodoItem[i].sreenList.length; e++) {
									if (item == e) {
										this.sreenData.sreenTodoItem[i].sreenList[e].isSelect = !this.sreenData.sreenTodoItem[i].sreenList[
											e].isSelect;
									} else {
										this.sreenData.sreenTodoItem[i].sreenList[e].isSelect = false;
									}
								}
							}
						}
					}
				}
				if (this.curTabIndex == 1) {
					if (this.sreenData.qfDdx) {
						this.sreenData.sreenDoneItem[sIndex].sreenList[item].isSelect = !this.sreenData.sreenDoneItem[sIndex].sreenList[
							item].isSelect;
					} else {
						for (var i = 0; i < this.sreenData.sreenDoneItem.length; i++) {
							if (sIndex == i) {
								for (var e = 0; e < this.sreenData.sreenDoneItem[i].sreenList.length; e++) {
									if (item == e) {
										this.sreenData.sreenDoneItem[i].sreenList[e].isSelect = !this.sreenData.sreenDoneItem[i].sreenList[
											e].isSelect;
									} else {
										this.sreenData.sreenDoneItem[i].sreenList[e].isSelect = false;
									}
								}
							}
						}
					}
				}
			},
			// 显示隐藏排序
			changeSort: function() {
				this.sortData.showPop = !this.sortData.showPop;
				this.sreenData.showPop = false;
				this.showPop = !this.showPop;
			},
			//选择排序类型
			changeSortItem: function(index) {
				var data = {
					item: this.tabList[this.curTabIndex].sortList?this.tabList[this.curTabIndex].sortList[index]:this.sortDataList[index]
				}
				if (this.curTabIndex == 0) {
					// 待办的点击排序
					this.sortData.dbIndex = index;
					data.index = this.sortData.dbIndex;
					data.qfItem = 'todo';
				}
				if (this.curTabIndex == 1) {
					// 已办的点击排序
					this.sortData.ybIndex = index;
					data.index = this.sortData.ybIndex;
					data.qfItem = 'done';
				}
				this.tabList[this.curTabIndex].sortList.forEach(function(item) {
					item.isSelect = false;
				})
				this.tabList[this.curTabIndex].sortList[index].isSelect = true;
				this.$emit('changeSortItem', data);
				this.changeSort();
			},
			// 遮挡层隐藏
			zdcBtnShow: function() {
				this.showPop = false;
				this.sortData.showPop = false;
				this.sreenData.showPop = false;
			},
			// 全部清除
			resetScreen: function() {
				console.log("全部清除");
				if (this.curTabIndex == 0) {
					for (var i = 0; i < this.sreenData.sreenTodoItem.length; i++) {
						for (var e = 0; e < this.sreenData.sreenTodoItem[i].sreenList.length; e++) {
							this.sreenData.sreenTodoItem[i].sreenList[e].isSelect = false;
						}
					}
				}
				if (this.curTabIndex == 1) {
					for (var i = 0; i < this.sreenData.sreenDoneItem.length; i++) {
						for (var e = 0; e < this.sreenData.sreenDoneItem[i].sreenList.length; e++) {
							if (this.sreenData.sreenDoneItem[i].sreenList[e].isSelect) {
								this.sreenData.sreenDoneItem[i].sreenList[e].isSelect = false;
							}
						}
					}
				}
				this.$emit('resetScreen');
				this.sreenData.showPop = false;
				this.showPop = false;
			},
			// 筛选确定
			submitScreen: function() {
				console.log("筛选确定");
				var data = {
					sreenTodoItem: [], // 待办数组
					sreenDoneItem: [] // 已办数组
				};
				if (this.curTabIndex == 0) {
					data.qfItem = 'todo';
					for (var i = 0; i < this.sreenData.sreenTodoItem.length; i++) {
						for (var e = 0; e < this.sreenData.sreenTodoItem[i].sreenList.length; e++) {
							if (this.sreenData.sreenTodoItem[i].sreenList[e].isSelect) {
								data.sreenTodoItem.push({
									itemTitle: this.sreenData.sreenTodoItem[i].itemTitle,
									isArrSta: this.sreenData.sreenTodoItem[i].isArrSta,
									sreenList: this.sreenData.sreenTodoItem[i].sreenList[e]
								});
							}
						}
					}
				}
				if (this.curTabIndex == 1) {
					data.qfItem = 'done';
					for (var i = 0; i < this.sreenData.sreenDoneItem.length; i++) {
						for (var e = 0; e < this.sreenData.sreenDoneItem[i].sreenList.length; e++) {
							if (this.sreenData.sreenDoneItem[i].sreenList[e].isSelect) {
								data.sreenDoneItem.push({
									itemTitle: this.sreenData.sreenDoneItem[i].itemTitle,
									isArrSta: this.sreenData.sreenDoneItem[i].isArrSta,
									sreenList: this.sreenData.sreenDoneItem[i].sreenList[e]
								});
							}
						}
					}
				}
				this.$emit('submitScreen', data);
				this.sreenData.showPop = false;
				this.showPop = false;
			},
			// 导航栏切换
			changeTab: function(index) {
				console.log('changeTab::index::::', index);
				console.log('changeTab::obj::::', JSON.stringify(this.tabList[index]));
				console.log('changeTab::title::::', JSON.stringify(this.tabList[index].title));
				console.log('changeTab::number::::', JSON.stringify(this.tabList[index].number));
				var data = {
					index: index,
					item: this.tabList[index]
				}
				this.$emit('changeTab', data);
				this.curTabIndex = index;
				this.sortData.showPop = false;
				this.showPop = false;
				this.sreenData.showPop = false;
				this.showAddPop = false;
				this.calcBarPosX();
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
	}
</script>

<style scoped lang="less">
	@import "../../assets/less/nw_tool.less";

	.yw-moduletop {
		width: 100%;
		height: auto;
		// position: fixed;
		// top: 44px;
		// z-index: 99;
		text-align: center;

		.top-input {
			.pxToremLess(padding, 10px);
			.pxToremLess(font-size, 24px);

			.input-box {
				.pxToremLess(border-radius, 5px);
				.pxToremLess(height, 30px);
				background: white;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

	}

	.pos-a {
		position: absolute;
		.pxToremLess(right, 15px);
	}

	.text-99 {
		color: #999999;
	}

	.sreenzdc {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.sortzdc {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.module-width-33 {
		// width: 33.3%;
		float: left;
		position: relative;
	}

	.module-row {
		display: flex;
		flex-direction: row;
	}

	// 筛选栏
	.task-top-sreen {
		.pxToremLess(height, 40px);
		background-color: #fff;
	}

	.task-top-sreen-btn {
		border-left: 1px solid rgb(240, 238, 238);

		i {
			-moz-transition: all 0.3s;
			-moz-transform: rotate(0deg);
			-webkit-transition: all 0.3s;
			-webkit-transform: rotate(0deg);

			&.showRotate {
				-moz-transform: rotate(180deg);
				-webkit-transform: rotate(180deg);
			}
		}
	}

	.sreen-item {
		border-radius: 2px;
		color: #666;
	}

	.sreen-item-cur {
		color: #1e87f0;
		background-color: #c1dcf7;
		border-color: #c1dcf7;
	}

	.sreen-time {
		border: solid 1px #dcdcdc;
		border-left: none;
	}

	.sreen-item-time {
		border-left: solid 1px #dcdcdc;
	}

	.sreen-item-time-cur {
		background-color: #1e87f0;
	}

	.borderRadius_2 {
		border-radius: 2px;
	}

	// 限制高度的tab
	.tab-list {
		position: relative;
		min-width: 100%;
		overflow-x: scroll;
		white-space: nowrap;

		.tab-item {
			.pxToremLess(height, 44px);
			.pxToremLess(line-height, 44px);
		}

		.tab-border {
			position: absolute;
			bottom: 0;
			left: 0;
			.pxToremLess(height, 3px);
			.pxToremLess(border-radius, 10px);
		}
	}

	// 不限制高度的tab
	.tab-list-autoHeight {
		position: relative;
		min-width: 100%;
		overflow-x: scroll;
		white-space: nowrap;

		.tab-item {
			// height: 42px;
			// line-height: 42px;
		}

		.tab-border {
			position: absolute;
			bottom: 0;
			left: 0;
			.pxToremLess(height, 3px);
			.pxToremLess(border-radius, 10px);
		}
	}

	// 限定高度，底线自定义大小的tab
	.tab-list-border {
		position: relative;
		min-width: 100%;
		overflow-x: scroll;
		white-space: nowrap;

		.tab-item {
			.pxToremLess(height, 44px);
			.pxToremLess(line-height, 44px);
			flex: 1;
			// position: absolute;
		}

		.tab-border {
			position: absolute;
			bottom: 0;
			// left: 0;
			.pxToremLess(height, 3px);
			.pxToremLess(border-radius, 6px);
		}

		.tab-number {
			position: absolute;
			.pxToremLess(bottom, 14px);
			display: inline-block;
			.pxToremLess(line-height, 15px);
			.pxToremLess(height, 15px);
			.pxToremLess(margin-left, 2px);
			.pxToremLess(padding-left, 7px);
			.pxToremLess(padding-right, 7px);
			.pxToremLess(padding-top, 0);
			.pxToremLess(padding-bottom, 0);
			background-color: #f15747;
			.pxToremLess(border-radius, 7px);
			.pxToremLess(font-size, 10px);
			color: #ffffff;
		}
	}

	// 一行展示，横向滚动的tab栏
	.tab-list-scrollX {
		width: 100vw;
		.pxToremLess(height, 44px);
		white-space: nowrap;
		overflow: hidden;
		overflow-x: scroll;
		-webkit-backface-visibility: hidden;
		-webkit-perspective: 1000;
		-webkit-overflow-scrolling: touch;

		.tab-list::-webkit-scrollbar {
			display: none;
		}
	}

	// 右侧弹框
	.sreen-warp {
		position: fixed;
		z-index: 999 !important;
		top: 0;
		right: 0;
		width: 80%;
		height: 100%;
		.pxToremLess(padding-top, 44px);
		.pxToremLess(padding-bottom, 65px);
		overflow: hidden;
		transition: all 500ms;

		&.showBgcW {
			margin-right: -100%;
		}

		.sreen-box {
			width: 100%;
			height: 100%;
			overflow: scroll;
		}

		.bottom_button {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
		}
	}


	.sreen-item {
		.pxToremLess(border-radius, 4px);
		color: #666;
	}

	.sreen-item-cur {
		color: #1e87f0;
		background-color: #c1dcf7;
		border-color: #c1dcf7;
	}

	.sreen-time {
		border: solid 1px #dcdcdc;
		border-left: none;
	}

	.sreen-item-time {
		border-left: solid 1px #dcdcdc;
	}

	.sreen-item-time-cur {
		background-color: #1e87f0;
	}
</style>
