<template>
	<div>
		<div class="yw-pop">
			1231313
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Pop',
		display: 'Pop自定义弹窗',
		data() {
			return {
				
			}
		},
		props: {

		},
		computed: {
			activeBarStyle: function() {
				var left = this.activeBarWidth / 2 - 15; // 15是线宽度的一半
				if (this.curTabIndex == 0 || this.curTabIndex == 2) {
					left = this.activeBarWidth / 2 - 10;
				}
				return {
					transition: "all 300ms",
					// width: this.activeBarWidth + 'px',
					width: 30 + "px",
					left: left + "px",
					transform: "translate3d(" + this.activeBarX + "px, 0px, 0px)", //动画属性,
					backgroundColor: this.activeColor
				};
			}
		},
		methods: {
			
		},
	}
</script>

<style scoped lang="scss">
	
</style>
