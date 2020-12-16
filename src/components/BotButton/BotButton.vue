<!-- BotButton模块底部按钮组件使用方法
	<nw-bot-button :zyBtn="dbZyBtn" :cyBtn="dbCyBtn" :twoZCyBtn="dbTwoZCyBtn" :zIconBtn="dbZIconBtn" @zyCliBtn="testZyCliBtn" @cyCliBtn="testCyCliBtn" @towZyCliBtn="testTowZyCliBtn" @towCyCliBtn="testTowCyCliBtn" @cliIconItemBtn="testCliIconItemBtn" @cliIconRBtn="testCliIconRBtn" />
	zyBtn: { // 主要按钮配置项
		btnType: true, // 判断按钮是否显示
		text: '主要按钮', //  按钮文案
		color: 'white', // 按钮文案颜色
		bgcolor: '#1E87F0',//  按钮背景颜色
		fsize: '16px' // 字体大小
	},
	cyBtn: { // 次要按钮配置项
		btnType: true,
		text: '次要按钮',
		color: '#262626',
		fsize: '16px'
	},
	twoZCyBtn: { // 等分要按钮配置项
		btnType: true,
		zhuyaoBtn: {
			text: '发送',
			color: 'white',
			bgcolor: '#1E87F0',
			fsize: '16px'
		},
		ciyaoBtn: {
			text: '保存',
			color: '#262626',
			fsize: '16px'
		},
	},
	zIconBtn: { // icon按钮配置项
		btnType: true,
		iconList: [{
				icon: 'icon-jinyongqingkuang', // icon名称
				iconText: '哈哈1', // icon文案
				iconSize: '14px', // icon大小
				textSize: '14px', // 文案大小
				iconColor: '', // icon颜色
				textColor: '' // icon文案颜色
			},
		],
		zhuyaoBtn: {
			text: '终结',
			color: 'white',
			bgcolor: '#1E87F0',
			fsize: '16px'
		},
	},
 -->
