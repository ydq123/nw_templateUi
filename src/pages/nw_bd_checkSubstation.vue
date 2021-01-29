<template>
  <div class="ledger_query pt44">
    <nw-fixed-header class="bg-f5" title="选择变电站">
      <div slot="right"></div>
      <div slot="page-bottom">
        <div class="adress gray3 pt15 f14 text-left pl15">
          我的位置：<span class="gray287">广州市黄埔区云升科学园</span>
        </div>
        <van-search @search="searchFun" v-model="searchValue" placeholder="变电站名称" />
        <div class="task-top-filtrate bg-white">
          <div class="task-top-txt">
            <span class="ml15 f14">共 {{totalPage}} 条记录</span>
          </div>
          <div class="filtrate-btn" @click="hasCheckedFun">
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
        <van-list :immediate-check="false" v-model="loading" :offset="30" :finished="finished" finished-text="没有更多了"
          @load="onLoad">
          <!-- mt10 -->
          <div class="list ">
            <!-- <div class="bg-white pl50 pt10 gray9">离我最近 647米</div> -->

            <!-- 变电站ID			id
							变电站名称			flName
							变电站的全路径		fullPath
							投运日期			plantTransferDate
							值守方式			dutyType
							运行状态			runningState
							主接线方式			connectionMode
							变电站类型			subType -->
            <div class="task-list borderButtomE8" m="click" :key="index" v-for="(itme, index) in bdList">
              <div class="row p15">
                <van-checkbox class=" pr15 " v-if="tabPageData.type==1" @change="checkFun" v-model="itme.checked"></van-checkbox>
                <div class=" row al-c " @click.stop="openFunctionalLocation(itme, index)">
                  <div class=" divImg mr10">
                    <!-- <img src="../assets/images/mapImg/mapType2.png" /> -->
                  </div>
                  <div class="content-right">
                    <div class=" f16  clamp1 jrh">{{itme.flName}}</div>
                    <div class=" f14  clamp1 jrh">
                      {{itme.fullPath}}
                    </div>
                    <div class="f14  clamp1 jrh">{{$baseTimeFormat("-", ":", false, itme.plantTransferDate)}}</div>
                    <nw-status-label class="" :bqStaLabel="[	{
										staCal: '',
										staLabTxt: itme.runningState,
										status: 1,
										fsize:'f10',
										},{
										staCal: 'borc-l-1e8 border',
										staLabTxt:  itme.connectionMode,
										status: 0,
										staBorCol: '#1E87F0',
										fsize:'f10',
										},{
										staCal: 'borc-l-1e8 border',
										staLabTxt:  itme.dutyType,
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
        <nw-null-data class="mt100" v-if="bdList.length==0"></nw-null-data>
      </van-pull-refresh>
      <van-popup v-model="showPopup" round position="bottom" :style="{ height: '60%' }">
        <div class="title line-t pb10 pt10  verticle-center ju-b pl15 pr15 f15" @click="dltArrFun">
          <span>共 {{this.chenckArr.length}} 条记录</span>
          <span class="row al-c ">
            <van-icon name="delete" class="text-red f20 mr5" /> 清空</span>
        </div>
        <div class="list-data f15">
          <div class="flex ju-b pl15 pr15 pt10 pb10 verticle-center borderTopE8" v-for="(item,index) in chenckArr">
            <div class="list-name">{{item.flName}}</div>
            <div class="pl15" @click="dltItmeFun(item.id,index)"><i class="iconfont icon-shanchu text-red"></i></div>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="p10 bg-white flex boxs">
      <div class="btn btn-width-100 cybtn mr5 bg-f5 f14 gray3 border_1_dc" @click="showPopup = true">
        已选({{ this.chenckArr.length }})
      </div>
      <div @click="submitScreen" class="btn btn-width-100 ml5 f14 bg-287 text-white">确定</div>
    </div>
    <!-- 侧面弹框 -->
    <van-popup @close="closePOP" v-model="showRight" position="right" style="width: 70%; height: 100%">
      <div class="layer-item layer-theme">
        <div class="f14">
          <div class="bg-f5 pr20 pl20 pb10 pt20">电压等级</div>
          <div class="row al-c ju-b pr20 pl20 mt20" v-for="(item, index) in hasChecked?vLevArr1:vLevArr2" :key="index">
            <div class="row al-c">
              <div class="hidden-deng hidden-deng-yellow"></div>
              <span class="ml5">{{ item.voltagePageShow }}</span>
            </div>
            <van-switch @change="switchFun" :class="[item.status ? 'bg-287' : 'bg-f5']" v-model="item.status" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {
    querySubstationList,
    querySubstationGroupByVoltage
  } from "../moduleAPI/nw_tz";
  import {
    NWtabMinxin
  } from "../mixin/NWtabMinxin.js";
  export default {
    name: "nw_bd_checkSubstation",
    mixins: [NWtabMinxin],
    data() {
      return {
        showRight: false,
        vLevStatus: false,
        vLevArr1: [], //辖区内的电压等级
        vLevArr2: [], //所有的电压等级
        showPopup: false,
        checkNum: 0,
        searchValue: "",
        refreshing: false, //下拉刷新
        loading: false, //加载中状态
        finished: false, //没有更多数据了
        myLoading: false,
        pageIndex: 1, //当前页数
        bdList: [],
        hasChecked: true,
        totalPage: 0,
        chenckArr: [],
      };
    },
    created() {
      console.log('created');
    },
    beforeRouteEnter(to, from, next) {
      console.log(from.name )
    	next(vm => {
    		/* 前进刷新后退不刷新*/
    		if (from.name != "nw_bd_functionalLocation"&&from.name != "nw_bd_equipment") {
    			vm.showRight=false;
    			vm.vLevStatus=false;
    			vm.vLevArr1=[]; //辖区内的电压等级
    			vm.vLevArr2=[]; //所有的电压等级
    			vm.showPopup=false;
    			vm.checkNum=0;
    			vm.searchValue="";
    			vm.refreshing=false; //下拉刷新
    			vm.loading=false; //加载中状态
    			vm.finished=false; //没有更多数据了
    			vm.myLoading=false;
    			vm.pageIndex=1; //当前页数
    			vm.bdList=[];
    			vm.hasChecked=true;
    			vm.totalPage=0;
    			vm.chenckArr=[];
    			vm.tabPageData = vm.$tabPageData();
    			console.log(vm.tabPageData);
    			vm.hasChecked = vm.tabPageData.vindicateOid ? true : false;
    			vm.pageIndex = 1;
    			vm.querySubstationGroupByVoltageFun();
    			vm.getData();
    		}
    	});
    },
    mounted() {

    },
    methods: {
      switchFun: function() {
        console.log('开关事件');
        this.vLevStatus = true;
      },
      closePOP: function() {
        console.log('遮罩事件');
        if (this.vLevStatus) {
          this.initFun();
        }
        this.vLevStatus = false;
      },
      initFun: function() {
        this.finished = false; //是否加载完
        this.myLoading = false; //关闭加载中
        this.loading = false;
        this.bdList = [];
        this.pageIndex = 1;
        this.getData();
      },
      /* 搜索事件 */
      searchFun: function() {
        console.log('搜索事件');
        this.initFun();
      },
      /* 切换是否是管辖内事件 */
      hasCheckedFun: function() {
        console.log('切换是否是管辖内事件');
        setTimeout(() => {
          this.initFun();
          this.querySubstationGroupByVoltageFun();
        }, 100);
      },
      openFunctionalLocation: function(itme, index) {
        if (this.tabPageData.type == 1) return
        this.$nwOpenWin('nw_bd_functionalLocation', {
          title:itme.flName,
          type: this.tabPageData.type, //类型
          bureauCode: this.tabPageData.bureauCode, //局编码
          SubstationID: itme.id, //变电站id
          funName: this.tabPageData.funName ,//跨页面通信函数名字-必传
          vindicateOid: this.tabPageData.vindicateOid ,//运维班组-非必传
        });
      },
      baseVoltageIdFun: function() {
        var baseVoltageIdS = '';
        var arr = this.hasChecked ? this.vLevArr1 : this.vLevArr2;
        var arrTrue = arr.filter(function(itme) {
          return itme.status == true
        });
        arrTrue.forEach((itme, index) => {
          baseVoltageIdS = baseVoltageIdS + itme.baseVoltageId;
          if ((index + 1) != arrTrue.length) {
            baseVoltageIdS = baseVoltageIdS + ',';
          }
        });
        console.log(baseVoltageIdS);
        return baseVoltageIdS
      },
      /* 查询电压等级 */
      querySubstationGroupByVoltageFun: function() {
        if (this.hasChecked && this.vLevArr1.length > 0) {
          return
        } else if ((!this.hasChecked) && this.vLevArr2.length > 0) {
          return
        }
        var param = {
          "queryCondition": {
            "bureauCode": this.tabPageData.bureauCode, //局编码，多选以逗号隔开-必传
            "vindicateOid": this.hasChecked ? this.tabPageData.vindicateOid : '', // 运维班组ID,单选,
          }
        }
        console.log(param)
        querySubstationGroupByVoltage(param).then((ret) => {
          console.log('查询电压等级');
          console.log(ret)
          if (ret) {
            if (ret.code == 200) {
              var retBoolean = this.$baseIsArray(ret.data);
              if (retBoolean) {
                ret.data.forEach((itme, index) => {
                  itme['status'] = true;
                });
                if (this.hasChecked) {
                  this.vLevArr1 = ret.data || [];
                } else {
                  this.vLevArr2 = ret.data || [];
                }
              }
            } else {
              this.$textCatch(err.msg || '服务异常');
            }
          }
        }).catch((err) => {
          console.log(err);
          this.$textHid();
          this.$textCatch(err.msg || '服务异常');

        })
      },
      //获取列表数据
      getData() {
        if (this.myLoading) return
        this.myLoading = true;
        if (this.finished) return;
        console.log("变电站请求");
        let param = {
          "queryCondition": {
            "flName": this.searchValue, //变电站名称，单选，模糊查询
            "vindicateOid": this.hasChecked ? this.tabPageData.vindicateOid : '', // 运维班组ID,单选,
            "baseVoltageId": this.baseVoltageIdFun(), // 电压等级id，多选以逗号隔开
          },
          pageIndex: this.pageIndex,
          pageSize: 5,
        };
        console.log(this.pageIndex)
        this.$textLoading();
        querySubstationList(param).then((ret) => {
          // console.log(ret)
          this.$textHid();
          this.myLoading = false; //关闭加载中
          this.loading = false;
          this.refreshing = false; //停止下拉刷新
          if (ret) {
            if (ret.code == 200) {
              var retBoolean = this.$baseIsArray(ret.rows);
              if (retBoolean) {
                this.totalPage = ret.total;
                ret.rows.forEach((itme, index) => {
                  itme['checked'] = false;
                });
                this.bdList.push.apply(this.bdList, ret.rows);
                this.totalPage = ret.total;
                if (ret.total == 0) {
                  /* 暂无数据 */
                  this.$textCatch('暂无数据');
                } else {
                  if (ret.total > this.bdList.length) {
                    this.pageIndex++;
                  } else {
                    /* 加载完毕 */
                    this.finished = true;
                  }
                }
                console.log(this.bdList)
              }
            } else {
              this.$textCatch(err.msg || '服务异常');
            }
          }
        }).catch((err) => {
          console.log(err);
          this.myLoading = false; //关闭加载中
          this.loading = false;
          this.refreshing = false; //停止下拉刷新
          this.$textHid();
          this.$textCatch(err.msg || '服务异常');

        });
      },
      onLoad() {
        console.log("上啦加载ing");
        console.log(this.loading);
        if (this.refreshing) {
          this.loading = false;
          return
        };
        this.getData();
      },
      onRefresh() {
        console.log("下拉刷新ing");
        this.refreshing = true;
        this.initFun();
      },
      // 打开关闭筛选框
      filters() {
        this.showRight = !this.showRight;
      },
      /* 选择事件*/
      checkFun: function(val) {
        this.chenckArr = this.bdList.filter(item => item.checked == true);
      },
      /* 删除某一个*/
      dltItmeFun: function(id, index) {
        this.bdList.forEach((itme, index) => {
          if (itme.id == id) {
            itme.checked = false;
          }
        });
        this.chenckArr = this.bdList.filter(item => item.checked == true);
      },
      /* 清空所有*/
      dltArrFun: function() {
        this.bdList.forEach((itme, index) => {
          itme.checked = false;
        });
        this.chenckArr = this.bdList.filter(item => item.checked == false);
      },
      // 确定
      submitScreen() {
        this.$tabEmitPageFun(this.tabPageData.funName, {
          data: this.chenckArr,
          type: this.tabPageData.type,
          pagename: 'nw_bd_checkSubstation'
        });
        this.$nwBack(-1);
      },
    },
    // //前进刷新后退不刷新-页面离开之前会执行
    // beforeRouteLeave(to, from, next) {
    //   if (to.name == 'nw_bd_functionalLocation' || to.name == "nw_bd_equipment") {
    //     from.meta.keepAlive = true; //缓存
    //   }
    //   next();
    // },
    // /* 进入页面*/
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     if (from.name == "nw_bd_functionalLocation" || from.name == "nw_bd_equipment") {
    //       to.meta.keepAlive = false; //不缓存
    //     }
    //   });
    // },
  };
</script>

<style scoped lang="less">
  @import '../assets/less/nw_tool.less';
  @import '../plugin/vant/index.css';
  @import '../plugin/vant/icon/local.css';
  .ledger_query {
    height: 100%;
    .jrh {
      line-height: 24px;
      // .pxToremLess(width,200px);
    }
    .content-right {
      width: 65%;
    }
    .divImg {
      .pxToremLess(width, 96px);
      .pxToremLess(height, 96px);
      background-image: url('~../assets/images/mapImg/mapType2.png');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 6px;

    }

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
          height: 100%;

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
