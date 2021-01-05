<template>
	<div class="searchCheckPerson pt88">
		<nw-fixed-header title="搜索人员">
			<div slot="left" @click="$nwBack(-1)">
				<i class="iconfont icon-houtui"></i>
			</div>
			<div slot="right"></div>
			<div slot="page-bottom">
				<div class="bg-f5 pt10 pb10 pl15 pr15">
					<div class="task-top-input flex-1 row al-c ju-c bg-white">
						<i class="iconfont icon-sousuo f15 ml5 mr5 gray9"></i>
						<input type="text" class="flex-1 f14" v-model="searchValuePerson" placeholder="搜索" @keypress="inputSearch(searchValuePerson)" />
						<i v-if="searchValuePerson.length > 0" class="iconfont icon-shanchu3 f15 pl5 mr5 gray9" @click="cancelSearch"></i>
					</div>
				</div>
			</div>
		</nw-fixed-header>

		<!-- 多选人员弹窗 -->
		<van-popup v-model="showPicker" round :style="{ width: '80%', height: '75%' }">
			<div class="pt20 pb20">
				<div class="p15 borderButtomE8 f16 row al-c" v-for="(value,index) in curNodeList" :key="index">
					<div class="flex-1">
						{{value.dangerSubType}}
					</div>
					<i class="iconfont f16 icon-shanchu3 text-red" @click="delPersonnelBtn(index)"></i>
				</div>
				<nw-null-data v-if="curNodeList.length <= 0" class="mt20 pb20"></nw-null-data>
			</div>
		</van-popup>

		<div class="person-centent" :class="{'pb60 pt20' : taskInfo.nodeList.length > 0}">
			<van-list v-model="taskInfo.loading" @load="onLoad" :finished="taskInfo.finished" :finished-text="taskInfo.nodeList.length > 0 ? '没有更多数据了' : ''">
				<van-pull-refresh v-model="taskInfo.refreshing" @refresh="onRefresh">
					<div class="person-centent-box">
						<div class="p15 bg-white row ju-b al-c f16 borderTopE8" @click="selectCurNode(nodeIndex)" :class="{'borderTopE8':nodeIndex!=0}"
						 v-for="(nodeItme,nodeIndex) in taskInfo.nodeList" :key="nodeIndex" m="click">
							<i class="iconfont f16 mr10" :class="[nodeItme.status ? 'icon-gou1 gray287' : 'icon-1 gray6']" @click.stop="selectCurNode(nodeIndex)"></i>
							<div class="flex-1 gray3 text-overflow">{{nodeItme.dangerSubType}}</div>
							<!-- <i class="iconfont icon-qianjin gray9 f14 ml10"></i> -->
						</div>
					</div>
					<nw-null-data v-if="taskInfo.nodeList.length <= 0" class="mt20 pb20"></nw-null-data>
				</van-pull-refresh>
			</van-list>
			<div class="bottom_button bg-white row ju-b f16 width-100 fw boxt003" v-if="taskInfo.nodeList.length > 0 && isType == 1">
				<div class="nw_buttom_345_44 bg-287 text-white" m="click" @click="submitCurNode">确定</div>
			</div>
			<div class="bottom_button bg-white row ju-b f16 width-100 fw boxt003" v-if="taskInfo.nodeList.length > 0 && isType == 2">
				<div class="gray287 row al-c " m="click" @click="showPicker = true">已选择: {{ curNodeList.length }}人</div>
				<div class="nw_buttom_125_44 bg-287 text-white" m="click" @click="submitCurNode">确定</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		fastQueryUser
	} from "@/moduleAPI/nw_jadp.js";
	import {
		NWtabMinxin
	} from "../mixin/NWtabMinxin.js";
	export default {
		name: "searchCheckPerson",
		mixins: [NWtabMinxin],
		data() {
			return {
				param: {},
				taskInfo: {
					nodeList: [], // 展示人员数据数组
					loading: false,
					finished: false,
					refreshing: false,
				},
				showPicker: false,
				searchValuePerson: '',
				pageNo: 1,
				curNodeItem: {}, //单选人员信息
				curNodeList: [], //多选人员信息
				isType: 0, //判断人员单选或多选，1：单选；2多选
			};
		},
		components: {},
		created() {},
		mounted() {
			console.log("路由参数", this.tabPageData);
			this.init();
		},
		methods: {
			// 初始化，上一页进入或者点击进入下一级或者点击导航栏的时候会重新执行
			init: function() {
				this.param = this.$tabPageData() || {};
				console.log("this.param:",JSON.stringify(this.param));
				this.isType = this.param.type; //type值为1：单选；值为2：多选
				// if (this.param.status == 1 || this.param.status == 3 || this.param.status == 4) {
				// 	// 多选
				// 	this.isType = 2;
				// } else {
				// 	this.isType = 1;
				// }
				// console.log('this.param:::::::::::::' + JSON.stringify(this.param));
				// console.log("初始化");
			},
			openCherk: function(){
				this.$emit("openCherk");
			},
			getUserInfo: function() {
				var data = {
					keyword: this.searchValuePerson,
					pageNo: this.pageNo,
					pageSize: 20
				}
				fastQueryUser(data).then(res => {
					this.$textHid();
					console.log('res::::::::::::' + JSON.stringify(res));
					if (res.list && res.list.length > 0) {
						for (var i = 0; i < res.list.length; i++) {
							var nodeItem = {
								dangerSubType: res.list[i].title ? res.list[i].title : "",
								id: res.list[i].key ? res.list[i].key : "",
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
									}
								}
							}
						}
						this.curUnitItem = {};
						this.pageNo += 1;
						this.taskInfo.refreshing = false;
						this.taskInfo.loading = false;
						if (res.list.length < 20) {
							this.taskInfo.finished = true;
						}
						// console.log('this.taskInfo.nodeList:::::::::::::::::::' + JSON.stringify(this.taskInfo.nodeList));
					} else {
						this.taskInfo.loading = false;
						this.taskInfo.finished = true; //已加载完毕
						this.taskInfo.refreshing = false; //结束下拉刷新
					}
				}).catch(err => {
					this.$textHid();
					console.log(err);
					this.taskInfo.loading = false;
					this.taskInfo.finished = true; //已加载完毕
					this.taskInfo.refreshing = false; //结束下拉刷新
				});
			},
			// 选中的节点
			selectCurNode: function(index) {
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
					// console.log('this.curNodeList:::' + JSON.stringify(this.curNodeList));
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
				var name = this.param.exeMun;
				if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
					this.$across.$emit(name, data);
				} else if (window.NW_MODULE_TYPE == 'nwTemplateUI') {
					console.log('name:',name);
					this.$bus.$emit(name, data);
				}
				this.$nwBack(-2);
				// var name = this.param.exeMun;
				// this.$across.$emit(name, data);
				// this.$router.go(-2);
				// this.$emit("searchSubmit", data)
			},
			inputSearch: function() {
				if (event.keyCode == 13) {
					event.preventDefault(); //阻止默认事件
					if (this.searchValuePerson.length > 0) {
						this.onRefresh();
					} else {
						this.$textShow('请输入搜索名称');
					}
				}
			},
			cancelSearch: function() {
				this.searchValuePerson = '';

			},
			/* 模拟生命周期函数-每次进来一次都执行 */
			onShow(obj) {
			},
			onLoad() {
				// console.log('............................');
				this.getUserInfo();
			},
			onRefresh() {
				this.$textLoading();
				this.taskInfo.nodeList = [];
				this.pageNo = 1;
				this.taskInfo.loading = true;
				this.taskInfo.finished = false;
				this.onLoad();
			},
		}
	};
</script>

<style scoped lang='less'>
	.searchCheckPerson {
		position: relative;
		/* height: 100%; */
		background-color: #f5f5f5;
		text-align: left;
	}
	
	.person-centent{
		height: 100%;
		
	}
	.person-centent-box{
		height: 100%;
		overflow-y: auto;
	}

	/* 顶部搜索 */
	.task-top-input {
		width: 100%;
		height: 34px;
		border-radius: 5px;
	}
</style>
