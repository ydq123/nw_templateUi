<template>
	<div class="checkPerson pt140">
		<!-- <div class="header-f bg-white">
			<div class="h44 bg-f5 borderButtomE8 person-row al-c ju-b pl15 pr15">
				<div class="left-btn" @click="$router.go(-1)">
					<i class="iconfont icon-houtui gray6 f18"></i>
				</div>
				<div class="header-txt f16"></div>
				<div class=""></div>
			</div>
			
		</div> -->

		<nw-fixed-header title="选择人员">
			<div slot="left" @click="$nwBack(-1)">
				<i class="iconfont icon-houtui"></i>
			</div>
			<div slot="right"></div>
			<div slot="page-bottom">
				<div class="person-row al-c bg-white borderTopE8" @click="openUnit">
					<div id="tabPersonList" class="tab-list-scrollX bg-white f16 gray6 p15 mr30 border verticle-center">
						<div class="" v-for="(tabItem,tabIndex) in tabPersonList" :key="tabIndex">
							<span :class="[tabIndex==currentTab?'gray6 mr15':'gray287']" v-html="tabItem.dangerSubType"></span>
							<i v-if="tabIndex<tabPersonList.length-1" class="iconfont icon-qianjin ml5 mr5 f14"></i>
						</div>
					</div>
					<div class="topIconRight">
						<i class="iconfont icon-xinjian ml5 mr5 f16 gray287"></i>
					</div>
				</div>
				<div class="bg-f5 pl15 pr15 pt10 pb10">
					<div class="bg-white pt10 pb10 gray9 radius-5 f15 text-center" @click="openSearchCheckPer">
						<i class="iconfont icon-sousuo f15 ml5 mr5 gray9"></i>
						<span>搜索</span>
					</div>
				</div>
			</div>
		</nw-fixed-header>

		<!-- 选择单位弹窗 -->
		<!-- <nw-unit-pop :popShow="showPop" :popUserInfo="userInfo" @overlay="popOverlay"></nw-unit-pop> -->
		<!-- 多选人员弹窗 -->
		<van-popup v-model="showPicker2" round :style="{ width: '80%', height: '75%' }">
			<div class="pt20 pb20">
				<div class="p15 borderButtomE8 f16 person-row al-c" v-for="(value,index) in curNodeList" :key="index">
					<div class="flex-1">
						{{value.dangerSubType}}
					</div>
					<i class="iconfont f16 icon-shanchu3 text-red" @click="delPersonnelBtn(index)"></i>
				</div>
				<nw-null-data v-if="curNodeList.length <= 0"></nw-null-data>
			</div>
		</van-popup>

		<div class="person-centent" :class="{'pb60 ' : taskInfo.nodeList.length > 0}">
			<van-list v-model="taskInfo.loading" :finished="taskInfo.finished" :finished-text="taskInfo.nodeList.length > 0 ? '没有更多数据了' : ''"
			 @load="onLoad" :immediate-check="false">
				<van-pull-refresh v-model="taskInfo.refreshing" @refresh="onRefresh">
					<div class="person-centent-box">
						<div class="p15 bg-white person-row ju-b al-c f16 borderTopE8" @click="selectCurNode(nodeIndex)" :class="{'borderTopE8':nodeIndex!=0}"
						 v-for="(nodeItme,nodeIndex) in taskInfo.nodeList" :key="nodeIndex">
							<i class="iconfont f16 mr10" :class="[nodeItme.status ? 'icon-gou1 gray287' : 'icon-1 gray6']" @click.stop="selectCurNode(nodeIndex)"></i>
							<div class="flex-1 gray3 text-overflow text-left">{{nodeItme.dangerSubType}}</div>
							<!-- <i class="iconfont icon-qianjin gray9 f14 ml10"></i> -->
						</div>
					</div>
					<nw-null-data class="mt20" v-if="taskInfo.nodeList.length <= 0"></nw-null-data>
				</van-pull-refresh>
			</van-list>
		</div>
		<div class="person-bottom_button p10 bg-white person-row ju-b f16 width-100 fw boxt003" v-if="taskInfo.nodeList.length > 0 && isType == 1">
			<div class="nw_buttom_125_44 width-100 cybtn" @click="qcCurNode">清除</div>
			<div class="nw_buttom_125_44 ml10 width-100 bg-287 text-white" @click="submitCurNode">确定</div>
		</div>
		<div class="person-bottom_button p10 bg-white person-row ju-b f16 width-100 fw boxt003" v-if="taskInfo.nodeList.length > 0 && isType == 2">
			<div class="gray287 person-row al-c " @click="showPicker2 = true">已选择: {{ curNodeList.length }}人 <i class="rotate180 f14 ml10 iconfont icon-qianjin-copy"></i></div>
			<div class="nw_buttom_125_44 bg-287 text-white" @click="submitCurNode">确定</div>
		</div>
	</div>
