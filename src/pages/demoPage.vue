<template>
	<div id="demoPage" style="padding-top:100px;padding-bottom: 80px;">
		<!-- 页面头部组件 -->
		<nw-fixed-header title="头部导航" @headBackeHandle="backHandle" @threeClockHandle="ClockHandle" @backHomeHandle="HomeHandle">
			<div slot="page-bottmo"></div>
		</nw-fixed-header>
		<!-- 头部搜索组件 -->
		<nw-top-input :mTop="44">
			<div slot="topInput"></div>
			<!-- <div slot="taskSreenSort"></div> -->
		</nw-top-input>
		<h2 class="mt15 mb10">tab切换组件（带筛选、排序）</h2>
		<nw-module-top :isSort="true" :isSreen="true" @inputTopBtn="testInputTopBtn" @changeTab="testChangeTab"
		 @changeSortItem="testChangeSortItem" @submitScreen="testSubmitScreen" @resetScreen="testResetScreen">
		</nw-module-top>
    
    <button><h1 @click="openFlowView">流程页面组件</h1></button>
		<h2 class="mt15 mb10">详情页顶部简介</h2>
		<nwtop-introduce></nwtop-introduce>
		<h2 class="mt15 mb10">多状态tab组件</h2>
		<nw-tab-widget></nw-tab-widget>
		<h2 class="mt15 mb10">动画加载中组件</h2>
		<nw-inside-loading />
		<h2 class="mt15 mb10">无数据占位组件</h2>
		<nw-null-data class="bg-f5">
			<p slot='nullText'>123</p>
		</nw-null-data>
		<h2 class="mt15 mb10">附件上传组件</h2>
		<nw-uploader :fileInfo="fileInfo" :lookFileArr2="lookFileArr2" :baseUrl="baseUrl" :proxyUrl="proxyUrl" :proxyIp="proxyIp"
		 :accessToken="accessToken"></nw-uploader>
		<h2 class="mt15 mb10">折叠框组件</h2>
		<nw-folding-box>
			<!-- <div slot="topRIconSlot"></div> -->
			<div slot="boxCenten">
				<h2 class="mt15 mb10">文本输入框组件</h2>
				<nw-textput-box></nw-textput-box>
				<h2 class="mt15 mb10">状态标签组件</h2>
				<nw-status-label></nw-status-label>
			</div>
			<!-- <div slot="botIconSlot"></div> -->
		</nw-folding-box>
		<!-- 地图筛选弹框组件 -->
		<nw-map-pop :isMapPop="mapPop" @checkTheme="testCheckTheme"  @zdcBtnShow="testZdcBtnShow"></nw-map-pop>
		<!-- 选择组织--组件 -->
		<nw-unit-pop :popShow="unitPop" :popUserInfo="userInfo" @overlay="testOverlay"></nw-unit-pop>
		<!-- 右侧弹出筛选组件 -->
		<nw-PopupFilter v-model="popupState"></nw-PopupFilter>
		<!-- 悬浮球组件 -->
		<nw-float-menu :menuArr="menuArr" @menuClick="menuClickTap"></nw-float-menu>
		<!-- 底部按钮组件 -->
		<nw-bot-button :zyBtn="dbZyBtn" :cyBtn="dbCyBtn" :twoZCyBtn="dbTwoZCyBtn" :zIconBtn="botbtnobj" @cliIconRBtn="testCliIconRBtn" @cliIconItemBtn="testCliIconItemBtn" />
	</div>
</template>

