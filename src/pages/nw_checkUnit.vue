<template>
	<div class="yw-unitpop pt88">
		<!-- <van-popup v-model="showPop" :style="{ width: popW, height: popH}" @click-overlay="overlay">
			
		</van-popup> -->
		<nw-fixed-header title="选择单位">
			<div slot="left" @click="openCherk">
				<i class="iconfont icon-houtui"></i>
			</div>
			<div slot="right"></div>
			<div slot="page-bottom">
				<div class="borderTopE8">
					<div id="poptabUnitList" class="pop-tab-list-scrollX pos-f bg-white gray6 p15 border verticle-center f16">
						<div @click="onTabUnitClick(tabUnitItem, tabUnitIndex)" class="" v-for="(tabUnitItem,tabUnitIndex) in tabUnitList" :key="tabUnitIndex">
							<span :class="[tabUnitIndex==tabUnitList.length - 1?'gray6 mr15':'gray287']" v-html="tabUnitItem.dangerSubType"></span>
							<i v-if="tabUnitIndex<tabUnitList.length-1" class="iconfont icon-qianjin ml5 mr5 f14"></i>
						</div>
					</div>
					<div class="pos-f pop-top bg-f5 unit-row al-c ju-c">
						<div class="unit-row al-c ju-c bg-white top-w">
							<div class="task-top-input flex-1 unit-row al-c ml10 ju-c bg-white">
								<i class="iconfont icon-sousuo ml5 mr5 gray9 f15"></i>
								<input type="text" class="input flex-1 f14" v-model="searchValueUnit" placeholder="搜索"
								 @keypress="inputSearch(searchValueUnit)" />
								<i v-if="searchValueUnit.length > 0" class="iconfont icon-shanchu3 pl5 mr5 f15 gray9" @click="cancelSearch"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nw-fixed-header>
		<div class="pos-r pop-tab">
			<div class="pb65 pt44 unit-pop">
				<div class="p15 bg-white borderTopE8 unit-pop-h f16" v-for="(itme,index) in unitList" :key="index" m="click"
				 v-if="unitList.length && isSearchBox">
					<div class="unit-row ju-b al-c unit-pop-hs" @click="selectCurUnit(itme)">
						<i class="iconfont mr10" :class="[curUnitItem.id == itme.id ? 'icon-gou1 gray287 f16': 'icon-1 gray6']"
						 @click.stop="selectCurUnit(itme)"></i>
						<div class="flex-1 gray3 text-overflow text-left">{{itme.dangerSubType}}</div>
						<!-- <i class="iconfont icon-qianjin gray9 ml10 f14"></i> -->
					</div>
				</div>
				<nw-null-data class="mt20" v-if="unitList.length == 0 && isSearchBox"></nw-null-data>
				
				<div class="unit-bottom_button p10 bg-white unit-row ju-b fw boxt003 pos-f-b">
					<div class="width-50 text-center pt15 pb15 radius-8 f16 bg-287 text-white" m="click" @click="onUnitClick">下一级</div>
					<div class="width-40 text-center pt15 pb15 radius-8 f16 bg-287 text-white" m="click" @click="submitCurUnit">选定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		queryOrganizationDirectlyChild,
		getAllSuperOrgIds
	} from "../moduleAPI/nw_jadp.js";
	import {
		NWtabMinxin
	} from "../mixin/NWtabMinxin.js";
	export default {
		mixins: [NWtabMinxin], //混入公共类
		name: 'nw_checkUnit',
		data() {
			return {
				param:{},
				currentUnitTab: 0,
				tabUnitList: [], // 头部导航
				unitList: [], //组织数据
				curUnitItem: {}, ////返回单选单位对象
				curUnitItemData: [], //返回多选单位数组
				showPop: false, //控制显示隐藏弹窗
				userInfo: {}, //获取当前登录人信息
				searchValueUnit: '', //搜索内容关键字
				unitSearchList: [], //搜索内容数组
				isSearchBox: false, //控制搜索内容的显示隐藏
				initUnitList: [], //初始化默认当前登录人单位数组
				initTabUnitList: [], //初始化默认当前登录人单位数组
				initType: true,
			}
		},
		watch: {
			
		},
		components: {},
		created() {},
		mounted() {
			this.init();
		},
		methods: {
			openCherk: function(){
				if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
					this.$across.$emit('tabSrcollList');
				} else if (window.NW_MODULE_TYPE == 'nwTemplateUI') {
					this.$bus.$emit('tabSrcollList');
				}
				this.$nwBack(-1);
			},
			unitSubmit: function() {
				let item = {
					curUnitItemData: this.curUnitItemData,
					curUnitItem: this.curUnitItem,
				}
				var _this = this;
				setTimeout(()=>{
					if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
						_this.$across.$emit('unitTabBus', item);
					} else if (window.NW_MODULE_TYPE == 'nwTemplateUI') {
						_this.$bus.$emit('unitTabBus', item);
					}
				},500)
			},
			// 初始化
			init: function() {
				this.$textLoading();
				this.param = this.$tabPageData() || {};
				this.userInfo = this.param.userInfo;
				// console.log("unitpop------this.userInfo:::",JSON.stringify(this.userInfo));
				this.getUserUnit();
				this.tabUnitList = [{
					id: "",
					dangerSubType: "单位",
					parentOrgId: "",
					orgId: "-1",
					state: 1,
					userState: 1,
				}];
				this.curUnitItemData = [{
					id: "",
					dangerSubType: "单位",
					parentOrgId: "",
					orgId: "-1",
					state: 1,
					userState: 1,
				}];
				this.initTabUnitList = [{
					id: "",
					dangerSubType: "单位",
					parentOrgId: "",
					orgId: "-1",
					state: 1,
					userState: 1,
				}];
				this.currentUnitTab = 0;
				// this.getDataUnit(this.tabUnitList[0]);
			},
			// 每次打开展示当前登录人单位信息
			initTabUnit: function() {
				// console.log('**************************************************************');
				// console.log('this.initTabUnitList::::::::::'+JSON.stringify(this.initTabUnitList));
				// console.log('this.initUnitList::::::::::'+JSON.stringify(this.initUnitList));
				this.tabUnitList = [];
				this.unitList = [];
				for (var i = 0; i < this.initTabUnitList.length; i++) {
					this.tabUnitList.push(this.initTabUnitList[i]);
				}
				this.unitList = this.initUnitList;
			},
			// 手机键盘回车键
			inputSearch: function() {
				if (event.keyCode == 13) {
					event.preventDefault(); //阻止默认事件
					// console.log('inputinputinputinputinputinputinputinputinputinputinputinputinputinputinputinputinput')
					if (this.searchValueUnit.length > 0 && this.searchValueUnit != '') {
						this.unitSearchList = [];
						var arr = [];
						for (var i = 0; i < this.unitList.length; i++) {
							this.unitSearchList.push(this.unitList[i]);
							if ((this.unitList[i].dangerSubType).indexOf(this.searchValueUnit) >= 0) {
								arr.push(this.unitList[i]);
							}
						}
						this.unitList = [];
						// this.isSearchBox = false;
					}
					var _this = this;
					setTimeout(function() {
						// _this.isSearchBox = true;
						for (var e = 0; e < arr.length; e++) {
							_this.unitList.push(arr[e]);
						}
					}, 100)
				}
			},
			cancelSearch: function() {
				this.searchValueUnit = '';
				this.unitList = [];
				var _this = this;
				setTimeout(function() {
					// _this.isSearchBox = true;
					for (var x = 0; x < _this.unitSearchList.length; x++) {
						_this.unitList.push(_this.unitSearchList[x]);
					}
				}, 100)

			},
			getUserUnit: function() {
				// this.$textLoading();
				// 获取当前登录人单位全路径
				// this.userInfo = this.$store.getters.jdapUserInfo.userInfo.length > 3 ? this.$store.getters.jdapUserInfo.userInfo :
				// 	JSON.parse(localStorage.getItem('userInfo'));
				// console.log('this.userInfo****************************' + JSON.stringify(this.userInfo));
				var unitStr = this.userInfo.nameFullPath ? this.userInfo.nameFullPath : '';
				var unitArr = unitStr.split('/');
				// console.log('unitArr:::'+unitArr);
				// ?userId=&levelFilter=9&chooseType=user&rootDepartmentId=
				var data = {
					userId: this.userInfo.userId,
					levelFilter: 9,
					chooseType: 'user',
					rootDepartmentId: this.userInfo.orgId,
				}
				getAllSuperOrgIds(data)
					.then(res => {
						this.$textHid();
						// console.log('res:::::::'+JSON.stringify(res))
						var resRev = res.reverse();
						// console.log('test:::::::'+JSON.stringify(test));
						for (var i = 0; i < unitArr.length; i++) {
							var item = {
								id: resRev[i] ? resRev[i] : '',
								dangerSubType: unitArr[i] ? unitArr[i] : '',
								parentOrgId: resRev[(i - 1)] ? resRev[(i - 1)] : '-1',
								orgId: resRev[i] ? resRev[i] : '',
								state: 1,
								userState: 1,
							}
							this.tabUnitList.push(item);
							this.curUnitItemData.push(item);
							if (this.initType) {
								this.initTabUnitList.push(item);
								// this.initType = false;
							}
						}
						if (this.tabUnitList.length > 1) {
							this.getDataUnit(this.tabUnitList[(this.tabUnitList.length - 1)]);
						} else {
							this.getDataUnit(this.tabUnitList[0]);
						}
						// this.overlay();
						// this.unitSubmit();
					})
					.catch(err => {
						this.$textHid();
						console.log(err);
					});

			},
			// 查找单位
			getDataUnit: function(item) {
				var data = {
					parentOrgId: item.orgId
				};
				this.unitList = [];
				this.isSearchBox = false;
				queryOrganizationDirectlyChild(data)
					.then(res => {
						this.isSearchBox = true;
						this.$textHid();
						// console.log('res:' + JSON.stringify(res));
						if (res.length > 0) {
							for (var i = 0; i < res.length; i++) {
								var nodeItem = res[i];
								nodeItem.dangerSubType = res[i].orgName ? res[i].orgName : "",
								nodeItem.id = res[i].orgId ? res[i].orgId : "",
								nodeItem.parentOrgId = res[i].parentOrgId ? res[i].parentOrgId : "",
								nodeItem.orgId = res[i].orgId ? res[i].orgId : "",
								nodeItem.state = res[i].state ? res[i].state : 1,
								nodeItem.userState = res[i].userState ? res[i].userState : 1,
								// var nodeItem = {
								// 	dangerSubType: res[i].orgName ? res[i].orgName : "",
								// 	id: res[i].orgId ? res[i].orgId : "",
								// 	parentOrgId: res[i].parentOrgId ? res[i].parentOrgId : "",
								// 	orgId: res[i].orgId ? res[i].orgId : "",
								// 	state: res[i].state ? res[i].state : 1,
								// 	userState: res[i].userState ? res[i].userState : 1,
								// };
								this.unitList.push(nodeItem);
								if (this.initType) {
									this.initUnitList.push(nodeItem);
								}
							}
							this.curUnitItem = {};
							this.initType = false;
						} else {
							if (this.showPop) {
								this.$textShow('该单位没有下级单位');
							}
							if (this.unitList.length == 0) {
								this.getDataUnit(this.tabUnitList[(this.tabUnitList.length - 2)]);
							}
						}
						// 设置tab滚动到最后面
						setTimeout(function() {
							document.getElementById(
								"poptabUnitList"
							).scrollLeft = 99999999999999;
						}, 30);
					})
					.catch(err => {
						this.$textHid();
						console.log(err);
					});
			},
			// 下一级单位节点
			onUnitClick: function() {
				// console.log('点击了一个节点::' + JSON.stringify(this.curUnitItem));
				if (this.curUnitItem && this.curUnitItem.id) {
					// console.log('1111111111111111111111111111111');
					for (var i = 0; i < this.unitList.length; i++) {
						if (this.tabUnitList[this.tabUnitList.length - 1].parentOrgId == this.unitList[i].parentOrgId) {
							this.tabUnitList.splice((this.tabUnitList.length - 1), 1);
							this.tabUnitList.push(this.curUnitItem);
						}
						if (this.curUnitItemData[this.curUnitItemData.length - 1].parentOrgId == this.unitList[i].parentOrgId) {
							this.curUnitItemData.splice((this.curUnitItemData.length - 1), 1);
							this.curUnitItemData.push(this.curUnitItem);
						}
					}
					if (this.tabUnitList[this.tabUnitList.length - 1].parentOrgId != this.curUnitItem.parentOrgId) {
						this.tabUnitList.push(this.curUnitItem);
					}
					if (this.curUnitItemData[this.curUnitItemData.length - 1].parentOrgId != this.curUnitItem.parentOrgId) {
						this.curUnitItemData.push(this.curUnitItem);
					}
					this.cancelSearch();
					this.getDataUnit(this.curUnitItem);
				} else {
					// console.log('2222222222222222222222222222');
					this.$textShow('请选择单位');
				}
			},
			// 切换选中单位的节点
			selectCurUnit: function(item) {
				if (this.curUnitItem.id && item.id && this.curUnitItem.id == item.id) {
					this.curUnitItem = {};
				} else {
					this.curUnitItem = item;
				}
			},
			// 选择单位切换
			onTabUnitClick: function(item, index) {
				if ((this.tabUnitList.length - 1) == index) {
					return;
				}
				this.currentUnitTab = index;
				this.tabUnitList = this.tabUnitList.splice(0, index + 1);
				this.curUnitItemData = this.curUnitItemData.splice(0, index + 1);
				this.getDataUnit(item);
			},
			// 选中单位当前节点，如果没有下级单位则关闭弹窗
			submitCurUnit: function() {
				if (this.curUnitItem && this.curUnitItem.id) {
					for (var e = 0; e < this.unitList.length; e++) {
						if (this.curUnitItemData[this.curUnitItemData.length - 1].parentOrgId == this.unitList[e].parentOrgId) {
							this.curUnitItemData.splice((this.curUnitItemData.length - 1), 1);
							this.curUnitItemData.push(this.curUnitItem);
						}
					}
					if (this.curUnitItemData[this.curUnitItemData.length - 1].parentOrgId != this.curUnitItem.parentOrgId) {
						this.curUnitItemData.push(this.curUnitItem);
					}
					var _this = this;
					let item = {
						curUnitItemData: _this.curUnitItemData,
						curUnitItem: _this.curUnitItem,
					}
					setTimeout(function() {
						var name = _this.param.exeMun;
						if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
							_this.$across.$emit(name, item);
						} else if (window.NW_MODULE_TYPE == 'nwTemplateUI') {
							console.log('name:::',name);
							_this.$bus.$emit(name, item);
						}
						_this.$nwBack(-1);
					}, 500);
				} else {
					this.$textShow('请选择单位');
					return;
				}
			},
			/* 模拟生命周期函数-只执行一次 */
			onLoad(obj) {
			},
			/* 模拟生命周期函数-每次进来一次都执行 */
			onShow(obj) {
			},
		}
	};
