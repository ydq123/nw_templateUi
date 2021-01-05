<template>
  <!-- 地图功能 -->
  <div class="mdp-map-box bg-f5 pt44"  style="height: 100%;">
	  <nw-fixed-header title="台账地图">
	  </nw-fixed-header>
    <mo-map
      ref="gisMap"
      v-if="true"
      :mapid="mapID"
      :loaded.sync="mapLoaded"
      @get-point-list="getPointList"
      @on-map-click-layer="onMapClickLayerFun"
    ></mo-map>
   <!-- 侧弹框按钮 -->
   <div @click="changePopup" class="myMap-ctkButtomD"></div>
   <div
     @click="checkDw" class="myMap-ctkButtom"
     :class="{'bgStatus': isShowELine}"
   ></div>
   <nw-rigth-map-popup ref="rigthMapPopup" @changeThemeStyle="changeThemeStyle">
   	<template v-slot:boxContent>
   		1111111111111111
   	</template>
   </nw-rigth-map-popup>
    <div v-if="isLoadComponent" class="mgis-app-main">
      <mo-control
        v-if="controlFlag"
        v-bind="controlConfigs"
        @click-control-item="eventClickControl"
      ></mo-control>
      <!-- 图层 -->
      <mo-layer-control
        v-show="controlFlagLayer"
        :map-object="_mapObject"
        :show-flag.sync="controlFlagLayer"
      ></mo-layer-control>
      <mgis-pick-point
        v-if="showPickPoint"
        :show-header="false"
        prefix-icon="mgis-icon-btn_dw"
        button-text="选中"
        :point-list="pointList"
        @click-point="selectPoint"
        @click-point-button="selectPoint"
      ></mgis-pick-point>
      <mo-device-card
        ref="deviceCard"
        v-if="cStatus === 'psr_simple_card'"
        :deviceType="deviceType"
        :cardInfo="simpleInfo"
        :map-object="_mapObject"
        @close-Card="closeCard"
        @get-footer-Click-Event="getFooterClickEvent"
      />
      <mo-svg-graph
        ref="svgGraph"
        v-if="cStatus.indexOf('psr_wiring') != -1"
        :psrStatus="cStatus"
        :map-object="_mapObject"
        :svgName="svgName"
        :devid="devid"
        :svgConfig="svgConfig"
        @get-footer-Click-Event="getFooterClickEvent"
        @return-event="goback"
      ></mo-svg-graph>
      <mo-poi
        :map-object="_mapObject"
        :poi-config="poiConfig"
        @click-simple-poi="clickSimple"
        @goto-route="gotoRoute"
      ></mo-poi>
    </div>
    <nw-tableList ref="slide" :layout="layout" @animateEnd1="animateEnd2" :table-list="tabList" @changeTab="changeTab1"
     :tab-list-num="[tabList[0].number,tabList[1].number]">
    	<template v-slot:listDetail>
    		<div class="main-warp borderTopE8">
    			123
    		</div>
    	</template>
    </nw-tableList>

  </div>
