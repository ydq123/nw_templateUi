<template>
  <div id="demoPage" class="bg-f5" style="padding-top:75px;padding-bottom: 180px;">
    <!-- 页面头部组件 -->
    <!-- <nw-fixed-header title="头部导航" @threeClockHandle="ClockHandle">
      <div slot="page-bottom">
        <nw-top-input></nw-top-input>
      </div>
    </nw-fixed-header> -->


    <nw-top-input :isShowCancelBtn="false" placeholderText="搜素水水水水">
      <div slot="topInput"></div>
      <div slot="taskSreenSort"></div>
    </nw-top-input>
    <!-- 头部搜索组件 -->
    <div class="bg-white mt50 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">
        tab切换组件（带筛选、排序）
      </h2>
      <nw-module-top :isSort="true" :isTopTab="true" :isSreen="true" :sortDataList="testdatalist" :tabList="testObjTab" @changeSreen="topInputChangeSreen"
        @inputTopBtn="testInputTopBtn" @changeTab="testChangeTab" @changeSortItem="testChangeSortItem" @submitScreen="testSubmitScreen"
        @resetScreen="testResetScreen">
      </nw-module-top>
    </div>
    <!-- 台账组件 -->
    <div>
      <van-button type="primary" @click="$nwOpenWin('nw_bd_pd_sd')">台账demo</van-button>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">
        详情页顶部简介
      </h2>
      <nwtop-introduce></nwtop-introduce>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">
        多状态tab组件
      </h2>
      <nw-tab-widget></nw-tab-widget>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">
        动画加载中组件
      </h2>
      <nw-inside-loading />
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">
        无数据占位组件
      </h2>
      <!-- <nw-null-data class="bg-white mt20 pb20"></nw-null-data> -->
      <nw-null-data :nullText="'123'"></nw-null-data>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">
        附件上传组件
      </h2>
      <nw-uploader :fileInfo="fileInfo" :lookFileArr2="lookFileArr2" :baseUrl="baseUrl" :proxyUrl="proxyUrl" :proxyIp="proxyIp"
        :accessToken="accessToken"></nw-uploader>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">
        折叠框组件
      </h2>
      <nw-folding-box>
        <!-- <div slot="topRIconSlot"></div> -->
        <div slot="boxCenten">
          1121313123
        </div>
        <!-- <div slot="botIconSlot"></div> -->
      </nw-folding-box>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">
        状态标签组件
      </h2>
      <div class="p15">
        <nw-status-label></nw-status-label>
      </div>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">
        文本输入框组件
      </h2>
      <div class="">
        <div class="">
          <nw-textput-box :txtBoxObj="txtBoxObj1"></nw-textput-box>
        </div>
        <div class="">
          <nw-textput-box :txtBoxObj="txtBoxObj2"></nw-textput-box>
        </div>
        <div class="">
          <nw-textput-box :txtBoxObj="txtBoxObj3"></nw-textput-box>
        </div>
        <div class="">
          <nw-textput-box :txtBoxObj="txtBoxObj4"></nw-textput-box>
        </div>
      </div>
    </div>
    <!-- 地图筛选弹框组件 -->
    <nw-map-pop :isMapPop="mapPop" @checkTheme="testCheckTheme" @zdcBtnShow="testZdcBtnShow"></nw-map-pop>
    <!-- 选择组织--组件 -->
    <!-- <nw-unit-pop :popShow="unitPop" :popUserInfo="userInfo" @overlay="testOverlay"></nw-unit-pop> -->
    <!-- 右侧弹出筛选组件 -->
    <nw-PopupFilter ref="NWPopupFilter" v-model="popupState" @emitHandlePage="testPopEmitHand">
      <div slot="aaa">嘻嘻嘻嘻哈哈哈</div>
    </nw-PopupFilter>
    <!-- 悬浮球组件 -->
    <nw-float-menu :menuArr="menuArr" @menuClick="menuClickTap"></nw-float-menu>
    <!-- 底部按钮组件 -->
    <nw-bot-button @bottomClickHandle="bottomClickHandle" @botPopIconBtn="botPopIconBtn"></nw-bot-button>
  </div>
</template>

