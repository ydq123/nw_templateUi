<template>
  <div id="demoPage" class="pt44">
    <!-- 页面头部组件 -->
    <nw-fixed-header title="台账-集合">
    </nw-fixed-header>
    <!-- 头部搜索组件 -->

    <!-- 台账组件 -->
    <div class="f24 fw mt20">
      变电
    </div>
    <div class="row fl-w al-c">
      <van-button class="mt10 ml10" type="primary" @click="openCheckSubstation(1)">选择变电站</van-button>
      <van-button class="mt10 ml10" type="primary" @click="openCheckSubstation(2)">选择变电-功能位置</van-button>
      <van-button class="mt10 ml10" type="primary" @click="openCheckSubstation(3)">选择变电-设备</van-button>
    </div>
  </div>
</template>

<script>
  import {
    NWtabMinxin
  } from "../mixin/NWtabMinxin.js";
  export default {
    name: "nw_bd_pd_sd",
    mixins: [NWtabMinxin],
    data() {
      return {};
    },
    destroyed() {},
    computed: {},
    mounted() {},
    methods: {
      /* 选择变电站*/
      openCheckSubstation: function(type) {
        /* 挂载跨页面通讯*/
        this.$tabOnPageFun('$nwTzDdFun',(res)=>{
          console.log(res);
        });
        this.$tabOpenWin('nw_bd_page', {
          type: type,//1变电站 2功能位置 3设备-必传
          bureauCode: '0800',//局编码，多选以逗号隔开-必传
          vindicateOid: '1589BAA87A27BD64E053380F0A0A54B2',//运维班组-非必传
          funName: '$nwTzDdFun',//跨页面通信函数名字-必传
        });
      },

    },
  };
</script>

<style></style>
