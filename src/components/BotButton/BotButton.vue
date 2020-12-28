<!-- BotButton模块底部按钮组件使用方法
	<nw-bot-button :zyBtn="dbZyBtn" :cyBtn="dbCyBtn" :twoZCyBtn="dbTwoZCyBtn" :zIconBtn="dbZIconBtn" @zyCliBtn="testZyCliBtn" @cyCliBtn="testCyCliBtn" @towZyCliBtn="testTowZyCliBtn" @towCyCliBtn="testTowCyCliBtn" @cliIconItemBtn="testCliIconItemBtn" @cliIconRBtn="testCliIconRBtn" />
	zyBtn: { // 主要按钮配置项
		btnType: true, // 判断按钮是否显示
		text: '主要按钮', //  按钮文案
		color: 'white', // 按钮文案颜色
		bgcolor: '#1E87F0',//  按钮背景颜色
		fsize: 'f14' // 字体大小
	},
	cyBtn: { // 次要按钮配置项
		btnType: true,
		text: '次要按钮',
		color: '#262626',
		fsize: 'f14'
	},
	twoZCyBtn: { // 等分要按钮配置项
		btnType: true,
		zhuyaoBtn: {
			text: '发送',
			color: 'white',
			bgcolor: '#1E87F0',
			fsize: 'f14'
		},
		ciyaoBtn: {
			text: '保存',
			color: '#262626',
			fsize: 'f14'
		},
	},
	zIconBtn: { // icon按钮配置项
		btnType: true,
		iconList: [{
				icon: 'icon-jinyongqingkuang', // icon名称
				iconText: '哈哈1', // icon文案
				iconSize: 'f14', // icon大小
				textSize: 'f14', // 文案大小
				iconColor: '', // icon颜色
				textColor: '' // icon文案颜色
			},
		],
		zhuyaoBtn: {
			text: '终结',
			color: 'white',
			bgcolor: '#1E87F0',
			fsize: 'f14'
		},
	},
 -->
