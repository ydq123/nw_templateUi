<!-- StatusLabel状态标签组件
	
 -->
<template>
	<div class="yw-statuslabel">
		<div>
			<div>
				<span class="p5 label">待审核</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'StatusLabel',
		display: 'StatusLabel状态标签组件',
		data() {
			return {
				
			}
		},
		props: {
			
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
	.label{
		color: red;
		background-color: #0086B3;
	}
	.textput-row{
		display: flex;
		flex-direction: row;
	}
</style>
