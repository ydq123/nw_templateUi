<template>
  <div class="ledger_query pt138 ">
    <nw-fixed-header title="科学城站新庄110KV">
      <div slot="right" class="gray287 f14" @click="$nwOpenWin('nw_bd_equipment')">变电站</div>
      <!-- borderButtomE8 -->
      <div slot="page-bottom" class="bg-f5 ">
        <van-search style="width: 100%" v-model="searchValue" placeholder="间隔名称" />
        <div class="pr15 pl15 pt10 pb10 bg-white row ju-b ">
          <div class="row al-c">
            <div class="mr10 pr10 pl10 pt5 pb5 vLev" :class="[vLevIndex==index?'bg-287 text-white':'bg-f5 gray6']"
              v-for="(itme,index) in vLevList">{{itme.name}}</div>
          </div>
        </div>
      </div>
    </nw-fixed-header>
    <div class="list-content pt10">
      <div class="row f16">
        <div class="list-left" style="width: 40%;">
          <div class="pr15 pl15 pt10 pb10 row" :class="[rightIndex==index?'bg-white gray287 listLeft fw':'']" v-for="(itme,index) in 6">
            110kv第{{index}}窜备
          </div>
        </div>
        <div class="list-right bg-white gray3" style="width: 60%;">
          <div class="pr15 pl15 pt10 pb10 rightIndex row" v-for="(itme,index) in 6">
            <div class="border_1_dc p5 vLev row" style="width: 80%;">
              <div class="listRightRed"></div>
              <span class="pl5">110kv第{{index}}窜备</span>
            </div>
            <div class="checkbox pl15 flex">
              <van-checkbox></van-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="showPopup" round position="bottom" :style="{ height: '60%' }">
      <div class="title line-t pb10 pt10 verticle-center ju-b pl15 pr15 f15">
        <span>共7条记录</span>
        <span class="row al-c "><van-icon name="delete" class="text-red f20 mr5"  /> 清空</span>
      </div>
      <div class="list-data f15">
        <div class="flex ju-b pl15 pr15 pt10 pb10 verticle-center borderTopE8" v-for="item in 5">
          <div class=" p5  row" style="width: 80%;">
            <div class="listRightRed"></div>
            <span class="pl5">110kv第{{item}}窜备</span>
          </div>
          <div class="pl15"><i class="iconfont icon-shanchu text-red"></i></div>
        </div>
      </div>
    </van-popup>
    <div class="p10 bg-white flex boxs">
      <div class="btn btn-width-100 cybtn mr5 bg-f5 f14 gray3 border_1_dc" @click="showPopup = true">
        已选({{ checkNum }})
      </div>
      <div class="btn btn-width-100 ml5 f14 bg-287 text-white">确定</div>
    </div>
  </div>
</template>

<script>
  import {
    NWtabMinxin
  } from "../mixin/NWtabMinxin.js";
  export default {
    name: "nw_functionalLocation",
    mixins: [NWtabMinxin],
    data() {
      return {
        vLevIndex: 0,
        vLevList: [{
          name: '110KV'
        }, {
          name: '220KV'
        }],

        leftIndex: 0,
        rightIndex: 0,


        showPopup: false,
        checkNum: 0,
        curTabIndex: 0,
        searchValue: "",
        tab_options: {
          offsetTop: "2.6rem",
          color: "#1e87f0",
          titleActiveColor: "#1e87f0"
        },
      };
    },
    mounted() {
      // this.getData();
    },
    methods: {
      //获取列表数据
      getData() {
        console.log("变电站请求");
        // let param = {
        //   queryCondition: {
        //     bureauCode: "0800"
        //   },
        //   pageIndex: this.tabList[this.curTabIndex].pageIndex,
        //   sortFieldName: "id",
        //   isAsc: this.tabList[this.curTabIndex].isAsc
        // };
        // getSubstationList(param)
        //   .then(res => {
        //     if (res.code == 200) {
        //       this.onRefreshEnd();
        //       this.onLoadSuccessEnd(res, 0);
        //     } else {
        //       this.onLoadFailEnd(res);
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     this.$textHid();
        //   });
      },
      // 列表排序
      sort() {
        console.log("列表排序");
      },
      changePage(index) {
        this.curTabIndex = index;
      },
      onLoad() {
        console.log("上啦加载ing");
        // 加载状态开启
        this.loading = true;
      },
      // 加载失败业务逻辑
      onLoadFailEnd(error) {
        this.onRefreshEnd();
        this.$toast(error.msg);
        this.finished = true;
        if (this.loading) {
          this.loading = false;
        }
      },
      // 加载成功业务逻辑
      onLoadSuccessEnd(result, index) {
        if (this.loading) {
          this.loading = false;
          this.pageIndex++;
          for (let item of result.rows) {
            this.list.push(item);
          }
        } else {
          for (let item of result.rows) {
            this.list.push(item);
          }
        }
        // 数据全部加载完成
        if (this.list.length >= result.total) {
          this.finished = true;
        }
      },
      onRefresh() {
        console.log("下拉刷新ing");
        this.refreshing = true;
      },
      // 下拉刷新加载完成后修改状态
      onRefreshEnd() {
        if (this.refreshing) {
          this.refreshing = false;
        }
      },
      openVideoList() {
        this.$tabWxOpenWin("ledgerVideoList");
      },
      checkItem(value) {
        value.checked = !value.checked;
      },
      // 打开关闭筛选框
      filters() {
        this.showRight = !this.showRight;
      },
      // 重置
      resetScreen() {},
      // 确定
      submitScreen() {}
    }
  };
</script>

<style scoped lang="less">
  .ledger_query {
    height: 100%;

    .vLev {
      border-radius: 4px;
    }

    .listLeft {
      border-left: solid #287DF5 2px;
    }

    .listRightRed {
      height: 20px;
      width: 3px;
      background-color: red;
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
