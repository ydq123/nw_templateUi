<!-- MapPop模块组件使用方法
	
	MapPop
	组件场景描述：用与地图模式弹窗
	组件基础使用描述：地图模式页面右侧边弹窗
	<nw-map-pop :isMapPop="mapPop" :mapList="mList" :switchList="sList" @checkTheme="testCheckTheme" @zdcBtnShow="testZdcBtnShow"></nw-map-pop>
	参数说明：
	    isMapPop,// 控制显示地图弹窗
		isMapPop参数示例：mapPop:false
		mapList,// 地图底图数组，有默认数据
		isMapPop参数示例：mList: [{ 
				label: "标准地图",//地图名称
				value: "1",//地图光标样式 ，值为2为选中样式
				key: require('@/assets/images/mapImg/layer_pic1.png'),//地图图片
				isChecked: true,//判断是否选中
			},
		]
		switchList,// 状态数组
		switchList参数示例：sList:[{ 
				mlTitle: '等级',//标题说明
				mlType: 'dj',//自定义状态，可用于逻辑判断
				mlList: [{
					dengCol: 1,// 注：非必传  警示灯，1：紧急，2：重大，3：一般，4：其他
					text: 'xx单',// 说明
					status: false//按钮判断，建议默认为false，有需要可为true
				}, ]
			},
			{
				mlTitle: '状态',
				mlType: 'zt',
				mlList: [{
					text: '即将超期',
					status: false
				}, ]
			},
			{
				mlTitle: '地图显示',
				mlType: 'dtxs',
				mlList: [{
					text: '未消缺',
					status: false
				}]
			}
		]
	
	方法说明：
	checkTheme,// 地图样式切换，返回当前选中的数据
	checkTheme自定义方法例子：testCheckTheme(data){ console.log('地图样式切换：', data); }
	zdcBtnShow,// 遮挡层关闭地图弹窗，返回打开开关的数据
	zdcBtnShow自定义方法例子：testZdcBtnShow(data){ console.log('遮挡层关闭地图弹窗：', data); }
 -->
<template>
	<div class="yw-mappop nw_bag_F5">
		<div class="zdc zIndex999" @click.stop="zdcBtnShow" v-show="showMapPop"></div>
		<!-- 筛选 -->
		<div class="sreen-warp bg-white" :class="[showMapPop?'':'showBgcW']">
			<div class="sreen-box">
				<div class="layer-item layer-theme">
					<div class="bg-f5 pr20 pl20 pb10 pt10 f14 text-left">地图类型</div>
					<div class="flex pb15">
						<div class="item pt15" v-for="(item, Rindex) in radios" :key="Rindex" :class="{ selected: item.isChecked, border: item.value == '2' }"
						 @click.stop="checkTheme(Rindex, item)">
							<div class="theme_img" :style="{backgroundImage:'url('+item.key+')'}">
								<div v-if="item.isChecked" class="radio">
									<span class=""></span>
								</div>
							</div>
							<div class="name" :class="{ selected: item.isChecked }">
								{{ item.label }}
							</div>
						</div>
					</div>
				</div>
				<div class="f14" v-for="(val,Mindex) in mapSwith" :key="Mindex">
					<div class="bg-f5 pr20 pl20 pb10 pt10 text-left">{{ val.mlTitle }}</div>
					<div class="map-row al-c ju-b pr20 pl20 pt10 pb10" v-for="(Lval,Lindex) in val.mlList" :key="Lindex">
						<div class="map-row al-c">
							<!-- :class="[Lval.dengCol == 1?'map-deng-red':'',Lval.dengCol == 2?'map-deng-yellow':'',Lval.dengCol == 3?'map-deng-green':'',Lval.dengCol == 4?'map-deng-f5':'']" -->
							<div class="map-deng" v-if="Lval.dengCol" :style="{backgroundColor:Lval.dengCol}"></div>
							<span class="ml5">{{ Lval.text }}</span>
						</div>
						<van-switch v-model="Lval.status" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MapPop',
		display: 'MapPop地图弹窗',
		data() {
			return {
				showMapPop: false,
				radios: this.mapList,
				mapSwith: this.switchList
			}
		},
		props: {
			isMapPop: { // 控制显示地图弹窗
				type: Boolean,
				default: false
			},
			mapList: { // 地图底图数组
				type: Array,
				default: () => [
					{
						label: "标准地图",
						value: "1",
						key: require('@/assets/images/mapImg/layer_pic1.png'),
						isChecked: true,
					},
					{
						label: "影像地图",
						value: "1",
						key: require('@/assets/images/mapImg/layer_pic2.png'),
						isChecked: false,
					},
					{
						label: "栅格地图",
						value: "1",
						key: require('@/assets/images/mapImg/layer_pic3.png'),
						isChecked: false,
					},
				]
			},
			switchList: { // 状态数组
				type: Array,
				default: () => [
					{
						mlTitle: '等级',
						mlType: 'dj',
						mlList: [
							{
								dengCol: '#fa3a3d',
								text: '紧急',
								status: false,
							},
							{
								dengCol: '#f9d501',
								text: '重大',
								status: false,
							},
							{
								dengCol: '#00ee8e',
								text: '一般',
								status: false,
							},
							{
								dengCol: '#f5f5f5',
								text: '其他',
								status: false,
							}
						]
					},
					{
						mlTitle: '状态',
						mlType: 'zt',
						mlList: [
							{
								text: '即将超期',
								status: false
							},
							{
								text: '已超期',
								status: false
							},
						]
					}
				]
			},
		},
		watch: {
			showMapPop: function() {
				this.$emit('update:isMapPop', this.showMapPop);
			},
			isMapPop: function() {
				this.showMapPop = this.isMapPop;
				if (!this.isMapPop) {
					document.body.style.overflow = '';
				} else {
					document.body.style.overflow = 'hidden';
				}
			}
		},
		computed: {

		},
		methods: {
			//地图样式切换
			checkTheme(index, item) {
				// 先取消所有选中项
				this.radios.forEach((item) => {
					item.isChecked = false;
				});
				// 再设置当前点击项选中
				this.radio = this.radios[index].value;
				// 设置值，以供传递
				this.radios[index].isChecked = true;
				var data = this.radios[index];
				this.$emit("checkTheme",data);
			},
			// 遮挡层隐藏
			zdcBtnShow: function() {
				this.showMapPop = false;
				var data = {
					mapList: []
				};
				for(var i = 0;i<this.mapSwith.length;i++){
					for(var e = 0;e<this.mapSwith[i].mlList.length;e++){
						if (this.mapSwith[i].mlList[e].status) {
							data.mapList.push({
								mlTitle: this.mapSwith[i].mlTitle,
								mlType: this.mapSwith[i].mlType,
								mlList: this.mapSwith[i].mlList[e]
							});
						}
					}
				}
				this.$emit("zdcBtnShow",data);
			},
		},
	}
</script>

<style scoped lang="less">
	@import "../../assets/scss/nw_mappop.less";
</style>
