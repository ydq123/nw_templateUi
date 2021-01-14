<!-- TabWidget多状态tab组件
	等分tab
	<nw-tab-widget :tabWList="testList" @changeTab="testTabW">
		<div slot="tabScrollX"></div>
		<div slot="tabIconSX"></div>
	</nw-tab-widget>
	带icon可滑动tab
	<nw-tab-widget @changeTab="testTabW" @changeScrollXTab="testSXTab" @changeSXIconTab="testSXIcon">
		<div slot="tabList"></div>
		<div slot="tabScrollX"></div>
	</nw-tab-widget>
	可多选折叠滑动tab
	<nw-tab-widget @changeTab="testTabW" @changeScrollXTab="testSXTab" @changeSXIconTab="testSXIcon">
		<div slot="tabList"></div>
		<div slot="tabIconSX"></div>
	</nw-tab-widget>

	TabWidget多状态tab组件参数
	statusY: 'gray287 fw',//选中tab样式
	statusN:'gray3',//未选中tab样式
	statusBoxY:'bgcg-1e8',//选中折叠滑动tab样式
	statusBoxN:'bgcg-1e8',//未选中折叠滑动tab样式
	tabSXStatu: true,//判断单选多选，true为多选，fasle为单选；需结合tabScrollXList使用
	tabWList:[// 等分tab数据数组
		{
			title: "待办",
			number: 0,
			status: false
		},
		{
			title: "已办1",
			number: 0,
			status: false
		},
		{
			title: "已办2",
			number: 0,
			status: false
		},
	],
	tabWSXList:[ // 可多选折叠滑动tab数据数组
		{
			title: "待办",
			number: 0,
			status: false
		},
		{
			title: "已办1",
			number: 0,
			status: false
		},
		...
	],
	tabWSCIconList: [// 带icon可滑动tab数据数组，数组长度小于4自动等分；大于4可滑动
		{
			title: "待办1",
			icon: 'icon-qianjin-copy',
			iconCla: 'f14'
		},
		{
			title: "待办11",
			icon: 'icon-qianjin-copy',
			iconCla: 'f14'
		},
		{
			title: "待办111",
			icon: 'icon-qianjin-copy',
			iconCla: 'f14'
		},
		{
			title: "待办1111",
			icon: 'icon-qianjin-copy',
			iconCla: 'f14'
		},
		{
			title: "待办11111",
			icon: 'icon-qianjin-copy',
			iconCla: 'f14'
		},
		{
			title: "待办1111111",
			icon: 'icon-qianjin-copy',
			iconCla: 'f14'
		},
		{
			title: "待办11111111",
			icon: 'icon-qianjin-copy',
			iconCla: 'f14'
		}
	]
		changeTab,// 等分tab导航栏切换，返回data
		自定义方法例子：testTabW(data) { console.log(data); },
		changeScrollXTab,// 可多选折叠滑动tab选中，返回data
		自定义方法例子：testSXTab(data) { console.log(data); },
		changeSXIconTab,// 带icon可滑动tab切换，返回data
		自定义方法例子：testSXIcon(data) { console.log(data); },
 -->
