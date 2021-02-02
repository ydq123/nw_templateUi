<template>
  <div class="ledger_query pt44">
    <nw-fixed-header :title="tabPageData.title">
      <div slot="right"></div>
      <div slot="page-bottom" class="bg-f5">
        <div class="adress gray3 pt15 f14 text-left pl15">
          功能位置：<span class="gray287">广州市黄埔区云升科学园</span>
        </div>
        <div class="row  al-c ">
          <van-search @search="searchFun" style="width: 100%" v-model="searchValue" placeholder="间隔名称" />
          <van-icon name="scan" @click="sysFun" class="f22 mr10 gray287" />
        </div>
        <div class="task-top-filtrate bg-white row ju-b">
          <div class="task-top-txt">
            <span class="ml15 f14">共 {{totalPage}} 条记录</span>
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
          <div class="list mt10">
            <!-- <div class="bg-white pl50 pt10 gray9">离我最近 647米</div> -->
            <!-- 设备ID				id
						设备名称			deviceName
						运行状态			assetState
						设备型号			deviceModel
						生产厂家			manufacturer
						运维班组名称		vindicateOname
						投运日期			plantTransferDate -->
            <div class="task-list borderButtomE8" m="click" :key="index" v-for="(itme, index) in eqList">
              <div class="row p15">
                <div class=" pr15 al-c row ">
                  <van-checkbox v-model="itme.checked" @change="checkFun"></van-checkbox>
                </div>
                <div class="row al-c" @click.stop="$nwOpenWin('nw_bd_functionalLocation')">
                  <div class=" divImg mr10">
                    <!-- <img src="../assets/images/mapImg/mapType2.png" /> -->
                  </div>
                  <div class="content-right ">
                    <div class=" f16  clamp1">{{itme.baseInfoData.deviceName}}</div>
                    <div class=" f14 pt5 clamp1 jrh">
                      {{itme.baseInfoData.manufacturer}}{{itme.baseInfoData.deviceModel?'-'+itme.baseInfoData.deviceModel:''}}
                    </div>
                    <div class="f14 pt5 clamp1">{{$baseTimeFormat("-", ":", false, itme.baseInfoData.plantTransferDate)}}</div>
                    <nw-status-label class="" :bqStaLabel="[	{
										staCal: '',
										staLabTxt: itme.baseInfoData.assetState,
										status: 1,
										fsize:'f10',
										},{
										staCal: 'borc-l-1e8 border',
										staLabTxt:  itme.baseInfoData.vindicateOname,
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
        <nw-null-data class="mt100 " v-if="eqList.length==0"></nw-null-data>
      </van-pull-refresh>
      <van-popup v-model="showPopup" round position="bottom" :style="{ height: '60%' }">
        <div class="title line-t pb10 pt10 verticle-center ju-b pl15 pr15 f15">
          <span>共 {{ chenckArr.length}} 条记录</span>
          <span class="row al-c " @click="dltArrFun">
            <van-icon name="delete" class="text-red f20 mr5" /> 清空</span>
        </div>
        <div class="list-data f16">
          <div class="row al-c ju-b pl15  pr15 pt10 pb10 verticle-center borderTopE8" v-for="(item,index) in  chenckArr">
            <div class="row al-c ">
              <div class="bg-red text-white pr5 pl5 eqType mr5">{{item.baseInfoData.deviceModel}}</div>
              <div class="list-name">{{item.baseInfoData.deviceName}}</div>
            </div>
            <div class="pl15" @click="dltItmeFun(item.baseInfoData.id,index)"><i class="iconfont icon-shanchu text-red"></i></div>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="p10 bg-white flex boxs">
      <div class="btn btn-width-100 cybtn mr5 bg-f5 f14 gray3 border_1_dc" @click="showPopup = true">
        已选({{ chenckArr.length }})
      </div>
      <div class="btn btn-width-100 ml5 f14 bg-287 text-white" @click="submitScreen">确定</div>
    </div>
    <!-- 侧面弹框 -->
    <van-popup @close="closePOP" v-model="showRight" position="right" style="width: 70%; height: 100%">
      <div class="layer-item layer-theme">
        <div class="f14">
          <div class="bg-f5 pr20 pl20 pb10 pt20">设备类型</div>
          <div class="row al-c fl-w ml20">
            <div @click="switchFun(item, index)" class="pt10 pb10 pr10 pl10 mr10 mt10" style="border-radius: 6px;"
              :class="[!item.status?'bg-f5':'bg-287 text-white']" v-for="(item, index) in eqTypeArr" :key="index">
              <span>{{ item.classifyName	 }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {
    queryDeviceList,
    groupByDeviceOnClassify
  } from "../moduleAPI/nw_tz";
  import {
    NWtabMinxin
  } from "../mixin/NWtabMinxin.js";
  export default {
    name: "nw_bd_equipment",
    mixins: [NWtabMinxin],
    data() {
      return {
        showRight: false,
        eqTypeStatus: false,
        eqTypeArr: [], //辖区内的设备类型
        showPopup: false,
        searchValue: "",
        refreshing: false, //下拉刷新
        loading: false, //加载中状态
        finished: false, //没有更多数据了
        myLoading: false,
        pageIndex: 1, //当前页数
        eqList: [],
        hasChecked: false,
        totalPage: 0,
        chenckArr: [],
      };
    },
    mounted() {
      this.pageIndex = 1;
      this.groupByDeviceOnClassifyFun();
      this.getData();
    },
    methods: {
      /* 扫一扫事件 */
      sysFun: function() {
        console.log("扫一扫事件");
        let param = {
          "queryCondition": {
            "bureauCode": this.tabPageData.bureauCode, //局编码，多选以逗号隔开-必传
            scanerId: "08000000895945", //	设备ID	-用在扫一扫按钮的
          },
          "powerGridFlag": "1", //主网标识
        };
        this.$textLoading('查找中..');
        queryDeviceList(param).then((ret) => {
          // console.log(ret)
          this.$textHid();
          if (ret) {
            if (ret.code == 200) {
              var retBoolean = this.$baseIsArray(ret.rows);
              if (retBoolean) {
                this.totalPage = ret.total;
                ret.rows.forEach((itme, index) => {
                  itme['checked'] = true;
                  itme['itmeType'] = 'sys';
                });
                console.log(ret)
              }
            } else {
              this.$textCatch(err.msg || '服务异常');
            }
          }
        }).catch((err) => {
          console.log(err);
          this.$textHid();
          this.$textCatch(err.msg || '服务异常');

        });

      },
      switchFun: function(data, index1) {
        console.log('开关事件');
        data.status = !data.status;
        if (index1 == 0) {
          this.eqTypeArr.forEach((itme) => {
            itme.status = data.status
          })
        }
        var arr = this.eqTypeArr.filter((item, index2) => item.status == true && item.classifyName != '全部');
        if (arr.length == 0) {
          this.eqTypeArr[0].status = false;
        } else if (arr.length == (this.eqTypeArr.length - 1)) {
          this.eqTypeArr[0].status = true;
        }
        this.eqTypeStatus = true;
      },
      closePOP: function() {
        console.log('遮罩事件');
        if (this.eqTypeStatus) {
          this.initFun();
        }
        this.eqTypeStatus = false;
      },
      initFun: function() {
        this.finished = false; //是否加载完
        this.myLoading = false; //关闭加载中
        this.loading = false;
        this.eqList = [];
        this.pageIndex = 1;
        this.getData();
      },
      /* 搜索事件 */
      searchFun: function() {
        console.log('搜索事件');
        this.initFun();
      },
      /* 获取筛选条件字符串 */
      classifyIdFun: function() {
        var classifyIdS = '';
        var arrTrue = this.eqTypeArr.filter(function(itme) {
          return itme.status == true
        });
        arrTrue.forEach((itme, index) => {
          classifyIdS = itme.classifyId ? classifyIdS + itme.classifyId : '';
          if ((index + 1) != arrTrue.length) {
            classifyIdS = classifyIdS ? classifyIdS + ',' : '';
          }
        });
        console.log(classifyIdS);
        return classifyIdS
      },
      /* 根据设备类型分组设备 */
      groupByDeviceOnClassifyFun: function() {
        var param = {
          "queryCondition": {
            "bureauCode": this.tabPageData.bureauCode, //局编码，多选以逗号隔开-必传
            objectId: this.tabPageData.intervalId, //间隔Id
          },
          "powerGridFlag": "1", //主网标识
        }
        console.log(param)
        groupByDeviceOnClassify(param).then((ret) => {
          console.log('根据设备类型分组设备');
          console.log(ret)
          if (ret) {
            if (ret.code == 200) {
              var retBoolean = this.$baseIsArray(ret.data);
              if (retBoolean) {
                ret.data.forEach((itme, index) => {
                  itme['status'] = true;
                });
                this.eqTypeArr = [{
                  classifyName: '全部',
                  IDclassifyId: '',
                  status: true
                }];
                this.eqTypeArr.push.apply(this.eqTypeArr, ret.data);
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
        console.log("设备请求");
        let param = {
          "queryCondition": {
            "bureauCode": this.tabPageData.bureauCode, //局编码，多选以逗号隔开-必传
            deviceName: this.searchValue, //设备名称搜索关键字
            objectId: this.tabPageData.intervalId, //间隔Id
            classifyId: this.classifyIdFun(), //设备类型ID(多选)
          },
          pageIndex: this.pageIndex,
          pageSize: 10,
          "powerGridFlag": "1", //主网标识
        };
        console.log(this.pageIndex)
        this.$textLoading();
        queryDeviceList(param).then((ret) => {
          console.log(ret)
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
                this.eqList.push.apply(this.eqList, ret.rows);
                this.totalPage = ret.total;
                if (ret.total == 0) {
                  /* 暂无数据 */
                  this.$textCatch('暂无数据');
                } else {
                  if (ret.total > this.eqList.length) {
                    this.pageIndex++;
                  } else {
                    /* 加载完毕 */
                    this.finished = true;
                  }
                }
                console.log(this.eqList)
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
        this.chenckArr = this.eqList.filter(item => item.checked == true);
      },
      /* 删除某一个*/
      dltItmeFun: function(id, index) {
        this.eqList.forEach((itme, index) => {
          if (itme.baseInfoData.id == id) {
            itme.checked = false;
          }
        });
        this.chenckArr = this.eqList.filter(item => item.checked == true);
      },
      /* 清空所有*/
      dltArrFun: function() {
        this.eqList.forEach((itme, index) => {
          itme.checked = false;
        });
        this.chenckArr = this.eqList.filter(item => item.checked == true);
      },
      // 确定
      submitScreen() {
        this.$tabEmitPageFun(this.tabPageData.funName, {
          data: this.chenckArr,
          type: this.tabPageData.type,
          pagename: 'nw_bd_equipment'
        });
        this.$nwBack(-3);
      },

    }
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