</template>
<script>
import { NWtabMinxin } from "../mixin/NWtabMinxin.js";
import { NWmapMinxin } from "../mixin/NWmapMinxin.js";
export default {
  name: "nw_tz_map",
  components: {},
  mixins: [NWtabMinxin, NWmapMinxin],
  data() {
    return {
      layout: ["44px", "60%"],
      tabListIndex: 0,
      tabList: [{
      		title: "待办",
      		number: 0,
      		pageNo: 1,
      		pageSize: 10,
      		arr: [],
      		isGetDataOver: false,
      		loading: false, // 是否处于加载状态
      		finished: false, // 是否加载完毕
      		refreshing: false, // 是否处于下拉刷新状态
      		scrollY: 0,
      	},
      	{
      		title: "已办",
      		number: 0,
      		pageNo: 1,
      		pageSize: 10,
      		arr: [],
      		isGetDataOver: false,
      		loading: false, // 是否处于加载状态
      		finished: false, // 是否加载完毕
      		refreshing: false, // 是否处于下拉刷新状态
      		scrollY: 0,
      	},
      ],
      _markerMgr: "",
      showPickPoint: false,
      pointList: [],
      controlFlag: true,
			_mapRef:'',
    };
  },
  mounted() {},
  methods: {
    changeTab1:function(obj){
        
    },
    animateEnd2:function(obj){
      console.log(obj)
    },
	  /* 地图初始化完成后会直接调用这个函数 */
	  getInitData: function () {},
    changeActiveItem(item) {
      this.mapRef.psrmap.clearHighlight();
      if (item.info && item.info.deviceType === "device") {
        this.mapRef.psrmap.highlightClick(item.info);
      }
    },
    selectPoint(item) {
      // 获取按钮
      this.mapRef.psrmap.clearHighlight();
      if (item.info && item.info.deviceType === "device") {
        this.mapRef.psrmap.highlightClick(item.info);
      }
      this.showPickPoint = false;
      this.deviceType = item.info.deviceType;
      this.simpleInfo = item.info;
      this.simpleInfoBaf = item.info;
      this.forward("psr_simple_card");
    },
    closeCard() {
      this.goback();
    },
    clickTopoAnalysis(data) {
      const resultMenu = this.mapRef.psrmap
        .getContextmenu(data.deviceData, "geomap")
        .filter((res) => res.name === data.name)[0];
      resultMenu.callback(resultMenu.psrfeature, (res) => {
        this.topologyData = res;
        if (res && res.psr_data_list) {
          this.forward("psr_topology");
        }
      });
    },
    getFooterClickEvent(witch, result) {
      switch (witch) {
        case "singleLineDiagram":
          this.svgName = witch;
          this.devid = result.id;
          this.forward("psr_wiring_diagram");
          break;
        case "stationMap":
          this.svgName = witch;
          this.devid = result.id;
          this.forward("psr_wiring_diagram");
          break;
      }
    },
    // 卡片滑动结束
    scrollEndFun(data) {
      if (!data && this.openPsrDetail) {
        this.goback();
        this.openPsrDetail = false;
        this.forward("psr_topology");
      }
    },
    gotoRoute(points) {
		console.log(123)
      this.lbsCommon.searchPoint = points;
      this.forward("route_routing");
    },
	/* 搜索框点击事件 */
    clickSimple(poi, func) {
      // 自定义弹窗卡片方法
      this.deviceType = "poi";
      this.simpleInfo = poi;
      this.forward("psr_simple_card");
      this.$emit("click-simple-poi", poi);
    },

    /* 右边弹框触发事件 */
    changePopup: function () {
      // this.showRight = true;
      this.$refs.rigthMapPopup.changePopup();
    },
    // 点击地图地址返回函数
  onMapClickLayerFun(clickFeatures) {
    this.showPickPoint = false
    if (this.cStatus !== 'psr_topology') {
      this.goback('poi_index')
      // this.goback()
    }
    if (clickFeatures && clickFeatures.length === 0) { return }
    if (clickFeatures.poi.length + clickFeatures.psr.length > 1) {
      const psrAndPoi = []
      if (clickFeatures.poi.length > 0) {
        for (let i = 0; i < clickFeatures.poi.length; i++) {
          const insertPoi = {
            id: clickFeatures.poi[i].ID,
            name: clickFeatures.poi[i].name_all,
            deviceType: 'poi'
          }
          const newPoi = {}
          Object.assign(newPoi, insertPoi, clickFeatures.poi[i])
          psrAndPoi.push(newPoi)
        }
      }
      if (clickFeatures.psr.length > 0) {
        for (let i = 0; i < clickFeatures.psr.length; i++) {
          const insertPsr = {
            deviceType: 'device'
          }
          const newPsr = {}
          Object.assign(newPsr, insertPsr, clickFeatures.psr[i])
          psrAndPoi.push(newPsr)
        }
      }
      this.getPointList(psrAndPoi)
    } else if (clickFeatures.poi.length + clickFeatures.psr.length === 1) {
      if (clickFeatures.poi.length === 1) {
        const properties = clickFeatures.poi[0]
        // const properties = clickFeature[0] && clickFeature[0].properties ? clickFeature[0].properties : {}
        this.deviceType = 'poi'
        properties.id = properties.ID
        this.simpleInfo = properties
        this.forward('psr_simple_card')
      } else {
        clickFeatures.psr[0].deviceType = 'device'
        this.selectPoint({ info: clickFeatures.psr[0] })
      }
    }
  },
    getPointList(e) {
      this.goback();
      if (e && e.length > 1) {
        this.showPickPoint = true;
        this.pointList = e;
      } else {
        this.selectPoint({ info: e[0] });
      }
    },
  },
};
</script>
<style scoped lang='less'>
</style>