<script>
  import {
    NWtabMinxin
  } from "../mixin/NWtabMinxin.js";
  import axios from 'axios'
  export default {
    name: "nw_demoPage",
    mixins: [NWtabMinxin],
    data() {
      return {
        personalList: [],
        testPopDataObj: [{
            type: "type",
            name: "类型选择",
            node: true,
            // boxWidBfb: 3,
            isMultiple: false,
            list: [{
                name: "电压1",
                check: false
              },
              {
                name: "电压2",
                check: false
              },
              {
                name: "便电压3",
                check: false
              },
              {
                name: "便电压4",
                check: false
              },
              {
                name: "便电压电压",
                check: false
              },
              {
                name: "便电压4",
                check: false
              },
              {
                name: "便电压4",
                check: false
              }
            ]
          },
          {
            type: "type",
            name: "类型选择001",
            node: true,
            boxWidBfb: 3,
            isMultiple: false,
            list: [{
                name: "便电压1",
                check: false
              },
              {
                name: "便电压2",
                check: false
              },
              {
                name: "便电压3",
                check: false
              },
              {
                name: "便电压4",
                check: false
              },
              {
                name: "便电压电压",
                check: false
              },
              {
                name: "便电压4",
                check: false
              },
              {
                name: "便电压4",
                check: false
              }
            ]
          },
          {
            type: "time",
            name: "时间选择",
            node: true,
            list: [{
                name: "开始时间1",
                value: ""
              },
              {
                name: "结束时间",
                value: ""
              },
              {
                name: "竣工时间",
                value: ""
              }
            ]
          },
          {
            type: "goPage",
            name: "右箭头选择",
            node: true,
            list: [{
                name: "隐患类型1",
                value: ""
              },
              {
                name: "隐患类型2",
                value: ""
              },
              {
                name: "隐患类型3",
                value: ""
              }
            ]
          },
          {
            type: "custom",
            name: "自定义内容",
            node: true,
            customName: 'aaa'
          }
        ],
        testObjTab: [{
            title: "待办",
            nubStatus: false, //控制是否显示-顶部数标
            number: 0,
            sortList: [{
                text: "按日期降序待办",
                isSelect: false,
                sortType: "desc" //排序类型
              },
              {
                text: "按日期升序待办",
                isSelect: false,
                sortType: "asc" //排序类型
              }
            ]
          },
          {
            title: "已办",
            nubStatus: false, //控制是否显示-顶部数标
            number: 0,
            sortList: [{
                text: "按日期降序已办",
                isSelect: false,
                sortType: "desc" //排序类型
              },
              {
                text: "按日期升序已办",
                isSelect: false,
                sortType: "asc" //排序类型
              }
            ]
          }
        ],
        testdatalist: [
          // {
          // 	text: "按日期降序",
          // 	isSelect: false,
          // 	sortType: "desc", //排序类型
          // },
          // {
          // 	text: "按日期升序",
          // 	isSelect: false,
          // 	sortType: "asc", //排序类型
          // },
        ],
        txtBoxObj1: {
          showBox: 1, // 判断文本框类型 1左右布局；2上下布局；3上下布局（有输入内容长度）
          boxBs: true, // 判断是否显示标识
          titleTxt: "标题",
          searchValue: "",
          valueLength: 500,
          isDisabled: false, //禁止输入；默认为false可输入，true禁止输入
          placeholderTxt: "请输入", //输入框提示语
          iconCla: "icon-dingwei gray287 f15 pl5" //icon
        },
        txtBoxObj2: {
          showBox: 2, // 判断文本框类型 1左右布局；2上下布局；3上下布局（有输入内容长度）
          boxBs: true, // 判断是否显示标识
          titleTxt: "标题",
          searchValue: "",
          valueLength: 500,
          isDisabled: false, //禁止输入；默认为false可输入，true禁止输入
          placeholderTxt: "请输入", //输入框提示语
          iconCla: "" //icon
        },
        txtBoxObj3: {
          showBox: 3, // 判断文本框类型 1左右布局；2上下布局；3上下布局（有输入内容长度）
          boxBs: true, // 判断是否显示标识
          titleTxt: "标题",
          searchValue: "",
          valueLength: 500,
          isDisabled: false, //禁止输入；默认为false可输入，true禁止输入
          placeholderTxt: "请输入", //输入框提示语
          iconCla: "" //icon
        },
        txtBoxObj4: {
          showBox: 4, // 判断文本框类型 1左右布局；2上下布局；3上下布局（有输入内容长度）
          boxBs: true, // 判断是否显示标识
          titleTxt: "标题",
          searchValue: "",
          valueLength: 500,
          isDisabled: false, //禁止输入；默认为false可输入，true禁止输入
          placeholderTxt: "请输入", //输入框提示语
          iconCla: "", //icon
          boxValue: ""
        },
        popupState: false,
        unitPop: false,
        mapPop: false,
        baseUrl: "",
        proxyUrl: "",
        accessToken: "",
        proxyIp: "",
        lookFileArr2: [],
        fileInfo: {},
        dbZyBtn: {
          btnType: true
        },
        dbCyBtn: {
          btnType: true
        },
        dbTwoZCyBtn: {
          btnType: true,
          zhuyaoBtn: {
            text: "发送",
            color: "white",
            bgcolor: "#1E87F0",
            fsize: "f14"
          },
          ciyaoBtn: {
            text: "保存",
            color: "#262626",
            fsize: "f14"
          }
        },
        menuArr: [{
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
        userInfo: {} // 当前登录人信息
      };
    },
    destroyed() {},
    computed: {},
    mounted() {
   /*   axios({
        method: 'get',
        url: 'https://static-fb245091-fe4f-4887-a5d2-975ffd0fefee.bspapp.com/11.json',
        data: ''
      }).then((response) => { //这里使用了ES6的语法
       var retStr =this.$baseIsTypeof(response.data);
        console.log(retStr) //请求成功返回的数据
        console.log(response.data) //请求成功返回的数据
      }).catch((error) =>{
        console.log(error) //请求失败返回的数据
      }); */


    this.testsortlist = this.testsortlist1;
    // 复制到工程模板时候把这一段屏蔽掉
    window.NW_MODULE_TYPE = "nwTemplateUI";
    // 复制到工程模板时候把这一段屏蔽掉
    console.log(123456);
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


    _this.userInfo = {
      employeeId: "A9C0B502210946C5BD52494CD5442492",
      userId: "AEEEE802803749E1841C857240F0C3B5",
      employeeName: "毛嘉杰",
      account: "maojiajie",
      shortSpell: "mjj",
      fullSpell: "maojiajie",
      state: 1,
      jobStatus: 0,
      employeeStatus: 0,
      sortOrder: 0,
      sex: 0,
      createTime: 1586763073000,
      marriage: 0,
      orgId: "1589BAA87C11BD64E053380F0A0A54B2",
      orgName: "广州天河供电局",
      nameFullPath: "中国南方电网有限责任公司/广州供电局有限公司/广州天河供电局",
      orgCode: "080020",
      sapHROrgId: "8816B370FB4A0B82E0440018FE2DCEF4",
      orgStructureId: "A",
      unitOid: "1589BAA87C11BD64E053380F0A0A54B2",
      unitOname: "广州天河供电局",
      orgLevel: 3,
      orgType: 5,
      unitCode: "030120",
      shortOrgName: "天河"
    };
  },
  methods: {
    testPopEmitHand(data) {
      console.log("testPopEmitHand:", JSON.stringify(data));
      // 修改value值
      this.$refs.NWPopupFilter.setHandle(data.index1, data.index2, "11111");
    },
    testAcrossFun(data) {
      console.log("_this.$across.$on(testemit:", JSON.stringify(data));
    },
    menuClickTap(data) {
      console.log("menuClickTap", JSON.stringify(data));
    },
    testAccectFun(data) {
      console.log("testAccectFun", JSON.stringify(data));
    },
    testOverlay(data) {
      console.log("testOverlay", JSON.stringify(data));
    },
    botPopIconBtn(data) {
      if (data.id == 1) {
        // 单选人员
        this.$tabNwCheckPerson({
          type: 1, //1：单选； 2：多选； 注：多选需要传：personalList数组为当前页面的人员
          userInfo: this.userInfo,
          exeMun: "nwcheckPersonFun",
          personalList: [],
          zdyObj: {
            test: 1,
          }
        }, (data) => {
          console.log(data);
        });
      } else if (data.id == 2) {
        // 多选人员
        this.$tabNwCheckPerson({
          type: 2, //1：单选； 2：多选； 注：多选需要传：personalList数组为当前页面的人员
          userInfo: this.userInfo,
          exeMun: "nwcheckPersonFun",
          personalList: this.personalList || [], //数据复现数组
        }, (data) => {
          console.log(data);
          this.personalList = data.curNodeItemlist;
        });
      }
    },
    bottomClickHandle(data) {
      console.log("bottomClickHandle", data);
      if (data.id == 1) {
        this.$nwOpenWin("nw_flowView", {
          processId: "SP_WTICKET_SUB",
          processInsId: "b6e89edaae0f4cbd89289f55030f0750_515"
        });
      }
      if (data.id == 2) {
        // 台账地图
        this.$nwOpenWin("nw_tz_map", "123");
      }
      if (data.id == 3) {
        // 选择单位
        this.$tabNwCheckUnit({
          type: 2,//1：单选； 2：多选；
          userInfo: this.userInfo,
          exeMun: "nwCheckUnitFun",
		  zdyObj: {
		    test: 'unit',
		  }
        }, (data) => {
          console.log(data);
        });
      }
    },
    testCliIconRBtn() {
      console.log("testCliIconRBtn");
      // 多选人员
      this.$tabNwCheckPerson({
        type: 2, //1：单选； 2：多选； 注：多选需要传：personalList数组为当前页面的人员
        userInfo: this.userInfo,
        exeMun: "nwcheckPersonFun",
        personalList: [],
      }, (data) => {
        console.log(data);
      });
    },
    testCheckTheme(data) {
      console.log("testCheckTheme", JSON.stringify(data));
    },
    testZdcBtnShow(data) {
      this.mapPop = false;
      console.log("testZdcBtnShow", JSON.stringify(data));
    },
    backHandle() {
      console.log("backHandle");
    },
    ClockHandle() {
      console.log("ClockHandle");
    },
    HomeHandle() {
      console.log("HomeHandle");
    },
    testInputTopBtn() {
      console.log("testInputTopBtn");
    },
    testChangeTab(data) {
      console.log("testChangeTab", JSON.stringify(data));
    },
    testChangeSortItem(data) {
      console.log("testChangeSortItem", JSON.stringify(data));
    },
    testSubmitScreen(data) {
      console.log("testSubmitScreen", JSON.stringify(data));
    },
    testResetScreen() {
      console.log("testResetScreen");
    },
    topInputChangeSreen() {
      console.log("topInputChangeSreen");
      //筛选弹窗
      this.popupState = true;
    }
  }
  };
</script>

<style></style>