</template>

<script>
	import {
		search,
		getAllSuperOrgIds
	} from "../moduleAPI/nw_jadp.js";
	import {
		NWtabMinxin
	} from "../mixin/NWtabMinxin.js";
	export default {
		name: "nw_checkPerson",
		mixins: [NWtabMinxin],
		data() {
			return {
				param: {},
				showPicker: false,
				showPicker2: false,
				currentTab: 0,
				taskInfo: {
					nodeList: [], // 展示人员数据数组
					loading: false,
					finished: false,
					refreshing: false,
				},
				tabPersonList: [], // 头部导航
				tabSavaList: [],
				dataItem: {}, //
				count: 0, // 人员总数
				pageNo: 1,
				curNodeItem: {}, //单选人员信息
				curNodeList: [], //多选人员信息
				tabNum: 0,
				isType: 0, //判断人员单选或多选，1：单选；2多选
				showPop: false,
				userInfo: {}
			};
		},
		components: {},
		created() {},
		watch: {

		},
		destroyed() {
			// console.log('*******************destroyed**********************');
			/* 销毁跨页面通讯*/
			this.$tabOffPageFun(['unitTabBus', 'tabSrcollList']);
		},
		/* 进入页面前-复原导航条   */
		beforeRouteEnter(to, from, next) {
			// console.log('-----------nw_checkPerson----------beforeRouteEnter-------------------------');
			next(vm => {
				if (window.NW_MODULE_TYPE != 'scyyd_templateUI') {
					// console.log(from);
					// console.log(to);
					if (from.name != "nw_checkUnit" && from.name != "nw_searchCheckPerson") {
						vm.pageDataInit();
						vm.init();
					}
				}
			});
		},
		mounted() {
			var _this = this;
			if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
				this.init();
			}
		},
		methods: {
			pageDataInit: function() {
				this.param = {};
				this.showPicker = false;
				this.showPicker2 = false;
				this.currentTab = 0;
				this.taskInfo.nodeList = []; // 展示人员数据数组
				this.taskInfo.loading = false;
				this.taskInfo.finished = false;
				this.taskInfo.refreshing = false;
				this.tabPersonList = []; // 头部导航
				this.tabSavaList = [];
				this.dataItem = {}; //
				this.count = 0; // 人员总数
				this.pageNo = 1;
				this.curNodeItem = {}; //单选人员信息
				this.curNodeList = []; //多选人员信息
				this.tabNum = 0;
				this.isType = 0; //判断人员单选或多选，1：单选；2多选
				this.showPop = false;
				this.userInfo = {};
			},
			initTabList: function() {
				this.tabPersonList = this.tabSavaList;
				// console.log("this.tabSavaList：：：", JSON.stringify(this.tabSavaList));
			},
			popOverlay: function(data) {
				this.showPop = false;
				// console.log('popOverlay::data::' + JSON.stringify(data))
				// if(data && this.showPop == false){
				this.tabPersonList = data.curUnitItemData;
				this.tabSavaList = [];
				for (var i = 0; i < this.tabPersonList.length; i++) {
					this.tabSavaList.push(this.tabPersonList[i]);
				}
				this.currentTab = this.tabPersonList.length - 1;
				this.onRefresh();
				// }
			},
			openUnit: function() {
				var _this = this;
				// this.$emit("openUnit");
				var param = {
					userInfo: this.userInfo,
					exeMun: "unitTabBus"
				};
				/* 挂载跨页面通讯*/
				this.$tabOnPageFun("unitTabBus", function(data) {
					_this.popOverlay(data);
				});
				/* 挂载跨页面通讯*/
				this.$tabOnPageFun("tabSrcollList", function() {
					_this.initTabList();
				});
				this.$nwOpenWin('nw_checkUnit', param);
			},
			openSearchCheckPer: function() {
				this.$nwOpenWin('nw_searchCheckPerson', this.param);
				// this.$emit("openSearch");
				// this.$router.push({
				// 	name: "searchCheckPerson",
				// 	params: this.param
				// });
			},
			// 初始化，上一页进入或者点击进入下一级或者点击导航栏的时候会重新执行
			init: function() {
				// this.param = this.$route.query || this.$route.params || {};
				this.param = this.$tabPageData() || {};
				this.userInfo = this.param.userInfo || {};
				this.isType = this.param.type; //type值为1：单选；值为2：多选
				this.curNodeList = this.param.personalList ? this.param.personalList : [];
				// console.log("初始化");
				this.$textLoading();
				this.tabPersonList = [{
					id: "",
					dangerSubType: "单位",
					parentOrgId: "-1",
					orgId: "",
					state: 1,
					userState: 1,
				}];
				this.currentTab = 0;
				this.onLoad();
			},
			// openSearch: function(){

			// },
			// 获取当前单位id
			getUserUnit: function() {
				var unitStr = this.userInfo.nameFullPath ? this.userInfo.nameFullPath : '';
				var unitArr = unitStr.split('/');
				var data = {
					userId: this.userInfo.userId,
					levelFilter: 9,
					chooseType: 'user',
					rootDepartmentId: this.userInfo.orgId,
				}
				getAllSuperOrgIds(data)
					.then(res => {
						var resRev = res.reverse();
						var arr = [];
						for (var i = 0; i < unitArr.length; i++) {
							var item = {
								id: resRev[i] ? resRev[i] : '',
								dangerSubType: unitArr[i] ? unitArr[i] : '',
								parentOrgId: resRev[(i - 1)] ? resRev[(i - 1)] : '-1',
								orgId: resRev[i] ? resRev[i] : '',
								state: 1,
								userState: 1,
							}
							this.tabPersonList.push(item);
						}
						this.tabSavaList = [];
						for (var i = 0; i < this.tabPersonList.length; i++) {
							this.tabSavaList.push(this.tabPersonList[i]);
						}
						this.currentTab = this.tabPersonList.length - 1;
						this.onRefresh();
					})
					.catch(err => {
						this.$textHid();
						console.log(err);
					});

			},
			// 根据单位查找人员
			getData_demo: function(item) {
				this.dataItem = item;
				var data = {
					orgId: item.orgId,
					state: item.state,
					userState: item.userState,
					pageNo: this.pageNo,
					pageSize: 20
				};
				// console.log("////////////////////////////////", JSON.stringify(data));
				search(data)
					.then(res => {
						this.$textHid();
						// console.log('res::::::::::' + JSON.stringify(res));
						if (res.list && res.list.length > 0) {
							for (var i = 0; i < res.list.length; i++) {
								var nodeItem = res.list[i];
								nodeItem.dangerSubType = res.list[i].employeeName ? res.list[i].employeeName : "";
								nodeItem.id = res.list[i].userId ? res.list[i].userId : "";
								nodeItem.parentOrgId = res.list[i].orgId ? res.list[i].orgId : "";
								nodeItem.status = false;
								// var nodeItem = {
								// 	dangerSubType: res.list[i].employeeName ? res.list[i].employeeName : "",
								// 	id: res.list[i].userId ? res.list[i].userId : "",
								// 	parentOrgId: res.list[i].orgId ? res.list[i].orgId : "",
								// 	status: false,
								// };
								this.taskInfo.nodeList.push(nodeItem);
							}
							// 判断多选人员选中样式
							if (this.curNodeList.length > 0) {
								for (var x = 0; x < this.taskInfo.nodeList.length; x++) {
									for (var e = 0; e < this.curNodeList.length; e++) {
										if (this.curNodeList[e].id == this.taskInfo.nodeList[x].id) {
											this.taskInfo.nodeList[x].status = this.curNodeList[e].status;
											if (this.curNodeList[e].parentOrgId == '') {
												this.curNodeList[e].parentOrgId = this.taskInfo.nodeList[x].parentOrgId;
											}
										}
									}
								}
							}
							this.curUnitItem = {};
							this.pageNo += 1;
							this.count = res.count;
							this.taskInfo.refreshing = false;
							this.taskInfo.loading = false;
							if (this.taskInfo.nodeList.length >= this.count) {
								this.taskInfo.finished = true;
							}
						} else {
							this.taskInfo.loading = false;
							this.taskInfo.finished = true; //已加载完毕
							this.taskInfo.refreshing = false; //结束下拉刷新
						}
						// 设置tab滚动到最后面
						setTimeout(function() {
							document.getElementById(
								"tabPersonList"
							).scrollLeft = 99999999999999;
						}, 0);
					})
					.catch(err => {
						this.$textHid();
						console.log(err);
						this.taskInfo.loading = false;
						this.taskInfo.finished = true; //已加载完毕
						this.taskInfo.refreshing = false; //结束下拉刷新
					});
			},
			// 选中的节点
			selectCurNode: function(index) {
				// console.log('index::::::::::::::::'+JSON.stringify(this.taskInfo.nodeList[index]));
				if (this.isType == 1) { //单选
					this.taskInfo.nodeList[index].status = !this.taskInfo.nodeList[index].status;
					// 单选赋值
					for (var i = 0; i < this.taskInfo.nodeList.length; i++) {
						this.taskInfo.nodeList[i].status = false;
						if (index == i) {
							this.taskInfo.nodeList[i].status = true;
							this.curNodeItem = this.taskInfo.nodeList[i];
						}
					}
				}
				if (this.isType == 2) { //多选
					this.taskInfo.nodeList[index].status = !this.taskInfo.nodeList[index].status;
					// 多选赋值 增加人员
					if (this.taskInfo.nodeList[index].status) {
						this.curNodeList.push(this.taskInfo.nodeList[index]);
					}
					// 多选赋值 删除人员
					if (!this.taskInfo.nodeList[index].status) {
						for (var e = 0; e < this.curNodeList.length; e++) {
							if (this.curNodeList[e].id == this.taskInfo.nodeList[index].id) {
								this.curNodeList.splice(e, 1);
							}
						}
					}
					// console.log('this.curNodeList:::' + JSON.stringify(this.curNodeList));
				}
			},
			// 清除选中的人员
			qcCurNode: function() {
				for (var i = 0; i < this.taskInfo.nodeList.length; i++) {
					this.taskInfo.nodeList[i].status = false;
					this.curNodeItem = {};
				}
				// this.callbackTap();
			},
			// 选中当前节点
			submitCurNode: function() {
				this.callbackTap();
			},
			// 多选人员删除按钮
			delPersonnelBtn: function(index) {
				for (var i = 0; i < this.taskInfo.nodeList.length; i++) {
					if (this.curNodeList[index].id == this.taskInfo.nodeList[i].id) {
						this.taskInfo.nodeList[i].status = false;
					}
				}
				this.curNodeList.splice(index, 1);
			},
			// 跨页面通讯
			callbackTap: function() {
				var data = {
					zdyObj: this.param.zdyObj,
				};
				if (this.isType == 1) { //单选
					data.curNodeItem = this.curNodeItem;
				}
				if (this.isType == 2) { //多选
					// 多选最多只能选择6个
					if (this.curNodeList.length > 6) {
						this.$textShow('人员最多可以选择6个');
						return;
					}
					data.curNodeItemlist = this.curNodeList;
				}
				var name = this.param.exeMun;

				/* 触发跨页面通讯*/
				this.$tabEmitPageFun(name, data);
				this.$nwBack(-1);
				// this.$across.$emit('person', data);
				// var name = this.param.exeMun;
				// this.$across.$emit(name, data);
				// this.$router.go(-1);
				// this.$emit("checkSubmit", data)
			},
			/* 模拟生命周期函数-每次进来一次都执行 */
			onShow(obj) {},
			onLoad() {
				// console.log('............................');
				if (this.tabPersonList.length > 1) {
					this.getData_demo(this.tabPersonList[this.tabPersonList.length - 1]);
				} else {
					this.getUserUnit();
				}
			},
			onRefresh() {
				// this.$textLoading();
				this.taskInfo.nodeList = [];
				this.pageNo = 1;
				this.count = 0;
				this.taskInfo.loading = true;
				this.taskInfo.finished = false;
				this.onLoad();
			},
		}
	};
