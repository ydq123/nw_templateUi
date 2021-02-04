<template>
  <div class="ledger_query  " :class="[(!searchValue)&&dataArr.length>0?'pt138':'pt100']">
    <nw-fixed-header :title="pageData.title" :leftFun="true" @headBackeHandle='headBackeHandle2'>
      <!-- <div slot="right" class="gray287 f14" @click="$tabBack(-1)">变电站</div> -->

      <!-- borderButtomE8 -->
      <div slot="page-bottom" class="bg-f5 ">
        <van-search style="width: 100%" v-model="searchValue" placeholder="间隔名称" />
        <!-- <div class="pr15 pl15 pt10 pb10 bg-white row ju-b ">
          <div class="row al-c">
            <div class="mr10 mb10 pr10 pl10 pt5 pb5 vLev" :class="[vLevIndex==index?'bg-287 text-white':'bg-f5 gray6']"
              v-for="(itme,index) in vLevList">{{itme.intervalName}}</div>
          </div>
        </div> -->
        <nw-tab-widget v-if="(!searchValue)&&vLevList.length>0" :tabSXStatu="false" :tabWSXList='vLevList'
          @changeScrollXTab="changeScrollXTab2">
          <span slot="tabList"></span>
          <span slot="tabIconSX"></span>
        </nw-tab-widget>
      </div>
    </nw-fixed-header>
    <!-- 搜索 -->
    <label v-show="(searchValue)&&dataArr.length>0">
      <div v-show="searchArr.length>0" class="list-data f15  pb92">
        <div @click="rightFun(item,index3)" class="flex ju-b bg-white pl20 pr15 pt15 pb15  borderButtomE8" :key="index3+'a'"
          v-for="(item,index3) in searchArr">
          <div class=" pr15 f14 row">
            <div class="listRightRed2"></div>
            <span class="pl5">{{item.intervalName||'其他'}}</span>
          </div>
          <div class="pl15">
            <van-checkbox v-if="pageData.type==2" v-model="item.status"></van-checkbox>
          </div>
        </div>
      </div>
      <nw-null-data class="mt90" v-show="searchArr.length==0"></nw-null-data>
    </label>
    <!-- 列表 -->
    <label v-show="!searchValue">
      <div class="list-content pt20">
        <nw-null-data class="mt50" v-show="dataArr.length==0"></nw-null-data>
        <div class="row f16" v-show="dataArr.length>0">
          <div class="list-left" style="width: 40%;">
            <div @click="leftFun(itme,index)" class="pr15 pl15 pt10 pb10 row al-c f14" :class="[leftIndex==index?'bg-white gray287 listLeft fw':'']"
              v-for="(itme,index) in leftArr">
              {{itme.intervalName||'其他'}}
            </div>
          </div>
          <div class="list-right bg-white gray3 " style="width: 60%;">
            <div class="pb20">
              <div @click="rightFun(itme,index)" class="pr15 pl15 pt10  rightIndex row" v-for="(itme,index) in rightArr">
                <div class="border_1_dc pl5 pr5 pt7 pb5 vLev row al-c fl-w word f14" style="width: 100%;position: relative;">
                  <span class="listRightRed"></span>
                  <span class="pl10">{{itme.intervalName||'其他'}}</span>
                </div>
                <div class="checkbox pl15 flex">
                  <van-checkbox v-if="pageData.type==2" v-model="itme.status"></van-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
  import {
    NWtabMinxin
  } from "../../mixin/NWtabMinxin.js";
  import {
    querySubsIntervalById
  } from "../../moduleAPI/nw_tz.js";
  export default {
    name: "nw_functionalLocation",
    mixins: [NWtabMinxin],
    data() {
      return {
        searchValue: "",
        searchArr: [],

        vLevIndex: 0,
        vLevList: [],

        leftIndex: 0,
        leftArr: [],
        rightIndex: 0,
        rightArr: [],

        showPopup: false,
        checkArr: [],
        dataArr: [],
        itmeArr: [],
        pageData: {}
      };
    },
    mounted() {},
    methods: {
      initPageFun: function(data) {
        console.log(6666)
        console.log(data)
        this.pageData = data;
        this.checkArr = this.pageData.checkArr || [];
        this.searchValue = "";
        this.searchArr = [];
        this.vLevIndex = 0;
        this.vLevList = [];
        this.leftIndex = 0;
        this.leftArr = [];
        this.rightIndex = 0;
        this.rightArr = [];
        this.showPopup = false;
        this.dataArr = [];
        this.itmeArr = [];
        this.getData();
      },
      showPageFun: function() {

      },
      //获取功能位置
      getData: function() {
        this.$textLoading();
        let param = {
          id: this.pageData.SubstationID,
        };
        querySubsIntervalById(param)
          .then(res => {
            this.$textHid();
            console.log(res);
            if (res.code == 200) {
              if (res.data.length > 0) {
                this.initData(res.data || []);
              } else {
                /* 暂无数据*/
                this.$textCatch(res.msg || '暂无数据');
              }
            } else {
              /* 服务异常*/
              this.$textCatch(res.msg || '服务异常');
            }
          })
          .catch(error => {
            console.log(error);
            this.$textHid();
            this.$textCatch(error.msg || '')
          });
      },
      changeScrollXTab2: function(data) {
        console.log(data);
        this.vLevIndex = data.index;
        this.leftIndex = 0;
        this.leftArr = data.item[0].childrenIntervals;
        this.rightArr = data.item[0].childrenIntervals[0].childrenIntervals;
      },
      leftFun: function(itme, index) {
        console.log(itme)
        this.leftIndex = index;
        this.rightArr = itme.childrenIntervals;
      },
      rightFun: function(data, index) {
        console.log(data);
        if (this.pageData.type == 3) {
          this.$emit('pageCallback', {
            type: this.pageData.type,
            showType: 3,
            data: {
              title: data.intervalName,
              intervalId: data.intervalId, //功能位置id
              type: this.pageData.type, //类型
              bureauCode: this.pageData.bureauCode, //局编码
              SubstationID: this.pageData.SubstationID, //变电站id
              funName: this.pageData.funName, //跨页面通信函数名字-必传
              vindicateOid: this.pageData.vindicateOid, //运维班组-非必传
            },
            funType: 'openItme'
          });
        } else {
          setTimeout(() => {
            var obj = this.rightArr[index];
            this.$set(this.rightArr, index, obj);
            this.rightIndex = index;
            this.checkArr = this.rightArr.filter(item0 => item0.status == true);
            this.setCheckArr();
          }, 80);
        }
      },
      headBackeHandle2: function() {
        this.$emit('pageCallback', {
          type: this.pageData.type,
          showType: 1,
          backType: 2,
          data: {

          },
          funType: 'backItme'
        });
      },
      /* 删除某一个*/
      dltItmeFun: function(data, dataIndex) {
        this.rightArr.forEach((itme, index) => {
          if (itme.intervalId == data.intervalId) {
            itme.status = false;
            this.$set(this.rightArr, index, itme);
          }
        });

        this.checkArr = this.checkArr.filter(item0 => item0.intervalId != data.intervalId);
        this.setCheckArr();
      },
      /* 清空所有*/
      dltArrFun: function() {
        this.checkArr = [];
        this.initData('');
        this.setCheckArr();
      },
      setCheckArr: function(val) {
        this.$emit('pageCallback', {
          type: this.pageData.type,
          data: this.checkArr,
          funType: 'setCheckArr'
        });
      },
      /* 初始化数据 */
      initData: function(data) {
        this.itmeArr = [];
        this.vLevList = [];
        this.dataArr = data || this.dataArr;
        for (var i = 0; i < this.dataArr.length; i++) {
          var itme = this.dataArr[i];
          for (var j = 0; j < itme.childrenIntervals.length; j++) {
            var itme2 = itme.childrenIntervals[j];
            for (var k = 0; k < itme2.childrenIntervals.length; k++) {
              var itme3 = itme2.childrenIntervals[k];
              var newArr = this.checkArr.filter(item0 => item0.intervalId == itme3.intervalId) || [];
              if (newArr.length > 0) {
                itme3['status'] = true;
              } else {
                itme3['status'] = false;
              }
              this.itmeArr.push(itme3);
            }
          }
          itme['status'] = i == this.vLevIndex ? true : false;
          itme['title'] = itme.intervalName;
          this.vLevList.push(itme);
        };
        this.leftArr = this.vLevList[this.vLevIndex].childrenIntervals;
        this.rightArr = this.leftArr[this.leftIndex].childrenIntervals;
        this.$set(this, 'rightArr', this.rightArr);
      },
    },
    watch: {
      searchValue: function() {
        this.searchArr = this.itmeArr.filter(item0 => item0.intervalName.indexOf(this.searchValue) != -1);
      },
    },
    computed: {}
  };
