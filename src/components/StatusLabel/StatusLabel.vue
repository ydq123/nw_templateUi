<!-- StatusLabel状态标签组件
	<nw-status-label></nw-status-label>
	
 -->
<template>
	<div class="yw-statuslabel">
		<div>
			<span class="pl5 pr5 ptb2 f12 mr5 radius-2" v-for="(val,staIndex) in objStaLabel" :key="staIndex" :class="[val.staCal,val.status==1?'state1':'',val.status==2?'state2':'',val.status==3?'state3':'']">{{val.staLabTxt}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'StatusLabel',
		display: 'StatusLabel状态标签组件',
		data() {
			return {
				objStaLabel: this.bqStaLabel
			}
		},
		props: {
			bqStaLabel: {
				type: Array,
				default: () => [{
						staCal: 'borc-l-1e8',
						staLabTxt: '待审核',
						status: 0
					},
					{
						staCal: '',
						staLabTxt: '待审核',
						status: 1
					},
					{
						staCal: '',
						staLabTxt: '待审核',
						status: 2
					},
					{
						staCal: '',
						staLabTxt: '待审核',
						status: 3
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

	.yw-statuslabel {
		width: 100%;
		text-align: center;
	}

	.ptb2 {
		padding-top: r(2px);
		padding-bottom: r(2px);
	}

	.textput-row {
		display: flex;
		flex-direction: row;
	}

	.borc-l-1e8 {
		border: 1px solid #1E87F0;
		color: #1E87F0;
	}

	.state1 {
		color: #1ca300 !important;
		background: #DDF1D9 !important;
	}

	.state2 {
		color: #ffc417 !important;
		background: #FFF6DC !important;
	}

	.state3 {
		color: #1e87f0 !important;
		background: #DDEDFD !important;
	}

	.radius-2 {
		border-radius: r(2px);
	}
</style>
