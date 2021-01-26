<template>
  <div class="ledger_query pt44">
    <nw-fixed-header title="选择变电站">
      <div slot="right"></div>
      <div slot="page-bottom">
        <div class="adress gray3 pt15 f14 text-left pl15">
          我的位置：<span class="gray287">广州市黄埔区云升科学园</span>
        </div>
        <van-search v-model="searchValue" placeholder="变电站名称" />
        <div class="task-top-filtrate bg-white">
          <div class="task-top-txt">
            <span class="ml15 f14">共8条记录</span>
          </div>
          <div class="filtrate-btn" @click="sort">
            <van-checkbox v-model="hasChecked" icon-size="14px" shape="square" class="f14">管辖内</van-checkbox>
            <!-- <span class="f14 mr5">管辖内</span> -->
          </div>
          <div class="rank-btn-r" @click="filters">
            <span class="f14 mr5">筛选</span>
            <i class="iconfont icon-shaixuan1 gray6 f12"></i>
          </div>
        </div>
      </div>
    </nw-fixed-header>
    <div class="list-content borderTopE8 pt128">
      <van-pull-refresh class="pb65" v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list mt10">
            <div class="bg-white pl50 pt10 gray9">离我最近 647米</div>
            <div class="task-list borderButtomE8" m="click" @click="checkItem(value)" :key="index" v-for="(value, index) in list">
              <div class="row p15">
                <div class=" pr15 al-c row ">
                  <van-checkbox v-model="value.checked"></van-checkbox>
                </div>
                <div class="list row" @click.stop="openFunctionalLocation(value, index)">
                  <div class="content-left mr10">
                    <img src="../assets/images/mapImg/mapType2.png" />
                  </div>
                  <div class="content-right ">
                    <div class=" f16  clamp1">110kV章陂站</div>
                    <div class=" f14 pt5 clamp1">
                      广州供电局有限公司/变电设施/变电一所/220kV新塘巡维中心/110kV章陂站
                    </div>
                    <div class="f14 pt5 clamp1">2008-12-27</div>
                    <nw-status-label class="" :bqStaLabel="[	{
                    staCal: '',
                    staLabTxt: '待审核',
                    status: 1,
                    fsize:'f10',
                    },{
                    staCal: 'borc-l-1e8 border',
                    staLabTxt: '双母接线',
                    status: 0,
                    staBorCol: '#1E87F0',
                    fsize:'f10',
                    },{
                    staCal: 'borc-l-1e8 border',
                    staLabTxt: '无人值守',
                    status: 0,
                    staBorCol: '#1E87F0',
                    fsize:'f10',
                    }]"></nw-status-label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
      <van-popup v-model="showPopup" round position="bottom" :style="{ height: '60%' }">
        <div class="title line-t pb10 pt10  verticle-center ju-b pl15 pr15 f15">
          <span>共7条记录</span>
          <span class="row al-c "><van-icon name="delete" class="text-red f20 mr5"  /> 清空</span>
        </div>
        <div class="list-data f15">
          <div class="flex ju-b pl15 pr15 pt10 pb10 verticle-center borderTopE8" v-for="item in 5">
            <div class="list-name">科学城新城站-11010</div>
            <div class="pl15"><i class="iconfont icon-shanchu text-red"></i></div>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="p10 bg-white flex boxs">
      <div class="btn btn-width-100 cybtn mr5 bg-f5 f14 gray3 border_1_dc" @click="showPopup = true">
        已选({{ checkNum }})
      </div>
      <div class="btn btn-width-100 ml5 f14 bg-287 text-white">确定</div>
    </div>
    <!-- 侧面弹框 -->
    <van-popup v-model="showRight" position="right" style="width: 70%; height: 100%">
      <div class="layer-item layer-theme">
        <div class="f14">
          <div class="bg-f5 pr20 pl20 pb10 pt20">票种</div>
          <div class="row al-c ju-b pr20 pl20 mt20" v-for="(item, index) in vLevArr" :key="index">
            <div class="row al-c">
              <div class="hidden-deng hidden-deng-yellow"></div>
              <span class="ml5">{{ item.vLEV }}KV</span>
            </div>
            <van-switch :class="[item.status ? 'bg-287' : 'bg-f5']" v-model="item.status" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {
    NWtabMinxin
  } from "../mixin/NWtabMinxin.js";
  export default {
    name: "nw_bd_checkSubstation",
    mixins: [NWtabMinxin],
    data() {
      return {
        showRight: false,
        vLevArr: [{
          vLEV: 500,
          status: 0
        }, {
          vLEV: 220,
          status: 0
        }, {
          vLEV: 110,
          status: 0
        }, {
          vLEV: 35,
          status: 0
        }],
        showPopup: false,
        checkNum: 0,
        curTabIndex: 0,
        searchValue: "",
        tab_options: {
          offsetTop: "2.6rem",
          color: "#1e87f0",
          titleActiveColor: "#1e87f0"
        },
        filtrate_options: {
          offsetTop: "3.7rem",
          zIndex: 10
        },
        refreshing: false,
        loading: false,
        finished: true,
        pageIndex: 1, //当前页数
        list: [{
          checked: false
        }, {
          checked: false
        }, {
          checked: false
        }],
        hasChecked: false
      };
    },
    mounted() {

    },
    methods: {
      openFunctionalLocation:function(itme,index){
        /* 挂载跨页面通讯*/
        if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
        	this.$across.$on("nw_bd_checkSubstation", (obj)=>{
        	  console.log(obj)
        	});
        } else if (window.NW_MODULE_TYPE == 'nwTemplateUI') {
          this.$bus.$on("nw_bd_checkSubstation", (obj)=>{
            console.log(obj)
          });
        }
        this.$nwOpenWin('nw_bd_functionalLocation',{type:index+1,id:123,funName:'nw_bd_checkSubstation'});
      },
      //获取列表数据
      getData() {
        console.log("变电站请求");
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
  @import '../assets/less/nw_tool.less';

  .ledger_query {
    height: 100%;

    .task-top-filtrate {
      height: 40px;
      width: 100%;
      display: flex;

      .task-top-txt {
        display: flex;
        align-items: center;
        color: #8c8c8c;
        width: 205px;
      }

      .filtrate-btn,
      .rank-btn-m,
      .rank-btn-r {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #262626;
      }

      .filtrate-btn {
        width: 93px;

        i.icon-houtui {
          transform: rotate(-90deg);
        }

        i.icon-houtui2 {
          transform: rotate(90deg);
        }
      }

      .rank-btn-m {
        width: 125px;
      }

      .rank-btn-r {
        width: 75px;
      }
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

    .list-content {
      height: 100%;

      .list {
        height: 100%;

        .task-list {
          position: relative;
          background-color: #fff;

          .list {
            img {
              .pxToremLess(width, 96px);
              // .pxToremLess(height, 96px);
              height: 100%;
            }
          }

          .list-btn {
            width: 100%;
            height: 50px;
            border-top: 1px solid #e5e5e5;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;

            .btn-txt {
              margin-right: 15px;
              width: 62px;
              height: 29px;
              border-radius: 4px;
              border: solid 1px #7d7d7d;
              color: #000000;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
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
