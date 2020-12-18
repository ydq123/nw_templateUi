<template>
  <div id="demoPage" style="padding-top:100px">
    <nw-fixed-header title="徐徐噶" @headBackeHandle="backHandle" @threeClockHandle="ClockHandle" @backHomeHandle="HomeHandle">
      <div slot="page-bottmo">
      </div>
    </nw-fixed-header>
    <nw-button size="large"><h1 @click="aa">sssss</h1></nw-button>
    <nw-module-top :isSort="true" :isSreen="true" :mTop="0" :sortDataList="ListPx" :sreenDataObj="objSx" :tabList="testTabList" @inputTopBtn="testInputTopBtn" @changeTab="testChangeTab" @changeSortItem="testChangeSortItem" @submitScreen="testSubmitScreen" @resetScreen="testResetScreen"></nw-module-top>
    <!-- <nw-test></nw-test> -->
    <hr style="margin-top:20px">
    <nw-uploader :fileInfo="fileInfo" :lookFileArr2="lookFileArr2" :baseUrl="baseUrl" :proxyUrl="proxyUrl" :proxyIp="proxyIp" :accessToken="accessToken"></nw-uploader>
    <hr style="margin-top:20px">
    <h1 class="mt20" @click="$router.push({name:'checkPerson',query:{type:1,userInfo:userInfo}})">测试打开新页面</h1>
    <hr style="margin-top:20px">
		<nw-unit-pop :popShow="unitPop" :popUserInfo="userInfo" @overlay="testOverlay"></nw-unit-pop>
    <!-- 悬浮球 -->
    <nw-float-menu :menuArr="menuArr" @menuClick="menuClickTap"></nw-float-menu>
    <!-- 动画加载中 -->
    <nw-inside-loading>
      <div slot="loadingImg">
        <van-icon name="shrink" />
      </div>
      <!-- <div slot="loadingText">
       <span>获取数据中...</span>
      </div> -->
    </nw-inside-loading>
    <!-- 暂无数据占位图 -->
    <nw-null-data>
			<div slot="nullImg"><img src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771978851,2906984932&fm=26&gp=0.jpg" alt="" /></div>
			<div slot="nullText">123</div>
		</nw-null-data>
    <nw-PopupFilter v-model="popupState"></nw-PopupFilter>
	<nw-folding-box>
		<!-- <div slot="topRIconSlot"></div> -->
		<div slot="boxCenten">
			<div>123123132</div>
			<div>123123132</div>
			<div>123123132</div>
			<div>123123132</div>
			<nw-textput-box></nw-textput-box>
			<nw-status-label></nw-status-label>
		</div>
		<!-- <div slot="botIconSlot"></div> -->
	</nw-folding-box>
  </div>
</template>

<script>
export default {
  name: "demoPage",
  data() {
    return {
      testval: '',
      popupState: false,
		  unitPop:false,
      baseUrl: "",
      proxyUrl: "",
      accessToken: "",
      proxyIp: "",
      lookFileArr2: [],
      fileInfo: {},
      msg: "Welcome to nw-template-ui",
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      size: "",
      vConsole: null,
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
      testTabList: [
        {
          title: "123",
          number: 11
        },
        {
          title: "456",
          number: 88
        }
      ],
      ListPx: [
        {
          text: "按日期降序",
          isSelect: false,
          sortType: "desc" //排序类型
        },
        {
          text: "按日期降序",
          isSelect: false,
          sortType: "desc" //排序类型
        },
        {
          text: "按日期降序",
          isSelect: false,
          sortType: "desc" //排序类型
        },
        {
          text: "按日期降序",
          isSelect: false,
          sortType: "desc" //排序类型
        }
      ],
      objSx: {
        showPop: false,
        qfDdx: true, // 区分单选和多选，默认true为多选，false为单选
        sreenTodoItem: [
          // 待办数组
          {
            itemTitle: "待办状态",
            isArrSta: "todoZt", // 返回判断数组数据标识
            sreenList: [
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
              }
            ]
          },
          {
            itemTitle: "待办等级",
            isArrSta: "todoDj", // 返回判断数组数据标识
            sreenList: [
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
              }
            ]
          }
        ],
        sreenDoneItem: [
          // 已办数组
          {
            itemTitle: "已办状态",
            isArrSta: "doneZt", // 返回判断数组数据标识
            sreenList: [
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
              }
            ]
          },
          {
            itemTitle: "已办等级",
            isArrSta: "doneDj", // 返回判断数组数据标识
            sreenList: [
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
              }
            ]
          }
        ]
      },
	  userInfo: {
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
	  	}, //当前登录人信息
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
  },
  methods: {
    backHandle() {
      console.log('头部返回');
    },
    ClockHandle() {
      console.log('右上角三点');
    },
    HomeHandle() {
      console.log('右上角圆点');
    },
    aa() {
      this.popupState = true;
      console.log(this.popupState);
    },
    menuClickTap: function(obj) {
      console.log(obj);
    },
	  testAccectFun(data){
		  console.log('跨页面',JSON.stringify(data));
	  },
	  testOverlay(data){
		  console.log("unitpop模块"+JSON.stringify(data));
		  this.unitPop = false;
	  },
    showSize(item) {
      this.size = item;
      this.show4 = true;
    },
    // moduletop模块头部搜索按钮
    testInputTopBtn() {
      console.log("moduletop模块头部搜索按钮");
	  this.unitPop = true;
    },
    // moduletop模块tab切换
    testChangeTab(data) {
      console.log("moduletop模块tab切换：", data);
    },
    // moduletop模块排序
    testChangeSortItem(data) {
      console.log("moduletop模块排序：", data);
    },
    // moduletop模块筛选确定
    testSubmitScreen(data) {
      console.log("moduletop模块筛选确定：", data);
    },
    // moduletop模块筛选重置
    testResetScreen() {
      console.log("moduletop模块筛选重置");
    }
  }
};
</script>

<style>
</style>