<script>
	export default {
		name: "demoPage",
		data() {
			return {
				popupState: false,
				unitPop: false,
				mapPop: false,
				baseUrl: '',
				proxyUrl: '',
				accessToken: '',
				proxyIp: '',
				lookFileArr2: [],
				fileInfo: {},
				dbZyBtn: {
					btnType: false,
				},
				dbCyBtn: {
					btnType: false,
				},
				dbTwoZCyBtn: {
					btnType: false,
				},
				menuArr: [
				  {
				    name: "菜单一",
				    iconName: "",
				    iColorName: "",
				    iconColor: "",
				    imgName: require("../assets/images/center.png")
				  },
				  {
				    name: "菜单二",
				    iconName: "",
				    iconColor: "",
				    iColorName: "",
				    imgName: require("../assets/images/center.png")
				  },
				  {
				    name: "菜单二",
				    iconName: "",
				    iconColor: "",
				    iColorName: "",
				    imgName: require("../assets/images/center.png")
				  }
				],
				botbtnobj: { // icon按钮配置项
					btnType: true,
					iconList: [{
							icon: 'icon-jinyongqingkuang', // icon名称
							iconText: '筛选弹窗', // icon文案
							iconSize: 'f14', // icon大小
							textSize: 'f12', // 文案大小
							iconColor: '', // icon颜色
							textColor: '', // icon文案颜色
							id: 1
						},
						{
							icon: 'icon-jinyongqingkuang', // icon名称
							iconText: '地图弹窗', // icon文案
							iconSize: 'f14', // icon大小
							textSize: 'f12', // 文案大小
							iconColor: '', // icon颜色
							textColor: '', // icon文案颜色
							id: 2
						},
						{
							icon: 'icon-jinyongqingkuang', // icon名称
							iconText: '选择组织', // icon文案
							iconSize: 'f14', // icon大小
							textSize: 'f12', // 文案大小
							iconColor: '', // icon颜色
							textColor: '', // icon文案颜色
							id: 3
						},
					],
					zhuyaoBtn: {
						text: '选择人员',
						color: 'white',
						bgcolor: '#1E87F0',
						fsize: 'f14',
					},
				},
				userInfo: {}, // 当前登录人信息
			};
		},
		mounted() {
			this.fileInfo = {
				jobTypeCode: "SP_SS_HID_RECORD_FIND",
				objId: "8A27048FFC18434EAE5C1727C28BCD51"
			};
			this.baseUrl = "";
			this.proxyUrl = "/apiUrl";
			this.proxyIp = "http://172.16.68.42:80";
			this.accessToken =
				"eyJhbGciOiJIUzUxMiJ9.eyJhY2NvdW50IjoiaHVhbmd4aXVob25nQGh6LmdkLmNzZy5jbiIsInVzZXJJZCI6IkJCNjIwQzJBRTk1RDQzMkU5RkM0N0NFQTM4REQ4ODE4IiwiZW1wbG95ZWVJZCI6IkY1MEE0MUJFQzRBRTRCNzk4RkI5MTU3RjlDOTdDNTY3IiwiZW1wbG95ZWVOYW1lIjoi6buE56eA57qiIiwib3JnSWQiOiI4YTE2ODI4YzYwYzBlMTZiMDE2MGRhNDQ3YWM5MDY4MiIsIm9yZ0NvZGUiOiIwMzEzMjg0MDAxMDIiLCJvcmdOYW1lIjoi6JCl6YWN57u85ZCI5LqM54-tIiwidGhpcmRTeXN0ZW1OYW1lIjoiSkFEUCIsInNhcEhyVXNlcklkIjoiOEU4RjRDNzkxOTFDQzA3MkUwNDMwQTk3NTAxM0MwNzIiLCJzYXBIck9yZ0lkIjoiZGJkNjQ5ZDI0MjZjNGU3NTgwZmEyYzIxZDRhMjM0NmYiLCJzeXN0ZW1OYW1lIjoibnVsbCIsInN1YiI6Ium7hOengOe6oiIsImlhdCI6MTYwNzkzOTA5NiwiZXhwIjoxNjA3OTQwODk2LCJyZWZyZXNoSW50ZXJ2YWwiOjMwLCJqdGkiOiJhOGZhNmZjOS1hZGJiLTQ5ZjUtODgzYi0zMDExMzFlZmNjYmYifQ.F-ShR0zVQEEtX0Q06MxjVqnlQJq-PhX1MaakZK3dLEs31ODa4oFZ6-J6cPvqN6pp8d-cnJEMMhpjbRnF_1uNwA";
			var _this = this;
			_this.$bus.$on("testAccectFun", function(data) {
				_this.testAccectFun(data);
			});

			_this.userInfo = {
				"employeeId": "A9C0B502210946C5BD52494CD5442492",
				"userId": "AEEEE802803749E1841C857240F0C3B5",
				"employeeName": "毛嘉杰",
				"account": "maojiajie",
				"shortSpell": "mjj",
				"fullSpell": "maojiajie",
				"state": 1,
				"jobStatus": 0,
				"employeeStatus": 0,
				"sortOrder": 0,
				"sex": 0,
				"createTime": 1586763073000,
				"marriage": 0,
				"orgId": "1589BAA87C11BD64E053380F0A0A54B2",
				"orgName": "广州天河供电局",
				"nameFullPath": "中国南方电网有限责任公司/广州供电局有限公司/广州天河供电局",
				"orgCode": "080020",
				"sapHROrgId": "8816B370FB4A0B82E0440018FE2DCEF4",
				"orgStructureId": "A",
				"unitOid": "1589BAA87C11BD64E053380F0A0A54B2",
				"unitOname": "广州天河供电局",
				"orgLevel": 3,
				"orgType": 5,
				"unitCode": "030120",
				"shortOrgName": "天河"
			}
		},
		methods: {
      openFlowView() {
        this.$router.push({name:'flowView',params:{processId: 'SP_WTICKET_SUB',processInsId: 'b6e89edaae0f4cbd89289f55030f0750_515'}})
      },
			menuClickTap(data){
				console.log('menuClickTap', JSON.stringify(data));
			},
			testAccectFun(data) {
				console.log('testAccectFun', JSON.stringify(data));
			},
			testOverlay(data) {
				this.unitPop = false;
				console.log('testOverlay',JSON.stringify(data));
			},
			testCliIconItemBtn(data){
				console.log('testCliIconItemBtn',JSON.stringify(data));
				if(data.id == 1){ //筛选弹窗
					this.popupState = true;
				}
				if(data.id == 2){// 地图弹窗
					this.mapPop = true;
				}
				if(data.id == 3){// 选择组织
					this.unitPop = true;
				}
			},
			testCliIconRBtn() {
				console.log('testCliIconRBtn');
				this.$router.push({
					name: 'checkPerson',
					query: {
						type: 1,
						userInfo: this.userInfo,
						exeMun: 'testemit'
					}
				});
			},
			testCheckTheme(data) {
				console.log('testCheckTheme', JSON.stringify(data));
			},
			testZdcBtnShow(data) {
				this.mapPop = false;
				console.log('testZdcBtnShow', JSON.stringify(data));
			},
			backHandle() {
				console.log('backHandle');
			},
			ClockHandle() {
				console.log('ClockHandle');
			},
			HomeHandle() {
				console.log('HomeHandle');
			},
			testInputTopBtn() {
				console.log('testInputTopBtn');
			},
			testChangeTab(data) {
				console.log('testChangeTab', JSON.stringify(data));
			},
			testChangeSortItem(data) {
				console.log('testChangeSortItem', JSON.stringify(data));
			},
			testSubmitScreen(data) {
				console.log('testSubmitScreen', JSON.stringify(data));
			},
			testResetScreen() {
				console.log('testResetScreen');
			},
		}
	};
</script>

<style>
</style>
