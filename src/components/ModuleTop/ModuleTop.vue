<!-- ModuleTop模块头部组件使用方法
	<nw-module-top :isSort="false" :isSreen="true" :tabList="testTabList" @inputTopBtn="testInputTopBtn" @changeTab="testChangeTab"></nw-module-top> 
	ModuleTop模块头部组件参数
	tabList: [], // 头部数组
	isSort: true, // 控制显示排序按钮，默认为true：显示
	isSreen: true, // 控制显示筛选按钮，默认为true：显示
 -->
<template>
	<div>
		<div class="yw-moduletop nw_bag_F5">
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
			<div class="row task-top-sreen borderTopE8">
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
			<!-- <div v-if="sortData.showPop">
				<div v-for="(sortItem1, sortIndex1) in sortData.list1" :key="sortIndex1">
					<div class="f16 p15 gray3 borderTopE8 verticle-center" @click="">
						<div class="flex-1 text-left">{{sortItem1.text}}</div>
						<i class="iconfont f20 ml5" :class="[ curTabIndex==0&&sortIndex1==sortData.dbIndex||curTabIndex==1&&sortIndex1==sortData.ybIndex ? 'icon-gou gray287' : '']"></i>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ModuleTop',
		display: 'ModuleTop模块头部组件',
		data() {
			return {
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
					list1: [{
							text: "按填报日期降序",
							isSelect: false,
							sortType: "desc", //排序类型
							sortNames: "fillDate"
						},
						{
							text: "按填报日期升序",
							isSelect: false,
							sortType: "asc", //排序类型
							sortNames: "fillDate"
						},
						{
							text: "按隐患发现日期降序",
							isSelect: false,
							sortType: "desc", //排序类型
							sortNames: "dangerFindDate"
						},
						{
							text: "按隐患发现日期升序",
							isSelect: false,
							sortType: "asc", //排序类型
							sortNames: "dangerFindDate"
						},
						{
							text: "按治理期限降序",
							isSelect: false,
							sortType: "desc", //排序类型
							sortNames: "governBeginDate"
						},
						{
							text: "按治理期限升序",
							isSelect: false,
							sortType: "asc", //排序类型
							sortNames: "governBeginDate"
						}
					],
					dbIndex: 0, //待办下标
					ybIndex: 0, //已办下标
					showPop: false
				},
				//筛选条件
				sreenData: {
					statusList1: [{
						id: "",
						text: "全部",
						isSelect: false
					}],
					statusList2: [{
						id: "",
						text: "全部",
						isSelect: false
					}],
					gradeList1: [{
						id: "",
						text: "全部",
						isSelect: false
					}],
					gradeList2: [{
						id: "",
						text: "全部",
						isSelect: false
					}],
					gradeList3: [{
						id: "",
						text: "全部",
						isSelect: false
					}],
					sourceList1: [{
						id: "",
						text: "全部",
						isSelect: false
					}],
					sourceList2: [{
						id: "",
						text: "全部",
						isSelect: false
					}],
					levelList1: [{
						id: "",
						text: "全部",
						isSelect: false
					}],
					levelList2: [{
						id: "",
						text: "全部",
						isSelect: false
					}],
					applyList3: [{
							id: "",
							text: "全部",
							isSelect: false
						},
						{
							id: "33",
							text: "申请延期",
							isSelect: false
						}
					],
				}
			}
		},
		props: {
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
		mounted() {
			this.calcBarPosX();
		},
		methods: {
			inputTopBtn: function() {
				console.log('inputTopBtn');
				this.$emit('inputTopBtn');
			},
			changeSreen: function(){
				
			},
			// 显示隐藏排序
			changeSort: function() {
				this.sortData.showPop = !this.sortData.showPop;
				this.sreenData.showPop = false;
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
				this.$emit('changeTab',data);
				this.curTabIndex = index;
				this.sortData.showPop = false;
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
