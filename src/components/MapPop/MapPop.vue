<!-- MapPop模块组件使用方法
	<nw-map-pop :isMapPop="true" :mapList="mList" :switchList="sList" @checkTheme="testCheckTheme" @zdcBtnShow="testZdcBtnShow"></nw-map-pop>
	isMapPop: false,// 控制显示地图弹窗
	mapList: [{ // 地图底图数组
			label: "标准地图",
			value: "1",
			key: require('@/assets/images/mapImg/layer_pic1.png'),
			isChecked: true,
		},
	],
	switchList: [{ // 状态数组
			mlTitle: '等级',
			mlType: 'dj',
			mlList: [{
				dengCol: 1,
				text: '紧急',
				status: false
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
	],
 -->
<template>
	<div class="yw-mappop nw_bag_F5">
		<div class="zdc zIndex999" @click.stop="zdcBtnShow" v-show="showPop"></div>
		<!-- 筛选 -->
		<div class="sreen-warp bg-white" v-show="showPop">
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
							<div class="map-deng" v-if="Lval.dengCol" :class="[Lval.dengCol == 1?'map-deng-red':'',Lval.dengCol == 2?'map-deng-yellow':'',Lval.dengCol == 3?'map-deng-green':'',Lval.dengCol == 4?'map-deng-f5':'']"></div>
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
				showPop: this.isMapPop,
				radios: this.mapList,
				mapSwith: this.switchList
			}
		},
		props: {
			isMapPop: { // 控制显示地图弹窗
				type: Boolean,
				default: true
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
								dengCol: 1,
								text: '紧急',
								status: false
							},
							{
								dengCol: 2,
								text: '重大',
								status: false
							},
							{
								dengCol: 3,
								text: '一般',
								status: false
							},
							{
								dengCol: 4,
								text: '其他',
								status: false
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
					},
					{
						mlTitle: '地图显示',
						mlType: 'dtxs',
						mlList: [
							{
								text: '未消缺',
								status: false
							}
						]
					}
				]
			},
		},
		watch: {
			showPop: function() {
				if (!this.showPop) {
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
				this.showPop = false;
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

<style scoped lang="scss">
	@import "../../assets/scss/nw_mappop.scss";
</style>
