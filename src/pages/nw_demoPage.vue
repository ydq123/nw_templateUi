<template>
  <div id="demoPage" class="bg-f5" style="padding-top:75px;padding-bottom: 180px;">
    <!-- 页面头部组件 -->
    <nw-fixed-header title="头部导航" @threeClockHandle="ClockHandle">
      <div slot="page-bottom">
        <nw-top-input :listNub="18" @changeSreen="topInputChangeSreen">
          <div slot="topInput"></div>
          <!-- <div slot="taskSreenSort"></div> -->
        </nw-top-input>
      </div>
    </nw-fixed-header>
    <!-- 头部搜索组件 -->
    <div class="bg-white mt50 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">tab切换组件（带筛选、排序）</h2>
      <nw-module-top :isSort="true" :isSreen="true" @changeSreen="topInputChangeSreen" @inputTopBtn="testInputTopBtn"
        @changeTab="testChangeTab" @changeSortItem="testChangeSortItem" @submitScreen="testSubmitScreen" @resetScreen="testResetScreen">
      </nw-module-top>
    </div>
    <!-- 台账组件 -->
    <div>
      <van-button type="primary" @click="$nwOpenWin('nw_bd_checkSubstation')">选择变电站</van-button>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">详情页顶部简介</h2>
      <nwtop-introduce></nwtop-introduce>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">多状态tab组件</h2>
      <nw-tab-widget></nw-tab-widget>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">动画加载中组件</h2>
      <nw-inside-loading />
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">无数据占位组件</h2>
      <!-- <nw-null-data class="bg-white mt20 pb20"></nw-null-data> -->
      <nw-null-data :nullText="'123'"></nw-null-data>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">附件上传组件</h2>
      <nw-uploader :fileInfo="fileInfo" :lookFileArr2="lookFileArr2" :baseUrl="baseUrl" :proxyUrl="proxyUrl" :proxyIp="proxyIp"
        :accessToken="accessToken"></nw-uploader>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">折叠框组件</h2>
      <nw-folding-box>
        <!-- <div slot="topRIconSlot"></div> -->
        <div slot="boxCenten">
          1121313123
        </div>
        <!-- <div slot="botIconSlot"></div> -->
      </nw-folding-box>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">状态标签组件</h2>
      <div class="p15">
        <nw-status-label></nw-status-label>
      </div>
    </div>
    <div class="bg-white mt20 pb20">
      <h2 class="pt15 pb10 borderButtomE8 grayfa6470 f16 text-center">文本输入框组件</h2>
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
    <nw-PopupFilter v-model="popupState"></nw-PopupFilter>
    <!-- 悬浮球组件 -->
    <nw-float-menu :menuArr="menuArr" @menuClick="menuClickTap"></nw-float-menu>
    <!-- 底部按钮组件 -->
    <nw-bot-button :zyBtn="dbZyBtn" :cyBtn="dbCyBtn" :twoZCyBtn="dbTwoZCyBtn" :zIconBtn="botbtnobj" @cliIconRBtn="testCliIconRBtn"
      @cliIconItemBtn="testCliIconItemBtn"></nw-bot-button>
  </div>
</template>

<script>
  import {
    NWtabMinxin
  } from "../mixin/NWtabMinxin.js";
  export default {
    name: "nw_demoPage",
    mixins: [NWtabMinxin],
    data() {
      return {
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
          boxValue: ''
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
          btnType: false
        },
        dbCyBtn: {
          btnType: false
        },
        dbTwoZCyBtn: {
          btnType: true,
          zhuyaoBtn: {
            text: '发送',
            color: 'white',
            bgcolor: '#1E87F0',
            fsize: 'f14'
          },
          ciyaoBtn: {
            text: '保存',
            color: '#262626',
            fsize: 'f14'
          },
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
        botbtnobj: {
          // icon按钮配置项
          btnType: true,
          iconList: [{
              icon: "icon-jinyongqingkuang", // icon名称
              iconText: "流程页面", // icon文案
              iconSize: "f14", // icon大小
              textSize: "f12", // 文案大小
              iconColor: "", // icon颜色
              textColor: "", // icon文案颜色
              id: 1
            },
            {
              icon: "icon-jinyongqingkuang", // icon名称
              iconText: "台账地图", // icon文案
              iconSize: "f14", // icon大小
              textSize: "f12", // 文案大小
              iconColor: "", // icon颜色
              textColor: "", // icon文案颜色
              id: 2
            },
            {
              icon: "icon-jinyongqingkuang", // icon名称
              iconText: "选择单位", // icon文案
              iconSize: "f14", // icon大小
              textSize: "f12", // 文案大小
              iconColor: "", // icon颜色
              textColor: "", // icon文案颜色
              id: 3
            }
          ],
          zhuyaoBtn: {
            text: "选择人员",
            color: "white",
            bgcolor: "#1E87F0",
            fsize: "f14"
          }
        },
        userInfo: {} // 当前登录人信息
      };
    },
    destroyed() {
      if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
        this.$across.$off("testemitunit");
      } else if (window.NW_MODULE_TYPE == 'nwTemplateUI') {
        this.$bus.$off("testemitunit");
      }
    },
    mounted() {
      // 复制到工程模板时候把这一段屏蔽掉
      window.NW_MODULE_TYPE = 'nwTemplateUI';
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
      /* 判断当前使用的是生产与移动的工程模板-跨页面通讯-就做特殊处理*/
      if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
        _this.$across.$on("testemitunit", function(data) {
          _this.testAcrossFun(data);
        });
      } else if (window.NW_MODULE_TYPE == 'nwTemplateUI') {
        _this.$bus.$on("testemitunit", function(data) {
          _this.testAcrossFun(data);
        });
      }
    },
    methods: {
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
      testCliIconItemBtn(data) {
        console.log("testCliIconItemBtn", JSON.stringify(data));
        if (data.id == 1) {
          // this.$router.push({
          // 	name: "flowView",
          // 	params: {
          // 		processId: "SP_WTICKET_SUB",
          // 		processInsId: "b6e89edaae0f4cbd89289f55030f0750_515"
          // 	}
          // });
          this.$nwOpenWin('nw_flowView', {
            processId: "SP_WTICKET_SUB",
            processInsId: "b6e89edaae0f4cbd89289f55030f0750_515"
          });
        }
        if (data.id == 2) {
          // 台账地图
          this.$nwOpenWin('nw_tz_map', '123');
        }
        if (data.id == 3) {
          // 选择单位
          // this.unitPop = true;
          this.$nwOpenWin('nw_checkUnit', {
            type: 1,
            userInfo: this.userInfo,
            exeMun: "testemitunit",
            isPage: true
          });
        }
      },
      testCliIconRBtn() {
        console.log("testCliIconRBtn");
        // this.$router.push({
        // 	name: "nw_checkPerson",
        // 	params: {
        // 		type: 1,
        // 		userInfo: this.userInfo,
        // 		exeMun: "testemitunit",
        // 		isPage: false
        // 	}
        // });
        this.$nwOpenWin('nw_checkPerson', {
          type: 1,
          userInfo: this.userInfo,
          exeMun: "testemitunit",
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
      },
    }
  };
</script>

<style></style>