<template>
	<div class="yw-botbut">
		<div class="p10 bg-white boxs" v-if="zhuyaoBtn.btnType">
			<div @click="zyCliBtn" class="btn btn-width-100" :class="[zhuyaoBtn.fsize?zhuyaoBtn.fsize:'f14']"
			 :style="{color:[zhuyaoBtn.color?zhuyaoBtn.color:'white'],backgroundColor:[zhuyaoBtn.bgcolor?zhuyaoBtn.bgcolor:'#1E87F0']}">{{ zhuyaoBtn.text?zhuyaoBtn.text:'主要按钮' }}</div>
		</div>
		<div class="p10 bg-white boxs" v-if="ciyaoBtn.btnType">
			<div @click="cyCliBtn" class="btn btn-width-100 cybtn" :class="[ciyaoBtn.fsize?ciyaoBtn.fsize:'f14']"
			 :style="{color:[ciyaoBtn.color?ciyaoBtn.color:'#262626']}">{{ ciyaoBtn.text?ciyaoBtn.text:'次要按钮' }}</div>
		</div>
		<div class="p10 bg-white flex-d boxs" v-if="twoBtn.btnType">
			<div @click="towCyCliBtn" class="btn btn-width-100 cybtn mr5" :class="[twoBtn.ciyaoBtn.fsize?twoBtn.ciyaoBtn.fsize:'f14']"
			 :style="{color:[twoBtn.ciyaoBtn.color?twoBtn.ciyaoBtn.color:'#262626']}">{{ twoBtn.ciyaoBtn.text?twoBtn.ciyaoBtn.text:'保存' }}</div>
			<div @click="towZyCliBtn" class="btn btn-width-100 ml5" :class="[twoBtn.zhuyaoBtn.fsize?twoBtn.zhuyaoBtn.fsize:'f14']"
			 :style="{color:[twoBtn.zhuyaoBtn.color?twoBtn.zhuyaoBtn.color:'white'],backgroundColor:[twoBtn.zhuyaoBtn.bgcolor?twoBtn.zhuyaoBtn.bgcolor:'#1E87F0']}">{{ twoBtn.zhuyaoBtn.text?twoBtn.zhuyaoBtn.text:'发送' }}</div>
		</div>
		<div class="p10 bg-white flex-d boxs" v-if="iconBtn.btnType">
			<div class="btn btn-width-100 mr5 btn-row btn-al-c btn-ju-a">
				<div class="btn-width-100 mr5 btn-row btn-al-c btn-ju-a" v-if="iconBtn.iconList.length>3 && iconListLen.length>0">
					<div v-for="(iItem,iIndex) in iconListLen" :key="iIndex">
						<div @click="cliIconItemBtn(iItem)">
							<div class="">
								<i class="iconfont" :class="[iItem.icon,iItem.iconSize?iItem.iconSize:'f14']" :style="{color:iItem.iconColor}"></i>
							</div>
							<div class="mt5" :class="[iItem.textSize?iItem.textSize:'f14']" :style="{color:iItem.textColor}">
								{{ iItem.iconText }}
							</div>
						</div>
					</div>
					<div @click="showZdcIconBox = true">
						<div class="">
							<i class="iconfont icon-jiedian1 f14"></i>
						</div>
						<div class="mt5">
							更多
						</div>
					</div>
				</div>
				<div @click="cliIconItemBtn(item)" class="" v-for="(item,index) in iconBtn.iconList" :key="index" v-if="iconBtn.iconList.length<=3">
					<div class="">
						<i class="iconfont" :class="[item.icon,item.iconSize?item.iconSize:'f14']" :style="{color:item.iconColor}"></i>
					</div>
					<div class="mt5" :class="[item.textSize?item.textSize:'f14']" :style="{color:item.textColor}">
						{{ item.iconText }}
					</div>
				</div>
			</div>
			<div @click="cliIconRBtn" class="btn btn-width-100" :class="[iconBtn.zhuyaoBtn.fsize?iconBtn.zhuyaoBtn.fsize:'f14']"
			 :style="{color:[iconBtn.zhuyaoBtn.color?iconBtn.zhuyaoBtn.color:'white'],backgroundColor:[iconBtn.zhuyaoBtn.bgcolor?iconBtn.zhuyaoBtn.bgcolor:'#1E87F0']}">{{ iconBtn.zhuyaoBtn.text }}</div>
		</div>
		<!-- 底部弹窗 -->
		<van-popup class="" style="width: auto;" v-model="showZdcIconBox" round position="bottom">
			<div class="pt15">
				<div class="btn btn-width-100 btn-hei-au btn-row flex-w">
					<div class="ml15 pb15" @click="botPopIconBtn(iconItem)" v-for="(iconItem,iconIndex) in iconBtn.iconList" :key="iconIndex">
						<div class="">
							<i class="iconfont" :class="[iconItem.icon,iconItem.iconSize?iconItem.iconSize:'f14']" :style="{color:iconItem.iconColor}"></i>
						</div>
						<div class="mt5" :class="[iconItem.textSize?iconItem.textSize:'f14']" :style="{color:iconItem.textColor}">
							{{ iconItem.iconText }}
						</div>
					</div>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	export default {
		name: 'BotButton',
		display: 'BotButton模块底部按钮',
		data() {
			return {
				iconListLen: [],
				showZdcIconBox: false,
				zhuyaoBtn: this.zyBtn,
				ciyaoBtn: this.cyBtn,
				twoBtn: this.twoZCyBtn,
				iconBtn: this.zIconBtn
			}
		},
		props: {
			zyBtn: { // 主要按钮配置项
				type: Object,
				default: () => ({
					btnType: false,
					text: '主要按钮',
					color: 'white',
					bgcolor: '#1E87F0',
					fsize: 'f14'
				})
			},
			cyBtn: { // 次要按钮配置项
				type: Object,
				default: () => ({
					btnType: false,
					text: '次要按钮',
					color: '#262626',
					fsize: 'f14'
				})
			},
			twoZCyBtn: { // 等分要按钮配置项
				type: Object,
				default: () => ({
					btnType: false,
					zhuyaoBtn: {
						text: '发送',
						color: 'white',
						bgcolor: '#1E87F0',
						fsize: 'f14'
					},
					ciyaoBtn: {
						text: '保存',
						color: '#262626',
						fsize: 'f14'
					},
				})
			},
			zIconBtn: { // icon按钮配置项
				type: Object,
				default: () => ({
					btnType: false,
					iconList: [{
							icon: 'icon-jinyongqingkuang',
							iconText: '哈哈1',
							iconSize: 'f14',
							textSize: 'f14',
							iconColor: '',
							textColor: '',
						},
						{
							icon: 'icon-jinyongqingkuang',
							iconText: '哈哈2',
							iconSize: 'f14',
							textSize: 'f14',
							iconColor: '',
							textColor: '',
						},
						{
							icon: 'icon-jinyongqingkuang',
							iconText: '哈哈3',
							iconSize: 'f14',
							textSize: 'f14',
							iconColor: '',
							textColor: '',
						},
						{
							icon: 'icon-jinyongqingkuang',
							iconText: '哈哈4',
							iconSize: 'f14',
							textSize: 'f14',
							iconColor: '',
							textColor: '',
						},
						{
							icon: 'icon-jinyongqingkuang',
							iconText: '哈哈5',
							iconSize: 'f14',
							textSize: 'f14',
							iconColor: '',
							textColor: '',
						}
					],
					zhuyaoBtn: {
						text: '终结',
						color: 'white',
						bgcolor: '#1E87F0',
						fsize: 'f14'
					},
				})
			},
		},
		computed: {

		},
		mounted() {
			this.initIconList();
		},
		methods: {
			initIconList: function() {
				if (this.iconBtn.iconList.length > 3) {
					this.iconListLen = this.iconBtn.iconList.slice(0, 2);
				}
			},
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
			// 底部更多按钮显示更多icon
			botPopIconBtn: function(iconItem) {
				this.$emit("botPopIconBtn", iconItem);
			},
		},
	}
</script>

<style scoped lang="less">
	@import "../../assets/scss/nw_tool.less";

	.yw-botbut {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 8;
		text-align: center;
		width: 100%;
	}

	.boxs {
		box-shadow: 0.7rem 0.7rem 0.7rem 0.7rem rgba(0, 0, 0, 0.2);
	}

	.btn {
		.pxToremLess(height,44px);
		.pxToremLess(border-radius,8px);
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		/*让文字不换行*/
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	// 主要按钮
	.zybtn {
		color: white;
		background-color: #1E87F0;
	}

	// 次要按钮
	.cybtn {
		// color: #262626;
		border: 1px solid #d8d8d8;
	}

	.btn-width-100 {
		width: 100%;
	}

	.flex-d {
		display: flex;
		justify-content: space-around;
	}

	.flex-w {
		flex-wrap: wrap;
	}

	.btn-row {
		display: flex;
		flex-direction: row;
	}

	.btn-al-c {
		align-items: center;
	}

	.btn-ju-c {
		justify-content: center;
	}

	.btn-ju-a {
		justify-content: space-around;
	}

	.btn-hei-au {
		height: auto;
	}
</style>
