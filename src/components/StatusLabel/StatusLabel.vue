<!-- StatusLabel状态标签组件
	<nw-status-label></nw-status-label>
	
 -->
<template>
	<div class="yw-statuslabel">
		<div>
			<span class="pl5 pr5 ptb2 f12 mr5 radius-2" v-for="(val,staIndex) in objStaLabel" :key="staIndex" :class="val.staCal">{{val.staLabTxt}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'StatusLabel',
		display: 'StatusLabel状态标签组件',
		data() {
			return {
				objStaLabel:this.bqStaLabel
			}
		},
		props: {
			bqStaLabel: {
				type: Array,
				default: ()=> [
					{
						staCal: 'borc-l-1e8',
						staLabTxt: '待审核',
					},
					{
						staCal: 'task-bgc-1e8',
						staLabTxt: '待审核',
					},
					{
						staCal: 'task-bgc-ffc',
						staLabTxt: '待审核',
					}
				]
			}
		},
		computed: {

		},
		methods: {
			
		},
	}
</script>

<style scoped lang="scss">
	@import "../../assets/scss/nw_tool.scss";
	.yw-statuslabel{
		width: 100%;
		text-align: center;
	}
	.task-bgc-1e8 {
		background-color: #deeefd;
		color: #1e87f0;
	}
	
	.task-bgc-ffc {
		background-color: #fff6dc;
		color: #ffc417;
	}
	.ptb2{
		padding-top: r(2px);
		padding-bottom: r(2px);
	}
	.textput-row{
		display: flex;
		flex-direction: row;
	}
	.borc-l-1e8{
		border: 1px solid #1E87F0;
	}
	.radius-2{
		border-radius: r(2px);
	}
</style>