<template>
	<div class="yw-tabwidget">
		<div class="">
			<!-- 等分tab -->
			<slot name="tabList">
				<div class="tab-box width-100 borderButtomE8">
					<div class="tab-list-border tabwidget-row al-c ju-a bg-white f16">
						<div @click="changeTab(tabIndex)" class="tab-items" v-for="(tabItem,tabIndex) in tabList" :key="tabIndex" :class="[ curTabIndex === tabIndex ? statusY : statusN]">
							<span class="lh200 f14">{{tabItem.title}}</span>
							<span class="tab-number" v-if="tabList[tabIndex].status">({{tabList[tabIndex].number}})</span>
						</div>
						<div class="tab-border bg-287" :style="activeBarStyle" ref="activeBar"></div>
					</div>
				</div>
			</slot>
			<!-- 可多选折叠滑动tab -->
			<slot name="tabScrollX">
				<div class="tab-scrollX-box width-100 borderButtomE8 bg-white" :class="[showTabPop?'':'tabwidget-row al-c pb15 pt15']">
					<div class="tabwidget-row al-c f16 pl15" :class="[showTabPop?'tab-list-autoHeight':'tab-list-scrollX pr15']">
						<div @click="changeScrollXTab(XIndex)" :class="[showTabPop?'mt15':'']" v-for="(XItem,XIndex) in tabScrollXList"
						 :key="XIndex">
							<span class="lh200 f14 pt5 pb5 pl10 pr10 mr15 borRadius-2" :class="[XItem.status?statusBoxY:statusBoxN]">{{XItem.title}}</span>
						</div>
					</div>
					<div class="tabwidget-row al-c ml15 mr15" :class="[showTabPop?'ju-c pt10 pb15 showTabRotate':'']" @click="showTabPop=!showTabPop">
						<i class="iconfont icon-qianjin-copy f10 gray9"></i>
					</div>
					<!-- <div class="tab-scroll-x pl5 pr15 verticle-center" @click="showTabPop=!showTabPop">
						<i class="iconfont icon-qianjin-copy f10 gray9" :class="{'showTabRotate': showTabPop}"></i>
					</div> -->
				</div>
			</slot>
			<!-- 带icon可滑动tab -->
			<slot name="tabIconSX">
				<div class="tab-box width-100 borderButtomE8 bg-white">
					<div class="tab-list-iconSX tabwidget-row al-c f16 pl15" :class="[tabSCIconList.length>4?'':'ju-a']">
						<div @click="changeSXIconTab(CIndex)" class="pt10 pb10" :class="[curISXTabIndex == CIndex?statusY : statusN]"
						 v-for="(CItem,CIndex) in tabSCIconList" :key="CIndex">
							<div>
								<i class="iconfont" :class="[CItem.icon,CItem.iconCla]" v-if="CItem.icon"></i>
								<!-- <img :src="CItem.imgSrc" :class="[CItem.imgWH.length>0?CItem.imgWH:'img-wh-cla']" v-if="CItem.imgSrc" /> -->
							</div>
							<span class="lh200 f12 mt5 pl10 pr10">{{CItem.title}}</span>
						</div>
					</div>
				</div>
			</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TabWidget',
		display: 'TabWidget多状态tab组件',
		data() {
			return {
				showTabPop: false,
				tabScrollXStatus: this.tabSXStatu, //判断单选多选，true为多选，fasle为单选；需结合tabScrollXList使用
				curTabIndex: 0, //导航栏index
				curISXTabIndex: 0, // 超出可滑动导航栏index
				curTabIndexCP: 0,
				activeBarX: 0,
				activeBarWidth: 0,
				tabList: this.tabWList,
				tabScrollXList: this.tabWSXList,
				tabSCIconList: this.tabWSCIconList,
			}
		},
		props: {
			statusY: { //选中tab样式
				type: String,
				default: 'gray287 fw'
			},
			statusN: { //未选中tab样式
				type: String,
				default: 'gray3'
			},
			statusBoxY: { //选中折叠滑动tab样式
				type: String,
				default: 'bgcg-1e8'
			},
			statusBoxN: { //未选中折叠滑动tab样式
				type: String,
				default: 'bgcg-f5'
			},
			tabSXStatu: { //判断单选多选，true为多选，fasle为单选；需结合tabScrollXList使用
				type: Boolean,
				default: true
			},
			tabWList: { // 等分tab数据数组
				type: Array,
				default: () => [{
						title: "待办",
						number: 0,
						status: true
					},
					{
						title: "已办1",
						number: 0,
						status: true
					},
					{
						title: "已办2",
						number: 0,
						status: true
					},
				]
			},
			tabWSXList: { // 可多选折叠滑动tab数据数组
				type: Array,
				default: () => [{
						title: "待办",
						number: 0,
						status: false
					},
					{
						title: "已办1",
						number: 0,
						status: false
					},
					{
						title: "已办2",
						number: 0,
						status: false
					},
					{
						title: "已办2",
						number: 0,
						status: false
					},

					{
						title: "已办2",
						number: 0,
						status: false
					},
					{
						title: "已办2",
						number: 0,
						status: false
					},
					{
						title: "已办2",
						number: 0,
						status: false
					},
					{
						title: "已办2",
						number: 0,
						status: false
					},
					{
						title: "已办2",
						number: 0,
						status: false
					},
					{
						title: "已办2",
						number: 0,
						status: false
					},
					{
						title: "已办2",
						number: 0,
						status: false
					},
					{
						title: "已办2",
						number: 0,
						status: false
					},
					{
						title: "已办2",
						number: 0,
						status: false
					}
				]
			},
			tabWSCIconList: { // 带icon可滑动tab数据数组，数组长度小于4自动等分；大于4可滑动
				type: Array,
				default: () => [{
						title: "待办1",
						icon: 'icon-qianjin-copy',
						iconCla: 'f14',
						imgSrc: '../../assets/images/center.png',
						imgWH: ''
					},
					{
						title: "待办11",
						icon: 'icon-qianjin-copy',
						iconCla: 'f14',
						imgSrc: '../../assets/images/center.png',
						imgWH: ''
					},
					{
						title: "待办111",
						icon: 'icon-qianjin-copy',
						iconCla: 'f14',
						imgSrc: '../../assets/images/center.png',
						imgWH: ''
					},
					{
						title: "待办1111",
						icon: 'icon-qianjin-copy',
						iconCla: 'f14',
						imgSrc: '../../assets/images/center.png',
						imgWH: ''
					},
					{
						title: "待办11111",
						icon: 'icon-qianjin-copy',
						iconCla: 'f14',
						imgSrc: '../../assets/images/center.png',
						imgWH: ''
					},
					{
						title: "待办1111111",
						icon: 'icon-qianjin-copy',
						iconCla: 'f14',
						imgSrc: '../../assets/images/center.png',
						imgWH: ''
					},
					{
						title: "待办11111111",
						icon: 'icon-qianjin-copy',
						iconCla: 'f14',
						imgSrc: '../../assets/images/center.png',
						imgWH: ''
					}
				]
			},
		},
		computed: {
			activeBarStyle: function() {
				var leg=this.tabList[this.curTabIndex].title.length||0;
				if(leg==2){
				  var left = this.activeBarWidth / 2 - 15; // 15是线宽度的一半
				}else if(leg==3){
				  var left = this.activeBarWidth / 2 - 16; // 15是线宽度的一半
				}else{
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
		mounted() {
			this.tabCalcBarPosX();
		},
		methods: {
			// 等分tab导航栏切换
			changeTab: function(index) {
				console.log('changeTab::index::::', index);
				console.log('changeTab::obj::::', JSON.stringify(this.tabList[index]));
				var data = {
					index: index,
					item: this.tabList[index]
				}
				this.$emit('changeTab', data);
				this.curTabIndex = index;
				this.tabCalcBarPosX();
			},
			// 可多选折叠滑动tab选中
			changeScrollXTab: function(xIndex) {
				console.log('changeScrollXTab::index::::', xIndex);
				if (this.tabScrollXStatus) {
					this.tabScrollXList[xIndex].status = !this.tabScrollXList[xIndex].status;
				} else {
					for (var i = 0; i < this.tabScrollXList.length; i++) {
						if (xIndex == i) {
							this.tabScrollXList[i].status = !this.tabScrollXList[i].status;
						} else {
							this.tabScrollXList[i].status = false;
						}
					}
				}
				var data = {
					index: xIndex,
					item: []
				}
				for (var e = 0; e < this.tabScrollXList.length; e++) {
					if (this.tabScrollXList[e].status) {
						data.item.push(this.tabScrollXList[e]);
					}
				}
				this.$emit('changeScrollXTab', data);
			},
			// 带icon可滑动tab切换
			changeSXIconTab: function(index) {
				console.log('changeSXIconTab::index::::', index);
				var data = {
					index: index,
					item: this.tabSCIconList[index]
				}
				this.curISXTabIndex = index;
				this.$emit('changeSXIconTab', data);
			},
			// 计算activeBar的translateX
			tabCalcBarPosX: function() {
				var listChildren = document.getElementsByClassName("tab-items");
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

	.yw-tabwidget {
		width: 100%;
		text-align: center;
	}

	.img-wh-cla {
		.pxToremLess(width,40px);
		.pxToremLess(height,40px);
	}

	.tabwidget-row {
		display: flex;
		flex-direction: row;
	}

	.borRadius-2 {
		.pxToremLess(border-radius,2px);
	}

	.bgcg-f5 {
		background-color: #f5f5f5;
		color: black;
	}

	.bgcg-1e8 {
		background-color: #1E87F0;
		color: white;
	}

	.width-30 {
		float: left;
		position: relative;
		width: 30% !important;
		.pxToremLess(min-height,1px);
	}

	// 限定高度，底线自定义大小的tab
	.tab-list-border {
		position: relative;
		min-width: 100%;
		overflow-x: scroll;
		white-space: nowrap;

		.tab-items {
			.pxToremLess(height,44px);
			.pxToremLess(line-height,44px);
		}

		.tab-border {
			position: absolute;
			bottom: 0;
			.pxToremLess(height,3px);
			.pxToremLess(border-radius,6px);
		}
	}

	.tab-list-iconSX {
		width: 100vw;
		white-space: nowrap;
		overflow: hidden;
		overflow-x: scroll;
		-webkit-backface-visibility: hidden;
		-webkit-perspective: 1000;
		-webkit-overflow-scrolling: touch;

		.tab-list {
			width: auto;
		}
	}

	// 一行展示，横向滚动的tab栏
	.tab-list-scrollX {
		width: 100vw;
		white-space: nowrap;
		overflow: hidden;
		overflow-x: scroll;
		-webkit-backface-visibility: hidden;
		-webkit-perspective: 1000;
		-webkit-overflow-scrolling: touch;

		.tab-list {
			width: auto;
		}
	}

	// 不限制高度的tab
	.tab-list-autoHeight {
		position: relative;
		flex-wrap: wrap;
		flex: 1;
	}

	.txt-1e8 {
		color: #1E87F0;
	}

	.showTabRotate {
		-moz-transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
	}

	.tab-scroll-x {
		position: absolute;
		.pxToremLess(right,0);
		.pxToremLess(top,15px);

		i {
			-moz-transition: all 0.3s;
			-moz-transform: rotate(0deg);
			-webkit-transition: all 0.3s;
			-webkit-transform: rotate(0deg);

			// &.showTabRotate {
			// 	-moz-transform: rotate(180deg);
			// 	-webkit-transform: rotate(180deg);
			// }
		}
	}
</style>
