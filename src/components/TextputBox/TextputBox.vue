<!-- TextputBox文本输入框组件
	<nw-textput-box :txtBoxObj="txtBoxObj" @boxValBtn=""></nw-textput-box>
	
	参数说明
	isBotBor: true, // 判断是否显示下滑线
	txtBoxObj:{
		showBox: 1,// 判断文本框类型 1左右布局；2上下布局；3上下布局（有输入内容长度），4右箭头布局
		boxBs: true,// 判断是否显示标识
		titleTxt:'标题标题标题标题标题',
		searchValue: '',//输入框内容
		valueLength: 500,//状态为3的输入框限制长度
		isDisabled: false,//禁止输入；默认为false可输入，true禁止输入
		placeholderTxt: '请输入',//输入框提示语
		iconCla: 'icon-dingwei gray287 f15 pl5',//icon样式
		boxValue: '',//请选择参数
		botBor: '',//自定义下划线
	}
 -->
<template>
	<div class="yw-textput bg-white">
		<!-- 1左右布局 -->
		<div class="textput-row al-c textput-r p15" :class="[isBotBor?'borderButtomE8':boxObj.botBor]" v-if="boxObj.showBox == 1">
			<div class="textput-xh" v-if="boxObj.boxBs">*</div>
			<div class="f16 mr10 text-hc" :class="[boxObj.isDisabled?'gray9':'']">{{boxObj.titleTxt}}</div>
			<div class="f16 flex-1 textput-row al-c">
				<input class="flex-1" type="text" v-model="boxObj.searchValue" :disabled="boxObj.isDisabled" :placeholder="boxObj.placeholderTxt" />
				<i class="iconfont" v-if="!boxObj.isDisabled" :class="boxObj.iconCla" @click="inputIconBtn"></i>
			</div>
		</div>
		<!-- 2上下布局 -->
		<div class="textput-r p15" :class="[isBotBor?'borderButtomE8':boxObj.botBor]" v-if="boxObj.showBox == 2">
			<div class="textput-xh" v-if="boxObj.boxBs">*</div>
			<div class="f16 pb10" :class="[boxObj.isDisabled?'gray9':'']">{{boxObj.titleTxt}}</div>
			<div class="f16 textput-row">
				<input class="flex-1" type="text" v-model="boxObj.searchValue" :disabled="boxObj.isDisabled" :placeholder="boxObj.placeholderTxt" />
			</div>
		</div>
		<!-- 3上下布局（有输入内容长度）-->
		<div class="textput-r p15 bg-white" :class="[isBotBor?'borderButtomE8':boxObj.botBor]" v-if="boxObj.showBox == 3">
			<div class="textput-xh" v-if="boxObj.boxBs">*</div>
			<div class="textput-row f16 pb10" :class="[boxObj.isDisabled?'gray9':'']">
				{{boxObj.titleTxt}}
			</div>
			<div class="bg-white f16">
				<textarea v-model="boxObj.searchValue" :placeholder="boxObj.placeholderTxt" :maxlength="boxObj.valueLength" :disabled="boxObj.isDisabled" class="pb20 bg-white"></textarea>
				<div class="text-right f12 gray9 pb10 pr15 pl15" v-if="!boxObj.isDisabled">
					{{boxObj.searchValue.length}}/{{boxObj.valueLength}}
				</div>
			</div>
		</div>
		<!-- 4右箭头布局 -->
		<div class="textput-row textput-r p15" :class="[isBotBor?'borderButtomE8':boxObj.botBor]" v-if="boxObj.showBox == 4">
			<div class="textput-xh" v-if="boxObj.boxBs">*</div>
			<div class="f16 mr10 text-hc" :class="[boxObj.isDisabled?'gray9':'']">{{boxObj.titleTxt}}</div>
			<div class="f16 flex-1 textput-row al-c" @click="boxValBtn">
				<div class="flex-1">
					<div :class="[boxObj.boxValue.length>0?'':'gray9']">{{boxObj.boxValue.length>0?boxObj.boxValue:'请选择'}}</div>
				</div>
				<i class="iconfont icon-qianjin grayc7c f13" v-if="!boxObj.isDisabled"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TextputBox',
		display: 'TextputBox文本输入框组件',
		data() {
			return {
				boxObj:this.txtBoxObj
			}
		},
		props: {
			isBotBor:{ // 判断是否显示下滑线
				type: Boolean,
				default: true
			},
			txtBoxObj:{
				type: Object,
				default: ()=>({
					showBox: 1,// 判断文本框类型 1左右布局；2上下布局；3上下布局（有输入内容长度），4右箭头布局
					boxBs: true,// 判断是否显示标识
					titleTxt:'标题标题标题标题标题',
					searchValue: '',//输入框内容
					valueLength: 500,//状态为3的输入框限制长度
					isDisabled: false,//禁止输入；禁止点击，默认为false可输入可点击，true禁止输入禁止点击
					placeholderTxt: '请输入',//输入框提示语
					iconCla: 'icon-dingwei gray287 f15 pl5',//icon样式
					boxValue: '',//请选择参数
					botBor: '',//自定义下划线
					
				})
			}
		},
		computed: {

		},
		methods: {
			// 输入框icon按钮
			inputIconBtn: function(){
				console.log('inputIconBtn：：：');
				this.$emit('inputIconBtn');
			},
			// 右箭头点击事件
			boxValBtn: function(){
				console.log('boxValBtn：：：');
				this.$emit('boxValBtn',this.boxObj.boxValue);
			}
		},
	}
</script>

<style scoped lang="less">
	@import "../../assets/less/nw_tool.less";
	.yw-textput{
		width: 100%;
		text-align: left;
	}
	.textput-row{
		display: flex;
		flex-direction: row;
	}
	.textput-r{
		position: relative;
	}
	.textput-xh{
		position: absolute;
		.pxToremLess(left,6px);
		.pxToremLess(margin-top,4px);
		color: red;
	}
	.text-hc{
		width: 30%;
		.pxToremLess(line-height,18px);
	}
	.text-b2{
		color: #b2b2b2;
	}
</style>
