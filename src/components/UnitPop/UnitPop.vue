<!-- 选择单位弹窗
	<nw-unit-pop :popShow="unitPop" :popUserInfo="userInfo" @overlay="testOverlay"></nw-unit-pop>
	// 修改 选择单位弹窗样式开始
	// popW: '', //弹窗宽度
	// popH: '', //弹窗高度
	// topIconFontSize: '', //头部箭头icon大小
	// topFontSize: '', //头部字体大小
	// topFontCol: '', //头部字体颜色
	// fontSize: '', //内容字体大小
	// iconCol: '', //内容选择icon颜色
	// iconLeftSize: '', //内容左侧选择icon大小
	// iconRightSize: '', //内容右侧icon大小
	// btnHtmlTxt: '', ////底部按钮文本
	// btnFontBgCol: [], //底部按钮样式数组
	//placeholderTxt: '',//搜索文本
	//sousuoIcon: '', //搜索icon大小
	//shanchuIcon: [],//删除icon大小颜色
	//popStatus: '',页面用到多个组件时需要传字符串，用于判断要修改的数据
	//popUserInfo: {},当前登录人信息
	// 修改 选择单位弹窗样式结束
 -->
<template>
	<div class="yw-unitpop">
		<van-popup v-model="showPop" :style="{ width: popW, height: popH, 'border-radius': '8px' }" @click-overlay="overlay">
			<div class="pos-r pop-tab">
				<div id="poptabUnitList" class="pop-tab-list-scrollX pos-f bg-white gray6 p15 border verticle-center" :class="topFontSize">
					<div @click="onTabUnitClick(tabItem, tabIndex)" class="" v-for="(tabItem,tabIndex) in tabUnitList" :key="tabIndex">
						<span :class="[tabIndex==tabUnitList.length - 1?'gray6 mr15':topFontCol]" v-html="tabItem.dangerSubType"></span>
						<i v-if="tabIndex<tabUnitList.length-1" class="iconfont icon-qianjin ml5 mr5" :class="topIconFontSize"></i>
					</div>
				</div>
				<div class="pos-f pop-top bg-f5 unit-row al-c ju-c">
					<div class="unit-row al-c ju-c bg-white top-w">
						<div class="task-top-input flex-1 unit-row al-c ml10 ju-c bg-white">
							<i class="iconfont icon-sousuo ml5 mr5 gray9" :class="sousuoIcon"></i>
							<input id="tapInput" type="text" class="input flex-1 f14" v-model="searchValue" :placeholder="placeholderTxt"
							 @keypress="inputSearch(searchValue)" />
							<i v-if="searchValue.length > 0" class="iconfont icon-shanchu3 pl5 mr5" :class="shanchuIcon" @click="cancelSearch"></i>
						</div>
					</div>
				</div>
				<div class="pt88 pb65 unit-pop">
					<div class="p15 bg-white borderTopE8 unit-pop-h" :class="fontSize" v-for="(itme,index) in unitList" :key="index" m="click"
					 v-if="unitList.length && isSearchBox">
						<div class="unit-row ju-b al-c unit-pop-hs" @click="selectCurUnit(itme)">
							<i class="iconfont mr10" :class="[curUnitItem.id == itme.id ? 'icon-gou1'+' '+iconCol +' '+ iconLeftSize: 'icon-1 gray6']"
							 @click.stop="selectCurUnit(itme)"></i>
							<div class="flex-1 gray3 text-overflow text-left">{{itme.dangerSubType}}</div>
							<!-- <i class="iconfont icon-qianjin gray9 ml10" :class="iconRightSize"></i> -->
						</div>
					</div>
					<div class="unit-noData" v-if="unitList.length == 0 && isSearchBox">
						<img src="../../assets/images/nullData.png" />
						<p>暂无数据</p>
					</div>
					
					<!--  v-if="curUnitItem.id" -->
					<div class="unit-bottom_button p10 bg-white unit-row ju-b fw boxt003 pos-f-b">
						<div class="width-50 text-center pt15 pb15 radius-8" :class="btnFontBgCol" m="click" @click="onUnitClick">下一级</div>
						<div class="width-40 text-center pt15 pb15 radius-8" :class="btnFontBgCol" m="click" @click="submitCurUnit">{{btnHtmlTxt}}</div>
					</div>
					<!-- {{testPop}} -->
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import {
		queryOrganizationDirectlyChild,
		getAllSuperOrgIds
	} from "@/moduleAPI/jadp.js";
	import {
		NWtabMinxin
	} from "@/mixin/NWtabMinxin.js";
	export default {
		mixins: [NWtabMinxin], //混入公共类
		name: 'UnitPop',
		props: {
			popShow: {
				type: Boolean,
				default: false
			},
			popW: {
				type: String,
				default: '80%' //弹窗宽度
			},
			popH: {
				type: String,
				default: '75%' //弹窗高度
			},
			topIconFontSize: {
				type: String,
				default: 'f14' //头部箭头icon大小
			},
			topFontSize: {
				type: String,
				default: 'f16' //头部字体大小
			},
			topFontCol: {
				type: String,
				default: 'gray287' //头部字体颜色
			},
			fontSize: {
				type: String,
				default: 'f16' //内容字体大小
			},
			iconCol: {
				type: String,
				default: 'gray287' //内容选择icon颜色
			},
			iconLeftSize: {
				type: String,
				default: 'f16' //内容左侧选择icon大小
			},
			iconRightSize: {
				type: String,
				default: 'f14' //内容右侧icon大小
			},
			btnHtmlTxt: {
				type: String,
				default: '选定' //底部按钮文本
			},
			placeholderTxt: {
				type: String,
				default: '搜索' //搜索文本
			},
			sousuoIcon: {
				type: String,
				default: 'f15' //搜索icon大小
			},
			shanchuIcon: {
				type: Array,
				default: () => ['f15', 'gray9'] //删除icon大小颜色
			},
			btnFontBgCol: {
				type: Array,
				default: () => ['f16', 'bg-287', 'text-white'] //底部按钮样式数组
			},
			popStatus: {
				type: String,
				default: ''
			},
			popUserInfo: { //当前登录人信息
				type: Object,
				default: ()=>({})
			}
		},
		data() {
			return {
				currentTab: 0,
				tabUnitList: [], // 头部导航
				unitList: [], //组织数据
				curUnitItem: {}, ////返回单选单位对象
				curUnitItemData: [], //返回多选单位数组
				showPop: false, //控制显示隐藏弹窗
				userInfo: {}, //获取当前登录人信息
				searchValue: '', //搜索内容关键字
				unitSearchList: [], //搜索内容数组
				isSearchBox: false, //控制搜索内容的显示隐藏
				initUnitList: [], //初始化默认当前登录人单位数组
				initTabUnitList: [], //初始化默认当前登录人单位数组
				initType: true,
			}
		},
		watch: {
			showPop: function() {
				this.$emit('update:popShow', this.showPop);
			},
			popShow: function() {
				this.showPop = this.popShow;
				// this.initTabUnit();
			},
			popUserInfo:function(newval){
				if(newval) {
					this.userInfo = newval;
					console.log('userInfouserInfouserInfouserInfouserInfouserInfo');
					this.init();
				}
			},
		},
		components: {},
		created() {},
		mounted() {
			// this.init();
		},
		methods: {
			overlay: function() {
				this.showPop = false;
				console.log('this.popStatus::::::::::::::::::::::::::::::::::::::::' + this.popStatus);
				// this.$emit('overlay');
				let item = {
					curUnitItemData: this.curUnitItemData,
					curUnitItem: this.curUnitItem,
					status: this.popStatus
				}
				this.$emit('overlay', item);
				// console.log('-----------=========');
			},
			// 初始化
			init: function() {
				console.log("unitpop------this.popUserInfo:::",JSON.stringify(this.popUserInfo));
				console.log("unitpop------this.userInfo:::",JSON.stringify(this.userInfo));
				this.getUserUnit();
				this.showPop = this.popShow;
				console.log("选择单位弹窗");
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
				this.currentTab = 0;
				// this.getDataUnit(this.tabUnitList[0]);
			},
			// 每次打开展示当前登录人单位信息
			initTabUnit: function() {
				console.log('**************************************************************');
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
					if (this.searchValue.length > 0 && this.searchValue != '') {
						this.unitSearchList = [];
						var arr = [];
						for (var i = 0; i < this.unitList.length; i++) {
							this.unitSearchList.push(this.unitList[i]);
							if ((this.unitList[i].dangerSubType).indexOf(this.searchValue) >= 0) {
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
				this.searchValue = '';
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
				console.log('this.userInfo****************************' + JSON.stringify(this.userInfo));
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
						this.overlay();
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
								var nodeItem = {
									dangerSubType: res[i].orgName ? res[i].orgName : "",
									id: res[i].orgId ? res[i].orgId : "",
									parentOrgId: res[i].parentOrgId ? res[i].parentOrgId : "",
									orgId: res[i].orgId ? res[i].orgId : "",
									state: res[i].state ? res[i].state : 1,
									userState: res[i].userState ? res[i].userState : 1,
								};
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
						if (this.showPop) {
							setTimeout(function() {
								document.getElementById(
									"poptabUnitList"
								).scrollLeft = 99999999999999;
							}, 0);
						}
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
				this.currentTab = index;
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
					setTimeout(function() {
						_this.overlay();
					}, 500);
				} else {
					this.$textShow('请选择单位');
					return;
				}
			},
		}
	};
</script>

<style scoped lang="scss">
	@import "../../assets/scss/nw_tool.scss";
	.yw-unitpop{
		.unit-row{
			display: flex;
			flex-direction: row;
		}
		
		.pb65{
			padding-bottom: r(65px);
		}
		.pt88{
			padding-top: r(88px);
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
				height: r(30px);
				border-radius: r(5px);
			}
		}
		.pop-top{
			height: r(44px);
			top: r(44px);
			width: 100%;
			.top-w{
				width: 90%;
				height: r(30px);
				border-radius: r(5px);
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
			padding-top: r(88px);
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
			border-radius: r(8px);
		}
		
		.pop-tab-list-scrollX {
			position: relative;
			width: 100%;
			height: r(44px);
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
	/*没有数据*/
	.unit-noData {
		padding-top: r(60px);
		text-align: center;
		color: #b5b5b5;
		font-size: r(15px);
		img {
			width: r(200px);
			margin: 0 auto;
		}
		.button {
			font-size: r(15px);
			min-width: r(160px);
			height: r(60px);
			padding: 0 r(56px);
			line-height: r(60px);
			border-radius: r(60px);
			background: #a22423;
			color: #fff;
			border-width: 1px;
		}
		p {
			margin: r(40px) 0 r(56px);
		}
		i {
			font-size: r(56px);
		}
	}
</style>