<template>
	<div class="yw-botbut">
		<div class="p10 bg-white boxs" v-if="zhuyaoBtn.btnType">
			<div @click="zyCliBtn" class="btn btn-width-100" :style="{color:zhuyaoBtn.color,backgroundColor:zhuyaoBtn.bgcolor,fontSize:zhuyaoBtn.fsize}">{{ zhuyaoBtn.text }}</div>
		</div>
		<div class="p10 bg-white boxs" v-if="ciyaoBtn.btnType">
			<div @click="cyCliBtn" class="btn btn-width-100 cybtn" :style="{color:ciyaoBtn.color,fontSize:ciyaoBtn.fsize}">{{ ciyaoBtn.text }}</div>
		</div>
		<div class="p10 bg-white flex-d boxs" v-if="twoBtn.btnType">
			<div @click="towCyCliBtn" class="btn btn-width-100 cybtn mr5" :style="{color:twoBtn.ciyaoBtn.color,fontSize:twoBtn.ciyaoBtn.fsize}">{{ twoBtn.ciyaoBtn.text }}</div>
			<div @click="towZyCliBtn" class="btn btn-width-100 ml5" :style="{color:twoBtn.zhuyaoBtn.color,backgroundColor:twoBtn.zhuyaoBtn.bgcolor,fontSize:twoBtn.zhuyaoBtn.fsize}">{{ twoBtn.zhuyaoBtn.text }}</div>
		</div>
		<div class="p10 bg-white flex-d boxs" v-if="iconBtn.btnType">
			<div class="btn btn-width-100 mr5 btn-row btn-al-c btn-ju-a">
				<div @click="cliIconItemBtn(item)" class="" v-for="(item,index) in iconBtn.iconList" :key="index">
					<div class="">
						<i class="iconfont" :class="item.icon" :style="{fontSize:item.iconSize,color:item.iconColor}"></i>
					</div>
					<div class="mt5" :style="{fontSize:item.textSize,color:item.textColor}">
						{{ item.iconText }}
					</div>
				</div>
			</div>
			<div @click="cliIconRBtn" class="btn btn-width-100" :style="{color:iconBtn.zhuyaoBtn.color,backgroundColor:iconBtn.zhuyaoBtn.bgcolor,fontSize:iconBtn.zhuyaoBtn.fsize}">{{ iconBtn.zhuyaoBtn.text }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BotButton',
		display: 'BotButton模块底部按钮',
		data() {
			return {
				zhuyaoBtn: this.zyBtn,
				ciyaoBtn: this.cyBtn,
				twoBtn: this.twoZCyBtn,
				iconBtn: this.zIconBtn
			}
		},
		props: {
			zyBtn: { // 主要按钮配置项
				type: Object,
				default: ()=> ({
					btnType: true,
					text: '主要按钮',
					color: 'white',
					bgcolor: '#1E87F0',
					fsize: '16px'
				})
			},
			cyBtn: { // 次要按钮配置项
				type: Object,
				default: ()=> ({
					btnType: true,
					text: '次要按钮',
					color: '#262626',
					fsize: '16px'
				})
			},
			twoZCyBtn: { // 等分要按钮配置项
				type: Object,
				default: ()=> ({
					btnType: true,
					zhuyaoBtn: {
						text: '发送',
						color: 'white',
						bgcolor: '#1E87F0',
						fsize: '16px'
					},
					ciyaoBtn: {
						text: '保存',
						color: '#262626',
						fsize: '16px'
					},
				})
			},
			zIconBtn: { // icon按钮配置项
				type: Object,
				default: ()=> ({
					btnType: true,
					iconList: [{
							icon: 'icon-jinyongqingkuang',
							iconText: '哈哈1',
							iconSize: '14px',
							textSize: '14px',
							iconColor: '',
							textColor: '',
						},
						{
							icon: 'icon-jinyongqingkuang',
							iconText: '哈哈2',
							iconSize: '14px',
							textSize: '14px',
							iconColor: '',
							textColor: '',
						},
						{
							icon: 'icon-jinyongqingkuang',
							iconText: '哈哈3',
							iconSize: '14px',
							textSize: '14px',
							iconColor: '',
							textColor: '',
						}
					],
					zhuyaoBtn: {
						text: '终结',
						color: 'white',
						bgcolor: '#1E87F0',
						fsize: '16px'
					},
				})
			},
		},
		computed: {

		},
		methods: {
			// 主要按钮点击事件
			zyCliBtn: function() {
				this.$emit("zyCliBtn");
			},
			// 次要按钮点击事件
			cyCliBtn: function() {
				this.$emit("cyCliBtn");
			},
			// 等分主要按钮点击事件
			towZyCliBtn: function() {
				this.$emit("towZyCliBtn");
			},
			// 等分次要按钮点击事件
			towCyCliBtn: function() {
				this.$emit("towCyCliBtn");
			},
			// icon按钮点击事件
			cliIconItemBtn: function(item) {
				this.$emit("cliIconItemBtn", item);
			},
			// icon右边按钮点击事件
			cliIconRBtn: function() {
				this.$emit("cliIconRBtn");
			},
		},
	}
</script>

<style scoped lang="scss">
	@import "../../assets/scss/nw_tool.scss";
	.yw-botbut{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 8;
		text-align: center;
		width: 100%;
	}
	.boxs{
		box-shadow: r(10px) r(10px) r(10px) r(10px) rgba(0,0,0,0.2);
	}
	.btn{
		height: r(44px);
		line-height: r(44px);
		border-radius: r(8px);
		white-space :nowrap; /*让文字不换行*/
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	// 主要按钮
	.zybtn{
		color: white;
		background-color: #1E87F0;
	}
	// 次要按钮
	.cybtn{
		// color: #262626;
		border: 1px solid #d8d8d8;
	}
	.btn-width-100{
		width: 100%;
	}
	.flex-d{
		display: flex;
		justify-content: space-around;
	}
	.btn-row{
		display: flex;
		flex-direction: row;
	}
	.btn-al-c{
		align-items: center;
	}
	.btn-ju-c{
		justify-content: center;
	}
	.btn-ju-a{
		justify-content: space-around;
	}
</style>