</script>

<style scoped lang="less">
	@import "../assets/less/nw_tool.less";
	.yw-unitpop{
		position: relative;
		
		.unit-row{
			display: flex;
			flex-direction: row;
		}
		
		.pb65{
			.pxToremLess(padding-bottom,65px);
		}
		.pt132{
			.pxToremLess(padding-top,132px);
		}
		
		.input-box {
			width: 100%;
			transition: all 0.5s;
			
			.left-btn {
				left: -1.1rem;
			}
			
			/* 顶部搜索 */
			.task-top-input {
				width: 80%;
				.pxToremLess(height,30px);
				.pxToremLess(border-radius,5px);
			}
		}
		.pop-top{
			.pxToremLess(height,44px);
			.pxToremLess(top,88px);
			width: 100%;
			.top-w{
				width: 90%;
				.pxToremLess(height,30px);
				.pxToremLess(border-radius,5px);
			}
		}
		.unit-bottom_button {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
		}
		.unit-pop{
			height: auto;
			.unit-pop-h{
				height: 100%;
				.unit-pop-hs{
					height: 100%;
				}
			}
		}
		.pos-f {
			position: fixed !important;
			z-index: 999;
		}
		.pt88{
			.pxToremLess(padding-top,88px);
		}
		
		.pop-tab {
			height: 100%;
			overflow: auto;
		
			.bottom_button {
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				width: 100%;
			}
		}
		
		.pos-r {
			position: relative;
		}
		
		.radius-8 {
			.pxToremLess(border-radius,8px);
		}
		
		.pop-tab-list-scrollX {
			position: relative;
			width: 100%;
			.pxToremLess(height,44px);
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
	}
</style>
