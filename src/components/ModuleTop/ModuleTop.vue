<!-- ModuleTop模块头部组件使用方法
	<nw-module-top :isSort="true" :isSreen="true" :mTop="0" :sortDataList="ListPx" :sreenDataObj="objSx" :tabList="testTabList" @inputTopBtn="testInputTopBtn" @changeTab="testChangeTab" @changeSortItem="testChangeSortItem" @submitScreen="testSubmitScreen" @resetScreen="testResetScreen"></nw-module-top> 
	ModuleTop模块头部组件参数
	mTop: 44,//距离头部高度
	tabList: [
		{
			title: "已办",
			number: 0,
		}
	], // 头部数组
	isSort: true, // 控制显示排序按钮，默认为true：显示
	isSreen: true, // 控制显示筛选按钮，默认为true：显示
	sortDataList: [ // 排序数组
		{
			text: "按日期升序",
			isSelect: false,
			sortType: "asc", //排序类型
		},
	],
	sreenDataObj: { // 筛选对象
			showPop: false,
			qfDdx: true,// 区分单选和多选，默认true为多选，false为单选
			sreenTodoItem: [// 待办数组
				{
					itemTitle: '待办状态',
					isArrSta: 'todoZt',// 返回判断数组数据标识
					sreenList:[
						{
							id: "",
							text: "状态0",
							isSelect: false
						},
					]
				},
				{
					itemTitle: '待办等级',
					isArrSta: 'todoDj',// 返回判断数组数据标识
					sreenList:[
						{
							id: "",
							text: "0",
							isSelect: false
						},
					]
				},
			],
			sreenDoneItem: [// 已办数组
				{
					itemTitle: '已办状态',
					isArrSta: 'doneZt',// 返回判断数组数据标识
					sreenList:[
						{
							id: "",
							text: "已办0",
							isSelect: false
						},
					]
				},
				{
					itemTitle: '已办等级',
					isArrSta: 'doneDj',// 返回判断数组数据标识
					sreenList:[
						{
							id: "",
							text: "0",
							isSelect: false
						},
					]
				},
			],
	},
 -->
<template>
	<div>
		<div class="yw-moduletop nw_bag_F5" :style="{top:mTop+'px'}">
			<!-- 搜索框 -->
			<div class="top-input">
				<div class="input-box" @click="inputTopBtn">
					<i class="iconfont icon-sousuo nw_f14 nw_text_99"></i>
					<span class="nw_f14 nw_text_99">搜索</span>
				</div>
			</div>
			<!-- tab -->
			<div class="tab-box width-100 borderButtomE8">
				<div class="tab-list-border verticle-center bg-white f16">
					<div @click="changeTab(tabIndex)" class="tab-item" v-for="(tabItem,tabIndex) in tabList" :key="tabIndex">
						<span class="lh200 f14" :class="[ curTabIndex === tabIndex ? 'gray287 fw' : 'gray3']">{{tabItem.title}}</span>
						<span class="tab-number">{{tabList[tabIndex].number}}</span>
					</div>
					<div class="tab-border bg-287" :style="activeBarStyle" ref="activeBar"></div>
				</div>
			</div>
			<div class="module-row task-top-sreen borderTopE8">
				<div class="flex-1 text-left gray6 pl15 f16 verticle-center">{{'共' + tabList[curTabIndex].number + '条记录'}}</div>
				<div class="task-top-sreen-btn pl15 pr15 verticle-center" m="click" @click="changeSort" v-if="isSort">
					<span class="f16 mr5 gray6">排序</span>
					<i class="iconfont icon-qianjin-copy f10 gray9" :class="{'showRotate': sortData.showPop}"></i>
				</div>
				<div class="task-top-sreen-btn pl15 pr15 verticle-center" m="click" @click="changeSreen" v-if="isSreen">
					<span class="f16 mr5 gray6">筛选</span>
					<i class="iconfont icon-shaixuan1 f10 gray9"></i>
				</div>
			</div>
			<!-- 排序 -->
			<div v-if="sortData.showPop" class="bg-white">
				<div v-for="(sortItem, sortIndex) in sortData.list" :key="sortIndex">
					<div class="f16 p15 gray3 borderTopE8 module-row" @click="changeSortItem(sortIndex)">
						<div class="flex-1 text-left">{{sortItem.text}}</div>
						<i class="iconfont ml5 gray287 icon-gou" v-if="curTabIndex==0&&sortIndex==sortData.dbIndex||curTabIndex==1&&sortIndex==sortData.ybIndex"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="zdc" v-show="showPop" :class="[sortData.showPop?'zIndex9':'zIndex999']" @click.stop="zdcBtnShow"></div>
		<!-- 筛选 -->
		<div class="sreen-warp bg-white" v-if="sreenData.showPop">
			<div class="sreen-box">
				<div v-if="curTabIndex == 0">
					<div v-for="(sItem,sIndex) in sreenData.sreenTodoItem" :key="sIndex">
						<div class="p15 f16 text-black text-left borderTopE8">{{ sItem.itemTitle }}</div>
						<div class="clearfix pl15">
							<div v-for="(value,index) in sItem.sreenList" :key="index" class="text-center col-xs-4" @click="changSreenItem(sIndex,index)">
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
				mySwipe: null, // 轮播图
				curTabIndex: 0, //导航栏index
				curTabIndexCP: 0,
				activeBarX: 0,
				activeBarWidth: 0,
				keyWord: "",
				//排序数组
				sortData: {
					list: this.sortDataList,
					dbIndex: 0, //待办下标
					ybIndex: 0, //已办下标
					showPop: false
				},
				//筛选条件
				sreenData: this.sreenDataObj,
			}
		},
		props: {
			mTop: { // 距离头部高度
				type: Number,
				default: 44
			},
			tabList: { // tab数组
				type: Array,
				default: () => [{
						title: "待办",
						number: 0,
					},
					{
						title: "已办",
						number: 0,
					}
				]
			},
			isSort: { // 控制显示排序按钮，默认为true：显示
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
				this.sreenData.showPop = !this.sreenData.showPop;
				this.sortData.showPop = false;
				this.showPop = true;
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
										this.sreenData.sreenTodoItem[i].sreenList[e].isSelect = !this.sreenData.sreenTodoItem[i].sreenList[e].isSelect;
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
										this.sreenData.sreenDoneItem[i].sreenList[e].isSelect = !this.sreenData.sreenDoneItem[i].sreenList[e].isSelect;
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
					item: this.sortData.list[index]
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

<style scoped lang="scss">
	@import "../../assets/scss/nw_moduletop.scss";
</style>
