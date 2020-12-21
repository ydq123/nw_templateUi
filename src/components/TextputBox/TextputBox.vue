<!-- TextputBox文本输入框组件
	<nw-folding-box>
		<div slot="topRIconSlot"></div>
		<div slot="boxCenten">
			<nw-textput-box></nw-textput-box>
		</div>
		<div slot="botIconSlot"></div>
	</nw-folding-box>
 -->
<template>
	<div class="yw-textput bg-white">
		<div class="textput-row textput-r pt15 pb15" v-if="boxObj.showBox == 1">
			<div class="textput-xh" v-if="boxObj.boxBs">*</div>
			<div class="f14 mr10 text-hc">{{boxObj.titleTxt}}</div>
			<div class="f14 flex-1 textput-row al-c">
				<input class="flex-1" type="text" v-model="boxObj.searchValue" :disabled="boxObj.isDisabled" :placeholder="boxObj.placeholderTxt" />
				<i class="iconfont" :class="boxObj.iconCla" @click="inputIconBtn"></i>
			</div>
		</div>
		<div class="textput-r pt15 pb15" v-if="boxObj.showBox == 2">
			<div class="textput-xh" v-if="boxObj.boxBs">*</div>
			<div class="f14 pb10">{{boxObj.titleTxt}}</div>
			<div class="f14 textput-row">
				<input class="flex-1" type="text" v-model="boxObj.searchValue" :disabled="boxObj.isDisabled" :placeholder="boxObj.placeholderTxt" />
			</div>
		</div>
		<div class="textput-r pt15 pb15 bg-white borderButtomE8" v-if="boxObj.showBox == 3">
			<div class="textput-xh" v-if="boxObj.boxBs">*</div>
			<div class="textput-row f14 pb10">
				审批意见
			</div>
			<div class="bg-white f14">
				<textarea v-model="boxObj.searchValue" :placeholder="boxObj.placeholderTxt" :maxlength="boxObj.valueLength" :disabled="boxObj.isDisabled" class="pb20 bg-white"></textarea>
				<div class="text-right f12 gray9 pb10 pr15 pl15">
					{{boxObj.searchValue.length}}/{{boxObj.valueLength}}
				</div>
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
			txtBoxObj:{
				type: Object,
				default: ()=>({
					showBox: 1,// 判断文本框类型 1左右布局；2上下布局；3上下布局（有输入内容长度）
					boxBs: true,// 判断是否显示标识
					titleTxt:'标题标题标题标题',
					searchValue: '',
					valueLength: 500,
					isDisabled: false,//禁止输入；默认为false可输入，true禁止输入
					placeholderTxt: '请输入',//输入框提示语
					iconCla: 'icon-dingwei gray287 f15 pl5',//icon
				})
			}
		},
		computed: {

		},
		methods: {
			inputIconBtn: function(){
				console.log('inputIconBtn：：：');
				this.$emit('inputIconBtn');
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../../assets/scss/nw_tool.scss";
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
		left: r(-8px);
		margin-top:r(4px);
		color: red;
	}
	.text-hc{
		width: 30%;
		line-height: r(18px);
	}
</style>
