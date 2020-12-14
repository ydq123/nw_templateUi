<template>
	<div class="checkPerson">
		<div class="header-f bg-white">
			<div class="h44 bg-f5 borderButtomE8 row al-c ju-b pl15 pr15">
				<div class="left-btn" @click="$router.go(-1)">
					<i class="iconfont icon-houtui gray6 f18"></i>
				</div>
				<div class="header-txt f16">选择人员</div>
				<div class=""></div>
			</div>
			<div class="row al-c" @click="showPop = true">
				<div id="tabList" class="tab-list-scrollX bg-white f16 gray6 p15 mr30 border verticle-center">
					<div class="" v-for="(tabItem,tabIndex) in tabList" :key="tabIndex">
						<span :class="[tabIndex==currentTab?'gray6 mr15':'gray287']" v-html="tabItem.dangerSubType"></span>
						<i v-if="tabIndex<tabList.length-1" class="iconfont icon-qianjin ml5 mr5 f14"></i>
					</div>
				</div>
				<div class="topIconRight">
					<i class="iconfont icon-xinjian ml5 mr5 f16 gray287"></i>
				</div>
			</div>
			<div class="bg-f5 pl15 pr15 pt10 pb10">
				<div class="bg-white pt10 pb10 gray9 radius-5" @click="$tabOpenWin('operation_searchPersonnel', param)">
					<i class="iconfont icon-sousuo f15 ml5 mr5 gray9"></i>
					搜索
				</div>
			</div>
		</div>

		<!-- 选择单位弹窗 -->
		<nw-unit-pop :popShow="showPop" :popUserInfo="userInfo" @overlay="popOverlay"></nw-unit-pop>
		<!-- 多选人员弹窗 -->
		<van-popup v-model="showPicker2" round :style="{ width: '80%', height: '75%' }">
			<div class="pt20 pb20">
				<div class="p15 borderButtomE8 f16 row al-c" v-for="(value,index) in curNodeList" :key="index">
					<div class="flex-1">
						{{value.dangerSubType}}
					</div>
					<i class="iconfont f16 icon-shanchu3 text-red" @click="delPersonnelBtn(index)"></i>
				</div>
				<div class="person-noData" v-if="curNodeList.length <= 0">
					<!-- <img :src="require('@/assets/image/nullData.png')" alt="" /> -->
					<p>暂无数据</p>
				</div>
			</div>
		</van-popup>

		<div :class="{'pb60 pt140' : taskInfo.nodeList.length > 0}">
			<van-list v-model="taskInfo.loading" :finished="taskInfo.finished" :finished-text="taskInfo.nodeList.length > 0 ? '没有更多数据了' : ''"
			 @load="onLoad">
				<van-pull-refresh v-model="taskInfo.refreshing" @refresh="onRefresh">
					<div class="p15 bg-white row ju-b al-c f16 borderTopE8" @click="selectCurNode(nodeIndex)" :class="{'borderTopE8':nodeIndex!=0}"
					 v-for="(nodeItme,nodeIndex) in taskInfo.nodeList" :key="nodeIndex" >
						<i class="iconfont f16 mr10" :class="[nodeItme.status ? 'icon-gou1 gray287' : 'icon-1 gray6']" @click.stop="selectCurNode(nodeIndex)"></i>
						<div class="flex-1 gray3 text-overflow text-left">{{nodeItme.dangerSubType}}</div>
						<!-- <i class="iconfont icon-qianjin gray9 f14 ml10"></i> -->
					</div>
				</van-pull-refresh>
			</van-list>
			<div class="person-noData" v-if="taskInfo.nodeList.length <= 0">
				<!-- <img :src="require('@/assets/image/nullData.png')" alt="" /> -->
				<p>暂无数据</p>
			</div>
			<div class="person-bottom_button p10 bg-white row ju-b f16 width-100 fw boxt003" v-if="taskInfo.nodeList.length > 0 && isType == 1">
				<div class="nw_buttom_354_44 bg-287 text-white"  @click="submitCurNode">确定</div>
			</div>
			<div class="person-bottom_button p10 bg-white row ju-b f16 width-100 fw boxt003" v-if="taskInfo.nodeList.length > 0 && isType == 2">
				<div class="gray287 row al-c "  @click="showPicker2 = true">已选择: {{ curNodeList.length }}人</div>
				<div class="nw_buttom_125_44 bg-287 text-white"  @click="submitCurNode">确定</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		search
	} from "@/moduleAPI/jadp.js";
	import {
		tabMinxin
	} from "@/mixin/tabMinxin.js";
	export default {
		name: "checkPerson",
		mixins: [tabMinxin],
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
				tabList: [], // 头部导航
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
		mounted() {
			// console.log("路由参数:this.$route.params", this.$route.params);
			// console.log("路由参数:this.$route.query", this.$route.query);
			this.init();
		},
		methods: {
			popOverlay: function(data) {
				this.showPop = false;
				console.log('popOverlay::data::' + JSON.stringify(data))
				// if(data && this.showPop == false){
				this.tabList = data.curUnitItemData;
				this.currentTab = this.tabList.length - 1;
				this.onRefresh();
				// }
			},
			// 初始化，上一页进入或者点击进入下一级或者点击导航栏的时候会重新执行
			init: function() {
				this.param = this.$route.query || this.$route.params || {};
				this.$nextTick(() => {
					this.userInfo = this.param.userInfo || {};
					console.log("uuuuuuu--this.userInfo:::",this.userInfo);
				})
				this.isType = this.param.type; //type值为1：单选；值为2：多选
				this.curNodeList = this.param.personalList ? this.param.personalList : [];
				console.log("初始化");
				this.$textLoading();
				this.tabList = [{
					id: "",
					dangerSubType: "单位",
					parentOrgId: "-1",
					orgId: "",
					state: 1,
					userState: 1,
				}];
				this.currentTab = 0;
			},
			// openSearch: function(){

			// },
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
				search(data)
					.then(res => {
						this.$textHid();
						// console.log('res::::::::::' + JSON.stringify(res));
						if (res.list && res.list.length > 0) {
							for (var i = 0; i < res.list.length; i++) {
								var nodeItem = {
									dangerSubType: res.list[i].employeeName ? res.list[i].employeeName : "",
									id: res.list[i].userId ? res.list[i].userId : "",
									parentOrgId: res.list[i].orgId ? res.list[i].orgId : "",
									status: false,
								};
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
								"tabList"
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
						this.curNodeList.splice(this.taskInfo.nodeList[index], 1);
					}
					console.log('this.curNodeList:::' + JSON.stringify(this.curNodeList));
				}
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
					status: this.param.status,
					isZpw: this.param.isZpw
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
				this.$bus.$emit('testAccectFun', data);
				console.log("跨页面通讯回调data" + JSON.stringify(data));
				// this.$bus.$emit('', data);
				// this.$tabBack(-1);
				this.$router.go(-1);
			},
			onLoad() {
				console.log('............................');
				this.getData_demo(this.tabList[this.tabList.length - 1]);
			},
			onRefresh() {
				this.$textLoading();
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

<style scoped lang='scss'>
	/* @import "../../assets/scss/nw_tool.scss"; */
	.checkPerson {
		height: 100%;
		background-color: #f5f5f5;
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
		height: 44px;
	}

	.person-bottom_button {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
	}

	.radius-5 {
		border-radius: 5px;
	}

	.pos-r {
		position: relative;
	}

	.pt140 {
		padding-top: 80px;
	}

	.radius-8 {
		border-radius: 8px;
	}

	.tab-list-scrollX {
		position: relative;
		width: 100vw;
		height: 44px;
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
	
	/*没有数据*/
	.person-noData {
		padding-top: 120px;
		text-align: center;
		color: #b5b5b5;
		font-size: 30px;
		img {
			width: 250px;
			margin: 0 auto;
		}
		.button {
			font-size: 30px;
			min-width: 160px;
			height: 60px;
			padding: 0 56px;
			line-height: 60px;
			border-radius: 60px;
			background: #a22423;
			color: #fff;
			border-width: 1px;
		}
		p {
			margin: 40px 0 56px;
		}
		i {
			font-size: 56px;
		}
	}
	
</style>
