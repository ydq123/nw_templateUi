<template>
  <div id="app">
    <nw-button size="large">large</nw-button>
   	<!-- <nw-button @click="show3 = true" size="large">large</nw-button> -->
		<!-- <nw-modal @on-ok="show3 = false" @on-cancel="show3 = false" :width="300" :isShow="show3"></nw-modal> -->
    <!-- <nw-module-top :isSort="true" :isSreen="true" :mTop="0" :sortDataList="ListPx" :sreenDataObj="objSx" :tabList="testTabList" @inputTopBtn="testInputTopBtn" @changeTab="testChangeTab" @changeSortItem="testChangeSortItem" @submitScreen="testSubmitScreen" @resetScreen="testResetScreen"></nw-module-top>  -->
    <nw-uploader :fileInfo="fileInfo" :lookFileArr2="lookFileArr2" :baseUrl="baseUrl" :proxyUrl="proxyUrl" :accessToken="accessToken"></nw-uploader>
  </div>
</template>

<script>
// import Button from '@/components/Button/Button'
// import Modal from '@/components/Modal/Modal'
import vConsole from "vconsole";
export default {
  name: "app",
  // components: {
  //   ywButton: Button,
  //   ywModal: Modal,
  // },
  data() {
    return {
			baseUrl: "",
			proxyUrl: "",
			accessToken: "",
			lookFileArr2: [],
      fileInfo: {},
      msg: "Welcome to nw-template-ui",
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      size: "",
      vConsole: null,
      testTabList: [{
					title: "123",
					number: 11,
				},
				{
					title: "456",
					number: 88,
				}],
				ListPx:[
					{
						text: "按日期降序",
						isSelect: false,
						sortType: "desc", //排序类型
					},
					{
						text: "按日期降序",
						isSelect: false,
						sortType: "desc", //排序类型
					},
					{
						text: "按日期降序",
						isSelect: false,
						sortType: "desc", //排序类型
					},
					{
						text: "按日期降序",
						isSelect: false,
						sortType: "desc", //排序类型
					},
				],
				objSx:{
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
						{
							itemTitle: '待办等级',
							isArrSta: 'todoDj',// 返回判断数组数据标识
							sreenList:[
								{
									id: "",
									text: "0",
									isSelect: false
								},
								{
									id: "",
									text: "1",
									isSelect: false
								},
								{
									id: "",
									text: "2",
									isSelect: false
								},
								{
									id: "",
									text: "3",
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
						{
							itemTitle: '已办等级',
							isArrSta: 'doneDj',// 返回判断数组数据标识
							sreenList:[
								{
									id: "",
									text: "0",
									isSelect: false
								},
								{
									id: "",
									text: "1",
									isSelect: false
								},
								{
									id: "",
									text: "2",
									isSelect: false
								},
								{
									id: "",
									text: "3",
									isSelect: false
								},
							]
						},
					],
				}
    };
  },
  mounted() {
		this.vConsole = new vConsole();
		this.fileInfo = {
			jobTypeCode: "SP_SS_HID_RECORD_FIND",
			objId: "8A27048FFC18434EAE5C1727C28BCD51"
		};
		this.baseUrl = '';
		this.proxyUrl = '/apiUrl';
		this.accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJhY2NvdW50IjoiaHVhbmd4aXVob25nQGh6LmdkLmNzZy5jbiIsInVzZXJJZCI6IkJCNjIwQzJBRTk1RDQzMkU5RkM0N0NFQTM4REQ4ODE4IiwiZW1wbG95ZWVJZCI6IkY1MEE0MUJFQzRBRTRCNzk4RkI5MTU3RjlDOTdDNTY3IiwiZW1wbG95ZWVOYW1lIjoi6buE56eA57qiIiwib3JnSWQiOiI4YTE2ODI4YzYwYzBlMTZiMDE2MGRhNDQ3YWM5MDY4MiIsIm9yZ0NvZGUiOiIwMzEzMjg0MDAxMDIiLCJvcmdOYW1lIjoi6JCl6YWN57u85ZCI5LqM54-tIiwidGhpcmRTeXN0ZW1OYW1lIjoiSkFEUCIsInNhcEhyVXNlcklkIjoiOEU4RjRDNzkxOTFDQzA3MkUwNDMwQTk3NTAxM0MwNzIiLCJzYXBIck9yZ0lkIjoiZGJkNjQ5ZDI0MjZjNGU3NTgwZmEyYzIxZDRhMjM0NmYiLCJzeXN0ZW1OYW1lIjoibnVsbCIsInN1YiI6Ium7hOengOe6oiIsImlhdCI6MTYwNzMwOTA5MSwiZXhwIjoxNjA3MzEwODkxLCJyZWZyZXNoSW50ZXJ2YWwiOjMwLCJqdGkiOiJlMWI5MzU3OS05ODYwLTRlNTctODEwYi0xNzEwZGJlNWI5ZDQiLCJ0VXNlckNvZGUiOiJkd2dscHQiLCJ0QWNjVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlKOS5leUowVlhObGNrTnZaR1VpT2lKa2QyZHNjSFFpTENKbGVIQWlPakUyTURjek5qVTRNREFzSW1semN5STZJbXBoWkhCTWIyZHBiaUo5Ll9WVjZfREx3aVVBZ1NWZTZTSEFhUHJKdEpTRVMzbGZQUGhsNm9IRDN3NUEifQ.4srJS7Pz3g6IRPTffOlVKoPEeMCVrSOzR5a2F68rNpnB0NhLIh8C5VOS1jXP7Vaf-4oC2DgG3GmoVPsD0o10Cg';
  },
  methods: {
    showSize(item) {
      this.size = item;
      this.show4 = true;
    },
    // moduletop模块头部搜索按钮
			testInputTopBtn(){
				console.log('moduletop模块头部搜索按钮');
			},
			// moduletop模块tab切换
			testChangeTab(data){
				console.log('moduletop模块tab切换：',data);
			},
			// moduletop模块排序
			testChangeSortItem(data){
				console.log('moduletop模块排序：',data);
			},
			// moduletop模块筛选确定
			testSubmitScreen(data){
				console.log('moduletop模块筛选确定：',data);
			},
			// moduletop模块筛选重置
			testResetScreen(){
				console.log('moduletop模块筛选重置');
			},
  }
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding-bottom: 200px;
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.pt48,
.py48 {
  padding-top: 48px;
}

.pb48,
py48 {
  padding-bottom: 48px;
}

.underline {
  border-bottom: 1px solid #ccc;
}
</style>
