<template>
  <div id="demoPage" style="padding-top:100px">
    <nw-button @click="show3 = true" size="large">large</nw-button>
    <nw-modal @on-ok="show3 = false" @on-cancel="show3 = false" :width="300" :isShow="show3"></nw-modal>
    <nw-module-top :isSort="true" :isSreen="true" :mTop="0" :sortDataList="ListPx" :sreenDataObj="objSx" :tabList="testTabList" @inputTopBtn="testInputTopBtn" @changeTab="testChangeTab" @changeSortItem="testChangeSortItem" @submitScreen="testSubmitScreen" @resetScreen="testResetScreen"></nw-module-top>
    <!-- <nw-test></nw-test> -->
    <hr style="margin-top:20px">
    <nw-uploader :fileInfo="fileInfo" :proxyIp="proxyIp"></nw-uploader>
    <hr style="margin-top:20px">
    <h1 class="mt20" @click="$router.push('checkPerson')">测试打开新页面</h1>
    <hr style="margin-top:20px">
  </div>
</template>

<script>
export default {
  name: "demoPage",
  data() {
    return {
      NW_BASEURL: "",
      NW_PROXYURL: "",
      proxyIp: "http://172.16.68.42:80",
      fileInfo: {},
      msg: "Welcome to nw-template-ui",
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      size: "",
      vConsole: null,
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
      }
    };
  },
  mounted() {
    this.fileInfo = {
      jobTypeCode: "SP_SS_HID_RECORD_FIND",
      objId: "8A27048FFC18434EAE5C1727C28BCD51"
    };
    // this.NW_BASEURL = "";
    // this.NW_PROXYURL = "";
    // this.proxyIp = ""; 
  },
  methods: {
    showSize(item) {
      this.size = item;
      this.show4 = true;
    },
    // moduletop模块头部搜索按钮
    testInputTopBtn() {
      console.log("moduletop模块头部搜索按钮");
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

<style></style>
