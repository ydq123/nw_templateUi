<template>
  <div>
    <div>
      <!-- 选择变电站-->
      <nw-bdCheckSubstation  @pageCallback="tabItmeCallback" v-show='showType==1' class="root-page" ref='tabItme1'></nw-bdCheckSubstation>
      <!-- 选择功能位置-->
      <nw-bdFunctionalLocation  @pageCallback="tabItmeCallback" v-show='showType==2' class="root-page" ref='tabItme2'></nw-bdFunctionalLocation>
      <!-- 选择设备-->
      <nw-bdEquipment :addressObj="addressObj"  @pageCallback="tabItmeCallback" v-show='showType==3' class="root-page" ref='tabItme3'></nw-bdEquipment>
    </div>
    <div class="p10 bg-white flex boxs">
      <div class="btn btn-width-100 cybtn mr5 bg-f5 f14 gray3 border_1_dc" @click="setShowPopup">
        已选({{ itmeArr.length }})
      </div>
      <div @click="submitScreen" class="btn btn-width-100 ml5 f14 bg-287 text-white">确定</div>
    </div>
    <!--变电站 已选弹框-->
    <van-popup v-model="showPopup1" round position="bottom" :style="{ height: '60%' }">
      <div class="title line-t pb10 pt10  verticle-center ju-b pl15 pr15 f15" @click="dltArrFun">
        <span>共 {{this.itmeArr.length}} 条记录</span>
        <span class="row al-c ">
          <van-icon name="delete" class="text-red f20 mr5" /> 清空</span>
      </div>
      <div class="list-data f15">
        <div class="flex ju-b pl15 pr15 pt10 pb10 verticle-center borderTopE8" v-for="(item,index) in itmeArr">
          <div class="list-name">{{item.flName}}</div>
          <div class="pl15" @click="dltItmeFun(item,index)"><i class="iconfont icon-shanchu text-red"></i></div>
        </div>
      </div>
    </van-popup>
    <!--选择功能位置-已选弹框 -->
    <van-popup v-model="showPopup2" round position="bottom" :style="{ height: '60%' }">
      <div class="title line-t pb10 pt10 verticle-center ju-b pl15 pr15 f15">
        <span>共{{itmeArr.length }}条记录</span>
        <span @click="dltArrFun" class="row al-c ">
          <van-icon name="delete" class="text-red f20 mr5" /> 清空</span>
      </div>
      <div class="list-data f15">
        <div class="flex ju-b pl15 pr15 pt10 pb10 verticle-center borderTopE8" v-for="(item,index3) in itmeArr">
          <div class=" p5  row" style="width: 80%;">
            <div class="listRightRed"></div>
            <span class="pl10">{{item.intervalName||'其他'}}</span>
          </div>
          <div class="pl15" @click="dltItmeFun(item,index3)"><i class="iconfont icon-shanchu text-red"></i></div>
        </div>
      </div>
    </van-popup>
    <!--选择设备-已选弹框 -->
    <van-popup v-model="showPopup3" round position="bottom" :style="{ height: '60%' }">
      <div class="title line-t pb10 pt10 verticle-center ju-b pl15 pr15 f15">
        <span>共 {{ itmeArr.length}} 条记录</span>
        <span class="row al-c " @click="dltArrFun">
          <van-icon name="delete" class="text-red f20 mr5" /> 清空</span>
      </div>
      <div class="list-data f15" v-if="itmeArr.length>0">
        <div class="row al-c ju-b pl15  pr15 pt10 pb10 verticle-center borderTopE8" v-for="(item,index) in  itmeArr">
          <div class="row al-c ">
            <div class="bg-red text-white pl5 pr5 pb5 pt7 eqType mr5">{{item.baseInfoData?item.baseInfoData.deviceModel:''}}</div>
            <div class="list-name">{{item.baseInfoData?item.baseInfoData.deviceName:''}}</div>
          </div>
          <div class="pl15" @click="dltItmeFun(item,index)"><i class="iconfont icon-shanchu text-red"></i></div>
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
    name: 'nw_bd_page',
    mixins: [NWtabMinxin],
    components: {},
    data() {
      return {
        showPopup1: false,
        showPopup2: false,
        showPopup3: false,
        itmeArr: [],
        showType: 1, //tab切换类型
        changeArr: [{
          title: '选择变电站',
          status: false,
          scrollY: 0,
        }, {
          title: '选择功能位置',
          status: false,
          scrollY: 0,
        }, {
          title: '选择设备',
          status: false,
          scrollY: 0,
        }], //记录子组件的生命周期的
        addressObj: {
          "latitude": '', //23.166323
          "longitude": '', //132.33
          "province": "", //广东省
          "city": "", //深圳市
          "district": "", //南山区
          "street": "", //侨香路
          "street_number": "", //4068号
          "address": "", //广东省深圳市福田区莲花路2075号
        },
        // addressObj: {
        //   "latitude": '23.166323', //23.166323
        //   "longitude": '113.450516', //132.33
        //   "province": "广东省", //广东省
        //   "city": "广州市", //深圳市
        //   "district": "天河区", //南山区
        //   "street": "华光路", //侨香路
        //   "street_number": "", //4068号
        //   "address": "广东省广州市天河区华光路", //广东省深圳市福田区莲花路2075号
        // },
      };
    },
    mounted() {
      console.log(this.tabPageData);
      this.$refs['tabItme' + this.showType].initPageFun(this.tabPageData); //拟生命周期函数
      this.newAddressFun();
    },
    methods: {
      tabItmeCallback: function(obj) {
        console.log(obj)
        switch (obj.funType) {
          case 'setCheckArr':
            this.itmeArr = obj.data || [];
            break;
          case 'openItme':
            this.changeArr[(this.showType - 1)].scrollY = this.$refs['tabItme' + this.showType].$el.scrollTop;
            checkArr: this.checkArr,
              obj.data['checkArr'] = this.itmeArr;
            this.changeTap(obj);
            break;
          case 'backItme':
            setTimeout(() => {
              this.$refs['tabItme' + obj.showType].$el.scrollTop = this.changeArr[obj.showType - 1].scrollY
            }, 60)
            this.showType = obj.showType;
            this.changeArr[obj.backType - 1].status = false;
            this.changeArr[obj.backType - 1].scrollY = 0;
            break;
          case 'newAddress':
            this.newAddressFun();
            break;
          case 'setAddress':
            break;
        }

      },
      newAddressFun: function() {
        console.log(888888);
        /* 是否开启测试*/
        if(this.tabPageData.isCs){
          this.addressObj= {
            "latitude": '23.166323', //23.166323
            "longitude": '113.450516', //132.33
            "province": "广东省", //广东省
            "city": "广州市", //深圳市
            "district": "天河区", //南山区
            "street": "华光路", //侨香路
            "street_number": "", //4068号
            "address": "广东省广州市天河区华光路", //广东省深圳市福田区莲花路2075号
          };
          this.$refs['tabItme'+ this.showType].queryNearestSubstationFun(this.addressObj); //获取离我最近
        }
        this.$sdkGetLocation((ret) => {
          console.log(ret)
          if (ret.status&&ret.json) {
            if(ret.json.latitude){
              this.addressObj = ret.json;
              console.log(this.addressObj)
              this.$refs['tabItme'+ this.showType].queryNearestSubstationFun(ret.json); //获取离我最近
            }
          }
        });
      },
      changeTap: function(obj) {
        if (this.showType != obj.showType) {
          this.showType = obj.showType;
          if (!this.changeArr[obj.showType - 1].status) {
            this.$refs['tabItme' + obj.showType].initPageFun(obj.data); //拟生命周期函数
            this.changeArr[obj.showType - 1].status = true;
          };
          this.$refs['tabItme' + obj.showType].showPageFun(obj.data); //拟生命周期函数
        };
      },
      setShowPopup: function() {
        switch (this.tabPageData.type) {
          case 1:
            this.showPopup1 = !this.showPopup1;
            break;
          case 2:
            this.showPopup2 = !this.showPopup2;
            break;
          case 3:
            this.showPopup3 = !this.showPopup3;
            break;
        }
      },
      /* 删除某一个*/
      dltItmeFun: function(data, index) {
        if (this.itmeArr.length == 0) return;
        this.$refs['tabItme' + this.tabPageData.type].dltItmeFun(data, index);
      },
      /* 清空所有*/
      dltArrFun: function() {
        if (this.itmeArr.length == 0) return;
        this.$refs['tabItme' + this.tabPageData.type].dltArrFun();
      },
      // 确定
      submitScreen: function() {
        this.$tabEmitPageFun(this.tabPageData.funName, {
          data: this.itmeArr,
          type: this.tabPageData.type,
          showType: this.showType,
        });
        this.$nwBack(-1);
      },
    },
    computed: {},
    //进入前
    beforeRouteEnter(to, from, next) {
      next(vm => {

      });
    },
    //离开前
    beforeRouteLeave(to, from, next) {
      next(true) //否则允许跳转
    },
  };
</script>
<style scoped lang='less'>
  .root-page {
    height: 96vh !important;
    overflow-y: scroll !important;
  }

  .boxs {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .btn {
    height: 44px;
    border-radius: 6px;
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

  .listRightRed {
    height: 80%;
    width: 3px;
    background-color: red;
    position: absolute;
    left: 15px;
    top: 3px;
  }
</style>
