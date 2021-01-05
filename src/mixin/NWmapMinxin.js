/* gis地图按钮-混入 */
import {
	getLayerConfig
} from "../components/mapComponents/mapComMethod/themeConfig";
import './mapOverallVue.js'
export const NWmapMinxin = {
	data() {
		return {
			isShowELine: true,//控制电网盐步图
			controlFlagLayer:false,//控制图层
			isloadOnline:false,//控制定位是否显示
			controlConfigs: {
			  layersControl: {
			    hidden: true,
			    controls: {
			      testAdd: { title: "测试添加一个", icon: "draw_point" },
			    },
			  },
			  zoomControl: { hidden: true },
			  lbsControl: { hidden: true },
			  locateControl: { hidden: false },
			  drawControl: { hidden: true },
			},
			defaultdwradio: [{
					isChecked: true,
					value: 1,
					name: "主网",
				},
				{
					isChecked: true,
					value: 2,
					name: "配网",
				},
				{
					isChecked: true,
					value: 3,
					name: "低压",
				},
			],
			mapID: "appMap",
			showPoi: false,
			svgName: "",
			devid: "",
			// poi 搜索----------------------------
			mapObject: {},
			simpleInfo: "",
			topologyData: "",
			deviceType: "device",
			isLoadComponent: false,
			mapLoaded: false,
			status: "",
			controlFlag: true,
			controlFlag: true,
			poiConfig: {
				inputPosition: "up",
				inputContent: "搜地点、查公交、找路线",
				arrow: false,
			}
		}
	},
	created() {
		const that = this
		if (this.isloadOnline) {
			// 加载在线配置
			this.loadOnlineConfig(onlineConfigUrlWw, that.loadMgisMap, function() {
				that.loadOnlineConfig(onlineConfigUrlNw, that.loadMgisMap, that.loadMgisMap)
			})
		}
	},
	mounted() {
		// 添加默认控制器
		this.stateCtrl.control = this;
		// 初始化
		this.stateCtrl.initPage();
		if (window.cordova !== undefined) {
			console.log("cordova.plugins.mgisjump.initConfig");

		}
		map.Factory.Utils("TransformUtils", (service) => {
			this.conversionService = service;
		});
	},
	methods: {
		// 自定义事件: controlbox 点击事件
		eventClickControl(name) {
		  this.compoName = "";
		  switch (name) {
		    // 点击 路况 控件
		    case "traffic":
		      this.controlFlagTraffic = !this.controlFlagTraffic;
		      this.$nextTick(() => {
		        this.mapRef.toggleTrafficLayer(this.controlFlagTraffic);
		      });
		      break;
		    // 点击 图层 控件
		    case "layers":
		      this.controlFlagLayer = true;
		      break;
		    // 点击 AR 控件
		    case "AR":
		      this.jump2pickPoint();
		      break;
		    // 点击 标绘 控件
		    case "draw":
		      this.$set(this.controlConfigs.drawControl, "hidden", false);
		      break;
		    // 点击 放大 控件
		    case "zoomIn":
		      this.$nextTick(() => {
		        this.mapRef.zoomMap("in");
		      });
		      break;
		    // 点击 缩小 控件
		    case "zoomOut":
		      this.$nextTick(() => {
		        this.mapRef.zoomMap("out");
		      });
		      break;
		    // 点击 路线规划 控件
		    case "route":
		      // this.jump2lbsRouteIndex()
		      this.forward("route_index");
		      // this.jump2lbs([])
		      break;
		    // 点击 定位 控件
		    case "locate":
		      this.$nextTick(() => {
		        this.mapRef.locateMap("out");
		      });
		      break;
		  }
		},
		//电网样式切换
		checkDw() {
			this.isShowELine = !this.isShowELine;
			if (this.isShowELine) {
				this.requestCheckPSR(this.defaultdwradio);
			} else {
				this.requestCheckPSR([]);
			}
		},
		requestCheckPSR: function(radios) {

			let distribution = psr.Globals.PSRUseType.distribution; //配电对应
			let lowVoltage = psr.Globals.PSRUseType.lowVoltage; //低压
			let generation = psr.Globals.PSRUseType.generation; //主网一部分
			let transmission = psr.Globals.PSRUseType.transmission; //主网一部分
			let transformation = psr.Globals.PSRUseType.transformation; //主网一部分


			let isCheckArr = [];
			radios.forEach((item) => {
				if (item.isChecked) {
					isCheckArr.push(Number(item.value));
				}
			});
			let isCheckStr = isCheckArr.join(",");


			let allDevicesId = {};
			let storageJudgeDevices = this.$refs.gisMap.PSRSetting.judgeSelectDevices();
			let serverJudgeDeivces = this.$refs.gisMap.PSRSetting.requestjudgeDevices();
			if (storageJudgeDevices == false) {
				allDevicesId = serverJudgeDeivces;
			} else {
				allDevicesId = storageJudgeDevices;
			}
			switch (isCheckStr) {
				case "":
					this.$refs.gisMap.psrFilter.filterByClassID(allDevicesId.allDevices, false);
					break;
				case "1":
					this.$refs.gisMap.psrFilter.filterByClassID(allDevicesId.major, true);
					break;
				case "2":
					this.$refs.gisMap.psrFilter.filterByClassID(allDevicesId.distribution, true);
					break;
				case "3":
					this.$refs.gisMap.psrFilter.filterByClassID(allDevicesId.lowVoltage, true);
					break;
				case "1,2":
					this.$refs.gisMap.psrFilter.filterByClassID(
						[...allDevicesId.major, ...allDevicesId.distribution],
						true
					);
					break;
				case "1,3":
					this.$refs.gisMap.psrFilter.filterByClassID(
						[...allDevicesId.major, ...allDevicesId.lowVoltage],
						true
					);
					break;
				case "2,3":
					this.$refs.gisMap.psrFilter.filterByClassID(
						[...allDevicesId.distribution, ...allDevicesId.lowVoltage],
						true
					);
					break;
				case "1,2,3":
					this.$refs.gisMap.psrFilter.filterByClassID(allDevicesId.allDevices, true);
					break;
			}
		},
		changeThemeStyle(key) {
			console.log(123)
			let layerConfig = getLayerConfig(false);
			this._mapObject.pmap.setStyle(layerConfig[key].url);
			// this.$refs.momapSBQX.changeThemeStyle(item.key);
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
			console.log("footerClickEvent", witch, result);
		},
		// 卡片滑动结束
		scrollEndFun(data) {
			console.log(this.openPsrDetail, !data);
			if (!data && this.openPsrDetail) {
				this.goback();
				this.openPsrDetail = false;
			}
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
			console.log("footerClickEvent", witch, result);
		},
		clickTopoAnalysis(data) {
			const resultMenu = this.mapRef.psrmap
				.getContextmenu(data.deviceData, "geomap")
				.filter((res) => res.name === data.name)[0];
			resultMenu.callback(resultMenu.psrfeature, (res) => {
				this.topologyData = res;
				if (res && res.psr_data_list) {
					this.goback();
					this.forward("psr_topology");
				}
			});
		},
		closeCard() {
			this.goback();
			this.mapRef.psrmap.clearHighlight();
		},

		setControlFlag(val) {
			this.controlFlag = val.status === 'poi_index'
			this.status = val.status
		},
		// 前进  更新
		forward(status, data) {
			if (status === 'psr_wiring_diagram_simulate' && data) {
				status = 'psr_wiring_diagram'
				setTimeout(() => {
					this.$refs.svgGraph.getSimulateAnalystData(data)
				})

			}
			this.status = status
			this.stateCtrl.forward(status, data)
		},
		// 后退
		goback() {
			this.stateCtrl.goback();
		},
		handleResultMarker(list) {
			// 抛出数据，自定义处理地图marker
		},

		handleCardMarker(poi) {
			// 自定义卡片打点方式抛出，传出数据
			console.log(111111111111)
			console.log(poi)
		},
	},
	computed: {
		cStatus() {
			console.log(this.status, "---------------")
			return this.status;
		},
		mapRef() {
			return this.$refs.gisMap;
		},
	},
	watch: {
		mapLoaded: {
			handler(newValue) {
				this.$nextTick(() => {
					if (newValue) {
						this._mapRef = this.$refs.gisMap;
						this._mapObject = this._mapRef ? {
							mapID: this.mapID,
							pmap: this._mapRef.pmap,
							psrmap: this._mapRef.psrmap,
						} : {};
						this._filter = new psr.Display.Filter(this._mapObject.pmap.pmap);
						this.isLoadComponent = true;
						// 添加默认控制器
						this.stateCtrl.control = this; // (此步骤应该移除)
						// 初始化全局状态控制器
						this.stateCtrl.initPage(this.mapID);
						this.mgisAppStatusEvent.bindEvent(
							this.mapID,
							"home",
							this.setControlFlag
						);
						this.getInitData();
					}
				});
			},
			immediate: true,
		},
	},
}