</script>

<style scoped lang="less">
	@import "../assets/less/nw_tool.less";

	.checkPerson {
		position: relative;
		// height: 100%;
		background-color: #f5f5f5;
		text-align: left;
	}

	// 次要按钮
	.cybtn {
		// color: #262626;
		border: 1px solid #d8d8d8;
	}

	.person-centent {
		height: 100%;

	}

	.person-centent-box {
		height: 100%;
		overflow-y: auto;
	}

	.header-f {
		width: 100%;
		position: fixed;
		z-index: 9;
		top: 0;
		left: 0;
		background-color: white;
	}

	.header-txt {
		font-weight: bold;
		color: #212121;
	}

	.h44 {
		.pxToremLess(height, 44px);
	}

	.person-row {
		display: flex;
		flex-direction: row;

		.rotate180 {
			transform: rotate(-180deg);
		}
	}

	.person-bottom_button {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
	}

	.radius-5 {
		.pxToremLess(border-radius, 5px);
	}

	.pos-r {
		position: relative;
	}

	.pt140 {
		.pxToremLess(padding-top, 140px);
	}

	.radius-8 {
		.pxToremLess(border-radius, 8px);
	}

	.tab-list-scrollX {
		position: relative;
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

	.topIconRight {
		position: fixed;
		right: 0;
	}
</style>