</script>

<style scoped lang="less">
  @import '../../plugin/vant/index.css';
  @import '../../plugin/vant/icon/local.css';
  @import '../../assets/less/nw_tool.less';

  .ledger_query {
    height: 100%;

    .vLev {
      border-radius: 4px;
    }

    .list-right {
      // height: 66vh;
      // height: 437px;
      .pxToremLess(height, 550px);
      overflow-y: scroll !important;
      // padding-bottom: 20px;
    }

    .listLeft {
      border-left: solid #287DF5 2px;
    }

    .listRightRed {
      height: 80%;
      width: 3px;
      background-color: red;
      position: absolute;
      left: 6px;
      top: 3px;
    }

    .listRightRed2 {
      height: 76%;
      width: 3px;
      background-color: red;
      position: absolute;
      left: 15px;
      top: 6px;
    }

    .boxs {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
    }

    .btn {
      height: 44px;
      border-radius: 8px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      /*让文字不换行*/
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .van-search {
      background: #f5f5f5;

      .van-search__content {
        background-color: #fff;
      }
    }

    // rest vant ui
    /deep/ .van-tabs {
      height: 100%;

      .van-tabs__content {
        height: 100%;

        .van-tab__pane {
          height: 100%;

          .van-pull-refresh {
            height: 100%;
            overflow: scroll;
          }
        }
      }
    }
  }
</style>
